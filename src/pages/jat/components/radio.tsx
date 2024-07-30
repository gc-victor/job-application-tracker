import type { ComponentChildren } from "preact";

interface Item {
    label: ComponentChildren;
    id: string;
    value: string;
}

type Items = Item[];

export function Radio({ legend, id, items, value }: { id: string; legend: string; items: Items; value?: string; [key: string]: unknown }) {
    return (
        <fieldset>
            <legend class="font-cal text-md">{legend}</legend>
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
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
                                type="radio"
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
