import { useContext, useEffect ,useState} from "react"
import { AuthContext } from "../context/AuthContext"
import { Button } from "@material-tailwind/react";

const Userview = () => {

  const [doctors, setDoctors] = useState([]);
  const { authTokens } = useContext(AuthContext);
  const DoctorView = async () => {

      const response = await fetch("http://127.0.0.1:8000/viewdoctor", {
          method : 'GET',
          headers:{
              'Content-Type': 'application/json',
              'Authorization' : ` Bearer ${authTokens.access}`
          },
      })
      if(response.status === 200){
          const data = await response.json()
          setDoctors(data)
      } else {
          console.error('Failed to fetch data');
      }
  }

  

  useEffect(() => {
      DoctorView()
  },[])

  useEffect(() => {
    // This effect will run whenever doctors state changes
    console.log('usedoctors:', doctors);
  }, [doctors]); // Add doctors as a dependency


  return (
    <div>
        <h3 className="text-center mt-5" style={{'fontSize':"3rem"}}>Doctors</h3>
        { doctors&&doctors.map((doctor) => (
         <>
            <div  className="card mb-3" style={{backgroundColor:'yellow'}}>
             <i className="fa-solid fa-stethoscope"></i>
             <h4><span style={{ fontWeight: 'bold' }}>First Name:</span> {doctor.username}</h4>
             <p><span style={{ fontWeight: 'bold' }}>Department:</span> {doctor.doctor.department}</p>
             <p><span style={{ fontWeight: 'bold' }}>Haspital :</span> {doctor.doctor.hospital}</p>
             
             <Button className="mt-3" color="green">Book Now</Button>
           </div>      
         </>
        ))}


    </div>
  )
}

export default Userview