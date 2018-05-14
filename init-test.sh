docker build -t greview-frontend:latest --no-cache .
docker run --name frontend_run_1 greview-frontend:latest npm test
docker run --name frontend_run_2 greview-frontend:latest eslint ./src
docker rm frontend_run_1
docker rm frontend_run_2
docker rmi greview-frontend:latest
