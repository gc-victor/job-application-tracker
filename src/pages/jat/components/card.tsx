import type { ComponentChildren } from "preact";

export function Card({ children }: { children?: ComponentChildren }) {
    return <div class="bg-white p-3 rounded-lg border border-slate-200 relative shadow-sm">{children}</div>;
}
