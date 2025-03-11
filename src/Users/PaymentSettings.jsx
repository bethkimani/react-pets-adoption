import React, { useState } from 'react';
import './PaymentSettings.css';

const PaymentSettings = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [newMethod, setNewMethod] = useState('');
    const [paymentType, setPaymentType] = useState('');

    const addPaymentMethod = () => {
        if (newMethod) {
            setPaymentMethods([...paymentMethods, { type: paymentType, method: newMethod }]);
            setNewMethod('');
            setPaymentType('');
        }
    };

    return (
        <div className="payment-settings">
            <div className="card">
                <h2>Payment Settings</h2>
                <div className="payment-methods">
                    {paymentMethods.length > 0 ? (
                        paymentMethods.map((method, index) => (
                            <div key={index} className="payment-method">
                                {method.type}: {method.method}
                            </div>
                        ))
                    ) : (
                        <p className="no-methods">No payment methods saved. Please add a payment method.</p>
                    )}
                </div>
                <div className="add-payment-method">
                    <select
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        <option value="">Select Payment Type</option>
                        <option value="PayPal">PayPal</option>
                        <option value="MasterCard">MasterCard</option>
                    </select>
                    <input
                        type="text"
                        value={newMethod}
                        onChange={(e) => setNewMethod(e.target.value)}
                        placeholder="Enter payment details"
                    />
                    <button onClick={addPaymentMethod}>Add Payment Method</button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSettings;