#!/bin/bash
VERSION_INFO=$(git describe master --tags)
VERSION=$(echo $VERSION_INFO | sed -e 's/^v//')

docker build . --build-arg ENV=$ENV --tag gcr.io/$PROJECT/nginx-cap:$VERSION
docker push gcr.io/$PROJECT/nginx-cap:$VERSION
kubectl set image --context=gke_$PROJECT_asia-east1-a_cluster-1 deploy/nginx-cap nginx-cap=gcr.io/$PROJECT/nginx-cap:$VERSION

git push origin master --follow-tags
