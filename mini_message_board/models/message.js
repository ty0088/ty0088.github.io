const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {type: String, required: [true, 'User name is required'], maxLength: [10, 'User name must be less than 10 characters']},
    text: {type: String, required: [true, 'A text message is required'], maxLength: [100, 'Message too long, it must be less than 100 characters']},
    added: { type: Date, default: Date.now }
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);