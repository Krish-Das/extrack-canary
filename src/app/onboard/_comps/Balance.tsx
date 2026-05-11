import { Input, Label, NumberField } from "react-aria-components"
import { limit } from "#lib/constants/constraints"
import { currencyFormatOptions } from "@/hooks/useCurrencyFormatter"
import { cn } from "@/lib/utils"

export function Balance({ onSwitchTab }: { onSwitchTab?: () => void }) {
  return (
    <NumberField
      className="flex flex-1 flex-col items-center justify-center gap-5.5 text-center"
      formatOptions={currencyFormatOptions}
      isRequired
      maxValue={limit.amount.account.startingBalance.max}
      validationBehavior="aria"
      // isInvalid={invalid}
      // name={name}
      // onBlur={onBlur}
    >
      <Label className="relative text-center text-xl leading-none">
        What is your balance now?
      </Label>
      <Input
        className={cn(
          "h-12 w-64 rounded-full px-4 font-medium text-lg",
          "border border-gray-6/50 bg-white shadow-[#F2F3F2] shadow-[inset_0_1px,inset_0_0_0_1px] dark:border-transparent dark:bg-fill-quaternary dark:shadow-white/2.5",
          "focus:outline-none focus-visible:outline-none",
          "ring-ios-blue/50 ring-offset-ios-blue/60 data-focused:ring-4 data-focused:ring-offset-2"
        )}
        placeholder="$0"
      />
    </NumberField>
  )
}
