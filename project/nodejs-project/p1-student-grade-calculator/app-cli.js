#!/usr/bin/env node

/**
 * Command-line version of the Student Grade Calculator.
 *
 * Usage examples:
 *   node app-cli.js --name "Deepa" --math 90 --science 80 --english 70
 *
 *   You can also omit --name and just provide marks:
 *   node app-cli.js --math 90 --science 80 --english 70
 */

const subjects = ['Math', 'Science', 'English'];

function calculateGrade(marks) {
  const total = marks.reduce((acc, mark) => acc + mark, 0);
  const average = total / marks.length;
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  if (average >= 60) return 'D';
  return 'F';
}

function getArgValue(args, flag) {
  // Supports: --flag value OR --flag=value
  const idx = args.indexOf(flag);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];

  const eq = args.find((a) => a.startsWith(`${flag}=`));
  if (eq) return eq.split('=').slice(1).join('=');

  return undefined;
}

function requiredNumber(value, fieldName) {
  if (value === undefined) {
    throw new Error(`Missing required argument: --${fieldName}`);
  }
  const n = Number(String(value).trim());
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid number for --${fieldName}: ${value}`);
  }
  return n;
}

function main() {
  const args = process.argv.slice(2);

  const studentName = (getArgValue(args, '--name') ?? 'Student Name').toString().trim();

  const math = requiredNumber(getArgValue(args, '--math'), 'math');
  const science = requiredNumber(getArgValue(args, '--science'), 'science');
  const english = requiredNumber(getArgValue(args, '--english'), 'english');

  const marks = [math, science, english];
  const grade = calculateGrade(marks);

  console.log(`Student Name: ${studentName}`);
  console.log(`Marks: ${marks.join(', ')}`);
  console.log(`Grade: ${grade}`);

  // Optional: show a breakdown
  console.log(`Breakdown: ${subjects[0]}=${math}, ${subjects[1]}=${science}, ${subjects[2]}=${english}`);
}

try {
  main();
} catch (err) {
  console.error(String(err.message || err));
  console.error('\nUsage:');
  console.error('  node app-cli.js --name "Deepa" --math 90 --science 80 --english 70');
  process.exit(1);
}

