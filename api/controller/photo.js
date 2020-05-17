import Photo from '../model/Photo';

const getAllPhotos = (req, res) => {
    Photo.find({}, (err, photo) =>{
        if(err){
            res.send(err);
        }
        res.json(photo);
    })
};

const addPhoto = (req, res) => {

    Photo.insertMany(req.body, (err, photo) =>{
        if (err){
            res.send(err);
        }
        res.json(photo);
    })
};

module.exports = {getAllPhotos, addPhoto};