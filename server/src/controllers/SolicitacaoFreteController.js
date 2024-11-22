import {createSolicitacaoFrete} from '../models/SolicitacaoFreteModel.js';

  export async function cadastroSolicitacao(req, res) {
    console.log('SolicitacaoController cadastroSolicitacao');
    //Criando constante calculo
    const aula = req.body;
  
    if (validateSolicitacao(solicitacao)) {
      res.status(400).json({ message: 'Solicitação não pode conter campos vazios' });
    } else {
      try {
        //Declarando status com o codigo da resposta e reposta como JSON
        const [status, resposta] = await createSolicitacaoFrete(solicitacao);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }