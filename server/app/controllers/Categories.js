const Category = require('../models/Categories');

const list = async (req, res) => {
  await Category.findAll()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(error);
    });
};

const create = async (req, res) => {
  await Category.create(req.body)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.send(error);
    });
};

const update = async (req, res) => {
  if (!req.params?.id) {
    return res.send({ message: 'id is required' });
  }

  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.send({ message: 'id is not found' });
  }

  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(async () => {
      await Category.findByPk(req.params.id)
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((error) => {
      res.send(error);
    });
};

const destroy = async (req, res) => {
  if (!req.params?.id) {
    return res.send({ message: 'id is required' });
  }

  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.send({ message: 'id is not found' });
  }

  await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send({ message: 'delete is success' });
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports = {
  list,
  create,
  update,
  destroy,
};
