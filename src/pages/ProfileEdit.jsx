import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom'
import { Card } from "@material-tailwind/react"
import {
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,

} from "@material-tailwind/react";


const ProfileEdit = () => {

  let { authTokens, user, setLoading } = useContext(AuthContext)
  const [value, setValue] = useState([])
  console.warn(authTokens);
  const navigate = useNavigate()

  // const [edit,setEdit]=useState(()=>localStorage.getItem('data')?JSON.parse(localStorage.getItem('data')):null)


  const EditProfile = async (e) => {
    e?.preventDefault()
console.log(e);
    
      let response = await fetch("http://127.0.0.1:8000/profile/", {
        method: !e ? 'GET' : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`
      },
      body: e ? JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        ...(e.target.firstname.value && { first_name: e.target.firstname.value }),
        ...(e.target.lastname.value && { last_name: e.target.lastname.value }),
        doctor: user.is_doctor ? {
          ...(e.target.hospital.value && { hospital: e.target.hospital.value }),
          ...(e.target.department.value && { department: e.target.department.value })
        } : undefined,
      } ): null
      
    })
    let data = await response.json()
    console.log(data);
    console.log(response.status);
    if (response.status === 200) {
      if (e) {
        console.log(e);
        navigate('/profileview')
      }
      setValue(data)
    }
    
  }
  
  useEffect(() => {
    EditProfile()
    setLoading(true)

  }, [])

  return (
    <div>




  <form onSubmit={(e) => EditProfile(e)}>
    <Card style={{ marginTop: '10rem' }} className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            src="/img/profile-picture.jpg" // Replace with the user's profile picture URL
            alt="Profile Picture"
            className="h-48 w-full object-cover md:w-48"
          />
        </div>
        <CardBody className="text-left p-6">
        <Typography variant="body" color="blue-gray" className="mb-2">
          <Input label="Username" name="username" defaultValue={value && value.username} /> 
          </Typography>
          <Typography variant="body" color="blue-gray" className="mb-2">
          <Input label="First Name" name="firstname" defaultValue={value && value.first_name} /> 
          </Typography>
          <Typography variant="body" color="blue-gray" className="mb-2">
          <Input label="Last Name" name="lastname" defaultValue={value && value.last_name} /> 
          </Typography>
          <Typography variant="body" color="blue-gray" className="mb-2">
          <Input label="Email Address" name="email" defaultValue={value && value.email} /> 
          </Typography>
          {user && user.is_doctor ? (
            <>
              <Typography variant="body" color="blue-gray" className="mb-2">
              <Input label="Hospital" name="hospital" defaultValue={value.doctor ? value.doctor.hospital : ''} /> 
              </Typography>
              <Typography variant="body" color="blue-gray" className="mb-2">
              <Input label="Department" name="department" defaultValue={value.doctor ? value.doctor.department : ''} /> 
              </Typography>
            </>
          ) : null}
          <div className="mt-6">
            <Button fullWidth type="submit" color="green" >Submit</Button>
          </div>
        </CardBody>
      </div>
    </Card>
</form>

    </div>
  )
}

export default ProfileEdit