const chrome = require("chromedriver");

module.exports = {
  "src_folders" : ["tests"],

  "webdriver" : {
    "start_process": true,
    "server_path": chrome.path,
    "port": 9515
  },

  "test_settings" : {
    "default" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args" : [
            "--headless",
            "window-size=1920,1080"
          ]
        }
      }

    }
  }
}
