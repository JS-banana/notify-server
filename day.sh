#!/bin/bash

name="js-banana"
echo $name

echo "BACKUP DATE:" $(date +"%Y-%m-%d %H:%M:%S")

DATE=`date '+%Y%m%d-%H%M%S'`
echo $DATE

LogNameDATE=`date '+%Y%m%d'`

echo "UPDATE DATE:" $(date +"%Y-%m-%d %H:%M:%S") >> day.txt
