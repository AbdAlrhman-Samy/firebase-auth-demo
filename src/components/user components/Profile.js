import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import { FormControl } from "react-bootstrap"

import { getDatabase, ref, set, push } from "firebase/database";

import { useState } from "react"

function Profile({user, data}) {
    const db = getDatabase();

    const [item, setItem] = useState('')

    function addItem(e) {
        e.preventDefault()

        const itemsListRef = ref(db, `users/${user.uid}/items`);
        const newItem = push(itemsListRef);
        set(newItem, {
            item: item
        }).then(()=>{
            setItem('')
        })


    }

    return (
        <Container className="text-center bg-dark text-white py-5 px-4 rounded">
            <h1>Hello {user.displayName? user.displayName.split(' ')[0] : ''}</h1>
            <hr />
            <Form onSubmit={addItem} className="mb-5">
                <InputGroup className="mb-2 w-md-75 mx-auto">
                    <FormControl placeholder="Add Item" type="text" value={item} onChange={(e)=>setItem(e.target.value)} required />
                    <Button variant="outline-success" size="lg" type="submit"><i className="bi bi-plus-lg"></i></Button>
                </InputGroup>
            </Form>

            <ListGroup>
                {
                    data.map(item=>{
                        return <ListGroup.Item key={item.item}>{item.item}</ListGroup.Item>
                    })
                }
            </ListGroup>

        </Container>
    )
}

export default Profile
