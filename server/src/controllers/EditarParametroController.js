export async function atualizandoParametro(req, res) {
    console.log('ParametroController atualizandoParametro');
    const { id } = req.params;
    const aula = req.body;
  
    if (validateParametro(aula) || isNullOrEmpty(id)) {
      res.status(400).json({ message: 'Parametro não pode conter campos vazios' });
    } else {
      try {
        const [status, resposta] = await updateParametro(parametro, id);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }