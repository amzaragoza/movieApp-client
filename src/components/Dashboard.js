import { useState, useEffect, useContext } from 'react';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';

import UpdateMovie from './UpdateMovie';
import UserContext from '../UserContext';

export default function AdminDashboard() {

	const { user } = useContext(UserContext);
    const notyf = new Notyf();
    const navigate = useNavigate();
	const [movies, setMovies] = useState([]);

	const fetchData = () => {
		fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies', {
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data.error === "No movies found" || data.movies.length === 0) {
				setMovies([]);
			} else {
				setMovies(data.movies);
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, [user])


	function deleteMovie(movieId) {

	        fetch(`https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${movieId}`,{

	        method: 'DELETE',
	        headers: {
	            "Content-Type": "application/json",
	            'Authorization': `Bearer ${localStorage.getItem("token")}`
	        }
	    })
	    .then(res => res.json())
	    .then(data => {

	        if(data.message === "Movie deleted successfully") {
	        	notyf.success("Movie deleted successfully");
	        	fetchData();
	        }else{
	        	notyf.error("Movie not found")
	        }
	    })
	}

	return(
		(user.id !== null && user.isAdmin === true)
		?
			<>
				<Row className="my-5 text-center">
					<h1>Admin Dashboard</h1>
					<Col>
						<Button variant="success" className="ms-1" onClick={() => navigate('/addMovie')}>Add Movie</Button>
					</Col>
				</Row>
				<Row>
					<Col className="col-12">
						<Table striped bordered hover variant="dark">
					      <thead>
					        <tr>
					          <th>Name</th>
					          <th>Description</th>
					          <th>Director</th>
					          <th>Year</th>
					          <th>Genre</th>
					          <th>Actions</th>
					        </tr>
					      </thead>
					      <tbody>
					      	{
					      		(movies.length > 0)
					      		?
					      			movies.map((movie, index) => {
					      				return(
				      						<tr key={movie._id || index}>
						      					<td>{movie.title}</td>
										        <td>{movie.description}</td>
										        <td>{movie.director}</td>
										        <td>{movie.year}</td>
										        <td>{movie.genre}</td>
										        <td className="text-center">
										        	<UpdateMovie movie = {movie} fetchData = {fetchData}/>
            										<button className="btn btn-danger btn-sm" onClick={() => deleteMovie(movie._id)}>Delete</button>
										        </td>
									        </tr>
					      				)
					      			})
					      		:
					      			null
					      	}
					      </tbody>
					    </Table>
				    </Col>
			    </Row>
		    </>
		:
			<Navigate to="/login" />
	)
}