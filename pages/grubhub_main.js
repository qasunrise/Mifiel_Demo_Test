/**
 * GrubHub PageObject
 * @module GrubHub_demo
 * @see GrubHubPage
 */

let I;
const c = require('../constants.js');

const page = 'https://www.grubhub.com';

module.exports = {
  _init() {
    I = actor();
  },

  LogIn(user) {
    I.amOnPage(page);
    I.waitForElement('//button[contains(text(), "Sign in")]', c.timeout);
    I.click('//button[contains(text(), "Sign in")]');
    I.wait(3);
    I.waitForElement('//input[@name="email"]', c.timeout);
    I.waitForVisible('.signInForm', c.timeout);
    within('.signInForm', () => {
      I.wait(0.5);
      I.fillField('//input[@name="email"]', user.email);
      I.wait(0.5);
      I.fillField('//input[@name="password"]', user.password);
      I.click('//button/span[contains(text(), "Sign in")]');
    });
    I.waitForElement('//h3[contains(text(), "Your recent")]', c.timeout);
    I.waitForVisible('//span[@class="icon-user mainNavIcon"]', c.timeout);
    I.click('//span[@class="icon-user mainNavIcon"]');
    I.wait(1);
    I.waitForVisible('//ul[@role="menu"]/li/span[contains(text(), "Test")]', c.timeout);
    I.click('//span[@class="icon-user mainNavIcon"]');
  },

  LogOut() {
    I.waitForVisible('//span[@class="icon-user mainNavIcon"]', c.timeout);
    I.click('//span[@class="icon-user mainNavIcon"]');
    I.waitForVisible('//a[contains(text(), "Sign Out")]', c.timeout);
    I.click('//a[contains(text(), "Sign Out")]');
    I.waitForElement('//button[contains(text(), "Sign in")]', c.timeout);
  },

  ChangePassword(password, newPassword) {
    I.waitForElement('//ghs-display-password//a[contains(text(), "Change")]', c.timeout);
    I.click('//ghs-display-password//a[contains(text(), "Change")]');
    I.waitForElement('#currentPassword', c.timeout);
    I.wait(0.5);
    I.fillField('#currentPassword', `${password}`);
    I.wait(0.5);
    I.fillField('#newPassword', `${newPassword}`);
    I.wait(0.5);
    I.fillField('#confirmPassword', `${newPassword}`);
    I.click('//button[contains(text(), "Update password")]');
    I.waitForElement('//div[contains(text(), "Your account was updated.")]', c.timeout);
    I.click('.notification-close.icon-close');
  },

  GoToProfile() {
    I.waitForVisible('//span[@class="icon-user mainNavIcon"]', c.timeout);
    I.click('//span[@class="icon-user mainNavIcon"]');
    I.waitForVisible('//a[contains(text(), "Profile")]', c.timeout);
    I.click('//a[contains(text(), "Profile")]');
    I.waitForElement('//ghs-display-password//a[contains(text(), "Change")]', c.timeout);
  },

  GoToAddresses() {
    I.waitForVisible('//span[@class="icon-user mainNavIcon"]', c.timeout);
    I.click('//span[@class="icon-user mainNavIcon"]');
    I.waitForVisible('//a[contains(text(), "Addresses")]', c.timeout);
    I.click('//a[contains(text(), "Addresses")]');
    I.waitForElement('//a[contains(text(), "+ Add a new address")]', c.timeout);
  },

  AddNewAddresses(userAddress) {
    I.waitForElement('//a[contains(text(), "+ Add a new address")]', c.timeout);
    I.click('//a[contains(text(), "+ Add a new address")]');
    I.waitForVisible('//form[@name="multiLineAddressEntryForm"]', c.timeout);
    within('//form[@name="multiLineAddressEntryForm"]', () => {
      I.wait(0.5);
      I.fillField('//input[@name="address1"]', userAddress.street);
      I.wait(0.5);
      I.fillField('//input[@name="city"]', userAddress.city);
      I.wait(0.5);
      I.fillField('//input[@name="zip"]', userAddress.zip);
      I.click('#address-state');
      I.click(`//option[@value="${userAddress.state}"]`);
      I.wait(0.5);
      I.fillField('//input[@name="phone"]', userAddress.phone);
      I.click('//button[contains(text(), "Submit")]');
    });
    I.waitForElement('//div[contains(text(), "Your new address 685 Broadway was added.")]', c.timeout);
    I.click('.notification-close.icon-close');
    I.waitForElement('//a[contains(text(), "Delete")]', c.timeout);
  },

  RemoveAddresses(userAddress) {
    I.waitForElement(`//div[//div[contains(text(), "${userAddress.street}")]]//a[contains(text(), "Delete")]`, c.timeout);
    I.wait(1);
    I.click(`//div[//div[contains(text(), "${userAddress.street}")]]//a[contains(text(), "Delete")]`);
    I.waitForElement('//a[contains(text(), "Yes")]', c.timeout);
    I.wait(0.5);
    I.click('//a[contains(text(), "Yes")]');
    I.waitForElement('//div[contains(text(), "Your address was deleted")]', c.timeout);
    I.click('.notification-close.icon-close');
  },


  FindRestaurantByAddressAndName(user) {
    I.wait(3);
    I.waitForElement('//ghs-address-input[@id="ghs-start-order-new-address-input"]//input', c.timeout);
    I.wait(0.5);
    I.fillField('//ghs-address-input[@id="ghs-start-order-new-address-input"]//input', user.address);
    I.waitForElement('//ghs-search-autocomplete//input', c.timeout);
    I.wait(0.5);
    I.fillField('//ghs-search-autocomplete//input', user.restaurant);
    I.click('//button/span[contains(text(), "Find food")]');
    I.waitForElement(`//a[@title="${user.restaurant}"]`, c.timeout);
    I.click(`//a[@title="${user.restaurant}"]`);
    I.wait(2);
    I.waitForElement('//div[@itemprop="hasMenuItem"]', c.timeout);
  },

  FindRestaurantByAddress(user) {
    I.wait(3);
    I.waitForElement('//ghs-address-input[@id="ghs-start-order-new-address-input"]//input', c.timeout);
    I.wait(0.5);
    I.fillField('//ghs-address-input[@id="ghs-start-order-new-address-input"]//input', user.address);
    I.waitForElement('//button/span[contains(text(), "Find food")]', c.timeout);
    I.click('//button/span[contains(text(), "Find food")]');
    I.waitForElement('//a/span[contains(text(), "Open Now")]', c.timeout);
    I.click('//a/span[contains(text(), "Open Now")]');
  },

  ChoiseMenuItem(item) {
    I.waitForElement(`//a[@title="${item}"]`, c.timeout);
    I.click(`//a[@title="${item}"]`);
    I.waitForElement('button.menuItemModal-btnSubmit', c.timeout);
  },

  UseFilterByTitle(filter) {
    I.waitForElement(`//*[@title="${filter}"]`, c.timeout);
    I.click(`//*[@title="${filter}"]`);
  },

  UseDeliveryTimeFilter(filter) {
    I.waitForElement(`//*[contains(text(), "${filter}")]`, c.timeout);
    I.click(`//*[contains(text(), "${filter}")]`);
  },

  ChoiceRestaurantFromResults() {
    I.wait(2);
    I.waitForElement('//ghs-search-item[@impressionranky="1"]', c.timeout);
    I.click('//ghs-search-item[@impressionranky="1"]');
    I.waitForElement('//span[contains(text(), "Save this restaurant")]', c.timeout);
  },

  AddItemToBag() {
    I.waitForElement('button.menuItemModal-btnSubmit', c.timeout);
    I.click('button.menuItemModal-btnSubmit');
    I.waitForElement('//div[contains(text(), "Added")]', c.timeout);
  },

  RemoveItemFromBag() {
    I.waitForElement('//span[@class="icon-delete orderItem-remove"]', c.timeout);
    I.click('//span[@class="icon-delete orderItem-remove"]');
    I.waitForElement('//p[contains(text(), "Remove")]', c.timeout);
    I.waitForElement('//button[contains(text(), "Yes")]', c.timeout);
    I.click('//button[contains(text(), "Yes")]');
    I.waitForElement('//div[contains(text(), "Successfully removed item from your bag.")]', c.timeout);
  },
};
