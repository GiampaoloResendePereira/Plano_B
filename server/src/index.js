// Importando pacotes e dependências
import express from 'express';
import cors from 'cors';

// Importando controlador
import { cadastroCliente } from './controllers/CadastroClienteController.js';
import { cadastroCalculo } from './controllers/CalculoFreteController.js';
import { cadastroSolicitacao } from './controllers/SolicitacaoFreteController.js';

// Instanciando objeto express
const app = express();
const porta = 5000;

// Configurações
app.use(express.json());
app.use(cors());

// Rota de teste da API
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// Rota para cadastro de clientes
app.post('/cadastrar-cliente', cadastroCliente); // Criar um novo cliente
app.post('/solicitacao-frete', cadastroSolicitacao); // Criar um novo solicitação frete
app.post('/calculo-frete', cadastroCalculo); // Criar um novo calculo frete


// Inicializando servidor
app.listen(porta, () => {
  console.log(`API funcionando na porta ${porta}`);
});