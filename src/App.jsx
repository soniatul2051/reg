import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoordinatorRegistration from './components/CoordinatorRegistration';
import SchoolRegistration from './components/SchoolRegistration';
import StudentRegistration from './components/StudentRegistration';
import Login from './components/auth/Login';
import CoordinatorPanel from './components/auth/CoordinatorPanel';
import AdminPanel from './components/auth/AdminPanel';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/auth/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto p-4">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/coordinator-registration" element={<CoordinatorRegistration />} />
              <Route path="/school-registration" element={<SchoolRegistration />} />
              <Route path="/student-registration" element={<StudentRegistration />} />
              <Route path='/login' element={<Login />} />
              <Route path='/coordinator-panel' element={<PrivateRoute element={<CoordinatorPanel />} requiredRole="coordinator" />} />
              <Route path='/admin-panel' element={<PrivateRoute element={<AdminPanel />} requiredRole="admin" />} />
            </Routes>
          </AuthProvider>
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
