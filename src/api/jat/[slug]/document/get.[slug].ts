import type { Data } from "@/types/data";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { fetcher } from "@/lib/server/fetcher";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { queryTokenService } from "@/lib/server/query-token";

interface Document {
    content: string;
    name: string;
    type: string;
}

export async function handleRequest(req: Request): Promise<Response> {
    try {
        const url = new URL(req.url);
        const parts = url.pathname.split("/");
        const uuid = parts[parts.length - 3];
        const name = decodeURIComponent(parts.pop() as string);

        const queryToken = await queryTokenService.load("jat");

        const query = `
            SELECT
                json_extract(doc.value, '$.name') as name,
                json_extract(doc.value, '$.type') as type,
                json_extract(doc.value, '$.content') as content
            FROM
                job_application,
                json_each(json(documents)) AS doc
            WHERE
                uuid = $1
            AND
                json_extract(doc.value, '$.name') = $2;
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

        const json: Data<Document> = await response.json();

        const document = json.data[0];
        const documentBuffer = Buffer.from(JSON.parse(document.content));

        return new Response(documentBuffer, {
            headers: {
                "Content-Type": document.type,
                "Content-Disposition": `attachment; filename="${document.name}"`,
            },
        });
    } catch (e) {
        return handleRequestError(e as Error);
    }
}
