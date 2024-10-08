import { PAGE_ADMIN_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";

import { adminUserSession, getAdminUserSession } from "@/lib/server/admin-user-session";
import { getNameHashed } from "@/lib/server/get-bundle-files";
import { render } from "@/lib/server/render";
import { HotReload } from "@/pages/hot-reload/hot-reload";
import { SVG } from "@/pages/admin/components/svg";
import { Body, Head } from "@/pages/admin/layouts/template";
import { LoginView } from "./login.view";

export async function handleRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);

    try {
        const session = await getAdminUserSession(req);

        if (session) {
            adminUserSession.refresh(session);

            return Response.redirect(url.origin + PAGE_ADMIN_JOB_APPLICATION_PATH);
        }
    } catch {}

    const stylesNameHashed = await getNameHashed("dist/styles.css");
    const islandNameHashed = await getNameHashed("dist/admin/login/login.island.js");

    return new Response(
        render(
            <>
                <Head>
                    <title>Query Admin Login</title>
                    <link rel="stylesheet" href={stylesNameHashed} />
                </Head>
                <Body class="bg-slate-950 text-white bg-gradient-to-b from-slate-900 to-slate-950 overflow-y-scroll">
                    <LoginView />
                    <SVG />
                    <script src={islandNameHashed} type="module" />
                    <HotReload href={url.href} />
                </Body>
            </>,
        ),
        {
            headers: {
                "Content-Type": "text/html;charset=utf-8",
            },
        },
    );
}
