import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Link, useHistory } from "react-router-dom";

import { useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";

function SignupPage() {
  const auth = getAuth();
  const db = getDatabase();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pswrd, setPswrd] = useState("");
  const [pswrdConfirm, setPswrdConfirm] = useState("");
  const [error, setError] = useState();

  let history = useHistory();

  function userSignup(e) {
    e.preventDefault();

    if (pswrd !== pswrdConfirm) {
      setError("Password and password confirm don't match.");
      return;
    } else {
      const newAcc = createUserWithEmailAndPassword(auth, email, pswrd)
        .then((userCreds) => {

          updateProfile(userCreds.user, {
            displayName: name,
          }).then(() => history.push("/user"))

          set(ref(db, `users/${userCreds.user.uid}`), {
            userID: userCreds.user.uid,
          })

          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });

      return () => newAcc;
    }
  }

  return (
    <Container fluid className="bg-info text-light vh-100">
      <Container className="bg-light text-dark px-1 py-3 rounded-2 shadow-lg h-100 my-auto d-flex flex-column justify-content-between position-relative">
        <Link to="/" className="position-absolute top-0 end-0 m-2">
          <Button variant="outline-dark" className="rounded-pill">
            <i className="bi bi-arrow-left-circle"></i> Back
          </Button>
        </Link>

        <h1 className="display-4 ms-3">
          <i className="bi bi-plus-square"></i> <b>Signup</b>
        </h1>

        {error && (
          <Alert variant="danger">
            <h3>Error</h3> <p>{error}</p>
          </Alert>
        )}

        <Form className="px-md-5 px-3" onSubmit={userSignup}>
          <Form.Group className="mb-2">
            <Form.Label className="fs-4">
              <i className="bi bi-at"></i>
              <b> Email address</b>{" "}
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="tony@stark.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fs-4">
              <b> Name </b>{" "}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Tony Stark"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fs-4">
              <i className="bi bi-key"></i>
              <b> Password</b>{" "}
            </Form.Label>
            <Form.Control
              min="6"
              type="password"
              placeholder="min 6 charachters"
              value={pswrd}
              onChange={(e) => setPswrd(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label className="fs-4">
              <i className="bi bi-key"></i>
              <b> Confirm Password</b>{" "}
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="min 6 charachters"
              value={pswrdConfirm}
              onChange={(e) => setPswrdConfirm(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" className="w-100">
            Sign up
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

export default SignupPage;
