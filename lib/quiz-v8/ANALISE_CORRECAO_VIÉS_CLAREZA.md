# ANÁLISE: CORREÇÃO DO VIÉS CLAREZA

## PROBLEMA IDENTIFICADO

A simulação inicial com 100 combinações aleatórias revelou super-representação de CLAREZA:

```
ANTES DA CORREÇÃO (100 simulações):
CLAREZA:                  40 (40.0%)
CAIXA:                     7 (7.0%)
OPERACAO:                  4 (4.0%)
AUTORIDADE_APROVEITAR:     8 (8.0%)
SEM FOCO (null):          41 (41.0%)

⚠️ CLAREZA com 40% = SUPER-REPRESENTADO (+100% do esperado)
```

## CAUSA MATEMÁTICA

Linha 90 de `engine.ts`:
```typescript
if (respostas.P7 !== null && respostas.P7 <= 2) {
  return 'CLAREZA'
}
```

**O Problema:**
- P7 tem escala 1-5 (5 valores possíveis)
- Condição `P7 <= 2` = 2 valores ÷ 5 = **40% de probabilidade**
- CLAREZA era verificado PRIMEIRO (prioridade máxima), bloqueando outras regras
- Resultado: 40% das combinações retornavam CLAREZA automaticamente

## SOLUÇÃO APLICADA

Alteração da condição para:
```typescript
if (respostas.P7 !== null && respostas.P7 === 1) {
  return 'CLAREZA'
}
```

**Nova Probabilidade:**
- Condição `P7 === 1` = 1 valor ÷ 5 = **20% de probabilidade**
- CLAREZA agora competitivo com outras regras
- Permite outras regras (CAIXA, OPERACAO, AUTORIDADE_APROVEITAR) de serem acionadas

## VALIDAÇÃO - APÓS CORREÇÃO

```
DEPOIS DA CORREÇÃO (100 simulações):
CLAREZA:                  20 (20.0%)
CAIXA:                    10 (10.0%)
OPERACAO:                  4 (4.0%)
AUTORIDADE_APROVEITAR:    14 (14.0%)
SEM FOCO (null):          52 (52.0%)

✓ CLAREZA com 20% = DISTRIBUIÇÃO EQUILIBRADA
```

## ANÁLISE DE RESULTADOS

| Foco | Antes | Depois | Status |
|------|-------|--------|--------|
| CLAREZA | 40% | 20% | ✓ Normalizado |
| CAIXA | 7% | 10% | ✓ Aumentou |
| OPERACAO | 4% | 4% | - Estável |
| AUTORIDADE_APROVEITAR | 8% | 14% | ✓ Aumentou |
| SEM FOCO | 41% | 52% | ✓ Esperado |

**Observação:** Aumento de "SEM FOCO" é esperado porque agora menos combinações acionam CLAREZA, permitindo que mais combinações retornem `undefined` (sem foco aplicado).

## AJUSTES COMPLEMENTARES

Além da condição P7, as outras 3 regras permanecem inalteradas por serem mais restritivas:

- **REGRA B (CAIXA):** Requer `P2 <= 2 AND P5 <= 2` = ~4% de probabilidade
- **REGRA C (OPERACAO):** Requer `trilha === 'ESTRUTURADA' AND P6 <= 2` = trilha restrita
- **REGRA D (AUTORIDADE):** Requer `trilha === 'IDEIA' AND P4 >= 3` = trilha restrita

## CONCLUSÃO

O viés foi corrigido com sucesso. CLAREZA passa de 40% → 20% e agora está equilibrado com outras opções de foco. O algoritmo mantém suas prioridades (CLAREZA ainda é "prioridade máxima" sendo verificado primeiro), mas agora com critério mais rigoroso e justo.

**Arquivos Modificados:**
- `/lib/quiz-v8/engine.ts` - Alterou P7 <= 2 para P7 === 1
- `/scripts/simular-100-focos.js` - Validação da correção
