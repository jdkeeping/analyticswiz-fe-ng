#!/bin/bash

############################
# EXIT IF ANY ERRORS OCCUR #
############################
set -e
set -o errexit
set -o nounset
set -o pipefail

echo "****************************************************"
echo "************** Uploading to S3  ********************"
echo "****************************************************"
# Force BH profile before anything
# AWS_PROFILE=default

ENV="$1"
S3_BUCKET="$2"

AWS_DEFAULT_REGION="us-east-1"
LOCAL_PATH="$(pwd)/www/"

# AWS_ACCESS_KEY_ID=$(aws --profile ${AWS_PROFILE} configure get aws_access_key_id)
# AWS_SECRET_ACCESS_KEY=$(aws --profile ${AWS_PROFILE} configure get aws_secret_access_key)


if [ -z "$S3_BUCKET" ]
then
  echo "***** ERROR: missing S3 bucket name argument"
  exit
else
  echo "*** S3_BUCKET input: $S3_BUCKET"
fi

if [ -z "$ENV" ]
then
  echo "***** ERROR: missing environment name argument"
  exit
else
  echo "*** ENV input: $ENV"
fi

# npm install -g ionic
npx ionic -v
npm ci
rm -rf www
if [ "$ENV" = "prod" ]
then
  echo "***** Compiling PROD Typescript"
  npx ionic build --prod --engine=browser
else
  echo "***** Compiling DEV Typescript"
  npx ionic build --engine=browser
fi

S3_PATH="s3://bh-$ENV-cloudfront-content/$S3_BUCKET/"
# aws s3 rm s3://bh-$ENV-cloudfront/$S3_BUCKET/ --recursive
# aws s3 cp $LOCAL_PATH $S3_PATH --recursive
echo "**** Running AWS script ***** $LOCAL_PATH => $S3_PATH"
aws s3 sync $LOCAL_PATH $S3_PATH --delete --exclude "uploaded-images/*" --exclude ".*" --exclude ".well-known"
