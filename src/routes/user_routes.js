const { UserController } = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.fetchAllUser);
router.get('/:id', UserController.fetchOneUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;