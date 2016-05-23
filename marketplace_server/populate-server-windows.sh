#!/bin/bash
MongoDB/Server/3.2/bin/mongoimport.exe --db test --collection items --drop --jsonArray test_data_stock.json
MongoDB/Server/3.2/bin/mongoimport.exe --db test --collection users --drop --jsonArray test_data_users.json
