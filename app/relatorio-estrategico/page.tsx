'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default function RelatorioEstrategico() {
  const router = useRouter()
  const [quizData, setQuizData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Read quiz data from localStorage
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('quizData')
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData)
          setQuizData(parsed)
        } catch (e) {
          console.error('[v0] Error parsing quiz data:', e)
        }
      }
      setIsLoading(false)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HEADER - Logo */}
      <header className="bg-background border-b border-border px-4 py-6">
        <div className="flex justify-center max-w-7xl mx-auto">
          <Image
            src="/logo-visao-real-new.png"
            alt="Visão Real"
            width={280}
            height={100}
            className="h-auto w-auto max-w-xs"
            priority
          />
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="flex-1 px-4 py-16 sm:py-20">
        <div className="w-full max-w-4xl mx-auto space-y-16 sm:space-y-20">

          {/* SEÇÃO 1: HERO */}
          <section className="space-y-3">
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.045] text-balance max-w-full lg:max-w-[70%]" style={{ letterSpacing: '-0.02em' }}>
                Saiba qual <span className="hero-highlight">decisão</span> faz mais sentido para o seu negócio agora.
              </h1>
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed max-w-full lg:max-w-[75%] text-balance mt-2" style={{ fontSize: '0.92rem', lineHeight: '1.59' }}>
                Um diagnóstico estratégico estruturado que identifica o ponto que precisa ser resolvido e indica o próximo passo racional.
              </p>
            </div>
            <p className="text-sm text-foreground/50">
              Entrega em até 24 horas após o formulário complementar.
            </p>
          </section>

          {/* SEÇÃO 2: O QUE VOCÊ RECEBE */}
          <section className="space-y-4 bg-background/50 rounded-lg p-6 sm:p-8 border border-border">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.85rem)' }}>
                O que você recebe
              </h2>
              <p className="text-foreground/70 text-base">
                Um relatório objetivo para você parar de decidir no escuro e agir com mais racionalidade.
              </p>
            </div>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2.5"></div>
                <span className="text-foreground/80">Identificação do principal ponto que está limitando seu avanço</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2.5"></div>
                <span className="text-foreground/80">Explicação clara da causa real do problema</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2.5"></div>
                <span className="text-foreground/80">Análise de riscos e decisões desalinhadas</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2.5"></div>
                <span className="text-foreground/80">Indicação objetiva do próximo passo estratégico</span>
              </li>
            </ul>
          </section>

          {/* SEÇÃO 3: O QUE É AVALIADO */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.85rem)' }}>
              O que é avaliado
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2"></div>
                <span className="text-foreground/80">Clareza da proposta de valor</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2"></div>
                <span className="text-foreground/80">Coerência entre produto, mercado e receita</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2"></div>
                <span className="text-foreground/80">Estrutura de geração de valor</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2"></div>
                <span className="text-foreground/80">Capacidade real de execução</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2"></div>
                <span className="text-foreground/80">Riscos estruturais invisíveis</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-[#E6B54A] rounded-full mt-2"></div>
                <span className="text-foreground/80">Decisões tomadas fora do contexto estratégico</span>
              </li>
            </ul>
            <p className="text-foreground/70 pt-4 text-sm font-medium">
              Não se trata de opinião. É uma análise estruturada com critérios objetivos.
            </p>
          </section>

          {/* SEÇÃO 4: COMO FUNCIONA */}
          <section className="space-y-4 bg-background/50 rounded-lg p-6 sm:p-8 border border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.85rem)' }}>
              Como funciona
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-semibold text-foreground">Você conclui o diagnóstico inicial.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-semibold text-foreground">Preenche um breve formulário complementar.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-semibold text-foreground">Recebe o Relatório Estratégico Completo por e-mail em até 24 horas.</p>
                </div>
              </div>
            </div>
            <p className="text-foreground/70 text-sm pt-2">
              Cada relatório é analisado individualmente, com revisão humana.
            </p>
          </section>

          {/* SEÇÃO 5: TEXTO EXPLICATIVO PRÉ-FORMULÁRIO */}
          <section className="rounded-lg p-8 sm:p-10 mt-20 sm:mt-24 border-2" style={{ backgroundColor: '#E6B54A', borderColor: '#D9A843' }}>
            <p className="leading-relaxed font-semibold" style={{ color: '#0F2E5A' }}>
              Para concluir o diagnóstico ampliado do seu negócio, precisamos de algumas informações adicionais sobre o contexto atual do projeto.
            </p>
            <p className="leading-relaxed font-semibold mt-4" style={{ color: '#0F2E5A' }}>
              O preenchimento leva cerca de 2 minutos.
            </p>
          </section>

          {/* SEÇÃO 6: FORMULÁRIO */}
          <section id="bloco-formulario" className="space-y-6 scroll-mt-20">
            <form action="https://formspree.io/f/xnjzyaln" method="POST" className="space-y-6">
              
              {/* Hidden fields com dados do quiz */}
              <input type="hidden" name="sessionId" value={quizData?.sessionId || ''} />
              <input type="hidden" name="diagnostico_final" value={quizData?.diagnostico_final || ''} />
              <input type="hidden" name="quiz_answers" value={JSON.stringify(quizData?.quiz_answers || {})} />
              <input type="hidden" name="finished_at" value={quizData?.finished_at || ''} />
              <input type="hidden" name="quiz_version" value={quizData?.quiz_version || ''} />

              <h3 className="text-2xl font-bold text-slate-900">
                Informações complementares para o diagnóstico ampliado
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
          </section>

          {/* SEÇÃO 7: QUEM ANALISA */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.85rem)' }}>
              Quem analisa
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center md:justify-start">
                <Image
                  src="/jeffrey-sidi.jpg"
                  alt="Jeffrey E. Sidi"
                  width={300}
                  height={400}
                  className="rounded-lg w-full max-w-sm object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Jeffrey E. Sidi
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    Estrategista com mais de 20 anos estruturando negócios, produtos e decisões em diferentes mercados.
                  </p>
                  <p className="text-foreground/80 leading-relaxed mt-4">
                    O Visão Real consolida essa experiência em um diagnóstico prático para empreendedores que precisam clareza antes de agir.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* DISCLAIMER */}
          <section className="space-y-6 pt-8 border-t border-border">
            <p className="text-xs text-foreground/50 leading-relaxed text-center">
              Este relatório não é coaching, mentoria motivacional ou curso. Trata-se de um diagnóstico estratégico objetivo entregue em até 24 horas após o preenchimento do formulário complementar.
            </p>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o diagnóstico
              </Button>
            </div>
          </section>

          {/* RODAPÉ */}
          <footer className="space-y-6 pt-12 border-t border-border/20">
            <div className="space-y-4 text-center">
              <p className="text-sm text-foreground/70 font-semibold">
                Visão Real — Sistema de Diagnóstico Estratégico
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-xs text-foreground/70">
                <span>Contato: contato@visaoreal.app</span>
                <span className="hidden sm:block">|</span>
                <a href="#" className="hover:text-foreground/90 transition-colors">Política de Privacidade</a>
                <span>|</span>
                <a href="#" className="hover:text-foreground/90 transition-colors">Termos de Uso</a>
              </div>
              <p className="text-xs text-foreground/70 pt-2">
                © 2026 Visão Real. Todos os direitos reservados.
              </p>
            </div>
          </footer>

        </div>
      </div>
    </main>
  )
}
