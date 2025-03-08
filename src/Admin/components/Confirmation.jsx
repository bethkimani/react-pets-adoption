
import React from "react";

const Confirmation = ({ prevStep, values, onSubmit }) => {
    return (
        <div className="confirmation-container">
            <h3>Confirm Pet Details</h3>
            <ul className="confirmation-list">
                {Object.entries(values).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value || "N/A"}
                    </li>
                ))}
            </ul>
            <div className="button-group">
                <button className="nav-button" onClick={prevStep}>Back</button>
                <button className="nav-button" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Confirmation;