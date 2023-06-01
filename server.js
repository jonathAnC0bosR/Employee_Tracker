// Importing and requiring express and mysql modules
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '*O[!:o=7K@',
        database: 'main_db'
    },
    console.log(`Connected to the main_db database `)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});