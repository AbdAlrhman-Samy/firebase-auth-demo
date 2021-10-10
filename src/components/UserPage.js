import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthContext"

import {useHistory} from "react-router-dom"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"

import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";


import Profile from "./user components/Profile"
import EditProfile from "./user components/EditProfile"

function UserPage() {

    const [profile, setProfile] = useState(true)
    const [userData, setUserData] = useState([])

    const user = useContext(AuthContext)

    let history = useHistory();

    const db = getDatabase();
    const userRef = ref(db, `users/${user.uid}/items`);  

    useEffect(() => {
            onValue(userRef, (snapshot) => {
                const all = []
                snapshot.forEach(item=>{
                    all.push(item.val())
                })
                setUserData(all)
              })
    }, [])

    function signoutUser() {
        signOut(getAuth()).then(() => {
            history.push("/")
        })

    }

    return (
        <Container className="px-2">

            <Container className="bg-dark text-white my-3 p-3 d-flex flex-row rounded justify-content-between align-items-center">

                <Button onClick={()=>setProfile(!profile)}>
                    {profile? "Edit Profile" : "Show Profile"}
                </Button>

                <Button variant="outline-danger" onClick={signoutUser}><i className="bi bi-box-arrow-in-left"></i> Sign out</Button>

                
            </Container>

            {
                profile?
                <Profile user={user} data={userData}/>
                :
                <EditProfile user={user}/>
            }

        </Container>
    )
}

export default UserPage
