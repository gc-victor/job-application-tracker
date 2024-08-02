import { STATUS_TRACKER_DATABASE } from "@/config/shared/status-tracker.constants";
import { PAGE_ADMIN_LOGIN_PATH } from "@/config/shared/shared.constants";
import { adminUserSession, getAdminUserSession } from "@/lib/server/admin-user-session";
import { getNameHashed } from "@/lib/server/get-bundle-files";
import { render } from "@/lib/server/render";
import { HotReload } from "@/pages/hot-reload/hot-reload";
import { Body, Head } from "@/pages/admin/layouts/template";
import { SVG } from "@/pages/admin/components/svg";
import { StatusTrackerView, type StatusTrackerViewProps } from "./status-tracker.view";

export async function handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);

    try {
        const session = await getAdminUserSession(req);

        if (!session) {
            return Response.redirect(url.origin + PAGE_ADMIN_LOGIN_PATH);
        }

        const isExpired = await adminUserSession.isExpired(session);

        if (isExpired) {
            await adminUserSession.refresh(session);
        }
    } catch {
        return Response.redirect(url.origin + PAGE_ADMIN_LOGIN_PATH);
    }

    const db = new Database(STATUS_TRACKER_DATABASE);
    const result = await db.query("SELECT * FROM  status_tracker ORDER BY created_at DESC");

    const stylesNameHashed = await getNameHashed("dist/styles.css");
    const islandNameHashed = await getNameHashed("dist/admin/status-tracker/island/status-tracker.island.js");

    return new Response(
        render(
            <>
                <Head>
                    <title>Query Admin Status Tracker</title>
                    <link rel="stylesheet" href={stylesNameHashed} />
                </Head>
                <Body class="overflow-y-scroll">
                    <StatusTrackerView data={result as unknown as StatusTrackerViewProps[]} />
                    <SVG />
                    <script src={islandNameHashed} type="module" />
                    <HotReload href={url.href} />
                </Body>
            </>,
        ),
        {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
            },
        },
    );
}
