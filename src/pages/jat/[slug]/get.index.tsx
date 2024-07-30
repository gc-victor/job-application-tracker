import type { ComponentChildren } from "preact";

import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { getNameHashed } from "@/lib/server/get-bundle-files";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { render } from "@/lib/server/render";
import { NOT_FOUND_CODE, NOT_FOUND_MESSAGE } from "@/lib/server/status";

import type { JobApplications } from "@/pages/jat/types/job-application";

import { HotReload } from "@/pages/hot-reload/hot-reload";
import { Button } from "@/pages/jat/components/button";
import { Documents } from "@/pages/jat/components/documents";
import { Layout } from "@/pages/jat/layouts/layout";
import { Body, Head } from "@/pages/jat/layouts/template";
import { t } from "@/pages/jat/lib/i18n/t";
import { APPLICATIONS_EDIT_PAGE } from "../constants";

export async function handleRequest(req: Request) {
    try {
        const tDomain = t.global.domain;

        const url = new URL(req.url);

        const stylesNameHashed = await getNameHashed("dist/styles.css");
        const deleteNameHashed = (await getNameHashed("dist/jat/[slug]/island/delete.island.js")) as string;

        const uuid = url.pathname.split("/").pop() as string;
        const db = new Database(JOB_APPLICATION_DATABASE);
        const query = `
            SELECT
                ja.*,
                st.status AS status,
                st.updated_at AS status_started_at
            FROM
                job_application ja
            LEFT JOIN
                (
                    SELECT
                        job_application_id,
                        status,
                        MAX(updated_at) as updated_at
                    FROM
                        status_tracker
                    GROUP BY
                        job_application_id
                ) st
            ON
                ja.id = st.job_application_id
            WHERE ja.uuid = ?
            ORDER BY
                ja.created_at DESC;
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
        const jobType = t.global.jobType[result[0].job_type as keyof typeof t.global.jobType];
        const workplace = t.global.workplace[result[0].workplace as keyof typeof t.global.workplace];
        const status = t.global.status[result[0].status as keyof typeof t.global.status];
        const statusStartedAt = convertTimestampToDateString(Number.parseInt(result[0].status_started_at, 10) * 1000);
        const tags = JSON.parse(result[0].tags);
        const notes = JSON.parse(result[0].notes);
        const documents = JSON.parse(result[0].documents);

        return new Response(
            render(
                <>
                    <Head>
                        <title>{position}</title>
                        <link rel="stylesheet" href={stylesNameHashed} />
                        <script type="module" src={deleteNameHashed} />
                    </Head>
                    <Body>
                        <Layout>
                            <div class="overflow-hidden bg-white shadow pb-4 sm:rounded-lg">
                                <div class="p-4 relative space-y-1">
                                    <div class="md:absolute top-4 right-4 mb-4 flex items-center">
                                        <ul class="flex-shrink-0 flex space-x-2 items-center">
                                            <li>
                                                <Button tag="a" href={`${APPLICATIONS_EDIT_PAGE}/${uuid}`}>
                                                    {t.global.buttons.edit}
                                                </Button>
                                            </li>
                                        </ul>
                                    </div>
                                    <h1 class="flex font-cal lg:text-2xl text-lg">{position}</h1>
                                </div>
                                <div class="border-t border-slate-100">
                                    <dl class="divide-y divide-slate-100">
                                        <Row title={tDomain.statusTitle}>
                                            <div class="flex items-center">
                                                <span class="rounded-md whitespace-nowrap px-2 py-1 text-sm font-medium ring-1 ring-inset text-yellow-700 bg-yellow-50 ring-yellow-600/20">
                                                    {status}
                                                </span>
                                                <time class="pl-2 block">{statusStartedAt}</time>
                                            </div>
                                        </Row>
                                        <Row title={tDomain.companyTitle} has={!!companyName}>
                                            {companyWebsite ? (
                                                <a
                                                    href={companyWebsite}
                                                    class="flex flex-grow items-center"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <span class="w-6 h-6">
                                                        <img
                                                            src={`https://www.google.com/s2/favicons?domain=${companyWebsite}/&sz=24`}
                                                            alt="Company"
                                                            height="24px"
                                                            width="24px"
                                                        />
                                                    </span>
                                                    <span class="pl-2 underline">{companyName}</span>
                                                </a>
                                            ) : (
                                                <div class="flex flex-grow items-center">
                                                    <span class="w-6 h-6">
                                                        <img
                                                            src={`https://www.google.com/s2/favicons?domain=${companyWebsite}&sz=24`}
                                                            alt={companyName}
                                                            height="24px"
                                                            width="24px"
                                                        />
                                                    </span>
                                                    <span class="pl-2">{companyName}</span>
                                                </div>
                                            )}
                                        </Row>
                                        <Row title={tDomain.offerURLTitle} has={!!jobLink}>
                                            <p class="text-sm text-slate-500 underline">
                                                <a href={jobLink} target="_blank" rel="noopener noreferrer">
                                                    {jobLink}
                                                </a>
                                            </p>
                                        </Row>
                                        <Row title={tDomain.locationTitle} has={!!location}>
                                            {location}
                                        </Row>
                                        <Row title={tDomain.salaryRangeTitle} has={!!salaryRangeMax || !!salaryRangeMin}>
                                            <span class="flex-grow">
                                                {salaryRangeMin} {salaryRangeMax ? ` - ${salaryRangeMax}` : ""}
                                            </span>
                                        </Row>
                                        <Row title={tDomain.workplaceTitle} has={!!workplace}>
                                            <span class="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                {workplace}
                                            </span>
                                        </Row>
                                        <Row title={tDomain.jobTypeTitle} has={!!jobType}>
                                            <span class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                {jobType}
                                            </span>
                                        </Row>
                                        <Row title={tDomain.tagsTitle} has={!!tags && !!tags.length}>
                                            <p class="space-x-2">
                                                {tags?.map((tag: string) => (
                                                    <span
                                                        key={tag}
                                                        class="rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </p>
                                        </Row>
                                        {documents?.length ? (
                                            // TODO: use a const
                                            <div class="js-documents">
                                                <Row title={tDomain.documentsTitle} has={!!documents && !!documents.length}>
                                                    <Documents documents={documents} uuid={uuid} />
                                                </Row>
                                            </div>
                                        ) : null}
                                        <Row title={tDomain.notesTitle} has={!!notes && !!notes.length}>
                                            <div class="flex-grow">
                                                <h3 class="font-cal">{notes[0]?.title}</h3>
                                                <p class="whitespace-pre-line">{notes[0]?.comment}</p>
                                            </div>
                                        </Row>
                                        {notes?.slice(1).map(({ title = "", comment = "" }) => (
                                            <Row key={title}>
                                                <div class="flex-grow">
                                                    <h3 class="font-cal">{title}</h3>
                                                    <p class="whitespace-pre-line">{comment}</p>
                                                </div>
                                            </Row>
                                        ))}
                                    </dl>
                                </div>
                            </div>
                        </Layout>
                        <HotReload href={url.href} />
                    </Body>
                </>,
            ),
            {
                headers: {
                    "content-type": "text/html",
                },
            },
        );
    } catch (e) {
        return handleRequestError(e as Error);
    }
}

function Row({ children, title, has = true }: { children: ComponentChildren; has?: boolean; title?: ComponentChildren }) {
    const colStart = title ? "" : "sm:col-start-2";

    return has ? (
        <div class="p-4 sm:grid sm:grid-cols-8 sm:gap-4">
            {title && <dt class="flex item-center text-sm font-cal text-slate-950">{title}</dt>}
            <dd class={`flex mt-1 text-sm leading-6 text-slate-700 sm:col-span-4 sm:mt-0 ${colStart}`}>{children}</dd>
        </div>
    ) : null;
}

function convertTimestampToDateString(timestamp: number) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
