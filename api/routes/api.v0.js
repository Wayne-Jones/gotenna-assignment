import express from 'express';
import {getPhotos, addPhoto} from '../controller/photo';

const router = express.Router();


router.route('/photo')
    .post(addPhoto)
    .get(getPhotos);

// router.route('/id/:id')
//     .get(getPhotoByID)
//     .put(updatePhotoByID)
//     .delete(deletePhotoByID);


module.exports = router;    