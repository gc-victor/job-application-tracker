import type { ComponentChildren } from "preact";

import { FieldError } from "./filed-error";
import { Label } from "./label";

export function Textarea({
    children = "",
    id,
    label,
    description,
    ...props
}: {
    id: string;
    label: ComponentChildren;
    children?: ComponentChildren;
    description?: string | ComponentChildren;
    [key: string]: unknown;
}) {
    return (
        <div class="relative space-y-1">
            <Label htmlFor={id} required={props["aria-required"] ? "true" : "false"}>
                {label}
            </Label>
            {description ? <p class="text-sm text-slate-500">{description}</p> : ""}
            <textarea
                id={id}
                name={id}
                autocomplete="off"
                {...props}
                class="
                bg-white
                border
                border-slate-300
                h-32
                p-3
                rounded
                text-sm
                w-full

                disabled:bg-slate-50
                disabled:text-slate-500
                disabled:border-slate-500

                peer

                aria-[invalid=true]:border-red-500
                aria-[invalid=true]:placeholder:text-red-300
                "
            >
                {children}
            </textarea>
            <FieldError id={id} />
        </div>
    );
}
