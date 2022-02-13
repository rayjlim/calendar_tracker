#!/usr/bin/env bash

echo "Running pre-commit hook"
cd backend
composer run test

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Tests must pass before commit!"
 exit 1
fi

# composer run lint

# $? stores exit value of the last command
# if [ $? -ne 0 ]; then
#  echo "Lint must pass before commit!"
#  exit 1
# fi
