import { getNameHashed } from "@/lib/server/get-bundle-files";
import { render } from "@/lib/server/render";
import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { NOT_FOUND_CODE, NOT_FOUND_MESSAGE } from "@/lib/server/status";

import type { JobApplications } from "@/pages/jat/types/job-application";

import { HotReload } from "@/pages/hot-reload/hot-reload";
import { t } from "@/pages/jat/lib/i18n/t";
import { Layout } from "@/pages/jat/layouts/layout";
import { Body, Head } from "@/pages/jat/layouts/template";
import { SVG } from "@/pages/jat/components/svg";
import { JobApplicationForm } from "@/pages/jat/job-application-form";

const pageTitle = t.page.edit.pageTitle;

export async function handleRequest(req: Request) {
    try {
        const url = new URL(req.url);

        const stylesNameHashed = await getNameHashed("dist/styles.css");
        const formNameHashed = await getNameHashed("dist/edit/island/page.island.js");

        const uuid = url.pathname.split("/").pop() as string;
        const db = new Database(JOB_APPLICATION_DATABASE);
        const query = `
            SELECT
                *
            FROM
                job_application
            WHERE uuid = ?;
        `.trim();
        const result: JobApplications = await db.query(query, [uuid]);

        if (!result.length) {
            return new Response(NOT_FOUND_MESSAGE, { status: NOT_FOUND_CODE });
        }

        const position = result[0].position;
        const jobLink = result[0].job_link;
        const companyName = result[0].company_name;
        const companyWebsite = result[0].company_website;
        const location = result[0].location;
        const salaryRangeMin = result[0].salary_range_min;
        const salaryRangeMax = result[0].salary_range_max;
        const jobType = result[0].job_type;
        const workplace = result[0].workplace;
        const status = result[0].status;
        const tags = JSON.parse(result[0].tags);
        const notes = JSON.parse(result[0].notes);
        const documents = JSON.parse(result[0].documents);

        return new Response(
            render(
                <>
                    <Head>
                        <title>{position}</title>
                        <link rel="stylesheet" href={stylesNameHashed} />
                    </Head>
                    <Body>
                        <Layout>
                            <JobApplicationForm
                                title={pageTitle}
                                method="post"
                                values={{
                                    position,
                                    jobLink,
                                    companyName,
                                    companyWebsite,
                                    location,
                                    salaryRangeMin,
                                    salaryRangeMax,
                                    jobType,
                                    workplace,
                                    status,
                                    tags,
                                    notes,
                                    documents,
                                    uuid,
                                }}
                            />
                        </Layout>
                        <SVG />
                        <HotReload href={url.href} />
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
    } catch (e) {
        return handleRequestError(e as Error);
    }
}
