import { useState, useEffect } from 'react';
import Step1 from '../Admin/components/Step1';
import Step2 from '../Admin/components/Step2';
import Confirmation from '../Admin/components/Confirmation';
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
        adoption_status: "",
        description: "",
        image: null,
        gender: "",
        colour: "",
        vaccination_status: "",
        special_needs: "",
        microchipped: "",
        personality: "",
        back_story: "",
    });
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'User') { // Changed from 'Admin' to 'User'
            alert('You must be logged in as a User to add a pet.');
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
        const file = e.target.files[0];
        setValues((prevValues) => ({
            ...prevValues,
            image: file,
        }));
    };

    const handleFormSubmit = async () => {
        const requiredFields = ['name', 'species', 'adoption_status', 'gender', 'vaccination_status', 'microchipped'];
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
        formData.append("adoption_status", values.adoption_status);
        formData.append("description", values.description || "");
        formData.append("gender", values.gender);
        formData.append("colour", values.colour || "");
        formData.append("vaccination_status", values.vaccination_status);
        formData.append("special_needs", values.special_needs || 'none');
        formData.append("microchipped", values.microchipped);
        formData.append("personality", values.personality || "");
        formData.append("back_story", values.back_story || "");

        if (values.image) {
            formData.append("image", values.image);
        } else {
            setErrorMessage("No image file selected. Please upload an image.");
            return;
        }

        try {
            const response = await addPet(formData);
            setSuccessMessage("Pet added successfully! Add another pet below.");
            setErrorMessage(null);
            setValues({
                name: "",
                species: "",
                breed: "",
                age: "",
                adoption_status: "",
                description: "",
                image: null,
                gender: "",
                colour: "",
                vaccination_status: "",
                specialNeeds: "",
                microchipped: "",
                personality: "",
                back_story: "",
            });
            setStep(1);
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Unknown error";
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
            adoption_status: "",
            description: "",
            image: null,
            gender: "",
            colour: "",
            vaccination_status: "",
            specialNeeds: "",
            microchipped: "",
            personality: "",
            back_story: "",
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