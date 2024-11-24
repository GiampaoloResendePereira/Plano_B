import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CalculoFrete() {
  const [cepOrigem, setCepOrigem] = useState('');
  const [cepDestino, setCepDestino] = useState('');
  const [peso, setPeso] = useState('');
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [comprimento, setComprimento] = useState('');
  const [valorFrete, setValorFrete] = useState(null);
  const [distancia, setDistancia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = [];

    if (!cepOrigem || cepOrigem.length !== 8 || isNaN(cepOrigem)) {
      errors.push("CEP de origem inválido. Deve conter 8 números.");
    }

    if (!cepDestino || cepDestino.length !== 8 || isNaN(cepDestino)) {
      errors.push("CEP de destino inválido. Deve conter 8 números.");
    }

    if (!peso || isNaN(peso) || parseFloat(peso) <= 0) {
      errors.push("Peso inválido. Deve ser um número positivo.");
    }

    if (!largura || isNaN(largura) || parseFloat(largura) <= 0 || parseFloat(largura) > 50) {
      errors.push("Largura inválida. Deve ser um número positivo até 50 cm.");
    }

    if (!altura || isNaN(altura) || parseFloat(altura) <= 0 || parseFloat(altura) > 50) {
      errors.push("Altura inválida. Deve ser um número positivo até 50 cm.");
    }

    if (!comprimento || isNaN(comprimento) || parseFloat(comprimento) <= 0 || parseFloat(comprimento) > 60) {
      errors.push("Comprimento inválido. Deve ser um número positivo até 60 cm.");
    }

    if (errors.length > 0) {
      setError(errors.join(' '));
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/calculo-frete', {
        cepOrigem,
        cepDestino,
        peso,
        largura,
        altura,
        comprimento,
      });

      setValorFrete(response.data.valor);
      setDistancia(response.data.distancia);
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao calcular frete:", err);
      setError("Erro ao calcular frete. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    navigate('/solicitacao-frete');
  };

  const handleCancel = () => {
    setShowModal(false);
    setCepOrigem('');
    setCepDestino('');
    setPeso('');
    setLargura('');
    setAltura('');
    setComprimento('');
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Cálculo de Frete</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Campo CEP Origem */}
        <div className="mb-3">
          <label htmlFor="cepOrigem" className="form-label">CEP de Origem</label>
          <input
            type="text"
            className="form-control"
            id="cepOrigem"
            value={cepOrigem}
            onChange={(e) => setCepOrigem(e.target.value)}
            placeholder="Digite o CEP de origem"
          />
        </div>

        {/* Campo CEP Destino */}
        <div className="mb-3">
          <label htmlFor="cepDestino" className="form-label">CEP de Destino</label>
          <input
            type="text"
            className="form-control"
            id="cepDestino"
            value={cepDestino}
            onChange={(e) => setCepDestino(e.target.value)}
            placeholder="Digite o CEP de destino"
          />
        </div>

        {/* Peso */}
        <div className="mb-3">
          <label htmlFor="peso" className="form-label">Peso (kg)</label>
          <input
            type="number"
            className="form-control"
            id="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite o peso em kg"
          />
        </div>

        {/* Largura */}
        <div className="mb-3">
          <label htmlFor="largura" className="form-label">Largura (cm)</label>
          <input
            type="number"
            className="form-control"
            id="largura"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
            placeholder="Digite a largura em cm"
          />
        </div>

        {/* Altura */}
        <div className="mb-3">
          <label htmlFor="altura" className="form-label">Altura (cm)</label>
          <input
            type="number"
            className="form-control"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite a altura em cm"
          />
        </div>

        {/* Comprimento */}
        <div className="mb-3">
          <label htmlFor="comprimento" className="form-label">Comprimento (cm)</label>
          <input
            type="number"
            className="form-control"
            id="comprimento"
            value={comprimento}
            onChange={(e) => setComprimento(e.target.value)}
            placeholder="Digite o comprimento em cm"
          />
        </div>

        {/* Botão de Enviar */}
        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? 'Calculando...' : 'Calcular Frete'}
        </button>
      </form>

      {/* Modal de Resultado */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Resultado do Frete</h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <div className="modal-body">
                <p><strong>Valor do frete:</strong> R$ {valorFrete.toFixed(2)}</p>
                <p><strong>Distância:</strong> {distancia.toFixed(2)} km</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleContinue}>Continuar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalculoFrete;
