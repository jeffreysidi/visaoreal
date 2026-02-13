'use client'

interface InternalVariables {
  rota_principal: string
  maturidade_negocio: string
  tipo_operacao: string
  operacao_local_situacao: string
  servico_situacao_atual: string
  digital_situacao_atual: string
  produto_fisico_situacao: string
  projeto_experimental_situacao: string
  tipo_dor: string
  tipo_produto_negocio: string
  modelo_operacao: string
  publico_principal: string
  estagio_atual: string
  principal_duvida: string
  nivel_recursos: string
  nivel_autoridade: string
  descricao_ideia: string
}

export interface DiagnosisResult {
  id: string
  titulo: string
  leitura: string
  significadoPratico: string
  caminhoRecomendado: string
  icone?: string
}

export function mapAnswersToVariables(answers: Record<number | string, string>): InternalVariables {
  // Determinar rota principal (IDEIA, OPERACAO, CRESCIMENTO)
  const rotaPrincipal = answers[1] === 'ideia' ? 'ideia' : 
                        answers[1] === 'operacao' ? 'operacao' : 
                        answers[1] === 'crescimento' ? 'crescimento' : 'indefinido'

  const maturidadeNegocioMap: Record<string, string> = {
    'ideia': 'IDEIA',
    'operacao': 'OPERACAO',
    'crescimento': 'CRESCIMENTO',
  }

  const tipoOperacaoMap: Record<string, string> = {
    'local-physical': 'LOCAL',
    'digital': 'DIGITAL',
    'professional-service': 'SERVICO',
    'physical-product': 'PRODUTO_FISICO',
    'experimental': 'EXPERIMENTAL',
    'undefined': 'INDEFINIDO',
  }

  // Mapeamentos das perguntas condicionais (OPERACAO apenas)
  const operacaoLocalSituacaoMap: Record<string, string> = {
    'tight-margin': 'margem_baixa',
    'stagnant-growth': 'estagnado',
    'disorganized': 'operacao_desorganizada',
    'dependent-founder': 'dependencia_fundador',
    'healthy-no-plan': 'saudavel_sem_expansao',
    'unclear': 'sem_clareza',
  }

  const servicoSituacaoAtualMap: Record<string, string> = {
    'sales-difficult': 'vendas_dificeis',
    'operation-overloaded': 'operacao_sobrecarregada',
    'founder-dependent': 'dependencia_fundador',
    'no-scale': 'sem_escala',
    'healthy-no-direction': 'saudavel_sem_direcao',
    'unclear-evaluation': 'sem_clareza',
  }

  const digitalSituacaoAtualMap: Record<string, string> = {
    'low-conversion': 'baixa_conversao',
    'unstable-revenue': 'receita_instavel',
    'no-market-fit': 'sem_product_market_fit',
    'launch-dependent': 'dependencia_lancamentos',
    'no-sustainable-scale': 'sem_escala',
    'unclear-evaluation': 'sem_clareza',
  }

  const produtoFisicoSituacaoMap: Record<string, string> = {
    'development': 'prototipo',
    'market-validation': 'validacao_dificil',
    'high-costs': 'margem_baixa',
    'scale-limited': 'escala_travada',
    'logistics-disorganized': 'producao_desorganizada',
    'unclear-problem': 'sem_clareza',
  }

  const projetoExperimentalSituacaoMap: Record<string, string> = {
    'initial-idea': 'ideia_inicial',
    'concept-untested': 'conceito_sem_teste',
    'prototype-unvalidated': 'prototipo_sem_validacao',
    'tests-inconclusive': 'testes_inconclusivos',
    'resource-blocked': 'falta_recursos',
    'viability-doubt': 'duvida_viabilidade',
  }

  // Capturar respostas das subrotas (apenas para OPERACAO)
  let operacao_local_situacao = ''
  let servico_situacao_atual = ''
  let digital_situacao_atual = ''
  let produto_fisico_situacao = ''
  let projeto_experimental_situacao = ''

  if (rotaPrincipal === 'operacao') {
    const tipoOp = answers[2]
    if (tipoOp === 'local-physical' && answers['local-physical-situation']) {
      operacao_local_situacao = operacaoLocalSituacaoMap[answers['local-physical-situation']] || 'sem_clareza'
    } else if (tipoOp === 'professional-service' && answers['servico-situation']) {
      servico_situacao_atual = servicoSituacaoAtualMap[answers['servico-situation']] || 'sem_clareza'
    } else if (tipoOp === 'digital' && answers['digital-situation']) {
      digital_situacao_atual = digitalSituacaoAtualMap[answers['digital-situation']] || 'sem_clareza'
    } else if (tipoOp === 'physical-product' && answers['physical-product-situation']) {
      produto_fisico_situacao = produtoFisicoSituacaoMap[answers['physical-product-situation']] || 'sem_clareza'
    } else if (tipoOp === 'experimental' && answers['experimental-situation']) {
      projeto_experimental_situacao = projetoExperimentalSituacaoMap[answers['experimental-situation']] || 'duvida_viabilidade'
    }
  }

  // Mapa de tipo de dor (IDEIA e CRESCIMENTO)
  const tipoDorMap: Record<string, string> = {
    'reduce-cost': 'eficiencia_financeira',
    'avoid-losses': 'mitigacao_risco',
    'increase-sales': 'crescimento_receita',
    'save-time': 'eficiencia_operacional',
    'personal-pain': 'dor_pessoal',
    'other': 'indefinido',
  }

  // Determinar tipo de dor e principal dúvida conforme rota
  let tipoDor = 'indefinido'
  let principalDuvida = 'clarity'

  if (rotaPrincipal === 'operacao') {
    // Pergunta 3 é gargalo para OPERACAO
    const gargaloMap: Record<string, string> = {
      'traffic': 'trafego',
      'conversion': 'conversao',
      'margin': 'margem',
      'operation': 'operacao',
      'positioning': 'posicionamento',
      'clarity': 'clarity',
    }
    principalDuvida = gargaloMap[answers[3]] || 'clarity'
  } else if (rotaPrincipal === 'ideia') {
    // Pergunta 3 é dor para IDEIA
    tipoDor = tipoDorMap[answers[3]] || 'indefinido'
  } else if (rotaPrincipal === 'crescimento') {
    // Pergunta 3 é gargalo para CRESCIMENTO
    const gargaloGrowthMap: Record<string, string> = {
      'traffic': 'trafego',
      'conversion': 'conversao',
      'margin': 'margem',
      'operation': 'operacao',
      'focus': 'foco',
      'resources': 'resources',
    }
    principalDuvida = gargaloGrowthMap[answers[3]] || 'clarity'
  }

  // Mapa de público principal
  const publicoPrincipalMap: Record<string, string> = {
    'consumer': 'consumidor',
    'small-business': 'pme',
    'enterprise': 'corporativo',
    'niche': 'nicho',
    'unclear': 'indefinido',
  }

  // Mapa de recursos
  const nivelRecursosMap: Record<string, string> = {
    'none': 'baixo',
    'time-ideas': 'tempo',
    'some-capital': 'capital_moderado',
    'significant': 'alto',
  }

  // Mapa de autoridade/visibilidade
  const nivelAutoridadeMap: Record<string, string> = {
    'unknown': 'nenhuma',
    'some-visibility': 'baixa',
    'lost-relevance': 'declinante',
    'reference': 'alta',
  }

  // Determinar índices de perguntas conforme rota
  let idxRecursos = 6
  let idxAutoridade = 7
  let idxDescricao = 9

  if (rotaPrincipal === 'operacao') {
    idxRecursos = 6
    idxAutoridade = 7
    idxDescricao = 9
  }

  return {
    rota_principal: rotaPrincipal,
    maturidade_negocio: maturidadeNegocioMap[answers[1]] || 'INDEFINIDO',
    tipo_operacao: tipoOperacaoMap[answers[2]] || 'INDEFINIDO',
    operacao_local_situacao,
    servico_situacao_atual,
    digital_situacao_atual,
    produto_fisico_situacao,
    projeto_experimental_situacao,
    tipo_dor: tipoDor,
    tipo_produto_negocio: tipoOperacaoMap[answers[2]] || 'indefinido',
    modelo_operacao: rotaPrincipal,
    publico_principal: publicoPrincipalMap[answers[4]] || 'indefinido',
    estagio_atual: rotaPrincipal === 'ideia' ? 'ideacao' : rotaPrincipal === 'crescimento' ? 'tracao_inicial' : 'operacao_sem_tracao',
    principal_duvida: principalDuvida,
    nivel_recursos: nivelRecursosMap[answers[idxRecursos]] || 'baixo',
    nivel_autoridade: nivelAutoridadeMap[answers[idxAutoridade]] || 'nenhuma',
    descricao_ideia: answers[idxDescricao] || '',
  }
}

