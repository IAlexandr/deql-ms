#!/usr/bin/env bash
# wait-for-postgres.sh

set -e

host="$1"
port="$2"
cmd="$3"

status=0
echo "wait-for-postgres try connection (15s).. (using host: $host, port: $port, cmd: $cmd)"
while [ $status -eq 0 ]
do
  pg_isready -h "$host" -p "$port" | grep  "accepting connections" &> /dev/null
  echo "starting"
  if [ $? == 0 ]; then
    echo "success"
    status=1
  else
    echo "fail"
  fi

  sleep 15
done

>&2 echo "Postgres is up - executing command"
exec $cmd
