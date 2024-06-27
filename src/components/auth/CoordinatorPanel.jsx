import React, { useState, useEffect } from 'react';

const CoordinatorPanel = () => {
  const [dataMode, setDataMode] = useState('schools'); 
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch schools
        const schoolsResponse = await fetch('https://reg-backend.vercel.app/api/schools');
        if (schoolsResponse.ok) {
          const schoolsData = await schoolsResponse.json();
          setSchools(schoolsData);
        }

        // Fetch students
        const studentsResponse = await fetch('https://reg-backend.vercel.app/api/students');
        if (studentsResponse.ok) {
          const studentsData = await studentsResponse.json();
          setStudents(studentsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleModeChange = (mode) => {
    setDataMode(mode);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Coordinator Panel</h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer ${dataMode === 'schools' ? 'font-semibold' : ''}`}
            onClick={() => handleModeChange('schools')}
          >
            Schools
          </li>
          <li
            className={`cursor-pointer ${dataMode === 'students' ? 'font-semibold' : ''}`}
            onClick={() => handleModeChange('students')}
          >
            Students
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="md:flex-1 p-4 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">
          {dataMode === 'schools' ? 'Schools' : 'Students'}
        </h2>
        {dataMode === 'schools' && (
          <table className="min-w-full bg-white border border-gray-200 rounded shadow overflow-hidden">
            <thead className="bg-gray-100 text-gray-800 uppercase">
              <tr>
                <th className="py-3 px-4 text-left">School Name</th>
                <th className="py-3 px-4 text-left">Principal Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Contact Number</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Coordinator</th>
                <th className="py-3 px-4 text-left">State</th>
                <th className="py-3 px-4 text-left">District</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {schools.map((school) => (
                <tr key={school._id}>
                  <td className="py-2 px-4">{school.schoolName}</td>
                  <td className="py-2 px-4">{school.principalName}</td>
                  <td className="py-2 px-4">{school.address}</td>
                  <td className="py-2 px-4">{school.contactNumber}</td>
                  <td className="py-2 px-4">{school.email}</td>
                  <td className="py-2 px-4">{school.coordinator}</td>
                  <td className="py-2 px-4">{school.state}</td>
                  <td className="py-2 px-4">{school.district}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {dataMode === 'students' && (
          <table className="min-w-full bg-white border border-gray-200 rounded shadow overflow-hidden">
            <thead className="bg-gray-100 text-gray-800 uppercase">
              <tr>
                <th className="py-3 px-4 text-left">Student Name</th>
                <th className="py-3 px-4 text-left">Date of Birth</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Grade</th>
                <th className="py-3 px-4 text-left">School</th>
                <th className="py-3 px-4 text-left">Parent Name</th>
                <th className="py-3 px-4 text-left">Parent Contact Number</th>
                <th className="py-3 px-4 text-left">State</th>
                <th className="py-3 px-4 text-left">District</th>
                <th className="py-3 px-4 text-left">Address</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="py-2 px-4">{student.studentName}</td>
                  <td className="py-2 px-4">{student.dateOfBirth}</td>
                  <td className="py-2 px-4">{student.gender}</td>
                  <td className="py-2 px-4">{student.grade}</td>
                  <td className="py-2 px-4">{student.school}</td>
                  <td className="py-2 px-4">{student.parentName}</td>
                  <td className="py-2 px-4">{student.parentContactNumber}</td>
                  <td className="py-2 px-4">{student.state}</td>
                  <td className="py-2 px-4">{student.district}</td>
                  <td className="py-2 px-4">{student.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CoordinatorPanel;
