const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require("dotenv").config();
const http = require("http");
const { neon } = require("@neondatabase/serverless");

const router = express.Router();
const prisma = new PrismaClient({
    datasources: {
        db: {
          url: process.env.DATABASE_URL
        },
      },
});

// 