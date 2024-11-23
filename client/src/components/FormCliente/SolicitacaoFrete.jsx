import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para navegação entre telas

function SolicitacaoFrete() {
  const [remetente, setRemetente] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: { cep: '' }
  });

  const [destinatario, setDestinatario] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: { cep: '' }
  });

  const [frete, setFrete] = useState(null);
  const navigate = useNavigate();

  const handleSalvarSolicitacao = async () => {
    try {
      const resposta = await axios.post('/api/calculoFrete', { remetente, destinatario });
      setFrete(resposta.data.valor);
      // Navegar para outra página se necessário
      // navigate('/outra-pagina');
    } catch (error) {
      console.error('Erro ao salvar solicitação:', error);
    }
  };

  return (
    <div className="container bg-light p-5">
      <h3 className="bg-dark text-white rounded p-3 mb-4">Dados do Remetente</h3>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome:</label>
        <input
          className="form-control"
          value={remetente.nome}
          onChange={(e) => setRemetente({ ...remetente, nome: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telefone" className="form-label">Telefone:</label>
        <input
          className="form-control"
          value={remetente.telefone}
          onChange={(e) => setRemetente({ ...remetente, telefone: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-mail:</label>
        <input
          className="form-control"
          value={remetente.email}
          onChange={(e) => setRemetente({ ...remetente, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cep" className="form-label">CEP:</label>
        <input
          className="form-control"
          value={remetente.endereco.cep}
          onChange={(e) => setRemetente({ ...remetente, endereco: { ...remetente.endereco, cep: e.target.value } })}
        />
      </div>

      <h3 className="bg-dark text-white rounded p-3 mb-4">Dados do Destinatário</h3>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">Nome:</label>
        <input
          className="form-control"
          value={destinatario.nome}
          onChange={(e) => setDestinatario({ ...destinatario, nome: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="telefone" className="form-label">Telefone:</label>
        <input
          className="form-control"
          value={destinatario.telefone}
          onChange={(e) => setDestinatario({ ...destinatario, telefone: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-mail:</label>
        <input
          className="form-control"
          value={destinatario.email}
          onChange={(e) => setDestinatario({ ...destinatario, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cep" className="form-label">CEP:</label>
        <input
          className="form-control"
          value={destinatario.endereco.cep}
          onChange={(e) => setDestinatario({ ...destinatario, endereco: { ...destinatario.endereco, cep: e.target.value } })}
        />
      </div>

      {frete !== null && (
        <div className="mb-3">
          <h4 className="bg-dark text-white rounded p-3 mb-4">Preço do Frete: R$ {frete}</h4>
        </div>
      )}

      <button onClick={handleSalvarSolicitacao} className="btn btn-success mt-4">
        Confirmar e Solicitar Frete
      </button>
    </div>
  );
}

export default SolicitacaoFrete;
