const mongoose = require('mongoose');

const item = mongoose.model('Items',
{
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: Array,
        required: false,
        trim: true
    },
    amount: {
        type: Array,
        required: false,
        trim: true
    },
    texture: {
        type: String,
        required: true,
        trim: true
    },
    ability: {
        type: String,
        required: false,
        trim: true
    }
})

module.exports = item;