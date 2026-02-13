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
          {/* Visão Real Logo - LOGO OFICIAL HORIZONTAL */}
          <div className="flex justify-center pb-0">
            <Image
              src="/visao-real-logo-oficial.png"
              alt="Visão Real - Diagnóstico de Ideias, Produtos e Negócios"
              width={320}
              height={120}
              className="h-auto w-auto max-w-full md:max-w-xl"
              priority
            />
          </div>

          <p className="text-balance text-lg font-semibold text-foreground leading-tight">
            Saia da indecisão.<br />
            Direção clara para o próximo passo.
          </p>

          <p className="text-balance text-base text-foreground/70 leading-relaxed max-w-xl mx-auto">
            Para ideias, produtos e negócios.
          </p>

          <p className="text-balance text-sm text-foreground/60 leading-relaxed max-w-xl mx-auto pt-1">
            Diagnóstico rápido para transformar reflexão em decisão.
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3 pt-3">
            <Button
              size="lg"
              onClick={handleIniciarDiagnostico}
              className="rounded-xl h-12 px-8 font-semibold shadow-sm hover:shadow-md transition-shadow"
            >
              Iniciar Diagnóstico
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleSaibaMais}
              className="rounded-xl h-12 px-8 font-semibold border-border/40 hover:bg-slate-50 transition-colors bg-transparent"
            >
              Saiba Mais
            </Button>
          </div>

          <p className="text-balance text-sm font-bold text-primary leading-relaxed pt-2">
            3 minutos. Sem custo. Sem cadastro.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="mt-1 max-w-4xl pt-1 pb-2 border-t border-border/20">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <div className="flex items-center justify-center rounded-xl bg-slate-50 px-3 py-1.5 border border-border/20">
              <span className="text-xs font-medium text-foreground/70">
                Análise Profissional
              </span>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-slate-50 px-3 py-1.5 border border-border/20">
              <span className="text-xs font-medium text-foreground/70">
                Feedback Imediato
              </span>
            </div>
            <div className="flex items-center justify-center rounded-xl bg-slate-50 px-3 py-1.5 border border-border/20">
              <span className="text-xs font-medium text-foreground/70">
                Baseado em Dados
              </span>
            </div>
          </div>
        </div>
      </section>
    )
}
