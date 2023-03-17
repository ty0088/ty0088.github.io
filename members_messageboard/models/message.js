const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postDate: { type: Date, default: Date.now },
    lastEditDate: { type: Date, default: null },
    lastEditBy: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);