import { pool, connectToDb } from './connections.js';
import inquirer from 'inquirer';
import dotenv from 'dotenv';

dotenv.config();

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
                    startCli();
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
}

function addEmployee() {}

function updateEmployeeRole() {}

function viewAllRoles() {
    const sql = `SELECT * FROM role`;
    pool.query(sql, (err, res) => {
        if(err) {
            console.error('Error: ', err);
        } else {
            console.table(res.rows)
        }
    })
}

function addRole() {}

function viewAllDepartments() {
    const sql = `SELECT * FROM department`;
    pool.query(sql, (err, res) => {
        if(err) {
            console.error('Error: ',err);
        } else {
            console.table(res.rows);
        }
    })
}

function addDepartment() {}


