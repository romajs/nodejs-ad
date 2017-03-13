#!/bin/bash

dir=$(dirname $(readlink -f $0))
source "$dir/env.sh"

running=$(docker ps -a --filter name=$cname --format="{{.ID}}")
if [[ ${#running} -eq 0 ]]; then
	options=""
	# options="$options -e COUCHDB_USER=$couchdb_user"
	# options="$options -e COUCHDB_PASSWORD=$couchdb_password"
	options="$options -p $couchdb_port:$couchdb_port"
  docker run -d -it $options -P $@ --name $cname $iname
else
  docker start $@ $cname
fi

docker ps | grep $cname