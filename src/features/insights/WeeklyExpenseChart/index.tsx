"use client"

import { eachDayOfInterval, endOfToday, startOfDay, subDays } from "date-fns"
import useMeasure from "react-use-measure"
import { Spacer } from "@/components/ui/spacer"
import { Chart } from "./chart"

export default function WeeklyExpenseChart() {
  const [containerRef, bound] = useMeasure()

  const rangeEndDate = endOfToday()
  const rangeStartDate = startOfDay(subDays(rangeEndDate, 6))
  const dateRange = eachDayOfInterval({
    start: rangeStartDate,
    end: rangeEndDate,
  })

  const data = dateRange.map((date) => {
    return { date, value: Math.round(Math.random() * 100) + 8 }
  })

  return (
    <div className="corner-squircle inline-flex aspect-square w-48 max-w-full flex-col rounded-4xl bg-fill-secondary p-4">
      <p className="text-lg">last 7 days</p>
      <p className="">
        <span className="font-semibold text-4xl text-ios-green">6,201</span>{" "}
        <span className="text-base">Avg.</span>
      </p>

      <Spacer className="h-2" />

      <div className="min-h-0 w-full flex-1" ref={containerRef}>
        <Chart
          bound={{ height: bound.height, width: bound.width }}
          data={data}
        />
      </div>
    </div>
  )
}
