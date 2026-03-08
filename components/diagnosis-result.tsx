'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { DiagnosisResult } from '@/lib/diagnosis'
import { ArrowRight, Search } from 'lucide-react'
import Image from 'next/image'

interface DiagnosisResultComponentProps {
  diagnosis: DiagnosisResult
  descricaoIdeia: string
  mainDimensions: Array<{ label: string; valor: string }>
  onRestart: () => void
}

export function DiagnosisResultComponent({
  diagnosis,
  descricaoIdeia,
  mainDimensions,
  onRestart,
}: DiagnosisResultComponentProps) {
  const router = useRouter()
  const diagnosisContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll diagnosis container into view at top
    if (diagnosisContainerRef.current) {
      diagnosisContainerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* INSTITUTIONAL HEADER - DIAGNOSIS PAGE TOP */}
      <div className="bg-white px-4 py-4">
        <div className="flex justify-center">
          {/* Logo oficial reduzido em largura, margem mínima */}
          <Image
            src="/logo-visao-real-new.png"
            alt="Visão Real - Diagnóstico de Ideias, Produtos e Negócios"
            width={200}
            height={75}
            className="h-auto w-auto max-w-xs"
            priority
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="flex flex-col items-center gap-6 px-4 py-8 md:py-10">
        <div className="w-full max-w-3xl space-y-5" ref={diagnosisContainerRef}>

          {/* Main diagnostic card - PREMIUM STYLING */}
          <Card className="border-2 border-slate-300 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl">
            
            <CardContent className="space-y-5 px-6 py-10 md:px-10 md:py-12">
              
              {/* HEADER COM LUPA E TÍTULO - DENTRO DO BOX */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200/40">
                <Search className="h-7 w-7 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
                <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Diagnóstico Visão Real
                </h1>
              </div>
              
              {/* TÍTULO DO DIAGNÓSTICO - Elemento visual principal DESTACADO */}
              <div className="py-6 mb-6 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground text-balance tracking-tight">
                  {diagnosis.titulo}
                </h2>
              </div>

              {/* BLOCO DE CONTEXTO - Grid layout para atributos */}
              <div className="bg-slate-100 border-2 border-slate-400 rounded-xl px-6 py-8 space-y-6">
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider leading-tight">
                  ℹ Informações coletadas do diagnóstico
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mainDimensions.map((dimension, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                        {dimension.label}
                      </p>
                      <div className="bg-white rounded-lg px-4 py-3 border-l-4 border-blue-500 min-h-16 flex items-center">
                        <p className="text-sm text-foreground font-normal leading-relaxed">
                          {dimension.valor || '—'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-8" />

              {/* BLOCO LEITURA - Seção de Relatório */}
              <div className="space-y-4 bg-white border-2 border-slate-300 rounded-lg px-6 py-6 md:px-8 md:py-8">
                <h3 className="text-lg md:text-xl font-bold tracking-wide text-slate-900 uppercase flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-blue-600 flex-shrink-0" />
                  Leitura
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-foreground font-medium max-w-prose">
                  {diagnosis.leitura}
                </p>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-8" />

              {/* BLOCO SIGNIFICADO PRÁTICO - Seção de Relatório */}
              <div className="space-y-4 bg-white border-2 border-slate-300 rounded-lg px-6 py-6 md:px-8 md:py-8">
                <h3 className="text-lg md:text-xl font-bold tracking-wide text-slate-900 uppercase flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-600 flex-shrink-0" />
                  Significado Prático
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-foreground/90 font-medium max-w-prose">
                  {diagnosis.significadoPratico}
                </p>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-8" />

              {/* BLOCO CAMINHO RECOMENDADO - Premium box SEM CTA */}
              <div className="bg-blue-100 border-2 border-blue-400 rounded-lg px-6 py-6 md:px-8 md:py-8 space-y-4">
                <h3 className="text-lg md:text-xl font-bold tracking-wide text-slate-900 uppercase flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-blue-700 flex-shrink-0" />
                  Caminho Recomendado
                </h3>
                <p className="text-base md:text-lg leading-relaxed text-foreground font-medium max-w-prose">
                  {diagnosis.caminhoRecomendado}
                </p>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-8" />

              {/* BLOCO APROFUNDE O DIAGNÓSTICO - Premium box com destaque MELHORADO */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl px-8 py-10 md:px-10 md:py-12 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold tracking-wide text-slate-900">
                  Aprofunde o diagnóstico do seu negócio
                </h3>
                
                <p className="text-base md:text-lg leading-relaxed text-foreground font-medium">
                  O resultado acima mostra o enquadramento inicial do seu projeto com base nas respostas fornecidas.
                </p>

                <p className="text-base md:text-lg leading-relaxed text-foreground/90">
                  Para aprofundar a análise estratégica do seu negócio, é possível solicitar um diagnóstico ampliado, utilizando informações adicionais sobre o seu projeto.
                </p>

                <div className="border-t-2 border-amber-200 pt-6">
                  <h4 className="text-base font-bold tracking-wide text-slate-900 uppercase mb-5 flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-amber-600 flex-shrink-0" />
                    O diagnóstico ampliado inclui:
                  </h4>

                  <ul className="space-y-3">
                    <li className="text-base leading-relaxed text-foreground flex gap-3">
                      <span className="text-amber-600 font-bold flex-shrink-0 text-lg">✓</span>
                      <span>análise estratégica da situação atual do negócio</span>
                    </li>
                    <li className="text-base leading-relaxed text-foreground flex gap-3">
                      <span className="text-amber-600 font-bold flex-shrink-0 text-lg">✓</span>
                      <span>identificação dos principais riscos estruturais do modelo</span>
                    </li>
                    <li className="text-base leading-relaxed text-foreground flex gap-3">
                      <span className="text-amber-600 font-bold flex-shrink-0 text-lg">✓</span>
                      <span>interpretação do padrão de decisão do projeto</span>
                    </li>
                    <li className="text-base leading-relaxed text-foreground flex gap-3">
                      <span className="text-amber-600 font-bold flex-shrink-0 text-lg">✓</span>
                      <span>leitura do estágio real de maturidade do negócio</span>
                    </li>
                    <li className="text-base leading-relaxed text-foreground flex gap-3">
                      <span className="text-amber-600 font-bold flex-shrink-0 text-lg">✓</span>
                      <span>direcionamento sobre onde concentrar energia agora</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t-2 border-amber-200 pt-6 space-y-4">
                  <p className="text-base leading-relaxed text-foreground/90">
                    A análise também pode incluir referências e padrões observados em negócios similares, ajudando a contextualizar a situação do projeto dentro do mercado.
                  </p>
                  <p className="text-base leading-relaxed text-foreground font-medium">
                    Essa análise permite entender não apenas o problema aparente, mas a estrutura real que está limitando o avanço do negócio.
                  </p>
                </div>

                {/* CTA Button dentro do box - DESTAQUE VISUAL */}
                <Button
                  className="w-full rounded-lg h-12 md:h-14 font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all bg-amber-600 hover:bg-amber-700 text-white mt-8"
                  onClick={() => {
                    router.push('/relatorio-estrategico')
                  }}
                >
                  Solicitar diagnóstico ampliado
                </Button>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-8" />
              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-8" />

              {/* CTA BUTTON - BOTÃO PRINCIPAL DE RELATÓRIO */}
              <Button
                className="w-full rounded-lg h-11 font-semibold text-sm shadow-md hover:shadow-lg transition-all bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  router.push('/relatorio-estrategico')
                }}
              >
                Receber Relatório Estratégico Completo
              </Button>
            </CardContent>
          </Card>

          {/* User's idea description if provided */}
          {descricaoIdeia && (
            <div className="space-y-3 bg-slate-50 border-2 border-slate-300 rounded-lg px-6 py-5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Sua descrição
              </h3>
              <p className="text-sm leading-relaxed text-foreground/85 italic border-l-3 border-blue-400 pl-4 font-medium">
                "{descricaoIdeia}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ACTION BUTTONS - Apenas "Refazer diagnóstico" */}
      <div className="flex justify-center py-6">
        <Button
          variant="outline"
          onClick={onRestart}
          className="rounded-lg h-11 font-semibold border-slate-200/80 hover:bg-slate-50/50 transition-colors bg-transparent"
        >
          Refazer diagnóstico
        </Button>
      </div>

      {/* FOOTER NOTE */}
      <p className="text-center text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
        Este diagnóstico é baseado em suas respostas e segue a metodologia Visão Real.
      </p>
    </div>
  )
}

export default DiagnosisResultComponent
