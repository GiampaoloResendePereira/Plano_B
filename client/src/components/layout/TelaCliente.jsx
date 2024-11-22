import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/logo.png';
import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import CalculoFrete from '../pages/CalculoFrete';
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Importar Axios para fazer a requisição

function TelaCliente() {
  const [clienteNome, setClienteNome] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchClienteData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cliente-dados', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { nome } = response.data;
        setClienteNome(nome);
      } catch (error) {
        console.error('Erro ao buscar dados do cliente: ', error);
        localStorage.removeItem('token');
        navigate('/');
      }
    };

    if (token) {
      fetchClienteData();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <Navbar bg="danger" variant="dark" />
      <Navbar bg="dark" variant="dark">
        <Container>
          <img src={logo} alt="Logo" height="50" />
          <Nav className="me-auto">
            <Nav.Link href="/cliente">Calcular Frete</Nav.Link>
            <Nav.Link href="/solicitacao-frete">Solicitação de Frete</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center text-white">
            <span className="me-3">Olá, {clienteNome}</span>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </Container>
      </Navbar>

      <CalculoFrete />
    </div>
  );
}

export default TelaCliente;