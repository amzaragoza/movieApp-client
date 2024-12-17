import {useState, useContext} from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import UserContext from '../UserContext';

export default function AddMovie(){
    const notyf = new Notyf();
    const navigate = useNavigate();
    const {user} = useContext(UserContext);

    const [title,setTitle] = useState("");
    const [director,setDirector] = useState("");
    const [year,setYear] = useState(0);
    const [description,setDescription] = useState("");
    const [genre,setGenre] = useState("");

    function createMovie(e){

        e.preventDefault();

        let token = localStorage.getItem('token');
        console.log(token);

        fetch('https://movieapp-api-lms1.onrender.com/movies/addMovie',{

            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({

                title,
                director,
                year,
                description,
                genre

            })
        })
        .then(res => res.json())
        .then(data => {

            if (typeof data === undefined) {
                notyf.error("Error: Something Went Wrong.")
            } if (data.message === "Movie already exists") {
                notyf.error("Movie already exists")
            } else {
                notyf.success("Movie Added")
                navigate("/movies");
            }

        })

        setTitle("")
        setDirector("")
        setYear("")
        setDescription("")
        setGenre("")
    }

    return (
        (user.id && user.isAdmin)
        ?
        <>
            <h1 className="my-5 text-center">Add Movie</h1>
            <Form onSubmit={e => createMovie(e)}>
                <Form.Group>
                    <Form.Label>Title:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Movie Title"
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Director:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Movie Director"
                        required
                        value={director}
                        onChange={e => setDirector(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Year:</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Movie Year"
                        required
                        value={year}
                        onChange={e => setYear(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Movie Description"
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Genre:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Movie Genre"
                        required
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="my-5">Add Movie</Button>
                <Button variant="danger" type="button" className="my-5" onClick={() => navigate("/movies")}>Cancel</Button>
            </Form>
        </>
        :
        <Navigate to="/movies" />
    )
}