const DIAGNOSES: Record<number, DiagnosisResult> = {
  1: {
    id: 'D01',
    titulo: 'Ideia ainda pouco definida',
    leitura: 'Sua proposta existe, mas ainda não está estruturada como uma solução clara.',
    significadoPratico: 'Investir agora tende a gerar retrabalho e mudanças constantes.',
    caminhoRecomendado: 'Defina problema específico, público claro e promessa simples antes de executar.',
    icone: '💡',
  },
  2: {
    id: 'D02',
    titulo: 'Problema claro, solução genérica',
    leitura: 'A dor existe, mas a solução ainda é ampla demais.',
    significadoPratico: 'Isso dificulta diferenciação e decisão de compra.',
    caminhoRecomendado: 'Faça um recorte claro de público, contexto e benefício principal.',
    icone: '🎯',
  },
  3: {
    id: 'D03',
    titulo: 'Boa ideia sem validação prática',
    leitura: 'A lógica faz sentido, mas ainda não houve teste real.',
    significadoPratico: 'Existe risco de investir em algo que só funciona no papel.',
    caminhoRecomendado: 'Teste comportamento real (pré-venda, lista de espera, agendamento).',
    icone: '✓',
  },
  4: {
    id: 'D04',
    titulo: 'Validação informal confundida com validação real',
    leitura: 'Feedback positivo existe, mas sem compromisso concreto.',
    significadoPratico: 'Opiniões não confirmam demanda.',
    caminhoRecomendado: 'Busque sinais de esforço real do cliente (tempo, dinheiro ou ação).',
    icone: '🤝',
  },
  5: {
    id: 'D05',
    titulo: 'Execução sem critério de sucesso',
    leitura: 'O projeto avança, mas sem métrica clara de sucesso.',
    significadoPratico: 'Fica difícil saber se está evoluindo ou apenas mudando.',
    caminhoRecomendado: 'Defina uma métrica central e um período curto de teste.',
    icone: '📊',
  },
  6: {
    id: 'D06',
    titulo: 'Operação inicial sem foco',
    leitura: 'O negócio saiu do papel, mas está disperso.',
    significadoPratico: 'Energia se perde em múltiplas frentes.',
    caminhoRecomendado: 'Eleja um eixo principal por 30 dias e pause o resto.',
    icone: '🔍',
  },
  7: {
    id: 'D07',
    titulo: 'Produto existe, mas não traciona',
    leitura: 'Há entrega, mas o mercado responde pouco.',
    significadoPratico: 'O problema tende a ser encaixe, não esforço.',
    caminhoRecomendado: 'Ajuste promessa, público ou canal — um de cada vez.',
    icone: '⚙️',
  },
  8: {
    id: 'D08',
    titulo: 'Negócio dependente do fundador',
    leitura: 'Tudo funciona, mas depende diretamente de você.',
    significadoPratico: 'Isso limita crescimento e aumenta desgaste.',
    caminhoRecomendado: 'Crie rotinas mínimas delegáveis e documentadas.',
    icone: '👤',
  },
  9: {
    id: 'D09',
    titulo: 'Negócio saudável, porém estagnado',
    leitura: 'Existe estabilidade, mas crescimento travou.',
    significadoPratico: 'O risco é permanecer anos no mesmo patamar.',
    caminhoRecomendado: 'Identifique o principal gargalo e teste uma alavanca.',
    icone: '📈',
  },
  10: {
    id: 'D10',
    titulo: 'Volume existe, margem é fraca',
    leitura: 'Vendas acontecem, mas o retorno é baixo.',
    significadoPratico: 'Crescer assim pode piorar a situação.',
    caminhoRecomendado: 'Revisar preço, mix e custos antes de escalar.',
    icone: '💰',
  },
  11: {
    id: 'D11',
    titulo: 'Produto bom, comunicação fraca',
    leitura: 'Valor existe, mas não é percebido rapidamente.',
    significadoPratico: 'O mercado não entende por que comprar.',
    caminhoRecomendado: 'Simplifique a mensagem e gere prova visível.',
    icone: '📢',
  },
  12: {
    id: 'D12',
    titulo: 'Forte tecnicamente, frágil comercialmente',
    leitura: 'Qualidade alta, conversão baixa.',
    significadoPratico: 'Complexidade vira barreira de venda.',
    caminhoRecomendado: 'Crie uma oferta simples e direta.',
    icone: '🛠️',
  },
  13: {
    id: 'D13',
    titulo: 'Muitas ideias, pouca priorização',
    leitura: 'Há visão, mas falta foco.',
    significadoPratico: 'Energia se fragmenta.',
    caminhoRecomendado: 'Escolha uma aposta por 14 dias e execute.',
    icone: '🎲',
  },
  14: {
    id: 'D14',
    titulo: 'Desejo de crescer sem base sólida',
    leitura: 'Intenção de escala antes de estrutura.',
    significadoPratico: 'Risco de perda de qualidade e caixa.',
    caminhoRecomendado: 'Fortaleça operação antes de acelerar aquisição.',
    icone: '🏗️',
  },
  15: {
    id: 'D15',
    titulo: 'Momento de decisão estratégica',
    leitura: 'O negócio não está errado, está em encruzilhada.',
    significadoPratico: 'Decisões emocionais custam caro.',
    caminhoRecomendado: 'Compare 3 caminhos possíveis e escolha um.',
    icone: '🛣️',
  },
  16: {
    id: 'D16',
    titulo: 'Pronto para otimização',
    leitura: 'Base validada, ganhos agora vêm de ajustes.',
    significadoPratico: 'Pequenas melhorias podem gerar grande impacto.',
    caminhoRecomendado: 'Trabalhe uma métrica por vez.',
    icone: '⚡',
  },
  17: {
    id: 'D17',
    titulo: 'Pronto para crescimento estruturado',
    leitura: 'Proposta validada e riscos principais enfrentados.',
    significadoPratico: 'Crescimento sem método vira desperdício.',
    caminhoRecomendado: 'Escale uma alavanca por ciclo.',
    icone: '🚀',
  },
  18: {
    id: 'D18',
    titulo: 'Ideia madura aguardando execução',
    leitura: 'Clareza existe, falta ação.',
    significadoPratico: 'Risco de perder timing.',
    caminhoRecomendado: 'Lance um MVP pequeno com prazo definido.',
    icone: '⏱️',
  },
  19: {
    id: 'D19',
    titulo: 'Negócio saudável e bem posicionado',
    leitura: 'Seu negócio resolve um problema real, está operacionalmente estável e bem posicionado para o público certo.',
    significadoPratico: 'Não há erro estrutural evidente; mudanças grandes agora tendem a aumentar risco.',
    caminhoRecomendado: 'Manter o que funciona e otimizar pontualmente com base em dados.',
    icone: '✨',
  },
  20: {
    id: 'D20',
    titulo: 'Negócio funcional que pede reposicionamento',
    leitura: 'A operação funciona, mas a percepção de valor não acompanha a entrega real.',
    significadoPratico: 'O gargalo está na comunicação, não no produto.',
    caminhoRecomendado: 'Revisar proposta de valor, mensagem e público prioritário.',
    icone: '💬',
  },
  21: {
    id: 'D21',
    titulo: 'Clareza alcançada, ação necessária',
    leitura: 'A análise já foi feita e o caminho está claro.',
    significadoPratico: 'O principal risco agora é a inércia.',
    caminhoRecomendado: 'Executar um próximo passo simples, com prazo definido.',
    icone: '⚔️',
  },
}

