const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    addDate: { type: Date, default: Date.now },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Message', MessageSchema);