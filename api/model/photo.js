import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    url: {
        type: String,
        required: true,
    },
    photoID: {
        type: Number, 
        required: true, 
    }, 
    width:  {
        type: Number,
        required: true,
    },
    height:  {
        type: Number,
        required: true,
    },
    greyscale: {
        type: Boolean,
        default: false,
    },
});

const PhotoModel = mongoose.model('Photo', schema);
module.exports = PhotoModel;