"use client"

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import SandboxNav from "../nav"
import TransactionList from "./TransactionList"

export default async function SummaryPage() {
  const { userId } = useAuth()

  if (userId === undefined) {
    return <p>loading user...</p>
  }

  if (userId === null) {
    return (
      <p>
        You must be{" "}
        <Link className="font-medium text-ios-blue" href="/sign-in">
          signed in
        </Link>{" "}
        to view this page.
      </p>
    )
  }

  return (
    <>
      <SandboxNav />
      <main className="flex-1" data-vaul-drawer-wrapper="">
        <Container as="section" className="flex flex-col">
          <h1 className="font-bold text-2xl">Activities</h1>
          <Suspense fallback={<p>suspense fallback ...</p>}>
            <TransactionList />
          </Suspense>
        </Container>
      </main>
    </>
  )
}
