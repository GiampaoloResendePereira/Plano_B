//Importando pacote do mysql
import mysql from 'mysql2/promise';

//Importando configurações do banco
import db from '../conexao.js';

// Função para salvar um cliente no banco de dados
export async function createCadastroCliente(cliente) {
  console.log('CadastroClienteModel: Create');
  const conexao = mysql.createPool(db);
  const sql = `
    INSERT INTO clientes (nome, sobrenome, cpf, telefone, data_nascimento, cep, rua, numero, bairro, cidade, estado, email, senha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    cliente.nome,
    cliente.sobrenome,
    cliente.cpf,
    cliente.telefone,
    cliente.dataNascimento,
    cliente.cep,
    cliente.rua,
    cliente.numero,
    cliente.bairro,
    cliente.cidade,
    cliente.estado,
    cliente.email,
    cliente.senha,
  ];
  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Cliente Cadastrado');
    return [201, 'Cliente Cadastrado'];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
};
