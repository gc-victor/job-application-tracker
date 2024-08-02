import { PAGE_ADMIN_STATUS_TRACKER_PATH } from "@/config/shared/status-tracker.constants";
import { Button } from "@/pages/admin/components/button";
import { Header } from "@/pages/admin/components/header";
import { ID_DRAWER_COMPONENT, ID_NEW_ITEM } from "@/pages/admin/lib/constants";
import { StatusTrackerFormView } from "./status-tracker.form.view";

export interface StatusTrackerViewProps {
    id: number;
    uuid: string;
    job_application_id: number;
    status: string;
    created_at: number;
    updated_at: number;
}

export function StatusTrackerView({ data }: { data: StatusTrackerViewProps[] }) {
    return (
        <>
            <Header>
                {/* NOTE: The click handler is managed by table-element */}
                <Button id={ID_NEW_ITEM}>New Status Tracker</Button>
            </Header>
            <main>
                <drawer-element id={ID_DRAWER_COMPONENT} class="hidden" right>
                    <StatusTrackerFormView />
                </drawer-element>
                <div data-hot-reload-scroll="table-wrapper" class="h-[calc(100lvh_-_65px)] relative overflow-x-auto overflow-y-auto">
                    <div class="absolute bg-slate-100 h-10 w-full -z-10" />
                    <table is="table-element" data-url={PAGE_ADMIN_STATUS_TRACKER_PATH} class="text-left rtl:text-right w-max min-w-full">
                        <thead class="font-cal h-10 text-xs uppercase">
                            <tr>
                                <th scope="col" class="bg-slate-100 px-4 py-3 text-center w-id word-spacing z-10">
                                    id
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-id word-spacing z-10">
                                    uuid
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-number word-spacing z-10">
                                    Job Application Id
                                </th>
                                <th scope="col" class="bg-slate-100 px-4 py-3 w-string word-spacing z-10">
                                    Status
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
                                    <td class="py-4 text-center" colspan={2}>
                                        No Status Tracker Found
                                    </td>
                                    <td>{}</td>
                                    <td>{}</td>
                                </tr>
                            ) : (
                                data.map((statusTracker) => (
                                    <tr
                                        key={statusTracker.uuid}
                                        data-uuid={statusTracker.uuid}
                                        class="border-b border-slate-100 h-8 relative text-sm hover:bg-slate-50"
                                    >
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
                                            {String(statusTracker.id)}
                                        </td>
                                        <td class="px-4">
                                            <div class="w-uuid truncate">{statusTracker.uuid}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-number">{String(statusTracker.job_application_id)}</div>
                                        </td>
                                        <td class="px-4">
                                            <div class="w-string truncate">{statusTracker.status}</div>
                                        </td>
                                        <td class="px-4 text-center">
                                            <div class="m-auto w-timestamp">
                                                <div>{date(statusTracker.created_at)}</div>
                                                <div class="text-slate-500 text-xs">{time(statusTracker.created_at)}</div>
                                            </div>
                                        </td>
                                        <td class="px-4 text-center">
                                            <div class="m-auto w-timestamp">
                                                <div>{date(statusTracker.updated_at)}</div>
                                                <div class="text-slate-500 text-xs">{time(statusTracker.updated_at)}</div>
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
