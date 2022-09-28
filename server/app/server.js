const express = require('express');
const config = require('./config');
const loaders = require('./loaders');
const { CategoriesRoutes } = require('./routes');

config();
loaders();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.APP_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  app.use('/categories', CategoriesRoutes);
});
