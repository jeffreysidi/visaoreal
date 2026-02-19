export type Trilha = 'IDEIA' | 'VALIDACAO' | 'PEQUENO' | 'ESTRUTURADA'

export const DIAGNOSTICOS = {
  IDEIA: {
    1: {
      frase: "Sua ideia está em estágio inicial e ainda não foi validada com dados reais.",
      resumo: "Existe uma hipótese de negócio, mas ainda não há evidência concreta de demanda. O objetivo agora é confirmar se existe um problema real e se pessoas estão dispostas a pagar por uma solução.",
      plano: {
        autoridade: "Conversar diretamente com potenciais clientes para entender se o problema realmente existe e é relevante. Registrar padrões de resposta para construir base mínima de legitimidade.",
        clareza: "Em 7 dias: definir um único problema específico e um único perfil de cliente. Em 30 dias: conversar com pelo menos 15 pessoas desse perfil. Métrica: número de confirmações reais do problema.",
        execucao: "Criar roteiro simples de validação e registrar 100% das conversas. Evitar conversas improvisadas sem documentação.",
        estrategia: "Abordagem individual e direta, sem anúncios pagos. Validar interesse real antes de estruturar oferta formal.",
        capital: "Limitar investimento apenas a ferramentas gratuitas ou já disponíveis. Não investir antes de validar o problema."
      }
    },

    2: {
      frase: "Sua ideia já foi testada informalmente, mas o modelo de receita ainda não está comprovado.",
      resumo: "Existe sinal inicial de interesse, porém ainda não há consistência em vendas ou clareza sobre o modelo de geração de receita. O objetivo agora é transformar testes em vendas reais e repetíveis.",
      plano: {
        autoridade: "Utilizar primeiros resultados ou feedbacks positivos como prova inicial ao abordar novos clientes. Começar a estruturar pequenos cases.",
        clareza: "Definir um único canal prioritário de aquisição e uma proposta clara para os próximos 30 dias. Métrica: taxa mínima de conversão definida previamente.",
        execucao: "Documentar passo a passo da oferta e da entrega. Medir tempo, custo e esforço envolvidos em cada venda.",
        estrategia: "Padronizar abordagem comercial e transformar teste em venda real. Focar em repetibilidade, não em volume.",
        capital: "Crescer apenas com a receita gerada. Manter margem positiva em todas as vendas realizadas."
      }
    },

    3: {
      frase: "Sua ideia já gera receita recorrente e precisa de estrutura para crescimento.",
      resumo: "A demanda está comprovada e clientes pagam regularmente. O foco agora é organizar processos, estabilizar margens e preparar expansão sustentável.",
      plano: {
        autoridade: "Organizar e divulgar resultados já obtidos. Transformar clientes satisfeitos em provas sociais estruturadas.",
        clareza: "Identificar os 3 principais gargalos de crescimento. Escolher um foco prioritário para os próximos 30 dias.",
        execucao: "Criar processo padronizado para venda, entrega e suporte. Reduzir dependência de improviso operacional.",
        estrategia: "Escolher uma única estratégia de aquisição escalável e executá-la com consistência por 30 dias.",
        capital: "Reinvestir percentual fixo do lucro em crescimento. Definir política clara de reinvestimento."
      }
    }
  },

  VALIDACAO: {
    1: {
      frase: "Você já tem clientes pagantes, mas a receita ainda é instável e dependente de esforço constante.",
      resumo: "O modelo funciona, porém não é previsível. Há variação na entrada de clientes, na receita mensal e nos processos de entrega. O objetivo agora é estabilizar base e reduzir incerteza.",
      plano: {
        autoridade: "Organizar depoimentos e resultados iniciais para fortalecer credibilidade no segmento atual.",
        clareza: "Definir com precisão o perfil de cliente ideal com pelo menos 5 critérios objetivos. Escolher foco prioritário de atuação para os próximos 30 dias.",
        execucao: "Padronizar processo de entrega com checklist formal. Reduzir retrabalho e variações na execução.",
        estrategia: "Formalizar pedido de indicação ao final de cada entrega. Concentrar aquisição no perfil mais rentável identificado.",
        capital: "Reservar percentual fixo da receita mensal para fundo de segurança. Meta: construir reserva mínima equivalente a 3 meses de custo fixo."
      }
    },

    2: {
      frase: "Seu negócio apresenta estabilidade inicial, mas depende excessivamente da sua presença direta.",
      resumo: "Existe receita previsível e clientes recorrentes, porém a operação ainda é centralizada. O risco está na sobrecarga e na limitação de crescimento.",
      plano: {
        autoridade: "Estruturar portfólio de provas sociais (cases, depoimentos, resultados mensuráveis).",
        clareza: "Mapear todas as atividades executadas pelo fundador e definir quais são estratégicas e quais são operacionais.",
        execucao: "Delegar ou automatizar pelo menos 20% das tarefas operacionais nos próximos 30 dias. Criar manual básico para funções repetitivas.",
        estrategia: "Ajustar posicionamento comercial para aumentar taxa de conversão com base nas provas sociais estruturadas.",
        capital: "Garantir margem operacional mínima definida previamente. Ajustar preços ou custos caso esteja abaixo da meta."
      }
    },

    3: {
      frase: "Seu modelo é previsível e sustentável. O próximo passo é expansão estruturada.",
      resumo: "Clientes recorrentes, receita estável e operação funcional indicam maturidade. O foco agora é decidir direção estratégica e preparar crescimento controlado.",
      plano: {
        autoridade: "Fortalecer posicionamento institucional e consolidar reputação no mercado atual.",
        clareza: "Definir qual será a principal direção de crescimento: expansão de mercado, ampliação de portfólio ou aumento de escala no mercado atual.",
        execucao: "Preparar estrutura para suportar aumento de 50% na demanda sem perda de qualidade.",
        estrategia: "Investir em canal previsível de aquisição com monitoramento claro de custo por cliente.",
        capital: "Avaliar necessidade de capital externo apenas após validar crescimento interno consistente."
      }
    }
  },

  PEQUENO: {
    1: {
      frase: "Seu negócio funciona, mas depende excessivamente da sua execução direta.",
      resumo: "Existe geração de receita, porém você é o centro da operação. O crescimento está limitado pela sua disponibilidade e pela ausência de estrutura formal.",
      plano: {
        autoridade: "Deixar claro seu diferencial competitivo e formalizar posicionamento para fortalecer percepção de valor.",
        clareza: "Listar todas as atividades que você executa e identificar as 3 que podem ser delegadas nos próximos 30 dias.",
        execucao: "Documentar processos principais de venda e entrega. Criar checklist simples para cada etapa.",
        estrategia: "Focar em aumentar base de clientes mantendo padrão atual antes de expandir portfólio.",
        capital: "Construir reserva financeira mínima equivalente a 3 meses de custo fixo pessoal e empresarial."
      }
    },

    2: {
      frase: "Seu negócio já apresenta organização básica, mas precisa evoluir eficiência operacional.",
      resumo: "Existe receita consistente e algum nível de estrutura. O ponto crítico agora é aumentar eficiência e reduzir dependência manual para liberar capacidade estratégica.",
      plano: {
        autoridade: "Consolidar marca com comunicação consistente e provas sociais organizadas.",
        clareza: "Definir meta objetiva de crescimento para os próximos 12 meses com indicador mensurável.",
        execucao: "Automatizar tarefas repetitivas e padronizar atendimento e entrega.",
        estrategia: "Aumentar receita por cliente através de ofertas complementares ou ajustes de preço.",
        capital: "Investir apenas em ferramentas que gerem retorno claro em até 90 dias."
      }
    },

    3: {
      frase: "Seu negócio está estruturado e pronto para crescimento planejado.",
      resumo: "A operação funciona, há previsibilidade e margem saudável. O foco agora é escolher direção estratégica e preparar expansão sem comprometer qualidade.",
      plano: {
        autoridade: "Fortalecer posicionamento institucional para atrair parceiros e talentos.",
        clareza: "Definir plano estratégico de crescimento para os próximos 24 meses com metas claras.",
        execucao: "Delegar funções operacionais e concentrar liderança em estratégia e crescimento.",
        estrategia: "Escolher modelo principal de expansão: novo mercado, novo produto ou aumento de preço.",
        capital: "Reinvestir percentual fixo do lucro em crescimento mantendo margem mínima definida."
      }
    }
  },

  ESTRUTURADA: {
    1: {
      frase: "Sua empresa possui estrutura formal, mas apresenta ineficiências internas.",
      resumo: "Há equipe, processos e receita consolidada, porém existem falhas operacionais ou baixa margem que reduzem potencial de crescimento.",
      plano: {
        autoridade: "Manter consistência institucional e reforçar reputação no mercado atual.",
        clareza: "Auditar áreas críticas e definir um único foco prioritário de melhoria para os próximos 30 dias.",
        execucao: "Mapear processos ponta a ponta e eliminar redundâncias e retrabalho.",
        estrategia: "Revisar precificação e canais de aquisição para aumentar margem.",
        capital: "Cortar investimentos com retorno indefinido e priorizar ações com impacto financeiro mensurável."
      }
    },

    2: {
      frase: "Sua empresa é organizada e eficiente, mas pode ampliar resultado com ajustes estratégicos.",
      resumo: "Processos funcionam e há estabilidade financeira. O próximo passo é otimizar rentabilidade e preparar alavancas de crescimento.",
      plano: {
        autoridade: "Fortalecer posicionamento institucional para consolidar liderança no nicho.",
        clareza: "Definir vetor prioritário de crescimento para os próximos 24 meses.",
        execucao: "Automatizar processos administrativos e liberar equipe para atividades de receita.",
        estrategia: "Testar aumento controlado de preço ou expansão de oferta para clientes existentes.",
        capital: "Revisar estrutura de custos e melhorar retorno sobre investimento por projeto."
      }
    },

    3: {
      frase: "Sua empresa está otimizada e preparada para expansão estratégica relevante.",
      resumo: "Existe eficiência operacional, previsibilidade financeira e reputação consolidada. O foco agora é escalar com disciplina e controle.",
      plano: {
        autoridade: "Usar reputação consolidada para firmar parcerias estratégicas e ampliar presença institucional.",
        clareza: "Definir plano estratégico de 24–36 meses com metas de expansão claras.",
        execucao: "Preparar estrutura para suportar crescimento de 2x sem perda de qualidade.",
        estrategia: "Escalar investimento em aquisição de clientes com monitoramento rigoroso de custo e retorno.",
        capital: "Avaliar capital externo apenas se acelerar crescimento com retorno previsível."
      }
    }
  }
}
