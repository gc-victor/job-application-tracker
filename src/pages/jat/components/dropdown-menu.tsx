import type { ComponentChildren } from "preact";

export function DropdownMenu({ children }: { children: ComponentChildren }) {
    return (
        <details className="relative" role="menu">
            {children}
        </details>
    );
}

export function DropdownMenuSummary({ children, ...props }: { children: ComponentChildren; [key: string]: unknown }) {
    return (
        <summary {...props} role="button" aria-haspopup="menu">
            {children}
        </summary>
    );
}

export function DropdownMenuDetails({ children }: { children: ComponentChildren }) {
    return (
        <div className="absolute left-0 mt-1 bg-white shadow-md border border-slate-200 rounded-md z-50 overflow-hidden">
            <details-menu>{children}</details-menu>
        </div>
    );
}
