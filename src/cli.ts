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
                name: 'action',
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
        .then((res) => {
            switch (res.action) {
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
    pool.query(sql, (err, res) => {
        if (err) {
            console.error('Error:', err)
        } else {
            console.table(res.rows)
        }
    })
    startCli();
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'Input first name',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'Input last name',
            },
        ])
        .then((response) => {
            const insertNewEmp = `INSERT INTO employee (first_name , last_name) VALUES ($1 , $2) RETURNING id`;
            pool.query(insertNewEmp, [response.firstName, response.lastName], (err, result) => {
                if (err) {
                    console.error('Error:', err);
                }
                const roleQuery = `SELECT id , title FROM role`;
                pool.query(roleQuery, (err, result) => {
                    if (err) {
                        console.error('Error:', err);
                    }
                    inquirer
                        .prompt([
                            {
                                name: 'roleId',
                                type: 'input',
                                message: 'From Role Table shown above, insert desired Role Id:',
                            }
                        ])
                        .then((response) => {
                            const roleID = response.roleId;
                            const insertRoleQuery = `UPDATE employee SET role_id = $1 WHERE id = $2`;
                            pool.query(insertRoleQuery, [roleID], (err, result) => {
                                if (err) {
                                    console.error('Error:', err);
                                    startCli();
                                } else {
                                    console.table(result.rows);
                                    startCli();
                                }
                            })
                        })
                })
            })
        })
}

function updateEmployeeRole() { 
    const updateEmpRole = ``
}

function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    pool.query(sql, (err, res) => {
        if (err) {
            console.error('Error: ', err);
        } else {
            console.table(res.rows)
        }
    })
    startCli();
}

function addRole() {
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
            }
        ])
        .then((res) => {
            const sql = `INSERT INTO role (title , salary) ($1, $2)`;
            pool.query(sql, [res.roleTitle, res.roleSalary], (err, res) => {
                if (err) {
                    console.error('Error: ', err);
                } else {
                    console.table(res.rows)
                }
            })
        })
    return;
}

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    pool.query(sql, (err, res) => {
        if (err) {
            console.error('Error: ', err);
        } else {
            console.table(res.rows);
        }
    })
    startCli();
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
        .then((res) => {
            const sql = `INSERT INTO department (id , name) VALUES ($1, $2)`;
            pool.query(sql, [res.newDeptId, res.newDept], (err, res) => {
                if (err) {
                    console.error('Error: ', err);
                } else {
                    console.log('New Department Added.');
                    console.table(res.rows);
                    startCli();
                }
            })
        })
}


