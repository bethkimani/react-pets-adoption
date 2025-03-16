import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
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
        infoConsent: false,
        emailConsent: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', formData); // Log the form data
        try {
            const response = await axios.post('https://pets-adoption-flask-sqlite.onrender.com/api', formData);
            console.log('Response:', response.data); // Handle successful response
            alert('Your application has been submitted successfully!'); // Alert on success
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            alert('There was an error submitting your application. Please try again.'); // Alert on error
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
                    <div>
                        <label>
                            <input type="radio" name="ageCategory" value="under18" onChange={handleChange} required />
                            Under 18
                        </label>
                        <label>
                            <input type="radio" name="ageCategory" value="18plus" onChange={handleChange} required />
                            18+
                        </label>
                    </div>
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
                        <label>Who lives at this address? (please include age for children):</label>
                        <input type="text" name="residents" value={formData.residents} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Describe your home and lifestyle:</label>
                        <input type="text" name="homeDescription" value={formData.homeDescription} onChange={handleChange} required />
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
                        <label>If applicable, does your partner agree with adopting this animal?</label>
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
                        <label>How many hours during the day will the pet be alone (dogs only)?</label>
                        <input type="text" name="aloneTime" value={formData.aloneTime} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Do you have other pets? If yes, please describe:</label>
                        <input type="text" name="otherPets" value={formData.otherPets} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>If applicable, are your current pets spayed/neutered?</label>
                        <select name="spayedNeutered" value={formData.spayedNeutered} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Are your current pets up to date on vaccines?</label>
                        <select name="currentPetsVaccinated" value={formData.currentPetsVaccinated} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Where will your dog stay when you are not home?</label>
                        <input type="text" name="dogStay" value={formData.dogStay} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>What sort of enrichment do you plan to offer your dog?</label>
                        <input type="text" name="enrichment" value={formData.enrichment} onChange={handleChange} required />
                    </div>
                </div>

                {/* Training and Veterinarian Information */}
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
                        <label>What methods would you use to train your new dog?</label>
                        <input type="text" name="trainingMethods" value={formData.trainingMethods} onChange={handleChange} required />
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
                        <label>How often should your dog see a veterinarian?</label>
                        <select name="vetFrequency" value={formData.vetFrequency} onChange={handleChange} required>
                            <option value="">Select</option>
                            <option value="whenSick">When it is sick</option>
                            <option value="every3Years">Once every 3 years</option>
                            <option value="twicePerYear">Twice per year</option>
                            <option value="annually">Annually</option>
                            <option value="onceAMonth">Once a month</option>
                        </select>
                    </div>
                </div>

                {/* Willingness to Work and References */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Which of the following would you be willing to work on with your new dog?</label>
                        <input type="text" name="willingToWorkOn" value={formData.willingToWorkOn} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Please provide us with at least one reference with a contact number:</label>
                        <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Is there anything else you would like us to know?</label>
                        <input type="text" name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
                    </div>
                </div>

                {/* Information Section */}
                <div className="info-section">
                    <label>
                        <input type="checkbox" name="infoConsent" checked={formData.infoConsent} onChange={handleChange} required />
                        Due to the high number of applications received for our animals we do not respond to all who apply. If you do not hear from us within a week of applying, it is likely that another applicant has chosen for the animal in question. This does not mean that you are not a great option for one of our pets but another applicant may have a lifestyle more suitable for this specific animal.
                    </label>
                    <br />
                    <label>
                        <input type="checkbox" name="emailConsent" checked={formData.emailConsent} onChange={handleChange} required />
                        I understand that the successful applicant will be contacted via email. Emails may inadvertently go to the junk mail folder. Please make sure to check your emails daily and have a look in your junk box. Some dogs do not fare well in a shelter environment; therefore we may only give adopters 24hrs to respond to avoid longer than necessary stays.
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdoptionForm;