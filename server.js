const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb+srv://ditanadig:NXRUDdSNBR1Fp0Jq@cluster0.9lnca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    // Personal Details
    name: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, required: true },
    insuranceId: { type: String, required: true },
    pcpName: { type: String, required: true },
    pcpNumber: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    medicalProxyNumber: { type: String, required: true },

    // Insurance Info (Optional)
    policyName: { type: String },
    employer: { type: String },
    employerAddress: { type: String },
    policyId: { type: String },

    // Medical History (Optional)
    chronicConditions: { type: String },
    chronicMedications: { type: String },
    surgicalHistory: { type: String },
    congenitalDiseaseHistory: { type: String },
    familyHistory: { type: String },
    socialHistory: { type: String },
    vaccineHistory: { type: String },

    // Allergen Information (Optional)
    foodAllergies: { type: String },
    materialAllergies: { type: String },
    medicationAllergies: { type: String },

    // Doctor Note (Optional)
    doctorNote: { type: String }
});

const User = mongoose.model('User', userSchema);

// Endpoint to handle form submission
app.post('/add-user', (req, res) => {
    const userData = new User(req.body);
    userData.save()
        .then(() => res.status(200).send('User data saved successfully!'))
        .catch(err => res.status(400).send('Error saving user data: ' + err.message));
});

app.listen(3000, () => console.log('Server running on port 3000'));
