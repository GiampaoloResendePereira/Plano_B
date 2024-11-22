import {
    createAula,
    readAulas,
    updateAula,
    deleteAula,
    getOneAula,
  } from '../models/CrudModel.js';
  import { isNullOrEmpty, validateAula } from '../validations/CrudValidation.js';
  
  export async function cadastroAula(req, res) {
    console.log('AulaController cadastroAula');
    //Criando constante aula
    const aula = req.body;
  
    if (validateAula(aula)) {
      res.status(400).json({ message: 'Aula não pode conter campos vazios' });
    } else {
      try {
        //Declarando status com o codigo da resposta e reposta como JSON
        const [status, resposta] = await createAula(aula);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }
  
  export async function mostrandoAulas(req, res) {
    console.log('AulaController mostrandoAulas');
    try {
      const [status, resposta] = await readAulas();
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  
  export async function atualizandoAula(req, res) {
    console.log('AulaController atualizandoAula');
    const { id } = req.params;
    const aula = req.body;
  
    if (validateAula(aula) || isNullOrEmpty(id)) {
      res.status(400).json({ message: 'Aula não pode conter campos vazios' });
    } else {
      try {
        const [status, resposta] = await updateAula(aula, id);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }
  
  export async function excluindoAula(req, res) {
    console.log('AulaController excluindoAula');
    const { id } = req.params;
  
    if (isNullOrEmpty(id)) {
      res.status(400).json({ message: 'O id deve ser preenchido' });
    } else {
      try {
        const [status, resposta] = await deleteAula(id);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }
  
  export async function mostrandoUmaAula(req, res) {
    console.log('AulaController mostrandoUmaAula');
    const { id } = req.params;
  
    if (isNullOrEmpty(id)) {
      res.status(400).json({ message: 'O id deve ser preenchido' });
    } else {
      try {
        const [status, resposta] = await getOneAula(id);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }