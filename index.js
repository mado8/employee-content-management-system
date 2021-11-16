const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
const userInteract = [
    {
        type: 'list',
        name: 'interact',
        message: '✩ What would you like to do? ✩',
        choices: [
        '✩ view all employees ✩', '✩ add employee ✩', '✩ update employee ✩', '✩ remove employee ✩',
        '✩ view all roles ✩', '✩ add role ✩', '✩ remove role ✩', 
        '✩ view all departments ✩', '✩ add department ✩', '✩ remove department ✩', 
        '✩ quit ✩'
        ],
    },
];

// create connection to database

const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    database: 'employees_db'
    },
);

//  --------- functions to interact with database ----------

// view current employees 
const viewEmployees = () => {
    connection.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager 
        FROM employees 
        JOIN roles ON employees.role_id = roles.id 
        JOIN departments ON roles.department_id = departments.id`,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// view current roles
const viewRoles = () => {
    connection.query(
       `SELECT id, title, department_id AS department, salary
        FROM roles`,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// view current departments
const viewDepartments = () => {
    connection.query(
        `SELECT * FROM departments`,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// add new employee
const addEmployee = () => {
    connection.query(
        ``,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// add new role
const addRole = () => {
    connection.query(
        ``,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// add new department
const addDepartment = () => {
    connection.query(
        ``,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// remove existing employee
const removeEmployee = () => {
    connection.query(
        ``,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// remove existing role
const removeRole = () => {
    connection.query(
        ``,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// remove existing department
const removeDepartment = () => {
    connection.query(
        ``,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};

// update employee info
const updateEmployee = () => {
    connection.query(
        ``,
        function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
        userInteractFunction();
        }
    );
};


// create function for prompt
function userInteractFunction() {
    inquirer.prompt(userInteract).then((answers) => {

        if (answers.interact === '✩ view all employees ✩'){
            viewEmployees();
        } else if (answers.interact === '✩ add employee ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ update employee ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ remove employee ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ view all roles ✩'){
            viewRoles();
        } else if (answers.interact === '✩ add role ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ remove role ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ view all departments ✩'){
            viewDepartments()
        } else if (answers.interact === '✩ add department ✩'){
            console.log(answers.interact)
        } else if (answers.interact === '✩ remove department ✩'){
            console.log(answers.interact)
        } else {
            return process.exit();
        }

    }).catch((error) => {
        console.error(error);
    })
};

// createDatabase();
// starterData();
userInteractFunction();