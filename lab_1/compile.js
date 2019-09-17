const pug = require('pug/lib');
const fs = require('fs');

const componentsDir = './src/components/'

function compileComponents(componentsDir) {
  fs.readdirSync(componentsDir).forEach(file => {
    const functionName = 'render' + file.charAt(0).toUpperCase() + file.slice(1, file.lastIndexOf('.'))

    let compiledFunction = pug.compileFileClient(
      `./src/components/${file}`, {
        name: functionName
      });
    compiledFunction += `export default ${functionName}`

    fs.writeFileSync(`./src/components/${file.slice(0, file.lastIndexOf('.'))}.js`, compiledFunction);
  });
}

compileComponents(componentsDir)
