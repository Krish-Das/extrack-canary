"use client"

import { eachDayOfInterval, endOfToday, startOfDay, subDays } from "date-fns"
import useMeasure from "react-use-measure"
import type { Colors } from "#lib/constants/colors"
import { Spacer } from "@/components/ui/spacer"
import { Chart, type Data } from "./chart"
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter"

interface WeeklyExpenseChartProps {
  data: Data
  color?: Exclude<Colors, "gray">
}

export default function WeeklyExpenseChart(
  // TODO: remove this omit before shipping
  props: Omit<WeeklyExpenseChartProps, "data">
) {
  const [containerRef, bound] = useMeasure()
  const formatter = useCurrencyFormatter()

  const rangeEndDate = endOfToday()
  const rangeStartDate = startOfDay(subDays(rangeEndDate, 6))
  const dateRange = eachDayOfInterval({
    start: rangeStartDate,
    end: rangeEndDate,
  })

  const data = dateRange.map((date) => {
    return { date, value: Math.round(Math.random() * 100) + 8 }
  })

  const sum = data.reduce((acc, d) => acc + d.value, 0)
  const average = Math.round(sum / data.length)
  const formattedAverage = formatter.format(average)

  return (
    <div
      className="corner-squircle inline-flex h-48 w-full flex-col rounded-4xl bg-fill-secondary p-4"
      style={
        {
          "--chart-color": `var(--ios-${props.color})`,
        } as React.CSSProperties
      }
    >
      <p className="text-lg">last 7 days</p>
      <p className="">
        <span className="font-semibold text-(--chart-color) text-4xl">
          {formattedAverage}
        </span>{" "}
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
