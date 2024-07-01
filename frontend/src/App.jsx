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
import LeaveStatus from './pages/LeaveStatus';
import ReviewLeave from './pages/ReviewLeave';
import LeaveRequest from './pages/LeaveRequest';
import ViewAttendance from './pages/ViewAttendance';
import UpdateAttendance from './pages/UpdateAttendance';
import MarkAttendance from './pages/MarkAttendance';

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
          <Route path="/api/leave/manage/:id" element={<Dashboard role="admin"><ReviewLeave/></Dashboard>} />
          <Route path="/api/attendance/mark" element={<Dashboard role="admin"><MarkAttendance/></Dashboard>} />
          <Route path="/api/attendance/update" element={<Dashboard role="admin"><UpdateAttendance/></Dashboard>} />
          <Route path="/udash/employee/:id" element={<Dashboard role="visitor"><EmpDetails/></Dashboard>} />
          <Route path="/udash/update/:id" element={<Dashboard role="visitor"><UpdateDetails/></Dashboard>} />
          <Route path="/api/leave/request" element={<Dashboard role="visitor"><LeaveRequest/></Dashboard>} />
          <Route path="/api/leave/requests" element={<Dashboard role="visitor"><LeaveStatus/></Dashboard>} />
          <Route path="/api/attendance/view" element={<Dashboard role="visitor"><ViewAttendance/></Dashboard>} />
        </Routes>
       </UserProvider> 
    </BrowserRouter>
  );
}

export default App;
