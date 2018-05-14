docker stop greview-frontend:latest
docker system prune -a -f
docker build -t greview-frontend:latest --no-cache .
docker run greview-frontend:latest npm test
docker run greview-frontend:latest eslint ./src
