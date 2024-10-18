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

//TODO: WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
    const sql = `SELECT salary , emp.first_name AS first_name, emp.last_name AS last_name , mng.first_name AS manager_first_name , mng.last_name AS manager_last_name, title AS role, name AS department FROM employee emp LEFT JOIN employee mng ON emp.manager_id = mng.id INNER JOIN role ON role.id = emp.role_id INNER JOIN department ON role.department_id = department.id `;
    pool.query(sql, (err, result) => {
        if (err) {
            console.error('Error:', err);
            startCli();
        } else {
            console.table(result.rows);
            startCli();
        }
    })
}

//TODO: WHEN I choose to add an employee THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
    const roleQuery = `SELECT * FROM role`;
    pool.query(roleQuery, (err, role) => {
        if (err) {
            console.error('Error: ', err);
            startCli();
        } else {
            console.table(role.rows);
            const roleQuery = `SELECT * FROM employee`;
            pool.query(roleQuery, (err, emp) => {
                if (err) {
                    console.error('Error: ', err);
                    startCli();
                } else {
                    console.table(emp.rows);
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
                                type: 'list',
                                message: 'Select Role:',
                                choices: role.rows.map((role) => {
                                    return {
                                        name: `${role.title}`,
                                        value: role,
                                    };
                                })
                            },
                            {
                                name: 'managerId',
                                type: 'list',
                                message: 'Select Manager:',
                                choices: emp.rows.map((emp) => {
                                    return {
                                        name: `${emp.first_name}`,
                                        value: emp,
                                    };
                                })
                            },
                        ])
                        .then((response) => {
                            const newEmpQuery = `INSERT INTO employee (first_name , last_name, role_id, manager_id) VALUES ($1 , $2 , $3, $4) RETURNING *`;
                            pool.query(newEmpQuery, [response.firstName, response.lastName, response.roleId.id, response.managerId.manager_id], (err, result) => {
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
            })
        }
    })
}

//TODO: WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmployeeRole() {
    const currentEmpRoleQuery = `SELECT * FROM employee`;
    pool.query(currentEmpRoleQuery, (err, emp) => {
        if (err) {
            console.error('Error:', err);
        } else {
            console.table(emp.rows);
            const currentEmpRoleQuery = `SELECT * FROM role`;
            pool.query(currentEmpRoleQuery, (err, role) => {
                if (err) {
                    console.error('Error:', err);
                } else {
                    console.table(role.rows);
                }
                inquirer
                    .prompt([
                        {
                            name: 'employeeId',
                            type: 'list',
                            message: 'Select Employee:',
                            choices: emp.rows.map((emp) => {
                                return {
                                    name: `${emp.first_name}`,
                                    value: emp,
                                };
                            })
                        },
                        {
                            name: 'newRoleId',
                            type: 'list',
                            message: 'Select new Role:',
                            choices: role.rows.map((role) => {
                                return {
                                    name: `${role.title}`,
                                    value: role,
                                };
                            })
                        }
                    ])
                    .then((response) => {
                        const updateEmpRole = `UPDATE employee SET role_id = $2 WHERE id = $1 RETURNING *`;
                        pool.query(updateEmpRole, [response.employeeId.id, response.newRoleId.id], (err, result) => {
                            if (err) {
                                console.error('Error:', err);
                                startCli();
                            } else {
                                console.log(`Employee Role Updated with ${response.newRoleId.title}`);
                                console.table(result.rows);
                                startCli();
                            }
                        })
                    })
            })
        }
    })
}

//TODO: WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
    const sql = `SELECT * FROM role JOIN department ON role.department_id = department.id`;
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

//TODO: WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    const roleQuery = `SELECT * FROM department`;
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
                        type: 'list',
                        message: 'Enter Department: ',
                        choices: result.rows.map((department) => {
                            return {
                                name: `${department.name}`,
                                value: department,
                            };
                        })
                    }
                ])
                .then((response) => {
                    const sql = `INSERT INTO role (title , salary, department_id) VALUES ($1, $2, $3) RETURNING *`;
                    pool.query(sql, [response.roleTitle, response.roleSalary, response.dept.id], (err, result) => {
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

//TODO: WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
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

//TODO: WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDept',
                type: 'input',
                message: 'Enter name of new Department',
            }
        ])
        .then((response) => {
            const sql = `INSERT INTO department (name) VALUES ($1) RETURNING department`;
            pool.query(sql, [response.newDept], (err, result) => {
                if (err) {
                    console.error('Error: ', err);
                    startCli();
                } else {
                    console.log('New Department Added.');
                    console.table(result.rows)
                    startCli();
                }
            })
        })
}


