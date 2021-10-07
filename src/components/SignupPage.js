import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import Alert from 'react-bootstrap/Alert'

import {Link, useHistory} from "react-router-dom"

import { useContext, useState } from "react"
import { AuthContext } from "../AuthContext"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignupPage() {

    const user = useContext(AuthContext)

    const auth = getAuth();

    const [email, setEmail] = useState('')
    const [pswrd, setPswrd] = useState('')
    const [pswrdConfirm, setPswrdConfirm] = useState('')
    const [error, setError] = useState()

    let history = useHistory();

    function userSignup(e) {
        e.preventDefault();

        if (pswrd !== pswrdConfirm){
            setError("Password and password confirm don't match.")
            return
        } else {
            const newAcc = createUserWithEmailAndPassword(auth, email, pswrd)
            .then(user=>{
                
                setError(null)
                history.push("/user")
            })
            .catch(err=>{
                setError(err.message)
            })
            return newAcc
        }

    }

    return (
        <Container fluid className="bg-info text-light vh-100 py-5">
            <Container className="bg-light text-dark px-1 py-3 rounded-2 shadow-lg h-100 my-auto d-flex flex-column justify-content-between position-relative">
                
                <Link to="/" className="position-absolute top-0 end-0 m-2">
                    <Button variant="outline-dark" className="rounded-pill"><i className="bi bi-arrow-left-circle"></i> Back</Button>
                </Link>

                <h1 className="display-4 ms-3"> <i className="bi bi-plus-square"></i> <b>Signup</b></h1>    
                
                {error && <Alert variant="danger"><h3>Error</h3> <p>{error}</p></Alert>}            

                <Form className="px-md-5 px-3" onSubmit={userSignup}>
                        
                    <Form.Group className="mb-2">
                        <Form.Label className="fs-4"> <i className="bi bi-at"></i><b> Email address</b> </Form.Label>
                        <Form.Control type="email" placeholder="tony@stark.com" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-2">
                        <Form.Label className="fs-4"> <i className="bi bi-key"></i><b> Password</b> </Form.Label>
                        <Form.Control min="6" type="password" placeholder="min 6 charachters" value={pswrd} onChange={(e)=>setPswrd(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-2">
                        <Form.Label className="fs-4"> <i className="bi bi-key"></i><b> Confirm Password</b> </Form.Label>
                        <Form.Control type="password" placeholder="min 6 charachters" value={pswrdConfirm} onChange={(e)=>setPswrdConfirm(e.target.value)}/>
                    </Form.Group>

                    <Button type="submit" className="w-100">Sign up</Button>
                </Form>
                
            </Container>
        </Container>
    )
}

export default SignupPage
