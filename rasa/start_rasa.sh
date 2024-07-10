#!/bin/bash

# Activate the virtual environment
source /home/ubuntu/gotong/venv/bin/activate
cd /home/ubuntu/gotong/rasa

# Fetch new data and update nlu.yml, domain.yml, and stories.yml
python fetch_data.py

# Function to remove conflicting stories or rules
remove_conflicts() {
    # Check if rules.yml exists and remove conflicting rules
    if [ -f data/rules.yml ]; then
        sed -i '/utter_iamabot/d' data/rules.yml
    fi
    # Check if stories.yml exists and remove conflicting stories
    if [ -f data/stories.yml ]; then
        sed -i '/utter_bot_challenge/d' data/stories.yml
    fi
}

# Remove conflicts before training
remove_conflicts

# Train the model
rasa train --force

# Remove old models except the latest one
cd models
ls -t | sed -e '1d' | xargs -d '\n' rm -f

# Deactivate the virtual environment
deactivate

# Check if port 5005 is in use and kill the process using it
PORT=5005
PID=$(sudo lsof -t -i:$PORT)
if [ ! -z "$PID" ]; then
  sudo kill -9 $PID
fi

# Activate the virtual environment again to run Rasa server
source /home/ubuntu/gotong/venv/bin/activate
cd /home/ubuntu/gotong/rasa
rasa run --cors "*"
