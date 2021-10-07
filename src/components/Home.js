import {Link} from "react-router-dom"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

function Home() {

    return (
        <Container fluid className="bg-info text-light d-flex flex-column justify-content-evenly text-center vh-100 py-5">
            <Container className="bg-light text-dark px-1 py-5 rounded-2 shadow-lg h-100 d-flex flex-column justify-content-evenly">
                <h1 className="display-1"> <i className="bi bi-file-person"></i> Welcome to <b>Auth Demo</b>!</h1>

                <div>
                    <div className="mb-5">
                        <p className="fs-3 mx-5 d-md-inline">Are you a <b>new user</b>?</p>
                        <Link to="/signup">
                            <Button variant="secondary">Sign Up <i className="bi bi-plus-square ms-2"></i> </Button>
                        </Link>
                    </div>

                    <div>
                        <p className="fs-3 mx-5 d-md-inline">Do you <b>have an account</b> already?</p>
                        <Link to="/login">
                            <Button>Login <i className="bi bi-box-arrow-in-right ms-2"></i></Button>
                        </Link>
                    </div>
                </div>

                
            </Container>
        </Container>
    )
}

export default Home