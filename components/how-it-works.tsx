import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Responda o Questionário',
      description:
        'Complete nosso formulário inteligente com informações sobre sua ideia, mercado alvo e recursos disponíveis.',
    },
    {
      number: '02',
      title: 'Análise Automática',
      description:
        'Nossa ferramenta analisa suas respostas usando metodologia baseada em pesquisa com mais de 500 empreendimentos.',
    },
    {
      number: '03',
      title: 'Receba Seu Diagnóstico',
      description:
        'Obtenha um relatório detalhado com score de viabilidade, pontos fortes, fraquezas e recomendações específicas.',
    },
  ]

  return (
    <section className="w-full border-t bg-secondary/30 px-4 py-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Três passos simples para validar sua ideia
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="flex flex-col gap-4 bg-background"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-xl font-bold text-primary">
                      {step.number}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
