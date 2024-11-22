const params = [
    'data',
    'data_hora_inicio',
    'data_hora_fim',
    'turma',
    'instrutor',
    'unidade_curricular',
    'ambiente',
  ];
  
  export function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }
  
  export function validateAula(aula) {
    return params.some((param) => {
      return isNullOrEmpty(aula[param]);
    });
  }