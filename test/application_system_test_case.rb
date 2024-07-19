require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, screen_size: [1400, 1400]
  # use firefox??
  # Selenium::WebDriver::Firefox::Service.driver_path = "/usr/bin/firefox"
  # driver = Selenium::WebDriver.for :firefox

  # Selenium::WebDriver::Chrome::Service.driver_path = "/usr/bin/google-chrome"
  # driver = Selenium::WebDriver.for :chrome

  # driver.manage.timeouts.implicit_wait = 20
  # driver.navigate.to("https://www.google.com/")
end
