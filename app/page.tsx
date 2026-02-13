'use client'

import { HeroSection } from '@/components/hero-section'
import { QuizSection } from '@/components/quiz-section'
import { SaibaMaisSection } from '@/components/saiba-mais'

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground">
      <HeroSection />
      <QuizSection />
      <SaibaMaisSection />
    </main>
  )
}
