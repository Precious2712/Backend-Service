const mongoose = require('mongoose');
const { Schema } = mongoose;


const subMenuSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        image: {
            type: String,
            required: true
        }
    },
);


const menuSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        subMenu: [subMenuSchema]
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Menu', menuSchema);