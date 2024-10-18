INSERT INTO department ( name)
    VALUES 
        ('Sales'),
        ('Marketing'),
        ('Finance'),
        ('Engineering'),
        ('Human Resources')

INSERT INTO role (title, salary , department_id)
    VALUES
        ('Sales Manager', 100000 ,1),
        ('Sales Representative', 80000, 1),
        ('Marketing Manager', 75000, 2),
        ('Marketing Analyst', 60000,2),
        ('Junior Software Engineer', 125000 ,4),
        ('Senior Software Engineer', 180000 ,4),
        ('Recruiter', 75000 , 5),
        ('HR Manager', 85000 ,5),
        ('Financial Analyst', 120000 ,3),
        ('Account Manager', 160000 ,3)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ('John', 'Kennedy', 7 , 8),
        ('Nikola', 'Tesla', 3, null),
        ('Himmat', 'Sandhu', 10, null),
        ('Jane', 'Doe', 2 , 1),
        ('Scrappy', 'McFarland', 6, null),
        ('Sean', 'Coombs', 1, null),
        ('Buggs', 'Bunny', 8, null),
        ('Jacob', 'Martinelli', 5 , 6),
        ('Mario', 'Andretti', 4 , 3),
        ('Monkey D.', 'Luffy', 9 , 10)