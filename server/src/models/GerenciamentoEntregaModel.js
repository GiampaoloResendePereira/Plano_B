export async function readEntrega() {
    console.log('EntrgaModel: readEntrega');
    const conexao = mysql.createPool(db);
  
    const sql = `
      SELECT 
        sf.id_pedido AS numeroPedido,
        cc.nome AS nomeCliente,
        sf.remetente_cep AS cepOrigem,
        sf.destinatario_cep AS cepDestino,
        cf.valor AS valorFrete,
        sf.remetente_cidade AS cidadeOrigem,
        sf.destinatario_cidade AS cidadeDestino,
        sf.remetente_rua AS ruaOrigem,
        sf.destinatario_rua AS ruaDestino,
        sf.remetente_estado AS estadoOrigem,
        sf.destinatario_estado AS estadoDestino,
        sf.remetente_bairro AS bairroOrigem,
        sf.destinatario_bairro AS bairroDestino,
        NOW() AS horaSolicitacao,
        'Aguardando' AS status
      FROM solicitacao_frete sf
      INNER JOIN cadastro_cliente cc ON cc.id = sf.id_pedido
      INNER JOIN calculo_frete cf ON cf.id = sf.id_pedido
    `;
  
    try {
      const [retorno] = await conexao.query(sql);
      console.log('Mostrando Entregas');
      return [200, retorno];
    } catch (error) {
      console.log(error);
      return [500, error];
    }
  }

  export async function getOneEntrega(id) {
    console.log('EntregaModel: getOneEntrega');
    const conexao = mysql.createPool(db);
    const sql = `
      SELECT 
        sf.id_pedido AS numeroPedido,
        cc.nome AS nomeCliente,
        sf.remetente_cep AS cepOrigem,
        sf.destinatario_cep AS cepDestino,
        cf.valor AS valorFrete,
        sf.remetente_cidade AS cidadeOrigem,
        sf.destinatario_cidade AS cidadeDestino,
        sf.remetente_rua AS ruaOrigem,
        sf.destinatario_rua AS ruaDestino,
        sf.remetente_estado AS estadoOrigem,
        sf.destinatario_estado AS estadoDestino,
        sf.remetente_bairro AS bairroOrigem,
        sf.destinatario_bairro AS bairroDestino,
        NOW() AS horaSolicitacao,
        'Aguardando' AS status
      FROM solicitacao_frete sf
      INNER JOIN cadastro_cliente cc ON cc.id = sf.id_pedido
      INNER JOIN calculo_frete cf ON cf.id = sf.id_pedido
      WHERE sf.id_pedido = ?
    `;
    const params = [id]
    try {
      const [retorno] = await conexao.query(sql,params);
      console.log('Mostrando Entrega');
      if(retorno.length < 1){
         return [404, {message:"Entrega não encontrada"}];
      }
      return [200, retorno[0]];
    } catch (error) {
      console.log(error);
      return [500, error];
    }
  }