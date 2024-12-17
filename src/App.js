import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Error from './pages/Error';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AddMovie from './components/AddMovie';
import MovieDetails from './components/MovieDetails';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import {useState, useEffect} from 'react';

function App() {
  // store user info and validate if a user is logged in on the app or not
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  //function for clearing localstorage on logout
  function unsetUser(){
    localStorage.clear();
  };

  // This fetch the user details to set as its user state.
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (localStorage.getItem('token')) {
          try {
              const response = await fetch('https://movieapp-api-lms1.onrender.com/users/details', {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
              });
              const data = await response.json();

              if (data.user._id === undefined) {
                  setUser({ id: null, isAdmin: null });
              } else {
                  setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
              }
          } catch (error) {
              setUser({ id: null, isAdmin: null });
          }
      } else {
          setUser({ id: null, isAdmin: null });
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
                <Route path="/movies" element={<Movies/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/addMovie" element={<AddMovie />} />
                <Route path="/movies/getMovie/:id" element={<MovieDetails />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </Container>
          </Router>
      </UserProvider>
    </>
  );
}

export default App;
