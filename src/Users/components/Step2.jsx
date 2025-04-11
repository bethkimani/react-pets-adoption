import React from "react";

const Step2 = ({ nextStep, prevStep, handleChange, values }) => {
    return (
        <form className="petForm">
            <div className="form-group">
                <label htmlFor="adoptionStatus">Adoption Status</label>
                <select
                    name="adoptionStatus"
                    value={values.adoptionStatus}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="">Select...</option>
                    <option value="available">Adopt me</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="vaccinationStatus">Vaccination Status</label>
                <select
                    name="vaccinationStatus"
                    value={values.vaccinationStatus}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="">Select...</option>
                    <option value="Up to date">Up to date</option>
                    <option value="Not vaccinated">Not vaccinated</option>
                    <option value="Partial">Partial</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="specialNeeds">Special Needs</label>
                <input
                    type="text"
                    name="specialNeeds"
                    value={values.specialNeeds}
                    onChange={handleChange}
                    placeholder="e.g. None"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="microchipped">Microchipped</label>
                <select
                    name="microchipped"
                    value={values.microchipped}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="">Select...</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="personality">Personality</label>
                <input
                    type="text"
                    name="personality"
                    value={values.personality}
                    onChange={handleChange}
                    placeholder="e.g. Friendly, Energetic"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="backstory">Backstory</label>
                <textarea
                    name="backstory"
                    value={values.backstory}
                    onChange={handleChange}
                    placeholder="Describe the pet's history..."
                    className="form-control"
                />
            </div>
            <div className="button-group">
                <button type="button" className="nav-button" onClick={prevStep}>Back</button>
                <button type="button" className="nav-button" onClick={nextStep}>Continue</button>
            </div>
        </form>
    );
};

export default Step2;