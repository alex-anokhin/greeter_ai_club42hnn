# GREETER AI
## AI student club in 42Heilbronn
### docker-microservice-app
Generative AI project (webapp) for creating personalized video greetings  implemented with microservice arcitecture in docker containers

#### project structure
- project/
    - docker-compose.yaml
    - docker/
        - Dockerfile_nginx
        - Dockerfile_server
    - nginx/
        - nginx.conf
    - app/
        - server.py
    - src/
        - index.html
        - main.js
    - .gitignore
    - README.md

#### How to Run the Service

1. Make sure you have Docker and Docker Compose installed.
2. Clone this repository:

    ```
    git clone https://github.com/alex-anokhin/greeter_ai_club42hnn.git
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


#### How to Stop the Service

6. To stop the service, run the following command:

    ```
	docker-compose down
    ```


This command will stop and remove all containers created for the project.

#### Additional Commands


7. To run the service with rebuild in depricated mode, run the following command:

    ```
	docker-compose up --build -d
    ```
8. To run with rebuild, and wathing logs run the following command:

    ```
	docker-compose up --build
    ```