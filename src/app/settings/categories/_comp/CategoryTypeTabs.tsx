"use client"

import {
  type QueryParamTabItem,
  QueryParamTabs,
} from "@/components/navigation/query-param-tabs"
import { useQueryParamTabSelection } from "@/components/navigation/query-param-tabs/hooks"

const ITEMS: QueryParamTabItem[] = [
  { id: "expense", label: "Expense", value: "expense" },
  { id: "income", label: "Income", value: "income" },
]

export function CategoryTypeTabs() {
  const selectedKey = useQueryParamTabSelection("type", ITEMS)

  return (
    <QueryParamTabs
      aria-label="Category type"
      items={ITEMS}
      param="type"
      selectedKey={selectedKey}
    />
  )
}
