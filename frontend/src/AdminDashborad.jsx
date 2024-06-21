import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminDashborad = () => {
  const [suc,setSuc]=useState();
  const navigate=useNavigate()
  axios.defaults.withCredentials=true;

  useEffect(()=>{
    axios.get('http://localhost:3001/adash')
      .then(res => {
          if(res.data.Status === "Success"){
            setSuc("Success OK")
          }else{
            navigate('/udash')
          }
        
      }).catch(err => console.log(err));
  },[])

  return (
    <>
    <div>AdminDashborad</div>
    <h2>{suc}</h2>
    </>
  )
}

export default AdminDashborad