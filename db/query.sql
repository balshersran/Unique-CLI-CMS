SELECT * FROM employee;

SELECT * FROM role;
DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

\c cms_db

CREATE TABLE department (

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;



DELETE FROM department WHERE id IN (7)

INSERT INTO employee (first_name , last_name) VALUES ($1 , $2)

INSERT INTO employee (first_name , last_name) VALUES ($1 , $2) RETURNING id

UPDATE employee SET role_id = $1 WHERE id = $2

UPDATE employee
SET role_id = ?
WHERE id = ?;

UPDATE employee SET role_id = $1 UPDATE employee SET role_id = $1 WHERE id = $2

SELECT * FROM role INNER JOIN department ON role.id = department.id

SELECT * FROM employee INNER JOIN role ON role.id = employee.id INNER JOIN department ON role.id = department.id INNER JOIN employee ON manager_id = employee.id