'use client'

import { HeroSection } from '@/components/hero-section'
import { HowItWorks } from '@/components/how-it-works'
import { QuizSectionV8 } from '@/components/quiz-section-v8'

export default function Home() {
  return (
    <main className="w-full bg-background text-foreground">
      <HeroSection />
      <HowItWorks />
      <QuizSectionV8 />
    </main>
  )
}
