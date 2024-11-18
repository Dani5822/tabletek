import { useEffect, useState } from "react";
import { Form, Button, Container, Table, Modal } from 'react-bootstrap';
import { Tablet } from "../tablet";
import CostumeNavbar from "./navbar";

export default function TabletekFullCrud() {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Tablet>({
    id: 0,
    Nev: '',
    opRendszer: '',
    procOrajel: 0,
    procMagok: 0,
    kijelzoMeret: 0,
    kijelzoFelbontas: '',
    RAM: 0,
    leiras: '',
    ar: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Tablet | null>(null);

  useEffect(() => {
    fetchTablets();
  }, []);

  const fetchTablets = async () => {
    try {
      const response = await fetch('http://localhost:3000/tablets');
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data = await response.json();
      setTablets(data);
      setLoading(false);
    } catch (error:any) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/tablets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        throw new Error(`Hiba történt: ${response.status}`);
      }
      setFormData({
        id: 0,
        Nev: '',
        opRendszer: '',
        procOrajel: 0,
        procMagok: 0,
        kijelzoMeret: 0,
        kijelzoFelbontas: '',
        RAM: 0,
        leiras: '',
        ar: 0,
      });
      fetchTablets();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tablets/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      fetchTablets();
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleEdit = (tablet: Tablet) => {
    setEditData(tablet);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editData) return;
    try {
      const response = await fetch(`http://localhost:3000/tablets/${editData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });
      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }
      setShowModal(false);
      fetchTablets();
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editData) return;
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <CostumeNavbar />
      <Container>
        <h1>Tabletek CRUD</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNev">
            <Form.Label>Név</Form.Label>
            <Form.Control
              type="text"
              name="Nev"
              value={formData.Nev}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formOpRendszer">
            <Form.Label>Operációs Rendszer</Form.Label>
            <Form.Control
              type="text"
              name="opRendszer"
              value={formData.opRendszer}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProcOrajel">
            <Form.Label>Processzor Órajel</Form.Label>
            <Form.Control
              type="number"
              name="procOrajel"
              value={formData.procOrajel}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProcMagok">
            <Form.Label>Processzor Magok</Form.Label>
            <Form.Control
              type="number"
              name="procMagok"
              value={formData.procMagok}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formKijelzoMeret">
            <Form.Label>Kijelző Méret</Form.Label>
            <Form.Control
              type="number"
              name="kijelzoMeret"
              value={formData.kijelzoMeret}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formKijelzoFelbontas">
            <Form.Label>Kijelző Felbontás</Form.Label>
            <Form.Control
              type="text"
              name="kijelzoFelbontas"
              value={formData.kijelzoFelbontas}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRAM">
            <Form.Label>RAM</Form.Label>
            <Form.Control
              type="number"
              name="RAM"
              value={formData.RAM}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLeiras">
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              type="text"
              name="leiras"
              value={formData.leiras}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAr">
            <Form.Label>Ár</Form.Label>
            <Form.Control
              type="number"
              name="ar"
              value={formData.ar}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Felvétel
          </Button>
        </Form>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Név</th>
              <th>Operációs Rendszer</th>
              <th>Processzor Órajel</th>
              <th>Processzor Magok</th>
              <th>Kijelző Méret</th>
              <th>Kijelző Felbontás</th>
              <th>RAM</th>
              <th>Leírás</th>
              <th>Ár</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {tablets.map((tablet) => (
              <tr key={tablet.id}>
                <td>{tablet.Nev}</td>
                <td>{tablet.opRendszer}</td>
                <td>{tablet.procOrajel}</td>
                <td>{tablet.procMagok}</td>
                <td>{tablet.kijelzoMeret}</td>
                <td>{tablet.kijelzoFelbontas}</td>
                <td>{tablet.RAM}</td>
                <td>{tablet.leiras}</td>
                <td>{tablet.ar}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(tablet)}>Módosítás</Button>
                  <Button variant="danger" onClick={() => handleDelete(tablet.id)}>Törlés</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Tablet Módosítása</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editData && (
              <Form>
                <Form.Group controlId="formEditNev">
                  <Form.Label>Név</Form.Label>
                  <Form.Control
                    type="text"
                    name="Nev"
                    value={editData.Nev}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditOpRendszer">
                  <Form.Label>Operációs Rendszer</Form.Label>
                  <Form.Control
                    type="text"
                    name="opRendszer"
                    value={editData.opRendszer}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditProcOrajel">
                  <Form.Label>Processzor Órajel</Form.Label>
                  <Form.Control
                    type="number"
                    name="procOrajel"
                    value={editData.procOrajel}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditProcMagok">
                  <Form.Label>Processzor Magok</Form.Label>
                  <Form.Control
                    type="number"
                    name="procMagok"
                    value={editData.procMagok}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditKijelzoMeret">
                  <Form.Label>Kijelző Méret</Form.Label>
                  <Form.Control
                    type="number"
                    name="kijelzoMeret"
                    value={editData.kijelzoMeret}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditKijelzoFelbontas">
                  <Form.Label>Kijelző Felbontás</Form.Label>
                  <Form.Control
                    type="text"
                    name="kijelzoFelbontas"
                    value={editData.kijelzoFelbontas}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditRAM">
                  <Form.Label>RAM</Form.Label>
                  <Form.Control
                    type="number"
                    name="RAM"
                    value={editData.RAM}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditLeiras">
                  <Form.Label>Leírás</Form.Label>
                  <Form.Control
                    type="text"
                    name="leiras"
                    value={editData.leiras}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formEditAr">
                  <Form.Label>Ár</Form.Label>
                  <Form.Control
                    type="number"
                    name="ar"
                    value={editData.ar}
                    onChange={handleEditChange}
                    required
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Mégse
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Mentés
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}