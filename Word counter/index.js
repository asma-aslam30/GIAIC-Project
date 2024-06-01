import inquirer from "inquirer";

const answers = await inquirer.prompt([{
    name: "Sentence",
    type: "input",
    message: "Enter your sentence to count words:"
}]);

// Corrected variable name and split sentence into words
const words = answers.Sentence.trim().split(/\s+/);

console.log(words); // Debugging output to see the words array
console.log(`The sentence contains ${words.length} words.`);
