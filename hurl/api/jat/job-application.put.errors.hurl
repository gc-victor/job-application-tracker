PUT {{host}}/api/jat
```json
{}
```
HTTP 400
{"errors":{"uuid":["Invalid type: Expected string but received undefined"],"position":["Invalid type: Expected string but received undefined"]}}

PUT {{host}}/api/jat
```json
{
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "position": "__Test Job Application PUT Error__",
    "jobLink": "jobs_test.com"
}
```
HTTP 400
{"errors":{"jobLink":["Invalid URL: Received \"jobs_test.com\"","The URL must be using HTTPS"]}}

PUT {{host}}/api/jat
```json
{
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "position": "__Test Job Application PUT Error__",
    "jobLink": "http://jobs_test.com"
}
```
HTTP 400
{"errors":{"jobLink":["The URL must be using HTTPS"]}}

PUT {{host}}/api/jat
```json
{
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "position": "__Test Job Application PUT Error__",
    "status": "_"
}
```
HTTP 400
{"errors":{"status":["Please enter a valid status."]}}

PUT {{host}}/api/jat
```json
{
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "position": "__Test Job Application PUT Error__",
    "jobType": "_"
}
```
HTTP 400
{"errors":{"jobType":["Please enter a valid jobType."]}}

PUT {{host}}/api/jat
```json
{
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "position": "__Test Job Application PUT Error__",
    "workplace": "_"
}
```
HTTP 400
{"errors":{"workplace":["Please enter a valid workplace."]}}

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
    "query": "DELETE FROM job_application WHERE position = '__Test Job Application PUT Error__';"
}
```
HTTP 200
