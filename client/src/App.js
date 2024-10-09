import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes , Route , Link } from 'react-router-dom'
import Homescreen from './screens/Homescreen.js'
import Bookingscreen from './screens/Bookingscreen.js';
import Registerscreen from './screens/Registerscreen.js';
import Loginscreen from './screens/Loginscreen.js';
import Profilescreen from './screens/Profilescreen.js';
import Adminscreen from './screens/Adminscreen.js';
import Landingscreen from './screens/Landingscreen.js';
function App() {
  return (
    <>
    <div className="App">
    <Navbar/>
    <Router>
    <Routes>
    <Route path = "/home" exact element = {<Homescreen/>} />
    <Route path = "/book/:roomid/:fromdate/:todate" exact element ={<Bookingscreen/>} />
    <Route path = "/register" exact element ={<Registerscreen/>} />
    <Route path = "/login" exact element = {<Loginscreen/>} />
    <Route path = "/profile" exact element = {<Profilescreen/>} />
    <Route path = "/admin" exact element = {<Adminscreen/>} />
    <Route path = "/" exact element = {<Landingscreen/>} />

    </Routes>
    </Router>
    </div>
    </>
  );
}

export default App;
