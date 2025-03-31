import React, { useState } from "react";
import { addPaymentMethod } from '../api'; // Import the API function
import "./PaymentSettings.css";

const PaymentSettings = ({ onSubmit }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newMethod, setNewMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePaymentMethod = () => {
    if (!paymentType) {
      setError("Please select a payment type.");
      return false;
    }
    if (!newMethod.trim()) {
      setError("Please enter payment details.");
      return false;
    }
    if (paymentType === "PayPal" && !newMethod.includes("@")) {
      setError("Please enter a valid PayPal email.");
      return false;
    }
    if (paymentType === "MasterCard" && !/^\d{16}$/.test(newMethod.replace(/\s/g, ""))) {
      setError("Please enter a valid 16-digit MasterCard number.");
      return false;
    }
    return true;
  };

  const addNewPaymentMethod = async () => {
    setError("");
    setSuccess("");

    if (!validatePaymentMethod()) return;

    const newPayment = {
      user_id: localStorage.getItem('user_id'), // Ensure you have the user ID
      payment_type: paymentType,
      method: newMethod,
    };

    try {
      await addPaymentMethod(newPayment); // Call the API to add the payment
      setPaymentMethods([...paymentMethods, newPayment]);
      setNewMethod("");
      setPaymentType("");
      setSuccess("Payment method added successfully!");
    } catch (error) {
      setError("Failed to add payment method.");
      console.error(error);
    }

    // Call onSubmit to move to the next step
    if (onSubmit) {
      onSubmit();
    }
  };

  const deletePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    setSuccess("Payment method deleted successfully!");
    setError("");
  };

  return (
    <div className="payment-settings">
      <h1>Payment Settings</h1>
      <div className="payment-card">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="payment-methods">
          <h3>Saved Payment Methods</h3>
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <div key={method.id} className="payment-method">
                <div className="method-details">
                  <span className="method-type">{method.payment_type}</span>
                  <span className="method-info">
                    {method.payment_type === "MasterCard"
                      ? `**** **** **** ${method.method.slice(-4)}`
                      : method.method}
                  </span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => deletePaymentMethod(method.id)}
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </button>
              </div>
            ))
          ) : (
            <p className="no-methods">No payment methods saved. Add one below.</p>
          )}
        </div>
        <div className="add-payment-method">
          <h3>Add New Payment Method</h3>
          <div className="form-group">
            <label htmlFor="payment-type">Payment Type</label>
            <select
              id="payment-type"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="">Select Payment Type</option>
              <option value="PayPal">PayPal</option>
              <option value="MasterCard">MasterCard</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="payment-details">Payment Details</label>
            <input
              id="payment-details"
              type="text"
              value={newMethod}
              onChange={(e) => setNewMethod(e.target.value)}
              placeholder={
                paymentType === "PayPal"
                  ? "Enter PayPal email"
                  : "Enter 16-digit card number"
              }
            />
          </div>
          <button className="add-button" onClick={addNewPaymentMethod}>
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;