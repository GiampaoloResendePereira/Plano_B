import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function CadastroCliente() {
    const navigate = useNavigate()  ;
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    

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

    const validateInputs = () => {
        if (!nome || !sobrenome || !cpf || !telefone || !dataNascimento || !cep || !rua || !numero || !bairro || !cidade || !estado || !email || !senha) {
            return 'Por favor, preencha todos os campos!';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Por favor, insira um email válido!';
        }
        const cpfRegex = /^\d{11}$/;
        if (!cpfRegex.test(cpf)) {
            return 'Por favor, insira um CPF válido (11 dígitos)!';
        }
        return '';
    };

    const handleCadastro = () => {
        const validationError = validateInputs();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        const cliente = {
            nome,
            sobrenome,
            cpf,
            telefone,
            dataNascimento,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            email,
            senha,
        };

        axios.post('http://localhost:5000/cadastro', cliente)
            .then((response) => {
                alert('Cliente cadastrado com sucesso!');
                navigate('/');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar cliente: ', error);
                setError('Erro ao cadastrar cliente!');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container bg-light p-5">
            <h2 className="bg-dark text-white rounded p-3 mb-4">Cadastro de Cliente</h2>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    placeholder="Digite o nome do cliente"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="sobrenome" className="form-label">Sobrenome</label>
                <input
                    type="text"
                    className="form-control"
                    id="sobrenome"
                    placeholder="Digite o sobrenome do cliente"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cpf" className="form-label">CPF</label>
                <input
                    type="text"
                    className="form-control"
                    id="cpf"
                    placeholder="Digite o CPF do cliente"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="telefone" className="form-label">Telefone</label>
                <input
                    type="text"
                    className="form-control"
                    id="telefone"
                    placeholder="Digite o telefone do cliente"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                <input
                    type="date"
                    className="form-control"
                    id="dataNascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cep" className="form-label">CEP</label>
                <input
                    type="text"
                    className="form-control"
                    id="cep"
                    placeholder="Digite o CEP do cliente"
                    value={cep}
                    onChange={handleCepChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="rua" className="form-label">Rua</label>
                <input
                    type="text"
                    className="form-control"
                    id="rua"
                    placeholder="Digite a rua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="numero" className="form-label">Número</label>
                <input
                    type="text"
                    className="form-control"
                    id="numero"
                    placeholder="Digite o número da residência"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="bairro" className="form-label">Bairro</label>
                <input
                    type="text"
                    className="form-control"
                    id="bairro"
                    placeholder="Digite o bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="cidade" className="form-label">Cidade</label>
                <input
                    type="text"
                    className="form-control"
                    id="cidade"
                    placeholder="Digite a cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="estado" className="form-label">Estado</label>
                <input
                    type="text"
                    className="form-control"
                    id="estado"
                    placeholder="Digite o estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Digite o email do cliente"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input
                    type="password"
                    className="form-control"
                    id="senha"
                    placeholder="Digite a senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-between">
                <button onClick={handleCadastro} className="btn btn-danger" disabled={loading}>Cadastrar</button>
                <button onClick={() => navigate('/')} className="btn btn-secondary">Cancelar</button>
            </div>
        </div>
    );
}

export default CadastroCliente;