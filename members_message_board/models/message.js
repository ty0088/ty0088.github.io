const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    postDate: { type: Date, default: Date.now, required: true },
    lastEditDate: { type: Date },
    lastEditBy: { type: Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: Schema.Types.ObjectId, ref: "Message" }],
    isReply: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);