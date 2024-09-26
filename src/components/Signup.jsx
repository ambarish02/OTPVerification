// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import OtpVerification from './OtpVerification';

const Signup = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/generate-otp', { mobileNumber });
      setMessage(response.data.message);
      setOtpSent(true); 
    } catch (error) {
      setMessage('Error generating OTP. Try again.');
    }
  };

  return (
    <div>
      {!otpSent ? (
        <form onSubmit={handleMobileSubmit}>
          <h2>Signup</h2>
          <input
            type="text"
            placeholder="Enter your 10-digit mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <button type="submit">Get OTP</button>
          <div>{message}</div>
        </form>
      ) : (
        <OtpVerification mobileNumber={mobileNumber} />
      )}
    </div>
  );
};

export default Signup;
