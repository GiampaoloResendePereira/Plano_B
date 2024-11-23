import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/logo.png';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Adicionando Link para navegação
import GerenciamentoEntrega from '../TabelaEntregas/GerenciamentoEntrega';


function TelaAdministrador () {
  const navigate = useNavigate(); // Hook para navegação entre as rotas

  // Função de navegação para a tela de login (ou página inicial)
  const handleAdministradorLogout = () => {
    navigate("/"); // Redireciona para a tela de login ou página inicial
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
            <button className="btn btn-secondary" onClick={handleAdministradorLogout}>
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