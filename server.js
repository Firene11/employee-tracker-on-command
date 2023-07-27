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
    console.log('--- You are connected to the employee_db database!!! ---')
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
          }
          else if (answers.options === "View all roles") {
            viewRoles();
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

/* SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name; 
*/

function viewRoles() {
    db.query('SELECT * FROM roles INNER JOIN department ON roles.id = department.id', function (err, results) {
        console.table(results);
        // start again
        init();
    });
}
//job title, role id, the department that role belongs to, .......and the salary for that role



// Create function to view all employees - viewEmployees

// Create function to add a department - addDept

// Create function to add a role - addRole

// Create a function to add an employee - addEmployee

// Create a function to update an employee role - updateRole

    
