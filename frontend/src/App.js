
import './App.css';
import Home from './components/Homepage/Home';
import Login from './components/loginPortal/Login/Login';
import Sign from './components/loginPortal/Signin/Sign';

import { BrowserRouter as Router , Routes , Route , Link } from 'react-router-dom';
import Profile from './components/myprofile/Profile';

function App() {


  return (
    <Router>
    
   <div className='App'>
    
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/signup" element={<Sign/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/login' element={<Login/>}/>
    </Routes>
   </div>
   </Router>

  );
}



export default App;
