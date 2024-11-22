import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// URL do backend que você configurou
const API_URL = 'http://localhost:5000/api/pedidos';

function GerenciamentoEntrega() {
  const [pesquisaNumero, setPesquisaNumero] = useState('');
  const [pesquisaCliente, setPesquisaCliente] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  // Função para atualizar o filtro de pesquisa por número do pedido
  const handlePesquisaNumeroChange = (e) => {
    setPesquisaNumero(e.target.value);
  };

  // Função para atualizar o filtro de pesquisa por nome do cliente
  const handlePesquisaClienteChange = (e) => {
    setPesquisaCliente(e.target.value);
  };

  // Função para filtrar pedidos com base no número do pedido e nome do cliente
  const pedidosFiltrados = pedidos.filter((pedido) =>
    pedido.numeroPedido.includes(pesquisaNumero) && 
    pedido.nomeCliente.toLowerCase().includes(pesquisaCliente.toLowerCase())
  );

  // Função para atualizar o status de um pedido
  const atualizarStatus = (id, novoStatus) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: novoStatus }),
    })
      .then((response) => {
        if (response.ok) {
          setPedidos(pedidos.map(pedido => 
            pedido.id === id ? { ...pedido, status: novoStatus } : pedido
          ));
        } else {
          console.error('Erro ao atualizar status do pedido');
        }
      })
      .catch((error) => console.error('Erro ao atualizar status do pedido:', error));
  };

  // Função para exibir os detalhes do pedido selecionado
  const mostrarDetalhesPedido = (pedidoId) => {
    const pedido = pedidos.find((p) => p.id === pedidoId);
    setPedidoSelecionado(pedido);
  };

  // Fechar o modal de detalhes
  const fecharDetalhes = () => {
    setPedidoSelecionado(null);
  };

  // Carregar os pedidos do banco de dados ao montar o componente
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.error('Erro ao carregar os pedidos:', error));
  }, []);

  return (
    <div className="container bg-light p-5">
      <h2 className="bg-dark text-white rounded p-3 mb-4">Gerenciamento de Entregas</h2>

      {/* Filtro de Pesquisa */}
      <div className="mb-3">
        <label htmlFor="numeroPedido" className="form-label">Pesquisar por Número do Pedido:</label>
        <input
          type="text"
          value={pesquisaNumero}
          onChange={handlePesquisaNumeroChange}
          placeholder="Digite Número do Pedido"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="nomeCliente" className="form-label">Pesquisar por Nome do Cliente:</label>
        <input
          type="text"
          value={pesquisaCliente}
          onChange={handlePesquisaClienteChange}
          placeholder="Digite Nome do Cliente"
          className="form-control"
        />
      </div>

      {/* Tabela de Pedidos */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Número do Pedido</th>
            <th>Nome do Cliente</th>
            <th>CEP Origem</th>
            <th>CEP Destino</th>
            <th>Valor do Frete</th>
            <th>Status</th>
            <th>Hora da Solicitação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidosFiltrados.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.numeroPedido}</td>
              <td>{pedido.nomeCliente}</td>
              <td>{pedido.cepOrigem}</td>
              <td>{pedido.cepDestino}</td>
              <td>{pedido.valor}</td>
              <td>
                <select 
                  value={pedido.status}
                  onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                  className="form-control"
                >
                  <option value="Em trânsito">Em trânsito</option>
                  <option value="Entregue">Entregue</option>
                  <option value="Aguardando">Aguardando</option>
                </select>
              </td>
              <td>{pedido.horaSolicitacao}</td>
              <td>
                <button onClick={() => mostrarDetalhesPedido(pedido.id)} className="btn btn-info">Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Detalhes do Pedido */}
      {pedidoSelecionado && (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f5f5f5', color: 'black' }}>
          <h3>Detalhes do Pedido</h3>
          <p><strong>Número do Pedido:</strong> {pedidoSelecionado.numeroPedido}</p>
          <p><strong>Nome do Cliente:</strong> {pedidoSelecionado.nomeCliente}</p>
          <p><strong>CEP Origem:</strong> {pedidoSelecionado.cepOrigem}</p>
          <p><strong>CEP Destino:</strong> {pedidoSelecionado.cepDestino}</p>
          <p><strong>Valor do Frete:</strong> {pedidoSelecionado.valor}</p>
          <p><strong>Status:</strong> {pedidoSelecionado.status}</p>
          <p><strong>Hora da Solicitação:</strong> {pedidoSelecionado.horaSolicitacao}</p>
          <button onClick={fecharDetalhes} className="btn btn-danger" style={{ marginTop: '10px' }}>Fechar</button>
        </div>
      )}
    </div>
  );
}

export default GerenciamentoEntrega;