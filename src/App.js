import './App.css';
import Home from './Components/Home/Home/Home';

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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from "react-router-dom";
import Payment from './Components/BookRide/Payment/Payment';



export const UserContext = createContext();

function App() {

  const [loggedinUser, setLoggedinUser] = useState({});
  // const location = useLocation();
  // const history = useHistory();
  // const { from } = location.state || { from: { pathname: "/" } };
  

  useEffect(() => {
    if (sessionStorage.getItem('idToken')) {
      fetch('https://rocky-waters-70556.herokuapp.com/checkUsers', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${sessionStorage.getItem('idToken')}`
        }
      })
        .then(res => res.json())
        .then(result => {
          if (result.email && result.name) {
            setLoggedinUser({ displayName: result.name, email: result.email });
            // history.replace(from);
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

          
          {/* <PrivateRoute path='/dashboard/activeOrder'>
            <Dashboard></Dashboard>
          </PrivateRoute> */}
          <PrivateRoute path='/dashboard/:pageName'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path='/dashboard'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/payment'>
            <Payment />
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
