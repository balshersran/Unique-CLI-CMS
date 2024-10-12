import { pool, connectToDb } from './connections.js';
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
                message: 'What is the first name?',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name?',
            },
            {
                name: 'roleId',
                type: 'input',
                message: 'Assign a Role Id Number',
            },
        ])
        .then((res) => {
            const sql = `INSERT INTO employee (first_name , last_name , roleId) VALUES ($1 , $2, $3)`;
            pool.query(sql, [res.firstName , res.lastName , res.roleId] , (err, res) => {
                if (err) {
                    console.error('Error: ', err);
                } else {
                    console.log('Employee Added Successfully!');
                    startCli();
                }
            })
        })
}

function updateEmployeeRole() { }

function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    pool.query(sql, (err, res) => {
        if (err) {
            console.error('Error: ', err);
        } else {
            console.table(res.rows)
        }
    })
}

function addRole() { }

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
                message:'Enter name of new Department',
            },
            {
                name: 'newDeptId',
                type: 'input',
                message: 'Assign a ID number'
            }
        ])
        .then((res) => {
            const sql = `INSERT INTO department (id , name) VALUES ($1, $2)`;
            pool.query(sql, [res.newDeptId , res.newDept], (err, res) => {
                if(err) {
                    console.error('Error: ', err);
                } else {
                    console.log('New Department Added.');
                    console.table(res.rows);
                    startCli();
                }
            })
        })
 }


