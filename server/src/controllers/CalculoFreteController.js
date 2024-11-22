import {createCalculoFrete} from '../models/CalculoFreteModel.js';

  export async function cadastroCalculo(req, res) {
    console.log('AulaController cadastroAula');
    //Criando constante calculo
    const aula = req.body;
  
    if (validateCalculo(calculo)) {
      res.status(400).json({ message: 'Calculo não pode conter campos vazios' });
    } else {
      try {
        //Declarando status com o codigo da resposta e reposta como JSON
        const [status, resposta] = await createCalculoFrete(calculo);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }