
import React, { useState } from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Confirmation from './components/Confirmation';
import { useNavigate } from 'react-router-dom';
import './AddPets.css';

const steps = [
    { title: "Add Pet Details" },
    { title: "Add Pet Attributes" },
    { title: "Confirmation" }
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

    const handleFormSubmit = () => {
        alert("Pet added successfully!");
        navigate("/admin-dashboard/my-pets");
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
                ) : (
                    step === 1 ? (
                        <Step1 nextStep={nextStep} handleChange={handleChange} values={values} handleFileChange={handleFileChange} />
                    ) : (
                        <Step2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} values={values} />
                    )
                )}
            </div>
        </div>
    );
};

export default AddPets;