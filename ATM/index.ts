#! /usr/bin/env node

import inquirer from 'inquirer';

let myBalance: number = 100000;
let myPinCode: number = 1234;

let pinAnswer = await inquirer.prompt([
    {
        name: 'pin',
        message: 'Enter your pin:',
        type: 'number',
    },
]);

if (pinAnswer.pin === myPinCode) {
    console.log('Correct pincode');

    let operationAns = await inquirer.prompt([
        {
            name: 'operations',
            message: 'Please! Select options....',
            type: 'list',
            choices: ['withdraw', 'checkbalance'],
        },
    ]);

    if (operationAns.operations === 'withdraw') {
        let amountAns = await inquirer.prompt([
            {
                name: 'amount',
            message: 'Enter your amount',
            type: 'number',
        },
    ]);

    if (amountAns.amount > myBalance) {
        console.log('Insufficient balance!');
    } else {
        myBalance -= amountAns.amount;
       
        console.log(`Withdrawal successful! New balance: ${myBalance}`);
    }
} else if (operationAns.operations === 'checkbalance') {
    console.log(`Your current balance is: ${myBalance}`);
}
} else {
    console.log('Incorrect pincode, try again!');
}
