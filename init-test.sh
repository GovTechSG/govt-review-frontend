docker stop greview-frontend:latest
docker system prune -a -f
docker build -t greview-frontend:latest --no-cache .
docker run -it -d greview-frontend:latest npm test
