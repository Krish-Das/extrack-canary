"use client"

import { useQuery } from "convex-helpers/react/cache"
import { api } from "#/convex/_generated/api"
import { Spinner } from "@/components/loading/spinner"

export default function TransactionList() {
  const transactions = useQuery(api.transaction.list)

  if (!transactions) return <Spinner />
  return (
    <code className="w-full max-w-full overflow-x-auto rounded-xl border border-separator-opaque bg-background-secondary-elevated p-4 font-mono text-sm leading-snug">
      <pre>{JSON.stringify(transactions, null, 2)}</pre>
      {/*{transactions.map((t) => {
        const amount = t.amount * (t.type === "expense" ? -1 : 1)
        return <pre key={t._id}>{amount / 100}</pre>
      })}*/}
    </code>
  )
}
