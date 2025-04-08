const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.post('/', serviceController.createService);
router.put('/:serviceId', serviceController.updateService);
router.delete('/:serviceId', serviceController.deleteService);
router.get('/', serviceController.getAllServices);
router.get('/:serviceId', serviceController.getServiceDetails);

module.exports = router;
