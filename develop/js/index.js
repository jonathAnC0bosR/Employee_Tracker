const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config()
const logo = require('asciiart-logo');

console.log(
    logo({
        name: 'Employee Manager',
        font: 'Soft',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'blue',
        logoColor: 'yellow',
        textColor: 'white',
    })
    .emptyLine()
    .emptyLine()
    .render()
);

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the main_db database `)
);

const userInput = inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'activity',
            choices: [
                'View all departments', 'View all roles', 
                'View all employees', 'Add a department', 
                'Add a role', 'Add an employee', 
                'Update an employee'
            ],
        },

    ])
    .then((data) => {
        
        mysqlQuery(data)
    });

const mysqlQuery = (data) => {

    if(data.activity === 'View all departments') {
        db.query('SELECT * FROM department', (err, results) => {
            console.table(results);
        });
    } else if (data.activity === 'View all roles') {
        db.query('SELECT * FROM role', (err, results) => {
            console.table(results);
        });
    } else if(data.activity === 'View all employees') {
        db.query('SELECT * FROM employee', (err, results) => {
            console.table(results);
        });
    }
};


module.exports = userInput;

