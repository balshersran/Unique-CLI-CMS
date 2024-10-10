INSERT INTO TABLE department (id , name)
    VALUES 
        (1, 'Sales'),
        (2, 'Marketing'),
        (3, 'Finance'),
        (4, 'Engineering')
        (5, 'Human Resources')

INSERT INTO roles (id, title, salary , department_id)
    VALUES
        (1, 'Sales Manager', 100000 ,1),
        (2, 'Sales Representative', 80000, 1),
        (3, 'Marketing Manager', , 2),
        (4, 'Marketing Analyst', ,2),
        (5, 'Junior Software Engineer', 125000 ,4),
        (6, 'Senior Software Engineer', 180000 ,4),
        (7, 'Recruiter', 75000 , 5),
        (8, 'HR Manager', 85000 ,5),
        (9, 'Financial Analyst', 120000 ,3),
        (10, 'Account Manager', 160000 ,3)

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
        (1, 'John', 'Kennedy', 7 , ),
        (2, 'Nikola', 'Tesla', 3 , ),
        (3, 'Himmat', 'Sandhu', 10, ),
        (4, 'Jane', 'Doe', 2 , 2)
        (5, 'Scrappy', 'McFarland', 6 , ),
        (6, 'Sean', 'Coombs', 1 , 1),
        (7, 'Buggs', 'Bunny', 8 , ),
        (8, 'Jacob', 'Martinelli', 5 , ),
        (9, 'Mario', 'Andretti', 4 , ),
        (10, 'Monkey D.', 'Luffy', 9 , )