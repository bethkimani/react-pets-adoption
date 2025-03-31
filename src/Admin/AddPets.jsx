import React, { useState, useEffect } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Confirmation from './components/Confirmation';
import { useNavigate } from 'react-router-dom';
import { addPet } from '../api';
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
    const [successMessage, setSuccessMessage] = useState(null); // New state for success feedback
    const [errorMessage, setErrorMessage] = useState(null); // New state for error feedback

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || (role !== 'Admin' && role !== 'SuperAdmin')) {
            alert('You must be logged in as an Admin or SuperAdmin to add a pet.');
            navigate('/auth');
        }
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
                setErrorMessage(`Please fill in the ${field} field.`);
                return;
            }
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("species", values.species);
        formData.append("breed", values.breed || "");
        formData.append("age", values.age ? parseInt(values.age) : "");
        formData.append("adoption_status", values.adoptionStatus); // Matches backend
        formData.append("description", values.description || "");
        if (values.image) {
            formData.append("image", values.image);
        }

        try {
            const response = await addPet(formData);
            console.log("Pet added successfully:", response.data);
            setSuccessMessage("Pet added successfully! Add another pet below.");
            setErrorMessage(null);
            // Reset form values but stay on Step 1
            setValues({
                name: "",
                species: "",
                breed: "",
                age: "",
                adoptionStatus: "",
                description: "",
                image: null,
            });
            setStep(1); // Return to Step 1 without navigating away
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Unknown error";
            console.error("Detailed error adding pet:", error);
            setErrorMessage(`Failed to add pet: ${errorMessage}`);
            setSuccessMessage(null);
        }
    };

    const handleStartOver = () => {
        setValues({
            name: "",
            species: "",
            breed: "",
            age: "",
            adoptionStatus: "",
            description: "",
            image: null,
        });
        setStep(1);
        setSuccessMessage(null);
        setErrorMessage(null);
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
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                    <button onClick={handleStartOver} className="start-over-button">
                        Start Over
                    </button>
                </div>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
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