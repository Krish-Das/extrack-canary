import * as d3 from "d3"
import type { ChartProps } from "../helpers/types"

type Data = { percentage: number }

export function Chart(props: ChartProps<Data>) {
  const {
    bound: { height, width },
    percentage,
  } = props
  const DEBUG = false

  const barCount = 20 as const
  const barRadius = 4 as const
  const barHeight = height

  const xScale = d3
    .scaleBand()
    .domain(d3.range(barCount).map(String))
    .range([0, width])
    .paddingInner(0.3)

  // TODO: directly export svg instead of named function
  const Root = () => (
    <svg overflow="visible" viewBox={`0 0 ${width} ${height}`}>
      <title>Spending Pace</title>

      {Array.from({ length: barCount }, (_, idx) => {
        const width = xScale.bandwidth()

        // WARN: rename before shipping
        const shouldColor = idx < Math.round(barCount * percentage)
        // WARN: rename before shipping
        // biome-ignore lint/correctness/noUnusedVariables: <explanation>
        const strokeWidth = width / 2

        return (
          <g
            key={String(idx)}
            transform={`translate(${xScale(String(idx))},0)`}
          >
            {/*<line
              // round caps bleed outside by r, so we shorten each end by r to compensate
              className={shouldColor ? "text-ios-red" : "text-fill-secondary"}
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={width}
              x1={strokeWidth}
              x2={strokeWidth}
              y1={strokeWidth}
              y2={height - strokeWidth}
            />*/}
            <rect
              className={shouldColor ? "text-ios-red" : "text-fill-secondary"}
              fill="currentColor"
              height={barHeight}
              rx={barRadius}
              ry={barRadius}
              stroke="none"
              width={xScale.bandwidth()}
            />
          </g>
        )
      })}

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
