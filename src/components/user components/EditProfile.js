import Button from "react-bootstrap/Button"
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'

import { getAuth, signInWithEmailAndPassword, deleteUser, updateProfile, sendEmailVerification } from "firebase/auth";

import {useHistory} from "react-router-dom"
import { useState } from "react";


function EditProfile({user}) {

    const history = useHistory()

    const [error, setError] = useState()
    const [name, setName] = useState('')
    const [pswrd, setPswrd] = useState('')


    function deletAccount(e) {
        e.preventDefault()
        signInWithEmailAndPassword(getAuth(), user.email, pswrd)
        .then(user=>{
            deleteUser(getAuth().currentUser)
            .then(() => {
                console.log("Deleted");
                history.push("/")
            }).catch(err=>{setError(err)})
        }).catch(err=>{setError(err); setPswrd('')})
    }

    function updateAccount(e) {
        e.preventDefault()
        updateProfile(user, {
            displayName : name
        }).then(()=>{
            setName('')
        })
    }

    function sendVerfication() {
        sendEmailVerification(user).then(()=>{
            console.log('email sent');
        })
    }

    return (
        <div>
            {error && <Alert variant="danger"><h3>Error</h3> <p>{error.message}</p></Alert>}

            {user.emailVerified?
                <Alert variant="success">
                    Email <b>({user.email})</b> is verified.
                </Alert>
                :
                <Alert variant="warning">
                    <Alert.Heading>
                        Email Verfication
                    </Alert.Heading>
                    <p>Please verify your email <b>({user.email})</b> to continue using our services.</p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={sendVerfication}>
                            Send Verfication Email
                        </Button>
                    </div>
                </Alert>
            }

            <Form onSubmit={updateAccount} className="mb-5">
                <Form.Group className="mb-3" >
                    <Form.Label className="fs-4"><b>Your Name</b> </Form.Label>
                    <Form.Control type="text" placeholder={'Current: '+ user.displayName} size="lg" value={name} onChange={(e)=>setName(e.target.value)} required/>
                </Form.Group>

                <Button type="submit">Update</Button>
            </Form>


            <Form onSubmit={deletAccount}>
                <Form.Group className="mb-3" >
                    <Form.Label className="fs-4"><b>Confirm Password to Delete Account</b> </Form.Label>
                    <Form.Control type="password" onChange={(e)=>setPswrd(e.target.value)} value={pswrd} required/>
                </Form.Group>

                <Button variant="danger" type="submit">Delete Account</Button>
            </Form>

        </div>
    )
}

export default EditProfile
