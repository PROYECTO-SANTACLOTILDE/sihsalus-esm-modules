#!/usr/bin/env node
/**
 * extract-magic-uuids.mjs
 *
 * Scans all .ts/.tsx source files under packages/ for hardcoded UUIDs,
 * classifies each occurrence as:
 *   - CONFIG:   already defined as a default value inside a config-schema.ts
 *   - CONSTANT: defined in a *-constants.ts, concept-map*, or concepts/ file
 *   - INLINE:   hardcoded directly in component/hook/resource code (⚠ magic number)
 *   - TEST:     inside a .test.ts/.test.tsx file (acceptable)
 *
 * Output: a table per package + summary stats.
 *
 * Usage:  node scripts/extract-magic-uuids.mjs [--json] [--inline-only]
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, basename, dirname } from 'path';

// ── CLI flags ────────────────────────────────────────────────────────
const args = new Set(process.argv.slice(2));
const JSON_OUTPUT = args.has('--json');
const INLINE_ONLY = args.has('--inline-only');

// ── Config ───────────────────────────────────────────────────────────
const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const PACKAGES_DIR = join(ROOT, 'packages');
const UUID_RE = /['"`]([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})['"`]/gi;

// ── Helpers ──────────────────────────────────────────────────────────
function walkFiles(dir, exts) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.turbo') continue;
      results.push(...walkFiles(full, exts));
    } else if (exts.some((e) => entry.name.endsWith(e))) {
      results.push(full);
    }
  }
  return results;
}

function classifyFile(relPath) {
  const base = basename(relPath);
  const dir = dirname(relPath);

  if (base.includes('.test.')) return 'TEST';
  if (base === 'config-schema.ts') return 'CONFIG';
  if (base.endsWith('-constants.ts') || base.endsWith('-concepts.ts')) return 'CONSTANT';
  if (base.includes('concept-map') || dir.includes('concept-map') || dir.includes('concepts/')) return 'CONSTANT';
  return 'INLINE';
}

function extractVariableContext(line) {
  // Try to extract the variable/key name that holds this UUID
  const constMatch = line.match(/(?:const|let|var)\s+(\w+)\s*=/);
  if (constMatch) return constMatch[1];

  const keyMatch = line.match(/(\w+)\s*:\s*['"`][0-9a-f]{8}-/i);
  if (keyMatch) return keyMatch[1];

  const propMatch = line.match(/['"](\w+)['"]\s*:\s*['"`][0-9a-f]{8}-/i);
  if (propMatch) return propMatch[1];

  return null;
}

// ── Main scan ────────────────────────────────────────────────────────
const packages = readdirSync(PACKAGES_DIR).filter((d) => {
  try { return statSync(join(PACKAGES_DIR, d)).isDirectory(); } catch { return false; }
});

const allFindings = [];
const stats = { CONFIG: 0, CONSTANT: 0, INLINE: 0, TEST: 0, total: 0, uniqueUuids: new Set() };

for (const pkg of packages) {
  const srcDir = join(PACKAGES_DIR, pkg, 'src');
  try { statSync(srcDir); } catch { continue; }

  const files = walkFiles(srcDir, ['.ts', '.tsx']);

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const category = classifyFile(relPath);
    const content = readFileSync(file, 'utf-8');
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let match;
      UUID_RE.lastIndex = 0;
      while ((match = UUID_RE.exec(line)) !== null) {
        const uuid = match[1].toLowerCase();
        const varName = extractVariableContext(line);
        stats[category]++;
        stats.total++;
        stats.uniqueUuids.add(uuid);

        allFindings.push({
          pkg,
          file: relPath,
          line: i + 1,
          uuid,
          category,
          variable: varName,
          context: line.trim().substring(0, 120),
        });
      }
    }
  }
}

// ── Output ───────────────────────────────────────────────────────────
if (JSON_OUTPUT) {
  const output = INLINE_ONLY ? allFindings.filter((f) => f.category === 'INLINE') : allFindings;
  console.log(JSON.stringify(output, null, 2));
  process.exit(0);
}

// Group by package, then by category
const byPkg = {};
for (const f of allFindings) {
  if (INLINE_ONLY && f.category !== 'INLINE') continue;
  byPkg[f.pkg] = byPkg[f.pkg] || [];
  byPkg[f.pkg].push(f);
}

console.log('═'.repeat(100));
console.log('  MAGIC UUID REPORT — sihsalus-esm-modules');
console.log('═'.repeat(100));
console.log();

for (const [pkg, findings] of Object.entries(byPkg).sort()) {
  const byCat = {};
  for (const f of findings) {
    byCat[f.category] = byCat[f.category] || [];
    byCat[f.category].push(f);
  }

  console.log(`\n${'─'.repeat(80)}`);
  console.log(`  ${pkg}`);
  console.log(`${'─'.repeat(80)}`);

  for (const cat of ['INLINE', 'CONSTANT', 'CONFIG', 'TEST']) {
    if (!byCat[cat]?.length) continue;

    const icon = cat === 'INLINE' ? '⚠️ ' : cat === 'CONFIG' ? '✅' : cat === 'CONSTANT' ? '📦' : '🧪';
    console.log(`\n  ${icon} ${cat} (${byCat[cat].length})`);

    for (const f of byCat[cat]) {
      const loc = `${f.file}:${f.line}`;
      const varLabel = f.variable ? ` [${f.variable}]` : '';
      console.log(`     ${loc}${varLabel}`);
      console.log(`       ${f.uuid}`);
      if (cat === 'INLINE') {
        console.log(`       ${f.context}`);
      }
    }
  }
}

// Summary
console.log(`\n${'═'.repeat(100)}`);
console.log('  SUMMARY');
console.log('═'.repeat(100));
console.log(`  Total UUID occurrences:   ${stats.total}`);
console.log(`  Unique UUIDs:             ${stats.uniqueUuids.size}`);
console.log(`  ✅ In config-schema.ts:   ${stats.CONFIG}`);
console.log(`  📦 In constants/concepts: ${stats.CONSTANT}`);
console.log(`  ⚠️  INLINE (magic):       ${stats.INLINE}`);
console.log(`  🧪 In test files:         ${stats.TEST}`);
console.log();

if (stats.INLINE > 0) {
  console.log(`  🔴 ${stats.INLINE} UUIDs are hardcoded inline — candidates for extraction to config-schema or constants.`);

  // List unique inline UUIDs
  const inlineUuids = new Map();
  for (const f of allFindings) {
    if (f.category === 'INLINE') {
      if (!inlineUuids.has(f.uuid)) inlineUuids.set(f.uuid, []);
      inlineUuids.get(f.uuid).push(`${f.file}:${f.line}`);
    }
  }
  console.log(`\n  Unique inline UUIDs (${inlineUuids.size}):`);
  for (const [uuid, locs] of [...inlineUuids.entries()].sort()) {
    console.log(`    ${uuid}  (${locs.length} occurrence${locs.length > 1 ? 's' : ''})`);
    for (const loc of locs) {
      console.log(`      → ${loc}`);
    }
  }
}

console.log();
