import { AnimatePresence, motion, type Transition } from "motion/react"
import { useState } from "react"
import { Form as RacForm } from "react-aria-components"
import {
  type SubmitHandler,
  type UseFormReturn,
  useForm,
} from "react-hook-form"
import { toast } from "sonner"
import { wait } from "@/lib/utils"
import { Balance } from "./Balance"
import type { LoadingState, Tab } from "./helpers"
import { Splash } from "./Splash"
import { StepButton } from "./StepButton"

// TODO: Use zod here
// TODO: Rename this type
export type Inputs = { amount: number }

export function OnboardingBalanceForm({
  activeTab,
  switchNextTab,
}: {
  activeTab: Tab
  switchNextTab: () => void
}) {
  const [loading, setLoading] = useState<LoadingState>("idle")

  // TODO: Use zod here
  const form = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ amount }) => {
    setLoading("loading")
    await wait(1800)
    setLoading("done")
    // TODO: Connect to backend
    toast.success(`${amount} will be set as balance.`)
    await wait(900)
    setLoading("idle")
    // TODO: router.push("/")
  }

  const handleContinue = async () => {
    if (loading !== "idle") return
    if (activeTab === "splash") {
      switchNextTab()
      return
    }
    await form.handleSubmit(onSubmit)()
  }

  return (
    <RacForm
      className="flex h-full flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <StepContent activeTab={activeTab} form={form} />
      <StepButton
        activeTab={activeTab}
        loading={loading}
        onContinue={handleContinue}
      />
    </RacForm>
  )
}

function StepContent({
  activeTab,
  form,
}: {
  activeTab: Tab
  form: UseFormReturn<Inputs>
}) {
  const transition = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1,
  } satisfies Transition

  return (
    <AnimatePresence mode="popLayout">
      {activeTab === "splash" ? (
        <motion.div
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          className="flex flex-1 flex-col"
          exit={{ opacity: 0, x: -12, filter: "blur(3px)" }}
          initial={false}
          key="splash"
          transition={transition}
        >
          <Splash />
        </motion.div>
      ) : (
        <motion.div
          animate={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { ...transition, delay: 0.2 },
          }}
          className="flex flex-1 flex-col"
          exit={{ opacity: 0, x: -12, filter: "blur(3px)" }}
          initial={{ opacity: 0, x: 12, filter: "blur(3px)" }}
          key="balance"
          transition={transition}
        >
          <Balance form={form} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
