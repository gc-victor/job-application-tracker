import { parse } from "valibot";

import type { Data } from "@/types/data";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { fetcher } from "@/lib/server/fetcher";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { ok } from "@/lib/server/responses";
import { queryTokenService } from "@/lib/server/query-token";

import { JobApplicationGetByUuidValidation } from "../job-application.validation";
import type { JobApplicationResponse } from "../types";

export async function handleRequest(req: Request): Promise<Response> {
    try {
        const queryToken = await queryTokenService.load("jat");

        const uuid = req.url.split("/").pop();

        parse(JobApplicationGetByUuidValidation, { uuid });

        const query = `
            SELECT
                ja.*,
                st.status AS status,
                st.created_at AS status_started_at
            FROM
                job_application ja
            LEFT JOIN
                (
                    SELECT
                        job_application_id,
                        status,
                        MAX(created_at) as created_at
                    FROM
                        status_tracker
                    GROUP BY
                        job_application_id
                ) st
            ON
                ja.id = st.job_application_id
            WHERE
                uuid = :uuid;
        `.trim();
        const params = {
            ":uuid": uuid,
        };

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
