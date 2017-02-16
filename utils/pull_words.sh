#!/bin/sh

for level in 1 2 3 4 5 6 7 8 9 10
do
	echo ${level}
	curl http://linkedin-reach.hagbpyjegb.us-west-2.elasticbeanstalk.com/words?difficult=${level} > utils/words${level}.txt
done

echo "Successfully pulled words down from /words"
