# Dockerfile
FROM alpine:3.19

# نصب وابستگی‌ها و دانلود xray-core
RUN apk add --no-cache curl bash jq unzip \
    && curl -L -o /tmp/xray.zip https://github.com/XTLS/Xray-core/releases/download/v1.8.11/Xray-linux-64.zip \
    && unzip /tmp/xray.zip -d /usr/local/bin \
    && chmod +x /usr/local/bin/xray \
    && rm -rf /tmp/xray.zip

WORKDIR /app
COPY config.template.json /app/config.template.json
COPY start.sh /app/start.sh

RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
