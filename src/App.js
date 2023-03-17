
import './App.css';
import Home from './components/Homepage/Home';
import Login from './components/loginPortal/Login/Login';
import Sign from './components/loginPortal/Signin/Sign';

import { BrowserRouter as Router , Routes , Route , Link } from 'react-router-dom';

function App() {


  return (
    <Router>
   <div className='App'>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Sign/>}/>
    </Routes>
   </div>
   </Router>

  );
}



export default App;
