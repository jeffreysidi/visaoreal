'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { mapAnswersToVariables, getDiagnosis } from '@/lib/diagnosis'
import DiagnosisResultComponent from '@/components/diagnosis-result'
import type { DiagnosisResult as DiagnosisResultType } from '@/lib/diagnosis'

// PERGUNTAS FIXAS (Q1 e Q2)
const FIXED_QUESTIONS = [
  {
    id: 1,
    question: 'Qual das opções abaixo representa melhor a situação atual do seu negócio, produto ou projeto?',
    type: 'radio',
    options: [
      { value: 'ideia', label: 'É apenas uma ideia, ainda não colocada em prática' },
      { value: 'operacao', label: 'Já existe um negócio ou produto com clientes ou faturamento' },
      { value: 'crescimento', label: 'O negócio ou produto funciona, mas cresce pouco' },
    ],
  },
  {
    id: 2,
    question: 'Qual dessas opções descreve melhor o tipo de negócio?',
    type: 'radio',
    options: [
      { value: 'local-physical', label: 'Negócio físico/local (ex: loja, restaurante, clínica, outros)' },
      { value: 'digital', label: 'Negócio digital (ex: curso online, software, app, conteúdo pago)' },
      { value: 'professional-service', label: 'Serviço profissional ou consultoria' },
      { value: 'physical-product', label: 'Produto físico (marca própria, indústria, e-commerce)' },
      { value: 'experimental', label: 'Projeto experimental ou protótipo (inovação)' },
      { value: 'undefined', label: 'Ainda não sei definir claramente' },
    ],
  },
]

