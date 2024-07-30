-- Table to store the company information
CREATE TABLE company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    website TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
);

-- Table to track the status changes of job applications
CREATE TABLE status_tracker (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_application_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    FOREIGN KEY (job_application_id) REFERENCES job_application (id)
);

-- Table to store information about job applications
CREATE TABLE job_application (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position TEXT NOT NULL,
    job_link TEXT,
    company_name TEXT,
    company_website TEXT,
    location TEXT, -- city, state, country, ...
    salary_range_min TEXT, -- 80k
    salary_range_max TEXT, -- 100k
    job_type TEXT, -- full_time, part_time, internship, contract, freelance
    workplace TEXT, -- office, remote, hybrid
    status TEXT NOT NULL, -- not applied, applied, interview, offer_received, rejected, archived
    tags TEXT, -- json: ['frontend', 'backend']
    notes TEXT, -- json: [{note_title: 'Interview notes', note_comment: 'Interview went well' }]
    documents TEXT, -- json: [{document_name: 'Resume', document_path: '/path/to/resume.pdf'}]
    created_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
);

-- Trigger to update the status_tracker table when a new status is updated in the job_application table
CREATE TRIGGER update_status_tracker AFTER
UPDATE OF status ON job_application BEGIN
INSERT INTO
    status_tracker (job_application_id, status)
VALUES
    (NEW.id, NEW.status);

END;

-- Trigger to delete the status_tracker records when a job application is deleted
CREATE TRIGGER delete_status_tracker AFTER DELETE ON job_application BEGIN
DELETE FROM status_tracker
WHERE
    job_application_id = OLD.id;

END;

-- Table to store the notes related to job applications
CREATE TABLE note (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id INTEGER NOT NULL,
    title TEXT,
    comment TEXT NOT NULL,
    order INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    FOREIGN KEY (application_id) REFERENCES job_applications (id)
);

-- Table to store documents related to job applications
CREATE TABLE document (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_name TEXT NOT NULL,
    document_path TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
);

-- Table to store job application and document relationship
CREATE TABLE job_application_document (
    job_application_id INTEGER NOT NULL,
    document_id INTEGER NOT NULL,
    PRIMARY KEY (job_application_id, document_id),
    FOREIGN KEY (job_application_id) REFERENCES job_application (id),
    FOREIGN KEY (document_id) REFERENCES document (id)
);

-- Table to store tags related to job applications
CREATE TABLE tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag_name TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
);

-- Table to store job application and tag relationship
CREATE TABLE job_application_tag (
    job_application_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (job_application_id, tag_id),
    FOREIGN KEY (job_application_id) REFERENCES job_application (id),
    FOREIGN KEY (tag_id) REFERENCES tag (id)
);
