FROM nginx

RUN rm -f /etc/nginx/conf.d/*.conf && mkdir /etc/secrets

ARG ENV=staging

COPY config/secrets /etc/secrets/
COPY config/nginx.conf /etc/nginx/
COPY config/proxy.conf /etc/nginx/conf.d/
COPY config/api.${ENV}.conf /etc/nginx/conf.d/api.conf

COPY dist/ /var/www/
