// src/components/AdoptionForm.js
import React, { useState } from 'react';
import './AdoptionForm.css';

const AdoptionForm = () => {
    const [formData, setFormData] = useState({
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
        currentPetsVaccinated: '',
        dogStay: '',
        enrichmentPlan: '',
        pastDogExperience: '',
        reference: '',
        additionalInfo: '',
        trainingMethods: [],
        importantTraits: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const newValues = checked
                ? [...formData[name], value]
                : formData[name].filter((v) => v !== value);
            setFormData({ ...formData, [name]: newValues });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="adoption-form">
            <h1>Adoption Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Please select the appropriate age category:</label>
                        <select name="ageCategory" value={formData.ageCategory} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="under18">Under 18</option>
                            <option value="18plus">18+</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Which pet are you interested in?</label>
                        <input type="text" name="interestedPet" value={formData.interestedPet} onChange={handleChange} required />
                    </div>
                </div>

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
                    <div className="form-group">
                        <label>What best describes your living environment?</label>
                        <input type="text" name="livingEnvironment" value={formData.livingEnvironment} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Is anyone in your home allergic to dogs?</label>
                        <select name="allergies" value={formData.allergies} onChange={handleChange}>
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
                    <div className="form-group">
                        <label>Do you have other pets? If yes, please describe:</label>
                        <textarea name="otherPets" value={formData.otherPets} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Are your current pets up to date on vaccines?</label>
                        <select name="currentPetsVaccinated" value={formData.currentPetsVaccinated} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Where will your dog stay when you are not home?</label>
                        <input type="text" name="dogStay" value={formData.dogStay} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>What sort of enrichment do you plan to offer your dog?</label>
                        <input type="text" name="enrichmentPlan" value={formData.enrichmentPlan} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Have you had dogs before?</label>
                        <select name="pastDogExperience" value={formData.pastDogExperience} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>What methods would you use to train your new dog?</label>
                        <div>
                            <label>
                                <input type="checkbox" name="trainingMethods" value="Positive Reinforcement" onChange={handleChange} />
                                Positive Reinforcement
                            </label>
                            <label>
                                <input type="checkbox" name="trainingMethods" value="Caesar's Way" onChange={handleChange} />
                                Caesar's Way
                            </label>
                            <label>
                                <input type="checkbox" name="trainingMethods" value="Clicker" onChange={handleChange} />
                                Clicker
                            </label>
                            <label>
                                <input type="checkbox" name="trainingMethods" value="None" onChange={handleChange} />
                                None
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Please provide us with at least one reference with a contact number:</label>
                        <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Is there anything else you would like us to know?</label>
                        <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} />
                    </div>
                </div>

                <p>Please read:</p>
                <p>Due to the high number of applications received for our animals we do not respond to all who apply. If you do not hear from us within a week of applying it is likely that another applicant was chosen for the animal in question.</p>
                <p>We understand that the successful applicant will be contacted via email. Emails may inadvertently go to the junk mail folder. Make sure to check your emails daily and be sure to check your junk folder. Some dogs do not thrive in a shelter environment; therefore we may give adopters 24 hours to respond rather than necessary days.</p>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdoptionForm;