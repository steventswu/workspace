#!/bin/bash
docker build . --tag gcr.io/tg2018-ico/nginx-cap:$1
docker push gcr.io/tg2018-ico/nginx-cap:$1
kubectl set image deploy/nginx-cap nginx-cap=gcr.io/tg2018-ico/nginx-cap:$1
