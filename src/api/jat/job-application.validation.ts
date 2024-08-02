import { array, minLength, nullable, number, object, picklist, startsWith, string, url, uuid, pipe } from "valibot";

import { JOB_TYPES, STATUSES, WORKPLACES } from "@/config/shared/jat.constants";

export const JobApplicationCreateValidation = object({
    position: pipe(string(), minLength(1, "Please enter a position.")),
    job_link: nullable(pipe(string(), url(), startsWith("https://", "The URL must be using HTTPS"))),
    company_name: nullable(pipe(string(), minLength(1, "Please enter a company_name."))),
    company_website: nullable(pipe(string(), url(), startsWith("https://", "The URL must be using HTTPS"))),
    location: nullable(pipe(string(), minLength(1, "Please enter a location."))),
    salary_range_min: nullable(pipe(string(), minLength(1, "Please enter a salary_range_min."))),
    salary_range_max: nullable(pipe(string(), minLength(1, "Please enter a salary_range_max."))),
    job_type: nullable(picklist(JOB_TYPES, "Please enter a valid job_type.")),
    workplace: nullable(picklist(WORKPLACES, "Please enter a valid workplace.")),
    status: nullable(picklist(STATUSES, "Please enter a valid status.")),
    tags: nullable(array(string())),
    notes: nullable(
        array(
            object({
                title: string(),
                comment: string(),
            }),
        ),
    ),
    documents: nullable(
        array(
            object({
                content: array(number()),
                name: string(),
                type: string(),
            }),
        ),
    ),
});

export const JobApplicationUpdateValidation = object({
    uuid: pipe(string(), uuid()),
    position: pipe(string(), minLength(1, "Please enter a position.")),
    job_link: nullable(pipe(string(), url(), startsWith("https://", "The URL must be using HTTPS"))),
    company_name: nullable(pipe(string(), minLength(1, "Please enter a company_name."))),
    company_website: nullable(pipe(string(), url(), startsWith("https://", "The URL must be using HTTPS"))),
    location: nullable(pipe(string(), minLength(1, "Please enter a location."))),
    salary_range_min: nullable(pipe(string(), minLength(1, "Please enter a salary_range_min."))),
    salary_range_max: nullable(pipe(string(), minLength(1, "Please enter a salary_range_max."))),
    job_type: nullable(picklist(JOB_TYPES, "Please enter a valid job_type.")),
    workplace: nullable(picklist(WORKPLACES, "Please enter a valid workplace.")),
    status: nullable(picklist(STATUSES, "Please enter a valid status.")),
    tags: nullable(array(string())),
    notes: nullable(
        array(
            object({
                title: string(),
                comment: string(),
            }),
        ),
    ),
    documents: nullable(
        array(
            object({
                content: array(number()),
                name: string(),
                type: string(),
            }),
        ),
    ),
});

export const JobApplicationDeleteValidation = object({
    uuid: pipe(string(), uuid()),
});

export const JobApplicationGetByUuidValidation = object({
    uuid: pipe(string(), uuid()),
});
