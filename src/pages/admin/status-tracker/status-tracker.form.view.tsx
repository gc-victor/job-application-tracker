import { API_ADMIN_STATUS_TRACKER_PATH } from "@/config/shared/status-tracker.constants";
import { Button } from "@/pages/admin/components/button";
import { Input } from "@/pages/admin/components/input";
import { Legend } from "@/pages/admin/components/legend";
import { ID_FORM_COMPONENT } from "@/pages/admin/lib/constants";

export function StatusTrackerFormView() {
    return (
        <form is="form-element" id={ID_FORM_COMPONENT} class="h-full pt-6 w-full" method="dialog" data-path={API_ADMIN_STATUS_TRACKER_PATH}>
            <div class="absolute right-4 text-3xl top-4">
                <Button variant="transparent" type="reset">
                    <span class="block px-3 py-1">
                        <span class="sr-only">Close</span>
                        <span aria-hidden="true">×</span>
                    </span>
                </Button>
            </div>
            <fieldset class="max-h-svh -mb-40 overflow-y-auto pb-40 px-6 space-y-6" tabindex={-1}>
                <Legend>Status Tracker</Legend>
                <Input
                    id="job_application_id"
                    label="Job Application Id"
                    type="number"
                    step="any"
                    aria-required="true"
                    placeholder="Write a job_application_id here..."
                />
                <Input id="status" label="Status" aria-required="true" placeholder="Write a status here..." />
            </fieldset>
            <div class="absolute bg-white bottom-0 flex h-20 items-center justify-between px-6 w-full">
                <div class="flex">
                    <Button variant="w-md" type="reset">
                        Cancel
                    </Button>
                    <div class="ml-4">
                        <Button variant="md" type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
                <Button color="red" variant="md" formmethod="delete" type="submit">
                    Delete
                </Button>
            </div>
        </form>
    );
}
