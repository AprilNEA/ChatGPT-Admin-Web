#!/bin/bash

status_output=$(pnpx prisma migrate status)
echo "$status_output"

if echo "$status_output" | grep -q "Database schema is up to date!"; then
  echo "数据库结构正确！"
else
  deploy_output=$(pnpx prisma migrate deploy)
  if echo "$deploy_output" | grep -q "All migrations have been successfully applied."; then
    echo "初始化数据库成功！"
        exit 0
  else
    echo "初始化数据库失败！"
  fi
  echo "数据库结构不正确！"
  exit 1
fi

pnpx nest start
