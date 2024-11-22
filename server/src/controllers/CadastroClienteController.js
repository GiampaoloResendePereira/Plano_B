import { createCadastroCliente } from '../models/CadastroClienteModel.js';

export async function cadastroCliente (req, res) {
console.log('CadastroClienteController cadastroCliente');
  //Criando constante cliente
  const aula = req.body;
  
  if (validateCliente(cliente)) {
    res.status(400).json({ message: 'cliente não pode conter campos vazios' });
  } else {
    try {
      //Declarando status com o codigo da resposta e reposta como JSON
      const [status, resposta] = await createCadastroCliente(cliente);
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
