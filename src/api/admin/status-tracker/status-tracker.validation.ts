import { minLength, object, number, string, uuid } from "valibot";

export const StatusTrackerCreateValidation = object({
    job_application_id: number("Please enter a job_application_id."),
    status: string([minLength(1, "Please enter a status.")]),
});

export const StatusTrackerUpdateValidation = object({
    uuid: string([uuid()]),
    job_application_id: number("Please enter a job_application_id."),
    status: string([minLength(1, "Please enter a status.")]),
});

export const StatusTrackerDeleteValidation = object({
    uuid: string([uuid()]),
});
