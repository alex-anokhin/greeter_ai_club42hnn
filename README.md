# docker-microservice-app-test
Project (webapp) for testing microservice arcitecture implemented with docker containers

## project structure
- project_folder/
    - docker/
        - Dockerfile_nginx
        - Dockerfile_server
    - nginx/
        - nginx.conf
    - app/
        - server.py
        - requirements.txt
    - src/
        - index.html

## How to Run the Service

1. Make sure you have Docker and Docker Compose installed.
2. Clone this repository:

    ```
    git clone https://github.com/alex-anokhin/docker-microservice-app-test.git
    ```

3. Navigate to the project directory:

    ```
    cd docker-microservice-app-test
    ```

4. Run the service using Docker Compose:

    ```
    docker-compose up -d
    ```

	This command will create and start containers for the server and Nginx.
5. Once the service is running, open your web browser and go to `http://localhost:8083` to access the application.


## How to Stop the Service

6. To stop the service, run the following command:

    ```
	docker-compose down
    ```

This command will stop and remove all containers created for the project.

## Additional Commands

- `docker-compose logs phrase-server`: View logs of the server.
- `docker-compose logs phrase-nginx`: View logs of Nginx.
