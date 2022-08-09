import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import NoteState from './context/NoteState';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <div className="container">
            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/About" element={<About/>} />
                <Route exact path="/Login" element={<Login/>} />
                <Route exact path="/Signup" element={<Signup/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
