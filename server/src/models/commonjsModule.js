
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');
const mongoose = require('mongoose');
const Blog = require('./models/Blog.js'); 

// Exporting functions or variables as needed
module.exports = { express, multer, cloudinary, mongoose, Blog };
