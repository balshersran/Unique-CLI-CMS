import express from 'express';
import { Pool, connectToDb} from './connections.ts';
import inquirer from 'inquirer';

// TODO: wait to connect to database first
await connectToDb();

// TODO: make a variable that will call on express
const app = express();


// TODO: make a function that houses inquirer and all other functions related to it
startCli(): void {
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
        .then((response) => {
            switch (response.action) {
                case 'View All Employees':
                    this.viewEmployees();
                    break;
                case 'Add Employee':
                    this.addEmployee();
                    break;
                case 'Update Employee Role':
                    this.updateEmpRole();
                    break;
                case 'View All Roles':
                    this.viewRoles();
                case 'Add Role':
                    this.addRole();
                case 'View All Departments':
                    this.viewDepartments();
                    break;
                case 'Add Department':
                    this.addDepartment();
                    break;
                default:
                    process.exit[0];
            }
        })
};

//TODO: create the viewEmployees method which selects all table data from the employees table
viewEmployees()