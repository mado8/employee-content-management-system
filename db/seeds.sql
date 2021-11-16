INSERT INTO departments (department)
VALUES ("Marketing"),
       ("Finance"),
       ("Operations management"),
       ("Human Resource"),
       ("Digital"),
       ("Information Technology"),
       ("Production"),
       ("Security"),
       ("Research and Development");

INSERT INTO roles (title, salary, department_id)
VALUES ("Project Manager", 90000, 1),
       ("Analytics Specialist", 75000, 1),
       ("Creative Head", 70000, 1),
       ("Financial Accountant", 100000, 2),
       ("Operations Coordinator", 50000, 3),
       ("Operations Manager", 70000, 3),
       ("Human Resource Manager", 80000, 4),
       ("Human Resource Consultant", 70000, 4),
       ("Jr. Software Engineer", 50000, 5),
       ("Software Engineer", 80000, 5),
       ("Desktop Support", 60000, 6),
       ("Collaboration", 60000, 6),
       ("Information Security Engineer", 95000, 8),
       ("Cyberecurity Analyst", 90000, 8),
       ("Research Associate", 40000, 9);

INSERT INTO employees (id, first_name, last_name, role_id, manager)
VALUES (2544, "Madeline", "Donley", 9, NULL),
       (1341, "Reade", "Webb", 11, NULL),
       (5247, "Kohaku", "Nigihayami", 1, NULL),
       (6133, "Howl", "Pendragon", 3, 5247),
       (3624, "Kiki", "Delivery", 7, NULL);
