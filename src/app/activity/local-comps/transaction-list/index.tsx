"use client"

import { Presence } from "@ark-ui/react/presence"
import { usePaginatedQuery } from "convex-helpers/react/cache/hooks"
import {
  Collection,
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  ListLayout,
  Virtualizer,
} from "react-aria-components"
import { api } from "#/convex/_generated/api"
import { limit } from "#lib/constants/constraints"
import { Spinner } from "@/components/loading/spinner"
import { Button } from "@/components/ui/button"
import { Emoji } from "@/components/ui/emoji"
import { Spacer } from "@/components/ui/spacer"
import { useCurrencyFormatter } from "@/hooks/useCurrencyFormatter"
import { formatDateGroup } from "@/lib/date-utils"
import { cn, createCollection } from "@/lib/utils"
import { ListEndMessage } from "./ListEndMessage"

const PAGE_COUNT = limit.pagination.transactions.perPage

export function TransactionList() {
  const {
    results: transactions,
    loadMore,
    isLoading,
    status,
  } = usePaginatedQuery(
    api.transaction.listPaginatedDetailed,
    {},
    { initialNumItems: PAGE_COUNT }
  )
  // Build a grouped collection keyed by `_id` and date bucket
  const collection = createCollection(transactions, "_id", formatDateGroup)
  const groups = collection.group()

  const formatter = useCurrencyFormatter()

  if (!transactions.length) return <Spinner />

  return (
    <>
      <Virtualizer
        layout={ListLayout}
        layoutOptions={{
          rowHeight: 12 * 4, // default is 48
          gap: 0,
          padding: 0,
        }}
      >
        <ListBox
          aria-label="Transactions List"
          className="ListBoxRoot"
          selectionMode="single"
        >
          <Collection items={groups}>
            {([groupLabel, groupItems]) => {
              // groups is [label, items]; groups[0][0] is the label of the very first section
              const isFirstInGroup = groupLabel === groups[0]?.[0]

              return (
                <ListBoxSection
                  aria-label="Transaction Groups"
                  className={cn(
                    "ListBoxSection",
                    "relative",
                    "[&>div:first-child]:sticky [&>div:first-child]:top-0"
                  )}
                  id={groupLabel}
                  key={groupLabel}
                >
                  <Header
                    className={cn(
                      "ListBoxHeader",
                      "pointer-events-none select-none truncate px-4 font-medium text-label-tertiary text-sm leading-8",
                      // FIXME: This sticky is not working
                      // "sticky z-10",
                      !isFirstInGroup && "mt-6"
                    )}
                  >
                    {groupLabel}
                  </Header>
                  <Collection items={groupItems}>
                    {(item) => {
                      // Used for rounded corners and separator visibility
                      const isFirstInGroup = groupItems[0]?._id === item._id
                      const isLastInGroup = groupItems.at(-1)?._id === item._id

                      return (
                        <ListBoxItem
                          aria-label="Transaction"
                          className={({ isFocusVisible }) =>
                            cn(
                              "ListBoxItem",
                              "group/ListBoxItem relative flex h-full min-h-0 w-full select-none items-center bg-fill-quaternary px-4 outline-none",
                              "data-hovered:bg-fill-tertiary data-pressed:bg-fill-secondary",
                              isFocusVisible === true &&
                                "rounded-sm! ring-3 ring-ios-blue",
                              // Round the start of each group
                              isFirstInGroup &&
                                "supports-[corner-shape:squircle]:corner-squircle rounded-t-2xl supports-[corner-shape:squircle]:rounded-t-4xl",
                              // Round the end of each group
                              isLastInGroup &&
                                "supports-[corner-shape:squircle]:corner-squircle rounded-b-2xl supports-[corner-shape:squircle]:rounded-b-4xl"
                            )
                          }
                          id={item._id}
                        >
                          <Emoji aria-hidden={true} className="mr-3">
                            {item.category.icon}
                          </Emoji>

                          <div className="relative flex h-full flex-1 items-center">
                            <span className="font-medium">
                              {item.category.name}
                            </span>
                            <Spacer aria-hidden={true} className="flex-1" />
                            <span className="text-right text-label-secondary">
                              {formatter.format(item.amount)}
                            </span>

                            <span
                              aria-hidden={true}
                              className={cn(
                                "ListBoxItemSeparator",
                                "absolute inset-x-0 bottom-0 translate-y-1/2 border-b border-b-separator-opaque opacity-30 mix-blend-color-dodge group-data-[focus-visible=true]/ListBoxItem:hidden",
                                // Hide separator for the last item in a group
                                isLastInGroup && "hidden"
                              )}
                            />
                          </div>
                        </ListBoxItem>
                      )
                    }}
                  </Collection>
                </ListBoxSection>
              )
            }}
          </Collection>
        </ListBox>
      </Virtualizer>
      <Presence
        className="flex justify-center py-9.5"
        present={status !== "Exhausted"}
        unmountOnExit
      >
        <Button
          color="gray"
          // Only allow clicking when there is more data
          isDisabled={isLoading || status !== "CanLoadMore"}
          onClick={() => loadMore(PAGE_COUNT)}
          size="sm"
          variant="gray"
        >
          Load More
          {isLoading ? (
            <Spinner aria-hidden={true} />
          ) : (
            <span aria-hidden={true}>􀄩</span>
          )}
        </Button>
      </Presence>
      <ListEndMessage visible={status === "Exhausted"} />
    </>
  )
}
