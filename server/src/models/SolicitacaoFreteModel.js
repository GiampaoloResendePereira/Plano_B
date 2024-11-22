//Importando pacote do mysql
import mysql from 'mysql2/promise';

//Importando configurações do banco
import db from '../conexao.js';

// Função para salvar uma solicitacao no banco de dados
export async function createSolicitacaoFrete(solicitacao) {
  console.log('SolicitacaoFreteModel: Create');
  const conexao = mysql.createPool(db);
  const sql = `
    INSERT INTO solicitacao_frete (remetente_nome, remetente_telefone, remetente_email, remetente_cep, remetente_rua, remetente_numero, remetente_bairro, remetente_cidade, remetente_estado, destinatario_nome, destinatario_telefone, destinatario_email, destinatario_cep, destinatario_rua, destinatario_numero, destinatario_bairro, destinatario_cidade, destinatario_estado)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    solicitacao.remetente_nome,
    solicitacao.remetente_telefone,
    solicitacao.remetente_email,
    solicitacao.remetente_cep,
    solicitacao.remetente_rua,
    solicitacao.remetente_numero,
    solicitacao.remetente_bairro,
    solicitacao.remetente_cidade,
    solicitacao.remetente_estado,
    solicitacao.destinatario_nome,
    solicitacao.destinatario_telefone,
    solicitacao.destinatario_email,
    solicitacao.destinatario_cep,
    solicitacao.destinatario_rua,
    solicitacao.destinatario_numero,
    solicitacao.destinatario_bairro,
    solicitacao.destinatario_cidade,
    solicitacao.destinatario_estado,
  ];
  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Solicitação Salvo');
    return [201, 'Solicitação Salvo'];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
};
