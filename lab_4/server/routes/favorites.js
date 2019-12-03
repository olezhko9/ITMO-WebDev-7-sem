const favoritesRouter = require('express').Router()

favoritesRouter.get('/', (req, res) => {
  req.app.locals.db.collection('favorites').find({}).toArray((err, result) => {
    if (err) return console.log(err);
    res.status(200).send(result)
  })
})

favoritesRouter.post('/', (req, res) => {
  const favoriteCity = {
    name: req.body.name
  }
  req.app.locals.db.collection('favorites').insertOne(favoriteCity, (err, result) => {
    if (err) return console.log(err);
    res.status(200).send()
  })
})

favoritesRouter.delete('/', (req, res) => {
  const favoriteCity = {
    name: req.body.name
  }
  req.app.locals.db.collection('favorites').deleteOne(favoriteCity, (err, result) => {
    if (err) return console.log(err);
    res.status(200).send()
  })
})

module.exports = favoritesRouter;
