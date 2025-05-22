import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Updated buttonVariants to use DaisyUI classes
const buttonVariants = cva(
  "btn", // Base DaisyUI button class
  {
    variants: {
      variant: {
        default: "btn-primary", // Maps to DaisyUI primary button
        destructive: "btn-error", // Maps to DaisyUI error button (for destructive actions)
        outline: "btn-outline", // Maps to DaisyUI outline button
        secondary: "btn-secondary", // Maps to DaisyUI secondary button
        ghost: "btn-ghost", // Maps to DaisyUI ghost button
        link: "btn-link", // Maps to DaisyUI link button
      },
      size: {
        default: "", // DaisyUI default size (btn-md effectively)
        sm: "btn-sm", // Maps to DaisyUI small button
        lg: "btn-lg", // Maps to DaisyUI large button
        icon: "btn-square", // Maps to DaisyUI square button for icons (could also be btn-circle)
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Additional classes for focus-visible and aria-invalid that DaisyUI might not cover as specifically
// These can be added to the cn() call if needed, or we rely on DaisyUI's default handling.
// For now, we'll keep them minimal as DaisyUI handles most states.
// const accessibilityClasses = "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive";

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  // Note: The original had more complex focus and aria-invalid styles.
  // DaisyUI's 'btn' class handles many of these states.
  // If specific focus/aria styling from the original is critical and not covered by DaisyUI,
  // it would need to be added back carefully, possibly by extending DaisyUI classes or via `cn`.
  return (
    <Comp
      data-slot="button" // Keep data-slot for consistency if used elsewhere
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
