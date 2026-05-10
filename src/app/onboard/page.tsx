"use client"

import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Transition,
} from "motion/react"
import { useState } from "react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Spacer } from "@/components/ui/spacer"
import { Balance } from "./_comps/Balance"
import { Splash } from "./_comps/Splash"

const MButton = motion(Button)

const tabs = ["splash", "balance"] as const
export type Tab = (typeof tabs)[number]

export default function Page() {
  const [count, setCount] = useState<number>(0)
  const switchNextTab = () => setCount((c) => Math.min(c + 1, tabs.length - 1))
  const switchPreviousTab = () => setCount((c) => Math.max(c - 1, 0))
  const cycleTabs = () => setCount((c) => (c + 1) % tabs.length)
  const activeTab = tabs.at(count) as Tab

  const transition = {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1,
    // duration: 3,
  } satisfies Transition

  return (
    <main className="px-4 md:px-0">
      <span className="pointer-events-none absolute inset-0 bg-[#F7F8F7] dark:bg-background" />
      <Container as="section" className="relative flex h-svh flex-col">
        <MotionConfig transition={transition}>
          <AnimatePresence mode="popLayout">
            {activeTab === "splash" ? (
              <motion.div
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                className="flex flex-1 flex-col"
                exit={{ opacity: 0, x: -12, filter: "blur(3px)" }}
                initial={false}
                key="splash"
              >
                <Splash onSwitchTab={switchNextTab} />
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
              >
                <Balance onSwitchTab={switchPreviousTab} />
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>

        <Button className="mx-auto" onPress={cycleTabs}>
          {activeTab === "splash" ? "Setup Account" : "Continue"}
        </Button>

        {/* --- SKIP BUTTON --- */}
        <MButton
          animate={activeTab === "balance" ? "shown" : "hidden"}
          className="absolute top-4 right-0"
          initial="hidden"
          variant="ghost"
          variants={{
            hidden: { opacity: 0 },
            shown: { opacity: 1, transition: { delay: 0.575 } },
          }}
        >
          Skip
        </MButton>

        <Spacer className="h-16" />
      </Container>
    </main>
  )
}
