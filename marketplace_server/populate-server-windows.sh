#!/bin/bash
MongoDB/Server/3.2/bin/mongoimport.exe --db test --collection items --drop --file test_data.json
