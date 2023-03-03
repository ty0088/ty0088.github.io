const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true, maxLength: 30 },
    description: { type: String, maxLength: 100 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    price: {
        type: Number,
        required: true,
        default: 0,
        set: val => Math.round((val + Number.EPSILON) * 100) / 100, //round price value to 2dp when setting
        get: val => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(val) //return value in currency format £0.00
    },
    qty: {
        type: Number,
        required: true,
        default: 0,
        validate: {
            validator : Number.isInteger, //validate qty is an integer
            message   : 'qty is not an integer value'
        }
    },
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function () {
    return `/item/${this._id}`;
});

// Export model
module.exports = mongoose.model('Item', ItemSchema);