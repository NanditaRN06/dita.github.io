const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// File path
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper functions
function readData() {
    if (fs.existsSync(dataFilePath)) {
        return JSON.parse(fs.readFileSync(dataFilePath));
    }
    return [];
}

function writeData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Routes
app.post('/api/users', (req, res) => {
    try {
        const data = readData();
        const newUser = { id: data.length + 1, ...req.body };
        data.push(newUser);
        writeData(data);
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.delete('/api/users/:id', (req, res) => {
    try {
        let data = readData();
        data = data.filter(user => user.id !== parseInt(req.params.id));
        writeData(data);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
