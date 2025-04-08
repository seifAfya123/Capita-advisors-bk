const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactUsController');
const authMiddleware = require('../middlewares/authMiddleware');

// ! ______Admin side ________
router.get('/', authMiddleware, contactController.getContactRequests);
router.patch('/:requestId/star', authMiddleware, contactController.toggleStarredStatus);
// ! ______ Client side ________
router.post('/', contactController.sendContactRequest);

module.exports = router;

