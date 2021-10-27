const messageModel = require('../models/messageModel');

const findAll = async () => {
    const result = await messageModel.findMessages();
    return result;
};

const add = async (timestamp, nickname, message) => {
    await messageModel.addMessage(timestamp, nickname, message);
};

module.exports = {
    findAll,
    add,
};
