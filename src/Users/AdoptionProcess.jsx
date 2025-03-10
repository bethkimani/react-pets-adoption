import React from 'react';
import './AdoptionProcess.css'; // Import the CSS for styling

const AdoptionProcess = () => {
    return (
        <div className="user-adoption-process">
            {/* Header with background image */}
            <div className="header">
                <h2>Adoption Process & Fees</h2>
            </div>
            {/* Info Section */}
            <div className="info-section">
                <p>If you wish to adopt one of our animals, we encourage you to browse through our list.</p>
                <p>Feel free to contact us if you have any questions or comments.</p>
                <div className="button-container">
                    <button className="adoptable-animals-btn">Adoptable Animals</button>
                </div>
                <p>Please consider that most dogs and cats live to be 10 years or more. Adopting is a serious, life-changing decision.</p>
            </div>
            {/* Cat Adoption Section */}
            <div className="cat-adoption">
                <h3 className="cat-adoption-title">For Cat Adopters</h3>
                <p>No need to fill out an application. Come to our shelter to meet your match or visit our online shop!</p>
                <button className="our-shelters-btn">Our Shelters</button>
            </div>
            {/* Dog Adoption Section */}
            <div className="adoption-process">
                <div className="adoption-pair">
                    <h3 className="dog-adoption-title">How do <span className="black-text">dog</span> adoptions work?</h3>
                    <div className="dog-adoption-steps">
                        <ul className="heart-list">
                            <li> Fill out an adoption application.</li>
                            <li> Our adoption coordinator will contact your references and call you if some additional information is needed.</li>
                            <li> If you are the best fit for the animal in question, you will be contacted and a meet and greet will be scheduled at our shelter.</li>
                            <li> If the pet you chose is the right match for you, the adoption will be completed by signing an adoption contract and paying the adoption fee.</li>
                        </ul>
                    </div>
                </div>
                <div className="adoption-pair">
                    <h4 className="fees-title">How much is the <span className="black-text">adoption</span> fee?</h4>
                    <div className="adoption-fee-details">
                        <ul>
                            <li>Dogs: <span>$400</span></li>
                            <li>Cats: <span>$160</span></li>
                            <li>Small Animals: <span>$25</span></li>
                        </ul>
                    </div>
                </div>
                <div className="adoption-pair">
                    <h4>What does the adoption fee include?</h4>
                    <ul className="adoption-fee-details">
                        <li>Age Appropriate Vaccinations (DA2PP and Bordetella for dogs, FVRCP for cats, and Rabies for all dogs and cats over 16 weeks of age)</li>
                        <li>Microchip identification</li>
                        <li>Spay/Neuter</li>
                        <li>Flea treatment</li>
                        <li>Deworming</li>
                        <li>Please note some animals may receive more tests or treatments (this information will be outlined in the medical record you receive for your adopted pet)</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdoptionProcess;