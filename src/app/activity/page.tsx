import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { Spinner } from "@/components/loading/spinner"
import { TransactionList } from "./local-comps/transaction-list"
import { ClientOnly } from "@ark-ui/react/client-only"

export default function Page() {
  return (
    <Container as="section" className="flex flex-col gap-0.5">
      <div className="px-4">
        <h3 className="mt-4 mb-4.5 font-semibold text-3xl tracking-tight">
          Activities
        </h3>

        <ClientOnly fallback={<Spinner />}>
          <TransactionList />
        </ClientOnly>
      </div>
    </Container>
  )
}
