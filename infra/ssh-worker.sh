#!/usr/bin/env bash
bastion_ip=$(cd bastion || exit; terraform output bastion-public-ip)
worker_ip=$(cd worker || exit; terraform output worker-private-ip)
ssh -i ./aws-dojo-secu.pem -o "StrictHostKeyChecking no" -J ec2-user@$bastion_ip ec2-user@$worker_ip
