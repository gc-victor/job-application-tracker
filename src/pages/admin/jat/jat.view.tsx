import { PAGE_ADMIN_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";
import { Button } from "@/pages/admin/components/button";
import { Header } from "@/pages/admin/components/header";
import { ID_DRAWER_COMPONENT, ID_NEW_ITEM } from "@/pages/admin/lib/constants";
import { JobApplicationFormView } from "./jat.form.view";

export interface JobApplicationViewProps {
    id: number;
    uuid: string;
    position: string;
    job_link: string;
    company_name: string;
    company_website: string;
    location: string;
    salary_range_min: string;
    salary_range_max: string;
    job_type: string;
    workplace: string;
    status: string;
    tags: string;
    notes: string;
    documents: string;
    created_at: number;
    updated_at: number;
}

export function JobApplicationView({ data }: { data: JobApplicationViewProps[] }) {
    return (
        <>
            <Header>
                {/* NOTE: The click handler is managed by table-element */}
                <Button id={ID_NEW_ITEM}>New Job Application</Button>
            </Header>
            <main>
                <drawer-element id={ID_DRAWER_COMPONENT} class="hidden" right>
                    <JobApplicationFormView />
                </drawer-element>
                <div data-hot-reload-scroll="table-wrapper" class="h-[calc(100lvh_-_65px)] relative overflow-x-auto overflow-y-auto">
                    <div class="absolute bg-slate-100 h-10 w-full -z-10" />
                    <table is="table-element" data-url={PAGE_ADMIN_JOB_APPLICATION_PATH} class="text-left rtl:text-right w-max min-w-full">
                        <thead class="font-cal h-10 text-xs uppercase">
                            <tr>
                                <th scope="col" class="bg-slate-100 px-4 py-3 text-center w-id word-spacing z-10">
                                    <span className="sr-only">Visit</span>
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 text-center w-id word-spacing z-10">
                                    id
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-id word-spacing z-10">
                                    uuid
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Position
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Job Link
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-text word-spacing z-10">
                                    Company Name
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-text word-spacing z-10">
                                    Company Website
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Location
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Salary Range Min
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Salary Range Max
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Job Type
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Workplace
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Status
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-text word-spacing z-10">
                                    Tags
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-text word-spacing z-10">
                                    Notes
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-text word-spacing z-10">
                                    Documents
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 text-center w-timestamp word-spacing z-10">
                                    Created At
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 text-center w-timestamp word-spacing z-10">
                                    Updated At
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td>{}</td>
                                    <td class="py-4 text-center" colspan={13}>
                                        No Job Application Found
                                    </td>
                                    <td>{}</td>
                                    <td>{}</td>
                                </tr>
                            ) : (
                                data.map((jobApplication) => (
                                    <tr
                                        key={jobApplication.uuid}
                                        data-uuid={jobApplication.uuid}
                                        class="border-b border-slate-100 h-8 relative text-sm hover:bg-slate-50"
                                    >
                                        <td class="px-4 text-center">
                                            <span className="relative z-10">
                                                <Button tag="a" href={`/jat/${jobApplication.uuid}`}>
                                                    Visit
                                                </Button>
                                            </span>
                                        </td>
                                        <td class="px-4 text-center">
                                            {/*
                                                CREDIT:
                                                https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html#Update02
                                                https://adrianroselli.com/2020/02/block-links-cards-clickable-regions-etc.html#comment-246683
                                            */}
                                            <button
                                                class="
                                                    after:content-['']
                                                    after:block
                                                    after:absolute
                                                    after:inset-0

                                                    focus:after:outline
                                                    focus:after:outline-2
                                                    focus:after:outline-slate-950
                                                "
                                                type="button"
                                            >
                                                <span class="sr-only">Edit</span>
                                            </button>
                                            {String(jobApplication.id)}
                                        </td>
                                        <td class="px-4">
                                            <div class="w-uuid truncate">{jobApplication.uuid}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.position}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.job_link}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="max-h-8 w-text truncate">{jobApplication.company_name}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="max-h-8 w-text truncate">{jobApplication.company_website}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.location}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.salary_range_min}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.salary_range_max}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.job_type}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.workplace}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{jobApplication.status}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="max-h-8 w-text truncate">{jobApplication.tags}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="max-h-8 w-text truncate">{jobApplication.notes}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="max-h-8 w-text truncate">{jobApplication.documents}</div>
                                        </td>
                                        <td class="px-4 text-center">
                                            <div class="m-auto w-timestamp">
                                                <div>{date(jobApplication.created_at)}</div>
                                                <div class="text-slate-500 text-xs">{time(jobApplication.created_at)}</div>
                                            </div>
                                        </td>
                                        <td class="px-4 text-center">
                                            <div class="m-auto w-timestamp">
                                                <div>{date(jobApplication.updated_at)}</div>
                                                <div class="text-slate-500 text-xs">{time(jobApplication.updated_at)}</div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

function date(timestamp: number) {
    const lang = typeof navigator !== "undefined" && navigator.language;
    return new Date(timestamp * 1000).toLocaleDateString(lang || "en-US", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function time(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds} UTC`;
}
