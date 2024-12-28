import inquirer from "inquirer";

const currency: any = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.76,
    INR: 74.57,
    PKR: 280
};

async function currencyConverter() {
    let continueConversion = true;

    while (continueConversion) {
        try {
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
                    type: "number",
                    validate: (input: number) => {
                        if (isNaN(input) || input <= 0) {
                            return "Please enter a positive number";
                        }
                        return true;
                    }
                }
            ]);

            let fromAmount = currency[user_answer.From];
            let toAmount = currency[user_answer.To];
            let amount = user_answer.Amount;

            let baseAmount = amount / fromAmount;
            let convertedAmount = baseAmount * toAmount;

            console.log(`From currency: ${user_answer.From} (${fromAmount})`);
            console.log(`To currency: ${user_answer.To} (${toAmount})`);
            console.log(`Amount: ${amount}`);
            console.log(`Converted Amount is: ${convertedAmount.toFixed(2)}`);

            let continueAnswer = await inquirer.prompt([
                {
                    name: "continue",
                    message: "Do you want to perform another conversion?",
                    type: "confirm"
                }
            ]);

            continueConversion = continueAnswer.continue;

        } catch (error) {
            console.error("An error occurred: ", error);
        }
    }
    console.log("Thank you for using the currency converter!");
}

currencyConverter();
