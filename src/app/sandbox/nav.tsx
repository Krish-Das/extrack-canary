"use client"

import { Link } from "react-aria-components"
import { Container } from "@/components/layout/container"

export default function SandboxNav() {
  return (
    <nav className="w-full">
      <Container className="mx-auto flex gap-2 py-4 [&_a]:font-medium [&_a]:text-ios-blue">
        <Link href="/sandbox/summary">Summary</Link>
        <Link href="/sandbox/activity">Activity</Link>
      </Container>
    </nav>
  )
}
