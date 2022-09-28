const express = require('express');
const {
  list,
  create,
  update,
  destroy,
  login,
} = require('../controllers/Users');

const router = express.Router();

router.route('/').get(list);
router.route('/').post(create);
router.route('/:id').patch(update);
router.route('/:id').delete(destroy);
router.route('/login').post(login);

module.exports = router;
