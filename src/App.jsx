import './App.css';
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import './index.css'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import AdminHome from './pages/AdminHome';
import AdminHomePage from './pages/AdminHomePage';
import DoctorView from './pages/DoctorView'
import { useLocation } from 'react-router-dom';
// import AdminHome from './pages/AdminHome';
// import PrivateRoute from './utils/PrivateRoute'


function App() {

  const location = useLocation(null)

  const isLoginPageOrIsRegisterPage = location.pathname.includes('login')|location.pathname.includes('register')
  console.log(isLoginPageOrIsRegisterPage);

  return (
    <div className='App'>
      <AuthProvider >
      {!isLoginPageOrIsRegisterPage && <Header />}
      
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<RegisterPage />} path='/register' />
            <Route element={<HomePage />} path="/" />
            <Route element={<ProfileEdit />} path='/editprofile' />
            <Route element={<Profile />} path='/profileview' />
            <Route element={<AdminHome/>} path='/userprofile'/>
            <Route element={<AdminHomePage/>} path='/userprofile/:id'/>
            <Route element={<DoctorView/>} path='/viewdoctor' />
          </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
