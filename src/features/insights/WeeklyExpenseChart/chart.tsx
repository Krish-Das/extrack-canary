import type { ChartProps } from "../helpers/types"

export type Data = {
  data: { date: Date | number | string; value: number }[]
}

export function Chart(props: ChartProps<Data>) {
  const {
    bound: { height, width },
  } = props

  const DEBUG = false

  const Root = () => (
    <svg overflow="visible" viewBox={`0 0 ${width} ${height}`}>
      <title>Weekly Expense Chart</title>
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
