POST {{host}}/api/jat
[FormParams]
position: __Test Job Application__
job_link: https://jobs.test.com
company_name: __Test Job Application Company Name__
company_website: https://test.com
location: Test City
salary_range_min: 80k
salary_range_max: 100k
job_type: full_time
workplace: remote
status: applied
tags: test, job, application
note_title: __Test Notes Title__
note_comment: __Test Notes Comment__
note_title: __Test Notes Title 2__
note_comment: __Test Notes Comment 2__
document_path: /
document_name: file.pdf
document_path: /2
document_name: file-2.pdf
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

GET {{host}}/api/jat
HTTP 200
[Asserts]
jsonpath "$.data[0].position" == "__Test Job Application__"
jsonpath "$.data[0].job_link" == "https://jobs.test.com"
jsonpath "$.data[0].company_name" == "__Test Job Application Company Name__"
jsonpath "$.data[0].company_website" == "https://test.com"
jsonpath "$.data[0].location" == "Test City"
jsonpath "$.data[0].salary_range_min" == "80k"
jsonpath "$.data[0].salary_range_max" == "100k"
jsonpath "$.data[0].job_type" == "full_time"
jsonpath "$.data[0].workplace" == "remote"
jsonpath "$.data[0].status" == "applied"
jsonpath "$.data[0].tags[0]" == "test"
jsonpath "$.data[0].tags[1]" == "job"
jsonpath "$.data[0].tags[2]" == "application"
jsonpath "$.data[0].notes[0].title" == "__Test Notes Title__"
jsonpath "$.data[0].notes[0].comment" == "__Test Notes Comment__"
jsonpath "$.data[0].notes[1].title" == "__Test Notes Title 2__"
jsonpath "$.data[0].notes[1].comment" == "__Test Notes Comment 2__"
jsonpath "$.data[0].documents[0].name" == "file.pdf"
jsonpath "$.data[0].documents[0].path" == "/"
jsonpath "$.data[0].documents[1].name" == "file-2.pdf"
jsonpath "$.data[0].documents[1].path" == "/2"
[Captures]
uuid: jsonpath "$.data[0].uuid"

PUT {{host}}/api/jat
[FormParams]
uuid: {{uuid}}
position: __Test Job Application N__
job_link: https://jobs.test-n.com
company_name: __Test Job Application Company Name N__
company_website: https://test-n.com
location: Test City N
salary_range_min: 80k N
salary_range_max: 100k N
job_type: part_time
workplace: hybrid
status: interview
tags: test-n, job-n, application-n
note_title: __Test Notes Title N__
note_comment: __Test Notes Comment N__
note_title: __Test Notes Title 2 N__
note_comment: __Test Notes Comment 2 N__
document_path: /n
document_name: file-n.pdf
document_path: /2-n
document_name: file-2-n.pdf
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

GET {{host}}/api/jat
HTTP 200
[Asserts]
jsonpath "$.data[0].uuid" == "{{uuid}}"
jsonpath "$.data[0].position" == "__Test Job Application N__"
jsonpath "$.data[0].job_link" == "https://jobs.test-n.com"
jsonpath "$.data[0].company_name" == "__Test Job Application Company Name N__"
jsonpath "$.data[0].company_website" == "https://test-n.com"
jsonpath "$.data[0].location" == "Test City N"
jsonpath "$.data[0].salary_range_min" == "80k N"
jsonpath "$.data[0].salary_range_max" == "100k N"
jsonpath "$.data[0].job_type" == "part_time"
jsonpath "$.data[0].workplace" == "hybrid"
jsonpath "$.data[0].status" == "interview"
jsonpath "$.data[0].tags[0]" == "test-n"
jsonpath "$.data[0].tags[1]" == "job-n"
jsonpath "$.data[0].tags[2]" == "application-n"
jsonpath "$.data[0].notes[0].title" == "__Test Notes Title N__"
jsonpath "$.data[0].notes[0].comment" == "__Test Notes Comment N__"
jsonpath "$.data[0].notes[1].title" == "__Test Notes Title 2 N__"
jsonpath "$.data[0].notes[1].comment" == "__Test Notes Comment 2 N__"
jsonpath "$.data[0].documents[0].name" == "file-n.pdf"
jsonpath "$.data[0].documents[0].path" == "/n"
jsonpath "$.data[0].documents[1].name" == "file-2-n.pdf"
jsonpath "$.data[0].documents[1].path" == "/2-n"

DELETE {{host}}/api/jat
```json
{
    "uuid": "{{uuid}}"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true
