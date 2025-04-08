// src/components/VerifyOtp.jsx
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyOtp } from '../api';
import './Auth.css';

const VerifyOtp = () => {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await verifyOtp({ email, otp });
            const { token } = response.data;
            navigate(`/reset-password?token=${token}`);
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to verify OTP. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Verify OTP</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <div className="form-actions">
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;