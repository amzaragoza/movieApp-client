import { Card, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2'
import { Notyf } from 'notyf';

export default function WorkoutCard({workout}) {

	const notyf = new Notyf();
	const { _id, name, duration, status} = workout;
    const navigate = useNavigate();

    function updateWorkoutStatus(id) {

            // fetch(`http://localhost:4000/workouts/${id}`,{
            fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${id}`,{

            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // if (data.error === "Error in Saving") {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Unsuccessful Workout Update",
            //         text: data.message
            //     })
            // } else {
            //     Swal.fire({
            //         icon:"success",
            //         title: "Workout Updated"
            //     })
            //     // window.location.reload() 
            // }
            // window.location.reload()
            if(data.message === "Workout status updated successfully") {
            	notyf.success("Workout status updated successfully")
            }else{
            	notyf.error("Workout not found")
            }
        })
    }

    function deleteWorkout(id) {

            // fetch(`http://localhost:4000/workouts/${id}`,{
            fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/deleteWorkout/${id}`,{

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // if (data.error === "Error in Saving") {
            //     Swal.fire({
            //         icon: "error",
            //         title: "Unsuccessful Workout Deletion",
            //         text: data.message
            //     })
            // } else {
            //     Swal.fire({
            //         icon:"success",
            //         title: "Workout deleted successfully"
            //     })
            //     window.location.reload() 
            // }
            if(data.message === "Workout deleted successfully") {
            	notyf.success("Workout deleted successfully")
            }else{
            	notyf.error("Workout not found")
            }
        })
    }

	return (
		<Card className="mt-3">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Duration:</Card.Subtitle>
                <Card.Text>{duration}</Card.Text>
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text>{status}</Card.Text>		        
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm" onClick={() => updateWorkoutStatus(_id)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteWorkout(_id)}>Delete</button>
            </Card.Footer>
        </Card>
		)
}
