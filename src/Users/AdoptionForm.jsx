import React, { useState } from 'react';
import axios from 'axios';
import './AdoptionForm.css';

const AdoptionForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        ageCategory: '',
        address: '',
        addressLine2: '',
        city: '',
        province: '',
        postalCode: '',
        interestedPet: '',
        livingEnvironment: '',
        durationAtAddress: '',
        residents: '',
        homeDescription: '',
        allergies: '',
        partnerAgreement: '',
        aloneTime: '',
        otherPets: '',
        spayedNeutered: '',
        currentPetsVaccinated: '',
        dogStay: '',
        enrichment: '',
        hadDogsBefore: '',
        trainingMethods: '',
        hasVeterinarian: '',
        vetFrequency: '',
        willingToWorkOn: '',
        reference: '',
        additionalInfo: '',
        consent: false, // Combine infoConsent and emailConsent into one for simplicity
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData);
        try {
            const response = await axios.post('https://pets-adoption-flask-sqlite.onrender.com/api/adoptions/', formData);
            console.log('Response:', response.data);
            alert('Your application has been submitted successfully!');
            // Reset form after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                ageCategory: '',
                address: '',
                addressLine2: '',
                city: '',
                province: '',
                postalCode: '',
                interestedPet: '',
                livingEnvironment: '',
                durationAtAddress: '',
                residents: '',
                homeDescription: '',
                allergies: '',
                partnerAgreement: '',
                aloneTime: '',
                otherPets: '',
                spayedNeutered: '',
                currentPetsVaccinated: '',
                dogStay: '',
                enrichment: '',
                hadDogsBefore: '',
                trainingMethods: '',
                hasVeterinarian: '',
                vetFrequency: '',
                willingToWorkOn: '',
                reference: '',
                additionalInfo: '',
                consent: false,
            });
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            alert('There was an error submitting your application. Please try again.');
        }
    };

    return (
        <div className="adoption-form">
            <h1>Adoption Form</h1>
            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email Address:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-group">
                    <label>Please select the appropriate age category:</label>
                    <select name="ageCategory" value={formData.ageCategory} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="under18">Under 18</option>
                        <option value="18plus">18+</option>
                    </select>
                </div>

                {/* Address Information */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Street Address:</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Address Line 2:</label>
                        <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>City:</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Province:</label>
                        <input type="text" name="province" value={formData.province} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Postal Code:</label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
                    </div>
                </div>

                {/* Pet Information */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Which pet are you interested in?</label>
                        <input type="text" name="interestedPet" value={formData.interestedPet} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>What best describes your living environment?</label>
                        <input type="text" name="livingEnvironment" value={formData.livingEnvironment} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>How long have you lived there?</label>
                        <input type="text" name="durationAtAddress" value={formData.durationAtAddress} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Who lives at this address? (include age for children):</label>
                        <input type="text" name="residents" value={formData.residents} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Describe your home and lifestyle:</label>
                        <textarea name="homeDescription" value={formData.homeDescription} onChange={handleChange} required />
                    </div>
                </div>

                {/* Allergies and Pets */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Is anyone in your home allergic to dogs?</label>
                        <select name="allergies" value={formData.allergies} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Does your partner agree with adopting this animal?</label>
                        <select name="partnerAgreement" value={formData.partnerAgreement} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="notAsked">I haven't asked yet</option>
                            <option value="notApplicable">Not applicable</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>How many hours will the pet be alone (dogs only)?</label>
                        <input type="text" name="aloneTime" value={formData.aloneTime} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Do you have other pets? If yes, describe:</label>
                        <textarea name="otherPets" value={formData.otherPets} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Are your current pets spayed/neutered?</label>
                        <select name="spayedNeutered" value={formData.spayedNeutered} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Are your current pets vaccinated?</label>
                        <select name="currentPetsVaccinated" value={formData.currentPetsVaccinated} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Where will your dog stay when you’re not home?</label>
                        <input type="text" name="dogStay" value={formData.dogStay} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>What enrichment will you offer your dog?</label>
                        <textarea name="enrichment" value={formData.enrichment} onChange={handleChange} required />
                    </div>
                </div>

                {/* Training and Vet */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Have you had dogs before?</label>
                        <select name="hadDogsBefore" value={formData.hadDogsBefore} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>What training methods will you use?</label>
                        <textarea name="trainingMethods" value={formData.trainingMethods} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Do you have a veterinarian?</label>
                        <select name="hasVeterinarian" value={formData.hasVeterinarian} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>How often should your dog see a vet?</label>
                        <select name="vetFrequency" value={formData.vetFrequency} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="whenSick">When sick</option>
                            <option value="every3Years">Every 3 years</option>
                            <option value="twicePerYear">Twice per year</option>
                            <option value="annually">Annually</option>
                            <option value="onceAMonth">Once a month</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>What are you willing to work on with your dog?</label>
                        <textarea name="willingToWorkOn" value={formData.willingToWorkOn} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Provide at least one reference (with contact):</label>
                        <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Anything else we should know?</label>
                        <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
                    </div>
                </div>

                {/* Consent */}
                <div className="info-section">
                    <label>
                        <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required />
                        I understand the adoption process and consent to the terms (see details above).
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdoptionForm;