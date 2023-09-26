import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"
import './form.css';
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



const LoginPage = () => {
   
  let {loginUser} = useContext(AuthContext)
  
  return (
    <div>
          

  <form className="center-card" onSubmit={loginUser}>
    <Card className="w-96 ">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center "
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email"  size="lg" name="email"/>
        <Input label="Password" size="lg" name="password"/>
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button type="submit" variant="gradient" fullWidth>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="/register"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  </form>

    </div>
  )
}

export default LoginPage

