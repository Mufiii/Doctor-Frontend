import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link, NavLink } from "react-router-dom"
import '../pages/form.css'
import { useNavigate } from "react-router-dom"
import { AiOutlineLogout } from 'react-icons/Ai';

import {
  Navbar,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";


const Header = () => {

  let { user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  console.log(user, 'headuser');

  return (
    <div>


      {/* <Link to="/" >Home</Link>
      <span> | </span>
      <Link to="/profileview" >view</Link>
      <span> | </span>
      <Link to="/profile" >edit</Link>
      <span> | </span>
      {user ? (
          <p onClick={logoutUser}>Logout</p>
      ):(  
          <Link to="login/" >Login</Link>
      )} */}


      <Navbar className="mx-auto full-width ">
        <div className="flex flex-wrap items-center  gap-y-4 text-blue-gray-900">
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="mr-4 ml-2 cursor-pointer py-1.5"
          >
            My Doctor
          </Typography>
          {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-normal"
      >
        <a href="/profile" className="flex items-center">
          edit
        </a>
      </Typography>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="/profileview" className="flex items-center">
          View
        </a>
      </Typography> */}
          {!user.is_doctor & !user.is_admin?(
            <Link to='/viewdoctor' > Doctors</Link >
          ):null}

          {user && user.is_admin && (
            <Link to="/userprofile" >Users</Link>
          )}






          <div className="log" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div>
              {user ? (

                <div className="center relative inline-block select-none whitespace-nowrap rounded-full bg-teal-500 px-3.5 py-1.5 align-baseline    font-sans text-xs font-bold uppercase leading-none text-white ">
                  <div className="absolute top-2/4 left-1 h-5 w-5 -translate-y-2/4 " onClick={() => navigate("/profileview")}  >
                    <img
                      alt="tania andrew"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                      className="relative inline-block h-5 w-5 translate-x-px translate-y-px rounded-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 mt-px" onClick={() => navigate("/profileview")}>
                    <p className="block font-sans text-sm font-medium capitalize leading-none text-white antialiased">
                      {user && user.username}
                    </p>
                  </div>
                </div>
              ) : (
                <Button color="green">LOGIN</Button>
              )}
            </div>
            <div>
              <AiOutlineLogout onClick={(e) => logoutUser(e)} />
            </div>
          </div>
        </div>
      </Navbar>

    </div>
  )
}

export default Header