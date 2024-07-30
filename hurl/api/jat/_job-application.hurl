POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application__",
    "jobLink": "https://jobs.test.com",
    "companyName": "__Test Job Application Company Name__",
    "companyWebsite": "https://test.com",
    "location": "Test City",
    "salaryRangeMin": "80k",
    "salaryRangeMax": "100k",
    "jobType": "full_time",
    "workplace": "remote",
    "status": "applied"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

GET {{host}}/api/jat
HTTP 200
[Asserts]
jsonpath "$.data[0].position" == "__Test Job Application__"
jsonpath "$.data[0].jobLink" == "https://jobs.test.com"
jsonpath "$.data[0].companyName" == "__Test Job Application Company Name__"
jsonpath "$.data[0].companyWebsite" == "https://test.com"
jsonpath "$.data[0].location" == "Test City"
jsonpath "$.data[0].salaryRangeMin" == "80k"
jsonpath "$.data[0].salaryRangeMax" == "100k"
jsonpath "$.data[0].jobType" == "full_time"
jsonpath "$.data[0].workplace" == "remote"
jsonpath "$.data[0].status" == "applied"
[Captures]
uuid: jsonpath "$.data[0].uuid"
createCompanyUuid: jsonpath "$.data[0].companyUuid"

# Without update company name but with update company website

PUT {{host}}/api/jat
```json
{
    "uuid": "{{uuid}}",
    "companyUuid": "{{createCompanyUuid}}",
    "position": "__Test Job Application__ 2",
    "jobLink": "https://jobs.test-2.com",
    "companyName": "__Test Job Application Company Name__",
    "companyWebsite": "https://test-2.com",
    "location": "Test City 2",
    "salaryRangeMin": "82k",
    "salaryRangeMax": "102k",
    "jobType": "part_time",
    "workplace": "hybrid",
    "status": "interview"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

GET {{host}}/api/jat
HTTP 200
[Asserts]
jsonpath "$.data[0].companyUuid" == "{{createCompanyUuid}}"
jsonpath "$.data[0].position" == "__Test Job Application__ 2"
jsonpath "$.data[0].jobLink" == "https://jobs.test-2.com"
jsonpath "$.data[0].companyName" == "__Test Job Application Company Name__"
jsonpath "$.data[0].companyWebsite" == "https://test-2.com"
jsonpath "$.data[0].location" == "Test City 2"
jsonpath "$.data[0].salaryRangeMin" == "82k"
jsonpath "$.data[0].salaryRangeMax" == "102k"
jsonpath "$.data[0].jobType" == "part_time"
jsonpath "$.data[0].workplace" == "hybrid"
jsonpath "$.data[0].status" == "interview"

# Updates company name and company website
# This should create a new company

PUT {{host}}/api/jat
```json
{
    "uuid": "{{uuid}}",
    "companyUuid": "{{createCompanyUuid}}",
    "position": "__Test Job Application__ 2",
    "jobLink": "https://jobs.test-2.com",
    "companyName": "__Test Job Application Company Name__ 2",
    "companyWebsite": "https://test-3.com",
    "location": "Test City 2",
    "salaryRangeMin": "82k",
    "salaryRangeMax": "102k",
    "jobType": "part_time",
    "workplace": "hybrid",
    "status": "interview"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

GET {{host}}/api/jat
HTTP 200
[Asserts]
jsonpath "$.data[0].companyUuid" != "{{createCompanyUuid}}"
jsonpath "$.data[0].position" == "__Test Job Application__ 2"
jsonpath "$.data[0].jobLink" == "https://jobs.test-2.com"
jsonpath "$.data[0].companyName" == "__Test Job Application Company Name__ 2"
jsonpath "$.data[0].companyWebsite" == "https://test-3.com"
jsonpath "$.data[0].location" == "Test City 2"
jsonpath "$.data[0].salaryRangeMin" == "82k"
jsonpath "$.data[0].salaryRangeMax" == "102k"
jsonpath "$.data[0].jobType" == "part_time"
jsonpath "$.data[0].workplace" == "hybrid"
jsonpath "$.data[0].status" == "interview"
[Captures]
newCompanyNameUuid: jsonpath "$.data[0].companyUuid"

# Updates company website without updating company name

PUT {{host}}/api/jat
```json
{
    "uuid": "{{uuid}}",
    "companyUuid": "{{newCompanyNameUuid}}",
    "position": "__Test Job Application__ 2",
    "jobLink": "https://jobs.test-2.com",
    "companyName": "__Test Job Application Company Name__ 2",
    "companyWebsite": "https://test-4.com",
    "location": "Test City 2",
    "salaryRangeMin": "82k",
    "salaryRangeMax": "102k",
    "jobType": "part_time",
    "workplace": "hybrid",
    "status": "interview"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

GET {{host}}/api/jat
HTTP 200
[Asserts]
jsonpath "$.data[0].companyUuid" == "{{newCompanyNameUuid}}"
jsonpath "$.data[0].position" == "__Test Job Application__ 2"
jsonpath "$.data[0].jobLink" == "https://jobs.test-2.com"
jsonpath "$.data[0].companyName" == "__Test Job Application Company Name__ 2"
jsonpath "$.data[0].companyWebsite" == "https://test-4.com"
jsonpath "$.data[0].location" == "Test City 2"
jsonpath "$.data[0].salaryRangeMin" == "82k"
jsonpath "$.data[0].salaryRangeMax" == "102k"
jsonpath "$.data[0].jobType" == "part_time"
jsonpath "$.data[0].workplace" == "hybrid"
jsonpath "$.data[0].status" == "interview"
[Captures]
newCompanyWebsiteUuid: jsonpath "$.data[0].companyUuid"

DELETE {{host}}/api/jat
```json
{
    "uuid": "{{uuid}}"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

DELETE {{host}}/api/jat/service/company
```json
{
    "uuid": "{{createCompanyUuid}}"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

DELETE {{host}}/api/jat/service/company
```json
{
    "uuid": "{{newCompanyNameUuid}}"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

DELETE {{host}}/api/jat/service/company
```json
{
    "uuid": "{{newCompanyWebsiteUuid}}"
}
```
HTTP 200
[Asserts]
jsonpath "$.data[0].success" == true

# Statuses

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Statuses__",
    "status": "applied"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Statuses__",
    "status": "interview"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Statuses__",
    "status": "offer_received"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Statuses__",
    "status": "rejected"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Statuses__",
    "status": "archived"
}
```
HTTP 200

# Job Types

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Job Types__",
    "jobType": "full_time"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Job Types__",
    "jobType": "part_time"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Job Types__",
    "jobType": "internship"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Job Types__",
    "jobType": "contract"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Job Types__",
    "jobType": "freelance"
}
```
HTTP 200


# Workplaces

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Workplaces__",
    "workplace": "office"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Workplaces__",
    "workplace": "remote"
}
```
HTTP 200

POST {{host}}/api/jat
```json
{
    "position": "__Test Job Application Workplaces__",
    "workplace": "hybrid"
}
```
HTTP 200

# Clean Up

POST {{host}}/_/user/token/value
```json
{
    "email": "admin",
    "password": "admin"
}
```
HTTP 200
[Captures]
user_token: jsonpath "$.data[0].token"

POST {{host}}/_/query
Authorization: Bearer {{user_token}}
```json
{
    "db_name": "job_application_tracker.sql",
    "query": "DELETE FROM job_application WHERE position = '__Test Job Application Statuses__' OR position = '__Test Job Application Job Types__' OR position = '__Test Job Application Workplaces__'"
}
```
HTTP 200
