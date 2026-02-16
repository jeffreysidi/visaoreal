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
              
              {/* TÍTULO DO DIAGNÓSTICO - Elemento visual principal */}
              <h2 className="text-3xl md:text-4xl font-bold leading-snug text-foreground text-balance tracking-tight mb-2">
                {diagnosis.titulo}
              </h2>

              {/* BLOCO DE CONTEXTO - Premium styling */}
              <div className="bg-slate-100 border-2 border-slate-400 rounded-xl px-6 py-6 space-y-4">
                <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider leading-tight">
                  ℹ Informações coletadas do diagnóstico
                </h3>
                
                <div className="space-y-4">
                  {mainDimensions.map((dimension, index) => (
                    <div key={index} className="pb-3 last:pb-0 border-b border-slate-300 last:border-0">
                      <p className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                        {dimension.label}
                      </p>
                      <div className="bg-white rounded-lg px-4 py-3 border-l-4 border-blue-500">
                        <p className="text-sm text-foreground font-normal leading-relaxed">
                          {dimension.valor || '—'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-2" />

              {/* BLOCO LEITURA - Seção de Relatório */}
              <div className="space-y-3 bg-white border-2 border-slate-300 rounded-lg px-6 py-5">
                <h3 className="text-base md:text-lg font-bold tracking-wide text-slate-900 uppercase flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-blue-600" />
                  Leitura
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-foreground font-medium max-w-prose">
                  {diagnosis.leitura}
                </p>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-2" />

              {/* BLOCO SIGNIFICADO PRÁTICO - Seção de Relatório */}
              <div className="space-y-3 bg-white border-2 border-slate-300 rounded-lg px-6 py-5">
                <h3 className="text-base md:text-lg font-bold tracking-wide text-slate-900 uppercase flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-600" />
                  Significado Prático
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-foreground/90 font-medium max-w-prose">
                  {diagnosis.significadoPratico}
                </p>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-2" />

              {/* BLOCO CAMINHO RECOMENDADO - Premium box SEM CTA */}
              <div className="bg-blue-100 border-2 border-blue-400 rounded-lg px-6 py-5 space-y-3">
                <h3 className="text-base md:text-lg font-bold tracking-wide text-slate-900 uppercase flex items-center gap-3">
                  <ArrowRight className="h-5 w-5 text-blue-700" />
                  Caminho Recomendado
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-foreground font-medium max-w-prose">
                  {diagnosis.caminhoRecomendado}
                </p>
              </div>

              {/* SEPARADOR DELICADO */}
              <div className="border-t border-slate-200/40 my-2" />

              {/* CTA BUTTON - FORA DO BOX AZUL, DENTRO DO BOX BRANCO */}
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

      {/* ACTION BUTTONS - Apenas "Fazer novamente" */}
      <div className="flex justify-center pt-3">
        <Button
          variant="outline"
          onClick={onRestart}
          className="rounded-lg h-11 font-semibold border-slate-200/80 hover:bg-slate-50/50 transition-colors bg-transparent"
        >
          Fazer diagnóstico novamente
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
