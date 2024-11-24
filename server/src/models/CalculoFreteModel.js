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
    console.log('Cálculo salvo com sucesso:', retorno.insertId);
    return [201, { message: 'Cálculo salvo com sucesso', id: retorno.insertId }];
  } catch (error) {
    console.error('Erro ao salvar cálculo:', error.message);
    return [500, { message: 'Erro ao salvar cálculo', error: error.message }];
  } finally {
    await conexao.end(); // Certifique-se de fechar a conexão no final
  }
}

// Função para buscar a distância entre CEPs
export async function getDistanciaEntreCeps(cepOrigem, cepDestino) {
  console.log('Buscando distância entre CEPs...');
  const conexao = mysql.createPool(db);

  const sql = `
    SELECT distancia_km 
    FROM distancias_cep 
    WHERE cep_origem = ? AND cep_destino = ?
  `;
  const params = [cepOrigem, cepDestino];

  try {
    const [rows] = await conexao.query(sql, params);
    if (rows.length > 0) {
      console.log(`Distância encontrada: ${rows[0].distancia_km} km`);
      return rows[0].distancia_km;
    } else {
      console.warn('Distância não encontrada entre os CEPs fornecidos.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar distância entre CEPs:', error.message);
    return null;
  } finally {
    await conexao.end();
  }
}

// Função para buscar os preços dos parâmetros
export async function getPrecos() {
  console.log('Buscando preços dos parâmetros...');
  const conexao = mysql.createPool(db);

  const sql = `SELECT * FROM parametro LIMIT 1`;

  try {
    const [rows] = await conexao.query(sql);
    if (rows.length > 0) {
      console.log('Parâmetros encontrados:', rows[0]);
      return rows[0];
    } else {
      console.warn('Nenhum parâmetro de preço encontrado.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar parâmetros de preços:', error.message);
    return null;
  } finally {
    await conexao.end();
  }
}
