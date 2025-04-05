import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNote() {
    const [name, setNama] = useState(""); // Perbaikan: setName → setNama
    const [catatan, setCatatan] = useState("");
    const navigate = useNavigate(); // Pindahkan ke atas sebelum digunakan

    const addNote = async (e) => {
        e.preventDefault(); // Cegah refresh halaman
        try {
            await axios.post('http://localhost:5000/createNote', { // Perbaiki endpoint
                name, // Perbaikan: Properti backend harus cocok dengan database
                catatan
            });
            navigate('/'); // Redirect ke halaman utama
        } catch (error) {
            console.error("Error adding note:", error.message);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    
                    <Form className="col-6" onSubmit={addNote}>
                        <Form.Group className="mb-4 mt-5" controlId="name">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => setNama(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 mt-2" controlId="catatan">
                            <Form.Label>Catatan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Note"
                                value={catatan}
                                onChange={(e) => setCatatan(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-2">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddNote;
