#!/bin/sh
# wait-for-it.sh - Versão Corrigida

set -e

HOSTPORT="$1"
shift
CMD="$@"

# Separa o host e a porta
HOST=$(echo $HOSTPORT | cut -d: -f1)
PORT=$(echo $HOSTPORT | cut -d: -f2)

until nc -z "$HOST" "$PORT"; do
  >&2 echo "Serviço $HOST:$PORT está indisponível - aguardando..."
  sleep 1
done

>&2 echo "Serviço $HOST:$PORT está pronto - executando comando."
exec $CMD