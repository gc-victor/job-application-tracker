import { FieldError } from "./filed-error";
import { Label } from "./label";

type Variant = "sm" | "md" | "lg";

export function Input({
    description,
    hiddenLabel,
    id,
    label,
    name = "",
    variant = "md" as Variant,
    ...props
}: { label: string; id: string; description?: string; hiddenLabel?: boolean; name?: string; [key: string]: unknown }) {
    const fileStyles = `
    file:-mx-3
    file:-my-3
    file:[border-inline-end-width:1px]
    file:[margin-inline-end:0.75rem]
    file:bg-slate-100
    file:invalid:bg-red-500
    file:border-0
    file:border-inherit
    file:border-solid
    file:px-3
    file:py-3

    file:focus:outline-transparent

    hover:file:bg-slate-300
    `;

    const variants: Record<Variant, string> = {
        lg: "h-12 px-6 py-4 text-base",
        md: "h-10 px-3 py-2 text-md",
        sm: "h-8 px-2 py-1 text-sm",
    };

    let space = variant === "lg" ? "space-y-2" : "space-y-1";
    space = hiddenLabel ? "" : space;

    return (
        <div class={`relative w-full ${space}`}>
            <Label htmlFor={id} required={props["aria-required"] ? "true" : "false"} hiddenLabel={hiddenLabel}>
                {label}
            </Label>
            <div className="flex">
                {/* {props.type === "url" ? (
                    <span class="inline-flex items-center rounded-l-md border border-r-0 border-slate-300 px-3 text-slate-500 sm:text-sm">
                        https://
                    </span>
                ) : (
                    ""
                )} */}

                <input
                    id={id}
                    name={name || id}
                    autocomplete="off"
                    {...props}
                    class={`
                    bg-white
                    border
                    border-slate-300
                    ${variants[variant as Variant]}
                    
                    text-sm
                    w-full

                    disabled:bg-slate-50
                    disabled:text-slate-500
                    disabled:border-slate-500

                    ${props.type === "file" ? fileStyles : ""}

                    peer

                    aria-[invalid=true]:border-red-500
                    aria-[invalid=true]:placeholder:text-red-300
                `}
                />
                <FieldError id={id} />
            </div>
            {description ? <p class="text-sm text-slate-500">{description}</p> : ""}
        </div>
    );
}
