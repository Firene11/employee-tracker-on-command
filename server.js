const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'M1dge_6291181',
        database: 'employee_db'
    },
    console.log('\x1b[7m', '--- You are connected to the employee_db database!!! ---')
);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

init();

    function init() {
    inquirer
    .prompt({
        type: "list",
        name: "options",
        message: "WHAT WOULD YOU LIKE TO DO?",
        choices:
        [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
        ]
    })

//create and call a function to give answers, should include if else statements    
    .then(function(answers) {
        console.log(answers);
        if (answers.options === "View all departments") {
            viewDepts();
            console.log("\x1b[32m%s\x1b[1m", "YOU ARE VIEWING ALL DEPARTMENTS!");
        }
        else if (answers.options === "View all roles") {
            viewRoles();
            console.log("\x1b[32m%s\x1b[1m", "YOU ARE VIEWING ALL ROLES!");
        }
        else if (answers.options === "View all employees") {
            viewEmployees();
            console.log("\x1b[32m%s\x1b[1m", "YOU ARE VIEWING ALL EMPLOYEES!");
        }
        else if (answers.options === "Add a department") {
            console.log("\x1b[41m%s\x1b[1m", "YOU ARE ADDING A DEPARTMENT!");
            addDept(); 
        }
        else if  (answers.options === "Add a role") {
            console.log("\x1b[41m%s\x1b[1m", "YOU ARE ADDING A ROLE!");
            addRole();
        }
        else if  (answers.options === "Add an employee") {
            console.log("\x1b[41m%s\x1b[1m", "YOU ARE ADDING AN EMPLOYEE!");
            addEmployee();
        }
        else if  (answers.options === "Update an employee role") {
            console.log("\x1b[41m%s\x1b[1m", "YOU ARE UPDATING AN EMPLOYEE'S ROLE!");
            updateRole();
        }
    
    })
    
};

/* Query database example
db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
}); */

// Create function to view all departments - viewDepts

function viewDepts() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        // start again
        init();
    });
}

// Creat function to view all roles - viewRoles

function viewRoles() {
    db.query('SELECT * FROM roles INNER JOIN department ON roles.id = department.id', function (err, results) {
        console.table(results);
        // start again
        init();
    });
}

// Create function to view all employees - viewEmployees

function viewEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, employees.roles_id, employees.manager_id, roles.title, roles.salary, roles.id, department.id FROM employees LEFT JOIN roles ON employees.roles_id = roles.id LEFT JOIN department ON roles.department_id = department.id', function (err, results) {
        console.table(results);
        // start again
        init();
    });
}

// Create function to add a department - addDept

function addDept() {
    inquirer.prompt([
    {
        type: "input",
        name: "add_dept",
        message: "Enter the name of the department:"
    }
    ]).then(function(deptChoice) {
        const query = `INSERT INTO department (department_name) VALUES ('${deptChoice.add_dept}')`;
        db.query(query, function(err, res) {
        console.log('\x1b[41m%s\x1b[1m',`NEW DEPARTMENT ADDED! ${deptChoice.add_dept}`)
        });
        init();
    });
    };

// Create function to add a role - addRole

function addRole() {
    const dept_choice = [];
    db.query('SELECT department_name FROM department', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            data.forEach((row) => {
                dept_choice.push(row.department_name);
            })
        }
    });

    inquirer.prompt([
        {
            type: "input",
            name: "add_role",
            message: "Enter the name of the role you'd like to add"
        }, 
        {
            type: "number",
            name: "add_salary",
            message: "Enter the salary for this role"
        }, 
        {
            type: "list",
            name: "add_dept",
            message: "What department that this role belongs to?",
            choices: dept_choice
        },
    ]).then(function(roleChoice) {
        const query = `INSERT INTO roles (title, salary, department_id) VALUES ('${roleChoice.add_role}','${roleChoice.add_salary}', '${roleChoice.add_dept}')`
        db.query(query, function(err, res) {
            console.log('\x1b[41m%s\x1b[1m', `NEW ROLE ADDED! ${roleChoice.add_role}`)
        });
        init();
    })
}

// Create a function to add an employee - addEmployee

function addEmployee() {
    const role_choice = [];
    db.query('SELECT title FROM roles', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            data.forEach((row) => {
                role_choice.push(row.title);
            })
        }
    });

    const manager_choice = [];
    db.query('SELECT * FROM employees WHERE manager_id IS NOT NULL', function (err, data) {
        if (err) {
            console.error(err);
        } else {
            data.forEach((row) => {
                manager_choice.push(row.manager_id + row.first_name + row.last_name);
            })
        }
    });

    inquirer.prompt([
        {
            type: "input",
            name: "first",
            message: "Enter the employee's first name"
        }, 
        {
            type: "input",
            name: "last",
            message: "Enter the employee's last name"
        }, 
        {
            type: "list",
            name: "role",
            message: "What is the employee's role",
            choices: role_choice
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: manager_choice
        }
    ]).then(function(employee) {
        const query = `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ('${employee.first}','${employee.last}', '${employee.role}', '${employee.manager}')`
        db.query(query, function(err, res) {
            console.log('\x1b[41m%s\x1b[1m', `NEW EMPLOYEE ADDED! ${employee.first} ${employee.last}`)
        });
        init();
    })
}

// Create a function to update an employee role - updateRole
/* I am prompted to select an employee to update and their new role and this information is updated 
in the database 
 */

function updateRole() {

    //call employee list from db

    //call role list from db

    db.query('SELECT * FROM employees', function (err, data) {
        if (err) throw (err);

        inquirer
        .prompt([
            {
                type: "list",
                name: "name",
                message: "Choose employee",
                choices: employeeList
            }, 
            {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roleList
            }
        ]).then(function(update) {
            const query = 'UPDATE employees SET role_id WHERE '
        })
    })

}


/*
    ]).then(function(employee) {
        const query = `INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ('${employee.first}','${employee.last}', '${employee.role}', '${employee.manager}')`
        db.query(query, function(err, res) {
            console.log('\x1b[41m%s\x1b[1m', `NEW EMPLOYEE ADDED! ${employee.first} ${employee.last}`)
        });
        init();
    })
}
*/
    
