//Editando aula
export async function updateParametro(parametro, id) {
  console.log('ParametroModel: updateParametro');
  const conexao = mysql.createPool(db);
  const sql = `UPDATE parametro SET 
    menos_1kg = ?,
    entre_1kge3kg = ?,
    entre_3kge8kg = ?,
    entre_8kge12kg = ?,
    1_km_rodado = ?`;

  const params = [
    parametro.menos_1kg,
    parametro.entre_1kge3kg,
    parametro.entre_3kge8kg,
    parametro.entre_8kge12kg,
    parametro.km_rodado,
    id,
  ];

  try {
    const [retorno] = await conexao.query(sql, params);
    console.log('Atualizando parametro');
    if (retorno.affectedRows < 1) {
      return [404, { message: 'Parametro atualizado' }];
    }
    return [200, { message: 'Parametro atualizado' }];
  } catch (error) {
    console.log(error);
    return [500, error];
  }
}
