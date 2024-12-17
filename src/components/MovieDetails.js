import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Notyf } from 'notyf';

import MovieCard from './MovieCard';
import UserContext from '../UserContext';

export default function MovieDetails() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [title,setTitle] = useState("");
    const [director,setDirector] = useState("");
    const [year,setYear] = useState(0);
    const [description,setDescription] = useState("");
    const [genre,setGenre] = useState("");
    const [comments,setComments] = useState([]);

    useEffect(() => {
        fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${id}`)
        .then(response => response.json())
        .then(data => {
            if(data.error === "Movie not found" || data.length === 0) {
                navigate('/movies')
            } else {
                setTitle(data.title);
                setDirector(data.director);
                setYear(data.year);
                setDescription(data.description);
                setGenre(data.genre);
                setComments(data.comments);
            }
        })
    }, [id, navigate])

    return(
        <Container>
        	<Row className="d-flex justify-content-center mt-5">
        	    <Col className="my-5 text-center">
        	        <Card.Body>
                        <Card.Title className="mb-4">{title}</Card.Title>
                        <Card.Subtitle>Director:</Card.Subtitle>
                        <Card.Text>{director}</Card.Text>
                        <Card.Subtitle>Year:</Card.Subtitle>
                        <Card.Text>{year}</Card.Text>
                        <Card.Subtitle>Description:</Card.Subtitle>
                        <Card.Text>{description}</Card.Text>
                        <Card.Subtitle>Genre:</Card.Subtitle>
                        <Card.Text>{genre}</Card.Text>
                        {
                            user.id ? (
                                <>
                                    <Card.Subtitle>Comments:</Card.Subtitle>
                                    {
                                        Array.isArray(comments) && comments.length > 0 ? (
                                            comments.map((comment) => (
                                                <Card.Text key={comment._id}>
                                                    <strong>User:</strong> {comment.userId} <br />
                                                    <strong>Comment:</strong> {comment.comment}
                                                </Card.Text>
                                            ))
                                        ) : (
                                            <Card.Text>No comments available.</Card.Text>
                                        )
                                    }
                                </>
                            )
                            :
                            null
                        }    
                    </Card.Body>
        	    </Col>
        	</Row>
        	<div className="text-center">
        		<Link className="btn btn-primary" to={"/movies"}>Explore Movies and TV Shows</Link>
        	</div>
        </Container>
    )
}