import { API_PATH } from "./shared.constants";

// Database
export const JOB_APPLICATION_DATABASE = "job_application_tracker.sql";
// Admin Pages
export const PAGE_ADMIN_JOB_APPLICATION_PATH = "/admin/jat";
// Public Pages
export const PAGE_JOB_APPLICATION_PATH = "/jat";
export const PAGE_JOB_APPLICATION_ADD_PATH = "/jat/add";
// API
export const API_ADMIN_JOB_APPLICATION_PATH = `${API_PATH}/admin/jat`;

// IDS
export const COMPANY_NAME_ID = "company_name";
export const COMPANY_WEBSITE_ID = "company_website";
export const DOCUMENTS_ID = "documents";
export const JOB_TYPE_CONTRACT_ID = "contract";
export const JOB_TYPE_FREELANCE_ID = "freelance";
export const JOB_TYPE_FULL_TIME_ID = "full_time";
export const JOB_TYPE_ID = "job_type";
export const JOB_TYPE_INTERNSHIP_ID = "internship";
export const JOB_TYPE_PART_TIME_ID = "part_time";
export const LOCATION_ID = "location";
export const NOTE_COMMENT_ID = "note_comment";
export const NOTE_TITLE_ID = "note_title";
export const NOTES_ID = "notes";
export const JOB_LINK_ID = "job_link";
export const POSITION_ID = "position";
export const SALARY_RANGE_MAX_ID = "salary_range_max";
export const SALARY_RANGE_MIN_ID = "salary_range_min";
export const STATUS_APPLIED_ID = "applied";
export const STATUS_ID = "status";
export const STATUS_INTERVIEW_ID = "interview";
export const STATUS_OFFER_RECEIVED_ID = "offer_received";
export const STATUS_NOT_APPLIED_ID = "not_applied";
export const STATUS_REJECTED_ID = "rejected";
export const TAGS_ID = "tags";
export const WORKPLACE_HYBRID_ID = "hybrid";
export const WORKPLACE_ID = "workplace";
export const WORKPLACE_OFFICE_ID = "office";
export const WORKPLACE_REMOTE_ID = "remote";

// Values
export const JOB_TYPE_CONTRACT_VALUE = "contract";
export const JOB_TYPE_FREELANCE_VALUE = "freelance";
export const JOB_TYPE_FULL_TIME_VALUE = "full_time";
export const JOB_TYPE_INTERNSHIP_VALUE = "internship";
export const JOB_TYPE_PART_TIME_VALUE = "part_time";
export const STATUS_APPLIED_VALUE = "applied";
export const STATUS_ARCHIVED_VALUE = "archived";
export const STATUS_INTERVIEW_VALUE = "interview";
export const STATUS_NOT_APPLIED_VALUE = "not_applied";
export const STATUS_OFFER_RECEIVED_VALUE = "offer_received";
export const STATUS_REJECTED_VALUE = "rejected";
export const WORKPLACE_HYBRID_VALUE = "hybrid";
export const WORKPLACE_OFFICE_VALUE = "office";
export const WORKPLACE_REMOTE_VALUE = "remote";

export const JOB_TYPES = [
    JOB_TYPE_FULL_TIME_VALUE,
    JOB_TYPE_PART_TIME_VALUE,
    JOB_TYPE_INTERNSHIP_VALUE,
    JOB_TYPE_CONTRACT_VALUE,
    JOB_TYPE_FREELANCE_VALUE,
] as const;
export const WORKPLACES = [WORKPLACE_OFFICE_VALUE, WORKPLACE_REMOTE_VALUE, WORKPLACE_HYBRID_VALUE] as const;
export const STATUSES = [
    STATUS_NOT_APPLIED_VALUE,
    STATUS_APPLIED_VALUE,
    STATUS_INTERVIEW_VALUE,
    STATUS_OFFER_RECEIVED_VALUE,
    STATUS_REJECTED_VALUE,
    STATUS_ARCHIVED_VALUE,
] as const;
