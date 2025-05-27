import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout.js"; 

function Noteuser() {
  const [notes, setNotes] = useState([]); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNotes(); 
  }, []);

  const getNotes = async () => { 
    setError("");
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError("Anda harus login untuk melihat catatan.");
      
      return;
    }

    try {
      const response = await axios.get("https://backend-service-130852023885.us-central1.run.app/api/notes", { 
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setNotes(response.data); 
    } catch (error) {
      console.error("Error fetching notes:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Gagal mengambil catatan. Pastikan Anda sudah login.");
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('jwtToken'); 
        navigate('/login'); 
      }
    }
  };

  const deleteNote = async (id) => {
    setError("");
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError("Anda harus login untuk menghapus catatan.");
      return;
    }

    try {
      await axios.delete(`https://backend-service-130852023885.us-central1.run.app/api/notes/${id}`, { // Perbaiki endpoint
        headers: {
          Authorization: `Bearer ${token}` // Tambahkan JWT token
        }
      });
      getNotes(); 
    } catch (error) {
      console.error("Error deleting note:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Gagal menghapus catatan.");
    }
  };

  return (
    <Layout>
      <Container className="mt-5">
        <Row className="mb-4 justify-content-between align-items-center">
          <Col>
            <h2 className="fw-bold text-primary">📓 Catatan Saya</h2>
          </Col>
          <Col className="text-end">
            <Button variant="success" onClick={() => navigate("/addNote")}>
              ➕ Tambah Catatan
            </Button>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        <Table striped bordered hover responsive className="shadow-sm rounded">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Konten</th>
              <th colSpan={2} className="text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {notes.length > 0 ? ( 
              notes.map((noteItem, index) => ( 
                <tr key={noteItem.id}>
                  <td>{index + 1}</td>
                  <td>{noteItem.title}</td> 
                  <td>{noteItem.content}</td> 
                  <td className="text-center">
                    <Link className="btn btn-outline-primary btn-sm" to={`/editNote/${noteItem.id}`}>
                      ✏️ Edit
                    </Link>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteNote(noteItem.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  Tidak ada catatan tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}

export default Noteuser;