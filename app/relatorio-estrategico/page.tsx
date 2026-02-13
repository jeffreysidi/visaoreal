'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Script from 'next/script'
import Image from 'next/image'

export default function RelatorioEstrategico() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleStripeScriptLoad = () => {
    // Handle Stripe script load if needed
  }

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Script 
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="afterInteractive"
      />

      {/* LOGO HEADER */}
      <div className="bg-white px-4 py-4">
        <div className="flex justify-center">
          <Image
            src="/visao-real-logo-oficial.png"
            alt="Visão Real - Diagnóstico de Ideias, Produtos e Negócios"
            width={200}
            height={75}
            className="h-auto w-auto max-w-xs"
            priority
          />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl space-y-8">
          
          {/* Título */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Relatório Estratégico Completo
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-xl mx-auto">
              Aprofunde seu diagnóstico com uma análise estratégica estruturada. 
              Identificamos o gargalo dominante, explicamos a causa real e apontamos 
              o próximo passo mais racional para seu negócio.
            </p>
          </div>

          {/* Benefícios em Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-600 mb-2">✓ Gargalo Estrutural</p>
              <p className="text-sm text-slate-700">Identificação clara do bloqueio dominante</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-600 mb-2">✓ Causa Real</p>
              <p className="text-sm text-slate-700">Análise da raiz do problema de avanço</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-600 mb-2">✓ Riscos e Hipóteses</p>
              <p className="text-sm text-slate-700">Contexto crítico sobre o próximo passo</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-blue-600 mb-2">✓ Próximo Passo</p>
              <p className="text-sm text-slate-700">Orientação clara e racional para agir</p>
            </div>
          </div>

          {/* BLOCO 1 - O que acontece após o pagamento */}
          <div className="border border-slate-200 rounded-lg p-6 space-y-3">
            <h3 className="text-base font-semibold text-slate-900">
              O que acontece após a confirmação do pagamento
            </h3>
            <div className="text-sm text-slate-700 space-y-2">
              <p>• Você preenche um breve formulário complementar</p>
              <p>• O diagnóstico e suas respostas são analisados com apoio humano</p>
              <p>• O Relatório Estratégico Completo é enviado por e-mail em até 24 horas</p>
            </div>
          </div>

          {/* BLOCO 2 - Importante */}
          <div className="border border-slate-200 rounded-lg p-6 space-y-3">
            <h3 className="text-base font-semibold text-slate-900">
              Importante
            </h3>
            <p className="text-sm text-slate-700">
              Este relatório não é gerado automaticamente por um robô. 
              Ele combina análise automatizada do diagnóstico com revisão humana estratégica, seguindo o método Visão Real.
            </p>
          </div>

          {/* BLOCO 3 - Indicação de perfil */}
          <div className="border border-slate-200 rounded-lg p-6">
            <p className="text-sm text-slate-700">
              Indicado para quem precisa clareza para decidir o próximo passo. 
              Não indicado para quem busca promessas, atalhos ou fórmulas prontas.
            </p>
          </div>

          {/* Checkout do Stripe */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200">
              <p className="text-sm text-slate-600">
                Prossiga para confirmar seu pagamento de forma segura com Stripe
              </p>
            </div>
            
            {/* Stripe Buy Button Oficial */}
            <div className="p-8 flex justify-center">
              <stripe-buy-button
                buy-button-id="buy_btn_1SwUgYFUQ2CSrSZXXYE4L0Gs"
                publishable-key="pk_live_51SwSVnFUQ2CSrSZX15h9htBOprc0v0ugwPBdw36kkMjijP2CSu2FWWtbUjrQehmAwknGbiD1URzxZMnYF5vyS7Kk00DYtti7N0"
              />
            </div>
          </div>

          {/* Nota Disclamer */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
            <p className="text-xs text-slate-600 leading-relaxed">
              Este relatório não é coaching, mentoria motivacional ou curso. 
              Trata-se de um diagnóstico estratégico objetivo entregue em até 24 horas 
              após o preenchimento do formulário complementar.
            </p>
          </div>

          {/* Botão Alternativo de Voltar */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="rounded-lg border-slate-200 hover:bg-slate-50"
            >
              Voltar para o diagnóstico
            </Button>
          </div>

        </div>
      </div>
    </main>
  )
}
