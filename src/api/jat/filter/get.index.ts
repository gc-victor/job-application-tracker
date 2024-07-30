import type { Data } from "@/types/data";

import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { ok } from "@/lib/server/responses";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { fetcher } from "@/lib/server/fetcher";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { queryTokenService } from "@/lib/server/query-token";
import type { JobApplicationResponse } from "../types";

export async function handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const search = searchParams.get("search");
    const workplace = searchParams.get("workplace");
    const job_type = searchParams.get("job_type");
    const status = searchParams.get("status");

    const queryBuilder = [];
    queryBuilder.push(
        `
        SELECT
            company_name,
            company_website,
            job_link,
            job_type,
            location,
            position,
            salary_range_max,
            salary_range_min,
            status,
            uuid,
            workplace
        FROM
            job_application
    `.trim(),
    );

    if (search || workplace || job_type || status) {
        queryBuilder.push("WHERE");

        const conditions = [];

        if (search) {
            conditions.push(`(
                company_name LIKE :search
                OR location LIKE :search
                OR position LIKE :search
            )`);
        }

        if (workplace) {
            const workplaces = workplace
                .split(",")
                .map((_, index) => `:workplace${index}`)
                .join(",");
            conditions.push(`workplace IN (${workplaces})`);
        }

        if (job_type) {
            const job_types = job_type
                .split(",")
                .map((_, index) => `:job_type${index}`)
                .join(",");
            conditions.push(`job_type IN (${job_types})`);
        }

        if (status) {
            const statuses = status
                .split(",")
                .map((_, index) => `:status${index}`)
                .join(",");
            conditions.push(`status IN (${statuses})`);
        }

        if (conditions.length > 0) {
            queryBuilder.push(conditions.join(" AND "));
        }
    }

    queryBuilder.push("ORDER BY updated_at DESC;");

    const query = queryBuilder.join(" ");

    const params = {} as Record<string, string | string[]>;

    if (search) {
        params[":search"] = `%${search}%`;
    }

    if (workplace) {
        const workplaces = workplace.split(",");
        for (let index = 0; index < workplaces.length; index++) {
            params[`:workplace${index}`] = workplaces[index];
        }
    }

    if (job_type) {
        const job_types = job_type.split(",");
        for (let index = 0; index < job_types.length; index++) {
            params[`:job_type${index}`] = job_types[index];
        }
    }

    if (status) {
        const statuses = status.split(",");
        for (let index = 0; index < statuses.length; index++) {
            params[`:status${index}`] = statuses[index];
        }
    }

    try {
        const queryToken = await queryTokenService.load("jat");

        const response = await fetcher(QUERY_API_QUERY, {
            method: Method.POST,
            body: JSON.stringify({ db_name: JOB_APPLICATION_DATABASE, query, params }),
            headers: {
                [AUTHORIZATION_REQUEST]: `Bearer ${queryToken.token}`,
                [CONTENT_TYPE_REQUEST]: "application/json",
            },
        });

        const json: Data<JobApplicationResponse> = await response.json();

        json.data = json.data.map((jobApplication: JobApplicationResponse) => {
            if (jobApplication.tags) {
                jobApplication.tags = JSON.parse(jobApplication.tags);
            }

            if (jobApplication.notes) {
                jobApplication.notes = JSON.parse(jobApplication.notes);
            }

            if (jobApplication.documents) {
                jobApplication.documents = JSON.parse(jobApplication.documents);
            }

            return jobApplication;
        });

        return ok(JSON.stringify(json));
    } catch (e) {
        return handleRequestError(e as Error);
    }
}
