const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

router.post('/:id/addMarker', controller.addMarker);
router.put('/:id/:marker/updMarker', controller.updMarker);
router.delete('/:id/:marker/removeMarker', controller.removeMarker);
router.get('/:id/allMarkers', controller.allMarkers);

module.exports = router;
