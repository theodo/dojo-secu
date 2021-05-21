#!/usr/bin/env bash

## GENERATE A KEY PAIR for SSH in future EC2 instances
rm -f aws-dojo-secu*
ssh-keygen -P '' -q -m PEM -f aws-dojo-secu
mv aws-dojo-secu aws-dojo-secu.pem
chmod 400 aws-dojo-secu.pem

## IMPORT THE PUBLIC KEY of the KEY PAIR in AWS for EC2
aws ec2 delete-key-pair --key-name aws-dojo-secu --region eu-west-2 --profile dojo-security
aws ec2 import-key-pair --key-name aws-dojo-secu --public-key-material fileb://./aws-dojo-secu.pub --region eu-west-2 --profile dojo-security