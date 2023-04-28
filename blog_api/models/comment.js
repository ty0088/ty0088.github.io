const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String, required: true },
    post_date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    lastEditDate: { type: Date },
    lastEditBy: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: function() {
            return this.lastEditDate;
        }
    },
});

module.exports = mongoose.model('Comment', CommentSchema);