// PERGUNTAS DINÂMICAS POR ROTA PRINCIPAL (IDEIA, OPERACAO, CRESCIMENTO)
const DYNAMIC_QUESTIONS: Record<string, Array<{ id: string | number; question: string; type: string; options?: Array<{ value: string; label: string }>; optional?: boolean; maxLength?: number; helperText?: string }>> = {
  // ROTA IDEIA - Foco em dor, validação, hipótese, teste mínimo
  'ideia': [
    {
      id: 3,
      question: 'O que a sua ideia ou negócio quer resolver primeiro?',
      type: 'radio',
      options: [
        { value: 'reduce-cost', label: 'Reduzir custos dos clientes' },
        { value: 'avoid-losses', label: 'Diminuir perdas ou problemas recorrentes' },
        { value: 'increase-sales', label: 'Ajudar clientes a vender mais (vendas)' },
        { value: 'save-time', label: 'Economizar tempo dos clientes' },
        { value: 'personal-pain', label: 'Resolver um problema pessoal que eu mesmo experienciei' },
        { value: 'other', label: 'Nenhuma das opções acima' },
      ],
    },
    {
      id: 4,
      question: 'Qual é o público principal da sua solução?',
      type: 'radio',
      options: [
        { value: 'consumer', label: 'Pessoas comuns (consumidor final)' },
        { value: 'small-business', label: 'Pequenos negócios' },
        { value: 'enterprise', label: 'Empresas' },
        { value: 'niche', label: 'Um nicho específico' },
        { value: 'unclear', label: 'Ainda não está claro' },
      ],
    },
    {
      id: 5,
      question: 'O que já foi feito até agora para testar essa ideia?',
      type: 'radio',
      options: [
        { value: 'just-idea', label: 'Apenas testei o interesse com pessoas próximas' },
        { value: 'validated-pain', label: 'Coletei contatos de pessoas interessadas' },
        { value: 'tested-minimal', label: 'Iniciei uma pré-venda da solução/produto' },
        { value: 'running-no-results', label: 'Estou testando a solução, mas sem resultados claros até o momento' },
        { value: 'has-results', label: 'Já tive sinais positivos reais' },
        { value: 'other', label: 'Nenhuma das opções acima' },
      ],
    },
    {
      id: 6,
      question: 'Quais recursos estão disponíveis hoje para tirar essa ideia do papel?',
      type: 'radio',
      options: [
        { value: 'none', label: 'Praticamente nenhum recurso disponível' },
        { value: 'time-ideas', label: 'Tempo e capacidade de execução, mas pouco dinheiro' },
        { value: 'some-capital', label: 'Algum capital disponível para investir' },
        { value: 'significant', label: 'Recursos financeiros e estrutura mais robustos' },
      ],
    },
    {
      id: 7,
      question: 'O quanto a sua solução é reconhecida em seu setor ou mercado?',
      type: 'radio',
      options: [
        { value: 'unknown', label: 'Ainda não é conhecida' },
        { value: 'some-visibility', label: 'Tem algum reconhecimento' },
        { value: 'lost-relevance', label: 'Já foi mais conhecida, mas perdeu espaço' },
        { value: 'reference', label: 'É uma referência reconhecida' },
      ],
    },
    {
      id: 9,
      question: 'Se puder, descreva melhor a sua ideia, negócio ou produto.',
      type: 'textarea',
      optional: true,
      maxLength: 300,
      helperText: 'Quanto mais completo, melhor será o diagnóstico.',
    },
  ],

  // ROTA OPERACAO - Foco em margem, métrica, dependência, eficiência
  'operacao': [
    {
      id: 3,
      question: 'O que mais está dificultando o avanço do negócio hoje?',
      type: 'radio',
      options: [
        { value: 'traffic', label: 'Poucos clientes chegando (tráfego)' },
        { value: 'conversion', label: 'Pessoas demonstram interesse, mas poucas compram (conversão)' },
        { value: 'margin', label: 'Custo operacional alto ou margem muito baixa' },
        { value: 'operation', label: 'Operação desorganizada ou ineficiente' },
        { value: 'positioning', label: 'Falta de diferencial claro no mercado (posicionamento)' },
        { value: 'clarity', label: 'Crescimento sem clareza ou direção' },
      ],
    },
    {
      id: 4,
      question: 'Quanto tempo é dedicado ao negócio hoje?',
      type: 'radio',
      options: [
        { value: 'part-time', label: 'Parcialmente (tenho outro trabalho ou atividade principal)' },
        { value: 'full-time', label: 'Integralmente (dedicação total ao negócio)' },
        { value: 'shared', label: 'Compartilhado com sócio(s)' },
        { value: 'team', label: 'Existe uma equipe envolvida' },
      ],
    },
    {
      id: 5,
      question: 'O negócio depende muito do fundador para funcionar?',
      type: 'radio',
      options: [
        { value: 'high-dependency', label: 'Sim, tudo passa pelo fundador' },
        { value: 'some-dependency', label: 'Depende do fundador, mas algumas atividades já são feitas por outras pessoas' },
        { value: 'low-dependency', label: 'O negócio funciona mesmo sem o fundador no dia a dia' },
      ],
    },
    {
      id: 6,
      question: 'Quais recursos estão disponíveis hoje para fazer o negócio crescer?',
      type: 'radio',
      options: [
        { value: 'none', label: 'Praticamente nenhum recurso disponível' },
        { value: 'time-ideas', label: 'Tempo e capacidade de execução, mas pouco dinheiro' },
        { value: 'some-capital', label: 'Algum capital disponível para investir' },
        { value: 'significant', label: 'Recursos financeiros e estrutura mais robustos' },
      ],
    },
    {
      id: 7,
      question: 'Qual é a posição do negócio no mercado hoje?',
      type: 'radio',
      options: [
        { value: 'unknown', label: 'Ainda não é conhecido' },
        { value: 'some-visibility', label: 'Tem alguma visibilidade' },
        { value: 'lost-relevance', label: 'Já teve mais visibilidade, mas perdeu espaço' },
        { value: 'reference', label: 'É uma referência reconhecida' },
      ],
    },
    {
      id: 9,
      question: 'Se puder, descreva melhor o seu negócio.',
      type: 'textarea',
      optional: true,
      maxLength: 300,
      helperText: 'Quanto mais contexto, melhor será o diagnóstico.',
    },
  ],

  // ROTA CRESCIMENTO - Foco em gargalo, escala, foco, alavanca
  'crescimento': [
    {
      id: 3,
      question: 'Na sua opinião, o que falta para o seu negócio crescer?',
      type: 'radio',
      options: [
        { value: 'traffic', label: 'Melhorar o produto ou serviço' },
        { value: 'conversion', label: 'Aumentar marketing e visibilidade' },
        { value: 'margin', label: 'Fortalecer vendas ou negociação' },
        { value: 'operation', label: 'Criar parcerias ou integrações' },
        { value: 'focus', label: 'Aumentar eficiência operacional' },
        { value: 'resources', label: 'Ainda não está claro' },
      ],
    },
    {
      id: 4,
      question: 'Você tem uma métrica clara de sucesso?',
      type: 'radio',
      options: [
        { value: 'no-metric', label: 'Não, não tenho clareza' },
        { value: 'intuitive', label: 'Intuição, sem dados claros' },
        { value: 'one-metric', label: 'Uma métrica principal acompanhada' },
        { value: 'dashboard', label: 'Múltiplas métricas em dashboard' },
      ],
    },
    {
      id: 5,
      question: 'Quais recursos estão disponíveis hoje para fazer o negócio crescer?',
      type: 'radio',
      options: [
        { value: 'none', label: 'Praticamente nenhum recurso disponível' },
        { value: 'time-ideas', label: 'Tempo e capacidade de execução, mas pouco dinheiro' },
        { value: 'some-capital', label: 'Algum capital disponível para investir' },
        { value: 'significant', label: 'Recursos financeiros e estrutura mais robustos' },
      ],
    },
    {
      id: 6,
      question: 'Quais recursos estão disponíveis hoje para escalar?',
      type: 'radio',
      options: [
        { value: 'none', label: 'Praticamente nenhum recurso disponível' },
        { value: 'time-ideas', label: 'Tempo e capacidade de execução, mas pouco dinheiro' },
        { value: 'some-capital', label: 'Algum capital disponível para investir' },
        { value: 'significant', label: 'Recursos financeiros e estrutura mais robustos' },
      ],
    },
    {
      id: 7,
      question: 'Como o seu negócio se posiciona em relação aos concorrentes hoje?',
      type: 'radio',
      options: [
        { value: 'commodity', label: 'É muito parecido com outros, difícil se diferenciar' },
        { value: 'feature-parity', label: 'É similar à maioria dos concorrentes' },
        { value: 'some-advantage', label: 'Tem algum diferencial percebido' },
        { value: 'clear-advantage', label: 'Tem um diferencial claro e reconhecido' },
      ],
    },
    {
      id: 9,
      question: 'Se puder, descreva melhor o seu desafio de crescimento.',
      type: 'textarea',
      optional: true,
      maxLength: 300,
      helperText: 'Quanto mais contexto, melhor será o diagnóstico.',
    },
  ],
}

