import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Senhas fixas para administrador e cliente
  const adminEmail = 'admin@gmail.com';
  const adminSenha = 'admin123'; // Senha do administrador

  const clienteEmail = 'cliente@gmail.com';
  const clienteSenha = 'cliente123'; // Senha do cliente

  const handleLogin = async (e) => {
    e.preventDefault();

    // Verifica as credenciais de login com base no email e senha fixos
    if (email === adminEmail && senha === adminSenha) {
      navigate('/administrador'); // Redireciona para a tela do administrador
    } else if (email === clienteEmail && senha === clienteSenha) {
      navigate('/cliente'); // Redireciona para a tela do cliente
    } else {
      setErrorMessage('Email ou senha inválidos');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}
    >
      <div
        className="login-container"
        style={{
          padding: '20px',
          width: '80%',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
          background: '#f0f0f0',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="login-logo"
          style={{ width: '250px', height: 'auto', marginBottom: '20px' }}
        />
        {errorMessage && (
          <div
            className="alert alert-danger"
            role="alert"
            style={{ marginBottom: '20px' }}
          >
            {errorMessage}
          </div>
        )}
        <form className="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              Senha:
            </label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="Digite sua senha"
            />
          </div>
          <button type="submit" className="btn btn-danger" style={{ padding: '10px', marginTop: '10px' }}>
            Entrar
          </button>
          <button type="button" className="btn btn-secondary" style={{ padding: '10px' }}>
            Cadastrar
          </button>
          <button type="button" className="btn btn-link" style={{ marginTop: '10px', color: 'black', textDecoration: 'none' }}>
            Esqueceu a senha?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
