// MOTOR V8 - SCORING ENGINE
// Lógica de pontuação, identificação de trilhas, cálculo de níveis e moduladores

export type Trilha = 'IDEIA' | 'VALIDACAO' | 'PEQUENO' | 'ESTRUTURADA'
export type Modulador = 'AUTORIDADE_CRITICA' | 'CAPITAL_CRITICO' | 'DESORGANIZACAO'
export type FocoEstruturado = 'CLAREZA' | 'CAIXA' | 'OPERACAO' | 'AUTORIDADE_APROVEITAR'

export interface RespostasQuiz {
  P1: number | null // 1=IDEIA, 2=VALIDACAO, 3=PEQUENO, 4=ESTRUTURADA
  P2: number | null // Receita
  P3: number | null // Dificuldade
  P4: number | null // Autoridade
  P5: number | null // Capital
  P6: number | null // Organização
  P7: number | null // Clareza
}

export interface DiagnosticoResult {
  trilha: Trilha
  nivel: 1 | 2 | 3
  score: number
  moduladores: Modulador[]
  foco?: FocoEstruturado // Camada de interpretação estratégica (opcional)
  diagnosisId: string // ID único: ${trilha}_NIVEL_${nivel} (SEM foco no ID)
}

// ============================================
// 1) PESOS POR TRILHA
// ============================================

const WEIGHTS: Record<Trilha, Record<string, number>> = {
  IDEIA: { P2: 10, P3: 15, P4: 25, P5: 15, P6: 10, P7: 25 },
  VALIDACAO: { P2: 15, P3: 20, P4: 20, P5: 15, P6: 10, P7: 20 },
  PEQUENO: { P2: 25, P3: 20, P4: 15, P5: 15, P6: 15, P7: 10 },
  ESTRUTURADA: { P2: 20, P3: 15, P4: 10, P5: 15, P6: 25, P7: 15 },
}

// ============================================
// 2) IDENTIFICAÇÃO DE TRILHA
// ============================================

function getTrilha(p1: number | null): Trilha {
  if (p1 === 1) return 'IDEIA'
  if (p1 === 2) return 'VALIDACAO'
  if (p1 === 3) return 'PEQUENO'
  if (p1 === 4) return 'ESTRUTURADA'
  throw new Error('P1 inválido: ' + p1)
}

// ============================================
// 7) APLICAÇÃO DE MODULADORES
// ============================================

function calculateScore(respostas: RespostasQuiz): { score: number; trilha: Trilha } {
  const trilha = getTrilha(respostas.P1)
  const pesos = WEIGHTS[trilha]

  let score = 0

  if (respostas.P2 !== null) score += respostas.P2 * pesos.P2
  if (respostas.P3 !== null) score += respostas.P3 * pesos.P3
  if (respostas.P4 !== null) score += respostas.P4 * pesos.P4
  if (respostas.P5 !== null) score += respostas.P5 * pesos.P5
  if (respostas.P6 !== null) score += respostas.P6 * pesos.P6
  if (respostas.P7 !== null) score += respostas.P7 * pesos.P7

  return { score, trilha }
}

// ============================================
// 4) DETERMINAÇÃO DE NÍVEL (1, 2 ou 3)
// ============================================

function getNivel(score: number): 1 | 2 | 3 {
  if (score <= 180) return 1
  if (score <= 280) return 2
  return 3
}

// ============================================
// 5) REGRAS ESTRUTURAIS - FOCUS LAYER
// ============================================
// IMPORTANTE: Estas regras NÃO alteram trilha, nível ou score.
// Apenas adicionam um layer de interpretação estratégica (foco).
// ============================================

