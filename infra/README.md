## Set up AWS on your local

### Install AWS CLI

- You need to have AWS CLI installed on your computer : https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html

### Setup IAM user on AWS

- Go to [AWS Single Sign-On](https://theodo.awsapps.com/start/#/) and log in to your account.
- Setup a new IAM User in your AWS account with admin privileges and programmatic access.
- Open AWS [Identity and Access Managment service (IAM)](https://console.aws.amazon.com/iam/home?region=eu-west-1) and add a user.
- Select **Programmatic access** and **AWS Management Console access** access types in _Step 1 - Set User Details_
- Attach **AdministratorAccess** policy in _Step 2 -Set Permissions_
- At the end of the process, write down the **\$USER_ACCESS_KEY** and **\$USER_SECRET_ACCESS_KEY**.

### Configure the user on your machine

- Configure this user as a new `dojo-security` profile on your machine by running the following command `aws configure --profile dojo-security` :
  - AWS Access Key ID : _\$USER_ACCESS_KEY_
  - AWS Secret Access Key : _\$USER_SECRET_ACCESS_KEY_
  - Default region name : `eu-west-2`
  - Default output format : `json`

### To perform INFRA changes
- Init terraform state (from S3 bucket)
  - `terraform init`
- Apply a change
  - `terraform apply -auto-approve`
- Destroy the entire stack (infra)
  - `terraform destroy -auto-approve`
