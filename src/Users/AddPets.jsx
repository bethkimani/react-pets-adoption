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
        adoption_status: "Available", // Default to "Available"
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
        if (!token || role !== 'User') {
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

        // Case-insensitive validation for adoption_status
        const validAdoptionStatuses = ['Available', 'Adopted', 'Pending'];
        const normalizedAdoptionStatus = values.adoption_status.toLowerCase();
        const isValidStatus = validAdoptionStatuses.some(
            (status) => status.toLowerCase() === normalizedAdoptionStatus
        );

        if (!isValidStatus) {
            setErrorMessage(`Invalid adoption status. Must be one of: ${validAdoptionStatuses.join(', ')}`);
            return;
        }

        // Normalize adoption_status to match the expected case (e.g., "Available")
        const normalizedValues = {
            ...values,
            adoption_status: validAdoptionStatuses.find(
                (status) => status.toLowerCase() === normalizedAdoptionStatus
            ),
        };

        const formData = new FormData();
        formData.append("name", normalizedValues.name);
        formData.append("species", normalizedValues.species);
        formData.append("breed", normalizedValues.breed || "");
        formData.append("age", normalizedValues.age ? parseInt(normalizedValues.age) : "");
        formData.append("adoption_status", normalizedValues.adoption_status);
        formData.append("description", normalizedValues.description || "");
        formData.append("gender", normalizedValues.gender);
        formData.append("colour", normalizedValues.colour || "");
        formData.append("vaccination_status", normalizedValues.vaccination_status);
        formData.append("special_needs", normalizedValues.special_needs || 'none');
        formData.append("microchipped", normalizedValues.microchipped);
        formData.append("personality", normalizedValues.personality || "");
        formData.append("back_story", normalizedValues.back_story || "");

        if (normalizedValues.image) {
            formData.append("image", normalizedValues.image);
        } else {
            setErrorMessage("No image file selected. Please upload an image.");
            return;
        }

        // Log the form data for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
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
                adoption_status: "Available",
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
            adoption_status: "Available",
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