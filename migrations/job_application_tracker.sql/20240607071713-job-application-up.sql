CREATE TABLE IF NOT EXISTS job_application (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE CHECK (uuid != '') DEFAULT (uuid ()) NOT NULL,
    position TEXT NOT NULL,
    job_link TEXT,
    company_name TEXT,
    company_website TEXT,
    location TEXT, -- city, state, country, ...
    salary_range_min TEXT, -- 80k
    salary_range_max TEXT, -- 100k
    job_type TEXT, -- full_time, part_time, internship, contract, freelance
    workplace TEXT, -- office, remote, hybrid
    status TEXT, -- not_applied, applied, interview, offer_received, rejected, archived
    tags TEXT, -- json: ['frontend', 'backend']
    notes TEXT, -- json: [{title: 'Interview notes', comment: 'Interview went well' }]
    documents TEXT, -- json: [{content: [0,1,2], name: 'resume.pdf', type: 'application/pdf' }]
    created_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
);

CREATE TRIGGER IF NOT EXISTS trigger_job_application_update AFTER
UPDATE ON job_application BEGIN
UPDATE job_application
SET
    updated_at = (strftime ('%s', 'now'))
WHERE
    id = OLD.id
    AND status != "";

END;

CREATE TRIGGER IF NOT EXISTS insert_status_tracker AFTER INSERT ON job_application WHEN NEW.status IS NOT NULL
AND NEW.status != '' BEGIN
INSERT INTO
    status_tracker (job_application_id, status)
VALUES
    (NEW.id, NEW.status);

END;

CREATE TRIGGER IF NOT EXISTS update_status_tracker AFTER
UPDATE OF status ON job_application WHEN NEW.status IS NOT NULL
AND NEW.status != ''
AND NEW.status != OLD.status BEGIN
INSERT INTO
    status_tracker (job_application_id, status)
VALUES
    (NEW.id, NEW.status);

END;

CREATE TRIGGER IF NOT EXISTS delete_status_tracker AFTER DELETE ON job_application BEGIN
DELETE FROM status_tracker
WHERE
    job_application_id = OLD.id;

END;
