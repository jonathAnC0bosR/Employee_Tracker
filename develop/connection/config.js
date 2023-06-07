const mysql = require('mysql2');
require('dotenv').config();
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

const getDepartments = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM department', (err, results) => {
            if(err) {
                reject(err);
            } else {
                const departmentNames = results.map(({id, department_name})=> ({
                    name: department_name,
                    value: id
                }));
                resolve(departmentNames);
            }
        });
    });
};

const getRoles = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM ROLE', (err, results) => {
            if(err) {
                reject(err);
            } else {
                const roleNames = results.map(({id, job_title}) => ({
                    name: job_title,
                    value: id
                }));
                resolve(roleNames);
            }
        })
    })
};

const getId = () => {
    return new Promise((resolve, reject) => {
        db.query('Select * from employee', (err, results) => {
            if(err) {
                reject(err);
            } else {
                const managerId = results.map(({id, first_name, last_name}) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));
                resolve(managerId);
            }
        })
    })
};

module.exports = { db, getDepartments, getRoles, getId };