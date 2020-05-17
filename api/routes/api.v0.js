import express from 'express';
import {getAllPhotos, addPhoto} from '../controller/photo';

const router = express.Router();


router.route('/id')
    .post(addPhoto)
    .get(getAllPhotos);

// router.route('/id/:id')
//     .get(getPhotoByID)
//     .put(updatePhotoByID)
//     .delete(deletePhotoByID);


module.exports = router;    