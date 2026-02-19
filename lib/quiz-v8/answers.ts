// Motor V8 - Estrutura de Perguntas Fixas

export type Pergunta = {
  numero: 1 | 2 | 3 | 4 | 5 | 6 | 7
  pergunta: string
  descricao?: string
  opcoes: Array<{
    valor: number
    texto: string
  }>
}

export const PERGUNTAS_V8: Record<number, Pergunta> = {
  1: {
    numero: 1,
    pergunta: 'Qual é o estágio atual do seu negócio, ideia ou projeto?',
    descricao: 'Isso nos ajuda a entender por onde começar.',
    opcoes: [
      { valor: 1, texto: 'É apenas uma ideia, ainda não colocada em prática' },
      { valor: 2, texto: 'Estou validando a ideia com primeiros clientes ou testes' },
      { valor: 3, texto: 'Negócio pequeno em operação, com receita mas sem estrutura' },
      { valor: 4, texto: 'Empresa estruturada com operação estabelecida' },
    ],
  },
  2: {
    numero: 2,
    pergunta: 'Como está sua receita ou faturamento atualmente?',
    descricao: 'Isso define a saúde financeira do negócio.',
    opcoes: [
      { valor: 1, texto: 'Não faturo nada' },
      { valor: 2, texto: 'Receita instável ou pequena' },
      { valor: 3, texto: 'Receita baixa mas consistente' },
      { valor: 4, texto: 'Receita consistente e previsível' },
    ],
  },
  3: {
    numero: 3,
    pergunta: 'Qual é a principal dificuldade que você enfrenta agora?',
    descricao: 'Ajuda a identificar o maior gargalo.',
    opcoes: [
      { valor: 1, texto: 'Conseguir primeiros clientes' },
      { valor: 2, texto: 'Vender mais para clientes existentes' },
      { valor: 3, texto: 'Melhorar operação ou produção' },
      { valor: 4, texto: 'Crescimento sem perder qualidade' },
      { valor: 5, texto: 'Não tenho clareza sobre o caminho' },
    ],
  },
  4: {
    numero: 4,
    pergunta: 'Qual é o seu nível de autoridade ou influência no mercado?',
    descricao: 'Sua reputação e credibilidade são importantes.',
    opcoes: [
      { valor: 1, texto: 'Pouco conhecido, quase nenhuma presença' },
      { valor: 2, texto: 'Tenho uma presença pequena mas crescente' },
      { valor: 3, texto: 'Reconhecido em um nicho específico' },
      { valor: 4, texto: 'Forte autoridade e reconhecimento' },
    ],
  },
  5: {
    numero: 5,
    pergunta: 'Como está sua capital ou recursos financeiros?',
    descricao: 'Entender seus recursos disponíveis.',
    opcoes: [
      { valor: 1, texto: 'Sem reserva financeira' },
      { valor: 2, texto: 'Capital limitado, apenas para o essencial' },
      { valor: 3, texto: 'Razoável, posso investir em crescimento' },
      { valor: 4, texto: 'Boa estrutura financeira' },
    ],
  },
  6: {
    numero: 6,
    pergunta: 'Como está sua organização ou estrutura interna?',
    descricao: 'Entender como você gerencia o negócio.',
    opcoes: [
      { valor: 1, texto: 'Tudo depende de mim, muito desorganizado' },
      { valor: 2, texto: 'Há processos mas ainda muito desorganizado' },
      { valor: 3, texto: 'Processos definidos e delegáveis' },
      { valor: 4, texto: 'Organização estruturada e escalável' },
    ],
  },
  7: {
    numero: 7,
    pergunta: 'Como você avalia sua clareza sobre o caminho à frente?',
    descricao: 'Sua visão e estratégia são importantes.',
    opcoes: [
      { valor: 1, texto: 'Sem rumo claro, ainda tentando entender' },
      { valor: 2, texto: 'Tenho dúvidas sobre o melhor caminho' },
      { valor: 3, texto: 'Sei o que preciso fazer' },
      { valor: 4, texto: 'Tenho um plano claro e estruturado' },
    ],
  },
}
