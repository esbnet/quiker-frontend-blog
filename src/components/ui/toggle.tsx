"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
	"inline-flex justify-center items-center data-[state=on]:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 dark:data-[state=on]:bg-slate-800 disabled:opacity-50 rounded-md focus-visible:ring-2 focus-visible:ring-slate-950 dark:focus-visible:ring-slate-300 ring-offset-white focus-visible:ring-offset-2 dark:ring-offset-slate-950 font-medium text-sm dark:hover:text-slate-400 data-[state=on]:text-slate-900 hover:text-slate-500 dark:data-[state=on]:text-slate-50 transition-colors focus-visible:outline-none disabled:pointer-events-none",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:hover:text-slate-50",
			},
			size: {
				default: "h-10 px-3",
				sm: "h-9 px-2.5",
				lg: "h-11 px-5",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const Toggle = React.forwardRef<
	React.ElementRef<typeof TogglePrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
	<TogglePrimitive.Root
		ref={ref}
		className={cn(toggleVariants({ variant, size, className }))}
		{...props}
	/>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
