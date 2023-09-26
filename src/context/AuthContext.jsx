import { createContext, useEffect  } from "react";
import jwt_decode from "jwt-decode";
import { useState  } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  // console.log(children);
  let [authTokens,setAuthTokens] = useState(()=>localStorage.getItem('authtokens')?JSON.parse(localStorage.getItem('authtokens')):null)
  let [user,setUser] = useState(()=>localStorage.getItem('authtokens')?jwt_decode(localStorage.getItem('authtokens')):null)
  // console.log(user,'authuser');
  let [loading,setLoading] = useState(true)


  const navigate = useNavigate(); 


  let loginUser = async (e ) => {
    e.preventDefault()
    console.log('from submitted');
    let response = await fetch('http://127.0.0.1:8000/login/',{
      method:'POST',
      headers:{
        'content-type': 'application/json' 
      },
      body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
    })
    let data = await response.json()
    console.log('response', data);
    if(response.status === 200 ){
      setAuthTokens(data); // Set authentication tokens in state
      setUser(jwt_decode(data.access)); // Decode and set user data in state
      localStorage.setItem('authtokens', JSON.stringify(data)); // Store data in local storage
      navigate("/")
    }else{
      alert("Something Went Wrong")
    }
  }

  let logoutUser = () => {
      setAuthTokens(null)
      setUser(null)
      localStorage.removeItem('authtokens')
      navigate('/login')
  }

  let updateToken = async () => {
    console.log("Update Token Called");

    let response = await fetch('http://127.0.0.1:8000/refresh/',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({'refresh':authTokens.refresh })
    })
    let data = await response.json()
    if(response.status === 200 ){
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authtokens' , JSON.stringify(data))
    } else {
       logoutUser()
    }
    if (loading) {
      setLoading(false);
  }
}

  const state = {
      user:user,
      loginUser:loginUser,
      authTokens:authTokens,
      setLoading:setLoading,
      logoutUser:logoutUser,
      loading:loading,
  }

  useEffect (() => {

    let fourMinutes = 1000 * 60 * 50
      let intervel = setInterval(() =>{
          if(authTokens){
              updateToken()
          }
      },fourMinutes )
      return ()=> clearInterval(intervel);

  }, [authTokens,loading]);
  


  return <AuthContext.Provider value={state}>
    {children}
  </AuthContext.Provider>;

};