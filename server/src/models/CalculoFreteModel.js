import mysql from 'mysql2/promise';
import db from '../conexao.js';

// Função para criar o cálculo de frete
export async function createCalculoFrete(calculo) {
  console.log('CalculoFreteModel: Create');
  const conexao = mysql.createPool(db);
  const sql = `
    INSERT INTO calculo_frete (cep_origem, cep_destino, peso, largura, altura, comprimento, valor)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    calculo.cep_origem,
    calculo.cep_destino,
    calculo.peso,
    calculo.largura,
    calculo.altura,
    calculo.comprimento,
    calculo.valor,
  ];
  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Calculo Salvado');
    return [201, 'Calculo Salvado'];
  } catch (error) {
    console.log(error);
    return [500, error];
  } finally {
    if (conexao) {
      conexao.end();
    }
  }
}

// Função para buscar a distância entre CEPs
export async function getDistanciaEntreCeps(cepOrigem, cepDestino) {
  console.log('Buscando distância entre CEPs');
  const conexao = mysql.createPool(db);
  const sql = `
    SELECT distancia_km FROM distancias_cep 
    WHERE cep_origem = ? AND cep_destino = ?
  `;
  const params = [cepOrigem, cepDestino];
  try {
    const [rows] = await conexao.query(sql, params);
    if (rows.length > 0) {
      return rows[0].distancia_km;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    if (conexao) {
      conexao.end();
    }
  }
}

// Função para buscar os preços dos parâmetros
export async function getPrecos() {
  console.log('Buscando preços dos parâmetros');
  const conexao = mysql.createPool(db);
  const sql = `SELECT * FROM parametro LIMIT 1`;
  try {
    const [rows] = await conexao.query(sql);
    if (rows.length > 0) {
      return rows[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    if (conexao) {
      conexao.end();
    }
  }
}
