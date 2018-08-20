#!/bin/bash
VERSION_INFO=$(git describe --tags)
VERSION=$(echo $VERSION_INFO | sed -e 's/^v//')

docker build . --build-arg ENV=$ENV --tag gcr.io/$PROJECT/nginx-blockcast-1:$VERSION
docker push gcr.io/$PROJECT/nginx-blockcast-1:$VERSION
kubectl set image --context=gke_${PROJECT}_asia-east1-a_cluster-1 deploy/nginx-blockcast-1 nginx-blockcast-1=gcr.io/$PROJECT/nginx-blockcast-1:$VERSION

git push origin master --follow-tags
