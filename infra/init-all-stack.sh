#!/usr/bin/env bash
(cd networking || exit; terraform init)
(cd security || exit; terraform init)
(cd bastion || exit; terraform init)
(cd alb || exit; terraform init)
(cd frontend || exit; terraform init)
(cd worker || exit; terraform init)
