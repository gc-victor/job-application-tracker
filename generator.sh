#!/bin/bash

node_modules/.bin/query generate job_application_tracker.sql status-tracker job_application_id:foreign status:string &&
    echo status-tracker generated &&
    sleep 1 &&
    node_modules/.bin/query generate job_application_tracker.sql job-application \
        position:string \
        job_link:string \
        company_name:text \
        company_website:text \
        location:string \
        salary_range_min:string \
        salary_range_max:string \
        job_type:string \
        workplace:string \
        status:string \
        tags:text \
        notes:text \
        documents:text && \
    echo job-application generated
