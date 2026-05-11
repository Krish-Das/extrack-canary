import Image from "next/image"
import { Spacer } from "@/components/ui/spacer"

export function Splash() {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="grid h-w-full flex-1 place-content-center">
          {/* TODO: Add better app-icon*/}
          <Image
            alt="Extrack app icon"
            height="82"
            quality={90}
            src="/favicon.png"
            width="82"
          />
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-semibold text-2xl">Welcome to extrack</h1>
          {/* TODO: reword these copies */}
          <p className="text-label-secondary">
            Track your expenses with observability
          </p>
        </div>
      </div>

      <Spacer className="h-12" />
    </>
  )
}
