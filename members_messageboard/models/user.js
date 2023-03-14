const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, maxLength: 10 },
    password: { type: String, required: true, minLength: 1 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    joinDate: { type: Date, default: Date.now },
    membershipStatus: { 
        type: String,
        required: true,
        enum: ["Member", "Banned", "Deleted"],
        default: "Member"
    }
});

// Virtual URL
UserSchema.virtual("url").get(function () {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);