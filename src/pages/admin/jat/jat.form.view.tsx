import { API_ADMIN_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";
import { Button } from "@/pages/admin/components/button";
import { Input } from "@/pages/admin/components/input";
import { Legend } from "@/pages/admin/components/legend";
import { Textarea } from "@/pages/admin/components/textarea";
import { ID_FORM_COMPONENT } from "@/pages/admin/lib/constants";

export function JobApplicationFormView() {
    return (
        <form
            is="form-element"
            id={ID_FORM_COMPONENT}
            class="h-full pt-6 w-full"
            method="dialog"
            data-path={API_ADMIN_JOB_APPLICATION_PATH}
        >
            <div class="absolute right-4 text-3xl top-4">
                <Button variant="transparent" type="reset">
                    <span class="block px-3 py-1">
                        <span class="sr-only">Close</span>
                        <span aria-hidden="true">×</span>
                    </span>
                </Button>
            </div>
            <fieldset class="max-h-svh -mb-40 overflow-y-auto pb-40 px-6 space-y-6" tabindex={-1}>
                <Legend>Job Application</Legend>
                <Input id="position" label="Position" aria-required="true" placeholder="Write a position here..." />
                <Input id="job_link" label="Job Link" aria-required="true" placeholder="Write a job_link here..." />
                <Input id="company_name" label="Company Name" aria-required="true" placeholder="Write a company_name here..." />
                <Input id="company_website" label="Company Website" aria-required="true" placeholder="Write a company_website here..." />
                <Input id="location" label="Location" aria-required="true" placeholder="Write a location here..." />
                <Input id="salary_range_min" label="Salary Range Min" aria-required="true" placeholder="Write a salary_range_min here..." />
                <Input id="salary_range_max" label="Salary Range Max" aria-required="true" placeholder="Write a salary_range_max here..." />
                <Input id="job_type" label="Job Type" aria-required="true" placeholder="Write a job_type here..." />
                <Input id="workplace" label="Workplace" aria-required="true" placeholder="Write a workplace here..." />
                <Input id="status" label="Status" aria-required="true" placeholder="Write a status here..." />
                <Textarea id="tags" label="Tags" aria-required="true" placeholder="Write a tags here..." />
                <Textarea id="notes" label="Notes" aria-required="true" placeholder="Write a notes here..." />
                <Textarea id="documents" label="Documents" aria-required="true" placeholder="Write a documents here..." />
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
