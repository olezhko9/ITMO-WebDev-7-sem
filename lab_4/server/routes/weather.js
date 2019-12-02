const weatherRouter = require('express').Router()

weatherRouter.get("/", (req, res) => {
  res.send("Список товаров");
});

module.exports = weatherRouter;
