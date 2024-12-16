import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import UserContext from '../UserContext';

export default function Register() {

	const {user} = useContext(UserContext);
	const notyf = new Notyf();

	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
    const [isActive, setIsActive] = useState(false);

	function registerUser(e) {

		// Prevents page redirection via form submission
		e.preventDefault();

		// fetch('http://localhost:4000/users/register',{
		fetch('https://fitnessapp-api-ln8u.onrender.com/users/register',{

            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
		})
		.then(res => res.json())
		.then(data => {
console.log(data);
			if(data.message === "Registered Successfully"){

				setEmail('');
				setPassword('');
				setConfirmPassword('');

				// Swal.fire({
	        	//     title: "Registration Successful",
	        	//     icon: "success",
	        	//     text: "Thank you for registering!"
	        	// });
				notyf.success("Registration successful!");
			// }else if(data.error === "Email invalid"){
				// notyf.error('Email is invalid');
			}else if(data.error === "Password must be atleast 8 characters"){
				notyf.error("Password must be at least 8 characters");
			}else {
				// Swal.fire({
		    	//     title: "Something went wrong.",
		    	//     icon: "error",
		    	//     text: "Please try again later or contact us for assistance"
		    	// });
				notyf.error("Something went wrong!");
			}
		})
	}
    


	useEffect(()=>{
		if((email !== "" && password !=="" && confirmPassword !=="") && (password === confirmPassword)){
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	},[email,password,confirmPassword])

	return (
		(user.id !== null) ?
		    <Navigate to="/workouts" />
		:			
			<Form onSubmit={(e) => registerUser(e)}>
			<h1 className="my-5 text-center">Register</h1>

				<Form.Group>
					<Form.Label>Email:</Form.Label>
					<Form.Control 
					className="mb-2"
					type="email"
					placeholder="Enter Email" 
					required 
					value={email} 
					onChange={e => setEmail(e.target.value)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password:</Form.Label>
					<Form.Control 
					className="mb-2"
					type="password" 
					placeholder="Enter Password" 
					required 
					value={password} 
					onChange={e => setPassword(e.target.value)}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirm Password:</Form.Label>
					<Form.Control 
					className="mb-2"
					type="password" 
					placeholder="Confirm Password" 
					required 
					value={confirmPassword} 
					onChange={e => setConfirmPassword(e.target.value)}/>
				</Form.Group>
				{
					isActive

					? <Button variant="primary" type="submit" className="mt-2">Submit</Button>
					: <Button variant="primary" type="submit" className="mt-2" disabled>Submit</Button>
				}
			</Form>
	)
}