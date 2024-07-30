import { getNameHashed } from "@/lib/server/get-bundle-files";
import { render } from "@/lib/server/render";
import { HotReload } from "@/pages/hot-reload/hot-reload";
import { t } from "@/pages/jat/lib/i18n/t";
import { Layout } from "@/pages/jat/layouts/layout";
import { Body, Head } from "@/pages/jat/layouts/template";
import { SVG } from "@/pages/jat/components/svg";
import { JobApplicationForm } from "@/pages/jat/job-application-form";

const pageTitle = t.page.add.pageTitle;

export async function handleRequest(req: Request) {
    const url = new URL(req.url);

    const stylesNameHashed = await getNameHashed("dist/styles.css");
    const formNameHashed = (await getNameHashed("dist/jat/add/island/page.island.js")) as string;

    return new Response(
        render(
            <>
                <Head>
                    <title>{pageTitle}</title>
                    <link rel="stylesheet" href={stylesNameHashed} />
                </Head>
                <Body>
                    <Layout>
                        <JobApplicationForm title={pageTitle} method="post" values={{}} />
                    </Layout>
                    <SVG />
                    {/* <HotReload href={url.href} /> */}
                    <script type="module" src={formNameHashed} />
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
