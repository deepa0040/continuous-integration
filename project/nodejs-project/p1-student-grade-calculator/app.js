console.log('Welcome to the Student Grade Calculator!');
const subjects = { name: 'Student Name', marks: ['Math', 'Science', 'English'] };
const readline = require('readline');

function calculateGrade(marks) {
    const total = marks.reduce((acc, mark) => acc + mark, 0); // acc stands for accumulator , mark is the current value being processed in the array
    const average = total / marks.length;
    if (average >= 90) return 'A';
    if (average >= 80) return 'B';
    if (average >= 70) return 'C';
    if (average >= 60) return 'D';
    return 'F';
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Step 1: How to take input for the each subject and calculate the grade
rl.question(`Enter ${subjects.name}: `, (name) => {
    const studentName = name.trim();
    const marks = [];
    let currentSubjectIndex = 0;

    function askForMarks() {
        if (currentSubjectIndex < subjects.marks.length) {
            rl.question(`Enter marks for ${subjects.marks[currentSubjectIndex]}: `, (answer) => {
                const mark = parseFloat(answer.trim());
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
            const grade = calculateGrade(marks);
            console.log(`Student Name: ${studentName}`);
            console.log(`Marks: ${marks.join(', ')}`);
            console.log(`Grade: ${grade}`);
            rl.close();
        }
    }

    askForMarks();
}); 
