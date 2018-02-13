const c = require('../constants.js');

const page = 'https://www.mifiel.com/en';
const user = {
  email: 'cnw03484@ckoie.com',
  password: 'Password1',
};

Feature('Mifiel Demo Test');

Scenario('User Can LogIn', (I) => {
  I.amOnPage(page);
  I.waitForElement('a.btn-login', c.timeout);
  I.click('a.btn-login');
  I.waitForElement('input[name="email"]', c.timeout);
  I.fillField('input[name="email"]', user.email);
  I.waitForElement('input[name="password"]', c.timeout);
  I.fillField('input[name="password"]', user.password);
  I.waitForEnabled('button[type="submit"]', c.timeout);
  I.click('button[type="submit"]');
  I.waitForVisible('ul#links', c.timeout);
});

Scenario('User Can Manage Email Aliases', (I) => {
  I.amOnPage(page);
  I.waitForElement('a.btn-login', c.timeout);
  I.click('a.btn-login');
  I.waitForElement('input[name="email"]', c.timeout);
  I.fillField('input[name="email"]', user.email);
  I.waitForElement('input[name="password"]', c.timeout);
  I.fillField('input[name="password"]', user.password);
  I.waitForEnabled('button[type="submit"]', c.timeout);
  I.click('button[type="submit"]');
  I.waitForVisible('ul#links', c.timeout);
  I.waitForElement('li.plain-dropdown', c.timeout);
  I.click('li.plain-dropdown');
  I.waitForElement('ul.dropdown-menu', c.timeout);
  I.waitForVisible('ul.dropdown-menu', c.timeout);
  I.waitForVisible('//li[a[@ui-sref="user.profile.aliases"]]', c.timeout);
  I.click('//li[a[@ui-sref="user.profile.aliases"]]');
  I.waitForElement('div#aliases-header', c.timeout);
  I.waitForEnabled('button.btn-action', c.timeout);
  I.click('button.btn-action');
  I.waitForVisible('input[name="email"]', c.timeout);
  I.waitForEnabled('input[name="email"]', c.timeout);
  const emailForAlias = 'lgo39895@cjpeg.com';
  I.fillField('input[name="email"]', emailForAlias);
  I.waitForEnabled('button[type="submit"]', c.timeout);
  I.click('button[type="submit"]');
  I.waitForElement('tr.warning', c.timeout);
  I.waitForElement('//a[contains(@ng-click, "deleteAlias")]', c.timeout);
  I.click('//a[contains(@ng-click, "deleteAlias")]');
  I.waitForVisible('div.modal-content', c.timeout);
  I.waitForElement('div.modal-footer', c.timeout);
  I.waitForElement('button.btn-default', c.timeout);
  I.click('button.btn-default');
});