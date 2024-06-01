import inquirer from "inquirer";
const currency = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.76,
    INR: 74.57,
    PKR: 280
};
let user_answer = await inquirer.prompt([
    {
        name: "From",
        message: "Enter from currency:",
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "To",
        message: "Enter to currency:",
        type: "list",
        choices: ["USD", "EUR", "GBP", "INR", "PKR"]
    },
    {
        name: "Amount",
        message: "Enter your given amount:",
        type: "number"
    }
]);
let fromAmunt = currency[user_answer.From];
let toAmount = currency[user_answer.To];
let amount = user_answer.Amount;
let baseAmount = amount / fromAmunt;
let convertedAmount = baseAmount * toAmount;
console.log("From currency: " + fromAmunt);
console.log("To currency: " + toAmount);
console.log("Amount: " + amount);
console.log("Converted Amount is: " + Math.floor(convertedAmount));
