import type { JOB_TYPES, STATUSES, WORKPLACES } from "@/config/shared/jat.constants";

export type JobType = (typeof JOB_TYPES)[number];
export type Workplace = (typeof WORKPLACES)[number];
export type Status = (typeof STATUSES)[number];
interface JobApplication {
    position: string;
    job_link: string;
    company_name: string;
    company_website: string;
    location: string;
    salary_range_min: string;
    salary_range_max: string;
    job_type: string;
    workplace: string;
    status: string;
    status_started_at: string;
    tags: string;
    notes: string;
    documents: string;
    uuid?: string;
}
export type JobApplications = JobApplication[];
