#!/usr/bin/env node

/**
 * Script to generate a task list from TODO, FIXME, and XXX comments in the codebase
 * 
 * Usage: node tools/generate-tasks.js
 * Output: TASKS.md in the root directory
 */

const fs = require('fs');
const path = require('path');

// Configuration
const COMMENT_PATTERNS = ['TODO', 'FIXME', 'XXX'];
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'];
const EXCLUDE_DIRS = ['node_modules', '.git', 'dist', 'build', '.yarn', 'coverage'];
const OUTPUT_FILE = 'TASKS.md';

/**
 * Parse a TODO comment to extract the task description
 */
function parseTodoComment(line) {
  // Match patterns like: // TODO: description, /* TODO description */, # TODO description
  const patterns = [
    /\/\/\s*(TODO|FIXME|XXX):?\s*(.+)/i,
    /\/\*\s*(TODO|FIXME|XXX):?\s*(.+)\s*\*\//i,
    /#\s*(TODO|FIXME|XXX):?\s*(.+)/i,
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      return {
        type: match[1].toUpperCase(),
        description: match[2].trim(),
      };
    }
  }

  return null;
}

/**
 * Scan a file for TODO comments
 */
function scanFile(filePath) {
  const todos = [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const parsed = parseTodoComment(line);
    if (parsed) {
      todos.push({
        ...parsed,
        file: filePath,
        line: index + 1,
        code: line.trim(),
      });
    }
  });

  return todos;
}

/**
 * Walk directory recursively to find all matching files
 */
function walkDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const dirName = path.basename(filePath);
      if (!EXCLUDE_DIRS.includes(dirName)) {
        walkDirectory(filePath, fileList);
      }
    } else {
      const ext = path.extname(filePath);
      if (FILE_EXTENSIONS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Generate markdown content from todos
 */
function generateMarkdown(todos) {
  const now = new Date().toISOString().split('T')[0];
  let markdown = `# Tareas Pendientes (TODOs)\n\n`;
  markdown += `Generado automáticamente el ${now}\n\n`;
  markdown += `Total de tareas: **${todos.length}**\n\n`;

  // Group by type
  const byType = {
    TODO: todos.filter((t) => t.type === 'TODO'),
    FIXME: todos.filter((t) => t.type === 'FIXME'),
    XXX: todos.filter((t) => t.type === 'XXX'),
  };

  // Add statistics
  markdown += `## Resumen\n\n`;
  markdown += `- 📋 **TODO**: ${byType.TODO.length} tareas\n`;
  markdown += `- 🔧 **FIXME**: ${byType.FIXME.length} correcciones\n`;
  markdown += `- ⚠️ **XXX**: ${byType.XXX.length} advertencias\n\n`;

  // Group by package
  markdown += `## Tareas por Paquete\n\n`;
  
  const byPackage = {};
  todos.forEach((todo) => {
    const match = todo.file.match(/packages\/([^\/]+)/);
    const pkg = match ? match[1] : 'root';
    if (!byPackage[pkg]) {
      byPackage[pkg] = [];
    }
    byPackage[pkg].push(todo);
  });

  Object.keys(byPackage)
    .sort()
    .forEach((pkg) => {
      markdown += `- **${pkg}**: ${byPackage[pkg].length} tareas\n`;
    });

  markdown += `\n---\n\n`;

  // List all tasks by type
  Object.entries(byType).forEach(([type, items]) => {
    if (items.length === 0) return;

    const emoji = type === 'TODO' ? '📋' : type === 'FIXME' ? '🔧' : '⚠️';
    markdown += `## ${emoji} ${type} (${items.length})\n\n`;

    // Group by package
    const packageGroups = {};
    items.forEach((item) => {
      const match = item.file.match(/packages\/([^\/]+)/);
      const pkg = match ? match[1] : 'Otros';
      if (!packageGroups[pkg]) {
        packageGroups[pkg] = [];
      }
      packageGroups[pkg].push(item);
    });

    Object.keys(packageGroups)
      .sort()
      .forEach((pkg) => {
        markdown += `### ${pkg}\n\n`;
        packageGroups[pkg].forEach((item) => {
          const relPath = item.file.replace(process.cwd() + '/', '');
          markdown += `- [ ] **${item.description}**\n`;
          markdown += `  - Archivo: \`${relPath}:${item.line}\`\n`;
          markdown += `  - Código: \`${item.code}\`\n\n`;
        });
      });
  });

  return markdown;
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Escaneando el código en busca de TODOs, FIXMEs y XXXs...\n');

  const rootDir = process.cwd();
  const files = walkDirectory(rootDir);

  console.log(`📁 Encontrados ${files.length} archivos para escanear\n`);

  const allTodos = [];
  files.forEach((file) => {
    const todos = scanFile(file);
    allTodos.push(...todos);
  });

  console.log(`✅ Encontradas ${allTodos.length} tareas pendientes\n`);

  const markdown = generateMarkdown(allTodos);
  const outputPath = path.join(rootDir, OUTPUT_FILE);
  fs.writeFileSync(outputPath, markdown, 'utf-8');

  console.log(`📝 Archivo generado: ${OUTPUT_FILE}`);
  console.log(`\nResumen:`);
  console.log(`  - TODO: ${allTodos.filter((t) => t.type === 'TODO').length}`);
  console.log(`  - FIXME: ${allTodos.filter((t) => t.type === 'FIXME').length}`);
  console.log(`  - XXX: ${allTodos.filter((t) => t.type === 'XXX').length}`);
  console.log(`\n✨ ¡Listo!\n`);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { parseTodoComment, scanFile, generateMarkdown };
