import type { ComponentChildren } from "preact";

import { JOB_APPLICATION_DATABASE } from "@/config/shared/jat.constants";
import { getNameHashed } from "@/lib/server/get-bundle-files";
import { render } from "@/lib/server/render";
import { HotReload } from "@/pages/hot-reload/hot-reload";
import { SVG } from "@/pages/jat/components/svg";
import { Layout } from "@/pages/jat/layouts/layout";
import { Body, Head } from "@/pages/jat/layouts/template";
import { t } from "@/pages/jat/lib/i18n/t";

import type { JobApplications } from "@/pages/jat/types/job-application";

import { PAGE_JOB_APPLICATIONS_PAGE_PATH } from "@/config/shared/jat.constants";
import { filterQueryBuilder } from "./filter-query-builder";
import { Filters } from "./filters";

export async function handleRequest(req: Request) {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const stylesNameHashed = await getNameHashed("dist/styles.css");
    const filterNameHashed = (await getNameHashed("dist/island/filter.island.js")) as string;

    let query = "";
    let params = [] as string[] | Record<string, string>;

    if (searchParams.size) {
        const { query: filterQuery, params: filterParams } = filterQueryBuilder(searchParams);
        query = filterQuery;
        params = filterParams;
    } else {
        query = `
        SELECT
          company_name,
          company_website,
          job_link,
          job_type,
          location,
          position,
          salary_range_max,
          salary_range_min,
          status,
          uuid,
          workplace
        FROM
            job_application
        ORDER BY
            updated_at DESC;
    `.trim();
    }

    const db = new Database(JOB_APPLICATION_DATABASE);
    const result: JobApplications = await db.query(query, params);

    const tPageApplications = t.page.applications;
    const tDomain = t.global.domain;

    const tJobType = (job_type: string) => t.global.jobType[job_type as keyof typeof t.global.jobType];
    const tWorkplace = (workplace: string) => t.global.workplace[workplace as keyof typeof t.global.workplace];
    const tStatus = (status: string) => t.global.status[status as keyof typeof t.global.status];

    return new Response(
        render(
            <>
                <Head>
                    <title>{tPageApplications.title}</title>
                    <link rel="stylesheet" href={stylesNameHashed} />
                    <script type="module" src={filterNameHashed} />
                </Head>
                <Body>
                    <Layout>
                        <article>
                            <h1 class="sr-only">{tPageApplications.header}</h1>
                            <div class="h-full overflow-x-auto lg:p-0 lg:min-h-[calc(100vh-145px)] min-h-[calc(100vh-113px)]">
                                <Filters />
                                <div class="rounded-md border bg-white mt-4 mx-4 my-4 lg:mx-0">
                                    <div class="relative w-full overflow-auto">
                                        <table class="w-full caption-bottom text-sm">
                                            <thead>
                                                <tr class="border-b">
                                                    <th class="font-medium px-2 w-14">{"#"}</th>
                                                    <Th width="max-w-[50ch]">{tDomain.positionTitle}</Th>
                                                    <Th width="w-[20ch]">{tDomain.companyTitle}</Th>
                                                    <Th width="w-[20ch]">{tDomain.locationTitle}</Th>
                                                    <Th width="w-[15ch]">{tDomain.salaryRangeTitle}</Th>
                                                    <Th width="w-[10ch]">{tDomain.workplaceTitle}</Th>
                                                    <Th width="w-[10ch]">{tDomain.jobTypeTitle}</Th>
                                                    <Th width="w-[15ch]">{tDomain.statusTitle}</Th>
                                                </tr>
                                            </thead>
                                            <tbody class="[&amp;_tr:last-child]:border-0">
                                                {result.map((application, index) => (
                                                    <tr key={application.uuid} class="border-b" data-state="false">
                                                        <td class="p-2 align-middle text-center">{index + 1}</td>
                                                        <td class="p-2 align-middle">
                                                            <a href={`${PAGE_JOB_APPLICATIONS_PAGE_PATH}/${application.uuid}`}>
                                                                <span class="truncate block font-bold max-w-[50ch] underline">
                                                                    {application.position}
                                                                </span>
                                                            </a>
                                                        </td>
                                                        <td class="p-2 align-middle">
                                                            <div class="flex p-1 items-center">
                                                                {application.company_website && application.company_name ? (
                                                                    <a
                                                                        href={application.company_website}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        class="underline flex items-center"
                                                                    >
                                                                        <span class="w-4 h-4">
                                                                            <img
                                                                                src={`https://www.google.com/s2/favicons?domain=${application.company_website}&sz=16`}
                                                                                alt={application.company_name}
                                                                                height="16px"
                                                                                width="16px"
                                                                            />
                                                                        </span>
                                                                        <span class="pl-2">{application.company_name}</span>
                                                                    </a>
                                                                ) : (
                                                                    <>
                                                                        <span class="w-4 h-4">
                                                                            <img
                                                                                src={`https://www.google.com/s2/favicons?domain=${application.company_website}&sz=16`}
                                                                                alt={application.company_name}
                                                                                height="16px"
                                                                                width="16px"
                                                                            />
                                                                        </span>
                                                                        <span class="pl-2">{application.company_name || "-"}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td class="p-2 align-middle">
                                                            <div class="flex items-center">
                                                                <span class="truncate text-ellipsis">{application.location || "-"}</span>
                                                            </div>
                                                        </td>
                                                        <td class="p-2 align-middle">
                                                            <div class="flex items-center">
                                                                <span class="truncate text-ellipsis">
                                                                    {application.salary_range_min}{" "}
                                                                    {application.salary_range_max
                                                                        ? ` - ${application.salary_range_max}`
                                                                        : ""}
                                                                    {application.salary_range_min === null &&
                                                                    application.salary_range_max === null
                                                                        ? "-"
                                                                        : ""}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="p-2 align-middle">
                                                            <div class="flex items-center">
                                                                <span class="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                                                                    {application.workplace ? tWorkplace(application.workplace) : "-"}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="p-2 align-middle">
                                                            <div class="flex items-center">
                                                                <span class="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                                    {application.job_type ? tJobType(application.job_type) : "-"}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="p-2 align-middle">
                                                            <div class="flex items-center">
                                                                <span class="rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                                                                    {application.status ? tStatus(application.status) : "-"}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Layout>
                    <SVG />
                    {/* <HotReload href={url.href} /> */}
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

function Th({ children, width = "" }: { children: ComponentChildren; width?: string }) {
    return (
        <th class={`h-10 px-2 text-left align-middle font-medium ${width}`} colspan={1}>
            <div class="flex items-center px-2">
                <button
                    class="
                        inline-flex
                        items-center
                        justify-center
                        whitespace-nowrap
                        font-medium
                        focus-visible:outline-none
                        focus-visible:ring-1
                        disabled:pointer-events-none
                        disabled:opacity-50
                        hover:bg-slate-950
                        hover:text-white
                        rounded-md
                        px-2
                        text-xs
                        -ml-4
                        h-6
                        "
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded="false"
                >
                    {children}
                </button>
            </div>
        </th>
    );
}
