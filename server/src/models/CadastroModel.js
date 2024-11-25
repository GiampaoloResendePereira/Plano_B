const db = require('../db');

const createCliente = (user, callback) => {
  const sql = 'INSERT INTO users (nome, sobrenome, cpf, telefone, dataNascimento, cep, rua, numero, bairro, cidade, estado, email, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [user.nome, user.sobrenome, user.cpf, user.telefone, user.dataNascimento, user.cep, user.rua, user.numero, user.bairro, user.cidade, user.estado, user.email, user.senha], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  createCliente,
};
