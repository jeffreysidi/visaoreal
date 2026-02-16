'use client'

import React, { useEffect, useState } from "react"
import Image from 'next/image'
import Script from 'next/script'

export default function PagamentoConfirmado() {
  const [quizData, setQuizData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Dispara evento de conversão do Google Ads
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17950470830/IBgOCKiUovkbEK7lue9C',
        value: 297.0,
        currency: 'BRL'
      })
    }

    // Read quiz data from localStorage
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('quizData')
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          setQuizData(parsed)
          console.log('[v0] Quiz data loaded from localStorage:', parsed)
        } catch (e) {
          console.error('[v0] Error parsing quiz data:', e)
        }
      } else {
        console.warn('[v0] No quiz data found in localStorage')
      }
      setIsLoading(false)
    }
  }, [])

  // If no quiz data and not loading, show error
  if (!isLoading && !quizData) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-20 md:py-28">
          <div className="w-full max-w-2xl text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Diagnóstico não encontrado
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Não foi possível localizar seu diagnóstico. Caso tenha ocorrido algum erro, entre em contato.
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background text-foreground flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center">Carregando...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-20 md:py-28">
        <div className="w-full max-w-2xl space-y-8">
          
          {/* LOGO - Topo da página */}
          <div className="flex justify-center pb-6">
            <Image
              src="/logo-visao-real-new.png"
              alt="Visão Real"
              width={280}
              height={100}
              className="h-auto w-auto"
              priority
            />
          </div>
          
          {/* BLOCO 1 - CONFIRMAÇÃO com Box Atrativo */}
          <div className="rounded-2xl border border-slate-200/40 bg-gradient-to-br from-blue-50/40 to-slate-50/20 p-8 md:p-10 space-y-6 shadow-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Pagamento confirmado
            </h1>

            <div className="space-y-4 text-slate-700">
              <p className="text-base leading-relaxed">
                Recebemos o seu pagamento com sucesso.
                <br />
                Obrigado por confiar no Visão Real.
              </p>

              <p className="text-base leading-relaxed border-t border-slate-200 pt-4">
                Para dar continuidade à análise estratégica e elaborar o seu Relatório Estratégico Completo, precisamos de algumas informações complementares.
                <br />
                O preenchimento abaixo é essencial para que a análise seja feita com precisão.
              </p>
            </div>
          </div>

          {/* BLOCO 2 - FORMULÁRIO */}
          <form action="https://formspree.io/f/xnjzyaln" method="POST" className="space-y-6">
            
            {/* Hidden fields com dados do quiz */}
            <input type="hidden" name="sessionId" value={quizData?.sessionId || ''} />
            <input type="hidden" name="diagnostico_final" value={quizData?.diagnostico_final || ''} />
            <input type="hidden" name="quiz_answers" value={JSON.stringify(quizData?.quiz_answers || {})} />
            <input type="hidden" name="finished_at" value={quizData?.finished_at || ''} />
            <input type="hidden" name="quiz_version" value={quizData?.quiz_version || ''} />

            <h3 className="text-2xl font-bold text-slate-900">
              Informações para elaboração do relatório
            </h3>

            <div className="space-y-6">
              {/* Nome completo */}
              <div className="space-y-2">
                <label htmlFor="nome" className="block text-sm font-medium text-slate-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              {/* E-mail */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-700">
                  WhatsApp <span className="text-slate-500">(opcional)</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+55 (11) 99999-9999"
                />
                <p className="text-xs text-slate-500">
                  Caso precise esclarecer algum ponto do diagnóstico
                </p>
                <p className="text-xs text-slate-500 border-t border-slate-200 pt-2 mt-2">
                  Ao informar seu WhatsApp, você concorda em ser contatado exclusivamente para esclarecimentos relacionados ao seu diagnóstico.
                </p>
              </div>

              {/* Nome do projeto ou negócio */}
              <div className="space-y-2">
                <label htmlFor="projeto" className="block text-sm font-medium text-slate-700">
                  Nome do projeto ou negócio
                </label>
                <input
                  type="text"
                  id="projeto"
                  name="projeto"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Nome do seu projeto"
                />
              </div>

              {/* Tipo de negócio */}
              <div className="space-y-2">
                <label htmlFor="tipoDist" className="block text-sm font-medium text-slate-700">
                  Tipo de negócio
                </label>
                <select
                  id="tipoDist"
                  name="tipoDist"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="ideia">Ideia / Projeto inicial</option>
                  <option value="digital">Negócio digital</option>
                  <option value="servico">Serviço / Consultoria</option>
                  <option value="local">Negócio local</option>
                  <option value="produto">Produto físico</option>
                </select>
              </div>

              {/* Desafio principal */}
              <div className="space-y-2">
                <label htmlFor="desafio" className="block text-sm font-medium text-slate-700">
                  Em uma frase, qual é o principal desafio hoje?
                </label>
                <textarea
                  id="desafio"
                  name="desafio"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows={3}
                  placeholder="Descreva brevemente..."
                />
              </div>

              {/* Tentativas anteriores */}
              <div className="space-y-2">
                <label htmlFor="tentativas" className="block text-sm font-medium text-slate-700">
                  O que você já tentou fazer para resolver isso e não funcionou?
                </label>
                <textarea
                  id="tentativas"
                  name="tentativas"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows={3}
                  placeholder="Descreva o que tentou..."
                />
              </div>

              {/* Decisão adiada */}
              <div className="space-y-2">
                <label htmlFor="decisao" className="block text-sm font-medium text-slate-700">
                  Qual decisão você vem evitando ou adiando tomar?
                </label>
                <textarea
                  id="decisao"
                  name="decisao"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows={3}
                  placeholder="Descreva a decisão..."
                />
              </div>

              {/* Risco crítico */}
              <div className="space-y-2">
                <label htmlFor="risco" className="block text-sm font-medium text-slate-700">
                  O que você NÃO pode se dar ao luxo de errar agora?
                </label>
                <textarea
                  id="risco"
                  name="risco"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows={3}
                  placeholder="Descreva o risco crítico..."
                />
              </div>

              {/* Avanço esperado */}
              <div className="space-y-2">
                <label htmlFor="avanço" className="block text-sm font-medium text-slate-700">
                  Considerando os próximos 6–12 meses, o que seria um avanço "bom o suficiente" para você?
                </label>
                <textarea
                  id="avanço"
                  name="avanço"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows={3}
                  placeholder="Descreva o avanço esperado..."
                />
              </div>

              {/* Informações adicionais */}
              <div className="space-y-2">
                <label htmlFor="informacoes" className="block text-sm font-medium text-slate-700">
                  Existe algo importante que não foi perguntado no diagnóstico ou neste formulário, mas que você acha que precisamos saber para analisar melhor?
                </label>
                <textarea
                  id="informacoes"
                  name="informacoes"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  rows={3}
                  placeholder="Informações adicionais..."
                />
              </div>
            </div>

            {/* Bloco informativo - Próximo passo */}
            <div className="rounded-lg bg-blue-50/40 border border-blue-200/30 p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-900">Próximo passo</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Após o envio das informações, nossa equipe iniciará a análise estratégica.
                <br />
                O Relatório Estratégico Completo será elaborado com base no seu diagnóstico e encaminhado por e-mail em até 24 horas.
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full rounded-xl h-14 font-semibold text-base shadow-md hover:shadow-lg transition-all bg-blue-600 hover:bg-blue-700 text-white"
            >
              Enviar informações e iniciar análise
            </button>
          </form>

          {/* BLOCO 3 - TEXTO FINAL */}
          <div className="text-center">
            <p className="text-xs text-slate-500 leading-relaxed">
              Após o envio das informações, nossa equipe iniciará a análise estratégica.
              <br />
              O relatório será encaminhado por e-mail.
            </p>
          </div>

        </div>
      </div>
    </main>
  )
}
