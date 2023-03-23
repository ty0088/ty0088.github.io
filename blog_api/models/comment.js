const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: { type: String, required: true },
    post_date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
});

// Virtual URL
CommentSchema.virtual("url").get(function () {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('Comment', CommentSchema);