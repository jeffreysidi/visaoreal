# AUDITORIA DE FLUXOS DO QUIZ - Visão Real

## OBJETIVO
Garantir que em QUALQUER fluxo do quiz, apenas UMA pergunta é renderizada por vez.

## FLUXO ROTA 1: IDEIA
```
Q1 (ideia) → Q2 (tipo) → Q3 → Q4 → Q5 → Q6 → Q7 → Q9 (textarea) → RESULTADO
Total: 8 perguntas
Subrotas: NENHUMA
```

**Validação**: Sem subrotas, fluxo linear seguro.

---

## FLUXO ROTA 2: OPERACAO (COM SUBROTAS)
```
Q1 (operacao) → Q2 (tipo) → Q3 → Q4 → Q5 → Q6 → Q7 → Q9 (textarea) → SUBROTA (1 de 5 possíveis) → RESULTADO
Total: 9 perguntas (8 fixas + 1 subrota)
```

### SUBROTAS POSSÍVEIS (apenas uma por fluxo):
1. `operacao_local-physical` → `local-physical-situation`
2. `operacao_professional-service` → `servico-situation`
3. `operacao_digital` → `digital-situation`
4. `operacao_physical-product` → `physical-product-situation`
5. `operacao_experimental` → `experimental-situation`
6. `operacao_undefined` → NÃO HÁ SUBROTA (fluxo termina em Q9)

**Validação**: Subrotas são MUTUAMENTE EXCLUSIVAS - apenas uma é renderizada baseada em Q2.

---

## FLUXO ROTA 3: CRESCIMENTO
```
Q1 (crescimento) → Q2 (tipo) → Q3 → Q4 → Q5 → Q6 → Q7 → Q9 (textarea) → RESULTADO
Total: 8 perguntas
Subrotas: NENHUMA
```

**Validação**: Sem subrotas, fluxo linear seguro.

---

## MECANISMOS DE PROTEÇÃO IMPLEMENTADOS

### 1. **Remoção de Estado Duplicado**
- ❌ Removido: `localPhysicalSituationAnswer`, `servicoSituationAnswer`, etc.
- ✅ Implementado: Todas as respostas armazenadas APENAS em `answers` object

### 2. **Limpeza Automática de Subrotas**
- Quando Q2 muda, a subrota anterior é deletada de `answers`
- Impede render de pergunta fantasma da rota anterior

### 3. **Validação de IDs Duplicados**
- Verificação de `Set(questionIds).size !== questionIds.length`
- Logs de erro se duplicatas forem detectadas

### 4. **Segurança na Navegação**
- `handleNext()` re-valida tamanho da lista antes de avançar
- Previne index overflow se lista mudar de tamanho

### 5. **Renderização Única**
- Apenas `currentQuestion` (derivado de `dynamicQuestions[currentQuestionIndex]`) é renderizado
- Nenhuma renderização condicional adicional de perguntas

---

## SIMULAÇÃO DE CENÁRIOS CRÍTICOS

### Cenário 1: Usuário muda Q2 de "local-physical" para "digital"
1. Em Q2, usuário seleciona "local-physical"
   - Subrota "local-physical-situation" será adicionada
2. Usuário volta e muda Q2 para "digital"
   - `handleAnswer()` detecta mudança em Q2
   - Deleta `answers['local-physical-situation']`
   - Adiciona novo Q2 = "digital"
   - Na próxima navegação, "digital-situation" é adicionada
   - ✅ SEGURO: Apenas uma subrota ativa

### Cenário 2: Usuário em Q9, muda Q2
1. Usuário avança até Q9 (textarea)
2. Volta para Q2 e muda resposta
3. `handleAnswer()` limpa subrota anterior
4. `currentQuestionIndex` continua válido (Q9 ainda existe)
5. ✅ SEGURO: Nenhuma renderização duplicada

### Cenário 3: Mudança rápida de cliques
1. Usuário clica "Próxima" rápido em Q2
2. Cada clique chama `handleNext()` que re-valida lista
3. ✅ SEGURO: Proteção contra race conditions

---

## VERIFICAÇÃO FINAL

- ✅ Nenhum estado solto baseado em flags
- ✅ Todas as respostas em ÚNICO lugar (`answers`)
- ✅ Subrotas são mutuamente exclusivas
- ✅ Limpeza automática de dados antigos
- ✅ Validação de integridade de dados
- ✅ 1 pergunta por renderização garantida

---

## LOGS DE DEBUG

Console logs estão ATIVOS para auditoria:
```
[v0] QUIZ STATE AUDIT: {...}  // Log de estado a cada render
[v0] BUG DETECTADO: IDs duplicados  // Se houver conflito
```

**Remover antes de produção**: Procure por `console.log('[v0]` no código
