const express = require('express');
const authenticate = require('../middlewares/authenticate');
const {
  list,
  create,
  update,
  destroy,
  login,
} = require('../controllers/Users');

const router = express.Router();

router.route('/').get(authenticate, list);
router.route('/').post(create);
router.route('/:id').patch(authenticate, update);
router.route('/:id').delete(authenticate, destroy);
router.route('/login').post(login);

module.exports = router;
