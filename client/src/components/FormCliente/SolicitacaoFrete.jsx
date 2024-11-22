import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para navegação entre telas

function SolicitacaoFrete({ location }) {
  const navigate = useNavigate();

  // Dados de remetente e destinatário (com base nos dados passados da tela anterior)
  const [remetente, setRemetente] = useState(location.state.remetente);
  const [destinatario, setDestinatario] = useState(location.state.destinatario);

  // Frete calculado
  const [frete, setFrete] = useState(null);

  useEffect(() => {
    if (remetente && destinatario) {
      calcularFrete();
    }
  }, [remetente, destinatario]);

  // Função para calcular o frete com base no CEP
  const calcularFrete = async () => {
    if (!remetente.endereco.cep || !destinatario.endereco.cep) {
      alert('Por favor, preencha os CEPs para cálculo do frete.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/calcular-frete', {
        cepOrigem: remetente.endereco.cep,
        cepDestino: destinatario.endereco.cep,
        peso: location.state.peso, // Certifique-se de passar o peso da tela anterior
      });

      const { distanciaEmKm, valorFrete } = response.data;
      setFrete(valorFrete.toFixed(2));
    } catch (error) {
      console.error('Erro ao calcular frete: ', error);
      alert('Erro ao calcular frete!');
    }
  };

  // Função para validar os campos antes de salvar
  const validarCampos = () => {
    if (!remetente.nome || !remetente.telefone || !remetente.email || !remetente.endereco.cep) {
      alert('Por favor, preencha todos os dados do remetente.');
      return false;
    }
    if (!destinatario.nome || !destinatario.telefone || !destinatario.email || !destinatario.endereco.cep) {
      alert('Por favor, preencha todos os dados do destinatário.');
      return false;
    }
    if (!frete) {
      alert('O valor do frete não foi calculado.');
      return false;
    }
    return true;
  };

  // Função para salvar a solicitação no banco de dados
  const handleSalvarSolicitacao = async () => {
    if (!validarCampos()) {
      return; // Não prosseguir caso a validação falhe
    }

    try {
      await axios.post('http://localhost:5000/solicitar-frete', {
        remetente,
        destinatario,
        frete,
      });
      alert('Solicitação de frete salva com sucesso!');
      // Após salvar, redireciona para a tela de acompanhamento
      navigate('/acompanhamento');
    } catch (error) {
      console.error('Erro ao salvar solicitação de frete: ', error);
      alert('Erro ao salvar solicitação de frete!');
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