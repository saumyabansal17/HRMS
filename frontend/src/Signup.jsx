import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear any previous error
    setError('');
    
    // Handle form submission logic here
    axios.post('http://localhost:3001/register', { username, email, password })
      .then(res => {
        navigate('/login')
      })
      .catch(err => {
        // Display error message
        setError(err.response.data.error);
      });
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
