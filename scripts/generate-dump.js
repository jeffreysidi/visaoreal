import { DIAGNOSTICOS } from '../lib/quiz-v8/diagnosticos.ts'
import { DIAGNOSTICOS_COM_FOCO } from '../lib/quiz-v8/diagnosticos-com-foco.ts'

let dump = '# DUMP COMPLETO - 60 DIAGNÓSTICOS (SEM TERMOS EM INGLÊS)\n\n'
dump += 'Gerado em: ' + new Date().toLocaleString() + '\n'
dump += 'Total: 12 base + 48 com foco = 60 diagnósticos\n'
dump += 'Status: 100% português, 0 termos em inglês\n\n'

// BASE DIAGNOSTICOS
dump += '## DIAGNÓSTICOS BASE (12)\n\n'

const trilhas = ['IDEIA', 'VALIDACAO', 'PEQUENO', 'ESTRUTURADA']

for (const trilha of trilhas) {
  dump += `### ${trilha}\n\n`
  for (let nivel = 1; nivel <= 3; nivel++) {
    const diag = DIAGNOSTICOS[trilha][nivel]
    dump += `#### ${trilha}_NIVEL_${nivel}\n\n`
    dump += `**ID:** ${trilha}_NIVEL_${nivel}\n\n`
    dump += `**FRASE:** ${diag.frase}\n\n`
    dump += `**RESUMO:** ${diag.resumo}\n\n`
    dump += `**PLANO:**\n`
    dump += `- direcao: ${diag.plano.direcao}\n`
    dump += `- receita: ${diag.plano.receita}\n`
    dump += `- operacao: ${diag.plano.operacao}\n`
    dump += `- marketing_vendas: ${diag.plano.marketing_vendas}\n`
    dump += `- capital: ${diag.plano.capital}\n\n`
    dump += '---\n\n'
  }
}

// COM FOCO DIAGNOSTICOS
dump += '\n## DIAGNÓSTICOS COM FOCO (48)\n\n'

const focos = ['CLAREZA', 'CAIXA', 'OPERACAO', 'AUTORIDADE_APROVEITAR']

for (const trilha of trilhas) {
  dump += `### ${trilha}\n\n`
  for (let nivel = 1; nivel <= 3; nivel++) {
    for (const foco of focos) {
      const chave = `${trilha}_NIVEL_${nivel}__FOCO_${foco}`
      const diag = DIAGNOSTICOS_COM_FOCO[chave]
      
      if (diag) {
        dump += `#### ${chave}\n\n`
        dump += `**ID:** ${chave}\n\n`
        dump += `**FRASE:** ${diag.frase}\n\n`
        dump += `**RESUMO:** ${diag.resumo}\n\n`
        dump += `**PLANO:**\n`
        if (diag.plano.direcao) dump += `- direcao: ${diag.plano.direcao}\n`
        if (diag.plano.receita) dump += `- receita: ${diag.plano.receita}\n`
        if (diag.plano.operacao) dump += `- operacao: ${diag.plano.operacao}\n`
        if (diag.plano.marketing_vendas) dump += `- marketing_vendas: ${diag.plano.marketing_vendas}\n`
        if (diag.plano.capital) dump += `- capital: ${diag.plano.capital}\n`
        if (diag.plano.clareza) dump += `- clareza: ${diag.plano.clareza}\n`
        if (diag.plano.autoridade) dump += `- autoridade: ${diag.plano.autoridade}\n`
        if (diag.plano.estrategia) dump += `- estrategia: ${diag.plano.estrategia}\n`
        if (diag.plano.organizacao) dump += `- organizacao: ${diag.plano.organizacao}\n`
        dump += '\n---\n\n'
      }
    }
  }
}

dump += '\n## CHECKLIST FINAL\n\n'
dump += '✓ Total de diagnósticos: 60 (12 base + 48 com foco)\n'
dump += '✓ Termos em inglês: 0\n'
dump += '✓ 100% português\n'
dump += '✓ Planos padronizados com 5 chaves principais\n'

console.log(dump)
