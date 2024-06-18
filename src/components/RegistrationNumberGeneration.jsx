import React, { useState, useEffect } from 'react';

const RegistrationNumberGeneration = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');

  useEffect(() => {
    // Generate a unique registration number
    const generateRegistrationNumber = () => {
      return 'REG-' + Math.floor(1000 + Math.random() * 9000);
    };
    setRegistrationNumber(generateRegistrationNumber());
  }, []);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Registration Number</h2>
      <div className="text-center">
        <p className="text-lg">Your registration number is:</p>
        <p className="text-3xl font-bold text-indigo-600">{registrationNumber}</p>
      </div>
    </div>
  );
};

export default RegistrationNumberGeneration;
