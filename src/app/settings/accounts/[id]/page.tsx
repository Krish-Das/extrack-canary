import { Suspense } from "react"
import { Container } from "@/components/layout/container"
import { Spinner } from "@/components/loading/spinner"
import { PageHeader } from "@/components/navigation/page-header"
import { Spacer } from "@/components/ui/spacer"
import AccountInfo from "./local-comps/AccountInfo"

export const dynamic = "force-static"

export default function Page() {
  return (
    <main className="flex-1" data-vaul-drawer-wrapper="">
      <Suspense fallback={<Loader />}>
        <Spacer className="h-4" />
        <Container as="section" className="relative flex flex-col gap-0.5 px-4">
          <AccountInfo />
        </Container>
      </Suspense>
    </main>
  )
}

const Loader = () => (
  <>
    <PageHeader
      backHref="/settings/accounts"
      title="account settings"
      visuallyHidden
    />

    <Spinner className="mx-auto mt-4" />
  </>
)
