#!/bin/bash

mkdir -p dist/.well-known/acme-challenge/
cd dist/.well-known/acme-challenge/
echo "$SSL_CERT_VALUE" > "$SSL_CERT_NAME"