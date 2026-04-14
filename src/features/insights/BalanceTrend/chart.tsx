import * as d3 from "d3"
import type { ChartProps } from "../helpers/types"
import { format } from "date-fns"

export function Chart(
  props: ChartProps<{ data: { date: Date; value: number }[] }>
) {
  const {
    bound: { height, width },
    data,
  } = props

  const DEBUG = false

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

  const lastDateFmt = format(data.at(-1)?.date, "dd")

  const Root = () => (
    <svg
      className="size-full"
      overflow="visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <title>Balance Trend</title>
      <line
        className="hidden text-red-300"
        fill="none"
        stroke="currentColor"
        strokeDasharray="3"
        x2={width}
        y2={height}
      />

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
      </g>
      <LineJoin />
      <ViewBoxBound />
    </svg>
  )

  const LineJoin = () => {
    const lineWidth = 3
    const lineHeight = 8

    return (
      <g transform={`translate(${chartWidth},${height})`}>
        <text
          className="font-medium text-label-secondary text-xs"
          fill="currentColor"
          textAnchor="middle"
        >
          {lastDateFmt}
        </text>
        <rect
          className="text-label-primary"
          fill="currentColor"
          height={lineHeight}
          rx={2}
          ry={2}
          transform="scale(1,-1)"
          width={lineWidth}
          x={lineWidth * -0.5}
          y={lineHeight * -0.5 + gapBottom}
        />
      </g>
    )
  }

  // TODO: remove this component before shipping
  const ViewBoxBound = () => {
    if (!DEBUG) return
    return (
      <path
        d={`M 0 0 L 0 ${height} ${width} ${height} ${width} 0 0 0`}
        fill="none"
        stroke="#f00"
        strokeWidth="1.5"
      />
    )
  }

  return <Root />
}
