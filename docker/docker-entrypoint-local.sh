token=$(curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"bgp","password":"test12"}' \
  http://localhost:3000/api/v1/oauth/token |\
  jq -r '.access_token')
echo "REACT_APP_AUTH_TOKEN=\"Bearer ${token}\"" > .env.local
echo "NODE_ENV=development" >> .env.local
npm start