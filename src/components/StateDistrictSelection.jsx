import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StateDistrictSelection = () => {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // State-District selection logic here
    navigate('/registration-number-generation');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">State-District Selection</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Select State</label>
          <select name="state" onChange={(e) => setState(e.target.value)} value={state} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            <option value="">Select State</option>
            <option value="State1">State1</option>
            <option value="State2">State2</option>
            <option value="State3">State3</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Select District</label>
          <select name="district" onChange={(e) => setDistrict(e.target.value)} value={district} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
            <option value="">Select District</option>
            <option value="District1">District1</option>
            <option value="District2">District2</option>
            <option value="District3">District3</option>
          </select>
        </div>
        <div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Select</button>
        </div>
      </form>
    </div>
  );
};

export default StateDistrictSelection;
