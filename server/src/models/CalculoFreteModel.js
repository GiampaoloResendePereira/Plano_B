//Importando pacote do mysql
import mysql from 'mysql2/promise';

//Importando configurações do banco
import db from '../conexao.js';

// Função para salvar um cliente no banco de dados
export async function createCalculoFrete(calculo) {
  console.log('CalculoFreteModel: Create');
  const conexao = mysql.createPool(db);
  const sql = `
    INSERT INTO calculo_frete (cep_origem, cep_destino, peso, valor)
    VALUES (?, ?, ?, ?)
  `;
  const params = [
    calculo.cep_origem,
    calculo.cep_destino,
    calculo.peso,
    calculo.valor,
  ];
  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Calculo Salvado');
    return [201, 'Calculo Salvado'];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
};
