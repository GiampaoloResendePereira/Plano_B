import { createCalculoFrete, getDistanciaEntreCeps, getPrecos } from '../models/CalculoFreteModel.js';

export async function cadastroCalculo(req, res) {
  console.log('Iniciando cadastro de cálculo de frete...');
  const calculo = req.body;

  // Validar os campos do cálculo
  if (!validateCalculo(calculo)) {
    console.warn('Validação falhou: campos obrigatórios ausentes ou inválidos.');
    return res.status(400).json({ message: 'Calculo não pode conter campos vazios ou inválidos' });
  }

  try {
    console.log('Buscando distância entre CEPs...');
    const distancia = await getDistanciaEntreCeps(calculo.cep_origem, calculo.cep_destino);
    if (!distancia) {
      console.warn('Distância entre CEPs não encontrada.');
      return res.status(404).json({ message: 'Distância entre CEPs não encontrada' });
    }
    console.log(`Distância encontrada: ${distancia} km`);

    console.log('Buscando parâmetros de preços...');
    const precos = await getPrecos();
    if (!precos) {
      console.error('Erro ao recuperar os parâmetros de preços.');
      return res.status(500).json({ message: 'Parâmetros de preço não encontrados' });
    }
    console.log('Parâmetros de preços recuperados com sucesso.');

    // Determinar o preço do frete com base no peso
    let precoFrete;
    if (calculo.peso < 1) {
      precoFrete = precos.menos_1kg;
    } else if (calculo.peso <= 3) {
      precoFrete = precos.entre_1kge3kg;
    } else if (calculo.peso <= 8) {
      precoFrete = precos.entre_3kge8kg;
    } else if (calculo.peso <= 12) {
      precoFrete = precos.entre_8kge12kg;
    } else {
      console.warn(`Peso inválido: ${calculo.peso}`);
      return res.status(400).json({ message: 'Peso fora do intervalo permitido (até 12 kg)' });
    }
    console.log(`Preço base do frete: R$ ${precoFrete}`);

    // Calcular o valor total do frete
    const custoKm = precos['1_km_rodado'];
    const valorFrete = precoFrete + (distancia * custoKm);
    console.log(`Valor total do frete calculado: R$ ${valorFrete.toFixed(2)}`);

    // Adicionar informações ao cálculo
    calculo.distancia = distancia;
    calculo.valor = valorFrete;

    // Criar o cálculo de frete no banco de dados
    console.log('Criando registro do cálculo de frete no banco de dados...');
    const [status, resposta] = await createCalculoFrete(calculo);

    // Retornar resposta ao cliente
    console.log('Cálculo de frete criado com sucesso.');
    res.status(status).json({ ...resposta, distancia, valor: valorFrete });
  } catch (error) {
    console.error('Erro no cadastro do cálculo de frete:', error.message, error.stack);
    res.status(500).json({ 
      message: 'Erro interno do servidor. Não foi possível calcular o frete.', 
      error: error.message 
    });
  }
}
