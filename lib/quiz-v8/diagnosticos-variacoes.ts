export type FocoTipo = 'CLAREZA' | 'CAIXA' | 'OPERACAO' | 'AUTORIDADE_APROVEITAR'
export type TrilhaTipo = 'IDEIA' | 'VALIDACAO' | 'PEQUENO' | 'ESTRUTURADA'

export type DiagnosticoTexto = {
  frase: string
  resumo: string
  plano: {
    autoridade: string
    clareza: string
    execucao: string
    estrategia: string
    capital: string
  }
}

export const DIAGNOSTICOS_VARIACOES: Record<
  TrilhaTipo,
  Record<1 | 2 | 3, Partial<Record<FocoTipo, DiagnosticoTexto>>>
> = {
  IDEIA: {
    1: {
      CLAREZA: {
        frase: "Sua ideia está em fase inicial e precisa de definição objetiva antes de testar.",
        resumo: "Você ainda está estruturando sua proposta. O ponto crítico não é execução, é definição clara do problema e da solução. Sem isso, qualquer teste será confuso.",
        plano: {
          autoridade: "Evitar exposição ampla até que a proposta esteja minimamente validada.",
          clareza: "Escrever problema, público e proposta em uma frase simples.\nValidar entendimento com 5 pessoas.",
          execucao: "Testar apenas UMA hipótese principal.",
          estrategia: "Só comunicar após clareza mínima validada.",
          capital: "Não investir antes de definir com precisão."
        }
      },
      CAIXA: {
        frase: "Sua ideia está no início e precisa ser estruturada com disciplina de recursos.",
        resumo: "O estágio é inicial e natural. O ponto crítico agora é evitar desperdício de tempo e dinheiro. Antes de testar em escala, você precisa validar com o menor custo possível.",
        plano: {
          autoridade: "Utilizar rede própria antes de buscar canais pagos.",
          clareza: "Escolher uma hipótese principal para testar.",
          execucao: "Buscar primeiro sinal real de interesse antes de qualquer investimento relevante.",
          estrategia: "Evitar campanhas pagas antes de validar aderência básica.",
          capital: "Definir limite máximo de investimento inicial.\nTrabalhar com validação de baixo custo (entrevistas, protótipo simples)."
        }
      },
      OPERACAO: {
        frase: "Sua ideia está no início e precisa de organização mínima antes de avançar.",
        resumo: "O problema não é a ideia em si. É a falta de organização básica para testar de forma estruturada. Sem método, você pode interpretar errado os resultados.",
        plano: {
          autoridade: "Evitar divulgação ampla até estruturar método mínimo de teste.",
          clareza: "Definir qual resultado valida ou invalida a ideia.",
          execucao: "Criar rotina simples de testes (prazo, hipótese, métrica).\nExecutar testes pequenos e mensuráveis.",
          estrategia: "Não escalar comunicação até ter dados minimamente consistentes.",
          capital: "Só investir após evidência mínima concreta."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Sua ideia está no início, mas você possui rede ou reputação que pode acelerar a validação.",
        resumo: "O estágio ainda é inicial. A vantagem está no ativo de autoridade já existente. Se bem utilizado, pode reduzir drasticamente o tempo de validação.",
        plano: {
          autoridade: "Usar rede atual para validar proposta diretamente com pessoas qualificadas.",
          clareza: "Ajustar proposta com base em retorno qualificado.",
          execucao: "Buscar feedback estruturado de contatos estratégicos.",
          estrategia: "Converter parte da rede em primeiros interessados ou pré-compromissos.",
          capital: "Evitar gastos externos quando a própria rede pode gerar aprendizado."
        }
      }
    },
    2: {
      CLAREZA: {
        frase: "Sua ideia tem sinais positivos, mas falta definição clara do próximo movimento.",
        resumo: "Você já testou e viu que existe potencial. O ponto crítico agora é decidir qual hipótese será aprofundada. Sem definição objetiva, você pode dispersar energia em múltiplas frentes.",
        plano: {
          autoridade: "Evitar ampliar exposição até consolidar a direção escolhida.",
          clareza: "Escolher uma única hipótese principal para desenvolver nos próximos 30 dias.",
          execucao: "Definir métrica clara de sucesso para essa hipótese e acompanhar semanalmente.",
          estrategia: "Concentrar comunicação apenas no público mais responsivo até agora.",
          capital: "Evitar expandir investimento antes de consolidar direção."
        }
      },
      CAIXA: {
        frase: "Sua ideia está evoluindo, mas precisa começar a gerar receita real.",
        resumo: "Você tem indícios de aderência, mas ainda depende de investimento ou esforço não remunerado. O foco agora é transformar teste em fluxo de caixa mínimo viável.",
        plano: {
          autoridade: "Utilizar base atual de interessados para validar oferta paga inicial.",
          clareza: "Ajustar proposta com base no comportamento de compra, não apenas feedback verbal.",
          execucao: "Validar disposição real de pagamento com oferta simples e objetiva.",
          estrategia: "Criar versão paga mínima do que já está funcionando.",
          capital: "Estabelecer meta de receita mínima mensal para sustentar testes."
        }
      },
      OPERACAO: {
        frase: "Sua ideia avança, mas a execução ainda é inconsistente.",
        resumo: "Você está testando e aprendendo, mas a falta de método estruturado pode gerar conclusões erradas. O foco agora é organizar processo de teste e aprendizado.",
        plano: {
          autoridade: "Evitar exposição ampla até que resultados sejam consistentes.",
          clareza: "Tomar decisões baseadas em dados acumulados, não percepção isolada.",
          execucao: "Criar ciclo formal de teste: hipótese → ação → métrica → ajuste.\nRegistrar resultados de cada experimento.",
          estrategia: "Não ampliar aquisição até repetir resultado positivo.",
          capital: "Investir apenas após repetição consistente de resultado positivo."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Sua ideia já tem sinais de validação e você possui reputação que pode acelerar crescimento.",
        resumo: "O estágio ainda é de consolidação, mas a autoridade existente pode reduzir tempo de teste e aumentar velocidade de aquisição de clientes.",
        plano: {
          autoridade: "Posicionar publicamente os primeiros resultados obtidos.",
          clareza: "Usar feedback de clientes qualificados para ajustar proposta.",
          execucao: "Organizar aquisição inicial via rede com processo estruturado.",
          estrategia: "Ativar rede atual para conquistar primeiros clientes pagantes.",
          capital: "Reinvestir receita inicial para acelerar testes."
        }
      }
    },
    3: {
      CLAREZA: {
        frase: "Sua ideia está validada, mas a direção estratégica ainda não está totalmente definida.",
        resumo: "O produto funciona e há aderência. O ponto crítico agora é decidir qual caminho de crescimento seguir. Sem definição clara, você pode crescer de forma desorganizada.",
        plano: {
          autoridade: "Manter posicionamento consistente enquanto a nova direção estratégica é definida.",
          clareza: "Escolher modelo principal de crescimento (ex: nicho específico, escala ampla ou produto complementar).",
          execucao: "Ajustar estrutura para sustentar o crescimento escolhido.",
          estrategia: "Concentrar aquisição no público mais rentável até agora.",
          capital: "Investir proporcionalmente à clareza da estratégia definida."
        }
      },
      CAIXA: {
        frase: "Sua ideia está validada, mas precisa consolidar geração de caixa antes de expandir.",
        resumo: "Existe produto validado, porém a previsibilidade financeira ainda não está sólida. O foco agora é transformar validação em fluxo de caixa consistente.",
        plano: {
          autoridade: "Reforçar credibilidade junto aos clientes recorrentes para aumentar retenção.",
          clareza: "Definir meta mínima de margem antes de ampliar investimento.",
          execucao: "Ajustar custos para manter rentabilidade durante expansão.",
          estrategia: "Priorizar clientes com maior potencial de recorrência e estruturar modelo recorrente.",
          capital: "Definir meta mínima de margem sustentável antes de expandir."
        }
      },
      OPERACAO: {
        frase: "Sua ideia está validada, mas a operação ainda não está preparada para escala.",
        resumo: "O mercado respondeu positivamente, porém os processos ainda dependem demais de você ou são informais. O foco agora é estruturar execução antes de crescer.",
        plano: {
          autoridade: "Evitar ampliar exposição até que a estrutura suporte maior volume.",
          clareza: "Definir metas de crescimento realistas enquanto a estrutura é ajustada.",
          execucao: "Documentar processo completo de venda e entrega.",
          estrategia: "Controlar ritmo de aquisição até que a operação suporte volume maior.",
          capital: "Investir primeiro em organização antes de expandir estratégia."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Sua ideia está validada e sua autoridade pode acelerar crescimento.",
        resumo: "O produto funciona e existe ativo de reputação disponível. O foco agora é converter essa autoridade em aquisição consistente e posicionamento forte.",
        plano: {
          autoridade: "Posicionar publicamente cases ou resultados já obtidos.",
          clareza: "Definir como a autoridade será convertida em vantagem estratégica clara.",
          execucao: "Estruturar processo de aquisição baseado em parcerias e reputação.",
          estrategia: "Ativar parcerias estratégicas que ampliem alcance e estruturar oferta premium.",
          capital: "Reinvestir crescimento de forma disciplinada."
        }
      }
    }
  },

  VALIDACAO: {
    1: {
      CLAREZA: {
        frase: "Seu negócio funciona, mas falta definição clara do caminho de crescimento.",
        resumo: "Há clientes e receita inicial. O ponto crítico agora é decidir qual segmento ou oferta será priorizado. Sem direção clara, você pode crescer de forma desorganizada.",
        plano: {
          autoridade: "Manter comunicação consistente enquanto a direção estratégica é consolidada.",
          clareza: "Escolher segmento principal com melhor resposta até agora.",
          execucao: "Confirmar repetibilidade do resultado no segmento escolhido.",
          estrategia: "Concentrar esforços nos clientes mais rentáveis.",
          capital: "Evitar expandir para novos públicos antes de consolidar foco."
        }
      },
      CAIXA: {
        frase: "Seu negócio está validado, mas o fluxo de caixa ainda é instável.",
        resumo: "Existem clientes, porém a receita varia e gera insegurança operacional. O foco agora é estabilizar previsibilidade antes de pensar em expansão.",
        plano: {
          autoridade: "Reforçar confiança junto aos clientes recorrentes.",
          clareza: "Definir meta mínima de receita mensal previsível.",
          execucao: "Ajustar estrutura para reduzir custo variável excessivo.",
          estrategia: "Criar contratos mais longos ou ofertas recorrentes.",
          capital: "Construir reserva mínima equivalente a 3 meses de custo fixo."
        }
      },
      OPERACAO: {
        frase: "Seu negócio está validado, mas a operação ainda é frágil.",
        resumo: "Você já vende, porém processos são informais ou dependem demais de esforço individual. O foco agora é organizar execução para evitar colapso com crescimento.",
        plano: {
          autoridade: "Evitar ampliar exposição enquanto a estrutura é organizada.",
          clareza: "Reduzir volume se necessário para estruturar operação.",
          execucao: "Documentar processo completo de atendimento e entrega.",
          estrategia: "Manter base atual antes de expandir.",
          capital: "Investir primeiro em organização antes de estratégia agressiva."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Seu negócio já tem validação e reputação que pode acelerar crescimento.",
        resumo: "Você possui clientes satisfeitos e reconhecimento inicial. O ponto agora é transformar essa autoridade em expansão mais rápida e previsível.",
        plano: {
          autoridade: "Coletar e divulgar depoimentos estruturados.",
          clareza: "Priorizar crescimento dentro do nicho onde autoridade já é forte.",
          execucao: "Organizar processo formal de indicação.",
          estrategia: "Criar estratégia estruturada de indicação e oferta premium.",
          capital: "Reinvestir crescimento com disciplina financeira."
        }
      }
    },

    2: {
      CLAREZA: {
        frase: "Seu negócio funciona bem, mas a estratégia de crescimento ainda não está totalmente definida.",
        resumo: "Existe receita estável e clientes recorrentes. O ponto crítico agora é definir qual alavanca principal será priorizada.",
        plano: {
          autoridade: "Manter posicionamento consistente enquanto define nova direção.",
          clareza: "Definir meta estratégica clara para os próximos 12 meses.",
          execucao: "Ajustar capacidade operacional ao plano definido.",
          estrategia: "Escolher principal vetor de crescimento (preço, volume ou novo produto).",
          capital: "Investir apenas na estratégia escolhida."
        }
      },
      CAIXA: {
        frase: "Seu negócio tem receita, mas precisa aumentar previsibilidade financeira.",
        resumo: "A operação funciona, porém a variação no fluxo de caixa limita decisões estratégicas.",
        plano: {
          autoridade: "Fortalecer relacionamento com clientes recorrentes.",
          clareza: "Definir meta mínima de margem líquida sustentável.",
          execucao: "Ajustar custos para manter estabilidade mesmo com variações sazonais.",
          estrategia: "Estruturar contratos recorrentes ou planos de fidelização.",
          capital: "Priorizar clientes com maior ciclo de vida."
        }
      },
      OPERACAO: {
        frase: "Seu negócio cresce, mas a eficiência operacional ainda pode melhorar.",
        resumo: "Há receita e demanda, mas parte do crescimento pode estar sendo consumida por ineficiências internas.",
        plano: {
          autoridade: "Evitar ampliar comunicação até otimizar processos.",
          clareza: "Definir padrão mínimo de qualidade e tempo de entrega.",
          execucao: "Identificar gargalos que geram retrabalho ou atraso.",
          estrategia: "Ajustar precificação se necessário para refletir eficiência real.",
          capital: "Investir em ferramentas que aumentem produtividade."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Seu negócio já possui reputação que pode ser melhor explorada.",
        resumo: "Clientes confiam em você e há reconhecimento no mercado. O ponto agora é transformar autoridade existente em expansão estruturada.",
        plano: {
          autoridade: "Posicionar marca com mais consistência no mercado.",
          clareza: "Expandir primeiro onde autoridade já é forte.",
          execucao: "Organizar parcerias estratégicas com players complementares.",
          estrategia: "Criar ofertas premium baseadas na reputação já construída.",
          capital: "Reinvestir crescimento com disciplina."
        }
      }
    },

    3: {
      CLAREZA: {
        frase: "Seu negócio é sólido, mas falta definição clara da próxima fase.",
        resumo: "A operação é estável e a receita previsível. O ponto crítico agora é decidir qual direção estratégica seguir.",
        plano: {
          autoridade: "Manter posicionamento institucional forte.",
          clareza: "Definir objetivo estratégico para os próximos 24 meses.",
          execucao: "Ajustar estrutura para suportar direção escolhida.",
          estrategia: "Escolher entre aprofundar mercado atual ou expandir para novo segmento.",
          capital: "Alocar investimento conforme estratégia definida."
        }
      },
      CAIXA: {
        frase: "Seu negócio é lucrativo, mas pode melhorar eficiência financeira.",
        resumo: "Há lucro e estabilidade, porém parte do potencial pode estar sendo perdido por falta de otimização.",
        plano: {
          autoridade: "Reforçar credibilidade institucional.",
          clareza: "Definir meta clara de margem mínima sustentável.",
          execucao: "Reduzir desperdícios operacionais.",
          estrategia: "Ajustar precificação onde houver espaço.",
          capital: "Revisar custos fixos e variáveis."
        }
      },
      OPERACAO: {
        frase: "Seu negócio é consolidado, mas precisa evoluir eficiência operacional para próxima escala.",
        resumo: "A estrutura atual funciona bem no volume atual. O ponto crítico é preparar processos para suportar crescimento maior.",
        plano: {
          autoridade: "Evitar expansão abrupta até consolidar estrutura.",
          clareza: "Planejar capacidade para crescimento de 2x.",
          execucao: "Revisar processos críticos e automatizar onde possível.",
          estrategia: "Expandir somente após confirmar capacidade operacional.",
          capital: "Investir primeiro em estrutura antes de estratégia agressiva."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Seu negócio é consolidado e possui autoridade que pode ampliar escala.",
        resumo: "Existe reputação forte no mercado. O ponto agora é usar essa posição para acelerar expansão estruturada.",
        plano: {
          autoridade: "Fortalecer presença institucional e posicionamento estratégico.",
          clareza: "Expandir primeiro onde marca já é reconhecida.",
          execucao: "Estruturar alianças estratégicas com empresas complementares.",
          estrategia: "Criar ofertas premium baseadas em confiança já estabelecida.",
          capital: "Reinvestir expansão de forma disciplinada."
        }
      }
    }
  },
  PEQUENO: {
    1: {
      CLAREZA: {
        frase: "Seu negócio opera, mas falta definição clara de prioridade.",
        resumo: "Existe receita, porém há dispersão de energia entre múltiplas atividades. O ponto crítico agora é escolher foco principal para evitar sobrecarga e crescimento desorganizado.",
        plano: {
          autoridade: "Manter posicionamento coerente enquanto consolida foco estratégico.",
          clareza: "Definir qual produto ou serviço é prioridade absoluta nos próximos 60 dias.",
          execucao: "Eliminar tarefas que não contribuem diretamente para a prioridade definida.",
          estrategia: "Concentrar esforços apenas no serviço mais rentável.",
          capital: "Investir apenas no que fortalece o foco escolhido."
        }
      },
      CAIXA: {
        frase: "Seu negócio funciona, mas o caixa é frágil.",
        resumo: "Há faturamento, porém a instabilidade financeira limita decisões e gera pressão. O foco agora é fortalecer previsibilidade antes de pensar em crescimento.",
        plano: {
          autoridade: "Reforçar credibilidade com clientes atuais para aumentar recorrência.",
          clareza: "Evitar expansão até estabilizar fluxo de caixa.",
          execucao: "Reduzir despesas não essenciais temporariamente.",
          estrategia: "Aumentar frequência de venda para clientes atuais.",
          capital: "Criar reserva mínima equivalente a 3 meses de custo fixo."
        }
      },
      OPERACAO: {
        frase: "Seu negócio gera receita, mas a organização limita eficiência.",
        resumo: "A dependência excessiva do fundador e a ausência de processos formais criam risco operacional.",
        plano: {
          autoridade: "Evitar ampliar exposição até estruturar base operacional.",
          clareza: "Delegar pelo menos uma atividade operacional em até 30 dias.",
          execucao: "Documentar passo a passo do processo de venda e entrega.",
          estrategia: "Manter base atual enquanto estrutura é organizada.",
          capital: "Investir primeiro em organização antes de estratégia adicional."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Seu negócio já tem reconhecimento que pode ser melhor explorado.",
        resumo: "Há confiança construída no mercado, mas ainda pouco explorada para gerar crescimento consistente.",
        plano: {
          autoridade: "Solicitar depoimentos formais e divulgar resultados.",
          clareza: "Expandir dentro do nicho onde reputação já é forte.",
          execucao: "Organizar programa estruturado de indicação.",
          estrategia: "Desenvolver oferta premium baseada na confiança já estabelecida.",
          capital: "Reinvestir crescimento com disciplina financeira."
        }
      }
    },

    2: {
      CLAREZA: {
        frase: "Seu negócio está estável, mas falta definição clara da próxima alavanca de crescimento.",
        resumo: "Existe organização mínima e receita consistente. O ponto crítico agora é decidir qual será o principal vetor de expansão.",
        plano: {
          autoridade: "Manter comunicação alinhada ao posicionamento definido.",
          clareza: "Definir meta de crescimento objetiva para os próximos 12 meses.",
          execucao: "Ajustar capacidade operacional à estratégia escolhida.",
          estrategia: "Escolher um único vetor de crescimento para priorizar.",
          capital: "Investir apenas no crescimento alinhado à meta definida."
        }
      },
      CAIXA: {
        frase: "Seu negócio está funcionando, mas precisa aumentar previsibilidade financeira.",
        resumo: "A operação é consistente, porém o fluxo de caixa pode apresentar variações que limitam segurança estratégica.",
        plano: {
          autoridade: "Reforçar relacionamento com clientes recorrentes.",
          clareza: "Evitar expansão agressiva até estabilizar fluxo.",
          execucao: "Reduzir custo variável desnecessário.",
          estrategia: "Estruturar contratos recorrentes ou planos de fidelização.",
          capital: "Definir meta mínima de margem líquida."
        }
      },
      OPERACAO: {
        frase: "Seu negócio está crescendo, mas a eficiência operacional pode melhorar.",
        resumo: "Há estabilidade e clientes satisfeitos, porém processos ainda podem estar consumindo tempo excessivo.",
        plano: {
          autoridade: "Evitar ampliação de exposição até otimizar processos.",
          clareza: "Padronizar atendimento e entrega.",
          execucao: "Automatizar tarefas repetitivas.",
          estrategia: "Ajustar precificação se eficiência aumentar margem.",
          capital: "Investir em ferramentas que aumentem produtividade."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Seu negócio já tem reputação que pode impulsionar expansão.",
        resumo: "Existe reconhecimento no nicho e confiança construída.",
        plano: {
          autoridade: "Formalizar posicionamento de marca no mercado.",
          clareza: "Expandir primeiro onde reputação já é consolidada.",
          execucao: "Estruturar parcerias estratégicas dentro do nicho.",
          estrategia: "Desenvolver produtos ou serviços premium.",
          capital: "Reinvestir expansão com disciplina."
        }
      }
    },

    3: {
      CLAREZA: {
        frase: "Seu negócio está pronto para crescer, mas a direção estratégica precisa ser definida.",
        resumo: "A operação é estável, a receita é saudável e existe capacidade de expansão.",
        plano: {
          autoridade: "Fortalecer posicionamento institucional.",
          clareza: "Definir plano estratégico de crescimento para os próximos 24 meses.",
          execucao: "Ajustar estrutura à estratégia definida.",
          estrategia: "Escolher principal modelo de expansão.",
          capital: "Investir apenas após definição clara da direção."
        }
      },
      CAIXA: {
        frase: "Seu negócio está pronto para expandir, mas precisa fortalecer margem e previsibilidade.",
        resumo: "Existe estabilidade operacional, porém a expansão exige maior controle financeiro.",
        plano: {
          autoridade: "Reforçar credibilidade institucional.",
          clareza: "Expandir somente após estabilizar indicadores financeiros.",
          execucao: "Reduzir custos que não contribuem diretamente para crescimento.",
          estrategia: "Priorizar contratos de maior duração.",
          capital: "Revisar margem líquida e definir meta mínima sustentável."
        }
      },
      OPERACAO: {
        frase: "Seu negócio está preparado para crescer, mas a operação precisa suportar maior escala.",
        resumo: "Processos funcionam no volume atual. O ponto crítico agora é garantir que a estrutura aguente crescimento.",
        plano: {
          autoridade: "Evitar crescimento abrupto antes de estruturar capacidade.",
          clareza: "Planejar expansão gradual.",
          execucao: "Revisar capacidade operacional para crescimento de 2x.",
          estrategia: "Ajustar oferta caso aumento de demanda gere sobrecarga.",
          capital: "Investir primeiro em estrutura antes de estratégia agressiva."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Seu negócio é sólido e sua reputação pode acelerar expansão.",
        resumo: "Existe base forte de clientes e reconhecimento no nicho.",
        plano: {
          autoridade: "Fortalecer posicionamento institucional.",
          clareza: "Expandir primeiro onde reputação já é dominante.",
          execucao: "Criar alianças estratégicas para ampliar alcance.",
          estrategia: "Desenvolver ofertas premium para base existente.",
          capital: "Reinvestir crescimento com disciplina."
        }
      }
    }
  },
  ESTRUTURADA: {
    1: {
      CLAREZA: {
        frase: "Sua empresa tem estrutura, mas falta definição clara de prioridade estratégica.",
        resumo: "Processos existem e a operação funciona, porém há múltiplas frentes abertas ou objetivos pouco definidos.",
        plano: {
          autoridade: "Manter posicionamento institucional consistente.",
          clareza: "Definir objetivo estratégico único para os próximos 12 meses.",
          execucao: "Reduzir iniciativas paralelas que não contribuem para a meta principal.",
          estrategia: "Priorizar produtos ou serviços com maior margem.",
          capital: "Alocar investimento apenas nas ações alinhadas ao foco definido."
        }
      },
      CAIXA: {
        frase: "Sua empresa tem estrutura, mas a eficiência financeira pode melhorar.",
        resumo: "Existe operação organizada, porém a margem ou previsibilidade financeira não está no nível ideal.",
        plano: {
          autoridade: "Reforçar credibilidade institucional no mercado.",
          clareza: "Definir meta clara de margem mínima.",
          execucao: "Eliminar desperdícios e retrabalho.",
          estrategia: "Ajustar precificação onde houver espaço competitivo.",
          capital: "Revisar custos fixos e variáveis."
        }
      },
      OPERACAO: {
        frase: "Sua empresa possui estrutura formal, mas a operação apresenta falhas internas.",
        resumo: "Há equipe e processos, porém inconsistências operacionais reduzem eficiência.",
        plano: {
          autoridade: "Evitar expansão até consolidar eficiência interna.",
          clareza: "Identificar gargalos com impacto direto em margem.",
          execucao: "Mapear processos críticos de ponta a ponta.",
          estrategia: "Manter volume atual até estabilizar execução.",
          capital: "Investir primeiro em organização antes de expansão."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Sua empresa tem reconhecimento que pode ser melhor explorado.",
        resumo: "Existe reputação construída, mas ainda pouco convertida em crescimento estruturado.",
        plano: {
          autoridade: "Formalizar posicionamento institucional no mercado.",
          clareza: "Expandir primeiro onde marca já é reconhecida.",
          execucao: "Firmar parcerias estratégicas baseadas na reputação existente.",
          estrategia: "Desenvolver ofertas premium ou ampliar ticket médio.",
          capital: "Reinvestir crescimento com disciplina."
        }
      }
    },

    2: {
      CLAREZA: {
        frase: "Sua empresa é eficiente, mas falta definição clara da próxima alavanca de crescimento.",
        resumo: "A operação está organizada e a receita é estável.",
        plano: {
          autoridade: "Fortalecer posicionamento institucional.",
          clareza: "Definir meta estratégica objetiva para os próximos 24 meses.",
          execucao: "Ajustar estrutura à estratégia escolhida.",
          estrategia: "Escolher principal vetor de expansão.",
          capital: "Direcionar investimento apenas à expansão definida."
        }
      },
      CAIXA: {
        frase: "Sua empresa é eficiente, mas pode melhorar rentabilidade.",
        resumo: "Existe previsibilidade e organização, porém há espaço para ganho de margem.",
        plano: {
          autoridade: "Reforçar credibilidade institucional.",
          clareza: "Estabelecer meta de margem mínima sustentável.",
          execucao: "Eliminar processos redundantes.",
          estrategia: "Ajustar precificação com base em valor percebido.",
          capital: "Revisar estrutura de custos e contratos."
        }
      },
      OPERACAO: {
        frase: "Sua empresa é organizada, mas pode aumentar eficiência operacional.",
        resumo: "Processos funcionam, porém ainda existem pontos de melhoria.",
        plano: {
          autoridade: "Evitar expansão até consolidar eficiência interna.",
          clareza: "Definir indicadores claros de eficiência operacional.",
          execucao: "Automatizar processos administrativos repetitivos.",
          estrategia: "Ajustar oferta caso eficiência aumente margem.",
          capital: "Investir em tecnologia que reduza custo estrutural."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Sua empresa possui reputação sólida que pode acelerar crescimento.",
        resumo: "Há reconhecimento no mercado e confiança estabelecida.",
        plano: {
          autoridade: "Fortalecer posicionamento institucional.",
          clareza: "Expandir primeiro onde marca já é dominante.",
          execucao: "Criar alianças estratégicas com empresas complementares.",
          estrategia: "Desenvolver ofertas premium baseadas em reputação.",
          capital: "Reinvestir expansão com disciplina."
        }
      }
    },

    3: {
      CLAREZA: {
        frase: "Sua empresa está otimizada, mas a próxima direção estratégica precisa ser definida.",
        resumo: "A operação é eficiente e a estrutura suporta crescimento.",
        plano: {
          autoridade: "Manter posicionamento institucional forte.",
          clareza: "Definir plano estratégico de 24–36 meses com meta clara.",
          execucao: "Ajustar capacidade conforme direção definida.",
          estrategia: "Escolher principal vetor de expansão.",
          capital: "Alocar investimento apenas após validação da estratégia escolhida."
        }
      },
      CAIXA: {
        frase: "Sua empresa é sólida, mas há espaço para otimização financeira estratégica.",
        resumo: "Existe lucratividade e previsibilidade, porém há espaço para maximizar eficiência do capital.",
        plano: {
          autoridade: "Reforçar reputação institucional.",
          clareza: "Estabelecer meta clara de retorno sobre investimento.",
          execucao: "Reduzir custos que não geram retorno estratégico.",
          estrategia: "Ajustar mix de produtos com foco em margem.",
          capital: "Revisar alocação de capital e retorno por projeto."
        }
      },
      OPERACAO: {
        frase: "Sua empresa está preparada para crescer, mas precisa estruturar a próxima camada operacional.",
        resumo: "A operação atual é eficiente no volume presente.",
        plano: {
          autoridade: "Evitar expansão abrupta antes de estruturar nova camada.",
          clareza: "Definir limites operacionais antes de ampliar aquisição.",
          execucao: "Planejar estrutura para suportar crescimento de 2x ou mais.",
          estrategia: "Expandir gradualmente conforme capacidade comprovada.",
          capital: "Investir em estrutura antes de estratégia agressiva."
        }
      },
      AUTORIDADE_APROVEITAR: {
        frase: "Sua empresa é sólida e possui reputação que pode acelerar expansão estratégica.",
        resumo: "Existe autoridade consolidada no mercado.",
        plano: {
          autoridade: "Fortalecer presença institucional e posicionamento de marca.",
          clareza: "Expandir de forma planejada, não reativa.",
          execucao: "Criar alianças estratégicas de alto impacto.",
          estrategia: "Desenvolver linhas premium ou expansão de mercado.",
          capital: "Reinvestir crescimento com disciplina estratégica."
        }
      }
    }
  }
}
