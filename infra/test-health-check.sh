#!/usr/bin/env bash
bastion_ip=$(cd alb || exit; terraform output alb-dns)
curl -s -v http://$bastion_ip/health-check
