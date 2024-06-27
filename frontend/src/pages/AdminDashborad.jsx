// 

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [suc, setSuc] = useState();
  const navigate = useNavigate();
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
      <div>AdminDashboard</div>
      <h2>{suc}</h2>
    </>
  );
};

export default AdminDashboard;