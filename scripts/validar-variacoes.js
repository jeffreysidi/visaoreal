#!/usr/bin/env node

// SCRIPT DE VALIDAÇÃO - DIAGNOSTICOS_VARIACOES
// Valida estrutura completa, campos e integração

import { DIAGNOSTICOS_VARIACOES } from '../lib/quiz-v8/diagnosticos-variacoes.ts'
import { DIAGNOSTICOS } from '../lib/quiz-v8/diagnosticos.ts'

console.log('[v0] ========== ETAPA 1: VALIDAÇÃO ESTRUTURAL ==========')

// 1) Validar trilhas
const trilhas = Object.keys(DIAGNOSTICOS_VARIACOES)
console.log('[v0] Trilhas encontradas:', trilhas)
const trilhasEsperadas = ['IDEIA', 'VALIDACAO', 'PEQUENO', 'ESTRUTURADA']
const trilhasOk = JSON.stringify(trilhas) === JSON.stringify(trilhasEsperadas)
console.log(`[v0] Trilhas corretas? ${trilhasOk ? 'SIM' : 'NÃO'} (esperado: ${trilhasEsperadas.join(', ')})`)

// 2) Validar níveis por trilha
console.log('\n[v0] ========== ETAPA 2: VALIDAÇÃO DE NÍVEIS ==========')
let nivelOk = true
for (const trilha of trilhas) {
  const niveis = Object.keys(DIAGNOSTICOS_VARIACOES[trilha])
  const nivelEsperado = ['1', '2', '3']
  const isOk = JSON.stringify(niveis) === JSON.stringify(nivelEsperado)
  console.log(`[v0] ${trilha}: níveis ${niveis.join(',')} ${isOk ? '✓' : '✗'}`)
  if (!isOk) nivelOk = false
}

// 3) Validar focos
console.log('\n[v0] ========== ETAPA 3: VALIDAÇÃO DE FOCOS ==========')
const focosEsperados = ['CLAREZA', 'CAIXA', 'OPERACAO', 'AUTORIDADE_APROVEITAR']
const amostras = [
  { trilha: 'IDEIA', nivel: 1 },
  { trilha: 'VALIDACAO', nivel: 2 },
  { trilha: 'PEQUENO', nivel: 3 },
  { trilha: 'ESTRUTURADA', nivel: 1 },
]

let focosOk = true
for (const amostra of amostras) {
  const focos = Object.keys(DIAGNOSTICOS_VARIACOES[amostra.trilha][amostra.nivel])
  const isOk = JSON.stringify(focos) === JSON.stringify(focosEsperados)
  console.log(`[v0] ${amostra.trilha}[${amostra.nivel}]: focos ${focos.join(',')} ${isOk ? '✓' : '✗'}`)
  if (!isOk) focosOk = false
}

// 4) Validar campos internos
console.log('\n[v0] ========== ETAPA 4: VALIDAÇÃO DE CAMPOS ==========')
let camposOk = true
const camposeEsperados = ['frase', 'resumo', 'plano']
const pilaresEsperados = ['autoridade', 'clareza', 'execucao', 'estrategia', 'capital']

for (const amostra of amostras) {
  for (const foco of focosEsperados) {
    const obj = DIAGNOSTICOS_VARIACOES[amostra.trilha][amostra.nivel][foco]
    const campos = Object.keys(obj)
    const camposOk2 = JSON.stringify(campos.sort()) === JSON.stringify(camposeEsperados.sort())
    
    if (!camposOk2) {
      console.log(`[v0] ✗ ${amostra.trilha}[${amostra.nivel}].${foco}: campos ${campos.join(',')}`)
      camposOk = false
    }
    
    // Validar pilares
    const pilares = Object.keys(obj.plano)
    const pilaresOk2 = JSON.stringify(pilares.sort()) === JSON.stringify(pilaresEsperados.sort())
    if (!pilaresOk2) {
      console.log(`[v0] ✗ ${amostra.trilha}[${amostra.nivel}].${foco}.plano: pilares ${pilares.join(',')}`)
      camposOk = false
    }
  }
}
if (camposOk) console.log('[v0] Todos os campos internos ✓')

// 5) Contar total de variações
console.log('\n[v0] ========== ETAPA 5: CONTAGEM TOTAL ==========')
let totalVariacoes = 0
for (const trilha of trilhas) {
  for (const nivel in DIAGNOSTICOS_VARIACOES[trilha]) {
    totalVariacoes += Object.keys(DIAGNOSTICOS_VARIACOES[trilha][nivel]).length
  }
}
console.log(`[v0] Total de variações: ${totalVariacoes} (esperado: 48)`)
console.log(`[v0] Variações corretas? ${totalVariacoes === 48 ? 'SIM' : 'NÃO'}`)

// 6) Comparação Base vs Variacoes
console.log('\n[v0] ========== ETAPA 6: BASE vs VARIACOES ==========')
console.log(`[v0] Diagnosticos base (12): ${Object.keys(DIAGNOSTICOS).length} trilhas`)
for (const trilha of Object.keys(DIAGNOSTICOS)) {
  const niveis = Object.keys(DIAGNOSTICOS[trilha])
  console.log(`[v0] DIAGNOSTICOS.${trilha}: ${niveis.length} níveis`)
}

// 7) Resumo final
console.log('\n[v0] ========== RESUMO FINAL ==========')
console.log(`Estrutura 48/48 correta? ${trilhasOk && nivelOk && focosOk && camposOk && totalVariacoes === 48 ? 'SIM' : 'NÃO'}`)
console.log(`Trilhas ok? ${trilhasOk ? 'SIM' : 'NÃO'}`)
console.log(`Níveis ok? ${nivelOk ? 'SIM' : 'NÃO'}`)
console.log(`Focos ok? ${focosOk ? 'SIM' : 'NÃO'}`)
console.log(`Campos ok? ${camposOk ? 'SIM' : 'NÃO'}`)
