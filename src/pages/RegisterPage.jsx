// import { useContext } from "react"
// import { AuthContext } from "../context/AuthContext"
import './form.css';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";



const RegisterPage = () => {

  const navigate = useNavigate()

  let RegisterPage = async(e ) => {
    e.preventDefault()

    const isDoctor = document.getElementById('is_doctor_checkbox').checked;
    console.log(isDoctor);

    let response = await fetch('http://127.0.0.1:8000/' ,{
        method:'POST',
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify({
          'username': e.target.username.value,
          'email': e.target.email.value,
          'password': e.target.password.value,
          'confirm_password': e.target.confirm_password.value,
          is_doctor:isDoctor
        }) 
    })
    let data = await response.json()
    console.log(data);
    navigate("/login")
    
  }

  return (
    <div>

    <form className='center-card' onSubmit={RegisterPage}>
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center "
      >
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Username" size="lg" name="username"/>
        <Input label="Email Address" size="lg" name="email"/>
        <Input label="Password" size="lg" name="password"/>
        <Input label="Confirm password" size="lg" name="confirm_password"/>
        <div className="-ml-2.5"  style={{display:'flex'}}>
          <Checkbox id='is_doctor_checkbox' name='is_doctor' color="primary" label="Doctor" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button type="submit" variant="gradient" fullWidth>
          Sign Up
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Already have an account?
          <Typography
            as="a"
            href="/login"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            >
            Log In
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
    </form>

  </div>
  )
}

export default RegisterPage