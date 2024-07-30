import { parse } from "valibot";

import type { JobType, Status, Workplace } from "@/pages/jat/types/job-application";
import type { Data } from "@/types/data";

import { QUERY_API_QUERY } from "@/config/server/server.constants";
import { JOB_APPLICATION_DATABASE, PAGE_JOB_APPLICATION_PATH } from "@/config/shared/jat.constants";
import { fetcher } from "@/lib/server/fetcher";
import { handleRequestError } from "@/lib/server/handle-request-error";
import { AUTHORIZATION_REQUEST, CONTENT_TYPE_REQUEST } from "@/lib/server/header";
import { Method } from "@/lib/server/method";
import { queryTokenService } from "@/lib/server/query-token";
import { SEE_OTHER_CODE } from "@/lib/server/status";

import { JobApplicationUpdateValidation } from "./job-application.validation";

interface FileData {
    content: number[];
    name: string;
    type: string;
}

export async function handleRequest(req: Request): Promise<Response> {
    try {
        const queryToken = await queryTokenService.load("jat");

        const formData = await req.formData();

        const uuid = formData.get("uuid") as string;
        const position = formData.get("position") as string;
        const jobLink = formData.get("job_link") as string;
        const companyName = formData.get("company_name") as string;
        const companyWebsite = formData.get("company_website") as string;
        const location = formData.get("location") as string;
        const salaryRangeMin = formData.get("salary_range_min") as string;
        const salaryRangeMax = formData.get("salary_range_max") as string;
        const jobType = formData.get("job_type") as JobType;
        const workplace = formData.get("workplace") as Workplace;
        const status = formData.get("status") as Status;

        // NOTE: same as post.index.ts
        const tagsString = formData.get("tags") as string;
        const tags = tagsString
            ?.split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        // NOTE: same as post.index.ts
        let notes_titles = formData.getAll("note_title") as string[];
        notes_titles = typeof notes_titles === "string" && notes_titles !== "" ? [notes_titles] : notes_titles;
        let notes_comments = formData.getAll("note_comment") as string[];
        notes_comments = typeof notes_comments === "string" ? [notes_comments] : notes_comments;

        const maxLength = Math.max(notes_titles.length, notes_comments.length);
        const notes = Array.from({ length: maxLength }, (_, index) => {
            const title = notes_titles[index];
            const comment = notes_comments[index];

            if (title || comment) {
                return {
                    title: title ? String(title) : "",
                    comment: comment ? String(comment) : "",
                };
            }
        }).filter(Boolean);

        // NOTE: same as post.index.ts
        const documents = [] as FileData[];
        const formDocuments = formData.getAll("documents") as File[];

        if (formDocuments?.length) {
            for (const file of formDocuments) {
                if (file instanceof File) {
                    const fileArrayBuffer = await file.arrayBuffer();
                    const fileUint8Array = new Uint8Array(fileArrayBuffer);
                    const content = Array.from(fileUint8Array);

                    documents.push({ content, name: file.name, type: file.type });
                }
            }
        } else {
            const file = formData.get("documents") as File;

            if (file instanceof File) {
                const fileArrayBuffer = await file.arrayBuffer();
                const fileUint8Array = new Uint8Array(fileArrayBuffer);
                const content = Array.from(fileUint8Array);

                documents.push({ content, name: file.name, type: file.type });
            }
        }

        parse(JobApplicationUpdateValidation, {
            uuid: uuid,
            position: position,
            job_link: jobLink || null,
            company_name: companyName || null,
            company_website: companyWebsite || null,
            location: location || null,
            salary_range_min: salaryRangeMin || null,
            salary_range_max: salaryRangeMax || null,
            job_type: jobType || null,
            workplace: workplace || null,
            status: status || null,
            tags: tags?.length > 0 ? tags : null,
            notes: notes?.length > 0 ? notes : null,
            documents: documents?.length > 0 ? documents : null,
        });

        const documentsQuery = `
            SELECT
                documents
            FROM
                job_application
            WHERE
                uuid = :uuid
        `.trim();
        const currentDocuments = await fetcher(QUERY_API_QUERY, {
            method: Method.POST,
            body: JSON.stringify({ db_name: JOB_APPLICATION_DATABASE, query: documentsQuery, params: { ":uuid": uuid } }),
            headers: {
                [AUTHORIZATION_REQUEST]: `Bearer ${queryToken.token}`,
                [CONTENT_TYPE_REQUEST]: "application/json",
            },
        });
        const currentDocumentsJson: Data<{ documents: string }> = await currentDocuments.json();
        const currentDocumentsArray = JSON.parse(currentDocumentsJson.data[0]?.documents || "[]");
        const uniqueDocuments = Array.from(new Map([...currentDocumentsArray, ...documents].map((item) => [item.name, item])).values());

        const query = `
            UPDATE
                job_application
            SET
                position = :position,
                job_link = :job_link,
                company_name = :company_name,
                company_website = :company_website,
                location = :location,
                salary_range_min = :salary_range_min,
                salary_range_max = :salary_range_max,
                job_type = :job_type,
                workplace = :workplace,
                status = :status,
                tags = :tags,
                notes = :notes,
                documents = :documents
            WHERE uuid = :uuid;
        `;
        const params = {
            ":uuid": uuid,
            ":position": position,
            ":job_link": jobLink || null,
            ":company_name": companyName || null,
            ":company_website": companyWebsite || null,
            ":location": location || null,
            ":salary_range_min": salaryRangeMin || null,
            ":salary_range_max": salaryRangeMax || null,
            ":job_type": jobType || null,
            ":workplace": workplace || null,
            ":status": status || null,
            ":tags": JSON.stringify(tags || []),
            ":notes": JSON.stringify(notes),
            ":documents": JSON.stringify(uniqueDocuments),
        };

        const response = await fetcher(QUERY_API_QUERY, {
            method: Method.POST,
            body: JSON.stringify({ db_name: JOB_APPLICATION_DATABASE, query, params }),
            headers: {
                [AUTHORIZATION_REQUEST]: `Bearer ${queryToken.token}`,
                [CONTENT_TYPE_REQUEST]: "application/json",
            },
        });

        const url = new URL(req.url);

        return Response.redirect(`${url.origin + PAGE_JOB_APPLICATION_PATH}/${uuid}`, SEE_OTHER_CODE);
    } catch (e) {
        return handleRequestError(e as Error);
    }
}
