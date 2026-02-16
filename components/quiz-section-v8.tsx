'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { PERGUNTAS_V8 } from '@/lib/quiz-v8/answers'
import { gerarDiagnostico, type DiagnosticoResult } from '@/lib/quiz-v8/engine'
import { DIAGNOSTICOS } from '@/lib/quiz-v8/diagnosticos'

type QuizAnswers = {
  p1: number | null
  p2: number | null
  p3: number | null
  p4: number | null
  p5: number | null
  p6: number | null
  p7: number | null
}

// Funções helper para mapear valores técnicos para texto humano
const getTrilhaHumano = (trilha: string): string => {
  const map: Record<string, string> = {
    IDEIA: 'Ideia',
    VALIDACAO: 'Validação',
    PEQUENO: 'Negócio Pequeno',
    ESTRUTURADA: 'Empresa Estruturada',
  }
  return map[trilha] || trilha
}

const getNivelHumano = (nivel: number): string => {
  const map: Record<number, string> = {
    1: 'Inicial',
    2: 'Intermediário',
    3: 'Avançado',
  }
  return map[nivel] || `Nível ${nivel}`
}

const getOpcaoTexto = (pergunta: number, valor: number | null): string => {
  if (valor === null) return '-'
  const perguntaData = PERGUNTAS_V8[pergunta]
  const opcao = perguntaData?.opcoes.find((o) => o.valor === valor)
  return opcao?.texto || '-'
}

