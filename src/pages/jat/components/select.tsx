import type { ComponentChildren } from "preact";

import { Label } from "./label";

export function Select({
    id,
    label,
    children,
    ...props
}: { id: string; label: string; children: ComponentChildren; [key: string]: unknown }) {
    return (
        <div class="relative space-y-1">
            <Label htmlFor={id} required={props["aria-required"] ? "true" : "false"}>
                {label}
            </Label>
            <select
                id={id}
                name={id}
                class="h-10 w-full rounded-md border
                border-slate-300 bg-white px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {children}
            </select>
        </div>
    );
}
