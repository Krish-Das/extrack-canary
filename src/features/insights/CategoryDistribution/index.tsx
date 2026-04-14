"use client"

import useMeasure from "react-use-measure"
import { Chart } from "./chart"

export function CategoryDistribution() {
  const [containerRef, bound] = useMeasure()

  return (
    <div className="corner-squircle w-full rounded-4xl bg-background-primary-elevated p-4 shadow-ios-md">
      <div className="h-8 w-full" ref={containerRef}>
        <Chart bound={{ height: bound.height, width: bound.width }} />
      </div>
    </div>
  )
}
