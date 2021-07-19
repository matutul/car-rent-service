import './App.css';
import Home from './Components/Home/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './Components/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookRide from './Components/BookRide/BookRide/BookRide';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import AboutUs from './Components/AboutUs/AboutUs/AboutUs';
import Contact from './Components/Contact/Contact/Contact';
import { createContext } from 'react';
import { useState } from 'react';
import Login from './Components/LoginSystem/Login/Login';
import Signup from './Components/LoginSystem/Signup/Signup';

export const UserContext = createContext();

function App() {

  const [loggedinUser, setLoggedinUser] = useState({
    displayName: 'Ashrafujjaman Tutul',
    email: 'ashrafujjamantutul@gmail.com',
    phoneNumber: '01941071009'
  })

  return (
    <UserContext.Provider value={[loggedinUser, setLoggedinUser]}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <Route path='/book'>
            <BookRide></BookRide>
          </Route>
          <Route path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          <Route path='/about'>
            <AboutUs></AboutUs>
          </Route>
          <Route path='/contact'>
            <Contact></Contact>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/signup'>
            <Signup></Signup>
          </Route>

          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
