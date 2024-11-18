import { useState } from "react";
import CostumeNavbar from './navbar';
import { Form, Button, Container } from 'react-bootstrap';
import { Tablet } from "../tablet";

export default function tabletFelvetel() {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [tablet, setTablet] = useState<Tablet>({
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
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTablet({
          ...tablet,
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
                body: JSON.stringify(tablet)
            });
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                throw new Error(`Hiba történt: ${response.status}`);
            }

            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <>
            <CostumeNavbar />
            <Container>
      <h1>Tablet Felvétel</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNev">
          <Form.Label>Név</Form.Label>
          <Form.Control
            type="text"
            name="Nev"
            value={tablet.Nev}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formOpRendszer">
          <Form.Label>Operációs Rendszer</Form.Label>
          <Form.Control
            type="text"
            name="opRendszer"
            value={tablet.opRendszer}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProcOrajel">
          <Form.Label>Processzor Órajel</Form.Label>
          <Form.Control
            type="number"
            name="procOrajel"
            value={tablet.procOrajel}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProcMagok">
          <Form.Label>Processzor Magok</Form.Label>
          <Form.Control
            type="number"
            name="procMagok"
            value={tablet.procMagok}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formKijelzoMeret">
          <Form.Label>Kijelző Méret</Form.Label>
          <Form.Control
            type="text"
            name="kijelzoMeret"
            value={tablet.kijelzoMeret}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formKijelzoFelbontas">
          <Form.Label>Kijelző Felbontás</Form.Label>
          <Form.Control
            type="number"
            name="kijelzoFelbontas"
            value={tablet.kijelzoFelbontas}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRAM">
          <Form.Label>RAM</Form.Label>
          <Form.Control
            type="number"
            name="RAM"
            value={tablet.RAM}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLeiras">
          <Form.Label>Leírás</Form.Label>
          <Form.Control
            type="text"
            name="leiras"
            value={tablet.leiras}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAr">
          <Form.Label>Ár</Form.Label>
          <Form.Control
            type="number"
            name="ar"
            value={tablet.ar}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <br />

        <Button variant="primary" type="submit">
          Felvétel
        </Button>
      </Form>
    </Container>
    </>
    );
}
