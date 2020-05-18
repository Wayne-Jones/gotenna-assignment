import Photo from '../model/Photo';

const getPhotos = (req, res) => {
    
    const paginationLimit = req.query.pagination ? parseInt(req.query.pagination) : 20;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    Photo.find({}, (err, photo) =>{
        if(err){
            res.send(err);
        }
        res.json(photo);
    })
    .skip((page - 1) * paginationLimit)
    .limit(paginationLimit)
};

const addPhoto = (req, res) => {

    Photo.insertMany(req.body, (err, photo) =>{
        if (err){
            res.send(err);
        }
        res.json(photo);
    })
};

module.exports = {getPhotos, addPhoto};