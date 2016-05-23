#!/bin/bash
mongo-linux/bin/mongoimport --db test --collection items --drop --file test_data_stock.json
mongo-linux/bin/mongoimport --db test --collection users --drop --file test_data_users.json
