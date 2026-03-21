import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cn } from "tailwind-variants"
import styles from "./drawer.module.css"

const Root = DrawerPrimitive.Root
const Trigger = DrawerPrimitive.Trigger
const Close = DrawerPrimitive.Close

const Handle = ({ className, ...rest }: React.ComponentProps<"div">) => (
  <div className={cn(styles.Handle, className)} {...rest} />
)

const Content = ({
  className,
  ...rest
}: React.ComponentProps<typeof DrawerPrimitive.Content>) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Backdrop className={styles.Backdrop} />
    <DrawerPrimitive.Viewport className={styles.Viewport}>
      <DrawerPrimitive.Popup className={styles.Popup}>
        <DrawerPrimitive.Content
          className={cn(styles.Content, className)}
          {...rest}
        />
        <Handle />
      </DrawerPrimitive.Popup>
    </DrawerPrimitive.Viewport>
  </DrawerPrimitive.Portal>
)

const Toolbar = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={cn("absolute inset-x-0 top-0 left-0 h-0 *:mt-4", className)}>
    {children}
  </div>
)

const Title = ({
  className,
  srOnly = false,
  ...rest
}: React.ComponentProps<typeof DrawerPrimitive.Title> & {
  srOnly?: boolean
}) => (
  <DrawerPrimitive.Title
    className={cn(
      "max-w-[65%] truncate px-2 font-semibold text-label-primary text-xl tracking-[0.015rem]",
      srOnly && "sr-only",
      className
    )}
    {...rest}
  />
)
const Description = DrawerPrimitive.Description
export const Drawer = {
  Root,
  Trigger,
  Close,
  Handle,
  Content,
  Title,
  Description,
  Toolbar,
}
