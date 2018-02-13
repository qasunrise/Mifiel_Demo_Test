/**
 * Amplitude PageObject
 * @module amplitude_demo
 * @see Amplitude
 */

let I;
const c = require('../constants.js');


module.exports = {
  _init() {
    I = actor();
  },

  SignUp(firstName, lastName, emailDemo) {
    I.waitForText('Sign Up', c.timeout, '.signup > a');
    I.click('Sign Up', '.signup > a');
    I.waitForText('First name', c.timeout, '.form-group > label');
    I.fillField('#firstName', firstName);
    I.fillField('#lastName', lastName);
    I.fillField('#email', emailDemo);
    I.click('Get Started Now', '.btn.btn-green');
    I.waitForElement('//span[contains(text(), "Start Exploring")]', c.timeout);
    I.click('//span[contains(text(), "Start Exploring")]');
    I.waitForInvisible('//span[contains(text(), "Start Exploring")]', c.timeout);
  },

};
