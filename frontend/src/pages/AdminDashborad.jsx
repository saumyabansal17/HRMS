import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';
import './AdminDashboard.css'; // Adjust the import path as necessary

const AdminDashboard = () => {
  const [suc, setSuc] = useState();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3001/adash', { withCredentials: true })
      .then(res => {
        if (res.data.Status === "Success") {
          setSuc("Success OK");
        } else {
          navigate('/udash');
        }
      }).catch(err => console.log(err));
  }, [navigate]);

  return (
    <>
      {user && (
        <div className="welcome-box">
          <h2>Welcome, {user.name}</h2>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
