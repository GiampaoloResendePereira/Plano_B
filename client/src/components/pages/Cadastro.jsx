import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import validator from 'validator';

function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCepChange = (e) => {
    const cepValue = e.target.value;
    setCep(cepValue);

    if (cepValue.length === 8) {
      axios
        .get(`https://viacep.com.br/ws/${cepValue}/json/`)
        .then((response) => {
          const { logradouro, bairro, localidade, uf } = response.data;
          if (logradouro && bairro && localidade && uf) {
            setRua(logradouro);
            setBairro(bairro);
            setCidade(localidade);
            setEstado(uf);
          } else {
            alert('CEP não encontrado!');
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar o CEP:', error);
          alert('Erro ao buscar o CEP!');
        });
    }
  };

  const validateForm = () => {
    if (nome.trim() === '' || sobrenome.trim() === '' || cpf.trim() === '' || telefone.trim() === '' || dataNascimento.trim() === '' || cep.trim() === '' || rua.trim() === '' || numero.trim() === '' || bairro.trim() === '' || cidade.trim() === '' || estado.trim() === '' || email.trim() === '' || senha.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return false;
    }

    if (!validator.isEmail(email)) {
      alert('Por favor, insira um email válido.');
      return false;
    }

    if (!validator.isNumeric(cpf) || cpf.length !== 11) {
      alert('Por favor, insira um CPF válido (11 dígitos numéricos).');
      return false;
    }

    if (!validator.isMobilePhone(telefone, 'pt-BR')) {
      alert('Por favor, insira um número de telefone válido.');
      return false;
    }

    if (!validator.isPostalCode(cep, 'BR')) {
      alert('Por favor, insira um CEP válido.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const user = { nome, sobrenome, cpf, telefone, dataNascimento, cep, rua, numero, bairro, cidade, estado, email, senha };
        await axios.post('http://localhost:5000/api/cadastro-cliente', user);
        alert('Usuário cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="sobrenome">Sobrenome:</label>
          <input type="text" className="form-control" id="sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input type="text" className="form-control" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" className="form-control" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento:</label>
          <input type="date" className="form-control" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="cep">CEP:</label>
          <input type="text" className="form-control" id="cep" value={cep} onChange={handleCepChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="rua">Rua:</label>
          <input type="text" className="form-control" id="rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="numero">Número:</label>
          <input type="text" className="form-control" id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="bairro">Bairro:</label>
          <input type="text" className="form-control" id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="cidade">Cidade:</label>
          <input type="text" className="form-control" id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <input type="text" className="form-control" id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" className="form-control" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar Usuário</button>
      </form>
    </div>
  );
}

export default CadastroCliente;
