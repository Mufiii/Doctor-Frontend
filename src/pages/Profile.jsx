import { useContext,useState ,useEffect} from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Typography,

} from "@material-tailwind/react";
import '../pages/form.css'


const Profile = () => {

  let {authTokens,user,logoutUser} = useContext(AuthContext)
  const [details, setDetails] = useState();

  const navigate = useNavigate()

  const ProfileDetails = async (e) => {
      e?.preventDefault()

      const Response = await fetch("http://127.0.0.1:8000/profile/", {
          method: e?'DELETE':'GET',
          headers:{
                'content-type':'application/json',
                'authorization': `Bearer ${authTokens.access}`
          }
      })
      const data = await Response.json()
      console.log(Response.status);
      if(Response.status === 200 ){
          if(e) {
            alert(data.msg)
            logoutUser()
          }
          setDetails(data)
          localStorage.setItem('data',JSON.stringify(data))
      }
      else {
        data.email?alert(data.email):data.msg.username?alert(data.msg.username):alert('invalid data')
    }  
  }

  const deleteHandler = (e) => {
    const confirm = window.confirm('Are You Sure')
    if(confirm){
      ProfileDetails(e)
    }else{
      null;
    }
  }

  useEffect(() => {
    ProfileDetails()
  }, [])

  return (
    <div className="mainclasss">

      {/* <Link to='/profile'>edit</Link>
      <button onClick={(e)=>ProfileDetails(e)}>delete</button> */}

{details && <>
    
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
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {details.username} 
          </Typography>
          <Typography variant="body" color="blue-gray" className="mb-2">
          <span style={{ fontWeight: 'bold' }}>First Name:</span> {details.first_name}
          </Typography>
          <Typography variant="body" color="blue-gray" className="mb-2">
          <span style={{ fontWeight: 'bold' }}>Last Name:</span> {details.last_name}
          </Typography>
          <Typography variant="body" color="blue-gray" className="mb-2">
          <span style={{ fontWeight: 'bold' }}>Username:</span> {details.username}
          </Typography>
          <Typography variant="body" color="blue-gray" className="mb-2">
          <span style={{ fontWeight: 'bold' }}>Email Address:</span> {details.email}
          </Typography>
          {user && user.is_doctor ? (
            <>
              <Typography variant="body" color="blue-gray" className="mb-2">
              <span style={{ fontWeight: 'bold' }}>Hospital :</span> {details.doctor.hospital}
              </Typography>
              <Typography variant="body" color="blue-gray" className="mb-2">
              <span style={{ fontWeight: 'bold' }}>Department:</span> {details.doctor.department}
              </Typography>
            </>
          ) : null}
          <div className="mt-6">
            <Button
              className="mr-4"
              onClick={() => navigate("/editprofile")}
              color="green"
            >
              Edit Profile
            </Button>
            <Button
              onClick={(e) => deleteHandler(e)}
              color="red"
            >
              Delete Account
            </Button>
          </div>
        </CardBody>
      </div>
    </Card>
  </>}



    </div>
  )
}

export default Profile