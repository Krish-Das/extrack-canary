"use client"

import { AnimatePresence, motion, type Transition } from "motion/react"
import { useState } from "react"
import { Container } from "@/components/layout/container"
import { Spinner } from "@/components/loading/spinner"
import { Button } from "@/components/ui/button"
import { Spacer } from "@/components/ui/spacer"
import { Balance } from "./_comps/Balance"
import { Splash } from "./_comps/Splash"

const tabs = ["splash", "balance"] as const
export type Tab = (typeof tabs)[number]

const MSpinner = motion(Spinner)

export default function Page() {
  const [count, setCount] = useState<number>(0)
  const switchNextTab = () => setCount((c) => Math.min(c + 1, tabs.length - 1))
  const switchPreviousTab = () => setCount((c) => Math.max(c - 1, 0))
  const cycleTabs = () => setCount((c) => (c + 1) % tabs.length)
  const activeTab = tabs.at(count) as Tab

  const [isLoading, setLoading] = useState<boolean>(false)

  const transition = { type: "spring" } as const
  const variants = {
    visible: { scale: 1, opacity: 1, filter: "blur(0px)" },
    hidden: { scale: 0.87, opacity: 0, filter: "blur(2px)" },
  } as const

  return (
    <main className="flex h-svh flex-col px-4 md:px-0">
      <span className="pointer-events-none absolute inset-0 bg-[#F7F8F7] dark:bg-background" />
      <Container as="section" className="relative flex h-full flex-1 flex-col">
        <StepContent activeTab={activeTab} />

        <div className="my-2 flex flex-col gap-px">
          <Button>Setup Account</Button>
          <Button
            className="gap-0"
            color={isLoading ? "gray" : "blue"}
            onPress={() => setLoading((v) => !v)}
          >
            <motion.span
              animate={isLoading ? "visible" : "hidden"}
              className="inline-grid place-content-center overflow-hidden"
              initial="hidden"
              variants={{
                hidden: {
                  height: 0,
                  width: 0,
                  opacity: 0,
                  filter: "blur(2px)",
                  transition: {
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  },
                },
                visible: {
                  height: "auto",
                  width: "auto",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                },
              }}
            >
              <Spinner size="0.875em" />
            </motion.span>
            {/*
             * Margin/padding animation causes stutter; width uses
             * GPU-accelerated transforms
             */}
            <motion.div
              animate={isLoading ? "visible" : "hidden"}
              aria-hidden={true}
              className="h-px"
              initial="hidden"
              variants={{
                hidden: { width: 0 },
                visible: { width: "0.5rem" },
              }}
            />
            <span>Continue</span>
          </Button>
          {/* <Button
            color={isLoading ? "gray" : "blue"}
            onPress={() => setLoading((v) => !v)}
          >
            <motion.span
              animate={isLoading ? "hidden" : "visible"}
              initial={false}
              variants={variants}
            >
              Continue
            </motion.span>

            <MSpinner
              animate={isLoading ? "visible" : "hidden"}
              aria-hidden={true}
              className="absolute"
              initial="hidden"
              variants={variants}
            />
          </Button> */}
        </div>

        <Button
          className="mx-auto"
          onPress={cycleTabs}
          type={activeTab === "splash" ? "button" : "submit"}
        >
          {activeTab === "splash" ? "Setup Account" : "Continue"}
        </Button>
        <SkipButton isVisible={activeTab === "balance"} />
      </Container>
      <Spacer className="h-16" />
    </main>
  )
}

function StepContent({ activeTab }: { activeTab: Tab }) {
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
          <Balance />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// TODO: use link to navigate to `/`
const MButton = motion(Button)
function SkipButton({ isVisible }: { isVisible: boolean }) {
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
