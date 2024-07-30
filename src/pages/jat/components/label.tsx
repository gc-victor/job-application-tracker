import type { ComponentChildren } from "preact";

export function Label({
    children,
    hiddenLabel,
    htmlFor,
    required,
    ...props
}: { htmlFor: string; children?: ComponentChildren; hiddenLabel?: boolean; [key: string]: unknown | unknown[] }) {
    const srOnly = hiddenLabel ? "sr-only" : "";

    return (
        <label for={htmlFor} class={`font-cal text-md ${srOnly}`} {...props}>
            {children}
            {required === "true" ? (
                <span class="align-super text-xs text-red-500" aria-hidden="true">
                    &nbsp;(required)
                </span>
            ) : (
                ""
            )}
        </label>
    );
}
