#!/bin/bash

docker run --link mongodb_test jwilder/dockerize dockerize -wait tcp://mongodb_test:27017