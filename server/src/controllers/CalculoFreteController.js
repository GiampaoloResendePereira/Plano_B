import { createCalculoFrete, getDistanciaEntreCeps, getPrecos } from '../models/CalculoFreteModel.js';

export async function cadastroCalculo(req, res) {
  console.log('CalculoController cadastroCalculo');
  const calculo = req.body;

  // Validar o cálculo
  if (!validateCalculo(calculo)) {
    return res.status(400).json({ message: 'Calculo não pode conter campos vazios' });
  }

  try {
    // Buscar a distância entre os CEPs de origem e destino
    const distancia = await getDistanciaEntreCeps(calculo.cep_origem, calculo.cep_destino);
    if (!distancia) {
      return res.status(404).json({ message: 'Distância entre CEPs não encontrada' });
    }

    // Buscar os parâmetros de preços
    const precos = await getPrecos();
    if (!precos) {
      return res.status(500).json({ message: 'Parâmetros de preço não encontrados' });
    }

    // Calcular o preço do frete com base no peso
    let precoFrete;
    if (calculo.peso < 1) {
      precoFrete = precos.menos_1kg;
    } else if (calculo.peso >= 1 && calculo.peso <= 3) {
      precoFrete = precos.entre_1kge3kg;
    } else if (calculo.peso > 3 && calculo.peso <= 8) {
      precoFrete = precos.entre_3kge8kg;
    } else if (calculo.peso > 8 && calculo.peso <= 12) {
      precoFrete = precos.entre_8kge12kg;
    } else {
      return res.status(400).json({ message: 'Peso fora do intervalo permitido' });
    }

    // Calcular o valor total do frete com base na distância e no custo por km rodado
    const custoKm = precos['1_km_rodado'];
    const valorFrete = precoFrete + (distancia * custoKm);

    // Adicionar a distância e o valor do frete no cálculo
    calculo.distancia = distancia;
    calculo.valor = valorFrete;

    // Criar o cálculo de frete no banco de dados
    const [status, resposta] = await createCalculoFrete(calculo);
    res.status(status).json({ ...resposta, distancia, valor: valorFrete });
  } catch (error) {
    console.error('Erro no cadastro do cálculo:', error); // Logar o erro detalhado
    res.status(500).json({ message: 'Erro interno do servidor', error }); // Retornar mensagem de erro detalhada
  }
}
