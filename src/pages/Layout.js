import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        alert("Anda telah logout.");
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand as={Link} to="/">My Notes App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Catatan Saya</Nav.Link>
                
                        </Nav>
                        <Nav>
                            {token ? (
                                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                            ) : (
                                <>
                                    <Button variant="outline-light" as={Link} to="/login" className="me-2">Login</Button>
                                    <Button variant="outline-success" as={Link} to="/register">Register</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children}
        </>
    );
}

export default Layout;