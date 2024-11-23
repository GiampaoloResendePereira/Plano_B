import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

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
  const [errorCepOrigem, setErrorCepOrigem] = useState('');
  const [errorCepDestino, setErrorCepDestino] = useState('');
  const [errorPeso, setErrorPeso] = useState('');
  const [errorLargura, setErrorLargura] = useState('');
  const [errorAltura, setErrorAltura] = useState('');
  const [errorComprimento, setErrorComprimento] = useState('');
  const [errorApi, setErrorApi] = useState('');

  const validateForm = () => {
    let valid = true;
    const maxLargura = 50; // Máximo de 50 cm
    const maxAltura = 50; // Máximo de 50 cm
    const maxComprimento = 60; // Máximo de 60 cm

    if (!cepOrigem) {
      setErrorCepOrigem('CEP de origem é obrigatório.');
      valid = false;
    } else {
      setErrorCepOrigem('');
    }

    if (!cepDestino) {
      setErrorCepDestino('CEP de destino é obrigatório.');
      valid = false;
    } else {
      setErrorCepDestino('');
    }

    if (!peso || isNaN(peso) || parseFloat(peso) <= 0) {
      setErrorPeso('Peso deve ser um número positivo.');
      valid = false;
    } else {
      setErrorPeso('');
    }

    if (!largura || isNaN(largura) || parseFloat(largura) <= 0 || parseFloat(largura) > maxLargura) {
      setErrorLargura(`Largura deve ser um número positivo até ${maxLargura} cm.`);
      valid = false;
    } else {
      setErrorLargura('');
    }

    if (!altura || isNaN(altura) || parseFloat(altura) <= 0 || parseFloat(altura) > maxAltura) {
      setErrorAltura(`Altura deve ser um número positivo até ${maxAltura} cm.`);
      valid = false;
    } else {
      setErrorAltura('');
    }

    if (!comprimento || isNaN(comprimento) || parseFloat(comprimento) <= 0 || parseFloat(comprimento) > maxComprimento) {
      setErrorComprimento(`Comprimento deve ser um número positivo até ${maxComprimento} cm.`);
      valid = false;
    } else {
      setErrorComprimento('');
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrorApi('');

    try {
      const response = await axios.post('/calculo-frete', {
        cepOrigem,
        cepDestino,
        peso,
        largura,
        altura,
        comprimento
      });

      setValorFrete(response.data.valor);
      setDistancia(response.data.distancia);
      // Limpar os campos após sucesso
      setCepOrigem('');
      setCepDestino('');
      setPeso('');
      setLargura('');
      setAltura('');
      setComprimento('');
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      setErrorApi('Ocorreu um erro ao calcular o frete. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Cálculo de Frete</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="cepOrigem" className="form-label">CEP de Origem</label>
          <input
            type="text"
            className="form-control"
            value={cepOrigem}
            onChange={(e) => setCepOrigem(e.target.value)}
            placeholder="Digite o CEP de origem"
          />
          {errorCepOrigem && <div className="text-danger">{errorCepOrigem}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="cepDestino" className="form-label">CEP de Destino</label>
          <input
            type="text"
            className="form-control"
            value={cepDestino}
            onChange={(e) => setCepDestino(e.target.value)}
            placeholder="Digite o CEP de destino"
          />
          {errorCepDestino && <div className="text-danger">{errorCepDestino}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="peso" className="form-label">Peso (kg)</label>
          <input
            type="text"
            className="form-control"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite o peso"
          />
          {errorPeso && <div className="text-danger">{errorPeso}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="largura" className="form-label">Largura (cm)</label>
          <input
            type="text"
            className="form-control"
            value={largura}
            onChange={(e) => setLargura(e.target.value)}
            placeholder="Digite a largura"
          />
          {errorLargura && <div className="text-danger">{errorLargura}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="altura" className="form-label">Altura (cm)</label>
          <input
            type="text"
            className="form-control"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite a altura"
          />
          {errorAltura && <div className="text-danger">{errorAltura}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="comprimento" className="form-label">Comprimento (cm)</label>
          <input
            type="text"
            className="form-control"
            value={comprimento}
            onChange={(e) => setComprimento(e.target.value)}
            placeholder="Digite o comprimento"
          />
          {errorComprimento && <div className="text-danger">{errorComprimento}</div>}
        </div>

        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Carregando...</span>
            </div>
          </div>
        )}

        {errorApi && (
          <div className="alert alert-danger">
            {errorApi}
          </div>
        )}

        {valorFrete && !loading && (
          <div className="alert alert-info">
            <strong>Valor do frete: </strong> R$ {valorFrete.toFixed(2)}
          </div>
        )}

        {distancia !== null && !loading && (
          <div className="alert alert-info mt-3">
            Distância entre os CEPs: {distancia.toFixed(2)} km
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-danger" disabled={loading}>
            Calcular Frete
          </button>
        </div>
      </form>
    </div>
  );
}

export default CalculoFrete;