// FUNÇÃO PARA EXTRAIR AS 4 DIMENSÕES PRINCIPAIS DAS RESPOSTAS
const extractMainDimensions = (answers: Record<number | string, string>) => {
  // Mapeamentos de valores para rótulos legíveis
  const rotaMap: Record<string, string> = {
    'ideia': 'Apenas uma ideia, ainda não colocada em prática',
    'operacao': 'Negócio rodando, com clientes ou faturamento',
    'crescimento': 'Negócio rodando, mas com pouco crescimento',
  }

  const tipoOperacaoMap: Record<string, string> = {
    'local-physical': 'Negócio físico/local (ex: loja, restaurante, clínica, outros)',
    'digital': 'Negócio digital (ex: curso online, software, app, conteúdo pago)',
    'professional-service': 'Serviço profissional ou consultoria',
    'physical-product': 'Produto físico (marca própria, indústria, e-commerce)',
    'experimental': 'Projeto experimental ou protótipo (inovação)',
    'undefined': 'Ainda não sei definir claramente',
  }

  // Dimensão 1: Maturidade do negócio ou projeto (pergunta 1)
  const maturidade = answers[1] ? rotaMap[answers[1]] || answers[1] : ''

  // Dimensão 2: Tipo de negócio ou operação (pergunta 2)
  const tipoOperacao = answers[2] ? tipoOperacaoMap[answers[2]] || answers[2] : ''

  // Dimensão 3: Situação atual / estágio do negócio (pergunta 3 da rota)
  // Para IDEIA: O que a sua ideia ou negócio quer resolver primeiro?
  const valorIdeiaMap: Record<string, string> = {
    'reduce-cost': 'Reduzir custos dos clientes',
    'avoid-losses': 'Diminuir perdas ou problemas recorrentes',
    'increase-sales': 'Ajudar clientes a vender mais (vendas)',
    'save-time': 'Economizar tempo dos clientes',
    'personal-pain': 'Resolver um problema pessoal que eu mesmo experienciei',
    'other': 'Nenhuma das opções acima',
  }

  // Para OPERACAO: O que mais está dificultando o avanço do negócio hoje?
  const gargaloOperacaoMap: Record<string, string> = {
    'traffic': 'Poucos clientes chegando (tráfego)',
    'conversion': 'Pessoas demonstram interesse, mas poucas compram (conversão)',
    'margin': 'Custo operacional alto ou margem muito baixa',
    'operation': 'Operação desorganizada ou ineficiente',
    'positioning': 'Falta de diferencial claro no mercado (posicionamento)',
    'clarity': 'Crescimento sem clareza ou direção',
  }

  // Para CRESCIMENTO: Na sua opinião, o que falta para o seu negócio crescer?
  const gargaloCrescimentoMap: Record<string, string> = {
    'traffic': 'Melhorar o produto ou serviço',
    'conversion': 'Aumentar marketing e visibilidade',
    'margin': 'Fortalecer vendas ou negociação',
    'operation': 'Criar parcerias ou integrações',
    'focus': 'Aumentar eficiência operacional',
    'resources': 'Ainda não está claro',
  }

  let situacaoAtual = ''
  let situacaoLabel = ''

  const rota = answers[1]
  const pergunta3Value = answers[3]

  if (rota === 'ideia' && pergunta3Value) {
    situacaoAtual = valorIdeiaMap[pergunta3Value] || pergunta3Value
    situacaoLabel = 'O que a ideia quer resolver'
  } else if (rota === 'operacao' && pergunta3Value) {
    situacaoAtual = gargaloOperacaoMap[pergunta3Value] || pergunta3Value
    situacaoLabel = 'O que está dificultando o avanço'
  } else if (rota === 'crescimento' && pergunta3Value) {
    situacaoAtual = gargaloCrescimentoMap[pergunta3Value] || pergunta3Value
    situacaoLabel = 'O que falta para crescer'
  }

  let principalDesafio = ''
  let desafioLabel = ''

  const validacaoMap: Record<string, string> = {
    'just-idea': 'Apenas testei o interesse com pessoas próximas',
    'validated-pain': 'Coletei contatos de pessoas interessadas',
    'tested-minimal': 'Teste mínimo realizado',
    'running-no-results': 'Estou testando a solução, mas sem resultados claros até o momento',
    'has-results': 'Já tive sinais positivos reais',
    'other': 'Nenhuma das opções acima',
  }

  const dependenciaMap: Record<string, string> = {
    'high-dependency': 'Sim, tudo passa pelo fundador',
    'some-dependency': 'Depende do fundador, mas algumas atividades já são feitas por outras pessoas',
    'low-dependency': 'O negócio funciona mesmo sem o fundador no dia a dia',
  }

  const metricaMap: Record<string, string> = {
    'no-metric': 'Não, não tenho clareza',
    'intuitive': 'Intuição, sem dados claros',
    'one-metric': 'Uma métrica principal acompanhada',
    'dashboard': 'Múltiplas métricas em dashboard',
  }

  if (rota === 'ideia' && answers[5]) {
    principalDesafio = validacaoMap[answers[5]] || answers[5]
    desafioLabel = 'Tipo de validação realizada'
  } else if (rota === 'operacao' && answers[5]) {
    principalDesafio = dependenciaMap[answers[5]] || answers[5]
    desafioLabel = 'Dependência do fundador'
  } else if (rota === 'crescimento' && answers[4]) {
    principalDesafio = metricaMap[answers[4]] || answers[4]
    desafioLabel = 'Métrica de sucesso'
  }

  // Dimensão 4: Principal desafio ou ponto de bloqueio
  // Para IDEIA: O que já foi feito até agora para testar essa ideia?
  // Para OPERACAO: O negócio depende muito do fundador para funcionar?
  // Para CRESCIMENTO: Você tem uma métrica clara de sucesso?

  return {
    dimensoes: [
      {
        label: 'Maturidade do negócio ou projeto',
        valor: maturidade,
      },
      {
        label: 'Tipo de negócio ou operação',
        valor: tipoOperacao,
      },
      {
        label: situacaoLabel || 'Situação atual do negócio',
        valor: situacaoAtual,
      },
      {
        label: desafioLabel || 'Principal desafio',
        valor: principalDesafio,
      },
    ],
  }
}

