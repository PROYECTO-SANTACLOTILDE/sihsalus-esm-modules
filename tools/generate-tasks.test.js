/**
 * Simple tests for the generate-tasks script
 */

const { parseTodoComment } = require('./generate-tasks');

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (error) {
    console.error(`❌ ${name}`);
    console.error(error.message);
    process.exit(1);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test parseTodoComment
test('parseTodoComment should extract TODO comments', () => {
  const result = parseTodoComment('// TODO: fix this issue');
  assert(result !== null, 'Should parse TODO comment');
  assert(result.type === 'TODO', 'Should identify TODO type');
  assert(result.description === 'fix this issue', 'Should extract description');
});

test('parseTodoComment should extract FIXME comments', () => {
  const result = parseTodoComment('// FIXME: broken functionality');
  assert(result !== null, 'Should parse FIXME comment');
  assert(result.type === 'FIXME', 'Should identify FIXME type');
  assert(result.description === 'broken functionality', 'Should extract description');
});

test('parseTodoComment should extract XXX comments', () => {
  const result = parseTodoComment('// XXX: dangerous code');
  assert(result !== null, 'Should parse XXX comment');
  assert(result.type === 'XXX', 'Should identify XXX type');
  assert(result.description === 'dangerous code', 'Should extract description');
});

test('parseTodoComment should handle comments without colon', () => {
  const result = parseTodoComment('// TODO implement feature');
  assert(result !== null, 'Should parse TODO without colon');
  assert(result.description === 'implement feature', 'Should extract description');
});

test('parseTodoComment should return null for non-TODO comments', () => {
  const result = parseTodoComment('// Regular comment');
  assert(result === null, 'Should return null for regular comments');
});

test('parseTodoComment should handle block comments', () => {
  const result = parseTodoComment('/* TODO: fix this */');
  assert(result !== null, 'Should parse block comment');
  assert(result.type === 'TODO', 'Should identify TODO type');
});

console.log('\n✨ All tests passed!\n');
