'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function SaibaMaisSection({ onStartQuiz }) {
  return (
    <section id="saiba-mais-section" className="flex flex-col items-center justify-center gap-4 px-4 py-12 md:py-14 bg-secondary/20 border-t border-border/30">
      <div className="w-full max-w-3xl space-y-4">
        {/* Main card */}
        <Card className="border border-border/50 bg-background shadow-lg">
          <CardContent className="space-y-5 px-6 py-6 md:px-8 md:py-8">
            {/* Section 1: O que é */}
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                O que é o Visão Real
              </h2>
              <p className="text-sm leading-relaxed text-foreground">
                O Visão Real é um sistema de diagnóstico estratégico criado para ajudar empreendedores, fundadores e profissionais a entenderem com clareza onde seus projetos realmente estão, por que não avançam e qual é o próximo passo mais racional a ser dado.
              </p>
              <div className="space-y-1 pt-1">
                <p className="text-xs md:text-sm leading-relaxed text-foreground/85">
                  Ele não avalia esforço, intenção ou motivação.
                </p>
                <p className="text-xs md:text-sm leading-relaxed text-foreground font-medium">
                  Ele avalia estrutura, decisão e realidade.
                </p>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-border/40" />

            {/* Section 2: Como funciona */}
            <div className="space-y-3">
              <h3 className="text-lg md:text-lg font-bold text-foreground">
                Como o diagnóstico funciona
              </h3>
              <p className="text-sm leading-relaxed text-foreground/85">
                A partir de perguntas-chave, o Visão Real identifica padrões recorrentes de negócios e projetos em diferentes estágios. Essas respostas são cruzadas para identificar o principal gargalo estrutural que está limitando o avanço do projeto neste momento.
              </p>
              <p className="text-sm leading-relaxed text-foreground/85">
                O resultado não é uma opinião genérica, mas um enquadramento estratégico que aponta:
              </p>
              <ul className="space-y-1 pl-4">
                <li className="text-sm leading-relaxed text-foreground/85 flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">–</span>
                  <span>o tipo de situação em que o projeto se encontra</span>
                </li>
                <li className="text-sm leading-relaxed text-foreground/85 flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">–</span>
                  <span>o nível de maturidade (TRL aproximado)</span>
                </li>
                <li className="text-base leading-relaxed text-foreground/85 flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">–</span>
                  <span>e o foco correto de decisão agora</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default SaibaMaisSection
