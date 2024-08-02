FROM debian:12-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    sqlite3 \
    fuse3 \
    curl

# Download and installs Query Server
RUN curl --proto '=https' --tlsv1.2 -LsSf https://github.com/gc-victor/query/releases/latest/download/query-server-installer.sh | sh

ENV QUERY_SERVER_APP="true"
ENV QUERY_SERVER_DBS_PATH="/mnt/dbs"
ENV QUERY_APP_QUERY_SERVER="http://localhost:3000"

EXPOSE 3000

ENTRYPOINT /root/.cargo/bin/query-server
