const router = require('express').Router();;
const userController = require('../controllers/userController');

router.get('/getAll', userController.getAllUsers);
router.get('/getUser', userController.getUserById);
router.post('/create', userController.createUser);
router.put('/update', userController.updateUser);
router.delete('/delete', userController.deleteUserById);
router.delete('/deleteMany', userController.deleteUserByIds);

module.exports = router;