function getFocoEstruturado(respostas: RespostasQuiz, trilha: Trilha): FocoEstruturado | undefined {
  // REGRA A - CLAREZA CRÍTICA (P7 = 1) - PRIORIDADE MÁXIMA
  // Ativa modo REORGANIZAÇÃO ESTRATÉGICA apenas em caso crítico
  // (Alterado de P7 <= 2 para P7 <= 1 para reduzir viés)
  if (respostas.P7 !== null && respostas.P7 === 1) {
    return 'CLAREZA'
  }

  // REGRA B - RECEITA INSTÁVEL + CAPITAL LIMITADO (P2 <= 2 AND P5 <= 2)
  // Ativa modo SOBREVIVÊNCIA E ESTRUTURAÇÃO FINANCEIRA
  if (
    respostas.P2 !== null &&
    respostas.P5 !== null &&
    respostas.P2 <= 2 &&
    respostas.P5 <= 2
  ) {
    return 'CAIXA'
  }

  // REGRA C - EMPRESA ESTRUTURADA + ORGANIZAÇÃO BAIXA (P1=4 AND P6 <= 2)
  // Ativa modo REESTRUTURAÇÃO OPERACIONAL
  if (trilha === 'ESTRUTURADA' && respostas.P6 !== null && respostas.P6 <= 2) {
    return 'OPERACAO'
  }

  // REGRA D - IDEIA + AUTORIDADE ALTA (P1=1 AND P4 >= 3)
  // Interpreta como: Ideia dentro de estrutura existente
  if (trilha === 'IDEIA' && respostas.P4 !== null && respostas.P4 >= 3) {
    return 'AUTORIDADE_APROVEITAR'
  }

  return undefined
}

// ============================================
// 6) GERAÇÃO DO ID DO DIAGNÓSTICO
// ============================================
// SISTEMA B: ID apenas com trilha e nível
// Foco é módulo sobreposto, NÃO faz parte do ID
// ============================================

function buildDiagnosisId(trilha: Trilha, nivel: 1 | 2 | 3): string {
  return `${trilha}_NIVEL_${nivel}`
}

// ============================================

function getModuladores(respostas: RespostasQuiz, trilha: Trilha): Modulador[] {
  const mods: Modulador[] = []

  // Autoridade crítica
  if (trilha === 'IDEIA' && respostas.P4 === 1) {
    mods.push('AUTORIDADE_CRITICA')
  }

  // Capital crítico
  if (respostas.P5 === 1 && (respostas.P2 === 1 || respostas.P2 === 2)) {
    mods.push('CAPITAL_CRITICO')
  }

  // Desorganização estrutural
  if (trilha === 'ESTRUTURADA' && (respostas.P6 === 1 || respostas.P6 === 2)) {
    mods.push('DESORGANIZACAO')
  }

  return mods
}

// ============================================
// 8) FUNÇÃO FINAL DO MOTOR
// ============================================
// ORDEM DE EXECUÇÃO:
// 1. Determinar trilha (P1)
// 2. Calcular score ponderado
// 3. Determinar nível
// 4. Aplicar REGRAS ESTRUTURAIS (focus layer)
// 5. Aplicar moduladores
// 6. Gerar diagnóstico final
// ============================================

export function gerarDiagnostico(respostas: RespostasQuiz): DiagnosticoResult {
  // Validar que todas as respostas foram fornecidas
  if (
    respostas.P1 === null ||
    respostas.P2 === null ||
    respostas.P3 === null ||
    respostas.P4 === null ||
    respostas.P5 === null ||
    respostas.P6 === null ||
    respostas.P7 === null
  ) {
    throw new Error('Todas as respostas (P1-P7) são obrigatórias')
  }

  // 1. Determinar trilha (P1)
  const { score, trilha } = calculateScore(respostas)

  // 2. Determinar nível (score intacto)
  const nivel = getNivel(score)

  // 3. Aplicar REGRAS ESTRUTURAIS (focus layer - NÃO altera trilha/nível/score)
  const foco = getFocoEstruturado(respostas, trilha)

  // 4. Aplicar moduladores
  const moduladores = getModuladores(respostas, trilha)

  // 5. Gerar ID do diagnóstico (apenas 12 base, sem foco)
  const diagnosisId = buildDiagnosisId(trilha, nivel)

  return {
    trilha,
    nivel,
    score,
    moduladores,
    foco,
    diagnosisId,
  }
}

// ============================================
// UTILITÁRIO: Retornar ID do diagnóstico (legado - não usar mais)
// ============================================
// Use diagnosisId da DiagnosticoResult em vez desta função
// ============================================

export function getDiagnosisId(trilha: Trilha, nivel: 1 | 2 | 3): string {
  return `${trilha}_NIVEL_${nivel}`
}
