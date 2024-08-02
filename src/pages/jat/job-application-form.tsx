import { t } from "@/pages/jat/lib/i18n/t";

import { Button } from "@/pages/jat/components/button";
import { Documents } from "@/pages/jat/components/documents";
import { Input } from "@/pages/jat/components/input";
import { Radio } from "@/pages/jat/components/radio";
import { Textarea } from "@/pages/jat/components/textarea";
import {
    JOB_TYPE_CONTRACT_VALUE,
    JOB_TYPE_FREELANCE_VALUE,
    JOB_TYPE_FULL_TIME_VALUE,
    JOB_TYPE_INTERNSHIP_VALUE,
    JOB_TYPE_PART_TIME_VALUE,
    STATUS_APPLIED_VALUE,
    STATUS_INTERVIEW_VALUE,
    STATUS_OFFER_RECEIVED_VALUE,
    STATUS_NOT_APPLIED_VALUE,
    STATUS_REJECTED_VALUE,
    WORKPLACE_HYBRID_VALUE,
    WORKPLACE_OFFICE_VALUE,
    WORKPLACE_REMOTE_VALUE,
    NOTES_ID,
} from "@/config/shared/jat.constants";
import {
    COMPANY_NAME_ID,
    COMPANY_WEBSITE_ID,
    DOCUMENTS_ID,
    JOB_LINK_ID,
    JOB_TYPE_CONTRACT_ID,
    JOB_TYPE_FREELANCE_ID,
    JOB_TYPE_FULL_TIME_ID,
    JOB_TYPE_ID,
    JOB_TYPE_INTERNSHIP_ID,
    JOB_TYPE_PART_TIME_ID,
    LOCATION_ID,
    NOTE_COMMENT_ID,
    NOTE_TITLE_ID,
    POSITION_ID,
    SALARY_RANGE_MAX_ID,
    SALARY_RANGE_MIN_ID,
    STATUS_APPLIED_ID,
    STATUS_ID,
    STATUS_INTERVIEW_ID,
    STATUS_NOT_APPLIED_ID,
    STATUS_OFFER_RECEIVED_ID,
    STATUS_REJECTED_ID,
    TAGS_ID,
    WORKPLACE_HYBRID_ID,
    WORKPLACE_ID,
    WORKPLACE_OFFICE_ID,
    WORKPLACE_REMOTE_ID,
} from "@/config/shared/jat.constants";
import { ADD_NOTE_ELEMENT, NOTE_TEMPLATE_ID_NAME } from "./client.constants";

export const tApplication = t.applicationForm;
export const tButtons = t.global.buttons;

interface Notes {
    title?: string;
    comment?: string;
}

interface JobApplicationFormValues {
    position?: string;
    jobLink?: string;
    companyName?: string;
    companyWebsite?: string;
    location?: string;
    workplace?: string;
    jobType?: string;
    salaryRangeMin?: string;
    salaryRangeMax?: string;
    status?: string;
    tags?: string;
    documents?: File[];
    notes?: Notes[];
    uuid?: string;
}

type Method = "post" | "put";

