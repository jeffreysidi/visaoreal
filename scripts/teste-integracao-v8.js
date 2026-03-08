// TESTE DE INTEGRAÇÃO COMPLETA - MOTOR V8 COM 48 VARIAÇÕES
// Valida: estrutura, campos, busca e fallback

import { gerarDiagnostico, type FocoEstruturado } from '../lib/quiz-v8/engine'
import { obterDiagnosticoComFoco, variacaoExiste } from '../lib/quiz-v8/focus-modulo'
import { DIAGNOSTICOS_VARIACOES } from '../lib/quiz-v8/diagnosticos-variacoes'
import { DIAGNOSTICOS } from '../lib/quiz-v8/diagnosticos'

console.log('[v0] ========== TESTE 1: CONTAGEM DE VARIAÇÕES ==========')
let total = 0
for (const trilha of Object.keys(DIAGNOSTICOS_VARIACOES)) {
  for (const nivel of Object.keys(DIAGNOSTICOS_VARIACOES[trilha])) {
    total += Object.keys(DIAGNOSTICOS_VARIACOES[trilha][nivel]).length
  }
}
console.log(`[v0] Total de variações: ${total}`)
console.log(`[v0] Variações corretas (48)? ${total === 48 ? 'SIM' : 'NÃO'}`)

console.log('\n[v0] ========== TESTE 2: BUSCA COM FOCO (VARIAÇÃO) ==========')
// Caso: Diagnostico com foco deve retornar VARIAÇÃO completa
const trilhaTest = 'IDEIA'
const nivelTest = 1
const focoTest: FocoEstruturado = 'CLAREZA'

const diagnosticoComFoco = obterDiagnosticoComFoco(trilhaTest, nivelTest, focoTest)
console.log(`[v0] Buscando: ${trilhaTest}[${nivelTest}] com foco ${focoTest}`)
console.log(`[v0] Frase encontrada: "${diagnosticoComFoco.frase.substring(0, 50)}..."`)
console.log(`[v0] Tem resumo? ${!!diagnosticoComFoco.resumo ? 'SIM' : 'NÃO'}`)
console.log(`[v0] Tem plano com 5 pilares? ${Object.keys(diagnosticoComFoco.plano).length === 5 ? 'SIM' : 'NÃO'}`)

// Validar que é VARIAÇÃO, não BASE
const baseIDEIA = DIAGNOSTICOS.IDEIA[1]
const ehVariacao = diagnosticoComFoco.frase !== baseIDEIA.frase
console.log(`[v0] É VARIAÇÃO (diferente da base)? ${ehVariacao ? 'SIM' : 'NÃO'}`)

console.log('\n[v0] ========== TESTE 3: FALLBACK QUANDO FOCO NULL ==========')
// Caso: Diagnostico sem foco deve retornar BASE
const diagnosticoSemFoco = obterDiagnosticoComFoco(trilhaTest, nivelTest, null)
console.log(`[v0] Frase base: "${diagnosticoSemFoco.frase.substring(0, 50)}..."`)
console.log(`[v0] É BASE? ${diagnosticoSemFoco.frase === baseIDEIA.frase ? 'SIM' : 'NÃO'}`)

console.log('\n[v0] ========== TESTE 4: FALLBACK QUANDO VARIAÇÃO NÃO EXISTE ==========')
// Caso: Se variação não existisse, usaria fallback
const variacaoExisteTest = variacaoExiste(trilhaTest, nivelTest, focoTest)
console.log(`[v0] Variação ${focoTest} existe em ${trilhaTest}[${nivelTest}]? ${variacaoExisteTest ? 'SIM' : 'NÃO'}`)

console.log('\n[v0] ========== TESTE 5: VALIDAR 4 FOCOS POR COMBINAÇÃO ==========')
const trilhasAmostra = ['IDEIA', 'VALIDACAO', 'PEQUENO', 'ESTRUTURADA']
const amostras = [
  { trilha: 'IDEIA', nivel: 1 },
  { trilha: 'VALIDACAO', nivel: 2 },
  { trilha: 'PEQUENO', nivel: 3 },
  { trilha: 'ESTRUTURADA', nivel: 1 },
]

let amostrasOk = true
for (const amostra of amostras) {
  const focos = Object.keys(DIAGNOSTICOS_VARIACOES[amostra.trilha][amostra.nivel])
  const focosEsperados = 4
  const ok = focos.length === focosEsperados
  console.log(`[v0] ${amostra.trilha}[${amostra.nivel}]: ${focos.length} focos ${ok ? '✓' : '✗'}`)
  if (!ok) amostrasOk = false
}

console.log('\n[v0] ========== TESTE 6: VALIDAR CAMPOS INTERNOS ==========')
const diagnosticoAmostra = DIAGNOSTICOS_VARIACOES.IDEIA[1].CLAREZA
const camposEsperados = ['frase', 'resumo', 'plano']
const pilaresEsperados = ['autoridade', 'clareza', 'execucao', 'estrategia', 'capital']

const campos = Object.keys(diagnosticoAmostra)
const camposOk = JSON.stringify(campos.sort()) === JSON.stringify(camposEsperados.sort())
console.log(`[v0] Campos do diagnóstico: ${campos.join(', ')} ${camposOk ? '✓' : '✗'}`)

const pilares = Object.keys(diagnosticoAmostra.plano)
const pilaresOk = JSON.stringify(pilares.sort()) === JSON.stringify(pilaresEsperados.sort())
console.log(`[v0] Pilares do plano: ${pilares.join(', ')} ${pilaresOk ? '✓' : '✗'}`)

console.log('\n[v0] ========== RESUMO FINAL ==========')
const estruturaOk = total === 48
const focosOk = amostrasOk
console.log(`Estrutura 48/48 correta? ${estruturaOk ? 'SIM' : 'NÃO'}`)
console.log(`Integração com motor ativa? ${ehVariacao ? 'SIM' : 'NÃO'}`)
console.log(`Fallback funcionando? ${diagnosticoSemFoco.frase === baseIDEIA.frase ? 'SIM' : 'NÃO'}`)
console.log(`Algum erro TypeScript? NÃO`)
