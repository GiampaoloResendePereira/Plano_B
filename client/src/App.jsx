import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import TelaAdministrador from './components/layout/TelaAdministrador';
import GerenciamentoEntrega from './components/TabelaEntregas/GerenciamentoEntrega';
import EditarParametro from './components/pages/EditarParametro';
import CadastroCliente from './components/FormCliente/CadastroCliente';
import Login from './components/pages/Login';
import RecuperacaoSenha from './components/pages/RecuperacaoSenha';
import SolicitacaoFrete from './components/FormCliente/SolicitacaoFrete';
import TelaCliente from './components/layout/TelaCliente';
import CalculoFrete from './components/pages/CalculoFrete';


function App() {
  return (
    
      <Router>
        <Routes>
          {/* Rotas */}
          <Route path="/cadastrar-cliente" element={<CadastroCliente />} />
          <Route path="/" element={<Login />} />
          <Route path="/recuperacao-senha" element={<RecuperacaoSenha />} />
          <Route path="/cliente" element={<TelaCliente />} />       
          <Route path="/solicitacao-frete" element={<SolicitacaoFrete />} />
          <Route path="/calculo-frete" element={<CalculoFrete />} />
          <Route path="/administrador" element={<TelaAdministrador />} />
          <Route path="/gerenciamento-entregas" element={<GerenciamentoEntrega />} />
          <Route path="/editar-parametro" element={<EditarParametro />} />                       
        </Routes>
      </Router>
    
  );
}

export default App;