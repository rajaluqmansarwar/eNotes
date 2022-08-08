import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import NoteState from './context/NoteState';
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
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
