#!/bin/bash

dir=$(dirname $(readlink -f $0))
source "$dir/env.sh"

docker build -t $iname $@ $dir