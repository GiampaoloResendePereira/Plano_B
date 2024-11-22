//Importando pacote do mysql
import mysql from 'mysql2/promise';

//Importando configurações do banco
import db from '../conexao.js';

//Cadastrando Aula
export async function createAula(aula) {
  console.log('AulaModel: Create');
  const conexao = mysql.createPool(db);
  const sql = `INSERT INTO aulas 
        (data,data_hora_inicio,data_hora_fim,turma,instrutor,unidade_curricular,ambiente)
        VALUES (?,?,?,?,?,?,?)`;

  const params = [
    aula.data,
    aula.data_hora_inicio,
    aula.data_hora_fim,
    aula.turma,
    aula.instrutor,
    aula.unidade_curricular,
    aula.ambiente,
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Aula Cadastrada');
    return [201, 'Aula Cadastrada'];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

//Lendo aulas
export async function readAulas() {
  console.log('AulaModel: readAulas');
  const conexao = mysql.createPool(db);

  const sql = 'SELECT * FROM aulas';

  try {
    const [retorno] = await conexao.query(sql);
    console.log('Mostrando Aulas');
    return [200, retorno];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

//Editando aula
export async function updateAula(aula, id) {
  console.log('AulaModel: updateAula');
  const conexao = mysql.createPool(db);
  const sql = `UPDATE aulas SET 
  data = ?,
  data_hora_inicio = ?,
  data_hora_fim = ?,
  turma = ?,
  instrutor = ?,
  unidade_curricular = ?,
  ambiente = ? 
  WHERE id = ?`;

  const params = [
    aula.data,
    aula.data_hora_inicio,
    aula.data_hora_fim,
    aula.turma,
    aula.instrutor,
    aula.unidade_curricular,
    aula.ambiente,
    id,
  ];

  try {
    const [retorno] = await conexao.query(sql,params);
    console.log('Atualizando Aula');
    if(retorno.affectedRows < 1){
      return [404, {message:"Aula não encontrada"}];
    }
    return [200, {message:"Aula atualizada"}];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

export async function deleteAula(id) {
  console.log('AulaModel: deleteAula');
  const conexao = mysql.createPool(db);
  const sql = 'DELETE FROM aulas WHERE id = ?';
  const params = [id]
  try {
    const [retorno] = await conexao.query(sql,params);
    console.log('Deletando Aula');
    if(retorno.affectedRows < 1){
      return [404, {message:"Aula não encontrada"}];
    }
    return [200, {message:"Aula deletada"}];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}

export async function getOneAula(id) {
  console.log('AulaModel: getOneAula');
  const conexao = mysql.createPool(db);
  const sql = 'SELECT * FROM aulas WHERE id = ?';
  const params = [id]
  try {
    const [retorno] = await conexao.query(sql,params);
    console.log('Mostrando Aula');
    if(retorno.length < 1){
       return [404, {message:"Aula não encontrada"}];
    }
    return [200, retorno[0]];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}