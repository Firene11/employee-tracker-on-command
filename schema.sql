DROP DATABASE if exists employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id int auto_increment primary key,
    department_name varchar(100) not null
);

CREATE TABLE roles (
    id int auto_increment primary key,
    title varchar(100) not null,
    salary decimal not null,
    index idx_salary (salary),
    department_id int not null,
    foreign key (department_id) references department(id)
);

CREATE TABLE employees (
    id int auto_increment primary key,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    roles_id int not null,
    manager_id int null,
    foreign key (roles_id) references roles(id),
    foreign key (manager_id) references employees(id)
);