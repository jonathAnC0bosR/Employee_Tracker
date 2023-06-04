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
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: [
                    'View all departments', 'View all roles', 
                    'View all employees', 'Add a department',
                    'Add a role'
                    ],
            }
        ])
        .then((data) => {
            if(data.action === 'Add a department') {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What department would you like to add? ',
                            name: 'dp_name'
                        },
                    ]).then((answer) => {
                        const departmentName = answer.dp_name;
                        db.query(`INSERT INTO department(department_name) VALUES ("${departmentName}");`, (err, results) => {
                            if(err) {
                                console.error(err);
                            } else {
                                console.log('\n');
                                console.log(`${departmentName} department added succesfully!`);
                                console.log('\n');
                                userInput();
                            }
                        });
                    });
                } else if(data.action === 'Add a role') {
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: 'Type the name of the role: ',
                            name: 'role_name'
                        },
                        {
                            type: 'input',
                            message: 'Type the role salary: ',
                            name: 'role_salary'
                        },
                        {
                            type: 'list',
                            message: 'Select the role id: 1-Production, 2-Sales, 3-Marketing, 4-Finance, 5-IT, 6-HR',
                            name: 'role_id',
                            choices: [1, 2, 3, 4, 5, 6]
                        },
                    ]).then((answers) => {
                        const roleName = answers.role_name;
                        const roleSalary = answers.role_salary;
                        const roleDepartment = answers.role_id;

                        db.query(`INSERT INTO role (job_title, salary, department_id) VALUES ("${roleName}", "${roleSalary}, ${roleDepartment}")`, 
                        (err, results) => {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log('Role addes succesfully!');
                                userInput();
                            }
                        });
                    })

                } else {
                    mysqlQuery(data.action);
                }
            
        });
};

const mysqlQuery = (data) => {
    switch(data) {
        case 'View all departments':
            db.query('Select * from department', (err, results) => {
                console.log("\n");
                console.table(results);
                console.log("\n\n\n");
            });
            break;
        
        case 'View all roles':
            db.query('select * from role JOIN department ON department.id = role.department_id', (err, results) => {
                console.log("\n");
                console.table(results);
                console.log("\n\n\n");
            });
            break;

        case 'View all employees':
            db.query('select * from employee JOIN role ON role.id = employee.role_id', (err, results) => {
                console.log("\n");
                console.table(results);
                console.log("\n\n\n");
            });
            break;
        
    }
    
    
    
    userInput();
};



userInput();

module.exports = userInput;

