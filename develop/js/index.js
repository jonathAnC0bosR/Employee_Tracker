//Requiring all the needed depedencies.
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config()
const logo = require('asciiart-logo');
require('console.table');
//A server.js is necessary to run the programm, but I must not link this index to the serves.js?

// Console.log logo displays the logo at the beggining of the terminal. 
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
// Connects to the database 
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the database `)
);

// Function that checks for the answers of the user and runs code depending of what the user wants to do. 
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
                    'Add a role', 'Add an employee'
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
                            // Is there a way for the user to add another department_id? Or it must
                            //be like this aproach? 
                        },
                    ]).then((answers) => {
                        const roleName = answers.role_name;
                        const roleSalary = answers.role_salary;
                        const roleDepartment = answers.role_id;

                        db.query(`INSERT INTO role (job_title, salary, department_id) VALUES ("${roleName}", "${roleSalary}", ${roleDepartment});`, 
                        (err, results) => {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log('Role addes succesfully!');
                                userInput();
                            }
                        });
                    })

                } else if(data.action ==='Add an employee') {
                    inquirer.prompt([
                        {
                            type: 'input',
                            message: "Enter the employee's first name: ",
                            name: 'employee_fn'
                        },
                        {
                            type: 'input',
                            message: "Enter the employee's last name: ",
                            name: 'employee_ln'
                        },
                        {
                            type: 'list',
                            message: "Enter the employee's role id : Production - 1, Sales - 2, Marketing - 3, Finance - 4 , IT - 5, 'Human Resources - 6 ",
                            name: 'role_id',
                            choices: ['1', '2', '3', '4', '5', '6']
                        },
                        {
                            type: 'list',
                            message: 'Enter the employee manager: Sam Perez - 1, Juan Lopez - 2, Erik Niemann - 3, Magnus Carlsen - 4, Levy Rozzman - 5, Gareth Gordon - 6',
                            name: 'manager_id',
                            choices: ['1', '2', '3', '4', '5', '6']
                        },
                    ]).then((answers) => {
                        const employeeFirstName = answers.employee_fn;
                        const employeeLastName = answers.employee_ln;
                        const employeeRole = answers.role_id;
                        const employeeManager = answers.manager_id;

                        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${employeeFirstName}", "${employeeLastName}", ${employeeRole}, ${employeeManager} )`, 
                        (err, results) => {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log('Employee added sucesfully to the database');
                                userInput();
                            }
                        })

                    })
                }else {
                    mysqlQuery(data.action);
                }
            
        });
};

// Recursive function to run what the user inputs. 
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

