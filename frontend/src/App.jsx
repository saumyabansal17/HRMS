// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashborad';
import AddEmp from './pages/AddEmployee';
import EmpDetails from './pages/EmployeeDetails';
import EditEmp from './pages/EditEmployee';
import UpdateEmp from './pages/UpdateEmployee';
import UpdateDetails from './pages/UpdateDetails';
import DeleteEmp from './pages/DeleteEmployee';
import Feature3 from './pages/Feature3';
import Feature4 from './pages/Feature4';

function App() {
  return (
    <BrowserRouter>
      <UserProvider> 
        <Routes>
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/udash" element={<Dashboard role="visitor"><UserDashboard /></Dashboard>} />
          <Route path="/adash" element={<Dashboard role="admin"><AdminDashboard /></Dashboard>} />
          <Route path="/" element={<Dashboard><Home /></Dashboard>} />
          <Route path="/addemp" element={<Dashboard role="admin"><AddEmp /></Dashboard>} />
          <Route path="/editemp" element={<Dashboard role="admin"><EditEmp /></Dashboard>} />
          <Route path="/employee/update/:id" element={<Dashboard role="admin"><UpdateEmp /></Dashboard>} />
          <Route path="/employee/delete/:id" element={<Dashboard role="admin"><DeleteEmp/></Dashboard>} />
          <Route path="/udash/employee/:id" element={<Dashboard role="visitor"><EmpDetails/></Dashboard>} />
          <Route path="/udash/update/:id" element={<Dashboard role="visitor"><UpdateDetails/></Dashboard>} />
          <Route path="/page2/feature3" element={<Dashboard><Feature3 /></Dashboard>} />
          <Route path="/page2/feature4" element={<Dashboard><Feature4 /></Dashboard>} />
        </Routes>
       </UserProvider> 
    </BrowserRouter>
  );
}

export default App;
