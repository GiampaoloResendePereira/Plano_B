import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/img/logo.png';


const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', { email, senha });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                login();
                if (response.data.role === 'admin') {
                    navigate('/administrador'); // Redireciona para a tela de administrador
                } else if (response.data.role === 'cliente') {
                    navigate('/cliente'); // Redireciona para a tela de cliente
                }
            } else {
                alert('Email ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro na autenticação: ', error);
            alert('Email ou senha incorretos');
        }
    };

    const handleCadastro = () => {
        navigate('/cadastrar-cliente'); // Redireciona para a tela de cadastro de cliente
    };

    const handleRecuperacaoSenha = () => {
        navigate('/recuperacao-senha'); // Redireciona para a tela de recuperação de senha
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Para ocupar a altura total da tela
            backgroundColor: '#f5f5f5' // Opcional, para uma cor de fundo suave
        }}>
            <div
                className="login-container"
                style={{
                    padding: '20px',
                    width: '80%',        // Define a largura como 80% da tela
                    maxWidth: '600px',   // Limita a largura máxima a 600px
                    margin: '0 auto',
                    textAlign: 'center',
                    background: '#f0f0f0', // Cinza clarinho
                    borderRadius: '8px',  // Adiciona bordas arredondadas
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Adiciona uma sombra suave
                }}
            >
                <img src={logo} alt="Logo" className="login-logo" style={{ width: '250px', height: 'auto', marginBottom: '20px' }} />

                <form className="login-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
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
                        <label htmlFor="senha" className="form-label">Senha:</label>
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
                    <button type="button" className="btn btn-secondary" onClick={handleCadastro} style={{ padding: '10px' }}>
                        Cadastrar
                    </button>
                    <button type="button" className="btn btn-link" onClick={handleRecuperacaoSenha} style={{ marginTop: '10px', color: 'black', textDecoration: 'none' }}>
                        Esqueceu a senha?
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;