export function JobApplicationForm({
    title,
    method = "post",
    values = {},
}: { title: string; method: Method; values?: JobApplicationFormValues }) {
    const {
        position,
        jobLink,
        companyName,
        companyWebsite,
        location,
        workplace = WORKPLACE_REMOTE_VALUE,
        jobType = JOB_TYPE_FULL_TIME_VALUE,
        salaryRangeMin,
        salaryRangeMax,
        status = STATUS_NOT_APPLIED_VALUE,
        tags,
        documents,
        notes,
        uuid,
    } = values;

    return (
        <article class="flex flex-1 flex-col p-4">
            <div class="grid w-full max-w-6xl items-start lg:gap-4 lg:grid-cols-[180px_1fr]">
                <div class="lg:sticky top-7">
                    <aside class="mt-14">
                        <nav class="lg:text-sm text-md">
                            <ul class="space-y-1">
                                <li>
                                    <a href={`#${POSITION_ID}-wrapper`} class="underline">
                                        {tApplication.positionMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${JOB_LINK_ID}-wrapper`} class="underline">
                                        {tApplication.offerUrlMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${COMPANY_NAME_ID}-wrapper`} class="underline">
                                        {tApplication.companyNameMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${LOCATION_ID}-wrapper`} class="underline">
                                        {tApplication.locationMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href="#workplace-wrapper" class="underline">
                                        {tApplication.workplaceMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href="#job-type-wrapper" class="underline">
                                        {tApplication.jobTypeMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${TAGS_ID}-wrapper`} class="underline">
                                        {tApplication.tagsMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${SALARY_RANGE_MIN_ID}-wrapper`} class="underline">
                                        {tApplication.salaryRangeMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${STATUS_ID}-wrapper`} class="underline">
                                        {tApplication.statusMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${DOCUMENTS_ID}-wrapper`} class="underline">
                                        {tApplication.documentsMenu}
                                    </a>
                                </li>
                                <li>
                                    <a href={`#${NOTES_ID}-wrapper`} class="underline">
                                        {tApplication.notesMenu}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </aside>
                </div>
                <section>
                    <div class="grid gap-6 max-w-[768px]">
                        <h1 class="font-cal lg:text-xl text-lg">{title}</h1>
                        <form
                            is="form-element"
                            class="grid w-full items-start gap-6"
                            action="/api/jat"
                            method={method}
                            data-uuid={uuid}
                            enctype="multipart/form-data"
                        >
                            <fieldset id="offer" class="rounded-lg border bg-white">
                                <legend class="ml-4 text-lg font-cal sr-only">{tApplication.newApplicationLegend}</legend>
                                <div className="grid gap-6 lg:p-8 p-4">
                                    <div id={`${POSITION_ID}-wrapper`}>
                                        <Input
                                            id={POSITION_ID}
                                            aria-required={true}
                                            label={tApplication.positionLabel}
                                            placeholder={tApplication.positionPlaceholder}
                                            value={position}
                                        />
                                    </div>
                                    <div id={`${JOB_LINK_ID}-wrapper`} class="pb-2">
                                        <Input
                                            id={JOB_LINK_ID}
                                            label={tApplication.jobLinkLabel}
                                            type="url"
                                            placeholder={tApplication.jobLinkPlaceholder}
                                            value={jobLink}
                                        />
                                    </div>
                                    <fieldset id={`${COMPANY_NAME_ID}-wrapper`} class="border leading-3 rounded-lg p-4">
                                        <legend class="font-cal text-md">{tApplication.companyLegend}</legend>
                                        <div class="space-y-4">
                                            <Input
                                                id={COMPANY_NAME_ID}
                                                label={tApplication.companyNameLabel}
                                                placeholder={tApplication.companyNamePlaceholder}
                                                value={companyName}
                                            />
                                            <div class="pb-2">
                                                <Input
                                                    id={COMPANY_WEBSITE_ID}
                                                    label={tApplication.companyWebsiteLabel}
                                                    type="url"
                                                    placeholder={tApplication.companyWebsitePlaceholder}
                                                    value={companyWebsite}
                                                />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div id={`${LOCATION_ID}-wrapper`}>
                                        <Input
                                            id={LOCATION_ID}
                                            label={tApplication.locationLabel}
                                            placeholder={tApplication.locationPlaceholder}
                                            value={location}
                                        />
                                    </div>
                                    <div id="workplace-wrapper">
                                        <Radio
                                            id={WORKPLACE_ID}
                                            legend={tApplication.workplaceLegend}
                                            value={workplace}
                                            items={[
                                                {
                                                    label: tApplication.officeWorkplaceLabel,
                                                    value: WORKPLACE_OFFICE_VALUE,
                                                    id: WORKPLACE_OFFICE_ID,
                                                },
                                                {
                                                    label: tApplication.remoteWorkplaceLabel,
                                                    value: WORKPLACE_REMOTE_VALUE,
                                                    id: WORKPLACE_REMOTE_ID,
                                                },
                                                {
                                                    label: tApplication.hybridWorkplaceLabel,
                                                    value: WORKPLACE_HYBRID_VALUE,
                                                    id: WORKPLACE_HYBRID_ID,
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div id="job-type-wrapper">
                                        <Radio
                                            legend={tApplication.jobTypeLegend}
                                            id={JOB_TYPE_ID}
                                            value={jobType}
                                            items={[
                                                {
                                                    label: tApplication.fullTimeJobTypeLabel,
                                                    value: JOB_TYPE_FULL_TIME_VALUE,
                                                    id: JOB_TYPE_FULL_TIME_ID,
                                                },
                                                {
                                                    label: tApplication.partTimeJobTypelLabel,
                                                    value: JOB_TYPE_PART_TIME_VALUE,
                                                    id: JOB_TYPE_PART_TIME_ID,
                                                },
                                                {
                                                    label: tApplication.internshipJobTypeLabel,
                                                    value: JOB_TYPE_INTERNSHIP_VALUE,
                                                    id: JOB_TYPE_INTERNSHIP_ID,
                                                },
                                                {
                                                    label: tApplication.contractJobTypeLabel,
                                                    value: JOB_TYPE_CONTRACT_VALUE,
                                                    id: JOB_TYPE_CONTRACT_ID,
                                                },
                                                {
                                                    label: tApplication.freelanceJobTypeLabel,
                                                    value: JOB_TYPE_FREELANCE_VALUE,
                                                    id: JOB_TYPE_FREELANCE_ID,
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div id={`${TAGS_ID}-wrapper`}>
                                        <Input
                                            id={TAGS_ID}
                                            label={tApplication.tagsLabel}
                                            description={tApplication.tagsDescription}
                                            placeholder={tApplication.tagsPlaceholder}
                                            value={tags}
                                        />
                                    </div>
                                    <fieldset id={`${SALARY_RANGE_MIN_ID}-wrapper`} class="border leading-3 rounded-lg p-4">
                                        <legend class="font-cal text-md">{tApplication.salaryRangeLegend}</legend>
                                        <div class="grid grid-cols-2 gap-3">
                                            <div class="flex flex-col">
                                                <Input
                                                    id={SALARY_RANGE_MIN_ID}
                                                    label={tApplication.salaryRangeMinLabel}
                                                    placeholder={tApplication.salaryRangeMinPlaceholder}
                                                    value={salaryRangeMin}
                                                />
                                            </div>
                                            <div class="flex flex-col">
                                                <Input
                                                    id={SALARY_RANGE_MAX_ID}
                                                    label={tApplication.salaryRangeMaxLabel}
                                                    placeholder={tApplication.salaryRangeMaxPlaceholder}
                                                    value={salaryRangeMax}
                                                />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div id={`${STATUS_ID}-wrapper`}>
                                        <Radio
                                            legend={tApplication.statusLabel}
                                            id={STATUS_ID}
                                            value={status}
                                            items={[
                                                {
                                                    label: tApplication.notAppliedStatusLabel,
                                                    value: STATUS_NOT_APPLIED_VALUE,
                                                    id: STATUS_NOT_APPLIED_ID,
                                                },
                                                {
                                                    label: tApplication.appliedStatusLabel,
                                                    value: STATUS_APPLIED_VALUE,
                                                    id: STATUS_APPLIED_ID,
                                                },
                                                {
                                                    label: tApplication.interviewStatusLabel,
                                                    value: STATUS_INTERVIEW_VALUE,
                                                    id: STATUS_INTERVIEW_ID,
                                                },
                                                {
                                                    label: tApplication.offerReceivedStatusLabel,
                                                    value: STATUS_OFFER_RECEIVED_VALUE,
                                                    id: STATUS_OFFER_RECEIVED_ID,
                                                },
                                                {
                                                    label: tApplication.rejectedStatusLabel,
                                                    value: STATUS_REJECTED_VALUE,
                                                    id: STATUS_REJECTED_ID,
                                                },
                                            ]}
                                        />
                                    </div>
                                    <div id={`${DOCUMENTS_ID}-wrapper`}>
                                        <Input id={DOCUMENTS_ID} label={tApplication.documentsLabel} type="file" multiple />
                                    </div>
                                    {/* TODO: use a const */}
                                    <div class="js-documents">
                                        {documents?.length ? <Documents documents={documents} uuid={uuid || ""} showDelete={true} /> : null}
                                    </div>
                                    <div id={`${NOTES_ID}-wrapper`} class="space-y-6">
                                        {!notes?.length && <Note />}
                                        {notes?.map(({ title = "", comment = "" }, index) => (
                                            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
                                            <Note index={index} title={title} comment={comment} />
                                        ))}
                                        <template id={NOTE_TEMPLATE_ID_NAME}>
                                            <Note />
                                        </template>
                                    </div>
                                    <p class="flex justify-center">
                                        <Button is={ADD_NOTE_ELEMENT} variant="circle">
                                            Add Note
                                        </Button>
                                    </p>
                                </div>
                                <div className="flex items-center justify-end gap-x-6 border-t lg:p-8 p-4">
                                    <Button type="submit" variant="md">
                                        {tButtons.save}
                                    </Button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </section>
            </div>
        </article>
    );
}

function Note({ index, title, comment }: { index?: number; title?: string; comment?: string }) {
    return (
        <fieldset class="border leading-3 rounded-lg p-4">
            <legend class="font-cal text-md">{tApplication.notesLegend}</legend>
            <div class="space-y-4">
                <Input
                    id={NOTE_TITLE_ID + (index ? `-${index}` : "")}
                    name={NOTE_TITLE_ID}
                    label={tApplication.notesTitleLabel}
                    placeholder={tApplication.notesTitlePlaceholder}
                    value={title}
                />
                <Textarea
                    id={NOTE_COMMENT_ID + (index ? `-${index}` : "")}
                    name={NOTE_COMMENT_ID}
                    label={tApplication.notesCommentLabel}
                    placeholder={tApplication.notesCommentPlaceholder}
                >
                    {comment}
                </Textarea>
            </div>
        </fieldset>
    );
}
