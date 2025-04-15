
import React from 'react';
import './AdoptionHistory.css'; // Use relative path

const SpecialAdoptionForm = () => {
    return (
        <div className="user-special-adoption-form">
            <h2>Special Adoption Form</h2>
            {/* Form for special adoption requests */}
            <form>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Reason for Special Adoption:
                    <textarea name="reason" required></textarea>
                </label>
                <button type="submit">Submit Special Adoption Request</button>
            </form>
        </div>
    );
};

export default SpecialAdoptionForm;