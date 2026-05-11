export const tabs = ["splash", "balance"] as const
export type Tab = (typeof tabs)[number]

export type LoadingState = "idle" | "loading" | "done"
