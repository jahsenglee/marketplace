#!/bin/bash
mongoimport --db test --collection items --drop --file test_data_stock.json
mongoimport --db test --collection users --drop --file test_data_users.json
