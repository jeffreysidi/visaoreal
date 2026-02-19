// VALIDAÇÃO - MOTOR V8 COM FOCUS LAYER
// Testes dos 5 cenários críticos

import { gerarDiagnostico, RespostasQuiz } from './lib/quiz-v8/engine'

console.log('========================================')
console.log('MOTOR V8 - FOCUS LAYER VALIDATION')
console.log('========================================\n')

// ========================================
// CENÁRIO 1: CLAREZA MUITO BAIXA (P7=1)
// ========================================
console.log('[CENÁRIO 1] Clareza Muito Baixa (P7=1)')
console.log('Input: P1=3, P2=4, P3=3, P4=4, P5=4, P6=4, P7=1')

const cenario1: RespostasQuiz = {
  P1: 3, // PEQUENO
  P2: 4, // Receita boa
  P3: 3, // Dificuldade média
  P4: 4, // Autoridade alta
  P5: 4, // Capital bom
  P6: 4, // Organização boa
  P7: 1  // CLAREZA MUITO BAIXA
}

const resultado1 = gerarDiagnostico(cenario1)
console.log('Output:', {
  trilha: resultado1.trilha,
  nivel: resultado1.nivel,
  score: resultado1.score,
  foco: resultado1.foco,
  diagnosisId: resultado1.diagnosisId
})
console.log('✅ Validação: Score intacto? Nível intacto? Focus = CLAREZA?')
console.log(`   Score deve ser >280: ${resultado1.score >= 281}`)
console.log(`   Nível deve ser 3: ${resultado1.nivel === 3}`)
console.log(`   Focus deve ser CLAREZA: ${resultado1.foco === 'CLAREZA'}`)
console.log(`   ID: ${resultado1.diagnosisId}\n`)

// ========================================
// CENÁRIO 2: RECEITA + CAPITAL INSTÁVEIS
// ========================================
console.log('[CENÁRIO 2] Receita + Capital Instáveis (P2=2, P5=1)')
console.log('Input: P1=4, P2=2, P3=3, P4=4, P5=1, P6=3, P7=4')

const cenario2: RespostasQuiz = {
  P1: 4, // ESTRUTURADA
  P2: 2, // Receita instável
  P3: 3, // Dificuldade média
  P4: 4, // Autoridade alta
  P5: 1, // Capital crítico
  P6: 3, // Organização boa
  P7: 4  // Clareza boa
}

const resultado2 = gerarDiagnostico(cenario2)
console.log('Output:', {
  trilha: resultado2.trilha,
  nivel: resultado2.nivel,
  score: resultado2.score,
  foco: resultado2.foco,
  diagnosisId: resultado2.diagnosisId
})
console.log('✅ Validação: Score intacto? Nível intacto? Focus = CAIXA?')
console.log(`   Score deve estar 181-280: ${resultado2.score >= 181 && resultado2.score <= 280}`)
console.log(`   Nível deve ser 2: ${resultado2.nivel === 2}`)
console.log(`   Focus deve ser CAIXA: ${resultado2.foco === 'CAIXA'}`)
console.log(`   ID: ${resultado2.diagnosisId}\n`)

// ========================================
// CENÁRIO 3: EMPRESA COM ORGANIZAÇÃO BAIXA
// ========================================
console.log('[CENÁRIO 3] Empresa com Organização Baixa (P1=4, P6=1)')
console.log('Input: P1=4, P2=5, P3=4, P4=4, P5=4, P6=1, P7=5')

const cenario3: RespostasQuiz = {
  P1: 4, // ESTRUTURADA
  P2: 5, // Receita excelente
  P3: 4, // Dificuldade alta
  P4: 4, // Autoridade alta
  P5: 4, // Capital excelente
  P6: 1, // ORGANIZAÇÃO MUITO BAIXA
  P7: 5  // Clareza excelente
}

const resultado3 = gerarDiagnostico(cenario3)
console.log('Output:', {
  trilha: resultado3.trilha,
  nivel: resultado3.nivel,
  score: resultado3.score,
  foco: resultado3.foco,
  diagnosisId: resultado3.diagnosisId
})
console.log('✅ Validação: Score intacto? Nível intacto? Focus = OPERACAO?')
console.log(`   Score deve ser >=281: ${resultado3.score >= 281}`)
console.log(`   Nível deve ser 3: ${resultado3.nivel === 3}`)
console.log(`   Focus deve ser OPERACAO: ${resultado3.foco === 'OPERACAO'}`)
console.log(`   ID: ${resultado3.diagnosisId}\n`)

// ========================================
// CENÁRIO 4: IDEIA COM AUTORIDADE ALTA
// ========================================
console.log('[CENÁRIO 4] Ideia com Autoridade Alta (P1=1, P4=5)')
console.log('Input: P1=1, P2=3, P3=3, P4=5, P5=3, P6=3, P7=4')

