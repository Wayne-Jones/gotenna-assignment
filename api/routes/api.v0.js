import express from 'express';
import {getPhotos, addPhoto, getPhotoByUID, modifyPhoto} from '../controller/photo';

const router = express.Router();


router.route('/photo')
    .post(addPhoto)
    .get(getPhotos)
    .patch(modifyPhoto);

router.route('/photo/:id')
    .get(getPhotoByUID);

// router.route('/id/:id')
//     .get(getPhotoByID)
//     .put(updatePhotoByID)
//     .delete(deletePhotoByID);


module.exports = router;    