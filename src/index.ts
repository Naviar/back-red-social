import app from './app';
import 'reflect-metadata';
const server = new app();

server.startServer(() => console.log(`server on port ${3000}`));