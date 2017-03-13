#!/usr/bin/env node

var express = require('express')
var router = express.Router()

var nano = require('nano')('http://localhost:5984')

nano.db.create('ad')
nano.db.create('user')