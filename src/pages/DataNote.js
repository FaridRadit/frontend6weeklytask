import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Noteuser() {
  const [note, setNote] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    try {
      const response = await axios.get("https://backend-service-130852023885.us-central1.run.app/getNote");
      setNote(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`https://backend-service-130852023885.us-central1.run.app/delete-Note/${id}`);
      getNote();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4 justify-content-between align-items-center">
        <Col>
          <h2 className="fw-bold text-primary">📓 Daftar Catatan</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => navigate("/addNote")}>
            ➕ Tambah Catatan
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive className="shadow-sm rounded">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Catatan</th>
            <th colSpan={2} className="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {note.length > 0 ? (
            note.map((no, index) => (
              <tr key={no.id}>
                <td>{index + 1}</td>
                <td>{no.name}</td>
                <td>{no.catatan}</td>
                <td className="text-center">
                  <Link className="btn btn-outline-primary btn-sm" to={`/editNote/${no.id}`}>
                    ✏️ Edit
                  </Link>
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => deleteNote(no.id)}
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
  );
}

export default Noteuser;
