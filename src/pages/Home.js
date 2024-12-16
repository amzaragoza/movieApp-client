import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
        <Row>
            <Col className="mt-5 pt-5 text-center mx-auto">
                <h1>Welcome to Zuitt Workouts</h1>
                <p>Your Workout Tracker!</p>
                <Link className="btn btn-primary" to={"/login"}>Login to get Started</Link>
            </Col>
        </Row>
    )
}