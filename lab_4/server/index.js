const express = require('express');
const cors = require('cors');

const app = express();
const weatherRouter = require('./routes/weather')
const favoritesRouter = require('./routes/favorites')

app.use(cors());
app.use("/weather", weatherRouter)
app.use("/favorites", favoritesRouter)

app.listen(9000, () => console.log(`Server started on port 9000`));
