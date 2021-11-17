const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const createDepartment = require('./lib/department');
const createRole = require('./lib/role');
const createEmployee = require('./lib/employee');

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

// prompts to interact with database

// initial prompt 
const userInteract = [
    {
        type: 'list',
        name: 'interact',
        message: '✩ What would you like to do? ✩',
        choices: [
        '✩ view all employees ✩', '✩ view all roles ✩', '✩ view all departments ✩', 
        '✩ update employee ✩', 
        '✩ add role ✩', '✩ add department ✩', '✩ add employee ✩', 
        '✩ remove department ✩', '✩ remove role ✩', '✩ remove employee ✩',
        '✩ quit ✩'
        ],
    },
];

// add new employee to database prompt
const addEmployee = [
    {
        type: 'input',
        name: 'id',
        message: '✩ Enter employee\'s id. ✩',
    },
    {
        type: 'input',
        name: 'firstName',
        message: '✩ Enter employee\'s first name. ✩',
    },
    {
        type: 'input',
        name: 'lastName',
        message: '✩ Enter employee\'s last name. ✩',
    },
    {
        type: 'input',
        name: 'roleId',
        message: '✩ Enter employee\'s role id. ✩',
    },
    {
        type: 'input',
        name: 'manager',
        message: '✩ Enter employee\'s manager id. ✩',
    }
];

// add new role to database prompt
const addRole = [
    {
        type: 'input',
        name: 'roleTitle',
        message: '✩ What is the role\'s title? ✩',
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: '✩ Enter role\'s salary. ✩',
    },
    {
        type: 'input',
        name: 'roleDepartment',
        message: '✩ Enter role\'s department id. ✩',
    }
];

// add new department to database prompt
const addDepartment = [
    {
        type: 'input',
        name: 'departmentName',
        message: '✩ Enter name of department. ✩',
    }
];

// remove employee from database prompt
const removeEmployee = [
    {
        type: 'input',
        name: 'employeeRemove',
        message: '✩ What is the id of the employee you would like to remove? ✩',
    }
];

// remove role from database prompt
const removeRole = [
    {
        type: 'input',
        name: 'roleRemove',
        message: '✩ What is the id of the role you would like to remove? ✩',
    }
];

// remove department from database prompt
const removeDepartment = [
    {
        type: 'input',
        name: 'departmentRemove',
        message: '✩ What is the id of the department you would like to remove? ✩',
    }
];

// update existing employee using id prompt
const updateEmployee = [
    {
        type: 'input',
        name: 'employeeUpdate',
        message: '✩ What is the id of the employee you would like to update? ✩',
    },
    {
        type: 'list',
        name: 'employeeChange',
        message: '✩ Which of the following would you like to update? ✩',
        choices: ['✩ id ✩','✩ first name ✩','✩ last name ✩','✩ role id ✩','✩ manager ✩',],
    }
];

// prompts to change existing data for employee
const updateId = [
    {
        type: 'input',
        name: 'updateId',
        message: '✩ What is the employee\'s new id? ✩',
    },
];

const updateFName = [
    {
        type: 'input',
        name: 'updateFname',
        message: '✩ What is the employee\'s new first name? ✩',
    },
];

const updateLName = [
    {
        type: 'input',
        name: 'updateLname',
        message: '✩ What is the employee\'s new last name? ✩',
    },
];

const updateRole = [
    {
        type: 'input',
        name: 'updateRole',
        message: '✩ What is the employee\'s new role id? ✩',
    },
];

const updateManager = [
    {
        type: 'input',
        name: 'updateManager',
        message: '✩ What is the employee\'s new manager id? ✩',
    },
];

// functions to initialize inquirer

const addEmployeePrompt = () => {
    inquirer.prompt(addEmployee).then((answers) => {
        newEmployee = new createEmployee(answers.id, answers.firstName, answers.lastName, answers.roleId, answers.manager)
    }).catch((error) => {
        console.error(error);
    })
}

const addRolePrompt = () => {
    inquirer.prompt(addRole).then((answers) => {
        newRole = createRole(answers.roleTitle, answers.roleSalary, answers.roleDepartment)
    }).catch((error) => {
        console.error(error);
    })
}

const addDepartmentPrompt = () => {
    inquirer.prompt(addDepartment).then((answers) => {
        newDepartment = createDepartment(answers.departmentName)
    }).catch((error) => {
        console.error(error);
    })
}

const removeEmployeePrompt = () => {
    inquirer.prompt(removeEmployee).then((answers) => {

    }).catch((error) => {
        console.error(error);
    })
}

const removeRolePrompt = () => {
    inquirer.prompt(removeRole).then((answers) => {
        
    }).catch((error) => {
        console.error(error);
    })
}

const removeDepartmentPrompt = () => {
    inquirer.prompt(removeDepartment).then((answers) => {
        
    }).catch((error) => {
        console.error(error);
    })
}

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
        `INSERT INTO Customers SET ID=2, FirstName='User2';`,
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
const addEmployeeFunction = () => {
    addEmployeePrompt();
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
const addRoleFunction = () => {
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
const addDepartmentFunction = () => {
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
const removeEmployeeFunction = () => {
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
const removeRoleFunction = () => {
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
const removeDepartmentFunction = () => {
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
const updateEmployeeFunction = () => {
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
            addEmployeeFunction();
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


userInteractFunction();