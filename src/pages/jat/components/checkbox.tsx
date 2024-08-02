import type { ComponentChildren } from "preact";

interface Item {
    label: ComponentChildren;
    id: string;
    value: string;
    checked?: boolean;
}

type Items = Item[];

type Variant = "vertical" | "horizontal";

export function Checkbox({
    legend,
    id,
    items,
    variant = "vertical",
    value,
    hiddenLegend,
}: {
    id: string;
    legend: string;
    items: Items;
    hiddenLegend?: boolean;
    variant?: Variant;
    value?: string;
    [key: string]: unknown;
}) {
    const srOnly = hiddenLegend ? "sr-only" : "";
    const variants: Record<Variant, string> = {
        vertical: "flex-col",
        horizontal: "sm:items-center sm:space-x-10 sm:space-y-0",
    };

    return (
        <fieldset>
            <legend class={`font-cal text-md ${srOnly}`}>{legend}</legend>
            <div className={`sm:flex ${variants[variant]}`}>
                {items.map((item) => {
                    const options: { checked?: boolean } = {};

                    if (value === item.value) {
                        options.checked = true;
                    }

                    return (
                        <div key={item.value} className="flex items-center">
                            <input
                                id={item.id}
                                name={id}
                                value={item.value}
                                type="checkbox"
                                {...options}
                                className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600"
                            />
                            <label htmlFor={item.id} className="ml-3 block text-sm font-medium leading-6 text-slate-900">
                                {item.label}
                            </label>
                        </div>
                    );
                })}
            </div>
        </fieldset>
    );
}
