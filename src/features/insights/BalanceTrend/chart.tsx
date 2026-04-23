import * as d3 from "d3"
import { format } from "date-fns"
import type { ChartProps } from "../helpers/types"
import { Spinner } from "@/components/loading/spinner"

export function Chart(
  props: ChartProps<{ data: { date: Date; value: number }[] }>
) {
  const {
    bound: { height, width },
    data,
  } = props

  if (!data?.length) <Spinner />

  // TODO: rename these variables
  const gapBottom = 18
  const chartWidth = width
  const chartHeight = height - gapBottom

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data.map((d) => d.date)) as [Date, Date])
    .range([0, chartWidth])
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.value)) ?? 0])
    .range([0, chartHeight])

  const line = d3
    .line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))
    .curve(d3.curveMonotoneX)

  const lastDateFmt = format(data.at(-1)?.date ?? Date.now(), "dd")

  const pillWidth = 3
  const pillHeight = 8

  return (
    <svg
      className="size-full"
      overflow="visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <title>Balance Trend for last 30 days</title>
      <g transform={`translate(0,${chartHeight}) scale(1,-1)`}>
        <path
          className="text-label-secondary"
          d={`M 0 0 L ${chartWidth} 0 ${chartWidth} ${chartHeight}`}
          fill="none"
          stroke="currentColor"
          strokeDasharray="2,6"
          x2={width}
        />
        <path
          className="text-label-primary"
          d={line(data)}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
        />
        <rect
          className="text-label-primary"
          fill="currentColor"
          height={pillHeight}
          rx={2}
          ry={2}
          transform={`translate(-${pillWidth / 2},-${pillHeight / 2})`}
          width={pillWidth}
          x={chartWidth}
        />
      </g>
      <g transform={`translate(${chartWidth},${height})`}>
        <text
          className="font-medium text-label-secondary text-xs"
          fill="currentColor"
          textAnchor="middle"
        >
          {lastDateFmt}
        </text>
      </g>
    </svg>
  )
}
