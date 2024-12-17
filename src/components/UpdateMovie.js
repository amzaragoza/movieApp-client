import {Button, Form, Modal} from 'react-bootstrap';
import { useState } from 'react';

import {Notyf} from 'notyf';

export default function UpdateMovie({movie, fetchData}){
    const notyf = new Notyf();

    const [showAddModal, setShowAddModal] = useState(false);

    const handleAddModalClose = () => setShowAddModal(false);
    const handleAddModalShow = () => setShowAddModal(true);

    const [movieId, setMovieId] = useState(movie._id);

    const [title,setTitle] = useState(movie.title);
	const [director,setDirector] = useState(movie.director);
	const [year,setYear] = useState(movie.year);
	const [description,setDescription] = useState(movie.description);
	const [genre,setGenre] = useState(movie.genre);
	const [comments,setComments] = useState(movie.comments);

    const updateMovie = (event, movieId) => {

        event.preventDefault();
        fetch(`https://movieapp-api-lms1.onrender.com/movies/updateMovie/${movieId}`,{
	        method: 'PATCH',
	        headers: {
	            "Content-Type": "application/json",
	            'Authorization': `Bearer ${localStorage.getItem("token")}`
        	},
			body: JSON.stringify({
				title,
				director,
				year,
				description,
				genre,
				comments
			})
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if (data.error === "Movie not found") {
                notyf.error(`${data.title} does not exist`);
                fetchData();
                handleAddModalClose();
            } else {
                notyf.success(`Movie updated successfully`);
                fetchData();
                handleAddModalClose();
            }
        })
    }


    
    return (
        <>
            <Button variant = "primary" className="me-1" size = "sm" onClick={handleAddModalShow} >Update</Button>

            {/*Update Modal*/}

            <Modal show={showAddModal} onHide={handleAddModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                       	<Form.Group className="mb-3" controlId="movieTitle">
                        	<Form.Label>Title</Form.Label>
                        	<Form.Control
	                        	type="text"
	                        	value = {title}
	                        	onChange = {event => setTitle(event.target.value)}
	                        	required/>
                       	</Form.Group>

                       	<Form.Group className="mb-3" controlId="movieDirector">
                        	<Form.Label>Director</Form.Label>
                        	<Form.Control  
	                            type = "text"
	                            value = {director}
	                            onChange = {event => setDirector(event.target.value)} 
	                            required/>
                       	</Form.Group>

                       	<Form.Group className="mb-3" controlId="movieYear">
                        	<Form.Label>Year</Form.Label>
                        	<Form.Control  
	                            type = "number"
	                            value = {year} 
	                            onChange = {event => setYear(event.target.value)}
	                            required/>
                       	</Form.Group>

                       	<Form.Group className="mb-3" controlId="movieDescription">
                        	<Form.Label>Description</Form.Label>
                        	<Form.Control  
	                            type = "text"
	                            value = {description} 
	                            onChange = {event => setDescription(event.target.value)}
	                            required/>
                       	</Form.Group>

                       	<Form.Group className="mb-3" controlId="movieGenre">
                        	<Form.Label>Genre</Form.Label>
                        	<Form.Control  
	                            type = "text"
	                            value = {genre} 
	                            onChange = {event => setGenre(event.target.value)}
	                            required/>
                       	</Form.Group>

                       	<Form.Group className="mb-3" controlId="movieGenre">
                        	<Form.Label>Comments</Form.Label>
                        	<Form.Control  
	                            type = "text"
	                            value = {comments} 
	                            onChange = {event => setComments(event.target.value)}/>
                       	</Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAddModalClose}>Close</Button>
                    <Button variant="success" onClick= {event => updateMovie(event, movieId)}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}