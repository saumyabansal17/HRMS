import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for the token in cookies on mount and fetch user data
    axios.get('http://localhost:3001/api/check-auth', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const logout = () => {
    axios.post('http://localhost:3001/api/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
