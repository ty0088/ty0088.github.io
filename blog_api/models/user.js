const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    display_name: { type: String, required: true },
    password: { type: String, required: true},
    email: { type: String, required: true},
    join_date: { type: Date, default: Date.now },
    user_type: { 
        type: String,
        required: true,
        enum: ["Reader", "Author", "Admin"],
        default: "Reader"
    }
});

// Virtual URL
UserSchema.virtual("url").get(function () {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);