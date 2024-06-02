import inquirer from 'inquirer';

// Language Selection
let languageAnswer = await inquirer.prompt([
    {
        name: 'language',
        message: 'Select your language:',
        type: 'list',
        choices: ['English', 'Chinese', 'Spanish'],
    },
]);

const language = languageAnswer.language;

let myBalance: number = 100000;
let myPinCode: number = 1234;
let attempts: number = 0;
let isLocked: boolean = false;

while (attempts < 3) {
    let pinAnswer = await inquirer.prompt([
        {
            name: 'pin',
            message: language === 'Chinese' ? '请输入您的密码：' : language === 'Spanish' ? 'Ingrese su PIN:' : 'Enter your pin:',
            type: 'number',
        },
    ]);

    if (pinAnswer.pin === myPinCode) {
        console.log(language === 'Chinese' ? '正确的PIN码' : language === 'Spanish' ? 'PIN correcto' : 'Correct pincode');
        attempts = 0; // Reset attempts on successful login

        let operationAns = await inquirer.prompt([
            {
                name: 'operations',
                message: language === 'Chinese' ? '请选择操作....' : language === 'Spanish' ? 'Por favor, seleccione las opciones....' : 'Please! Select options....',
                type: 'list',
                choices: [language === 'Chinese' ? '提款' : 'withdraw', language === 'Chinese' ? '检查余额' : 'checkbalance'],
            },
        ]);

        if (operationAns.operations === 'withdraw') {
            let amountAns = await inquirer.prompt([
                {
                    name: 'amount',
                    message: language === 'Chinese' ? '输入金额：' : language === 'Spanish' ? 'Ingrese su cantidad:' : 'Enter your amount:',
                    type: 'number',
                },
            ]);

            if (amountAns.amount > myBalance) {
                console.log(language === 'Chinese' ? '余额不足!' : language === 'Spanish' ? 'Saldo insuficiente!' : 'Insufficient balance!');
            } else {
                myBalance -= amountAns.amount;
                console.log(language === 'Chinese' ? `提款成功！新余额：${myBalance}` : language === 'Spanish' ? `Retiro exitoso! Nuevo saldo: ${myBalance}` : `Withdrawal successful! New balance: ${myBalance}`);
                // Transaction History
                console.log(language === 'Chinese' ? '感谢您的银行业务！' : language === 'Spanish' ? '¡Gracias por operar con nosotros!' : 'Thank you for banking with us!');
            }
        } else if (operationAns.operations === 'checkbalance') {
            console.log(language === 'Chinese' ? `您当前的余额是：${myBalance}` : language === 'Spanish' ? `Su saldo actual es: ${myBalance}` : `Your current balance is: ${myBalance}`);
            // Transaction History
            console.log(language === 'Chinese' ? '感谢您的银行业务！' : language === 'Spanish' ? '¡Gracias por operar con nosotros!' : 'Thank you for banking with us!');
        }

        break; // Exit the loop after successful operation
    } else {
        attempts++;
        console.log(language === 'Chinese' ? '不正确的PIN码，请重试！' : language === 'Spanish' ? 'PIN incorrecto, intente de nuevo!' : 'Incorrect pincode, try again!');
    }
}

if (attempts === 3) {
    console.log(language === 'Chinese' ? '您的账户已被暂时锁定！' : language === 'Spanish' ? 'Su cuenta ha sido bloqueada temporalmente!' : 'Your account has been temporarily locked!');
}
