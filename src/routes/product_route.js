const { ProductController } = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.fetchAllProduct);
router.get('/:id', ProductController.fetchOneProduct);
router.put('/:id', ProductController.updateOneProduct);
router.delete('/:id', ProductController.deleteOneProduct);

module.exports = router;