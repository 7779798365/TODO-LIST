#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let condition = true;
console.log(chalk.bgGreenBright.bold(`W         W  EEEEE  L       CCCCC   OOOOO    M       M  EEEEE `));
console.log(chalk.bgMagenta.bold(` W       W   E      L      C       O     O   MM     MM  E     `));
console.log(chalk.bgGreenBright.bold(`  W  W  W    EEEEE  L     C       O       O  M M   M M  EEEEE `));
console.log(chalk.bgMagenta.bold(`   W W W     E      L      C       O     O   M  M M  M  E     `));
console.log(chalk.bgGreenBright.bold(`    W W      EEEEE  LLLLL   CCCCC   OOOOO    M   M   M  EEEEE `));
console.log(chalk.blue.bgYellow.bold("\n***********************************"));
console.log(chalk.bgRed.bold("*************Todo List*************"));
console.log(chalk.blue.bgYellow.bold("***********************************\n"));
console.log(chalk.bgMagenta.bold("************REGISTRATION************"));
// For Registration
let registrationAnswer = await inquirer.prompt([
    // For Username
    {
        name: "registrationName",
        message: chalk.blue.bold("\nEnter your Name:"),
        type: "input",
        validate: (input) => {
            if (!input.trim()) {
                return '\nName Cannot be Empty.';
            }
            return true;
        },
    },
    // For Password
    {
        name: "registrationPass",
        message: chalk.blue.bold("\nEnter the Password:"),
        type: "password",
        validate: (input) => {
            if (!input.trim()) {
                return '\nPassword Cannot be Empty.';
            }
            return true;
        },
    }
]);
console.log(chalk.bgGreenBright.bold("\nRegisterd Successfully!"));
// For Login
console.log(chalk.bgMagenta.bold("\n**********Login Your Account**********"));
let login = await inquirer.prompt([
    // For Username Login
    {
        name: "loginName",
        message: chalk.cyan.bold("\nEnter Your Username:"),
        type: "input",
        validate: (input) => {
            if (!input.trim()) {
                return '\nUsername Cannot be Empty.';
            }
            return true;
        },
    },
    // For Password Login
    {
        name: "loginPass",
        message: chalk.cyan.bold("\nEnter Your Password:"),
        type: "password",
        validate: (input) => {
            if (!input.trim()) {
                return '\nPassword Cannot be Empty.';
            }
            return true;
        },
    }
]);
// If username && password is correct
if (login.loginName === registrationAnswer.registrationName && login.loginPass === registrationAnswer.registrationPass) {
    console.log(chalk.bgGreenBright.bold("\nLogged In Successfully!"));
    // While loop
    while (condition) {
        let addTask = await inquirer.prompt([
            {
                name: "todo",
                message: chalk.yellowBright.bold("\nWhat you want to add in your todos?"),
                type: "input",
                validate: (input) => {
                    if (!input.trim()) {
                        return '\nTodo Cannot be Empty, Please Enter a Task.';
                    }
                    return true;
                }
            },
            // asking for adding more
            {
                name: "addMore",
                message: chalk.cyan.bold("\nDo you want to add more?"),
                type: "confirm",
                default: "false"
            }
        ]);
        // push in todos array
        todos.push(addTask.todo);
        // Updating the value of condition based on the user's input stored in addTask.addMore
        condition = addTask.addMore;
        console.log(chalk.bgYellow.underline.bold("\nYour Current Todos List is:", chalk.bgCyan(todos)));
        //console.log(todos);
    } // While Loop ends here
    // For Updating the Todo
    let updateTodo = await inquirer.prompt([
        {
            name: "update",
            message: chalk.cyan.bold("\nAre you want to Update any Todo?"),
            type: "confirm",
            default: "false"
        }
    ]);
    // If Update is yes
    if (updateTodo.update) {
        console.log(chalk.bgMagenta.bold("\nUpdating Todo"));
        let updateTodoAns = await inquirer.prompt([
            {
                name: "updateAns",
                message: chalk.cyan.bold("\nSelect which Todo you want to Update:"),
                type: "list",
                choices: todos,
            }
        ]);
        // For writing the Updated todo
        let writeUpdateAns = await inquirer.prompt([
            {
                name: "writeUpdate",
                message: chalk.cyan.bold("\nWrite the new Todo for Updating:"),
                type: "input",
                validate: (input) => {
                    if (!input.trim()) {
                        return '\nTodo Cannot be Empty, Please Enter a Task.';
                    }
                    return true;
                },
            }
        ]);
        // store the index of a selected Updating todo in a variable "selectedIndex"
        const selectedIndex = todos.indexOf(updateTodoAns.updateAns);
        if (selectedIndex !== -1) { // Ensure the selected todo exists in the array
            // Upadte the todo at the selected index with the new todo
            todos[selectedIndex] = writeUpdateAns.writeUpdate;
        }
        console.log(chalk.bgGreenBright.bold("\nTodo were Updated Successfully!"));
        // log the inserted Todo's list
        console.log(chalk.bgYellow.underline.bold("\nYour Current Todos List is:", chalk.bgCyan(todos)));
        // When Update is No
    }
    else {
        console.log(chalk.bgGreenBright.bold("\nNo Todos were Updated!"));
    }
    // For inserting the intodos list
    let insertTodos = await inquirer.prompt([
        {
            name: "insert",
            message: chalk.cyan.bold("\nAre you want to insert the the new Todo in the end of a list?"),
            type: "confirm",
            default: "false"
        }
    ]);
    // If Insert is yes
    if (insertTodos.insert) {
        console.log(chalk.bgMagenta.bold("\nInserting Todo"));
        let writeTodo = await inquirer.prompt([
            {
                name: "write",
                message: chalk.cyan.bold("\nWrite the new Todo which you want to Insert:"),
                type: "input",
                validate: (input) => {
                    if (!input.trim()) {
                        return '\nTodo Cannot be Empty, Please Enter a Task.';
                    }
                    return true;
                },
            }
        ]);
        // Add new todo to the end of the array
        todos.push(writeTodo.write);
        console.log(chalk.bgGreenBright.bold("\nTodo were Inserted Successfully!"));
        // log the inserted Todo's list
        console.log(chalk.bgYellow.underline.bold("\nYour Current Todos List is:", chalk.bgCyan(todos)));
        // when Update is No
    }
    else {
        console.log(chalk.bgGreenBright.bold("\nNo Todos were Inserted!"));
    }
    ;
    // For Delete last todo
    let deleteTodos = await inquirer.prompt([
        {
            name: "delete",
            message: chalk.red.bold("\nAre you want to delete the last todo?"),
            type: "confirm",
            default: "false"
        }
    ]);
    if (deleteTodos.delete) {
        // If confirmed, delete the last todo
        todos.pop();
        console.log(chalk.bgGreenBright.bold("\nLast Todo Deleted Successfully!"));
    }
    else {
        console.log(chalk.bgGreenBright.bold("\nNo Todos were Deleted!"));
    }
    // Logging the Final Todos List
    console.log(chalk.bgYellow.underline.bold("\nYour Final Todos List is:", chalk.bgCyan(todos)));
    // Incorrect username && password
}
else {
    console.log(chalk.bgRed.bold("\nIncorrect Username or Password!"));
}
