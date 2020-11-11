const dotenv = require("dotenv");

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "development" || NODE_ENV === "test") dotenv.config();

const config = {
  db: {
    host: process.env.ZOOX_CHALLENGE_DATABASE_HOST || "localhost",
    port: process.env.ZOOX_CHALLENGE_DATABASE_PORT || 27017,
    database:
      NODE_ENV === "production"
        ? process.env.ZOOX_CHALLENGE_DATABASE_PRODUCTION
        : NODE_ENV === "development"
        ? process.env.ZOOX_CHALLENGE_DATABASE_DEV
        : NODE_ENV === "homolog"
        ? process.env.ZOOX_CHALLENGE_DATABASE_HOMOLOG
        : process.env.ZOOX_CHALLENGE_DATABASE_TEST,
  },
  auth: {
    secret: process.env.ZOOX_CHALLENGE_JWT_SECRET || "secret",
  },
  api: {
    port: NODE_ENV === "production" ? process.env.API_PORT : 9000,
    upload_directory: process.env.ZOOX_CHALLENGE_UPLOAD_DIRECTORY || "/tmp/",
  },
  upload: {
    path: process.env.ZOOX_CHALLENGE_UPLOAD_DIRECTORY || "/tmp",
  },
};

module.exports = config;
