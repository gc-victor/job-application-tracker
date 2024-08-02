import type { Data } from "@/types/data";
import type { Success } from "@/types/success";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { fetcher } from "@/lib/server/fetcher";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { queryTokenService } from "@/lib/server/query-token";
import { ok } from "@/lib/server/responses";

export async function handleRequest(req: Request): Promise<Response> {
    try {
        const body = await req.json();
        const uuid = body.uuid;
        const name = body.name;

        const queryToken = await queryTokenService.load("jat");

        const query = `
            UPDATE
                job_application
            SET
                documents = json_remove(documents, (
                    SELECT
                        doc.fullkey
                    FROM
                        job_application,
                        json_each(json(documents)) AS doc
                    WHERE
                        uuid = $1
                    AND
                        json_extract(doc.value, '$.name') = $2
                ))
            WHERE
                uuid = $1;
        `.trim();
        const params = [uuid, name];
        const response = await fetcher(QUERY_API_QUERY, {
            method: Method.POST,
            body: JSON.stringify({ db_name: JOB_APPLICATION_DATABASE, query, params }),
            headers: {
                [AUTHORIZATION_REQUEST]: `Bearer ${queryToken.token}`,
                [CONTENT_TYPE_REQUEST]: "application/json",
            },
        });

        const json: Data<Success> = await response.json();

        return ok(JSON.stringify(json));
    } catch (e) {
        return handleRequestError(e as Error);
    }
}
