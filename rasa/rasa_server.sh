#!/bin/bash

source /home/ubuntu/gotong/venv/bin/activate
rasa run --enable-api --cors "*"
