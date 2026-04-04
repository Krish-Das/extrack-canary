import { Container } from "@/components/layout/container"
import { Spinner } from "@/components/loading/spinner"
import { PageHeader } from "@/components/navigation/page-header"
import { Spacer } from "@/components/ui/spacer"

export default function Loading() {
  return (
    <>
      <PageHeader
        backHref="/settings/accounts"
        title="account settings"
        visuallyHidden
      />
      <main className="flex-1" data-vaul-drawer-wrapper="">
        <Spacer className="h-4" />
        <Container as="section" className="relative flex flex-col gap-0.5 px-4">
          <Spinner className="mx-auto mt-4" />
        </Container>
      </main>
    </>
  )
}
