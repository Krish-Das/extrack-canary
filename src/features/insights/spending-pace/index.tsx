"use client"

import { useNumberFormatter } from "react-aria"
import useMeasure from "react-use-measure"
import { Chart } from "./chart"

export function SpendingPace() {
  const [containerRef, bound] = useMeasure()
  const formatter = useNumberFormatter({
    style: "percent",
  })

  const percentage = 0.8
  const formatted = formatter.format(percentage)

  return (
    <div className="corner-squircle w-full rounded-4xl bg-background-primary-elevated p-4 shadow-ios-md">
      <p className="mb-3 font-medium text-lg">
        Spent {formatted} of this month's income
      </p>

      <div
        className="corner-squircle h-12 w-full rounded-xls pl-0.5"
        ref={containerRef}
      >
        <Chart
          bound={{ height: bound.height, width: bound.width }}
          percentage={percentage}
        />
      </div>
    </div>
  )
}
