const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/patientDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for user data
const userSchema = new mongoose.Schema({
    name: String,
    emergencyContact: String,
    age: Number,
    gender: String,
    dob: Date,
    bloodGroup: String,
    // Add all other fields here
});

const User = mongoose.model('User', userSchema);

// Endpoint to handle form submission
app.post('/add-user', (req, res) => {
    const userData = new User(req.body);
    userData.save()
        .then(() => res.status(200).send('User data saved successfully!'))
        .catch(err => res.status(400).send('Error saving user data: ' + err));
});

app.listen(3000, () => console.log('Server running on port 3000'));
