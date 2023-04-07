import { useState, useEffect } from 'react';
import {  useNavigate , useHistory  } from 'react-router-dom';

import './App.css';
import Home from './components/Homepage/Home';
import Login from './components/loginPortal/Login/Login';
import Sign from './components/loginPortal/Signin/Sign';

import { BrowserRouter as Router , Routes , Route , Link } from 'react-router-dom';
import Profile from './components/myprofile/Profile';
import Cookies from 'js-cookie';

function App() {
 
  const [isLoggedIn , setisLoggedIn] = useState(false)

  useEffect(()=>{
  const isLoggedIn= checkLoggedIn()
  setisLoggedIn(isLoggedIn)
  },[])
//checks if logged in or not for home 
  function HomeRoute() {
    const navigate = useNavigate();
    
    if (!isLoggedIn) {
     return <Login /> // Redirect to login page if user is not logged in
    } else {
      return <Home />; // Render the Home component if user is logged in
    }
  }
//checks it logged in or not signup
  function SignUpRedirect(){
    const navigate = useNavigate();

    useEffect(()=>{
      if(isLoggedIn){
        navigate('/home')
      }
    }, [isLoggedIn , navigate])
    if (!isLoggedIn) {
      return <Sign />;
    }
  
  return null;
  }

function ProfileRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return null;
}

function LoginRedirect (){
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);


  if(!isLoggedIn){
    return <Login/>
  }
  return null;

}


function BaseRedirect (){
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return null;

}

  function checkLoggedIn(){
   let sessionId = Cookies.get('sessionId')
   return sessionId != null ?  true :  false
  }
  return (
    <Router>
    
   <div className='App'>
    
  <Routes>
    <Route path="/" element={<BaseRedirect/>}/>
    <Route path="/home" element={<HomeRoute/>}/>
    <Route path="/signup" element={<SignUpRedirect/>}/>
    <Route path='/profile' element={<ProfileRedirect/>}/>
    <Route path='/login' element={<LoginRedirect/>}/>
    </Routes>
   </div>
   </Router>

  );
}



export default App;
