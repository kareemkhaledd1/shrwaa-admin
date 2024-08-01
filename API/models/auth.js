const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

authSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

authSchema.set('toJSON', {
    virtuals: true,
});

exports.Admin = mongoose.model('Admin', authSchema)