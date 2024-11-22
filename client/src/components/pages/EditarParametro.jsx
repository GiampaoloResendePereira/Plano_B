import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Importando Axios para requisições HTTP

function EditarParametro() {
  const { id } = useParams();

  // Declaração dos estados para valores e feedbacks
  const [limite, setLimite] = useState(0);
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState('');
  const [valoresIniciais, setValoresIniciais] = useState({});
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  // Função para carregar os parâmetros existentes ao montar o componente
  useEffect(() => {
    async function carregarParametro() {
      setLoading(true);
      try {
        const resposta = await axios.get(`http://localhost:3001/obter-parametro/${id}`);
        const dados = resposta.data;
        setLimite(dados.limite);
        setValor(dados.valor);
        setTipo(dados.tipo);
        setValoresIniciais(dados); // Armazena os valores iniciais
      } catch (error) {
        setErro("Erro ao carregar parâmetros");
      } finally {
        setLoading(false);
      }
    }
    carregarParametro();
  }, [id]);

  // Função para editar o parâmetro
  async function editarParametro() {
    setLoading(true);
    setErro(null);
    try {
      const resposta = await axios.put(`http://localhost:3001/editar-parametro`, {
        id,
        limite,
        valor,
        tipo
      });

      if (resposta.status !== 200) {
        throw new Error("Erro ao editar parâmetro");
      }
      alert('Parâmetro editado com sucesso');
    } catch (error) {
      setErro("Erro na edição de parâmetro");
    } finally {
      setLoading(false);
    }
  }

  // Função para salvar alterações
  function salvarAlteracoes() {
    editarParametro();
  }

  // Função para cancelar a edição e restaurar valores iniciais
  function cancelarEdicao() {
    setLimite(valoresIniciais.limite);
    setValor(valoresIniciais.valor);
    setTipo(valoresIniciais.tipo);
  }

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Editar Parâmetro de Frete</h2>

      {loading && <p>Carregando...</p>}
      {erro && <p className="text-danger">{erro}</p>}

      <div className="mb-4 p-3 border rounded bg-white shadow-sm">
        <h3 className="mb-3">Parâmetro de Frete</h3>
        <div className="mb-3">
          <label className="form-label">Limite (Kg ou Km):</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={limite}
            onChange={(e) => setLimite(parseFloat(e.target.value))}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Valor (R$):</label>
          <input
            type="number"
            step="0.01"
            className="form-control"
            value={valor}
            onChange={(e) => setValor(parseFloat(e.target.value))}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo:</label>
          <select className="form-control" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="peso">Peso</option>
            <option value="km">Km</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button onClick={salvarAlteracoes} className="btn btn-danger" disabled={loading}>
          {loading ? "Salvando..." : "Salvar"}
        </button>
        <button onClick={cancelarEdicao} className="btn btn-secondary" disabled={loading}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default EditarParametro;