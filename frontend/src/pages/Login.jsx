import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    axios.post('http://localhost:3001/login', { username, password }, { withCredentials: true })
      .then(res => {
        const userData = res.data;
        console.log(userData);
        if (userData.Status === "Success") {
          setUser(userData);
          if (userData.role === "admin") {
            navigate('/adash');
          } else {
            navigate('/udash');
          }
        } else {
          console.log("login failed");
        }
      })
      .catch(err => {
        console.log("Admin error")
        setError(err.response.data.error);
      });
  };

  return (
    <div className="background-container">
      <div className="login-container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='form'>
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
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
        {/* <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
