import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { useRef, useState } from "react"
import { Input, Label, NumberField } from "react-aria-components"
import { limit } from "#lib/constants/constraints"
import { currencyFormatOptions } from "@/hooks/useCurrencyFormatter"
import { cn } from "@/lib/utils"

const useTemporaryTrue = (duration = 2000) => {
  const [state, setState] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(null)

  const trigger = () => {
    if (timeout.current) clearTimeout(timeout.current)
    setState(true)
    timeout.current = setTimeout(() => setState(false), duration)
  }

  return [state, trigger] as const
}

export function Balance({ onSwitchTab }: { onSwitchTab?: () => void }) {
  const [active, trigger] = useTemporaryTrue(3000)
  const [value, setValue] = useState<number | undefined>(undefined)

  const AnimatedLabel = () => (
    <MotionConfig transition={{ ease: "easeOut" }}>
      <AnimatePresence mode="popLayout">
        {active ? (
          <motion.span
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              scale: 1,
              transition: { delay: 0.2 },
            }}
            exit={{ opacity: 0, filter: "blur(2px)", scale: 0.99 }}
            initial={{ opacity: 0, filter: "blur(2px)", scale: 0.99 }}
            key="billionaire"
          >
            What are you a billionaire!
          </motion.span>
        ) : (
          <motion.span
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              scale: 1,
              transition: { delay: 0.2 },
            }}
            exit={{ opacity: 0, filter: "blur(2px)", scale: 0.99 }}
            initial={{ opacity: 0, filter: "blur(2px)", scale: 0.99 }}
            key="balance"
          >
            What is your balance now?
          </motion.span>
        )}
      </AnimatePresence>
    </MotionConfig>
  )

  return (
    <NumberField
      className="flex flex-1 flex-col items-center justify-center gap-5.5 text-center"
      formatOptions={currencyFormatOptions}
      isRequired
      maxValue={limit.amount.account.startingBalance.max}
      onChange={(v) => setValue(v)}
      validationBehavior="aria"
      value={value}
      // isInvalid={invalid}
      // name={name}
      // onBlur={onBlur}
    >
      <Label className="relative text-center text-xl leading-none">
        What is your balance now?
      </Label>
      <Input
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
      />
    </NumberField>
  )
}
