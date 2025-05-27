import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); 
        try {
            const response = await axios.post('https://backend-service-130852023885.us-central1.run.app/api/auth/login', {
                email,
                password
            });
            localStorage.setItem('jwtToken', response.data.token); 
            alert("Login berhasil!");
            navigate('/'); 
        } catch (err) {
            console.error("Login error:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Login
                        </Button>
                        <p className="text-center mt-3">
                            Belum punya akun? <Link to="/register">Daftar di sini</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;