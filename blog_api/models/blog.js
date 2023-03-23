const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    text: { type: String, required: true },
    tite: { type: String, maxLength: 30 },
    private: { type: Boolean, default: false },
    post_date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual URL
BlogSchema.virtual("url").get(function () {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('Blog', BlogSchema);