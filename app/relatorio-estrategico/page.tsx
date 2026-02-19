'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Shield, Mail, MessageCircle } from 'lucide-react'
import Script from 'next/script'
import Image from 'next/image'

export default function RelatorioEstrategico() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Script 
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />

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
          <section className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.045] text-balance max-w-full lg:max-w-[70%]" style={{ letterSpacing: '-0.02em' }}>
                Saiba qual <span className="hero-highlight">decisão</span> faz mais sentido para o seu negócio agora.
              </h1>
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed max-w-full lg:max-w-[75%] text-balance mt-4" style={{ fontSize: '0.92rem', lineHeight: '1.59' }}>
                Um diagnóstico estratégico estruturado que identifica o ponto que precisa ser resolvido e indica o próximo passo racional.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-start sm:justify-start">
              <Button 
                onClick={() => {
                  const elemento = document.getElementById('bloco-pagamento')
                  if (elemento) {
                    elemento.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                }}
                size="lg"
                className="w-[92%] sm:w-auto text-base font-semibold h-14 rounded-[12px] text-[#0F2E5A] transition-all"
                style={{ 
                  backgroundColor: '#E6B54A', 
                  borderColor: '#E6B54A',
                  paddingLeft: 'calc(2.5rem - 6%)',
                  paddingRight: 'calc(2.5rem - 6%)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D9A843'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E6B54A'
                }}
              >
                Quero receber meu Relatório Estratégico
              </Button>
            </div>
            <p className="text-sm text-foreground/50 pt-2">
              Entrega em até 24 horas após o formulário complementar.
            </p>
          </section>

          {/* SEÇÃO 2: O QUE VOCÊ RECEBE */}
          <section className="space-y-[6.6rem] bg-background/50 rounded-lg p-8 sm:p-10 border border-border">
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
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-foreground/50 rounded-full mt-2"></div>
                <span className="text-foreground/80">Clareza da proposta e posicionamento</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-foreground/50 rounded-full mt-2"></div>
                <span className="text-foreground/80">Coerência entre produto, mercado e receita</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-foreground/50 rounded-full mt-2"></div>
                <span className="text-foreground/80">Estrutura de geração de valor</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-foreground/50 rounded-full mt-2"></div>
                <span className="text-foreground/80">Capacidade real de execução</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-foreground/50 rounded-full mt-2"></div>
                <span className="text-foreground/80">Riscos estruturais invisíveis</span>
              </li>
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-1.5 h-1.5 bg-foreground/50 rounded-full mt-2"></div>
                <span className="text-foreground/80">Decisões tomadas fora de contexto estratégico</span>
              </li>
            </ul>
            <p className="text-foreground/70 pt-4 text-sm font-medium">
              Não se trata de opinião. É uma análise estruturada com critérios objetivos.
            </p>
          </section>

          {/* SEÇÃO 4: COMO FUNCIONA */}
          <section className="space-y-[6.6rem] bg-background/50 rounded-lg p-8 sm:p-10 border border-border">
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

          {/* SEÇÃO 5: GARANTIA */}
          <section className="space-y-4 bg-background/80 rounded-lg p-8 sm:p-10 border-2 border-foreground/20">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-foreground flex-shrink-0 mt-0.5" />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.85rem)' }}>
                  Garantia de Clareza
                </h2>
                <p className="text-foreground/80">
                  Se o relatório não trouxer clareza real sobre qual decisão faz mais sentido para o seu negócio neste momento, basta solicitar reembolso em até 7 dias.
                </p>
                <p className="text-foreground/60 text-sm font-medium">
                  Sem burocracia.
                </p>
              </div>
            </div>
          </section>

          {/* SEÇÃO 6: INVESTIMENTO + CTA */}
          <section id="investimento" className="space-y-6 bg-background/50 rounded-lg p-8 sm:p-10 border border-border scroll-mt-20">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.85rem)' }}>
                Investimento
              </h2>
              <div className="mb-6">
                <p className="text-5xl sm:text-6xl font-extrabold text-foreground mb-2" style={{ letterSpacing: '-0.01em', fontSize: 'clamp(2.8rem, 8vw, 5rem)' }}>
                  R$ 297
                </p>
                <p className="text-foreground/75" style={{ lineHeight: '1.575' }}>
                  Um investimento pequeno comparado ao custo de uma decisão errada.
                </p>
              </div>
            </div>
            <Button 
              onClick={() => {
                const elemento = document.getElementById('bloco-pagamento')
                if (elemento) {
                  elemento.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
              }}
              size="lg"
              className="w-full text-base font-semibold h-14 rounded-[12px] text-[#0F2E5A] transition-all"
              style={{ 
                backgroundColor: '#E6B54A', 
                borderColor: '#E6B54A',
                paddingLeft: 'calc(2.5rem - 6%)',
                paddingRight: 'calc(2.5rem - 6%)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D9A843'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E6B54A'
              }}
            >
              Quero receber meu Relatório Estratégico
            </Button>
            <p className="text-sm text-foreground/50 text-center">
              Você será direcionado para o pagamento seguro no Stripe.
            </p>
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

          {/* SEÇÃO 8: SUPORTE HUMANO */}
          <section className="space-y-[6.6rem] bg-background/50 rounded-lg p-8 sm:p-10 border border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.85rem)' }}>
              Suporte humano
            </h2>
            <p className="text-foreground/80 mb-4">
              Após o envio do relatório, você poderá:
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Esclarecer dúvidas por e-mail</span>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                <span className="text-foreground/80">Solicitar contato via WhatsApp para aprofundar pontos específicos</span>
              </li>
            </ul>
            <p className="text-foreground/70 text-sm pt-2">
              Existe acompanhamento real.
            </p>
          </section>

          {/* SEÇÃO 9: STRIPE EMBED */}
          <section id="bloco-pagamento" className="space-y-6 scroll-mt-20">
            <h3 className="text-lg font-semibold text-foreground">
              Finalizar pagamento
            </h3>
            <div className="flex justify-center">
              <stripe-buy-button
                buy-button-id="buy_btn_1SwUgYFUQ2CSrSZXXYE4L0Gs"
                publishable-key="pk_live_51SwSVnFUQ2CSrSZX15h9htBOprc0v0ugwPBdw36kkMjijP2CSu2FWWtbUjrQehmAwknGbiD1URzxZMnYF5vyS7Kk00DYtti7N0"
              />
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
