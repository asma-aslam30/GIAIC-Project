import inquirer from "inquirer";
// 1.   computer will generate a random number
// 2.   userinput for guessing number
// 3.   campare userinput with computer generated numberand show result
const randomNumber = Math.floor(Math.random() * 100);
console.log(randomNumber);
const answer = await inquirer.prompt([{
        name: "userGuessNumber",
        type: "number",
        message: "Please! Guess a number between 1-100",
    }]);
console.log(answer);
if (answer.userGuessNumber === randomNumber) {
    console.log("Congratulations! you guessed a right number");
}
else {
    console.log("Sorry! you guessed wrong number");
}
