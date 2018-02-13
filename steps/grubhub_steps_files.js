const c = require('../constants.js');

module.exports = () => actor({
  // Define custom steps here, use 'this' to access default methods of I.
  // It is recommended to place a general 'login' function here.

  LogIn(user) {
    this.amOnPage('https://www.grubhub.com');
    this.waitForElement('//button[contains(text(), "Sign in")]', c.timeout);
    this.click('//button[contains(text(), "Sign in")]');
    this.wait(3);
    this.waitForElement('//input[@name="email"]', c.timeout);
    this.waitForVisible('.signInForm', c.timeout);
    within('.signInForm', () => {
      this.wait(0.5);
      this.fillField('//input[@name="email"]', `${user.email}`);
      this.wait(0.5);
      this.fillField('//input[@name="password"]', `${user.password}`);
      this.click('//button/span[contains(text(), "Sign in")]');
    });
    this.waitForElement('//h3[contains(text(), "Your recent")]', c.timeout);
    this.waitForVisible('//span[@class="icon-user mainNavIcon"]', c.timeout);
    this.click('//span[@class="icon-user mainNavIcon"]');
    this.wait(1);
    this.waitForVisible('//ul[@role="menu"]/li/span[contains(text(), "Test")]', c.timeout);
    this.click('//span[@class="icon-user mainNavIcon"]');
  },

  LogOut() {
    this.waitForVisible('//span[@class="icon-user mainNavIcon"]', c.timeout);
    this.click('//span[@class="icon-user mainNavIcon"]');
    this.waitForVisible('//a[contains(text(), "Sign Out")]', c.timeout);
    this.click('//a[contains(text(), "Sign Out")]');
    this.waitForElement('//button[contains(text(), "Sign in")]', c.timeout);
  },

  ChangePassword(password, newPassword) {
    this.waitForElement('//ghs-display-password//a[contains(text(), "Change")]', c.timeout);
    this.click('//ghs-display-password//a[contains(text(), "Change")]');
    this.waitForElement('#currentPassword', c.timeout);
    this.wait(0.5);
    this.fillField('#currentPassword', `${password}`);
    this.wait(0.5);
    this.fillField('#newPassword', `${newPassword}`);
    this.wait(0.5);
    this.fillField('#confirmPassword', `${newPassword}`);
    this.click('//button[contains(text(), "Update password")]');
    this.waitForElement('//div[contains(text(), "Your account was updated.")]', c.timeout);
    this.click('.notification-close.icon-close');
  },
});
