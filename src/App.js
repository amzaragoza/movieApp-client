// import logo from './logo.svg';
// import './App.css';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Workouts from './pages/Workouts';
import Error from './pages/Error';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AddWorkout from './pages/AddWorkout';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import {useState, useEffect} from 'react';

function App() {
  // store user info and validate if a user is logged in on the app or not
  const [user, setUser] = useState({
    id: null//,
    // isAdmin: null
  })

  //function for clearing localstorage on logout
  function unsetUser(){
    localStorage.clear();
  }

  // This fetch the user details to set as its user state.
  // useEffect(()=> {
  //   //fetch to retrieve the user details
    
  //   if(localStorage.getItem('token')){
  //       // fetch('http://localhost:4000/users/details', {
  //       fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`
  //         }
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //           console.log(data._id);

  //           if(data._id === undefined){
  //             setUser({
  //               id:null//,
  //               // isAdmin: null
  //             })
  //           }else{
  //             setUser({
  //               id: data._id//,
  //               // isAdmin: data.isAdmin
  //             })
  //           }
  //       })

  //   }else{
  //     setUser({
  //       id: null//,
  //       // isAdmin:null
  //     })
      
  //   }

  // }, [])
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (localStorage.getItem('token')) {
          try {
              const response = await fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              });
              const data = await response.json();
              if (data._id === undefined) {
                  setUser({ id: null });
              } else {
                  setUser({ id: data._id });
              }
          } catch (error) {
              setUser({ id: null });
          }
      } else {
          setUser({ id: null });
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <>
      <UserProvider value = {{user, setUser, unsetUser}}>
          <Router>
            <AppNavbar/>
            <Container>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/workouts" element={<Workouts/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/addWorkout" element={<AddWorkout />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Container>
          </Router>
      </UserProvider>
    </>
  );
}

export default App;
