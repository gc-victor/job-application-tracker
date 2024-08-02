import type { ComponentChildren, JSX } from "preact";

import { t } from "@/pages/jat/lib/i18n/t";
import {
    JOB_TYPE_FREELANCE_ID,
    JOB_TYPE_FREELANCE_VALUE,
    JOB_TYPE_FULL_TIME_ID,
    JOB_TYPE_FULL_TIME_VALUE,
    JOB_TYPE_ID,
    JOB_TYPE_INTERNSHIP_ID,
    JOB_TYPE_INTERNSHIP_VALUE,
    JOB_TYPE_PART_TIME_ID,
    JOB_TYPE_PART_TIME_VALUE,
    STATUS_APPLIED_ID,
    STATUS_APPLIED_VALUE,
    STATUS_ID,
    STATUS_INTERVIEW_ID,
    STATUS_INTERVIEW_VALUE,
    STATUS_NOT_APPLIED_ID,
    STATUS_NOT_APPLIED_VALUE,
    STATUS_OFFER_RECEIVED_ID,
    STATUS_OFFER_RECEIVED_VALUE,
    STATUS_REJECTED_ID,
    STATUS_REJECTED_VALUE,
    WORKPLACE_HYBRID_ID,
    WORKPLACE_HYBRID_VALUE,
    WORKPLACE_ID,
    WORKPLACE_OFFICE_ID,
    WORKPLACE_OFFICE_VALUE,
    WORKPLACE_REMOTE_ID,
    WORKPLACE_REMOTE_VALUE,
} from "@/config/shared/jat.constants";
import { Checkbox } from "@/pages/jat/components/checkbox";
import { DropdownMenu, DropdownMenuDetails, DropdownMenuSummary } from "@/pages/jat/components/dropdown-menu";
import { Input } from "@/pages/jat/components/input";

import { FILTERS_CLASS_NAME } from "./client.constants";
import { Button } from "./components/button";

const tPageApplications = t.page.applications;
const tGlobalDomain = t.global.domain;

export function Filters(): JSX.Element {
    return (
        <form is="form-filter" class="lg:flex flex-1 items-center p-px" action="/jat" method="GET">
            <div class={`${FILTERS_CLASS_NAME} lg:flex items-center mt-4 mx-4 lg:m-0`}>
                <div class="lg:w-[320px] w-full">
                    <Input
                        id="search"
                        label={tPageApplications.filterSearchLabel}
                        placeholder={tPageApplications.filterSearchPlaceholder}
                        hiddenLabel={true}
                        variant="sm"
                    />
                </div>
                <div class="flex space-x-2 mt-4 lg:ml-2 lg:mt-0">
                    <Filter summary={tGlobalDomain.workplaceTitle}>
                        <Checkbox
                            legend={tGlobalDomain.workplaceTitle}
                            id={WORKPLACE_ID}
                            hiddenLegend={true}
                            variant="vertical"
                            items={[
                                { label: tGlobalDomain.officeTitle, value: WORKPLACE_OFFICE_VALUE, id: WORKPLACE_OFFICE_ID },
                                { label: tGlobalDomain.remoteTitle, value: WORKPLACE_REMOTE_VALUE, id: WORKPLACE_REMOTE_ID },
                                { label: tGlobalDomain.hybridTitle, value: WORKPLACE_HYBRID_VALUE, id: WORKPLACE_HYBRID_ID },
                            ]}
                        />
                    </Filter>
                    <Filter summary={tGlobalDomain.jobTypeTitle}>
                        <Checkbox
                            legend={tGlobalDomain.jobTypeTitle}
                            id={JOB_TYPE_ID}
                            hiddenLegend={true}
                            variant="vertical"
                            items={[
                                { label: tGlobalDomain.fullTimeTitle, value: JOB_TYPE_FULL_TIME_VALUE, id: JOB_TYPE_FULL_TIME_ID },
                                { label: tGlobalDomain.partTimeTitle, value: JOB_TYPE_PART_TIME_VALUE, id: JOB_TYPE_PART_TIME_ID },
                                { label: tGlobalDomain.internshipTitle, value: JOB_TYPE_INTERNSHIP_VALUE, id: JOB_TYPE_INTERNSHIP_ID },
                                { label: tGlobalDomain.freelanceTitle, value: JOB_TYPE_FREELANCE_VALUE, id: JOB_TYPE_FREELANCE_ID },
                            ]}
                        />
                    </Filter>
                    <Filter summary={tGlobalDomain.statusTitle}>
                        <Checkbox
                            legend={tGlobalDomain.statusTitle}
                            id={STATUS_ID}
                            hiddenLegend={true}
                            variant="vertical"
                            items={[
                                {
                                    label: tGlobalDomain.notAppliedTitle,
                                    value: STATUS_NOT_APPLIED_VALUE,
                                    id: STATUS_NOT_APPLIED_ID,
                                },
                                {
                                    label: tGlobalDomain.appliedTitle,
                                    value: STATUS_APPLIED_VALUE,
                                    id: STATUS_APPLIED_ID,
                                },
                                {
                                    label: tGlobalDomain.interviewTitle,
                                    value: STATUS_INTERVIEW_VALUE,
                                    id: STATUS_INTERVIEW_ID,
                                },
                                {
                                    label: tGlobalDomain.offerReceivedTitle,
                                    value: STATUS_OFFER_RECEIVED_VALUE,
                                    id: STATUS_OFFER_RECEIVED_ID,
                                },
                                {
                                    label: tGlobalDomain.rejectedTitle,
                                    value: STATUS_REJECTED_VALUE,
                                    id: STATUS_REJECTED_ID,
                                },
                            ]}
                        />
                    </Filter>
                    <Button is="reset-filters" type="reset">
                        Reset
                    </Button>
                </div>
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
