#!/bin/bash

# Due to a bug in --output-format csv in yq that adds erroneous spaces, we have
# to weirdly invoke it twice like this.
CSV=$(yq --expression ".* | map .targetUrl" tests/hidden/hidden.yml | yq --output-format csv)

IFS=',' read -r -a urlArray <<< "$CSV"

for url in "${urlArray[@]}"
do
  echo "::add-mask::$url"
done
