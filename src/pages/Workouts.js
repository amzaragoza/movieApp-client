import { useEffect, useState, useContext } from 'react';
import WorkoutCard from '../components/WorkoutCard';
import UserContext from '../UserContext';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Workouts() {

	const { user } = useContext(UserContext); 
	const [workouts, setWorkouts] = useState([]);


	const fetchData = () => {


		// fetch('http://localhost:4000/workouts/all', {
        fetch('https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts', {
			headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {

            if (data.error === "Error in Find") {
                setWorkouts([]);
		    } else {
                setWorkouts(data.workouts);
		    }

		});
	}

    useEffect(() => {

		fetchData()

    }, [user]);


	return(
		<>
            {
            	(user)
                ?
                    (workouts)
                    ?
                    <>  
                        <h1 className='text-center mt-5'>Workouts</h1>
                        <Row> 
                            {   
                                workouts.map(workout => { 
                                    return (
                                        <Col md={3}>
                                            <WorkoutCard workout={workout} />
                                        </Col>
                                    )
                                })
                            }   
                        </Row>
                    </>
                    :
                    <>
                        <h1>No Workouts</h1>
                    </>
                :
                <>
                    <h1>You are not logged in</h1>
                    <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
                </>

        	}
        </>
	)
}