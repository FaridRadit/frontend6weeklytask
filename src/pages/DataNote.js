import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Noteuser() {
  const [note, setNote] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getNote");
      setNote(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-Note/${id}`); 
      getNote(); // 
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Container className="col-8 mt-5">
      <Row>
        <Col>
        <Button variant="success" className="mb-3" onClick={() => navigate("/addNote")}>
                        Add Note
                    </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Catatan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {note.map((no, index) => (
                <tr key={no.id}>
                  <td>{index + 1}</td>
                  <td>{no.name}</td>
                  <td>{no.catatan}</td>
                  <td>
                    <Link className="btn bg-primary" to={`/editNote/${no.id}`}>
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button className="btn bg-danger" onClick={() => deleteNote(no.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Noteuser;
