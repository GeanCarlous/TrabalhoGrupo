const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');
const upload = require('../middleware/upload');

router.post('/', upload.single('file'), materialController.uploadMaterial);
router.get('/', materialController.getAllMaterials);

module.exports = router;