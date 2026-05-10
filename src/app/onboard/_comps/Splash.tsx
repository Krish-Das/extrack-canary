import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Spacer } from "@/components/ui/spacer"

export function Splash({ onSwitchTab }: { onSwitchTab?: () => void }) {
  return (
    <>
      <div className="grid h-full w-full flex-1 place-content-center">
        <Image
          alt="Extrack app icon"
          height="82"
          quality={90}
          src="/favicon.png"
          width="82"
        />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-semibold text-2xl tracking-wide">
          Welcome to extrack
        </h1>
        <p className="text-label-secondary">
          Track your expenses with observability
        </p>
      </div>

      <Spacer className="h-12" />

      <Button className="mx-auto" onPress={onSwitchTab}>
        Setup Account
      </Button>
    </>
  )
}
