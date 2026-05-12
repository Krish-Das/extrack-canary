"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ONBOARDING_STEPS, type OnboardingStep } from "./_comps/helpers"
import { OnboardingBalanceForm } from "./_comps/OnboardingBalanceForm"

export default function Page() {
  const [count, setCount] = useState<number>(0)
  const nextStep = () =>
    setCount((c) => Math.min(c + 1, ONBOARDING_STEPS.length - 1))
  // biome-ignore lint/correctness/noUnusedVariables: keep this handler
  const previousStep = () => setCount((c) => Math.max(c - 1, 0))
  // biome-ignore lint/correctness/noUnusedVariables: keep this handler
  const cycleSteps = () => setCount((c) => (c + 1) % ONBOARDING_STEPS.length)
  const activeStep = ONBOARDING_STEPS.at(count) as OnboardingStep

  return (
    <>
      <span className="pointer-events-none absolute inset-0 bg-[#F7F8F7] dark:bg-background" />
      <main className="h-svh px-4 pb-16 md:px-0">
        <Container className="relative h-full">
          <OnboardingBalanceForm activeStep={activeStep} nextStep={nextStep} />
          <SkipButton
            isVisible={activeStep === "balance"}
            onSkip={() => setCount(0)}
          />
        </Container>
      </main>
    </>
  )
}

// TODO: use link to navigate to `/`
const MButton = motion(Button)
function SkipButton({
  isVisible,
  onSkip,
}: {
  isVisible: boolean
  onSkip?: () => void // TODO: Debug only; remove this prop
}) {
  return (
    <MButton
      animate={isVisible ? "shown" : "hidden"}
      className="absolute top-4 right-0"
      initial="hidden"
      onPress={onSkip}
      variant="ghost"
      variants={{
        hidden: { opacity: 0 },
        shown: { opacity: 1, transition: { delay: 0.575 } },
      }}
    >
      Skip
    </MButton>
  )
}
