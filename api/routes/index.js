import express from 'express';

const router = express.Router();

router.use('/api/v0', require('./api.v0.js'));


module.exports = router;