export function getDiagnosis(variables: InternalVariables): DiagnosisResult {
  // ============================================
  // ORDEM DE DECISÃO OBRIGATÓRIA
  // ============================================
  // 1) MATURIDADE DO NEGÓCIO
  // 2) TIPO DE OPERAÇÃO
  // 3) GARGALO PRINCIPAL
  // 4) RECURSOS + VISIBILIDADE

  const maturidade = variables.maturidade_negocio
  const tipoOp = variables.tipo_operacao
  const gargalo = variables.principal_duvida
  const recursos = variables.nivel_recursos
  const autoridade = variables.nivel_autoridade
  const estagio = variables.estagio_atual
  const dor = variables.tipo_dor

  // ============================================
  // ROTA 1 — IDEIA / PROJETO EM CONCEPÇÃO
  // ============================================
  if (maturidade === 'IDEIA' || maturidade === 'MVP' && estagio === 'ideacao') {
    // Avaliar clareza da dor
    const dorPoucoClara = dor === 'indefinido' || dor === 'dor_pessoal' || dor === 'mitigacao_risco'
    const dorMedia = dor === 'eficiencia_financeira' || dor === 'eficiencia_operacional'
    const dorAlta = dor === 'crescimento_receita'

    if (dorPoucoClara) {
      return DIAGNOSES[1] // D01: Ideia ainda pouco definida
    }

    if (dorMedia) {
      return DIAGNOSES[2] // D02: Problema claro, solução genérica
    }

    if (dorAlta && recursos === 'baixo') {
      return DIAGNOSES[3] // D03: Boa ideia sem validação prática
    }

    if (dorAlta && (recursos === 'capital_moderado' || recursos === 'alto' || recursos === 'tempo_sem_capital')) {
      return DIAGNOSES[4] // D04: Validação informal confundida com validação real
    }
  }

  // ============================================
  // ROTA 2 — NEGÓCIO EM OPERAÇÃO
  // ============================================
  if (maturidade === 'OPERACAO' && estagio === 'operacao_sem_tracao') {
    if (gargalo === 'trafego') {
      return DIAGNOSES[5] // D05: Execução sem critério de sucesso
    }

    if (gargalo === 'conversao') {
      return DIAGNOSES[6] // D06: Operação inicial sem foco
    }

    if (gargalo === 'investimento' || gargalo === 'clarity') {
      return DIAGNOSES[7] // D07: Produto existe, mas não traciona
    }
  }

  // ============================================
  // ROTA 3 — NEGÓCIO DIGITAL
  // ============================================
  if (tipoOp === 'DIGITAL') {
    if (recursos === 'baixo' && autoridade === 'nenhuma') {
      return DIAGNOSES[8] // D08: Negócio dependente do fundador
    }

    if (recursos === 'capital_moderado' && autoridade === 'nenhuma') {
      return DIAGNOSES[9] // D09: Negócio saudável, porém estagnado
    }

    if ((recursos === 'alto' || recursos === 'capital_moderado') && gargalo === 'execucao') {
      return DIAGNOSES[10] // D10: Volume existe, margem é fraca
    }
  }

  // ============================================
  // ROTA 4 — SERVIÇO / NEGÓCIO LOCAL
  // ============================================
  if (tipoOp === 'SERVICO' || tipoOp === 'LOCAL') {
    const servicoSituacao = variables.servico_situacao_atual
    const operacaoLocalSituacao = variables.operacao_local_situacao

    // Dependência do fundador alta
    if (servicoSituacao === 'dependencia_fundador' || operacaoLocalSituacao === 'dependencia_fundador') {
      return DIAGNOSES[11] // D11: Produto bom, comunicação fraca
    }

    // Operação funciona mas crescimento travado
    if (servicoSituacao === 'sem_escala' || operacaoLocalSituacao === 'estagnado') {
      return DIAGNOSES[12] // D12: Forte tecnicamente, frágil comercialmente
    }

    // Negócio está saudável
    if (servicoSituacao === 'saudavel_sem_direcao' || operacaoLocalSituacao === 'saudavel_sem_expansao') {
      return DIAGNOSES[19] // D19: Negócio saudável e bem posicionado
    }
  }

  // ============================================
  // ROTA 5 — PRODUTO FÍSICO
  // ============================================
  if (tipoOp === 'PRODUTO_FISICO') {
    const produtoFisicoSituacao = variables.produto_fisico_situacao

    // Custo estrutural alto e margem incerta
    if (produtoFisicoSituacao === 'margem_baixa' || produtoFisicoSituacao === 'producao_desorganizada') {
      return DIAGNOSES[13] // D13: Muitas ideias, pouca priorização
    }

    // Validação existe mas escala trava
    if (produtoFisicoSituacao === 'escala_travada') {
      return DIAGNOSES[14] // D14: Desejo de crescer sem base sólida
    }

    // Operação é estável mas precisa reposicionar
    if (produtoFisicoSituacao === 'validacao_dificil') {
      return DIAGNOSES[20] // D20: Negócio funcional que pede reposicionamento
    }
  }

  // ============================================
  // ROTA 6 — AVALIAÇÃO FINAL POSITIVA
  // ============================================
  // Se maturidade é operação com tração e sem gargalos críticos
  if (maturidade === 'OPERACAO' && estagio === 'tracao_inicial') {
    const gargalosCriticos = gargalo === 'clarity' || gargalo === 'execucao' || gargalo === 'investimento'

    if (!gargalosCriticos && autoridade !== 'nenhuma') {
      return DIAGNOSES[19] // D19: Negócio saudável e bem posicionado
    }

    // Se funciona mas é posicionamento
    if (gargalo === 'trafego' && (tipoOp === 'DIGITAL' || tipoOp === 'SERVICO')) {
      return DIAGNOSES[20] // D20: Negócio funcional que pede reposicionamento
    }
  }

  // ============================================
  // ROTA 7 — EXCESSO DE ANÁLISE
  // ============================================
  // Se usuário demonstra clareza alta mas continua com dúvida excessiva
  if (
    estagio === 'tracao_inicial' &&
    autoridade !== 'nenhuma' &&
    gargalo === 'clarity' &&
    recursos !== 'baixo'
  ) {
    return DIAGNOSES[21] // D21: Clareza alcançada, ação necessária
  }

  // ============================================
  // FALLBACKS ESTRUTURADOS POR ESTÁGIO
  // ============================================

  // Se está em ideação mas não bateu em nenhuma rota específica
  if (estagio === 'ideacao') {
    return DIAGNOSES[1] // D01: Ideia ainda pouco definida
  }

  // Se está em validação
  if (estagio === 'validacao') {
    return DIAGNOSES[4] // D04: Validação informal confundida com validação real
  }

  // Se está em MVP inicial
  if (estagio === 'mvp_inicial') {
    return DIAGNOSES[5] // D05: Execução sem critério de sucesso
  }

  // Se está em operação sem tração
  if (estagio === 'operacao_sem_tracao') {
    return DIAGNOSES[7] // D07: Produto existe, mas não traciona
  }

  // Se está em tração inicial
  if (estagio === 'tracao_inicial') {
    return DIAGNOSES[19] // D19: Negócio saudável e bem posicionado
  }

  // Fallback final seguro
  return DIAGNOSES[5] // D05: Execução sem critério de sucesso
}
