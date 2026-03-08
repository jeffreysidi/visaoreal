'use client';

import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function HeroSection() {
  const handleIniciarDiagnostico = () => {
    const element = document.getElementById('diagnostico')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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

      {/* HERO CONTENT */}
      <div className="flex-1 px-4 py-16 sm:py-20">
        <div className="w-full max-w-4xl mx-auto space-y-16 sm:space-y-20">
          {/* SEÇÃO 1: HERO */}
          <section className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.045] text-balance max-w-full lg:max-w-[70%]" style={{ letterSpacing: '-0.02em' }}>
                Descubra o <span className="hero-highlight">ponto crítico</span> do seu negócio.
              </h1>
              
              {/* Subtítulo Principal (Autoridade) */}
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed max-w-full lg:max-w-[75%] text-balance mt-4" style={{ fontSize: '0.92rem', lineHeight: '1.59' }}>
                O Visão Real analisa seu negócio e identifica o estágio do projeto, o tipo estrutural do modelo e o principal ponto crítico que exige decisão agora.
              </p>
              
              {/* Linha Adicional (Velocidade) - 10% menor, opacidade 85% */}
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed max-w-full lg:max-w-[75%] text-balance mt-3" style={{ fontSize: '0.828rem', lineHeight: '1.47' }}>
                Em poucos minutos você recebe um diagnóstico inicial que mostra onde concentrar sua atenção e qual é o próximo passo mais racional para o seu negócio.
              </p>
            </div>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-start sm:justify-start">
              <Button 
                onClick={handleIniciarDiagnostico}
                size="lg"
                className="w-[92%] sm:w-auto text-base font-semibold h-14 rounded-[12px] text-[#0F2E5A] transition-all"
                style={{ 
                  backgroundColor: '#E6B54A', 
                  borderColor: '#E6B54A',
                  paddingLeft: 'calc(1.5rem)',
                  paddingRight: 'calc(1.5rem)',
                  maxWidth: '280px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D9A843'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E6B54A'
                }}
              >
                Iniciar diagnóstico
              </Button>
            </div>
            
            {/* Microcopy */}
            <p className="text-sm text-foreground/75 pt-2">
              Sem cadastro. Resultado imediato.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
