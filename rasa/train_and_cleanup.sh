#!/bin/bash

source /home/ubuntu/gotong/venv/bin/activate
cd /home/ubuntu/gotong/rasa

# Train the model
rasa train --force

# Remove old models except the latest one
cd models
ls -t | sed -e '1d' | xargs -d '\n' rm
