import { Pool, connectToDb } from './connections.js';
import { QueryResult } from 'pg';
import inquirer from 'inquirer';

// TODO: wait to connect to database first
const pool = new Pool;
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
            if (res.action === 'View All Employees') {
                const viewAllEmp = `SELECT * FROM TABLE employee`;
                pool.query(viewAllEmp);
                console.table(viewAllEmp);
            } else if (res.action === 'Add Employee') {
                addEmployee();
                return;
            } else if (res.action === 'Update Employee Role') {

            } else if (res.action === 'View All Roles') {
                const viewRoles = `SELECT * FROM TABLE roles`;
                pool.query(viewRoles);
                console.table(viewRoles);
            } else if (res.action === 'Add Role') {

            } else if (res.action === 'View All Departments') {
                const viewDepartments = `SELECT * FROM TABLE department`;
                pool.query(viewDepartments);
                console.table(viewDepartments);
            } else if (res.action === 'Add Department') {
                addDepartment();
            } else {
                process.exit(0);
            }
        })
}
startCli();

function addEmployee() {
    inquirer
        .prompt([{
            name: 'first_name',
            type: 'input',
            message: 'What is the first name of new Employee',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'What is the last name of the new Employee',
        }, 
        {
            name: 'emp_id',
            type: 'input',
            message: 'Please assign an id number',
        },
        ])
        .then((res) => {
            const firstName = res.first_name;
            const lastName = res.last_name;
            const empId = res.emp_id;
            const addEmpSql = `INSERT INTO employee (first_name) (last_name) (id) VALUES ($1 ${firstName}) ($2 ${lastName}) ($3 ${empId})`;
            pool.query(addEmpSql);
            console.table(addEmpSql);
        })
}
// function updateEmployeeRole(){}
// function addRole(){}
// TODO: addDepartment method that will insert a new department into department table, need properties name, id
function addDepartment(){
    inquirer
        .prompt([{
            name: 'new_dept',
            type: 'input',
            message: 'What is the name of the new Department',
        },
        {
            name: 'new_dept_id',
            type: 'input',
            message: 'Give your new Department an id number',
        },
    ])
    .then((res) => {
        const newDept = res.new_dept;
        const newDeptId = res.new_dept_id;
        const newDeptSql = `INSERT INTO department (name) (id) VALUES ($1 ${newDept}) ($2 ${newDeptId})`;
        pool.query(newDeptSql);
        console.table(newDeptSql);
    })
}