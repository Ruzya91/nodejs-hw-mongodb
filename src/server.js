import dotenv from 'dotenv';
dotenv.config();
import dbInit from './db/initMongoConnection.js';
import app from './index.js';
import mongoose from 'mongoose';

const port = process.env.SERVER_PORT || 3000;
console.log('1');
let server;

async function startServer() {
  try {
    await dbInit();

    server = app.listen(port, () =>
      console.log(` Contacts API listening on port ${port}... `),
    );
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

startServer();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION');
  console.log(err.name, err.message);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
      mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    });
  } else {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  }
});
