
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpVerification = ({ mobileNumber }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/verify-otp', { mobileNumber, otp });
      setMessage(response.data.message);
      if (response.data.message === 'OTP verified successfully') {
        
        navigate('/homepage');
      }
    } catch (error) {
      setMessage('Invalid OTP. Try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleOtpSubmit}>
        <h2>Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter the OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify OTP</button>
        <div>{message}</div>
      </form>
    </div>
  );
};

export default OtpVerification;
