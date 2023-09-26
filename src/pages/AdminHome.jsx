import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "@material-tailwind/react";
import '../pages/form.css'



const AdminHome = () => {

  const [doctors, setDoctors] = useState([]);
  const [patience, setPatience] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate()

  const AdminHome = async () => {

      const Response = await fetch("http://127.0.0.1:8000/userprofile/" , {
          method:'GET',
          headers :{
              'Content-Type':'application/json',
              'Authorization': `Bearer ${authTokens.access}`
          } 
      })

      const data = await Response.json()
      if(Response.status === 200 ){
         const doctorsData = data.filter((item) => item.is_doctor)
         const usersdata = data.filter((item) => !item.is_doctor);
            setPatience(usersdata);
            setDoctors(doctorsData);
      } else {
          console.error('Failed to fetch data');
      }
  }
  useEffect(() => {
    AdminHome();

  }, []);

  console.log(patience);

  return (
    <>
          <h1 className="text-center users">USERS</h1>
    <div className="admin-panel"> 
        <div className="doctor-list">
          <h1 className="text-center" style={{'fontSize':"2rem"}}>Doctors</h1>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card" style={{backgroundColor:'yellow'}}>

                <h3>Dr: {doctor.username}</h3>
                <h3>Name : {doctor.first_name} {doctor.last_name}</h3>
                <h3>Email: {doctor.email}</h3>
                <Button className="mt-2" onClick={()=>navigate(`/userprofile/${doctor.id}`)} type="submit">View</Button>

            </div>
            ))}
        </div>
          
        <div className="user-list">

          <h1 className="text-center" style={{'fontSize':"2rem"}}>Users</h1>
          {patience.map((item) => (
            <div key={item.id} className="user-card" style={{backgroundColor:'green'}}>
              <h3> Username : {item.username}</h3>
              <h3>Name : {item.first_name} {item.last_name}</h3>
              <h3>Email: {item.email}</h3>
            <Button className="mt-2" onClick={()=>navigate(`/userprofile/${item.id}`)} type="submit">View</Button>
          </div>
          ))}
        </div>
          
    </div>
          </>
  )
}

export default AdminHome