import { cn } from "@/lib/utils"

export function Balance({ onSwitchTab }: { onSwitchTab?: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5.5 text-center">
      <h1 className="text-xl leading-none">What is your balance now?</h1>
      <input
        className={cn(
          "focus:outline-none focus-visible:outline-none",
          // TODO: handle corner radius for firefox
          "h-12 w-64 px-4 font-medium text-lg",
          // "corner-squircle rounded-2xl",
          "rounded-full",
          "border border-gray-6/50 bg-white shadow-[inset_0_1px,inset_0_0_0_1px] shadow-black/2.5 dark:border-transparent dark:bg-fill-quaternary dark:shadow-white/2.5",
          "shadow-[#F2F3F2]",
          // TODO: Use RAC data-attributes here
          "ring-ios-blue/50 ring-offset-ios-blue/60 focus:ring-4 focus:ring-offset-2"
        )}
        placeholder="$0"
        type="number"
      />
    </div>
  )
}
