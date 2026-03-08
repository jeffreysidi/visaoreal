export function HowItWorks() {
  return (
    <section className="w-full px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Título centralizado */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontSize: 'clamp(1.875rem, 5vw, 2.25rem)' }}>
            Como funciona o diagnóstico
          </h2>
        </div>

        {/* Texto introdutório centralizado */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
            O Visão Real analisa três dimensões fundamentais:
          </p>
        </div>

        {/* Lista numerada das três dimensões */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                1
              </span>
            </div>
            <div className="flex-1">
              <p className="text-foreground text-base sm:text-lg font-medium">
                Estágio do negócio
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                2
              </span>
            </div>
            <div className="flex-1">
              <p className="text-foreground text-base sm:text-lg font-medium">
                Estrutura do modelo
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                3
              </span>
            </div>
            <div className="flex-1">
              <p className="text-foreground text-base sm:text-lg font-medium">
                Padrão de decisão
              </p>
            </div>
          </div>
        </div>

        {/* Texto conclusivo centralizado */}
        <div className="text-center max-w-2xl mx-auto pt-4">
          <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
            Com base nisso o sistema identifica o tipo estrutural do seu negócio e o gargalo dominante.
          </p>
        </div>
      </div>
    </section>
  )
}
