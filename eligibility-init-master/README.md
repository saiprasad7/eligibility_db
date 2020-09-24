# Eligibility Inquiry Data Loader

Building a baseling MongoDB database with some sample data. Data structure as detailed here -> [JIRA](https://jira.perficient.com/browse/JAVACOE-108)

## Setup (Docker Compose)

1. Create a new volume

    a. `docker volume create eligibility-data`

2. For local dev, with `docker-compose` installed, simply run `docker-compose up --build`

## Setup (Docker From Scratch)

1. Create a new network

    a. `docker network create eligibility-nw`

2. Create a new volume

    a. `docker volume create eligibility-data`

3. Create MongoDB docker container

    a. `docker container run --name mongo-eligibility -d --volume eligibility-data:/data/db --network eligibility-nw -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 mongo:3.4`

    b. For compatibility with local OpenShift, use MongoDB version 3.4

4. Create Eligibility Init Image

    a. `docker image build -t eligibility-init .`

5. Run Eligibility Init image

    a. `docker container run --name eligibility-init -e MONGO_URI=mongodb://admin:admin@mongo-eligibility:27017/eligibilityDB?authSource=admin --network eligibility-nw eligibility-init`

    b. `MONGO_URI` environment variable is the connection string for the Mongo Instance we connect to.

    c. The container will automatically stop

## Setup (Local MongoDB and Shell Scripts execution)

1. Ensure MongoDB is installed locally and accessible through Command Line (mongo), MongoDB Compass, or Robo3T

2. Create environment variable `MONGO_URI`

    a. export `MONGO_URI=mongodb://admin:admin@localhost:27017/eligibilityDB?authSource=admin`

    b. Take care to use the MongoDB connection string for your system

3. Run `entrypoint.sh`

    a. `chmod 777 entrypoint.sh`

    b. `./entrypoint.sh`
