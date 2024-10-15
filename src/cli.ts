import { pool, connectToDb } from './connections.js';
import { QueryResult } from 'pg';
import inquirer from 'inquirer';

// TODO: wait to connect to database first
await connectToDb();

// TODO: make a function that houses inquirer and all other functions related to it
function startCli() {
    inquirer
        .prompt([
            {
                // TODO: make the prompts the following choices: What would you like to do? -- view all employees, add employee, update employee role, view all roles, add role, view all departments, add department
                name: 'choices',
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Exit',
                ],
            },
        ])
        // TODO: take the responses from the choices above and see if they need another function to be called or if they can just update from within
        .then((response) => {
            switch (response.choices) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Exit':
                    process.exit(7);
                    break;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        })
}
startCli();

function viewAllEmployees() {
    const sql = `SELECT * FROM employee`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.table(result.rows);
            startCli();
        }
    })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Enter First Name:',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Enter Last Name:',
            },
            {
                name: 'roleId',
                type: 'input',
                message: 'Add a Role ID:',
            }
        ])
        .then((response) => {
            const newEmpQuery = `INSERT INTO employee (first_name , last_name, role_id) VALUES ($1 , $2 , $3) RETURNING *`;
            pool.query(newEmpQuery, [response.firstName, response.lastName, response.roleId], (err, result) => {
                if (err) {
                    console.error('Error:', err);
                    startCli();
                } else {
                    console.log(`New Employee: ${response.firstName} ${response.lastName} added succesfully.`);
                    console.table(result.rows[0]);
                    startCli();
                }
            })
        })
}

function updateEmployeeRole() {
    const currentEmpRoleQuery = `SELECT * FROM employee`;
    pool.query(currentEmpRoleQuery, (err, result) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.table(result.rows);
        }
        inquirer
            .prompt([
                {
                    name: 'currentRoleId',
                    type: 'input',
                    message: 'Select current Role ID:',
                },
                {
                    name: 'newRoleId',
                    type: 'input',
                    message: 'Select new Role ID:'
                }
            ])
            .then((response) => {
                const updateEmpRole = `UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *`;
                pool.query(updateEmpRole, [response.currentRoleId, response.newRoleId], (err, result) => {
                    if (err) {
                        console.error('Error:', err);
                        startCli();
                    } else {
                        console.log(`Employee Role Updated from ${response.currentRoleId} to ${response.newRoleId}`);
                        console.table(result.rows)
                        startCli();
                    }
                })
            })
    })
}

function viewAllRoles() {
    const sql = `SELECT * FROM role INNER JOIN department ON role.id = department.id`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error: ', err);
            startCli();
        } else {
            console.table(result.rows);
            startCli();
        }
    })
}

function addRole() {
    const roleQuery = `SELECT role.title, role.salary, department_id AS Department_Name FROM role JOIN department ON department_id = department.id`;
    pool.query(roleQuery, (err, result) => {
        if (err) {
            console.error('Error: ', err);
            startCli();
        } else {
            console.table(result.rows);
            inquirer    
            .prompt([
                {
                    name: 'roleTitle',
                    type: 'input',
                    message: 'Please input the Title for this role',
                },
                {
                    name: 'roleSalary',
                    type: 'input',
                    message: 'Please add the Salary'
                },
                {
                    name: 'dept',
                    type: 'input',
                    message: 'Enter Department ID: ',
                }
            ])
            .then((response) => {
                const sql = `INSERT INTO role (title , salary, department_id) VALUES ($1, $2, $3) RETURNING *`;
                pool.query(sql, [response.roleTitle, response.roleSalary, response.dept], (err, result) => {
                    if (err) {
                        console.error('Error: ', err);
                        startCli();
                    } else {
                        console.table(result.rows);
                        startCli();
                    }
                })
            })
        }
    })
}

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error: ', err);
        } else {
            console.table(result.rows);
            startCli();
        }
    })
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'Enter name of new Department',
            },
            {
                name: 'newDeptId',
                type: 'input',
                message: 'Assign a ID number'
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO department (id , name) VALUES ($1, $2)`;
            pool.query(sql, [response.newDeptId, response.newDept], (err, result) => {
                if (err) {
                    console.error('Error: ', err);
                } else {
                    console.log('New Department Added.');
                    console.table(result.rows);
                    startCli();
                }
            })
        })
}


