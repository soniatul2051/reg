import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminPanel = () => {
  const [dataMode, setDataMode] = useState('schools');
  const [schools, setSchools] = useState([]);
  const [students, setStudents] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsResponse, studentsResponse, coordinatorsResponse] = await Promise.all([
          fetch('https://reg-backend.vercel.app/api/schools'),
          fetch('https://reg-backend.vercel.app/api/students'),
          fetch('https://reg-backend.vercel.app/api/coordinators')
        ]);

        if (schoolsResponse.ok) {
          const schoolsData = await schoolsResponse.json();
          setSchools(schoolsData);
        }

        if (studentsResponse.ok) {
          const studentsData = await studentsResponse.json();
          setStudents(studentsData);
        }

        if (coordinatorsResponse.ok) {
          const coordinatorsData = await coordinatorsResponse.json();
          setCoordinators(coordinatorsData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModeChange = (mode) => {
    setDataMode(mode);
  };

  const handleDelete = async (id, type) => {
    const urlMap = {
      schools: 'schools',
      students: 'students',
      coordinators: 'coordinators'
    };

    try {
      const response = await fetch(`https://reg-backend.vercel.app/api/${urlMap[type]}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        switch (type) {
          case 'schools':
            setSchools(schools.filter(item => item._id !== id));
            break;
          case 'students':
            setStudents(students.filter(item => item._id !== id));
            break;
          case 'coordinators':
            setCoordinators(coordinators.filter(item => item._id !== id));
            break;
          default:
            break;
        }
        console.log(`${type.slice(0, -1)} deleted successfully`);
      } else {
        console.error(`Failed to delete ${type.slice(0, -1)}`);
      }
    } catch (error) {
      console.error(`Error deleting ${type.slice(0, -1)}:`, error);
    }
  };

  const generateColumns = (type) => {
    switch (type) {
      case 'schools':
        return [
          { name: "schoolName", label: "School Name" },
          { name: "principalName", label: "Principal Name" },
          { name: "address", label: "Address" },
          { name: "contactNumber", label: "Contact Number" },
          { name: "email", label: "Email" },
          { name: "coordinator", label: "Coordinator" },
          { name: "state", label: "State" },
          { name: "district", label: "District" },
          {
            name: "_id",
            label: "Actions",
            options: {
              customBodyRender: (value) => (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(value, 'schools')}
                >
                  Delete
                </button>
              ),
            },
          },
        ];
      case 'students':
        return [
          { name: "studentName", label: "Student Name" },
          { name: "dateOfBirth", label: "Date of Birth" },
          { name: "gender", label: "Gender" },
          { name: "grade", label: "Grade" },
          { name: "school", label: "School" },
          { name: "parentName", label: "Parent Name" },
          { name: "parentContactNumber", label: "Parent Contact Number" },
          { name: "address", label: "Address" },
          { name: "state", label: "State" },
          { name: "district", label: "District" },
          {
            name: "_id",
            label: "Actions",
            options: {
              customBodyRender: (value) => (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(value, 'students')}
                >
                  Delete
                </button>
              ),
            },
          },
        ];
      case 'coordinators':
        return [
          { name: "coordinatorName", label: "Coordinator Name" },
          { name: "email", label: "Email" },
          { name: "contactNumber", label: "Contact Number" },
          { name: "school", label: "School" },
          { name: "address", label: "Address" },
          { name: "state", label: "State" },
          { name: "district", label: "District" },
          {
            name: "_id",
            label: "Actions",
            options: {
              customBodyRender: (value) => (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(value, 'coordinators')}
                >
                  Delete
                </button>
              ),
            },
          },
        ];
      default:
        return [];
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options);
  };

  const handleDownload = () => {
    const doc = new jsPDF('p', 'pt');

    const columns = generateColumns(dataMode).filter(column => column.name !== "_id"); 
    const tableRows = [];

    switch (dataMode) {
      case 'schools':
        schools.forEach((row) => {
          const rowData = columns.map((column) => row[column.name]);
          tableRows.push(rowData);
        });
        break;
      case 'students':
        students.forEach((row) => {
          const rowData = columns.map((column) => 
            column.name === "dateOfBirth" ? formatDate(row[column.name]) : row[column.name]
          );
          tableRows.push(rowData);
        });
        break;
      case 'coordinators':
        coordinators.forEach((row) => {
          const rowData = columns.map((column) => row[column.name]);
          tableRows.push(rowData);
        });
        break;
      default:
        break;
    }

    doc.autoTable({
      head: [columns.map((column) => column.label)],
      body: tableRows,
      theme: 'grid',
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: 'middle',
        halign: 'center',
        fillColor: [230, 230, 230],
        textColor: 0,
        fontStyle: 'bold', 
        overflow: 'linebreak', 
        columnWidth: 'auto', 
      },
      columnStyles: {
        0: { cellWidth: 'auto' }, 
        1: { cellWidth: 'auto' }, 
        2: { cellWidth: 'auto' }, 
        
      },
      margin: { top: 60 },
    });

    doc.save(`${dataMode}.pdf`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
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
          <li
            className={`cursor-pointer ${dataMode === 'coordinators' ? 'font-semibold' : ''}`}
            onClick={() => handleModeChange('coordinators')}
          >
            Coordinators
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">
          {dataMode.charAt(0).toUpperCase() + dataMode.slice(1)}
        </h2>
        <button
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleDownload}
        >
          Export to PDF
        </button>
        <MUIDataTable
          title={`${dataMode.charAt(0).toUpperCase() + dataMode.slice(1)} List`}
          data={
            dataMode === 'schools' ? schools :
            dataMode === 'students' ? students :
            coordinators
          }
          columns={generateColumns(dataMode)}
          options={{
            selectableRows: 'none', 
            print: false, 
            download: false,
            filter: false,
            viewColumns: false,
          }}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
