import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecuperacaoSenha = () => {
  const [email, setEmail] = useState(''); // Estado para armazenar o email
  const [message, setMessage] = useState(''); // Estado para mensagens de erro ou sucesso

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    if (!email) {
      setMessage("Por favor, insira um email válido.");
      return;
    }

    try {
      // Faz a requisição para recuperar a senha (exemplo de integração com backend)
      const response = await fetch('http://localhost:3001/recuperar-senha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage("Instruções para recuperação de senha enviadas para o seu email.");
      } else {
        const error = await response.json();
        setMessage(error.message || "Erro ao enviar solicitação.");
      }
    } catch (err) {
      setMessage('Erro ao conectar ao servidor.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', // ocupa toda a altura da tela
      backgroundColor: '#f5f5f5' // cor de fundo suave
    }}>
      <div
        className="login-container"
        style={{
          padding: '20px',
          width: '80%',        // 80% da largura da tela
          maxWidth: '600px',   // Largura máxima de 600px
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: '#fff',
          borderRadius: '8px', // Bordas arredondadas para o container
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Sombra suave
        }}
      >
        <h2>Recuperação de Senha</h2>
        {message && (
          <div
            className={`alert ${message.includes("enviadas") ? "alert-success" : "alert-danger"}`}
            role="alert"
            style={{ marginBottom: '20px' }}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
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
