const express = require('express');
const authenticate = require('../middlewares/authenticate');
const {
  list,
  create,
  update,
  destroy,
} = require('../controllers/Categories');

const router = express.Router();

router.route('/').get(authenticate, list);
router.route('/').post(authenticate, create);
router.route('/:id').patch(authenticate, update);
router.route('/:id').delete(authenticate, destroy);

module.exports = router;
