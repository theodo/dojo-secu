#!/usr/bin/env bash
(cd networking || exit; terraform apply -auto-approve)
(cd security || exit; terraform apply -auto-approve)
(cd bastion || exit; terraform apply -auto-approve)
(cd alb || exit; terraform apply -auto-approve)
(cd frontend || exit; terraform apply -auto-approve)
(cd worker || exit; terraform apply -auto-approve)
