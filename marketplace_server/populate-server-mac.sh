#!/bin/bash
mongoimport --db test --collection items --drop --jsonArray test_data_stock.json
mongoimport --db test --collection users --drop --jsonArray test_data_users.json
