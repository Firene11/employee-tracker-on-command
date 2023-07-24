INSERT INTO department (department_name)
VALUES
  ('Engineering'),
  ('Sales'),
  ('Marketing'),
  ('Human Resources'),
  ('Finance'),
  ('Legal');


INSERT INTO roles (title, salary, department_id)
VAlUES

  ('Hardware Engineer', 200000, 1),
  ('Software Engineer', 200500, 1),
  ('Sales Lead', 99000, 2),
  ('Sales Consultant', 82000, 2),
  ('Chief of Marketing', 118000, 3),
  ('Senior Marketing Executive', 110000, 3),
  ('Junior Marketing Executive', 82000, 3),
  ('Head of HR', 96000, 4),
  ('HR Advisor', 90000, 4),
  ('Financial Consultant', 92000, 5),
  ('Account Manager', 82000, 5),
  ('Lawyer', 350000, 6),
  ('Legal Advisor', 150000, 6);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES

  ('Robert', 'Johnson', 1, NULL),
  ('Jim', 'Morrison', 1, NULL),
  ('Ron', 'McKernan', 2, 1),
  ('Amy', 'Whinehouse', 2, 2),
  ('Richey', 'Edwards', 3, 1),
  ('Janis', 'Joplin', 3, 3),
  ('Brian', 'Jones', 4, 2),
  ('Kristen', 'Pfaff', 4, 2),
  ('Pete', 'Ham', 5, 1),
  ('Jimi', 'Hendrix', 5, 2),
  ('Jonathan', 'Brandis', 6, 3),
  ('Kurt', 'Cobain', 6, 1),
  ('Anton', 'Yelchin', 3, 2);
