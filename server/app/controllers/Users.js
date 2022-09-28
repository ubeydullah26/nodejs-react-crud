const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const list = async (req, res) => {
  await User.findAll()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.status(error);
    });
};

const create = async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  await User.create(req.body)
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

  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.send({ message: 'id is not found' });
  }

  await User.update(req.body, {
    where: {
      id: req.params.id,
    },
    returning: true,
  })
    .then(async () => {
      await User.findByPk(req.params.id)
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

  const user = await User.findByPk(req.params.id);
  if (!user) {
    return res.send({ message: 'id is not found' });
  }

  await User.destroy({
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

const login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
    raw: true,
    nest: true,
  });
  if (user) {
    const validPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (validPassword) {
      delete user.password;
      const accessToken = jwt.sign(
        { name: user.email, ...user },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '1w' }
      );
      const refreshToken = jwt.sign(
        { name: user.email, ...user },
        process.env.JWT_REFRESH_SECRET
      );
      return res.send({
        ...user,
        tokens: {
          accessToken,
          refreshToken,
        },
      });
    }
    return res.status(401).send({ error: 'Unauthorized' });
  }
  return res
    .status(404)
    .send({ error: 'Email or password not correct!' });
};

module.exports = {
  list,
  create,
  update,
  destroy,
  login,
};
