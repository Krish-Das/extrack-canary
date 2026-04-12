import * as d3 from "d3"
import type { ChartProps } from "../helpers/types"

export type Data = {
  data: { date: Date | number | string; value: number }[]
}

export function Chart(props: ChartProps<Data>) {
  const {
    bound: { height, width },
    data,
  } = props

  const DEBUG = false

  const dates = data.map((d) => String(d.date))
  const xScale = d3
    .scaleBand()
    .domain(dates.map((d) => d))
    .range([0, width])
    .paddingInner(0.3)

  const values = data.map((d) => d.value)
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(values) ?? 0])
    .range([0, height])

  const sum = values.reduce((acc, v) => acc + v, 0)
  const average = Math.round(sum / values.length)
  const avgBarY = yScale(average)

  const Root = () => (
    <svg
      className="size-full"
      overflow="visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <title>Weekly Expense Chart</title>
      {data.map((data) => {
        const x = xScale(data.date.toString())
        const barHeight = yScale(data.value)
        const barRadius = 5

        return (
          <g
            className="text-label-tertiary"
            key={data.date.toString()}
            transform={`translate(${x},${height}) scale(1,-1)`}
          >
            <rect
              fill="currentColor"
              height={barHeight}
              rx={barRadius}
              ry={barRadius}
              width={xScale.bandwidth()}
            />
          </g>
        )
      })}

      <g
        className="text-ios-green"
        transform={`translate(0,${height - avgBarY}) scale(1,-1)`}
      >
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={3}
          x2={width}
        />
      </g>
      <ViewBoxBound />
    </svg>
  )

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
