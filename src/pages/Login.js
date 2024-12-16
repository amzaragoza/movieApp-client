import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom'; 
// import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import UserContext from '../UserContext';

export default function Login() {
	const { user, setUser } = useContext(UserContext);
	const notyf = new Notyf();

	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);


    function authenticate(e) {

        e.preventDefault();
		// fetch('http://localhost:4000/users/login',{
		fetch('https://fitnessapp-api-ln8u.onrender.com/users/login',{
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
		console.log(data);
			if(data.access){
				localStorage.setItem('token', data.access);
				retrieveUserDetails(data.access);

				// Swal.fire({
	        	//     title: "Login Successful",
	        	//     icon: "success",
	        	//     text: "Welcome to Zuitt!"
	        	// });
				notyf.success('Successful Login');
			} else if (data.message === "Email and password do not match") {

				// Swal.fire({
	            //     title: "Authentication failed",
	            //     icon: "error",
	            //     text: "Check your login details and try again."
	            // });
	            notyf.error(`Incorrect credentials. Try again!`);
			} else {
                notyf.error(`${email} does not exist`);
            }
		})

		setEmail('');
		setPassword('');


    }


    const retrieveUserDetails = (token) => {

        // fetch('http://localhost:4000/users/details', {
        fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {

            setUser({
              id: data.user._id
            });
        })

    };

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (
    	(user.id !== null) ?

			<Navigate to="/workouts" />

			:
	    	
	        <Form onSubmit={(e) => authenticate(e)}>
	        	<h1 className="my-5 text-center">Login</h1>
	            <Form.Group controlId="userEmail">
	                <Form.Label>Email: </Form.Label>
	                <Form.Control 
	                    className="mb-2"
	                    type="email"
	                    placeholder="Enter Email"
	                    value={email}
            			onChange={(e) => setEmail(e.target.value)}
	                    required
	                />
	            </Form.Group>

	            <Form.Group controlId="password">
	                <Form.Label>Password: </Form.Label>
	                <Form.Control 
	                    className="mb-2"
	                    type="password" 
	                    placeholder="Enter Password"
	                    value={password}
            			onChange={(e) => setPassword(e.target.value)}
	                    required
	                />
	            </Form.Group>

	             { isActive ? 
	                <Button variant="primary" type="submit" id="loginBtn" className="mt-2">
	                    Submit
	                </Button>
	                : 
	                <Button variant="danger" type="submit" id="loginBtn" className="mt-2" disabled>
	                    Submit
	                </Button>
	            }
	        </Form>
    )
}