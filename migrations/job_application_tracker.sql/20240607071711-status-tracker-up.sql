CREATE TABLE IF NOT EXISTS status_tracker(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE CHECK (uuid != '') DEFAULT (uuid()) NOT NULL,
    job_application_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    FOREIGN KEY (job_application_id) REFERENCES job_application (id)
);

CREATE TRIGGER IF NOT EXISTS trigger_status_tracker_update
    AFTER UPDATE ON status_tracker
    BEGIN
        UPDATE status_tracker
        SET updated_at=(strftime('%s', 'now'))
        WHERE id=OLD.id;
    END;
