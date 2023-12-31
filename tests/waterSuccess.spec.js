// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Water_Success', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Water_Success', async function() {
    await driver.get("http://localhost:3000/dashboard/garden")
    await driver.manage().window().setRect({ width: 1552, height: 840 })
    await driver.findElement(By.css(".btn:nth-child(4)")).click()
  })
})
