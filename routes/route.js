const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', controller.test);

router.post('/register', controller.register);
router.get('/:id', controller.login);
router.post('/:id/addMarker', controller.addMarker);
// router.put('/:id/updMarker', controller.updMarker);
// router.delete('/:id/removeMarker', controller.removeMarker);
// router.get('/:id/allMarkers', controller.allMarkers)

module.exports = router;
