const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    text: { type: String, required: true },
    tite: { type: String, maxLength: 30 },
    private: { type: Boolean, default: false, required: true },
    post_date: { type: Date, default: Date.now, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lastEditDate: { type: Date },
    lastEditBy: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: function() {
            console.log(this.lastEditDate);
            return this.lastEditDate;
        }
    },
});

PostSchema.plugin(mongoosePaginate);

// Virtual URL
PostSchema.virtual("url").get(function () {
    return `/user/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);