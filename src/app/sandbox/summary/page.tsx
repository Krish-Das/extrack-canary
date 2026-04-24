import { Container } from "@/components/layout/container"
import SandboxNav from "../nav"

export default function SummaryPage() {
  return (
    <>
      <SandboxNav />
      <main className="flex-1" data-vaul-drawer-wrapper="">
        <Container as="section" className="flex flex-col">
          <h1 className="font-bold text-2xl">Summary</h1>
        </Container>
      </main>
    </>
  )
}
