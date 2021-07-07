#!/bin/bash

generate_post_data()
{
  cat <<EOF
{
  "command": "open-gate"
}
EOF
}

URL="http://localhost:8000"

curl -i -X POST \
-H "Accept: application/json" \
-H "Content-Type:application/json" \
--data "$(generate_post_data)" "$URL"
