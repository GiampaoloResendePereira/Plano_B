import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecuperacaoSenha = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adicione a lógica de recuperação de senha aqui
        console.log('Recuperação de senha para:', email);
        // Simulando uma requisição para o backend
        alert('Instruções para a recuperação de senha foram enviadas para ' + email);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // para ocupar a altura total da tela
            backgroundColor: '#f5f5f5' // opcional, para uma cor de fundo suave
        }}>
            <div
                className="login-container"
                style={{
                    padding: '20px',
                    width: '80%',        // Define a largura como 80% da tela
                    maxWidth: '600px',   // Limita a largura máxima a 600px
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >
                <h2>Recuperação de Senha</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
                    <button type="submit" className="btn btn-danger" style={{ padding: '10px', marginTop: '10px' }}>
                        Recuperar Senha
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecuperacaoSenha;