// SIMULAÇÃO DE 100 COMBINAÇÕES ALEATÓRIAS - TESTE DE ENVIESAMENTO DO FOCO
// Script para rodar no Node.js e analisar distribuição de focos

const fs = require('fs');

// ============================================
// COPIAR FUNÇÕES DO ENGINE.TS
// ============================================

const WEIGHTS = {
  IDEIA: { P2: 10, P3: 15, P4: 25, P5: 15, P6: 10, P7: 25 },
  VALIDACAO: { P2: 15, P3: 20, P4: 20, P5: 15, P6: 10, P7: 20 },
  PEQUENO: { P2: 25, P3: 20, P4: 15, P5: 15, P6: 15, P7: 10 },
  ESTRUTURADA: { P2: 20, P3: 15, P4: 10, P5: 15, P6: 25, P7: 15 },
};

function getTrilha(p1) {
  if (p1 === 1) return 'IDEIA';
  if (p1 === 2) return 'VALIDACAO';
  if (p1 === 3) return 'PEQUENO';
  if (p1 === 4) return 'ESTRUTURADA';
  throw new Error('P1 inválido');
}

function calculateScore(respostas) {
  const trilha = getTrilha(respostas.P1);
  const pesos = WEIGHTS[trilha];
  let score = 0;
  if (respostas.P2 !== null) score += respostas.P2 * pesos.P2;
  if (respostas.P3 !== null) score += respostas.P3 * pesos.P3;
  if (respostas.P4 !== null) score += respostas.P4 * pesos.P4;
  if (respostas.P5 !== null) score += respostas.P5 * pesos.P5;
  if (respostas.P6 !== null) score += respostas.P6 * pesos.P6;
  if (respostas.P7 !== null) score += respostas.P7 * pesos.P7;
  return { score, trilha };
}

function getNivel(score) {
  if (score <= 180) return 1;
  if (score <= 280) return 2;
  return 3;
}

function getFocoEstruturado(respostas, trilha) {
  // REGRA A - CLAREZA CRÍTICA (P7 = 1)
  // Ativa modo REORGANIZAÇÃO ESTRATÉGICA apenas em caso crítico
  if (respostas.P7 !== null && respostas.P7 === 1) {
    return 'CLAREZA';
  }

  // REGRA B - RECEITA INSTÁVEL + CAPITAL LIMITADO (P2 <= 2 AND P5 <= 2)
  if (
    respostas.P2 !== null &&
    respostas.P5 !== null &&
    respostas.P2 <= 2 &&
    respostas.P5 <= 2
  ) {
    return 'CAIXA';
  }

  // REGRA C - EMPRESA ESTRUTURADA + ORGANIZAÇÃO BAIXA (P1=4 AND P6 <= 2)
  if (trilha === 'ESTRUTURADA' && respostas.P6 !== null && respostas.P6 <= 2) {
    return 'OPERACAO';
  }

  // REGRA D - IDEIA + AUTORIDADE ALTA (P1=1 AND P4 >= 3)
  if (trilha === 'IDEIA' && respostas.P4 !== null && respostas.P4 >= 3) {
    return 'AUTORIDADE_APROVEITAR';
  }

  return null;
}

// ============================================
// GERADOR DE RESPOSTAS ALEATÓRIAS
// ============================================

function gerarRespostasAleatorias() {
  return {
    P1: Math.floor(Math.random() * 4) + 1, // 1-4
    P2: Math.floor(Math.random() * 5) + 1, // 1-5
    P3: Math.floor(Math.random() * 5) + 1, // 1-5
    P4: Math.floor(Math.random() * 5) + 1, // 1-5
    P5: Math.floor(Math.random() * 5) + 1, // 1-5
    P6: Math.floor(Math.random() * 5) + 1, // 1-5
    P7: Math.floor(Math.random() * 5) + 1, // 1-5
  };
}

// ============================================
// SIMULAÇÃO
// ============================================

console.log('='.repeat(60));
console.log('SIMULAÇÃO: 100 COMBINAÇÕES ALEATÓRIAS');
console.log('='.repeat(60));
console.log('');

const resultados = [];
const contagemFocos = {
  CLAREZA: 0,
  CAIXA: 0,
  OPERACAO: 0,
  AUTORIDADE_APROVEITAR: 0,
  null: 0,
};

const contagemTrilhas = {};
const contagemNiveis = {};

for (let i = 1; i <= 100; i++) {
  const respostas = gerarRespostasAleatorias();
  const { score, trilha } = calculateScore(respostas);
  const nivel = getNivel(score);
  const foco = getFocoEstruturado(respostas, trilha);

  resultados.push({
    numero: i,
    respostas,
    trilha,
    nivel,
    score,
    foco,
  });

  // Contar
  contagemFocos[foco || 'null']++;
  contagemTrilhas[trilha] = (contagemTrilhas[trilha] || 0) + 1;
  contagemNiveis[`${trilha}_N${nivel}`] = (contagemNiveis[`${trilha}_N${nivel}`] || 0) + 1;
}

// ============================================
// RELATÓRIO
// ============================================

console.log('DISTRIBUIÇÃO DE FOCOS (100 combinações):');
console.log('─'.repeat(40));
console.log(`CLAREZA:                 ${contagemFocos.CLAREZA.toString().padStart(3)} (${(contagemFocos.CLAREZA / 100 * 100).toFixed(1)}%)`);
console.log(`CAIXA:                   ${contagemFocos.CAIXA.toString().padStart(3)} (${(contagemFocos.CAIXA / 100 * 100).toFixed(1)}%)`);
console.log(`OPERACAO:                ${contagemFocos.OPERACAO.toString().padStart(3)} (${(contagemFocos.OPERACAO / 100 * 100).toFixed(1)}%)`);
console.log(`AUTORIDADE_APROVEITAR:   ${contagemFocos.AUTORIDADE_APROVEITAR.toString().padStart(3)} (${(contagemFocos.AUTORIDADE_APROVEITAR / 100 * 100).toFixed(1)}%)`);
console.log(`SEM FOCO (null):         ${contagemFocos.null.toString().padStart(3)} (${(contagemFocos.null / 100 * 100).toFixed(1)}%)`);
console.log('');

console.log('DISTRIBUIÇÃO DE TRILHAS:');
console.log('─'.repeat(40));
Object.entries(contagemTrilhas)
  .sort()
  .forEach(([trilha, count]) => {
    console.log(`${trilha.padEnd(15)} ${count.toString().padStart(3)} (${(count / 100 * 100).toFixed(1)}%)`);
  });
console.log('');

console.log('DISTRIBUIÇÃO DE NÍVEIS POR TRILHA:');
console.log('─'.repeat(40));
Object.entries(contagemNiveis)
  .sort()
  .forEach(([key, count]) => {
    console.log(`${key.padEnd(20)} ${count.toString().padStart(3)} (${(count / 100 * 100).toFixed(1)}%)`);
  });
console.log('');

// ============================================
// ANÁLISE DE ENVIESAMENTO
// ============================================

console.log('ANÁLISE DE ENVIESAMENTO:');
console.log('─'.repeat(40));

const esperado = 100 / 5; // 20% cada se perfeitamente distribuído
console.log(`Esperado por foco (se distribuído): ${esperado.toFixed(1)}%`);
console.log('');

const maiorFoco = Math.max(
  contagemFocos.CLAREZA,
  contagemFocos.CAIXA,
  contagemFocos.OPERACAO,
  contagemFocos.AUTORIDADE_APROVEITAR,
  contagemFocos.null
);

const desvio = ((maiorFoco - esperado) / esperado * 100).toFixed(1);

console.log(`Maior ocorrência: ${maiorFoco} (${(maiorFoco / 100 * 100).toFixed(1)}%)`);
console.log(`Desvio do esperado: +${desvio}%`);
console.log('');

if (contagemFocos.CLAREZA > 35) {
  console.log('⚠️  ALERTA: CLAREZA SUPER-REPRESENTADO!');
  console.log('   Motivo matemático: Algoritmo ainda possui viés');
} else if (contagemFocos.CLAREZA > 25) {
  console.log('⚠️  AVISO: CLAREZA ligeiramente elevado');
} else if (contagemFocos.CLAREZA >= 15 && contagemFocos.CLAREZA <= 25) {
  console.log('✓ CLAREZA está bem distribuído (15-25%)');
} else {
  console.log('✓ CLAREZA baixo demais (< 15%)');
}

console.log('');

// ============================================
// EXPORTAR DADOS BRUTOS
// ============================================

console.log('Salvando dados brutos em simulacao-resultado.json...');
fs.writeFileSync('simulacao-resultado.json', JSON.stringify(
  {
    contagemFocos,
    contagemTrilhas,
    contagemNiveis,
    resultados: resultados.slice(0, 10), // Primeiros 10 para referência
    totalSimulacoes: 100,
  },
  null,
  2
));

console.log('✓ Concluído');
