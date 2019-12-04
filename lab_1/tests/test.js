describe('Weather page', function() {

  before(function(browser, done) {
    browser.url('http://localhost:8080/')
    done();
  });

  it('title should be correct', function (browser) {
    browser
      .expect.title().to.contain('Web Dev Lab 1')
  });

  it('search button has loading state after click', function (browser) {
    browser.expect.element('#search-btn').to.be.present;
    browser
      .click('#search-btn')
      .expect.element('#search-btn').to.have.property('classList').contain('loading')
  })

  it('should display weather data for entered city', function (browser) {
    browser.expect.element('#city-input').to.be.present;
    const city = 'Moscow'
    browser
      .setValue('#city-input', city)
      .click('#search-btn');

    browser.expect.element('.weather-component h3').text.to.contain(city);
    browser.waitForElementVisible('.weather-component .temperature_now')
    browser.expect.element({selector: '.weather-component .temperature_now', index: 0}).text.to.match(/[-+\d]+ ℃/);
    browser.expect.elements(".weather-component .detail").count.to.be.equal(3)
  })

  it('should display error text on bad city', function (browser) {
    browser.expect.element('#city-input').to.be.present;
    const city = '12345678'
    browser
      .setValue('#city-input', city)
      .click('#search-btn');

    browser.expect.element({selector: '.weather-component p', index: 0}).to.be.visible;
  })

  it('weather component is closable', function (browser) {
    browser.url('http://localhost:8080/')

    const city = 'Moscow'
    browser
      .setValue('#city-input', city)
      .click('#search-btn');

    browser.expect.elements('.weather-component').count.to.be.equal(1);
    browser.click('.weather-component span.close');
    browser.expect.elements('.weather-component').count.to.be.equal(0);
  })

});
