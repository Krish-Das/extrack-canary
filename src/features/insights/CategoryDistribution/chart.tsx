import type { ChartProps } from "../helpers/types"

export function Chart(props: ChartProps<{}>) {
  const {
    bound: { height, width },
  } = props

  const DEBUG = false

  const Root = () => (
    <svg
      className="size-full"
      overflow="visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <title>Category Distribution Chart</title>
      <g>
        <Rect className="text-fill-tertiary" width={width} />
        <Rect className="text-ios-red" width={width * 0.85} />
        <Rect className="text-ios-green" width={width * 0.75} />
        <Rect className="text-ios-blue" width={width * 0.7} />
        <Rect className="text-ios-purple" width={width * 0.5} />
        <Rect className="text-ios-pink" width={width * 0.25} />
        <Rect className="text-ios-orange" width={width * 0.1} />
        <Rect className="text-ios-yellow" width={width * 0.09} />
      </g>
      <ViewBoxBound />
    </svg>
  )

  const Rect = ({
    className,
    width,
  }: {
    className?: string
    width: number
  }) => {
    const rectRadius = 6
    return (
      <rect
        className={className}
        fill="currentColor"
        height={height}
        rx={rectRadius}
        ry={rectRadius}
        stroke="none"
        width={width}
      />
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