const SUBROTA_QUESTIONS: Record<string, { id: string; question: string; type: string; options: Array<{ value: string; label: string }> }> = {
  'operacao_local-physical': {
    id: 'local-physical-situation',
    question: 'Qual dessas situações descreve melhor o momento atual do negócio?',
    type: 'radio',
    options: [
      { value: 'tight-margin', label: 'O negócio funciona, mas a margem é muito baixa ou imprevisível' },
      { value: 'stagnant-growth', label: 'Há movimento de clientes, mas o crescimento é baixo' },
      { value: 'disorganized', label: 'Existe demanda, mas a operação é desorganizada' },
      { value: 'dependent-founder', label: 'O negócio depende muito do fundador para funcionar' },
      { value: 'healthy-no-plan', label: 'O negócio está saudável, mas sem um plano claro de expansão' },
      { value: 'unclear', label: 'Ainda não consigo avaliar com clareza' },
    ],
  },
  'operacao_professional-service': {
    id: 'servico-situation',
    question: 'Qual dessas situações descreve melhor o momento atual do serviço?',
    type: 'radio',
    options: [
      { value: 'sales-difficult', label: 'Tenho dificuldade em vender ou fechar contratos' },
      { value: 'operation-overloaded', label: 'Consigo clientes, mas a operação é desorganizada ou sobrecarregada' },
      { value: 'founder-dependent', label: 'Tudo depende do fundador para funcionar' },
      { value: 'no-scale', label: 'O serviço funciona, mas é difícil crescer (escalar)' },
      { value: 'healthy-no-direction', label: 'O serviço é saudável, mas não há clareza de crescimento' },
      { value: 'unclear-evaluation', label: 'Ainda não consigo avaliar com clareza' },
    ],
  },
  'operacao_digital': {
    id: 'digital-situation',
    question: 'Qual dessas situações descreve melhor o momento atual do negócio digital?',
    type: 'radio',
    options: [
      { value: 'low-conversion', label: 'Tenho acessos ao site, mas poucas vendas (tráfego / conversão)' },
      { value: 'unstable-revenue', label: 'Há vendas, mas a receita é instável' },
      { value: 'no-market-fit', label: 'O produto existe, mas ainda não encontrou mercado' },
      { value: 'launch-dependent', label: 'Os resultados dependem de esforços pontuais (lançamentos)' },
      { value: 'no-sustainable-scale', label: 'O negócio funciona, mas é difícil crescer (escalar)' },
      { value: 'unclear-evaluation', label: 'Ainda não consigo avaliar com clareza' },
    ],
  },
  'operacao_physical-product': {
    id: 'physical-product-situation',
    question: 'Qual dessas situações descreve melhor o momento atual do produto físico?',
    type: 'radio',
    options: [
      { value: 'development', label: 'Produto ainda em desenvolvimento ou protótipo' },
      { value: 'market-validation', label: 'Produto pronto, mas com dificuldade de aceitação no mercado (validação)' },
      { value: 'high-costs', label: 'Produto validado, mas com custo alto ou margem muito baixa' },
      { value: 'scale-limited', label: 'Produto vende, mas é difícil crescer (escalar)' },
      { value: 'logistics-disorganized', label: 'Produção ou logística desorganizada' },
      { value: 'unclear-problem', label: 'Ainda não tenho clareza sobre o principal problema' },
    ],
  },
  'operacao_experimental': {
    id: 'experimental-situation',
    question: 'Qual dessas situações descreve melhor o estágio atual do projeto experimental?',
    type: 'radio',
    options: [
      { value: 'initial-idea', label: 'Apenas uma ideia, ainda muito inicial' },
      { value: 'concept-untested', label: 'Existe um conceito claro, mas sem teste real' },
      { value: 'prototype-unvalidated', label: 'Existe um protótipo ou MVP, mas sem validação consistente' },
      { value: 'tests-inconclusive', label: 'Já houve testes ou pilotos, mas os resultados são inconclusivos' },
      { value: 'resource-blocked', label: 'O projeto mostrou potencial, mas está travado por falta de recursos' },
      { value: 'viability-doubt', label: 'Tenho dificuldade em saber se isso é realmente um bom negócio' },
    ],
  },
}

