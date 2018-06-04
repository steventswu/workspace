FROM nginx

RUN rm -f /etc/nginx/conf.d/*.conf && mkdir /etc/secrets

COPY config/secrets /etc/secrets/
COPY config/nginx.conf /etc/nginx/
COPY config/proxy.conf /etc/nginx/conf.d/
COPY config/proxy_ssl.conf /etc/nginx/conf.d/

COPY dist/ /var/www/
