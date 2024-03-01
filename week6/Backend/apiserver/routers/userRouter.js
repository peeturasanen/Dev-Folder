const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getUsers } = require('../controllers/userController');
const { requireAuth, admin } = require('../middleware/requireAuth');

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get("/", requireAuth, admin, getUsers);

module.exports = router;