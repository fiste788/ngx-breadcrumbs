#!/usr/bin/env bash

#yarn unlink ngx-breadcrumbs

cd build/ngx-breadcrumbs
#yarn unlink
npm link
cd ../..

npm link ngx-breadcrumbs


