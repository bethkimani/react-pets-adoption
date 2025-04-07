import React from 'react';
import { Link } from 'react-router-dom';
import './Procedure.css';

const Procedure = ({ onProcedureComplete }) => {
  const handleComplete = () => {
    if (onProcedureComplete) {
      onProcedureComplete();
    }
  };

  return (
    <div className="procedure-container">
      <div className="procedure-content">
        <h1>Adoption Process & Fees</h1>
        <div className="procedure-section">
          <h2 className="section-title">How do dog adoptions work?</h2>
          <ul>
            <li>Fill out an application.</li>
            <li>Our adoption coordinator will contact your references and call you if some additional information is needed.</li>
            <li>If you are the best fit for the animal in question you will be contacted and a meet & greet will be scheduled at our shelter.</li>
            <li>If the pet you choose is the right match for you the adoption will be completed by signing an adoption contract and paying the adoption fee.</li>
          </ul>
        </div>

        <div className="procedure-section">
          <h2 className="section-title">How much is the adoption fee?</h2>
          <ul>
            <li>Dogs: $400</li>
            <li>Cats: $160</li>
            <li>Small animals: $25</li>
          </ul>
        </div>

        <div className="procedure-section">
          <h2 className="section-title">What does the adoption fee include?</h2>
          <ul>
            <li>Age Appropriate Vaccinations (DA2PP and Bordetella for dogs, FVRCP for cats, and Rabies for all dogs & cats over 16 weeks of age).</li>
            <li>Microchip identification.</li>
            <li>Spay/Neuter.</li>
            <li>Flea treatment.</li>
            <li>Deworming.</li>
            <li>Please note some animals may receive more tests or treatments (this information will be in the medical record you receive for your adopted pet).</li>
          </ul>
        </div>

        <div className="procedure-section cat-adopters">
          <h2 className="section-title">For Cat Adopters</h2>
          <p>No need to fill out an application. Come to our shelter to meet your match! Or visit our online SHOP!</p>
          <p>Please note that we do not allow declawing of our cats.</p>
          <Link to="/user-dashboard/all-pets" className="procedure-btn">Our Shelters</Link>
        </div>

        <div className="procedure-footer">
          <p>If you wish to adopt one of our animals we encourage you to browse through our list.</p>
          <p>Feel free to contact us if you have any questions or comments.</p>
          <p>Please consider the fact that most dogs and cats live 10 to 15 years or more and adopting is not a spur of the moment decision but instead a serious life changing decision.</p>
          <Link to="/user-dashboard/all-pets" className="procedure-btn">Adoptable Animals</Link>
        </div>

        <button className="continue-btn" onClick={handleComplete}>
          Continue to Application
        </button>
      </div>
    </div>
  );
};

export default Procedure;