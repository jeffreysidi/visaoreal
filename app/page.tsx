'use client'

import { HeroSection } from '@/components/hero-section'
import { QuizSectionV8 } from '@/components/quiz-section-v8'
import { SaibaMaisSection } from '@/components/saiba-mais'

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground">
      <HeroSection />
      <QuizSectionV8 />
      <SaibaMaisSection />
    </main>
  )
}
