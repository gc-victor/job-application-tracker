POST {{host}}/api/jat
Content-Type: application/x-www-form-urlencoded
HTTP 400
{"errors":{"position":["Invalid type: Expected string but received null"]}}

POST {{host}}/api/jat
[FormParams]
position: __Test Job Application POST Error__
job_link: jobs.test.com
status: applied
HTTP 400
{"errors":{"job_link":["Invalid URL: Received \"jobs.test.com\"","The URL must be using HTTPS"]}}

POST {{host}}/api/jat
[FormParams]
position: __Test Job Application POST Error__
job_link: http://jobs.test.com
status: applied
HTTP 400
{"errors":{"job_link":["The URL must be using HTTPS"]}}

POST {{host}}/api/jat
[FormParams]
position: __Test Job Application POST Error__
status: -
HTTP 400
{"errors":{"status":["Please enter a valid status."]}}

POST {{host}}/api/jat
[FormParams]
position: __Test Job Application POST Error__
status: applied
job_type: -
HTTP 400
{"errors":{"job_type":["Please enter a valid job_type."]}}

# POST {{host}}/api/jat
# ```json
# {
#     "position": "__Test Job Application POST Error__",
#     "workplace": "_"
# }
# ```
# HTTP 400
# {"errors":{"workplace":["Please enter a valid workplace."]}}

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
    "query": "DELETE FROM job_application WHERE position = '__Test Job Application POST Error__';"
}
```
HTTP 200
