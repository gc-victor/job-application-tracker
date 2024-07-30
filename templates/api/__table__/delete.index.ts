import { parse } from "valibot";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { {{ tableConstantCase }}_DATABASE } from "@/config/shared/{{ tableLowerCase }}.constants";
import { fetcher } from "@/lib/server/fetcher";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { ok } from "@/lib/server/responses";
import { queryTokenService } from "@/lib/server/query-token";
import { {{ tablePascalCase }}DeleteValidation } from "./{{ tableLowerCase }}.validation";

export async function handleRequest(req: Request): Promise<Response> {
    try {
        const queryToken = await queryTokenService.load("{{ table }}");

        const { uuid } = await req.json();

        parse({{ tablePascalCase }}DeleteValidation, { uuid });

        const query = "DELETE FROM  {{ tableSnakeCase }} WHERE uuid = :uuid;";
        const params = {
            ":uuid": uuid,
        };

        const response = await fetcher(QUERY_API_QUERY, {
            method: Method.POST,
            body: JSON.stringify({ db_name: {{ tableConstantCase }}_DATABASE, query, params }),
            headers: {
                [AUTHORIZATION_REQUEST]: `Bearer ${queryToken.token}`,
                [CONTENT_TYPE_REQUEST]: "application/json",
            },
        });

        const json = await response.json();

        return ok(JSON.stringify(json));
    } catch (e) {
        return handleRequestError(e as Error);
    }
}
