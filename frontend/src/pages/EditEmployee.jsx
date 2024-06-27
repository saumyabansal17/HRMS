import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import './EditEmployee.css'; // Import your CSS file

const EditEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3001/editemp')
      .then((response) => {
        console.log('API response:', response.data); // Log the response to ensure it's an array
        setEmployees(response.data.data); // Ensure accessing the data correctly
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading employees: {error}</div>;
  }

  return (
    <div className='employee-container'>
      <h1 className='title'>Employee List</h1>
      <div className='table-container'>
        <table className='custom-table'>
          <thead>
            <tr>
              <th className='custom-th'>Emp ID</th>
              <th className='custom-th'>Name</th>
              <th className='custom-th'>Designation</th>
              <th className='custom-th'>Department</th>
              <th className='custom-th'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee._id} className='custom-tr'>
                  <td className='custom-td'>{employee.username}</td>
                  <td className='custom-td'>{employee.name}</td>
                  <td className='custom-td'>{employee.designation}</td>
                  <td className='custom-td'>{employee.department}</td>
                  <td className='custom-td'>
                    <div className='flex gap-x-4'>
                      <Link to={`/employee/update/${employee._id}`}>
                        <AiOutlineEdit className='icon edit-icon' />
                      </Link>
                      <Link to={`/employee/delete/${employee._id}`}>
                        <MdOutlineDelete className='icon delete-icon'/>
                      </Link>
                      {/* <button
                        onClick={() => handleDelete(employee._id)}
                        className='icon delete-icon'
                      >
                        <MdOutlineDelete />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='custom-td'>No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditEmployee;
