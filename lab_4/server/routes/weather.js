const weatherRouter = require('express').Router()

weatherRouter.get("/", (req, res) => {
  console.log(req.query.city);
  res.send("Weather");
});

weatherRouter.get("/coordinates", (req, res) => {
  console.log(req.query.lat);
  console.log(req.query.long);
  res.send('Coordinates')
})

module.exports = weatherRouter;
