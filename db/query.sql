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

CREATE PROCEDURE add_role_and_update_department(title VARCHAR, salary DECIMAL, department_id INTEGER)
AS
BEGIN
    INSERT INTO role (title, salary) VALUES (title, salary) RETURNING id INTO @new_role_id;
    UPDATE department SET role_id = @new_role_id WHERE id = department_id;
END;