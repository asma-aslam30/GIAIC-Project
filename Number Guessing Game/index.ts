import inquirer from "inquirer";

const randomNumber: number = Math.floor(Math.random() * 100);
console.log(randomNumber);

const guessNumber = async (): Promise<void> => {
    const answer = await inquirer.prompt([{
        name: "userGuessNumber",
        type: "number",
        message: "Please guess a number between 1-100:",
    }]);
    console.log(answer);

    if (answer.userGuessNumber === randomNumber) {
        console.log("Congratulations! You guessed the right number.");
    } else {
        console.log("Sorry! That's not the correct number. Try again.");
        await guessNumber(); // Recursive call until the correct number is guessed
    }
};

guessNumber();
