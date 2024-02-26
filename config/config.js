
// import dotenv from 'dotenv';

const dotenv = require('dotenv');


dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const config = {
    env: process.env.NODE_ENV,
    mongoose: {
      url: process.env.MONGOSRV,
    }
};

module.exports = config;