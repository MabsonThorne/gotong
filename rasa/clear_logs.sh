#!/bin/bash

# 定义日志文件路径
LOG_FILES=(
    "/home/ubuntu/gotong/rasa/rasa_cron.log"
    "/home/ubuntu/gotong/rasa/rasa_server.log"
    "/home/ubuntu/gotong/rasa/nohup.out"
)

# 清理日志文件
for LOG_FILE in "${LOG_FILES[@]}"; do
    if [ -f "$LOG_FILE" ]; then
        echo "" > "$LOG_FILE"
        echo "Cleared $LOG_FILE"
    else
        echo "$LOG_FILE does not exist."
    fi
done
