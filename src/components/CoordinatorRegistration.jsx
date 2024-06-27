import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CoordinatorRegistration = () => {
  const [formData, setFormData] = useState({
    coordinatorName: '',
    email: '',
    contactNumber: '',
    school: '',
    password: '',
    address: '',
    state: '',
    district: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://reg-backend.vercel.app/api/coordinators', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          // Display success message
          setFormData({
            coordinatorName: '',
            email: '',
            contactNumber: '',
            school: '',
            password: '',
            address: '',
            state: '',
            district: ''
          });
          alert('Registration form submitted successfully');
          navigate('/school-registration');
        } else {
          return response.json().then(data => {
            if (response.status === 409 && data.msg === "Coordinator already exists") {
              alert('Coordinator with this email already exists');
            } else {
              alert('Registration failed');
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed');
      });
  };
  

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Coordinator Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Coordinator Name</label>
          <input type="text" name="coordinatorName" onChange={handleChange} value={formData.coordinatorName} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" onChange={handleChange} value={formData.email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input type="text" name="contactNumber" onChange={handleChange} value={formData.contactNumber} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">School</label>
          <input type="text" name="school" onChange={handleChange} value={formData.school} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" onChange={handleChange} value={formData.password} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" name="address" onChange={handleChange} value={formData.address} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">District</label>
          <input type="text" name="district" onChange={handleChange} value={formData.district} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" name="state" onChange={handleChange} value={formData.state} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
        </div>
        <div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
        </div>
      </form>
    </div>
  );
};

export default CoordinatorRegistration;
