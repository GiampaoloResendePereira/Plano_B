const { createCliente } = require('../models/CadastroModel');

const createCadastroCliente = (req, res) => {
  const user = req.body;
  createCliente(user, (err, result) => {
    if (err) {
      res.status(500).send('Erro ao cadastrar usuário');
    } else {
      res.send('Usuário cadastrado com sucesso!');
    }
  });
};

module.exports = {
  createCadastroCliente,
};
