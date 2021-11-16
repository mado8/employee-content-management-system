SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary
FROM employees
JOIN roles ON employees.role_id = roles.id
FROM roles
JOIN departments ON roles.department_id = departments.id