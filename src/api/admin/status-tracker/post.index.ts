import { parse } from "valibot";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { STATUS_TRACKER_DATABASE } from "@/config/shared/status-tracker.constants";
import { adminUserSession, getAdminUserSession } from "@/lib/server/admin-user-session";
import { fetcher } from "@/lib/server/fetcher";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { ok } from "@/lib/server/responses";
import { StatusTrackerCreateValidation } from "./status-tracker.validation";

export async function handleRequest(req: Request): Promise<Response> {
    try {
        const session = await getAdminUserSession(req);
        const isExpired = await adminUserSession.isExpired(session);

        if (isExpired) {
            await adminUserSession.refresh(session);
        }

        const { token } = await adminUserSession.load(session);

        const formData = await req.formData();
        const jobApplicationId = Number(formData.get("job_application_id"));
        const status = formData.get("status") as string;

        parse(StatusTrackerCreateValidation, { job_application_id: jobApplicationId, status: status });

        const query = "INSERT INTO status_tracker (job_application_id, status) VALUES (:job_application_id, :status);";
        const params = {
            ":job_application_id": jobApplicationId,
            ":status": status,
        };

        const response = await fetcher(QUERY_API_QUERY, {
            method: Method.POST,
            body: JSON.stringify({ db_name: STATUS_TRACKER_DATABASE, query, params }),
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
