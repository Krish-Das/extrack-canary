"use client"

import { useState } from "react"
import { Container } from "@/components/layout/container"
import { Spacer } from "@/components/ui/spacer"
import { Balance } from "./_comps/Balance"
import { Splash } from "./_comps/Splash"

const tabs = ["splash", "balance"] as const
export type Tab = (typeof tabs)[number]

export default function Page() {
  const [count, setCount] = useState<number>(0)
  const switchNextTab = () => setCount((c) => Math.min(c + 1, tabs.length - 1))
  const switchPreviousTab = () => setCount((c) => Math.max(c - 1, 0))
  const cycleTabs = () => setCount((c) => (c + 1) % tabs.length)
  const activeTab = tabs.at(count) as Tab

  return (
    <main className="px-4 md:px-0">
      <span className="pointer-events-none absolute inset-0 bg-[#F7F8F7] dark:bg-background" />
      <Container as="section" className="relative flex h-svh flex-col">
        {activeTab === "splash" ? (
          <Splash onSwitchTab={switchNextTab} />
        ) : (
          <Balance onSwitchTab={switchPreviousTab} />
        )}
        <Spacer className="h-16" />
      </Container>
    </main>
  )
}
