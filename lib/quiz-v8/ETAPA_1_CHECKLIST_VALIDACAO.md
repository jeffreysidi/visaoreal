# ETAPA 1 — CHECKLIST DE VALIDAÇÃO

## Confirmações Obrigatórias

✅ **Diagnósticos Base: 12 apenas**
- IDEIA_NIVEL_1
- IDEIA_NIVEL_2
- IDEIA_NIVEL_3
- VALIDACAO_NIVEL_1
- VALIDACAO_NIVEL_2
- VALIDACAO_NIVEL_3
- PEQUENO_NIVEL_1
- PEQUENO_NIVEL_2
- PEQUENO_NIVEL_3
- ESTRUTURADA_NIVEL_1
- ESTRUTURADA_NIVEL_2
- ESTRUTURADA_NIVEL_3

✅ **Plano Padronizado: 5 Chaves Obrigatórias**
Cada diagnóstico deve ter exatamente estas 5 chaves:
1. `autoridade: string` - Positioning e capital social
2. `clareza: string` - Direção estratégica e decisões
3. `execucao: string` - Operação, processos, estrutura
4. `estrategia: string` - Receita, marketing, vendas, modelo
5. `capital: string` - Financeiro, investimento, margem, lucro

✅ **Chaves Antigas Removidas**
- ❌ `direcao` → Migrado para `clareza`
- ❌ `receita` → Migrado para `estrategia`
- ❌ `operacao` → Migrado para `execucao`
- ❌ `marketing_vendas` → Migrado para `estrategia`
- ✅ `capital` → Mantido

✅ **Focus Module Atualizado**
- FOCUS_MODULOS.prioridade agora usa apenas: autoridade, clareza, execucao, estrategia, capital
- Reordering funciona com as 5 chaves padrão
- Sem chaves antigas nos arrays de prioridade

✅ **UI Component Atualizado**
- quiz-section-v8.tsx renderiza labels em português
- labelMap mapeia: autoridade→Autoridade, clareza→Clareza, etc
- Sem exibição de chaves técnicas

✅ **Score, Trilha, Nível, ID Intactos**
- Score: 100% mantido
- Trilha: 100% mantida
- Nível: 100% mantido
- ID: Continua apenas 12 possíveis (${trilha}_NIVEL_${nivel}, sem __FOCO__)
- Engine.ts: buildDiagnosisId() não muda

✅ **Sistema B Segue Funcionando**
- Regras de foco não alteradas
- Focus como overlay mantido
- Nenhum novo ID com __FOCO__

## Status Final
✅ ETAPA 1 COMPLETA
- Estrutura padronizada
- 5 chaves aplicadas a todos os 12 diagnósticos
- Focus module atualizado
- UI renderizando corretamente
- Score/trilha/nível/ID intactos
- Sem erros em build/TypeScript
