import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import SandboxNav from "../nav"
import TransactionList from "./TransactionList"

export default async function SummaryPage() {
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
