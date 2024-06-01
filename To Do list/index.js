import inquirer from "inquirer";
let todos = [];
let condition = true;
async function manageTodos() {
    while (condition) {
        const { action } = await inquirer.prompt([
            {
                name: "action",
                message: "What would you like to do?",
                type: "list",
                choices: ["Add Task", "Edit Task", "Delete Task", "Exit"],
            },
        ]);
        switch (action) {
            case "Add Task":
                await addTask();
                break;
            case "Edit Task":
                await editTask();
                break;
            case "Delete Task":
                await deleteTask();
                break;
            case "Exit":
                condition = false;
                break;
        }
        console.log("Your To-Do List:", todos);
    }
}
async function addTask() {
    const { task } = await inquirer.prompt([
        {
            name: "task",
            message: "Enter your task:",
            type: "input",
        },
    ]);
    todos.push(task);
    const { addMore } = await inquirer.prompt([
        {
            name: "addMore",
            type: "confirm",
            message: "Do you want to add more tasks?",
            default: false,
        },
    ]);
    if (!addMore) {
        condition = false;
    }
}
async function editTask() {
    if (todos.length === 0) {
        console.log("No tasks to edit.");
        return;
    }
    const { taskIndex, newTask } = await inquirer.prompt([
        {
            name: "taskIndex",
            message: "Select a task to edit:",
            type: "list",
            choices: todos.map((task, index) => ({ name: task, value: index })),
        },
        {
            name: "newTask",
            message: "Enter the new task:",
            type: "input",
        },
    ]);
    todos[taskIndex] = newTask;
}
async function deleteTask() {
    if (todos.length === 0) {
        console.log("No tasks to delete.");
        return;
    }
    const { taskIndex } = await inquirer.prompt([
        {
            name: "taskIndex",
            message: "Select a task to delete:",
            type: "list",
            choices: todos.map((task, index) => ({ name: task, value: index })),
        },
    ]);
    todos.splice(taskIndex, 1);
}
manageTodos();
