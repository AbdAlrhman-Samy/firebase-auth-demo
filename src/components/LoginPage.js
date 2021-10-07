import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Alert from 'react-bootstrap/Alert'

import {Link, useHistory} from "react-router-dom"

import { useState } from "react"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {

    const auth = getAuth();

    const [email, setEmail] = useState('')
    const [pswrd, setPswrd] = useState('')
    const [error, setError] = useState()

    let history = useHistory();

    function userLogin(e) {
        e.preventDefault();

        const login = signInWithEmailAndPassword(auth, email, pswrd)
        .then(user=>{
            setError(null)
            history.push("/user")
        })
        .catch(err=>{
            setError(err)
        })

        return login
    }

    return (
        <Container fluid className="bg-info text-light vh-100 py-5">
            <Container className="bg-light text-dark px-1 py-5 rounded-2 shadow-lg h-100 d-flex flex-column justify-content-between position-relative">
                
                <Link to="/" className="position-absolute top-0 end-0 m-2">
                    <Button variant="outline-dark" className="rounded-pill"><i className="bi bi-arrow-left-circle"></i> Back</Button>
                </Link>

                <h1 className="display-2 ms-3"> <i className="bi bi-box-arrow-in-right"></i> <b>Login</b></h1>

                {error && <Alert variant="danger"><h3>Error</h3> <p>{error.message}</p></Alert>}

                <Form className="px-md-5 px-3" onSubmit={userLogin}>
                    <Form.Group className="mb-5 ">
                        <Form.Label className="fs-4"> <i className="bi bi-at"></i> <b>Email address</b> </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" size="lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-5">
                        <Form.Label className="fs-4"> <i className="bi bi-key"></i> <b>Password</b> </Form.Label>
                        <Form.Control type="password" placeholder="Password" size="lg" value={pswrd} onChange={(e)=>setPswrd(e.target.value)}/>
                    </Form.Group>

                    <Button size="lg" type="submit" className="w-100">Login</Button>
                </Form>
                
            </Container>
        </Container>
    )
}

export default LoginPage