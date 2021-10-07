import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
function Error() {
    return (
        <Container fluid className="bg-danger text-light d-flex flex-column justify-content-evenly text-center vh-100">
            <div>
                <h1 className="display-1 fw-bold">404</h1>
                <p className="display-2">Nothing's Here, Buddy.</p>
            </div>
            

            <Link to="/">
                <Button variant="dark" size="lg">Go Home</Button>
            </Link>
        </Container>
    )
}

export default Error
