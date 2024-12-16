import {useState,useEffect, useContext} from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import UserContext from '../UserContext';

export default function AddWorkout(){
	const notyf = new Notyf();
	const navigate = useNavigate();
    const {user} = useContext(UserContext);

	const [name,setName] = useState("");
	const [duration,setDuration] = useState("");

	function createGame(e){

		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		// fetch('http://localhost:4000/workouts/',{
		fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout',{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({

				name: name,
				duration: duration

			})
		})
		.then(res => res.json())
		.then(data => {

            if (data.error === "Failed to save the task") {

				// Swal.fire({

				// 	icon: "error",
				// 	title: "Unsuccessful Game Creation",
				// 	text: data.message

				// })
				notyf.error("Error: Something Went Wrong.")

			} else {

				// Swal.fire({

				// 	icon:"success",
				// 	title: "Game Added"

				// })
				notyf.success("Course Added")
				navigate("/workouts");
			}

		})

        setName("")
        setDuration("")
	}

	return (
        (user.id)
        ?
        <>
            <h1 className="my-5 text-center">Add Workout</h1>
            <Form onSubmit={e => createGame(e)}>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Workout Name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Duration:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Workout Duration"
                        required
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="my-5">Add Workout</Button>
                <Button variant="danger" type="button" className="my-5" to={"/"}>Cancel</Button>
            </Form>
	    </>
        :
        <Navigate to="/workouts" />
	)
}