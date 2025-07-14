#!/bin/sh
# wait-for-it.sh: espera um serviço ficar disponível antes de executar um comando.

set -e

host="$1"
shift
cmd="$@"

until nc -z "$host"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd