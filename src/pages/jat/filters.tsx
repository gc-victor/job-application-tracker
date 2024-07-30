import type { ComponentChildren, JSX } from "preact";

import { Checkbox } from "@/pages/jat/components/checkbox";
import { DropdownMenu, DropdownMenuDetails, DropdownMenuSummary } from "@/pages/jat/components/dropdown-menu";
import { Input } from "@/pages/jat/components/input";

import { FILTERS_CLASS_NAME } from "./constants";
import { Button } from "./components/button";

export function Filters(): JSX.Element {
    return (
        <form is="form-filter" class="lg:flex flex-1 items-center p-px" action="/jat" method="GET">
            <div class={`${FILTERS_CLASS_NAME} flex items-center mt-4 mx-4 lg:m-0 space-x-2`}>
                <div class="w-[320px]">
                    <Input
                        id="search"
                        label="Filter by column"
                        placeholder="Filter by position or company or location"
                        hiddenLabel={true}
                        variant="sm"
                    />
                </div>
                <Filter summary="Workplace">
                    <Checkbox
                        legend={"Workplace"}
                        id="workplace"
                        hiddenLegend={true}
                        variant="vertical"
                        items={[
                            { label: "Office", value: "office", id: "office" },
                            { label: "Remote", value: "remote", id: "remote" },
                            { label: "Hybrid", value: "hybrid", id: "hybrid" },
                        ]}
                    />
                </Filter>
                <Filter summary="Job Type">
                    <Checkbox
                        legend={"Job Type"}
                        id="job_type"
                        hiddenLegend={true}
                        variant="vertical"
                        items={[
                            { label: "Full-Time", value: "full_time", id: "full-time" },
                            { label: "Part-Time", value: "part_time", id: "part-time" },
                            { label: "Internship", value: "internship", id: "internship" },
                            { label: "Freelance", value: "freelance", id: "freelance" },
                        ]}
                    />
                </Filter>
                <Filter summary="Status">
                    <Checkbox
                        legend={"Status"}
                        id="status"
                        hiddenLegend={true}
                        variant="vertical"
                        items={[
                            {
                                label: "Not Applied",
                                value: "not_applied",
                                id: "not_applied",
                            },
                            {
                                label: "Applied",
                                value: "applied",
                                id: "applied",
                            },
                            {
                                label: "Interview",
                                value: "interview",
                                id: "interview",
                            },
                            {
                                label: "Offer Received",
                                value: "offer_received",
                                id: "offer_received",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                                id: "rejected",
                            },
                        ]}
                    />
                </Filter>
                <Button is="reset-filters" type="reset">
                    Reset
                </Button>
            </div>
        </form>
    );

    function Filter({ children, summary }: { children: ComponentChildren; summary: string }) {
        return (
            <filter-counter>
                <DropdownMenu>
                    <DropdownMenuSummary
                        className="
                            bg-white
                            border
                            border-dashed
                            border-input
                            disabled:opacity-50
                            disabled:pointer-events-none
                            focus-visible:outline-none
                            focus-visible:ring-inset
                            focus-visible:ring-2
                            focus-visible:ring-slate-950
                            font-medium
                            h-8
                            hover:bg-slate-950
                            hover:text-white
                            inline-flex
                            items-center
                            justify-center
                            px-3
                            rounded-md
                            shadow-sm
                            text-xs
                            transition-colors
                            whitespace-nowrap
                            "
                    >
                        {/* TODO: use id to get the SVG */}
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="mr-2 h-4 w-4" aria-hidden="true">
                            <use href="#circle-plus" height="15" width="15" />
                        </svg>
                        {summary}
                        {/* TODO: use a constant for the class name */}
                        <span class="js-filter-count-wrapper hidden">
                            <span class="bg-slate-300 w-[1px] mx-2 h-4" />
                            <span class="lg:flex">
                                {/* TODO: use a constant for the class name */}
                                <span class="js-filter-count text-xs px-1" />
                            </span>
                        </span>
                    </DropdownMenuSummary>
                    <DropdownMenuDetails>
                        <div class="outline-none w-[200px] p-2">{children}</div>
                    </DropdownMenuDetails>
                </DropdownMenu>
            </filter-counter>
        );
    }
}
