FROM nginx

RUN apt-get update
RUN apt-get install openssl -y

RUN rm -f /etc/nginx/conf.d/*.conf && mkdir /etc/secrets
RUN sh -c "echo -n 'tixguru:' >> /etc/nginx/.htpasswd"
RUN sh -c "openssl passwd -apr1 'dazhi' >> /etc/nginx/.htpasswd"

# COPY secrets /etc/secrets/
COPY config/nginx.conf /etc/nginx/
COPY config/proxy.conf /etc/nginx/conf.d/

COPY dist/ /var/www/
