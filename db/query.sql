-- Drop a database if it exists beforehand
DROP DATABASE IF EXISTS cms_db;

-- Create a new database labled cms_db
CREATE DATABASE cms_db;

-- go to the database
\c cms_db

-- refer to schema.sql / seeds.sql for the remainder of the codes below
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- make query for view all employees method
SELECT salary , emp.first_name AS first_name, emp.last_name AS last_name , mng.first_name AS manager_first_name , mng.last_name AS manager_last_name, title AS role, name AS department 
FROM employee emp 
LEFT JOIN employee mng ON emp.manager_id = mng.id 
INNER JOIN role ON role.id = emp.role_id 
INNER JOIN department ON role.department_id = department.id 

-- make a queries needed for add employee method
SELECT * FROM role

SELECT * FROM employee

INSERT INTO employee (first_name , last_name, role_id, manager_id) VALUES ($1 , $2 , $3, $4) RETURNING *

-- make queries for update employee role method
SELECT * FROM employee

SELECT * FROM role

UPDATE employee SET role_id = $2 WHERE id = $1 RETURNING *

-- make query for view all roles method 
SELECT * FROM role JOIN department ON role.department_id = department.id

-- make queries for add role method
SELECT * FROM department

NSERT INTO role (title , salary, department_id) VALUES ($1, $2, $3) RETURNING *

-- make query for view all departments method
SELECT * FROM department

-- make query for add department method
INSERT INTO department (ame) VALUES ($1)
