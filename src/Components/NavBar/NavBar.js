import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { Container, Nav, Navbar } from "react-bootstrap";

function NavBar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          todo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/">
              todos
            </Nav.Link>
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  SignUp
                </Nav.Link>
              </>
            ) : (
              <button onClick={logOut} className="btn btn-light text-dark">
                Sign Out
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
