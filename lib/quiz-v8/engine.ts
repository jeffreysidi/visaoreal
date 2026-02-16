// MOTOR V8 - SCORING ENGINE
// Lógica de pontuação, identificação de trilhas, cálculo de níveis e moduladores

export type Trilha = 'IDEIA' | 'VALIDACAO' | 'PEQUENO' | 'ESTRUTURADA'
export type Modulador = 'AUTORIDADE_CRITICA' | 'CAPITAL_CRITICO' | 'DESORGANIZACAO'

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
// 3) CÁLCULO DE SCORE
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
// 5) APLICAÇÃO DE MODULADORES
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
// 6) FUNÇÃO FINAL DO MOTOR
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

  const { score, trilha } = calculateScore(respostas)
  const nivel = getNivel(score)
  const moduladores = getModuladores(respostas, trilha)

  return {
    trilha,
    nivel,
    score,
    moduladores,
  }
}

// ============================================
// UTILITÁRIO: Retornar ID do diagnóstico
// ============================================

export function getDiagnosisId(trilha: Trilha, nivel: 1 | 2 | 3): string {
  return `${trilha}_NIVEL_${nivel}`
}
