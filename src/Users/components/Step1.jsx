import React from "react";

const Step1 = ({ nextStep, handleChange, values, handleFileChange }) => {
    return (
        <form className="petForm">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="e.g. Bella"
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="species">Species</label>
                <input
                    type="text"
                    name="species"
                    value={values.species}
                    onChange={handleChange}
                    placeholder="e.g. Dog"
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    name="breed"
                    value={values.breed}
                    onChange={handleChange}
                    placeholder="e.g. Labrador"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                    type="text"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    placeholder="e.g. 2 years"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    className="form-control"
                    required
                >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="colour">Colour</label>
                <input
                    type="text"
                    name="colour"
                    value={values.colour}
                    onChange={handleChange}
                    placeholder="e.g. Black"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="image">Upload Image</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="form-control"
                />
            </div>
            <div className="button-group">
                <button type="button" className="nav-button" onClick={nextStep}>Continue</button>
            </div>
        </form>
    );
};

export default Step1;