#!/bin/sh

while :
do
	echo "Doing a git fetch"
	git fetch origin
	UPSTREAM=origin/master
	LOCAL=$(git rev-parse @)
	REMOTE=$(git rev-parse "$UPSTREAM")

	if [ $LOCAL = $REMOTE ]; then
	    echo "Up-to-date"
	else
	    echo "Found some new changes. Pulling latest changes and restarting nginx"
	    git pull origin master
	    sudo service nginx restart
	fi
	sleep 60
done
