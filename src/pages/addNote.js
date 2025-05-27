import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout.js"; 

function AddNote() {
    const [title, setTitle] = useState(""); 
    const [content, setContent] = useState(""); 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addNote = async (e) => {
        e.preventDefault();
        setError("");
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError("Anda harus login untuk menambah catatan.");
            navigate('/login'); // Redirect ke login jika tidak ada token
            return;
        }

        try {
            await axios.post('https://backend-service-130852023885.us-central1.run.app/api/notes', { // Perbaiki endpoint
                title, 
                content 
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Tambahkan JWT token
                }
            });
            alert("Catatan berhasil ditambahkan!");
            navigate('/'); // Redirect ke halaman utama
        } catch (err) {
            console.error("Error adding note:", err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || "Gagal menambahkan catatan.");
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
                    <Col style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Form className="col-6" onSubmit={addNote}>
                            <h2 className="text-center mb-4">Tambah Catatan Baru</h2>
                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form.Group className="mb-4 mt-5" controlId="title">
                                <Form.Label>Judul</Form.Label> {/* Ubah Nama menjadi Judul */}
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan Judul Catatan"
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
                                    placeholder="Tulis catatan Anda di sini"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-2">
                                Simpan Catatan
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AddNote;