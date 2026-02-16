'use client';

import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function HeroSection() {
  const handleSaibaMais = () => {
    const element = document.getElementById('saiba-mais-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleIniciarDiagnostico = () => {
    const element = document.getElementById('diagnostico')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-start gap-3 px-4 py-4 text-center md:justify-center md:h-screen md:py-10">
        {/* Subtle background accent */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="max-w-2xl space-y-4">
          {/* Visão Real Logo - LOGO OFICIAL */}
          <div className="flex justify-center pb-0">
            <Image
              src="/logo-visao-real-new.png"
              alt="Visão Real - Diagnóstico de Ideias, Produtos e Negócios"
              width={380}
              height={140}
              className="h-auto w-auto max-w-full md:max-w-2xl"
              priority
            />
          </div>

          <h1 className="text-balance text-2xl font-bold text-foreground leading-tight md:text-3xl">
            Descubra o que está impedindo seu negócio de crescer
          </h1>

          <h2 className="text-balance text-base text-foreground/80 leading-relaxed max-w-xl mx-auto pt-2">
            Em 3 minutos você entende o principal problema — e sabe por onde começar.
          </h2>

          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              onClick={handleIniciarDiagnostico}
              className="rounded-xl h-12 px-10 font-semibold shadow-md hover:shadow-lg transition-shadow bg-primary hover:bg-primary/90 text-primary-foreground text-base"
            >
              Começar diagnóstico gratuito
            </Button>
          </div>

          <p className="text-balance text-xs text-foreground/60 leading-relaxed pt-2">
            Sem cadastro. Resultado imediato.
          </p>
        </div>

        {/* Trust indicators - Navy-light background */}
        <div className="mt-1 max-w-4xl pt-1 pb-2 border-t border-border/20">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <div className="flex items-center justify-center rounded-xl bg-blue-900/30 px-3 py-1.5 border border-blue-400/30">
              <span className="text-xs font-medium text-blue-200">
                Análise Profissional
              </span>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-blue-900/30 px-3 py-1.5 border border-blue-400/30">
              <span className="text-xs font-medium text-blue-200">
                Feedback Imediato
              </span>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-blue-900/30 px-3 py-1.5 border border-blue-400/30">
              <span className="text-xs font-medium text-blue-200">
                Baseado em Dados
              </span>
            </div>
          </div>
        </div>
      </section>
    )
}
