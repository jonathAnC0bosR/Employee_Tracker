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

const userInput = () => {
    inquirer
        .prompt([
            {
                type:'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'View all departments', 'View all roles', 
                    'View all employees', 'Add a department', 
                    'Add a role', 'Add an employee', 
                    'Update an employee'
                ],
            }
        ])
        .then((data) => {
            
            switch(data.action) {
                case 'View all departments':
                    db.query('select * from department', (err, results) => {
                        console.table(results);
                    });
                    break;
            }

            userInput();
        })
};

userInput();

// const userInput = () => {
//   inquirer
//     .prompt([
//         {
//             type: 'list',
//             message: 'What would you like to do?',
//             name: 'activity',
//             choices: [
//                 'View all departments', 'View all roles', 
//                 'View all employees', 'Add a department', 
//                 'Add a role', 'Add an employee', 
//                 'Update an employee'
//             ],
//         },

//     ])
//     .then((data) => {
//         switch(data.activity) {
        
//             case 'View all departments':
//                 db.query('SELECT * FROM department', (err, results) => {
//                 console.table(results);
//                  });
//                 break;
    
//             case 'View all roles':
//                 db.query('select * from department JOIN role ON department.id = role.department_id', (err, results) =>  {
//                     console.table(results);
//                 });
//                 break;
//         }
        
//         userInput();

//     });
// }
 
// userInput();

module.exports = userInput;

