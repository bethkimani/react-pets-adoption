import React, { useState, useEffect } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Confirmation from './components/Confirmation';
import { useNavigate } from 'react-router-dom';
import { addPet } from '../api';
import axios from 'axios';  // Import axios directly for the ping
import './AddPets.css';

const steps = [
    { title: "Add Pet Details" },
    { title: "Add Pet Attributes" },
    { title: "Confirmation" },
];

const AddPets = () => {
    const [step, setStep] = useState(1);
    const [values, setValues] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        adoptionStatus: "",
        description: "",
        image: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is an admin
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'Admin') {
            alert('You must be logged in as an Admin to add a pet.');
            navigate('/auth');
        }

        // Ping the backend to wake it up
        const pingBackend = async () => {
            try {
                await axios.get('https://pets-adoption-flask-sqlite.onrender.com/api/health');
                console.log('Backend is awake');
            } catch (error) {
                console.error('Failed to ping backend:', error.message);
            }
        };
        pingBackend();
    }, [navigate]);

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setValues((prevValues) => ({
            ...prevValues,
            image: e.target.files[0],
        }));
    };

    const handleFormSubmit = async () => {
        const requiredFields = ['name', 'species', 'adoptionStatus'];
        for (const field of requiredFields) {
            if (!values[field]) {
                alert(`Please fill in the ${field} field.`);
                return;
            }
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("species", values.species);
        formData.append("breed", values.breed || "");
        formData.append("age", values.age ? parseInt(values.age) : "");
        formData.append("adoption_status", values.adoptionStatus);
        formData.append("description", values.description || "");
        if (values.image) {
            formData.append("image", values.image);
        }

        try {
            const response = await addPet(formData);
            console.log("Pet added successfully:", response.data);
            alert("Pet added successfully!");
            navigate("/admin-dashboard/my-pets");
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Unknown error";
            console.error("Detailed error adding pet:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers,
            });
            alert(`Failed to add pet: ${errorMessage}`);
        }
    };

    return (
        <div className="add-pets-container">
            <div className="step-indicator">
                {steps.map((stepInfo, index) => (
                    <div
                        key={index}
                        className={`step ${step === index + 1 ? "active" : ""}`}
                        onClick={() => setStep(index + 1)}
                    >
                        {stepInfo.title}
                    </div>
                ))}
            </div>
            <h2 className="form-title">{steps[step - 1].title}</h2>
            <div className="step-content">
                {step === 3 ? (
                    <Confirmation prevStep={prevStep} values={values} onSubmit={handleFormSubmit} />
                ) : step === 1 ? (
                    <Step1 nextStep={nextStep} handleChange={handleChange} values={values} handleFileChange={handleFileChange} />
                ) : (
                    <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />
                )}
            </div>
        </div>
    );
};

export default AddPets;