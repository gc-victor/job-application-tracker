import type { JobType, Workplace, Status } from "@/pages/jat/types/job-application";

export interface JobApplicationResponse {
    id: number;
    uuid: string;
    position: string;
    jobLink?: string;
    companyName?: string;
    companyWebsite?: string;
    location?: string;
    salaryRangeMax?: string;
    salaryRangeMin?: string;
    jobType?: JobType;
    workplace?: Workplace;
    status?: Status;
    tags?: string;
    notes?: string;
    documents?: string;
    createdAt: number;
    updatedAt: number;
}
