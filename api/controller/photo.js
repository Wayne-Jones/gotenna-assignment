import Photo from '../model/Photo';

const getPhotos = (req, res) => {
    
    const paginationLimit = req.query.pagination ? parseInt(req.query.pagination) : 20;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const widthLower = req.query.widthLower ? parseInt(req.query.widthLower) : 0;
    const widthHigher = req.query.widthHigher ? parseInt(req.query.widthHigher) : Number.MAX_SAFE_INTEGER;
    const heightLower = req.query.heightLower ? req.query.heightLower : 0;
    const heightHigher = req.query.heightHigher ? req.query.heightHigher : Number.MAX_SAFE_INTEGER;

    Photo.find({ width: { $gte: widthLower, $lte: widthHigher }, height: { $gte: heightLower, $lte: heightHigher } }, (err, photo) =>{
        if(err){
            res.send(err);
        }
        res.json(photo);
    })
    .skip((page - 1) * paginationLimit)
    .limit(paginationLimit)
};

const modifyPhoto = (req, res) => {
    
    const greyscale = (req.query.greyscale ==  'true') ? true : false;

    Photo.updateMany({greyscale: !greyscale}, {$set: {greyscale: greyscale}}, (err, photo) =>{
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

const getPhotoByUID = (req, res) => {

    Photo.find({_id: req.params.id}, (err, photo) =>{
        if (err){
            res.send(err);
        }
        res.json(photo);
    })
};

module.exports = {getPhotos, addPhoto, getPhotoByUID, modifyPhoto};