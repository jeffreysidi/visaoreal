// FOCUS MÓDULO - SISTEMA B
// Layer de substituição completa para diagnósticos com foco decisório
// Busca variação completa em DIAGNOSTICOS_VARIACOES se foco existe
// Se foco não existe ou variação não encontrada, usa fallback para base

import { DIAGNOSTICOS_VARIACOES, type FocoTipo, type TrilhaTipo, type DiagnosticoTexto } from './diagnosticos-variacoes'
import { DIAGNOSTICOS, type Trilha } from './diagnosticos'

/**
 * Busca diagnóstico com foco (variação completa) ou fallback para base
 * 
 * Se foco é fornecido e existe em DIAGNOSTICOS_VARIACOES:
 *   Retorna: { frase, resumo, plano } da VARIAÇÃO (substituição completa)
 * 
 * Se foco é null ou variação não existe:
 *   Retorna: { frase, resumo, plano } da BASE
 * 
 * @param trilha - Trilha do diagnóstico (IDEIA, VALIDACAO, PEQUENO, ESTRUTURADA)
 * @param nivel - Nível (1, 2, 3)
 * @param foco - Foco decisório (opcional)
 * @returns Diagnóstico completo com frase, resumo e plano
 */
export function obterDiagnosticoComFoco(
  trilha: Trilha | TrilhaTipo,
  nivel: 1 | 2 | 3,
  foco?: FocoTipo | null
): DiagnosticoTexto {
  // Se foco fornecido, tenta buscar variação
  if (foco) {
    const variacoes = DIAGNOSTICOS_VARIACOES[trilha as TrilhaTipo]?.[nivel]?.[foco]
    if (variacoes) {
      return variacoes // Retorna variação completa (substituição)
    }
  }

  // Fallback: retorna base
  const base = DIAGNOSTICOS[trilha as Trilha]?.[nivel]
  if (!base) {
    throw new Error(`Diagnóstico base não encontrado: ${trilha}[${nivel}]`)
  }
  return base
}

/**
 * Verifica se variação existe para diagnóstico
 */
export function variacaoExiste(trilha: Trilha | TrilhaTipo, nivel: 1 | 2 | 3, foco: FocoTipo): boolean {
  return !!DIAGNOSTICOS_VARIACOES[trilha as TrilhaTipo]?.[nivel]?.[foco]
}

/**
 * LEGADO: Compatibilidade com código antigo
 * Aplica módulo de foco ao diagnóstico base (reordenação apenas)
 * NÃO é mais necessário - use obterDiagnosticoComFoco() em vez disso
 */
export function aplicarFocusModulo(
  resumoBase: string,
  planoBase: Record<string, string>,
  _foco: FocoTipo
): { resumoFinal: string; planoReordenado: Record<string, string> } {
  // Mantém apenas resumo base e plano base
  // Foco agora é tratado via DIAGNOSTICOS_VARIACOES com substituição completa
  return {
    resumoFinal: resumoBase,
    planoReordenado: planoBase
  }
}
