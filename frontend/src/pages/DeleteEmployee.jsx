import React, { useState } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './DeleteEmployee.css'; // Import your CSS file for styling

const DeleteEmployee = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteEmployee = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3001/employee/delete/${id}`) // Adjust the endpoint as per your backend
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee Deleted successfully', { variant: 'success' });
        navigate('/editemp'); // Redirect to employees list page or appropriate route
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div className='delete-employee-container'>
      {/* <BackButton /> */}
      <h1 className='delete-employee-title'>Delete Employee</h1>
      {/* {loading ? <Spinner /> : ''} */}
      <div className='delete-employee-dialog'>
        <h3 className='delete-employee-message'>Are you sure you want to delete this employee?</h3>

        <button
          className='delete-employee-button'
          onClick={handleDeleteEmployee}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteEmployee;
