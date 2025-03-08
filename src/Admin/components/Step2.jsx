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
                    <option value="available">Available</option>
                    <option value="adopted">Adopted</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Describe the pet..."
                    className="form-control"
                    required
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