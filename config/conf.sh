#!/bin/sh

# Preprend the upstream configuration
(echo "upstream web { server $WEB_SERVER; } upstream api { server $API_SERVER; }" && cat /etc/nginx/conf.d/proxy.conf) > proxy.conf.new
mv proxy.conf.new /etc/nginx/conf.d/proxy.conf

# Log the resulting configuration file
cat /etc/nginx/conf.d/proxy.conf

# Start nginx
service nginx start
