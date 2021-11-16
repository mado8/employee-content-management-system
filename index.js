const inquirer = require('inquirer');
const mysql = require('mysql2');

console.log(`
███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝
                                                                     `, ` 
███╗   ███╗ █████╗ ███╗   ██╗ █████╗  ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗████████╗
████╗ ████║██╔══██╗████╗  ██║██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
██╔████╔██║███████║██╔██╗ ██║███████║██║  ███╗█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   
██║╚██╔╝██║██╔══██║██║╚██╗██║██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   
██║ ╚═╝ ██║██║  ██║██║ ╚████║██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
                                                                                            `, `
███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗
██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║
███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║
╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║
███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║
╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝
                                                     `)

// create prompts to interact with database
const userInteract = {
    type: 'list',
    name: 'interact',
    message: '✩ What would you like to do? ✩',
    choices: ['✩ view all employees ✩', '✩ add employee ✩', 
    '✩ view all roles ✩', '✩ add role ✩', '✩ update employee Role ✩', 
    '✩ view all departments ✩', '✩ add department ✩', '✩ quit ✩'],
};

// create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

// to do 
// create functions for interacting with database
const viewEmployees = {};
const addEmployee = {};
const viewRoles = {};
const addRole = {};
const updateRole = {};
const viewDepartment = {};
const addDepartment = {};

// create function for prompt
function userInteractFunction() {
    inquirer.prompt(userInteract).then((answers) => {

        if(answers.interact === '✩ build a new team! ✩') {
        } else if (answers.interact === '✩ view all employees ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ add employee ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ view all roles ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ add role ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ update employee Role ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ view all departments ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ add department ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ quit ✩'){
            return;
        }

    }).catch((error) => {
        console.error(error);
    })
};

userInteractFunction();