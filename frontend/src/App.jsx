import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import UserDashboard from './UserDashboard.jsx'
import AdminDashborad from './AdminDashborad.jsx'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/udash' element={<UserDashboard/>}></Route>
      <Route path='/adash' element={<AdminDashborad/>}></Route>
    {/* <Login/> */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
