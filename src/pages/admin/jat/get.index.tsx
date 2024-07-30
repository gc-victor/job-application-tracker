import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { PAGE_ADMIN_LOGIN_PATH } from "@/config/shared/shared.constants";
import { adminUserSession, getAdminUserSession } from "@/lib/server/admin-user-session";
import { getNameHashed } from "@/lib/server/get-bundle-files";
import { render } from "@/lib/server/render";
import { HotReload } from "@/pages/hot-reload/hot-reload";
import { Body, Head } from "@/pages/admin/layouts/template";
import { SVG } from "@/pages/components/svg";
import { JobApplicationView, type JobApplicationViewProps } from "./jat.view";

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

    const db = new Database(JOB_APPLICATION_DATABASE);
    const result = await db.query("SELECT * FROM  job_application ORDER BY created_at DESC");

    const stylesNameHashed = await getNameHashed("dist/styles.css");
    const islandNameHashed = await getNameHashed("dist/admin/jat/island/job-application.island.js");

    return new Response(
        render(
            <>
                <Head>
                    <title>Query Admin Job Application</title>
                    <link rel="stylesheet" href={stylesNameHashed} />
                </Head>
                <Body class="overflow-y-scroll">
                    <JobApplicationView data={result as unknown as JobApplicationViewProps[]} />
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
