export async function mostrandoEntrga(req, res) {
    console.log('EntregaController mostrandoEntregas');
    try {
      const [status, resposta] = await readEntrega();
      res.status(status).json(resposta);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  export async function mostrandoUmaEntrega(req, res) {
    console.log('EntregaController mostrandoUmaEntrega');
    const { id } = req.params;
  
    if (isNullOrEmpty(id)) {
      res.status(400).json({ message: 'O id deve ser preenchido' });
    } else {
      try {
        const [status, resposta] = await getOneEntrega(id);
        res.status(status).json(resposta);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  }