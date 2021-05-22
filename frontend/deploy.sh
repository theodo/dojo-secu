#!/usr/bin/env bash
## READ ALB DNS from TERRAFORM STATE
alb_dns=$(cd ../infra/alb || exit; terraform output alb-dns)
## MODIFY .env.production before build
cmd="s/alb_dns/$alb_dns/g"
sed -i '' -e $cmd .env.production
## REBUILD frontend
yarn build
## DEPLOY in S3
aws s3 sync build/ s3://frontend-dojo-security-theodo --profile dojo-security
## Rollback change in .env.production
git checkout HEAD .env.production
