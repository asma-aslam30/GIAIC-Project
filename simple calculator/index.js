import inquirer from "inquirer";
const answer = await inquirer.prompt([
    { message: "Enter first number", type: "number", name: "firstNumber" },
    { message: "Enter second number", type: "number", name: "secondNumber" },
    {
        message: "Select one of the operators to perform actions",
        type: "list",
        name: "operators",
        choices: [
            "Addition",
            "Subtraction",
            "Multiplication",
            "Division",
            "Modulus",
        ],
    },
]);
const firstNumber = Number(answer.firstNumber);
const secondNumber = Number(answer.secondNumber);
if (answer.operators === "Addition") {
    console.log(firstNumber + secondNumber);
}
else if (answer.operators === "Subtraction") {
    console.log(firstNumber - secondNumber);
}
else if (answer.operators === "Multiplication") {
    console.log(firstNumber * secondNumber);
}
else if (answer.operators === "Division") {
    console.log(firstNumber / secondNumber);
}
else if (answer.operators === "Modulus") {
    console.log(firstNumber % secondNumber);
}
else {
    console.log("Invalid Choice");
}
