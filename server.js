// Importing and requiring express and mysql modules
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});