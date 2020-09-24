#! /bin/bash

echo "Starting..."
# Mongo connection information
user=${MONGO_USER}
pw=${MONGO_PW}
host=${MONGO_HOST}
port=${MONGO_PORT}
db=${MONGO_DB}

policyfile=${POLICY_FILE_PATH:-policy.js}
subscriberfile=${SUBSCRIBER_FILE_PATH:-subscriber.js}
userfile=${USER_FILE_PATH:-user.js}
# Create default URI in case URI is missing
DEFAULT_MONGO_URI="mongodb://$user:$pw@$host:$port/$db?authSource=admin"

uri=""
echo "Creating MongoDB Connection URI"
if [[ -z ${MONGO_URI} ]]; then
    echo "Checking connection variables"
    if [ ! -z ${MONGO_USER} ] && [ ! -z ${MONGO_PW} ] && [ ! -z ${MONGO_HOST} ] && [ ! -z ${MONGO_PORT} ] && [ ! -z ${MONGO_DB} ]; then
        uri=$DEFAULT_MONGO_URI
    else
        echo "Mongo connection variables are required if MONGO_URI is absent"
        echo "Set environment variables MONGO_USER, MONGO_PW, MONGO_HOST, MONGO_PORT, MONGO_DB or set environment variable MONGO_URI"
        exit 1
    fi
else
    echo "MONGO_URI is defined"
    uri=${MONGO_URI}
fi

if [ -z $uri ]; then
    echo "No URI defined, exiting"
    exit 2
fi

echo "Connection string: $uri"

# Create collections and seed data

echo "Creating policies collection from $policyfile"
mongo "$uri" < "$policyfile" --quiet

echo "Creating subscribers collection from $subscriberfile"
mongo "$uri" < "$subscriberfile" --quiet

echo "Creating users collection from $userfile"
mongo "$uri" < "$userfile" --quiet

echo "Done"
exit 0