import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/logo.png';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Adicionando Link para navegação
import SolicitacaoFrete from '../FormCliente/SolicitacaoFrete';

function TelaCliente() {
  const navigate = useNavigate(); // Hook para navegação entre as rotas

  // Função de navegação para a tela de login (ou página inicial)
  const handleLoginLogout = () => {
    navigate("/"); // Redireciona para a tela de login ou página inicial
  };

  

  return (
    <div>
      {/* Barra superior de navegação */}
      <Navbar bg="danger" variant="dark"></Navbar>

      {/* Barra de navegação principal */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" height="50" />
          </Link>
          <Nav className="me-auto">
            <Nav.Link href="/cliente">Solicitação Frete</Nav.Link>
            <Nav.Link href="/calculo-frete">Calculo Frete</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-white">
            <button className="btn btn-secondary" onClick={handleLoginLogout}>
              Sair
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Exibição da página CalculoFrete */}
      <SolicitacaoFrete />
    </div>
  );
}

export default TelaCliente; // Exportando TelaCliente
