import React, { useState, useEffect } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import './UpdateEmployee.css'; // Import your CSS file for styling

const UpdateEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [department, setDepartment] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/employee/${id}`)
      .then((response) => {
        const employee = response.data;
        setName(employee.name);
        setEmail(employee.email);
        setDesignation(employee.designation);
        setContactNo(employee.contactNo);
        setAddress(employee.address);
        setDob(formatDate(employee.dob));
        setDepartment(employee.department);
        setBloodGroup(employee.bloodGroup);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleUpdateEmployee = () => {
    const data = {
      name,
      email,
      designation,
      contactNo,
      address,
      dob,
      department,
      bloodGroup,
    };
    setLoading(true);
    axios.put(`http://localhost:3001/employee/update/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Employee edited successfully', { variant: 'success' });
        navigate('/editemp');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='edit-employee-container'>
      {/* <BackButton /> */}
      <h1 className='edit-employee-title'>Edit Employee</h1>
      {/* {loading ? <Spinner /> : ''} */}
      <div className='edit-employee-form'>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Designation</label>
          <input
            type='text'
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Contact No</label>
          <input
            type='text'
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Address</label>
          <input
            type='text'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Date of Birth</label>
          <input
            type='date'
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Department</label>
          <input
            type='text'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <div className='edit-employee-field'>
          <label className='edit-employee-label'>Blood Group</label>
          <input
            type='text'
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className='edit-employee-input'
          />
        </div>
        <button className='edit-employee-button' onClick={handleUpdateEmployee}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateEmployee;
