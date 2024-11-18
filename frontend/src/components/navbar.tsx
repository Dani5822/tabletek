import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CustomNavbar(){
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/tabletfelvetel">Tablet Felvétel</Nav.Link>
            <Nav.Link as={Link} to="/tablettorles">Tablet Törlés</Nav.Link>
            <Nav.Link as={Link} to="/tableteklista">Tabletek Listája</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

