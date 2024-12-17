import { Row, Col, Card, Button } from 'react-bootstrap';
import { useEffect, useState, useContext } from 'react';
import MovieDetails from '../components/MovieDetails';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';

export default function MovieCard({movie}) {

    const { user } = useContext(UserContext); 
    const [movies, setMovies] = useState([]);

    const fetchData = () => {
        fetch('https://movieapp-api-lms1.onrender.com/movies/getMovies', {
            headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token') }`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error === "Error in Find") {
                setMovies([]);
            } else {
                setMovies(data.movies);
            }
        });
    }

    useEffect(() => {
        fetchData()
    }, [user]);

	return (
        <>
            <h1 className="my-5 text-center">Explore Movies and TV Shows</h1>
            <Row className="d-flex justify-content-center mx-auto my-5">
                {
                    (movies.length > 0)
                    ?
                        movies.map((movie) => {
                            return(
                                <Col key={movie._id} className="col-4 justify-content-center mt-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title className="mb-4 text-center">{movie.title}</Card.Title>
                                            <Button as={Link} variant="primary" className="col-12" to={`/movies/getMovie/${movie._id}`}>Details</Button>
                                            {/*<MovieCard movie={movie} />
                                            <Link className="btn btn-primary" to={"/login"}>Login to View</Link>*/}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    :
                        <h1 className="text-center">No Movies or TV Shows found &#128542;</h1>
                }
            </Row>
        </>
	)
}