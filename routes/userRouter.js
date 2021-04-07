const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')

router.post('/addMarker', controller.addMarker);
router.put('/:id/updMarker', controller.updMarker);
router.delete('/:id/removeMarker', controller.removeMarker);
router.get('/:id/allMarkers', controller.allMarkers)

module.exports = router;