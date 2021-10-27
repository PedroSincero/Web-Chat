const connection = require('./connection');

const serialize = (db) => {
  const { timestamp, nickname, message } = db;
  return `${timestamp} - ${nickname}: ${message}`;
};

const findMessages = async () => {
  const db = await connection();
  const messages = await db.collection('messages').find({}).toArray();
  return messages.map(serialize);
};

const addMessage = async (timestamp, nickname, message) => {
  const db = await connection();
  await db.collection('messages').insertOne({ timestamp, nickname, message });
};

module.exports = {
  findMessages,
  addMessage,
};