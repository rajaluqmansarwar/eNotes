import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState} from 'react'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import NoteState from './context/NoteState';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Alerts from  './components/Alerts/Alerts'
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
      <NoteState showAlert={showAlert}>
        <Router>
          <Navbar/>
          <Alerts alert={alert}/>
          <div className="container">
            <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert} />} />
                <Route exact path="/About" element={<About showAlert={showAlert}/>} />
                <Route exact path="/Login" element={<Login showAlert={showAlert}/>} />
                <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
