const { Router } = require('express');
const { getUser, postUser } = require('../controllers/user.controller');
const { verifyAdmin } = require('../middlewares/verify-admin');

const router = Router();

router.get('/', [verifyAdmin], getUser);
router.post('/', postUser);

module.exports = router;
