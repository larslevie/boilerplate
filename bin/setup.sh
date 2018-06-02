#!/bin/sh -e

consul-template \
  -once \
  -template /code/etc/nginx.conf.gotmpl:/etc/nginx/nginx.conf
