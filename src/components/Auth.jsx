import React, { useState } from 'react';

const AuthModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
    };
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>X</button>
          {isLogin ? (
            <div className="login-form">
              <h2>Login</h2>
              <form>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <div className="form-actions">
                  <button type="submit">Login</button>
                  <p className="signup-link">
                    Don't have an account? <span onClick={toggleForm}>Sign up</span>
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="signup-form">
              <h2>Sign Up</h2>
              <form>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <div className="form-actions">
                  <button type="submit">Sign Up</button>
                  <p className="login-link">
                    Already have an account? <span onClick={toggleForm}>Login</span>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
};

export default AuthModal;