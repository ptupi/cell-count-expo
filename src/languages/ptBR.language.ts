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
  countSetup: {
    title: 'Contagem de células',
    desc: 'Para começar a contagem, preencha as informacoes abaixo:',
    maxCount: 'Contagem máxima',
    maxCountTitle: 'Selecione uma opção',
    totalLeu: 'Leucócitos Totais (céls/μL)',
    start: 'Iniciar contagem',
  },
  count: {
    title: 'Contagem de células',
    desc: 'Selecione as quantidades clicando em cada célula:',
    end: 'Finalizar',
    reset: 'Reiniciar',
    undo: 'Desfazer',
    resetTitle: 'Atenção',
    resetMsg: 'Tem certeza de que deseja reiniciar a contagem?',
    descErit: 'Nº de Eritroblastos: ',
    descCell: 'Nº de outras células: ',
    endTitle: 'Atenção',
    endMsg: 'Deseja gerar o relatório?',
  },
  report: {
    title: 'Resultado',
    end: 'Voltar ao início',
    endTitle: 'Retornar à tela principal?',
    endMsg: 'Você perderá os dados desta contagem.',
    leu: 'Leucócitos totais',
    erit: 'Eritroblastos',
    global: 'Contagem global corrigida',
    diff: 'Leucometria\ndiferencial',
    relative: 'Relativa\n(%)',
    absolute: 'Absoluta\n(cels/µL)',
    total: 'Total',
    count:
      '* Para obtenção do diferencial de Leucócitos foi considerada a contagem de {{count}} células.',
  },
};

export default null;