export function QuizSectionV8() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 'processing'>(1)
  const [answers, setAnswers] = useState<QuizAnswers>({
    p1: null,
    p2: null,
    p3: null,
    p4: null,
    p5: null,
    p6: null,
    p7: null,
  })
  const [diagnostico, setDiagnostico] = useState<DiagnosticoResult | null>(null)

  // Validação: currentStep deve ser um número de 1-7
  const numericStep = typeof currentStep === 'number' ? currentStep : null
  
  // Obter pergunta atual - PERGUNTAS_V8 é um Record<number, Pergunta>
  const perguntaAtual = numericStep ? PERGUNTAS_V8[numericStep] : null
  const stepKey = numericStep ? (`p${numericStep}` as keyof QuizAnswers) : null
  const respostaAtual = stepKey ? answers[stepKey] : null

  // Verificar se resposta foi selecionada
  const temRespostaSelecionada = respostaAtual !== null

  // Calcular progresso
  const progresso = (numericStep ? numericStep : 1) / 7 * 100

  const handleSelecionarResposta = async (valorResposta: string) => {
    if (!stepKey) return
    
    // Salvar a resposta
    setAnswers((prev) => ({
      ...prev,
      [stepKey]: parseInt(valorResposta, 10),
    }))

    // Auto-avançar após 600ms para visualização da seleção
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (numericStep === 7) {
      // Última pergunta - processar diagnóstico
      setCurrentStep('processing')

      // Simular processamento
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Converter respostas para formato do engine (P1, P2, etc)
      const respostasFormatadas = {
        P1: answers.p1 ?? parseInt(valorResposta, 10), // Usar resposta atual se p7
        P2: answers.p2,
        P3: answers.p3,
        P4: answers.p4,
        P5: answers.p5,
        P6: answers.p6,
        P7: numericStep === 7 ? parseInt(valorResposta, 10) : answers.p7,
      }

      try {
        const resultado = gerarDiagnostico(respostasFormatadas)
        setDiagnostico(resultado)
        console.log('[v0] Diagnóstico gerado:', resultado)

        // ENVIO PARA GOOGLE APPS SCRIPT - Fire and forget
        // Payload com estrutura exata: answers deve ser objeto aninhado
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const payload = {
          sessionId,
          quizVersion: 'V8',
          finishedAt: new Date().toISOString(),
          diagnosticoFinal: `${resultado.trilha}_Nivel_${resultado.nivel}`,
          trilha: resultado.trilha,
          nivel: resultado.nivel,
          score: resultado.score,
          answers: {
            p1: answers.p1,
            p2: answers.p2,
            p3: answers.p3,
            p4: answers.p4,
            p5: answers.p5,
            p6: answers.p6,
            p7: numericStep === 7 ? parseInt(valorResposta, 10) : answers.p7,
          },
          moduladores: resultado.moduladores,
        }

        console.log('[v0] Payload enviando para Apps Script:', JSON.stringify(payload, null, 2))

        // Enviar para Google Apps Script com JSON
        fetch('https://script.google.com/macros/s/AKfycbxQhxTnfoHN3W8oUrUkdFyVXRm6VWcfz_iTn4Ux7Mrf-up3pfnxIO7JbrVyAtdkB5U9/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            console.log('[v0] Quiz enviado para Google Apps Script com sucesso')
          })
          .catch((error) => {
            console.error('[v0] Erro ao enviar para Google Apps Script:', error.message)
          })

        // Salvar também em localStorage para debug
        if (typeof window !== 'undefined') {
          localStorage.setItem('quizDataV8', JSON.stringify(payload))
          console.log('[v0] Quiz V8 salvo em localStorage')
        }
      } catch (error) {
        console.error('[v0] Erro ao gerar diagnóstico:', error)
        setDiagnostico(null)
      }
    } else {
      // Avançar para próxima pergunta
      setCurrentStep((numericStep + 1) as Exclude<typeof currentStep, 'processing'>)
    }
  }

  const handleAnterior = () => {
    if (currentStep === 'processing' || currentStep === 1) return
    setCurrentStep((currentStep - 1) as Exclude<typeof currentStep, 'processing'>)
  }

  const handleReiniciar = () => {
    setCurrentStep(1)
    setAnswers({
      p1: null,
      p2: null,
      p3: null,
      p4: null,
      p5: null,
      p6: null,
      p7: null,
    })
    setDiagnostico(null)
  }

  // Tela de pergunta
  if (!perguntaAtual || currentStep === 'processing') {
    // Se é processamento COM diagnóstico
    if (currentStep === 'processing' && diagnostico) {
      return (
        <section id="diagnostico" className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20">
          <div className="w-full max-w-2xl space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/logo-visao-real-new.png"
                alt="Visão Real"
                width={400}
                height={120}
                className="h-auto w-auto max-w-full"
              />
            </div>

            {/* Resultado */}
            <Card className="border border-border rounded-xl shadow-md backdrop-blur-sm bg-blue-500/5">
              <CardHeader className="pb-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-primary" />
                  <CardTitle className="text-2xl font-bold text-foreground">Seu Diagnóstico</CardTitle>
                </div>
                <CardDescription className="text-muted-foreground opacity-80 pt-2 text-sm">
                  Baseado em suas respostas
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-12 pt-8">
                {/* Obter textos do diagnóstico */}
                {(() => {
                  const textos = DIAGNOSTICOS[diagnostico.trilha as keyof typeof DIAGNOSTICOS]?.[diagnostico.nivel as keyof typeof DIAGNOSTICOS['IDEIA']]
                  if (!textos) return null

                  return (
                    <>
                      {/* Frase Forte */}
                      <div className="space-y-3 border-b border-border/50 pb-8 mb-4">
                        <h3 className="text-2xl font-bold text-foreground leading-relaxed">
                          {textos.frase}
                        </h3>
                      </div>

                      {/* Resumo */}
                      <div className="space-y-3 border-b border-border/50 pb-6 mb-4 mt-6 mb-6">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                          Resumo do seu momento atual
                        </h4>
                        <p className="text-lg text-foreground leading-relaxed font-medium">
                          {textos.resumo}
                        </p>
                      </div>

                      {/* Como chegamos a esse diagnóstico - Glass Card Style */}
                      <div className="space-y-4 border-b border-border/50 pb-8 mb-4">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                          Como chegamos a esse diagnóstico
                        </h4>
                        <div className="backdrop-blur-sm bg-blue-500/5 rounded-lg p-6 space-y-0 border border-border shadow-sm">
                          {/* Estágio atual e desenvolvimento - lado a lado em desktop */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Estágio atual</span>
                              <p className="text-lg font-semibold text-foreground">{getTrilhaHumano(diagnostico.trilha)}</p>
                            </div>
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Nível de maturidade</span>
                              <p className="text-lg font-semibold text-foreground">{getNivelHumano(diagnostico.nivel)}</p>
                            </div>
                          </div>
                          
                          {/* Divisor */}
                          <div className="border-t border-border/40 my-4" />
                          
                          {/* Análise por áreas - Grid 2x3 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Maturidade</span>
                              <p className="text-lg font-semibold text-foreground">{getOpcaoTexto(1, answers.p1)}</p>
                            </div>
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Receita</span>
                              <p className="text-lg font-semibold text-foreground">{getOpcaoTexto(2, answers.p2)}</p>
                            </div>
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Principal dificuldade</span>
                              <p className="text-lg font-semibold text-foreground">{getOpcaoTexto(3, answers.p3)}</p>
                            </div>
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Autoridade</span>
                              <p className="text-lg font-semibold text-foreground">{getOpcaoTexto(4, answers.p4)}</p>
                            </div>
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Capital</span>
                              <p className="text-lg font-semibold text-foreground">{getOpcaoTexto(5, answers.p5)}</p>
                            </div>
                            <div className="space-y-1 mt-4 mb-2">
                              <span className="text-xs font-medium text-blue-accent uppercase tracking-wide opacity-90">Clareza</span>
                              <p className="text-lg font-semibold text-foreground">{getOpcaoTexto(7, answers.p7)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Plano dividido por áreas - Glass Cards */}
                      <div className="space-y-6 pt-4">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                          O que fazer agora
                        </h4>
                        {textos.plano && (
                          <div className="space-y-4">
                            {Object.entries(textos.plano).map(([area, descricao]) => (
                              <div key={area} className="backdrop-blur-sm bg-blue-500/5 border border-border rounded-lg p-4 space-y-2 shadow-sm">
                                <h5 className="font-semibold text-foreground capitalize text-base">
                                  {area.replace(/_/g, ' ')}
                                </h5>
                                <p className="text-foreground text-sm leading-relaxed">
                                  {descricao}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )
                })()}

                {/* Botões */}
                <div className="flex flex-col gap-4 pt-6 border-t border-border">
                  <Link href="/relatorio-estrategico" className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base rounded-lg">
                      Quero meu Diagnóstico Completo
                    </Button>
                  </Link>
                  <Button
                    onClick={handleReiniciar}
                    variant="outline"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'hsl(210, 90%, 60%)',
                      borderColor: 'hsl(210, 90%, 60%)',
                      borderWidth: '2px',
                    }}
                    className="rounded-lg transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'hsl(210, 90%, 60%, 0.1)';
                      e.currentTarget.style.borderColor = 'hsl(210, 90%, 60%)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'hsl(210, 90%, 60%)';
                    }}
                  >
                    Refazer Diagnóstico
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )
    }

    // Se é processamento SEM diagnóstico ainda (spinner)
    return (
      <section id="diagnostico" className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20">
        <Card className="w-full max-w-2xl border border-border rounded-xl shadow-md backdrop-blur-sm bg-blue-500/5">
          <CardHeader className="text-center border-b border-border pb-8">
            <CardTitle className="text-3xl font-bold text-foreground">Processando Diagnóstico</CardTitle>
            <CardDescription className="text-foreground/70 font-medium pt-3">
              Analisando suas respostas...
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 text-center pt-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-700 border-t-primary" />
            </div>
            <p className="text-foreground/80 font-medium max-w-sm mx-auto">
              Estamos gerando seu diagnóstico personalizado...
            </p>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">Análise em progresso</p>
              <Progress value={75} className="h-2 rounded-full" />
            </div>
          </CardContent>
        </Card>
      </section>
    )
  }

  // Tela de pergunta normal
  return (
    <section id="diagnostico" className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-20">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo-visao-real-new.png"
            alt="Visão Real - Diagnóstico de Ideias, Produtos e Negócios"
            width={400}
            height={120}
            className="h-auto w-auto max-w-full"
            priority
          />
        </div>

        {/* Barra de progresso */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-foreground/80">
              Pergunta {currentStep} de 7
            </p>
            <p className="text-sm font-medium text-primary">{Math.round(progresso)}%</p>
          </div>
          <Progress value={progresso} className="h-2 rounded-full" />
        </div>

        {/* Card da pergunta */}
        <Card className="border border-border shadow-md rounded-xl backdrop-blur-sm bg-blue-500/5">
              <CardHeader className="pb-6 border-b border-border">
            <CardTitle className="text-2xl font-bold text-foreground text-balance">
              {perguntaAtual.pergunta}
            </CardTitle>
            {perguntaAtual.descricao && (
              <CardDescription className="text-foreground/70 pt-3">{perguntaAtual.descricao}</CardDescription>
            )}
          </CardHeader>

          <CardContent className="pt-6">
            <RadioGroup value={respostaAtual?.toString() || ''} onValueChange={handleSelecionarResposta}>
              <div className="space-y-4">
                {perguntaAtual.opcoes.map((opcao) => (
                  <div 
                    key={opcao.valor} 
                    className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all ${
                      respostaAtual === opcao.valor 
                        ? 'border-white border-2 bg-primary/10 shadow-lg shadow-white/20' 
                        : 'border-slate-600/40 hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <RadioGroupItem value={opcao.valor.toString()} id={`opcao-${opcao.valor}`} />
                    <Label
                      htmlFor={`opcao-${opcao.valor}`}
                      className="flex-1 cursor-pointer font-medium text-foreground"
                    >
                      {opcao.texto}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Botão Voltar */}
        <div className="flex justify-start pt-6">
          <Button
            onClick={handleAnterior}
            disabled={currentStep === 1}
            variant="outline"
            style={{
              backgroundColor: 'transparent',
              color: '#ffffff',
              borderColor: '#60A5FA',
              borderWidth: '2px',
            }}
            className="rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = '#1E3A8A';
                e.currentTarget.style.borderColor = '#3B82F6';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#60A5FA';
            }}
          >
            ← Voltar
          </Button>
        </div>

        {/* Indicador de seleção automática */}
        <div className="flex items-center justify-center gap-2 text-sm text-foreground/70">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <p>Selecione uma opção para continuar</p>
        </div>
      </div>
    </section>
  )
}
