import { useContext } from "react"
import { AuthContext } from "../AuthContext"

import {useHistory} from "react-router-dom"

import Button from "react-bootstrap/Button"

import { getAuth, signOut, deleteUser } from "firebase/auth";


function UserPage() {

    const user = useContext(AuthContext)
    let history = useHistory();

    const loggedinUser = getAuth().currentUser;

    function signoutUser() {
        signOut(getAuth()).then(() => {
            history.push("/")
        })

    }

    function deletAccount() {
        deleteUser(loggedinUser)
        .then(() => {
            history.push("/")
        })

    }

    return (
        <div className="text-center m-5">
            <Button variant="outline-danger" onClick={signoutUser}>Sign out</Button>
            <h1>{user.email}</h1>
            <Button variant="danger" onClick={deletAccount}>Delete Account</Button>
        </div>
    )
}

export default UserPage
