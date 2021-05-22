# Deploy the API to a staging env

### Infra schema
![alt text](./images/dojo-security-infra.png "infrastructure schema")

### Deploy sequence
#### 1) Deploy the S3 bucket to store frontend

In `{project}/infra/frontend`, run `terraform apply -auto-approve`

#### 2) Deploy the frontend

In `{project}/frontend`, run `./deploy.sh`

This sequence changes the `.env.production` to target the ALB as API. Then the frontend is built and deployed inside the S3.

⚠️: deploy.sh as been tested on MacOS only. 

⚠️: deploy.sh must be executable (`chmod +x deploy.sh` may be required)

#### 3) Deploy the backend
In `{project}/infra`, run `terraform apply -auto-approve`

This sequence creates the whole Infra (networks, security, EC2s and ALB). 

PHP configuration is changed to allow connections from the ALB

