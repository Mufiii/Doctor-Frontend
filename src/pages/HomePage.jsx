// import { useContext } from "react"
// import { AuthContext } from "../context/AuthContext"
import './form.css'
import { Button } from '@material-tailwind/react';


 

const HomePage = () => {

  // let {user} = useContext(AuthContext)
  

  return (
    <div>

    <div className="main">
      <div className='content'>
        <h1 >What Makes Us Better,<br /> Makes <br/>You Better</h1>
        <Button className="yo flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
        Learn More
      </Button>
      </div>
    <div>
        <img style={{'height':'400px','width':'500px'}} src="https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?size=626&ext=jpg&ga=GA1.1.1665859203.1675665118&semt=sph" alt="" />
    </div>
    </div>
  </div>
    
  )
}

export default HomePage;

