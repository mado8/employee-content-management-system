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

// prompts to interact with database

// initial prompt 
const userInteract = [
    {
        type: 'list',
        name: 'interact',
        message: '✩ What would you like to do? ✩',
        choices: [
        '✩ view all employees ✩', '✩ view all roles ✩', '✩ view all departments ✩', 
        '✩ update employee ✩', '✩ view department budgets ✩',
        '✩ add role ✩', '✩ add department ✩', '✩ add employee ✩', 
        '✩ remove department ✩', '✩ remove role ✩', '✩ remove employee ✩',
        '✩ quit ✩'
        ],
    },
];

const sortEmployees = [
    {
        type: 'list',
        name: 'sort',
        message: '✩ How would you like to sort the employees? ✩',
        choices: [
        '✩ default ✩', '✩ by manager ✩', '✩ by departments ✩', 
        ],
    },
]

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



// -------- prompts to change existing data for employee --------

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



// -------- functions to initialize inquirer + initialize functions to change database --------

// prompts info required to add new employee to database and sends it to function to update with inputted info
const addEmployeePrompt = () => {
    inquirer.prompt(addEmployee).then((answers) => {
        if (answers.id === '' || answers.firstName === '' || answers.lastName === '' || answers.roleId === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        addEmployeeFunction(answers);
    }).catch((error) => {
        console.error(error);
    });
};

const addRolePrompt = () => {
    inquirer.prompt(addRole).then((answers) => {
        if (answers.roleTitle === '' || answers.roleSalary === '' || answers.roleDepartment === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        addRoleFunction(answers);
    }).catch((error) => {
        console.error(error);
    });
};

const addDepartmentPrompt = () => {
    inquirer.prompt(addDepartment).then((answers) => {
        if (answers.departmentName === null || answers.departmentName === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        addDepartmentFunction(answers);
    }).catch((error) => {
        console.error(error);
    });
};

const removeEmployeePrompt = () => {
    inquirer.prompt(removeEmployee).then((answers) => {
        if (answers.employeeRemove === null || answers.employeeRemove === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        removeEmployeeFunction(answers);
    }).catch((error) => {
        console.error(error);
    });
};

const removeRolePrompt = () => {
    inquirer.prompt(removeRole).then((answers) => {
        if (answers.roleRemove === null || answers.roleRemove === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        removeRoleFunction(answers);
    }).catch((error) => {
        console.error(error);
    });
};

const removeDepartmentPrompt = () => {
    inquirer.prompt(removeDepartment).then((answers) => {
        if (answers.departmentRemove === null || answers.departmentRemove === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        removeDepartmentFunction(answers);
    }).catch((error) => {
        console.error(error);
    });
};



// -------- functions to prompt and update employees in database (combined) --------

// function to change employee's id to desired imput
const updateIdPrompt = (id) => {
    inquirer.prompt(updateId).then((answers) => {
        if (answers.updateId === null || answers.updateId === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        connection.query(
            `UPDATE employees SET id = ${answers.updateId} WHERE id = ${id.employeeUpdate}`,
            function(err) {
                if (err) return console.log(err);
                console.log("\n", "Successfully Updated Employee!", "\n")
                viewEmployees();
            }
        );
    }).catch((error) => {
        console.error(error);
    });
};

// function to change employee's first name to desired imput
const updateFNamePrompt = (id) => {
    inquirer.prompt(updateFName).then((answers) => {
        if (answers.updateFname === null || answers.updateFname === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        }
        connection.query(
            `UPDATE employees SET first_name = "${answers.updateFname}" WHERE id = ${id.employeeUpdate}`,
            function(err) {
                if (err) return console.log(err);
                console.log("\n", "Successfully Updated Employee!", "\n")
                viewEmployees();
            }
        );
    }).catch((error) => {
        console.error(error);
    });
};

// function to change employee's last name to desired imput
const updateLNamePrompt = (id) => {
    inquirer.prompt(updateLName).then((answers) => {
        if (answers.updateLname === null || answers.updateLname === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        connection.query(
            `UPDATE employees SET last_name = "${answers.updateLname}" WHERE id = ${id.employeeUpdate}`,
            function(err) {
                if (err) return console.log(err);
                console.log("\n", "Successfully Updated Employee!", "\n")
                viewEmployees();
            }
        );
    }).catch((error) => {
        console.error(error);
    });
};

// function to change employee's role to desired imput
const updateRolePrompt = (id) => {
    inquirer.prompt(updateRole).then((answers) => {
        if (answers.updateRole === null || answers.updateRole === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        connection.query(
            `UPDATE employees SET role_id  = ${answers.updateRole} WHERE id = ${id.employeeUpdate}`,
            function(err) {
                if (err) return console.log(err);
                console.log("\n", "Successfully Updated Employee!", "\n")
                viewEmployees();
            }
        );
    }).catch((error) => {
        console.error(error);
    });
};

// function to change employee's manager to desired imput
// *********************** BONUS *************************
const updateManagerPrompt = (id) => {
    inquirer.prompt(updateManager).then((answers) => {
        if (answers.updateManager === null || answers.updateManager === '') {
            console.log('\n',"Input is required.", '\n')
            return userInteractFunction();
        };
        connection.query(
            `UPDATE employees SET manager = ${answers.updateManager} WHERE id = ${id.employeeUpdate}`,
            function(err) {
                if (err) return console.log(err);
                console.log("\n", "Successfully Updated Employee!", "\n")
                viewEmployees();
            }
        );
    }).catch((error) => {
        console.error(error);
    });
};



//  --------- functions to interact with database using mysql2 and user input ----------

// create connection to database
const connection = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    database: 'employees_db'
    },
);

// view current employees 
const viewEmployees = () => {
    connection.query(
       `SELECT employees.id AS ID, employees.first_name AS "First Name", 
        employees.last_name AS "Last Name", roles.title AS Title, departments.department AS Department, 
        roles.salary AS Salary, employees.manager AS Manager
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
       `SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, 
        roles.department_id AS "Department ID", departments.department AS Department
        FROM roles
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

// view current departments
const viewDepartments = () => {
    connection.query(
        `SELECT id AS ID, department AS Department
         FROM departments`,
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
const addEmployeeFunction = (newEmployee) => {
    connection.query(
        // id, first_name, last_name, role_id, manager
        `INSERT INTO employees SET id = ${newEmployee.id}, first_name = "${newEmployee.firstName}", 
         last_name = "${newEmployee.lastName}", role_id = ${newEmployee.roleId};`,
        function(err) {
            if (err) return console.log(err);
            console.log("\n", "Successfully Added Employee!", "\n")
            viewEmployees();
        }
    );
};

// add new role
const addRoleFunction = (newRole) => {
    connection.query(
        // title, salary, department_id
        `INSERT INTO roles SET title = "${newRole.roleTitle}", salary = ${newRole.roleSalary}, 
        department_id = ${newRole.roleDepartment};`,
        function(err) {
            if (err) return console.log(err);
            console.log("\n", "Successfully Added Role!", "\n")
            viewRoles();
        }
    );
};

// add new department
const addDepartmentFunction = (newDepartment) => {
    connection.query(
        `INSERT INTO departments SET department = "${newDepartment.departmentName}";`,
        function(err) {
            if (err) return console.log(err);
            console.log("\n", "Successfully Added Department!", "\n")
            viewDepartments();
        }
    );
};

// remove existing employee
// *********************** BONUS *************************
const removeEmployeeFunction = (answers) => {
    connection.query(
        `DELETE FROM employees WHERE id = ${answers.employeeRemove}`,
        function(err) {
            if (err) return console.log(err);
            console.log("\n", "Successfully Removed Employee!", "\n")
            userInteractFunction();
        }
    );
};

// remove existing role
// *********************** BONUS *************************
const removeRoleFunction = (answers) => {
    connection.query(
        `DELETE FROM roles WHERE id = ${answers.roleRemove}`,
        function(err) {
            if (err) return console.log(err);
            console.log("\n", "Successfully Removed Role!", "\n")
            userInteractFunction();
        }
    );
};

// remove existing department
// *********************** BONUS *************************
const removeDepartmentFunction = (answers) => {
    connection.query(
        `DELETE FROM departments WHERE id = ${answers.departmentRemove}`,
        function(err) {
            if (err) return console.log(err);
            console.log("\n", "Successfully Removed Department!", "\n")
            userInteractFunction();
        }
    );
};

// sort by manager
// *********************** BONUS *************************
const sortManager = () => {
    connection.query(
        `SELECT employees.id AS ID, employees.first_name AS "First Name", 
         employees.last_name AS "Last Name", roles.title AS Title, departments.department AS Department, 
         roles.salary AS Salary, employees.manager AS Manager
         FROM employees 
         JOIN roles ON employees.role_id = roles.id 
         JOIN departments ON roles.department_id = departments.id
         ORDER BY employees.manager DESC`,
         function(err, results) {
             if (err) return console.log(err);
             console.log('\n');
             console.table(results); // results contains rows returned by server
             console.log('\n');
             userInteractFunction();
         }
     );
};

// sort by department 
// *********************** BONUS *************************
const sortDepartment = () => {
    connection.query(
        `SELECT employees.id AS ID, employees.first_name AS "First Name", 
         employees.last_name AS "Last Name", roles.title AS Title, departments.department AS Department, 
         roles.salary AS Salary, employees.manager AS Manager
         FROM employees 
         JOIN roles ON employees.role_id = roles.id 
         JOIN departments ON roles.department_id = departments.id
         ORDER BY departments.department DESC`,
         function(err, results) {
             if (err) return console.log(err);
             console.log('\n');
             console.table(results); // results contains rows returned by server
             console.log('\n');
             userInteractFunction();
         }
     );
};

// calculate department's budget
// *********************** BONUS *************************
const departmentBudget = () => {
    connection.query(
        `SELECT departments.department AS Department,
         SUM(roles.salary) AS Budget
         FROM employees
         JOIN roles ON employees.role_id = roles.id 
         JOIN departments ON roles.department_id = departments.id 
         GROUP BY departments.department
         `,
         function(err, results) {
            if (err) return console.log(err);
            console.log('\n');
            console.table(results); // results contains rows returned by server
            console.log('\n');
            userInteractFunction();
        }
    );
}

// sort by prompt function
const sortBy = () => {
    inquirer.prompt(sortEmployees).then((answers) => {
        if (answers.sort === '✩ default ✩') {
            viewEmployees();
        } else if (answers.sort === '✩ by manager ✩') {
            sortManager();
        } else if (answers.sort === '✩ by departments ✩') {
            sortDepartment();
        }
    }).catch((error) => {
        console.error(error);
    })
};

// asks for employee id and calls function to update desired employee feature
const updateEmployeePrompt = () => {
    inquirer.prompt(updateEmployee).then((answers) => {
        if (answers.employeeUpdate === null || answers.employeeUpdate === '') {
            console.log('\n',"Input is required.", '\n')
            userInteractFunction();
        } else if (answers.employeeChange === '✩ id ✩') {
            updateIdPrompt(answers);
        } else if (answers.employeeChange === '✩ first name ✩') {
            updateFNamePrompt(answers);
        } else if (answers.employeeChange === '✩ last name ✩') {
            updateLNamePrompt(answers);
        } else if (answers.employeeChange === '✩ role id ✩') {
            updateRolePrompt(answers)
        } else if (answers.employeeChange === '✩ manager ✩') {
            updateManagerPrompt(answers);
        }
    }).catch((error) => {
        console.error(error);
    })
};

// create function for prompt
const userInteractFunction = () => {
    inquirer.prompt(userInteract).then((answers) => {

        if (answers.interact === '✩ view all employees ✩'){
            sortBy();
        } else if (answers.interact === '✩ add employee ✩'){
            addEmployeePrompt();
        } else if (answers.interact === '✩ update employee ✩'){
            updateEmployeePrompt();
        } else if (answers.interact === '✩ remove employee ✩'){
            removeEmployeePrompt();
        } else if (answers.interact === '✩ view all roles ✩'){
            viewRoles();
        } else if (answers.interact === '✩ add role ✩'){
            addRolePrompt();
        } else if (answers.interact === '✩ remove role ✩'){
            removeRolePrompt();
        } else if (answers.interact === '✩ view all departments ✩'){
            viewDepartments()
        } else if (answers.interact === '✩ add department ✩'){
            addDepartmentPrompt();
        } else if (answers.interact === '✩ remove department ✩'){
            removeDepartmentPrompt(); 
        } else if (answers.interact === '✩ view department budgets ✩'){
            departmentBudget();
        } else {
            return process.exit();
        }
    }).catch((error) => {
        console.error(error);
    })
};


userInteractFunction();