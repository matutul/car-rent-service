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
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import Login from './Components/LoginSystem/Login/Login';
import Signup from './Components/LoginSystem/Signup/Signup';
import PrivateRoute from './Components/LoginSystem/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedinUser, setLoggedinUser] = useState({});

  useEffect(() => {
    console.log(sessionStorage.getItem('idToken'))
    if (sessionStorage.getItem('idToken')) {
      fetch('http://localhost:4000/checkUsers', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${sessionStorage.getItem('idToken')}`
        }
      })
        .then(res => res.json())
        .then(result => {
          if(result.email && result.name){
            setLoggedinUser({displayName: result.name, email: result.email});
          }
        })
    }
  }, [])

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

          <PrivateRoute exact path='/dashboard'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/dashboard/:pageName'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/dashboard/activeOrder'>
            <Dashboard></Dashboard>
          </PrivateRoute>


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
