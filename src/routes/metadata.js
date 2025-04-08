const express = require('express');
const router = express.Router();
const metaDataController = require('../controllers/metaDataController');


router.post('/', metaDataController.addOrEditMetadata); 
router.get('/', metaDataController.getMetadata); 

module.exports = router;
