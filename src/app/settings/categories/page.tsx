"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { Spinner } from "@/components/loading/spinner"
import { PageHeader } from "@/components/navigation/page-header"

import { Categories } from "../local-comps/Categories"
import { CategoryTypeTabs } from "./_comp/CategoryTypeTabs"

function CategoryTypeTabsWrapper() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") as "expense" | "income" | null

  return <Categories type={type ?? undefined} />
}

export default function Page() {
  return (
    <>
      <PageHeader backHref="/settings" title="Categories" />
      <main className="flex-1 px-4" data-vaul-drawer-wrapper="">
        <Container as="section" className="flex flex-col gap-0.5">
          <Suspense fallback={<Spinner />}>
            <CategoryTypeTabs />
            <CategoryTypeTabsWrapper />
          </Suspense>
        </Container>
      </main>
    </>
  )
}
