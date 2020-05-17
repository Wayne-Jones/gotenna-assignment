import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    url: {
        type: String,
        required: true,
    },
    photoID: {
        type: String, 
        required: true, 
        unique: true,
    }, 
    width:  {
        type: String,
        required: true,
    },
    height:  {
        type: String,
        required: true,
    },
    greyscale: {
        type: Boolean,
        default: false,
    },
});

const PhotoModel = mongoose.model('Photo', schema);
module.exports = PhotoModel;