const handleAnswer = (value: string) => {
  // Implement handleAnswer logic here
}

export function QuizSection() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number | string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [diagnosis, setDiagnosis] = useState<DiagnosisResultType | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Determinar rota baseado nas respostas
  const getRota = (): 'ideia' | 'operacao' | 'crescimento' | null => {
    if (!answers[1]) return null
    return answers[1] as 'ideia' | 'operacao' | 'crescimento'
  }

  // Gerar lista dinâmica de perguntas
  const getDynamicQuestionList = () => {
    const rota = getRota()
    let questions = [...FIXED_QUESTIONS]
    
    if (rota) {
      questions = [...questions, ...(DYNAMIC_QUESTIONS[rota] || [])]
      
      // Adicionar pergunta de subrota APENAS se rota = operacao
      const tipoOp = answers[2]
      if (rota === 'operacao' && tipoOp && SUBROTA_QUESTIONS[`operacao_${tipoOp}`]) {
        questions = [...questions, SUBROTA_QUESTIONS[`operacao_${tipoOp}`] as any]
      }
    }
    
    return questions
  }

  const dynamicQuestions = getDynamicQuestionList()
  const currentQuestion = dynamicQuestions[currentQuestionIndex]
  const totalQuestions = dynamicQuestions.length

  // VALIDAÇÃO: Garantir que não há IDs duplicados na lista de perguntas
  const questionIds = dynamicQuestions.map(q => q.id)
  const hasDuplicateIds = new Set(questionIds).size !== questionIds.length
  
  if (hasDuplicateIds) {
    console.error('[v0] BUG DETECTADO: IDs duplicados nas perguntas!', questionIds)
    // Log dos duplicados
    const seen = new Set()
    const duplicates = questionIds.filter(id => {
      if (seen.has(id)) return true
      seen.add(id)
      return false
    })
    console.error('[v0] IDs duplicados:', duplicates)
  }

  // Calcular stage número (1-9) para etapas fixas
  // As 9 etapas são: Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q9, Resultado
  const getStageNumber = (): number => {
    if (!currentQuestion) return 1
    const questionId = currentQuestion.id
    
    // Mapear IDs de perguntas para números de etapa (1-9)
    if (questionId === 1) return 1
    if (questionId === 2) return 2
    if (questionId === 3) return 3
    if (questionId === 4) return 4
    if (questionId === 5) return 5
    if (questionId === 6) return 6
    if (questionId === 7) return 7
    if (questionId === 9 || typeof questionId === 'string') return 8 // Q9 ou subrota
    return 8
  }

  const currentStage = getStageNumber()
  const progress = (currentStage / 9) * 100

  const isAnswered = currentQuestion?.type === 'radio' 
    ? currentQuestion?.id in answers
    : true

  const handleAnswer = (value: string) => {
    // Se a pergunta é Q2 (tipo de negócio), precisa resetar a subrota anterior
    if (currentQuestion?.id === 2 && answers[2] !== value) {
      // Q2 está mudando - remover a subrota anterior da lista de answers
      const oldQ2 = answers[2]
      if (oldQ2 && SUBROTA_QUESTIONS[`operacao_${oldQ2}`]) {
        const subroteId = SUBROTA_QUESTIONS[`operacao_${oldQ2}`].id
        // Remover a resposta da subrota antiga
        setAnswers((prev) => {
          const newAnswers = { ...prev }
          delete newAnswers[subroteId]
          return newAnswers
        })
      }
    }
    
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
    handleNext()
  }

  const handleNext = () => {
    // Validação de segurança: verificar se a lista de perguntas ainda é válida
    const updatedQuestions = getDynamicQuestionList()
    const maxIndex = updatedQuestions.length - 1
    
    if (currentQuestionIndex >= maxIndex) {
      // Última pergunta - gerar diagnóstico
      generateDiagnosis()
    } else {
      // Avançar para próxima
      const nextIndex = Math.min(currentQuestionIndex + 1, maxIndex)
      setCurrentQuestionIndex(nextIndex)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const generateDiagnosis = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const variables = mapAnswersToVariables(answers)
    const result = getDiagnosis(variables)
    
    // Generate session ID and save to localStorage
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const quizData = {
      sessionId,
      quiz_answers: answers,
      diagnostico_final: result.id,
      finished_at: new Date().toISOString(),
      quiz_version: 'v1',
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizData', JSON.stringify(quizData))
      
      // Send invisibly to free quiz logging endpoint (fire and forget)
      const q2Value = answers[2] || ''
      
      const payload: Record<string, string> = {
        sessionId: quizData.sessionId,
        quizVersion: quizData.quiz_version,
        finishedAt: quizData.finished_at,
        diagnosticoFinal: quizData.diagnostico_final,
        q1: answers[1] || '',
        q2: q2Value,
        q3: answers[3] || '',
        q4: answers[4] || '',
        q5: answers[5] || '',
        q6: answers[6] || '',
        q7: answers[7] || '',
        q9: answers[9] || '',
        localPhysicalSituation: answers['local-physical-situation'] || '',
        servicoSituation: answers['servico-situation'] || '',
        digitalSituation: answers['digital-situation'] || '',
        physicalProductSituation: answers['physical-product-situation'] || '',
        experimentalSituation: answers['experimental-situation'] || '',
      }
      
      fetch('https://script.google.com/macros/s/AKfycbwTI63clnomIZIfEXD3JhIy-JUJfL_Gx1JMceewLLdvy-TthwWXPvF5X5g8orvy1Vv_/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
      }).catch(() => {
        // Silent failure - fire and forget
      })
    }
    
    setDiagnosis(result)
    setIsProcessing(false)
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setDiagnosis(null)
    setIsProcessing(false)
  }

  // Show processing
  if (isProcessing) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20">
        <Card className="w-full max-w-2xl border-slate-200/50 rounded-xl shadow-sm">
          <CardHeader className="text-center border-b border-slate-200/40 pb-8">
            <CardTitle className="text-3xl font-bold text-foreground">Diagnóstico em Processamento</CardTitle>
            <CardDescription className="text-slate-600 font-medium pt-3">Suas respostas foram enviadas com sucesso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 text-center pt-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            </div>
            <p className="text-slate-600 font-medium max-w-sm mx-auto">
              Estamos analisando sua ideia com base em nossa metodologia propriedária...
            </p>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-700">Processando análise</p>
              <Progress value={75} className="h-2 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  // Show diagnosis
  if (diagnosis) {
    const mainDimensions = extractMainDimensions(answers)
    return (
      <DiagnosisResultComponent
        diagnosis={diagnosis}
        descricaoIdeia={answers[9] || ''}
        mainDimensions={mainDimensions.dimensoes}
        onRestart={handleRestart}
      />
    )
  }

  if (!currentQuestion) {
    // Fallback: sempre deve ter pelo menos 2 perguntas fixas
    return null
  }

  // AUDITORIA DE BUG: Garantir que apenas UMA pergunta está ativa
  // Verificar se currentQuestion é o único objeto a ser renderizado
  console.log('[v0] QUIZ STATE AUDIT:', {
    currentQuestionIndex,
    totalQuestions,
    currentQuestionId: currentQuestion?.id,
    currentQuestionType: currentQuestion?.type,
    rota: getRota(),
    tipoOperacao: answers[2],
    subroteId: answers[2] ? `operacao_${answers[2]}` : null,
    subroteExists: answers[2] && SUBROTA_QUESTIONS[`operacao_${answers[2]}`] ? true : false,
    answersCount: Object.keys(answers).length,
  })

  return (
    <section id="diagnostico" className="flex flex-col items-center justify-start gap-2 px-4 py-2 md:py-3 pt-4 md:pt-6 bg-background">
      <div className="w-full max-w-2xl space-y-2">
        {/* Quiz Header */}
        <div className="space-y-2">
          <div className="flex justify-center mb-0">
            <Image
              src="/visao-real-symbol.png"
              alt="Visão Real"
              width={132}
              height={132}
              className="opacity-90"
              priority
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold leading-snug text-foreground text-balance tracking-tight">
                Diagnóstico gratuito
              </h2>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Etapa {currentStage} de 9
              </span>
            </div>
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
        </div>

        {/* Question Card */}
        <Card ref={cardRef} className="border border-slate-200/50 shadow-sm rounded-xl overflow-hidden mt-2">
          <CardHeader className="pb-4 pt-6 px-6 md:px-8 border-b border-slate-200/40">
            <CardTitle className="text-xl md:text-2xl font-bold leading-snug text-foreground text-balance tracking-tight">
              {currentQuestion.question}
            </CardTitle>
            {currentQuestion.type === 'textarea' && currentQuestion.optional && (
              <CardDescription className="text-xs font-semibold text-slate-600 uppercase tracking-wide pt-3">
                Opcional
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="pt-5 px-6 md:px-8 pb-5">
            {currentQuestion.type === 'radio' ? (
              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onValueChange={handleAnswer}
              >
                <div className="space-y-1">
                  {currentQuestion.options?.map((option) => (
                    <div
                      key={option.value}
                      className={`group flex items-center space-x-3 rounded-lg border-2 bg-white p-3 cursor-pointer transition-all duration-150 ${
                        answers[currentQuestion.id] === option.value
                          ? 'border-blue-500 bg-blue-50 shadow-sm'
                          : 'border-slate-300 hover:border-blue-400 hover:bg-blue-50/40'
                      }`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`option-${option.value}`}
                        className="border-slate-300 text-blue-600"
                      />
                      <Label
                        htmlFor={`option-${option.value}`}
                        className="flex-1 cursor-pointer font-medium text-sm text-foreground leading-relaxed transition-colors"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                <Textarea
                  placeholder="Descreva aqui..."
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => setAnswers(prev => ({
                    ...prev,
                    [currentQuestion.id]: e.target.value.slice(0, currentQuestion.maxLength || 300)
                  }))}
                  maxLength={currentQuestion.maxLength || 300}
                  className="min-h-32 rounded-lg border-slate-200/60 text-foreground placeholder:text-slate-400 focus:border-blue-300 focus:ring-blue-100"
                />
                {currentQuestion.helperText && (
                  <p className="text-sm font-bold italic text-primary">
                    {currentQuestion.helperText}
                  </p>
                )}
                {currentQuestion.maxLength && (
                  <p className="text-xs text-slate-400 text-right">
                    {(answers[currentQuestion.id] || '').length} / {currentQuestion.maxLength}
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Microtextos de continuidade entre blocos */}
        {currentStage === 2 && (
          <div className="text-center pt-2 pb-2">
            <p className="text-sm font-bold italic text-primary">
              Estamos organizando suas respostas para indicar o próximo passo.
            </p>
          </div>
        )}

        {currentStage === 5 && (
          <div className="text-center pt-2 pb-2">
            <p className="text-sm font-bold italic text-primary">
              Essas respostas ajudam a transformar reflexão em decisão.
            </p>
          </div>
        )}

        {currentStage === 7 && (
          <div className="text-center pt-2 pb-2">
            <p className="text-sm font-bold italic text-primary">
              Falta pouco para concluir o diagnóstico.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-2 sm:justify-center pt-6">
          {currentQuestionIndex > 0 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="sm:flex-1 sm:max-w-xs rounded-lg border-slate-200/80 hover:bg-slate-50 transition-colors bg-transparent"
            >
              ← Anterior
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id] && !currentQuestion.optional}
            className="sm:flex-1 sm:max-w-xs rounded-lg font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Gerar Diagnóstico' : 'Próxima →'}
          </Button>
        </div>
      </div>
    </section>
  )
}
