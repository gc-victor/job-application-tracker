import { parse } from "valibot";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { adminUserSession, getAdminUserSession } from "@/lib/server/admin-user-session";
import { fetcher } from "@/lib/server/fetcher";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { ok } from "@/lib/server/responses";
import { JobApplicationUpdateValidation } from "./job-application.validation";

export async function handleRequest(req: Request): Promise<Response> {
    try {
        const session = await getAdminUserSession(req);
        const isExpired = await adminUserSession.isExpired(session);

        if (isExpired) {
            await adminUserSession.refresh(session);
        }

        const { token } = await adminUserSession.load(session);

        const formData = await req.formData();
        const uuid = formData.get("uuid");
        const position = formData.get("position") as string;
        const jobLink = formData.get("job_link") as string;
        const companyName = formData.get("company_name") as string;
        const companyWebsite = formData.get("company_website") as string;
        const location = formData.get("location") as string;
        const salaryRangeMin = formData.get("salary_range_min") as string;
        const salaryRangeMax = formData.get("salary_range_max") as string;
        const jobType = formData.get("job_type") as string;
        const workplace = formData.get("workplace") as string;
        const status = formData.get("status") as string;
        const tags = formData.get("tags") as string;
        const notes = formData.get("notes") as string;
        const documents = formData.get("documents") as string;

        parse(JobApplicationUpdateValidation, {
            uuid,
            position: position,
            job_link: jobLink,
            company_name: companyName,
            company_website: companyWebsite,
            location: location,
            salary_range_min: salaryRangeMin,
            salary_range_max: salaryRangeMax,
            job_type: jobType,
            workplace: workplace,
            status: status,
            tags: tags,
            notes: notes,
            documents: documents,
        });

        const query =
            "UPDATE  job_application SET position = :position, job_link = :job_link, company_name = :company_name, company_website = :company_website, location = :location, salary_range_min = :salary_range_min, salary_range_max = :salary_range_max, job_type = :job_type, workplace = :workplace, status = :status, tags = :tags, notes = :notes, documents = :documents WHERE uuid = :uuid;";
        const params = {
            ":uuid": uuid,
            ":position": position,
            ":job_link": jobLink,
            ":company_name": companyName,
            ":company_website": companyWebsite,
            ":location": location,
            ":salary_range_min": salaryRangeMin,
            ":salary_range_max": salaryRangeMax,
            ":job_type": jobType,
            ":workplace": workplace,
            ":status": status,
            ":tags": JSON.parse(tags),
            ":notes": JSON.parse(notes),
            ":documents": JSON.parse(documents),
        };

        const response = await fetcher(QUERY_API_QUERY, {
            method: Method.POST,
            body: JSON.stringify({ db_name: JOB_APPLICATION_DATABASE, query, params }),
            headers: {
                [AUTHORIZATION_REQUEST]: `Bearer ${token}`,
                [CONTENT_TYPE_REQUEST]: "application/json",
            },
        });

        const json = await response.json();

        return ok(JSON.stringify(json));
    } catch (e) {
        return handleRequestError(e as Error);
    }
}
