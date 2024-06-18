import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoordinatorRegistration from './components/CoordinatorRegistration';
import SchoolRegistration from './components/SchoolRegistration';
import StudentRegistration from './components/StudentRegistration';
import StateDistrictSelection from './components/StateDistrictSelection';
import RegistrationNumberGeneration from './components/RegistrationNumberGeneration';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coordinator-registration" element={<CoordinatorRegistration />} />
            <Route path="/school-registration" element={<SchoolRegistration />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            <Route path="/state-district-selection" element={<StateDistrictSelection />} />
            <Route path="/registration-number-generation" element={<RegistrationNumberGeneration />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to the Registration App</h1>
    </div>
  );
};

export default App;
