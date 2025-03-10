
import React from 'react';

import './AdoptionApplication.css'; // User dashboard styles
const AdoptionApplication = () => {
    return (
        <div>
            <h2>Adoption Application</h2>
            {/* Form for submitting an adoption application */}
            <form>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
                <label>
                    Pet Type:
                    <select name="petType" required>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="smallAnimal">Small Animal</option>
                    </select>
                </label>
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default AdoptionApplication;