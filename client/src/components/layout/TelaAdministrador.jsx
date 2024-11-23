import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/logo.png'; 
import React from 'react';
import GerenciamentoEntrega from '../TabelaEntregas/GerenciamentoEntrega';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const TelaAdministrador = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="danger" variant="dark"></Navbar>
      <Navbar bg="dark" variant="dark">
        <Container>
          <img src={logo} alt="Logo" height="50" />
          <Nav className="me-auto">
            <Nav.Link href="/editar-parametro">Editar Parametro de Frete</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-white">
            <button className="btn btn-secondary" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </Container>
      </Navbar>

      <GerenciamentoEntrega />
    </div>
  );
};

export default TelaAdministrador;