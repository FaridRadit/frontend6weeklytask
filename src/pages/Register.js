import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success
        try {
            const response = await axios.post('https://backend-service-130852023885.us-central1.run.app/api/auth/register', {
                name,
                email,
                password
            });
            setSuccess(response.data.message);
            alert("Registrasi berhasil! Silakan login.");
            navigate('/login'); // Redirect ke halaman login setelah registrasi
        } catch (err) {
            console.error("Registration error:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

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
                            Register
                        </Button>
                        <p className="text-center mt-3">
                            Sudah punya akun? <Link to="/login">Login di sini</Link>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;