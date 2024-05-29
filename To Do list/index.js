import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: "Todo",
            message: "Enter Your Task in todo ",
            type: "input",
        },
        {
            name: "addMore",
            type: "confirm", //y or n 
            message: "Do you want to add more task?",
            default: "false"
        }
    ]);
    todos.push(addTask.Todo);
    condition = addTask.addMore;
    console.log(todos);
}
