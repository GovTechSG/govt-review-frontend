#!/bin/bash
token=$(curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data "{'name':'${name}','password':'${password}'}" \
  http://$(getent hosts veracity_backend | awk '{ print $1 }'):3000/api/v1/oauth/token |\
  jq -r '.access_token')
echo "REACT_APP_AUTH_TOKEN=\"Bearer ${token}\"" > .env.local
echo "REACT_APP_BACKEND_ENV=production" > .env.production
echo "HOST=review-api.gds-gov.tech" >> .env.production

npm run build --production
serve -l 5000 -s build