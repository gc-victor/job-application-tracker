import { PAGE_ADMIN_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";
import { PAGE_ADMIN_STATUS_TRACKER_PATH } from "@/config/shared/status-tracker.constants";

export function Menu() {
    return (
        <menu className="flex items-center text-sm">
            <li className="mx-2">
                <a class="hover:underline" href={PAGE_ADMIN_STATUS_TRACKER_PATH}>
                    Status Tracker
                </a>
            </li>
            <li className="mx-2">
                <a class="hover:underline" href={PAGE_ADMIN_JOB_APPLICATION_PATH}>
                    Job Application
                </a>
            </li>
        </menu>
    );
}
