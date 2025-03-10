import React from 'react';
import './AdoptionProcess.css'; // Import the CSS for styling

const AdoptionProcess = () => {
    return (
        <div className="user-adoption-process">
            <h2>Adoption Process & Fees</h2>
            <div className="intro-section">
                <p>If you wish to adopt one of our animals, we encourage you to browse through our list.</p>
                <p>Feel free to contact us if you have any questions or comments.</p>
                <button className="adoptable-animals-btn">Adoptable Animals</button>
            </div>
            <div className="cat-adoption">
                <h3>For Cat Adopters</h3>
                <p>No need to fill out an application. Come to our shelter to meet your match or visit our online shop!</p>
                <button className="our-shelters-btn">Our Shelters</button>
            </div>
            <div className="dog-adoption">
                <h3>How Do Dog Adoptions Work?</h3>
                <p>1. Fill out an adoption application.<br />
                   2. Our adoption coordinator will contact your references and you if some additional information is needed.<br />
                   3. If you’re the best fit for the animal in question, you will be contacted and a time and date will be scheduled to visit our shelter.<br />
                   4. If you think you’re the right match, your adoption will be completed by signing an adoption agreement and paying the adoption fee.
                </p>
            </div>
            <div className="adoption-fees">
                <h3>How Much Is the Adoption Fee?</h3>
                <p>Dogs: $400<br />
                   Cats: $300<br />
                   Small Animals: $25
                </p>
                <h4>What Does the Adoption Fee Include?</h4>
                <ul>
                    <li>Microchip identification</li>
                    <li>Spay/Neuter</li>
                    <li>Vaccinations</li>
                    <li>De-worming</li>
                    <li>Please note: If your new pet requires additional medical care, this information will be outlined in the medical record you receive for your adopted pet.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdoptionProcess;