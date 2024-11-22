import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function CalculoFrete({ clienteNome }) {
  const navigate = useNavigate();
  const [cepOrigem, setCepOrigem] = useState('');
  const [cepDestino, setCepDestino] = useState('');
  const [peso, setPeso] = useState('');
  const [valorFrete, setValorFrete] = useState(null);
  const [distancia, setDistancia] = useState(null);
  const [errorCepOrigem, setErrorCepOrigem] = useState('');
  const [errorCepDestino, setErrorCepDestino] = useState('');
  const [errorPeso, setErrorPeso] = useState('');
  const [loading, setLoading] = useState(false);

  const validarCep = (cep) => /^[0-9]{5}-[0-9]{3}$/.test(cep);
  const validarPeso = (peso) => /^[0-9]+(\.[0-9]{1,2})?$/.test(peso);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    setErrorCepOrigem('');
    setErrorCepDestino('');
    setErrorPeso('');
    setLoading(true);

    if (!validarCep(cepOrigem)) {
      setErrorCepOrigem('CEP de origem inválido. Formato correto: XXXXX-XXX');
      isValid = false;
    }

    if (!validarCep(cepDestino)) {
      setErrorCepDestino('CEP de destino inválido. Formato correto: XXXXX-XXX');
      isValid = false;
    }

    if (!validarPeso(peso)) {
      setErrorPeso('Peso inválido. Formato correto: um número positivo com até duas casas decimais.');
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:5000/calcular-frete', {
          cepOrigem,
          cepDestino,
          peso,
        });

        const { distanciaEmKm, valorFrete } = response.data;
        setDistancia(distanciaEmKm);
        setValorFrete(`R$ ${parseFloat(valorFrete).toFixed(2).replace('.', ',')}`);

        alert('Cálculo do frete realizado com sucesso!');
      } catch (error) {
        console.error('Erro ao calcular frete: ', error);
        alert('Erro ao calcular frete!');
      }
    }

    setLoading(false);
  };

  const handleSolicitarFrete = async () => {
    try {
      await axios.post('http://localhost:5000/solicitar-frete', {
        cepOrigem,
        cepDestino,
        peso,
        distancia,
        valorFrete,
      });
      navigate('/solicitacao-frete');
    } catch (error) {
      console.error('Erro ao solicitar frete: ', error);
      alert('Erro ao solicitar frete!');
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

        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Carregando...</span>
            </div>
          </div>
        )}

        {valorFrete && !loading && (
          <div className="alert alert-info">
            <strong>Valor do frete: </strong> {valorFrete}
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
          <button type="button" className="btn btn-secondary" onClick={handleSolicitarFrete}>
            Solicitar Frete
          </button>
        </div>
      </form>
    </div>
  );
}

export default CalculoFrete;