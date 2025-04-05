import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditNote() {
    const [name, setNama] = useState(""); 
    const [catatan, setCatatan] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

   
    const Editnote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/updateNote/${id}`, { 
                name,
                catatan
            });
            navigate('/');
        } catch (error) {
            console.error("Error updating note:", error.message);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Form className="col-6" onSubmit={Editnote}>
                        <Form.Group className="mb-4 mt-5" controlId="nama">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={name} //
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
                            Update Note
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditNote;
