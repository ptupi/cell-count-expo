import { LanguageType } from './types.language';

export const ptBR: LanguageType = {
  main: {
    title: 'Olá',
    subtitle: 'O que você procura hoje?',
    data: 'Selecione uma das opções abaixo:',
    cellCount: 'Contagem de células',
    quiz: 'Quiz',
  },
  settings: {
    title: 'Opções',
    edit: 'Configurar células',
    contact: 'Entrar em contato',
    rate: 'Avaliar',
    alertTitle: 'Ops',
    linkError: 'Não foi possível abrir a página.',
  },
  editCells: {
    title: 'Configurar células',
    deleteTitle: 'Atenção',
    deleteMessage: 'Você realmente deseja apagar a célula {{name}}?',
    standard: 'Restaurar padrão',
    standardTitle: 'Atenção',
    standardMessage: 'Você realmente deseja restaurar o padrão de células?',
  },
  editCell: {
    title: 'Alterar célula',
    desc: 'Altere abaixo os dados da célula:',
    save: 'Salvar alterações',
  },
  newCell: {
    title: 'Nova célula',
    desc: 'Insira abaixo os dados da nova célula:',
    save: 'Salvar alterações',
    placeName: 'Nome',
    placeTag: 'Tag',
  },
};

export default null;
