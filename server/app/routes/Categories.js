const express = require('express');
const {
  list,
  create,
  update,
  destroy,
} = require('../controllers/Categories');

const router = express.Router();

router.route('/').get(list);
router.route('/').post(create);
router.route('/:id').patch(update);
router.route('/:id').delete(destroy);

module.exports = router;
