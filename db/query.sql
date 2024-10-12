SELECT * FROM employee;

SELECT * FROM role;
DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

\c cms_db

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
)

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
)

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL, 
    manager_id INTEGER,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
)

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

INSERT INTO department (id , name)
    VALUES 
        (1, 'Sales'),
        (2, 'Marketing'),
        (3, 'Finance'),
        (4, 'Engineering'),
        (5, 'Human Resources')

INSERT INTO role (id, title, salary , department_id)
    VALUES
        (1, 'Sales Manager', 100000 ,1),
        (2, 'Sales Representative', 80000, 1),
        (3, 'Marketing Manager', 75000, 2),
        (4, 'Marketing Analyst', 60000,2),
        (5, 'Junior Software Engineer', 125000 ,4),
        (6, 'Senior Software Engineer', 180000 ,4),
        (7, 'Recruiter', 75000 , 5),
        (8, 'HR Manager', 85000 ,5),
        (9, 'Financial Analyst', 120000 ,3),
        (10, 'Account Manager', 160000 ,3)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
        (1, 'John', 'Kennedy', 7 , 8),
        (2, 'Nikola', 'Tesla', 3, null),
        (3, 'Himmat', 'Sandhu', 10, null),
        (4, 'Jane', 'Doe', 2 , 1),
        (5, 'Scrappy', 'McFarland', 6, null),
        (6, 'Sean', 'Coombs', 1, null),
        (7, 'Buggs', 'Bunny', 8, null),
        (8, 'Jacob', 'Martinelli', 5 , 6),
        (9, 'Mario', 'Andretti', 4 , 3),
        (10, 'Monkey D.', 'Luffy', 9 , 10)
