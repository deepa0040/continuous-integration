// basics-learn.js
// Step 1: (commented) How to print and take input from the user in Node.js
// process.stdout.write("Enter the student's name: ");
// process.stdin.on('data', (name) => {
//     const studentName = name.toString().trim();
//     console.log(`Student Name: ${studentName}`);
//     process.exit();
// })

// Step 2: How to take multiple inputs from the user in Node.js
const readline = require('readline');

const subjects = ['Math', 'Science', 'English'];
const marks = [];
let currentSubjectIndex = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askForMarks() {
  if (currentSubjectIndex < subjects.length) {
    rl.question(`Enter marks for ${subjects[currentSubjectIndex]}: `, (answer) => {
      const mark = parseFloat(String(answer).trim());
      if (!isNaN(mark)) {
        marks.push(mark);
        currentSubjectIndex++;
        askForMarks();
      } else {
        console.log('Please enter a valid number.');
        askForMarks();
      }
    });
  } else {
    console.log('Marks entered:', marks);
    rl.close();
  }
}

askForMarks();
