import { useState, useContext } from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

	const { user } = useContext(UserContext);

	return(
		<Navbar bg="primary" expand="lg">
			<Container fluid>
			    <Navbar.Brand as={NavLink} to="/" className=" text-white">Workouts</Navbar.Brand>
			    <Navbar.Toggle aria-controls="basic-navbar-nav" />
			    <Navbar.Collapse id="basic-navbar-nav">
				    <Nav className="ms-auto">
				        <Nav.Link as={NavLink} to="/" exact="true" className=" text-white">Home</Nav.Link>
				        {(user.id !== null) 
                            ? 
								<>
                                    <Nav.Link as={NavLink} to="/workouts" exact="true" className=" text-white">Workouts</Nav.Link>
                                    <Nav.Link as={NavLink} to="/addWorkout" exact="true" className=" text-white">Add Workout</Nav.Link>
									<Nav.Link as={NavLink} to="/logout" exact="true" className=" text-white">Logout</Nav.Link>
								</>
							: 
								<>
									<Nav.Link as={NavLink} to="/login" exact="true" className=" text-white">Login</Nav.Link>
									<Nav.Link as={NavLink} to="/register" exact="true" className=" text-white">Register</Nav.Link>
								</>
						}
				    </Nav>
			    </Navbar.Collapse>
			</Container>
		</Navbar>
	)
}