#!/usr/bin/env bash
(cd frontend || exit; terraform destroy -auto-approve)
(cd worker || exit; terraform destroy -auto-approve)
(cd alb || exit; terraform destroy -auto-approve)
(cd bastion || exit; terraform destroy -auto-approve)
(cd security || exit; terraform destroy -auto-approve)
(cd networking || exit; terraform destroy -auto-approve)