const cenario4: RespostasQuiz = {
  P1: 1, // IDEIA
  P2: 3, // Receita média
  P3: 3, // Dificuldade média
  P4: 5, // AUTORIDADE MUITO ALTA
  P5: 3, // Capital médio
  P6: 3, // Organização média
  P7: 4  // Clareza boa
}

const resultado4 = gerarDiagnostico(cenario4)
console.log('Output:', {
  trilha: resultado4.trilha,
  nivel: resultado4.nivel,
  score: resultado4.score,
  foco: resultado4.foco,
  diagnosisId: resultado4.diagnosisId
})
console.log('✅ Validação: Score intacto? Nível intacto? Focus = AUTORIDADE_APROVEITAR?')
console.log(`   Score deve ser >=281: ${resultado4.score >= 281}`)
console.log(`   Nível deve ser 3: ${resultado4.nivel === 3}`)
console.log(`   Focus deve ser AUTORIDADE_APROVEITAR: ${resultado4.foco === 'AUTORIDADE_APROVEITAR'}`)
console.log(`   ID: ${resultado4.diagnosisId}\n`)

// ========================================
// CENÁRIO 5: SEM REGRA APLICÁVEL
// ========================================
console.log('[CENÁRIO 5] Sem Regra Aplicável')
console.log('Input: P1=2, P2=4, P3=4, P4=3, P5=4, P6=3, P7=4')

const cenario5: RespostasQuiz = {
  P1: 2, // VALIDACAO
  P2: 4, // Receita boa
  P3: 4, // Dificuldade alta
  P4: 3, // Autoridade média
  P5: 4, // Capital bom
  P6: 3, // Organização média
  P7: 4  // Clareza boa
}

const resultado5 = gerarDiagnostico(cenario5)
console.log('Output:', {
  trilha: resultado5.trilha,
  nivel: resultado5.nivel,
  score: resultado5.score,
  foco: resultado5.foco,
  diagnosisId: resultado5.diagnosisId
})
console.log('✅ Validação: Score intacto? Nível intacto? Focus = undefined?')
console.log(`   Score deve ser >=281: ${resultado5.score >= 281}`)
console.log(`   Nível deve ser 3: ${resultado5.nivel === 3}`)
console.log(`   Focus deve ser undefined (nenhuma regra): ${resultado5.foco === undefined}`)
console.log(`   ID: ${resultado5.diagnosisId}\n`)

// ========================================
// RESUMO DE VALIDAÇÃO
// ========================================
console.log('========================================')
console.log('RESUMO DE VALIDAÇÃO')
console.log('========================================')

const allTests = [
  {
    name: 'Cenário 1 - Clareza Baixa',
    resultado: resultado1,
    esperado: { nivel: 3, foco: 'CLAREZA', trilha: 'PEQUENO' }
  },
  {
    name: 'Cenário 2 - Caixa Instável',
    resultado: resultado2,
    esperado: { nivel: 2, foco: 'CAIXA', trilha: 'ESTRUTURADA' }
  },
  {
    name: 'Cenário 3 - Operação Baixa',
    resultado: resultado3,
    esperado: { nivel: 3, foco: 'OPERACAO', trilha: 'ESTRUTURADA' }
  },
  {
    name: 'Cenário 4 - Autoridade Aproveitar',
    resultado: resultado4,
    esperado: { nivel: 3, foco: 'AUTORIDADE_APROVEITAR', trilha: 'IDEIA' }
  },
  {
    name: 'Cenário 5 - Sem Focus',
    resultado: resultado5,
    esperado: { nivel: 3, foco: undefined, trilha: 'VALIDACAO' }
  }
]

let passedTests = 0
allTests.forEach((test, idx) => {
  const nivelOK = test.resultado.nivel === test.esperado.nivel
  const focoOK = test.resultado.foco === test.esperado.foco
  const trilhaOK = test.resultado.trilha === test.esperado.trilha
  const passed = nivelOK && focoOK && trilhaOK

  console.log(`\n[${idx + 1}] ${test.name}`)
  console.log(`   Trilha: ${trilhaOK ? '✅' : '❌'} ${test.resultado.trilha} (esperado: ${test.esperado.trilha})`)
  console.log(`   Nível: ${nivelOK ? '✅' : '❌'} ${test.resultado.nivel} (esperado: ${test.esperado.nivel})`)
  console.log(`   Foco: ${focoOK ? '✅' : '❌'} ${test.resultado.foco || 'undefined'} (esperado: ${test.esperado.foco || 'undefined'})`)
  
  if (passed) {
    passedTests++
    console.log(`   Status: ✅ PASSOU`)
  } else {
    console.log(`   Status: ❌ FALHOU`)
  }
})

console.log(`\n========================================`)
console.log(`RESULTADO FINAL: ${passedTests}/5 testes passaram`)
console.log(`========================================`)

if (passedTests === 5) {
  console.log(`\n✅ MOTOR V8 COM FOCUS LAYER: VALIDADO E PRONTO PARA PRODUÇÃO`)
} else {
  console.log(`\n❌ MOTOR V8: FALHAS DETECTADAS - REVISAR IMPLEMENTAÇÃO`)
}
