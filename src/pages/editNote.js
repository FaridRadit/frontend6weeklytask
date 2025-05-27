import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout.js"; 

function EditNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getNoteById(); 
    }, [id]); 

    const getNoteById = async () => {
        setError("");
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Anda harus login untuk mengedit catatan.");
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`https://backend-service-130852023885.us-central1.run.app/api/notes/${id}`, { // Perbaiki endpoint
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (err) {
            console.error("Error fetching note for edit:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Gagal mengambil catatan untuk diedit.");
            if (err.response && (err.response.status === 401 || err.response.status === 403 || err.response.status === 404)) {
                localStorage.removeItem('jwtToken');
                navigate('/login'); 
            }
        }
    };

    const handleUpdateNote = async (e) => { // Ubah Editnote menjadi handleUpdateNote
        e.preventDefault();
        setError("");
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Anda harus login untuk memperbarui catatan.");
            return;
        }

        try {
            await axios.patch(`https://backend-service-130852023885.us-central1.run.app/api/notes/${id}`, { // Perbaiki endpoint
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("Catatan berhasil diperbarui!");
            navigate('/');
        } catch (err) {
            console.error("Error updating note:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Gagal memperbarui catatan.");
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                localStorage.removeItem('jwtToken');
                navigate('/login');
            }
        }
    };

    return (
        <Layout> {/* Bungkus dengan Layout */}
            <Container className="mt-5">
                <Row>
                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Form className="col-6" onSubmit={handleUpdateNote}> {/* Gunakan handleUpdateNote */}
                            <h2 className="text-center mb-4">Edit Catatan</h2>
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form.Group className="mb-4 mt-5" controlId="title">
                                <Form.Label>Judul</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 mt-2" controlId="content">
                                <Form.Label>Konten</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Note Content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-2">
                                Update Catatan
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default EditNote;