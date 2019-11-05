const mocha = require('mocha');
const sinon = require('sinon');
const jsdom = require('jsdom').JSDOM;
const expect = require('chai').expect;
const simulant = require('jsdom-simulant')
const jQuery = require('jquery')


describe('City weather', function () {

  before(function () {
    return jsdom.fromFile('./build/index.html')
      .then((dom) => {
        global.window = dom.window;
        global.document = window.document;
        window.$ = window.jQuery = jQuery
      })
  })

  it('button should has loading state on click', async function () {
    let form = document.querySelector('form');

    form.addEventListener('submit', async function (event) {
      event.preventDefault()
      document.getElementById('search-btn').classList.add('loading')

      setTimeout(() => {
        document.getElementById('search-btn').classList.remove('loading')
      }, 2000)
    })

    simulant.fire(form, simulant(window, 'submit'));
    const submitButton = document.getElementById('search-btn')
    console.log(submitButton.outerHTML);

    expect(submitButton.classList.contains('loading')).to.be.true;

  });
})
