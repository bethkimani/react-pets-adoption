import React, { useState } from 'react';
import Procedure from './Procedure';
import AdoptionForm from './AdoptionForm';
import PaymentSettings from './PaymentSettings';
import SchedulePickup from './SchedulePickup';
import './AdoptionProcess.css';

const AdoptionProcess = () => {
  const [currentStep, setCurrentStep] = useState('Procedure');
  const [completedSteps, setCompletedSteps] = useState({
    Procedure: false,
    Application: false,
    Payment: false,
    'Schedule pick-up': false,
  });

  const handleStepClick = (step) => {
    console.log('Step clicked:', step);
    if (step === 'Application' && !completedSteps.Procedure) {
      alert('Please complete the Procedure step first.');
      return;
    }
    if (step === 'Payment' && (!completedSteps.Procedure || !completedSteps.Application)) {
      alert('Please complete the Procedure and Application steps first.');
      return;
    }
    if (step === 'Schedule pick-up' && (!completedSteps.Procedure || !completedSteps.Application || !completedSteps.Payment)) {
      alert('Please complete the Procedure, Application, and Payment steps first.');
      return;
    }
    if (step === 'Pet adopted' && (!completedSteps.Procedure || !completedSteps.Application || !completedSteps.Payment || !completedSteps['Schedule pick-up'])) {
      alert('Please complete all previous steps first.');
      return;
    }
    setCurrentStep(step);
  };

  const handleProcedureComplete = () => {
    console.log('Procedure completed, moving to Application');
    setCompletedSteps((prev) => ({ ...prev, Procedure: true }));
    setCurrentStep('Application');
  };

  const handleApplicationSubmit = () => {
    console.log('Application submitted, moving to Payment');
    setCompletedSteps((prev) => ({ ...prev, Application: true }));
    setCurrentStep('Payment');
  };

  const handlePaymentSubmit = () => {
    console.log('Payment submitted, moving to Schedule pick-up');
    setCompletedSteps((prev) => ({ ...prev, Payment: true }));
    setCurrentStep('Schedule pick-up');
  };

  const handleScheduleSubmit = () => {
    console.log('Schedule submitted, moving to Pet adopted');
    setCompletedSteps((prev) => ({ ...prev, 'Schedule pick-up': true }));
    setCurrentStep('Pet adopted');
  };

  console.log('Current step:', currentStep);
  console.log('Completed steps:', completedSteps);

  return (
    <div className="adoption-process-container">
      <div className="header">
        <div className="shelter-info">
          <div className="shelter-logo">W</div>
          <h2>Shelter World</h2>
        </div>
        {/* Removed <h1>Application Details</h1> */}
        <button className="payment-btn">Application Details</button> {/* Changed button label to "Application Details" */}
      </div>

      <div className="progress-timeline">
        <div
          className={`progress-step ${currentStep === 'Procedure' ? 'active' : ''} ${
            completedSteps.Procedure ? 'completed' : ''
          }`}
          onClick={() => handleStepClick('Procedure')}
        >
          <div className="step-circle">
            {completedSteps.Procedure ? '✔' : '⬤'}
          </div>
          <p>Procedure</p>
        </div>

        <div className="progress-line"></div>

        <div
          className={`progress-step ${currentStep === 'Application' ? 'active' : ''} ${
            completedSteps.Application ? 'completed' : ''
          }`}
          onClick={() => handleStepClick('Application')}
        >
          <div className="step-circle">
            {completedSteps.Application ? '✔' : '⬤'}
          </div>
          <p>Application</p>
        </div>

        <div className="progress-line"></div>

        <div
          className={`progress-step ${currentStep === 'Payment' ? 'active' : ''} ${
            completedSteps.Payment ? 'completed' : ''
          }`}
          onClick={() => handleStepClick('Payment')}
        >
          <div className="step-circle">
            {completedSteps.Payment ? '✔' : '⬤'}
          </div>
          <p>Payment</p>
        </div>

        <div className="progress-line"></div>

        <div
          className={`progress-step ${currentStep === 'Schedule pick-up' ? 'active' : ''} ${
            completedSteps['Schedule pick-up'] ? 'completed' : ''
          }`}
          onClick={() => handleStepClick('Schedule pick-up')}
        >
          <div className="step-circle">
            {completedSteps['Schedule pick-up'] ? '✔' : '⬤'}
          </div>
          <p>Schedule pick-up</p>
        </div>

        <div className="progress-line"></div>

        <div
          className={`progress-step ${currentStep === 'Pet adopted' ? 'active' : ''}`}
          onClick={() => handleStepClick('Pet adopted')}
        >
          <div className="step-circle">❤️</div>
          <p>Pet adopted</p>
        </div>
      </div>

      <div className="step-content">
        {currentStep === 'Procedure' && <Procedure onProcedureComplete={handleProcedureComplete} />}
        {currentStep === 'Application' && <AdoptionForm onSubmit={handleApplicationSubmit} />}
        {currentStep === 'Payment' && <PaymentSettings onSubmit={handlePaymentSubmit} />}
        {currentStep === 'Schedule pick-up' && (
          <SchedulePickup onScheduleSubmit={handleScheduleSubmit} />
        )}
        {currentStep === 'Pet adopted' && (
          <div className="pet-adopted-message">
            <h2>Congratulations!</h2>
            <p>Your pet adoption process is complete. We wish you and your new friend a lifetime of happiness!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionProcess;