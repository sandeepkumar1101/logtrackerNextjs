
1. **Log Ingestor**:
    - `POST /logs`: This route will be used to ingest logs into the system. The logs will be sent in the body of the POST request.


![Diagram](https://onedrive.live.com/embed?resid=21748AC53DD66074%2115649&authkey=%21AJXFvTdgMkWKk7g&width=1024)

1. **Query Interface**:
    - `GET /logs`: This route will be used to retrieve all logs.
    - `GET /logs?level={level}`: This route will be used to retrieve logs with a specific level.
    - `GET /logs?message={message}`: This route will be used to retrieve logs with a specific message.
    - `GET /logs?from={resourceId}`: This route will be used to retrieve logs with a specific resourceId.
    - `GET /logs?from={from}&to={to}`: This route will be used to retrieve logs with a specific date-range.
    - `GET /logs?traceId={traceId}`: This route will be used to retrieve logs with a specific traceId.
    - `GET /logs?spanId={spanId}`: This route will be used to retrieve logs with a specific spanId.
    - `GET /logs?commit={commit}`: This route will be used to retrieve logs with a specific commit.
    - `GET /logs?parentResourceId={parentResourceId}`: This route will be used to retrieve logs with a specific parentResourceId in metadata.


specific date ranges, a route  `GET /logs?from={from}&to={to}`.

