export type ChartProps<T extends Record<string, unknown>> = {
  bound: {
    width: number
    height: number
  }
} & T
