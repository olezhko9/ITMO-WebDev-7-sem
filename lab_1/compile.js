const pug = require('pug/lib');
const fs = require('fs');

const compiledFunction = pug.compileFileClient('./src/components/weather.pug', {name: 'renderWeather'});

fs.writeFileSync("./src/js/renderWeather.js", compiledFunction);
