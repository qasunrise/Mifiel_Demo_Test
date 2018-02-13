/* global Helper */

function withStrictLocator(locator) {
  if (!locator) return null;
  if (typeof locator !== 'object') return locator;
  const key = Object.keys(locator)[0];
  const value = locator[key];

  // locator.toString = () => `{${key}: '${value}'}`;

  switch (key) {
    case 'by':
    case 'xpath':
      return value;
    case 'css':
      return value;
    case 'id':
      return `#${value}`;
    case 'name':
      return `[name="${value}"]`;
    default:
      return null;
  }
}

class Init extends Helper {
  // before/after hooks
  // _before() {
  // }
  // _after() {
  // }

  // add custom methods here
  // If you need to access other helpers
  // use: this.helpers['helperName']

  // custom method
  // move an object (for rz-pointer)
  // use I.moveToObject(selector,xoffset,yoffset)
  moveToObject(selector, x, y) {
    return this.helpers.WebDriverIO.browser.moveToObject(withStrictLocator(selector)).buttonDown()
      .moveToObject(withStrictLocator(selector), x, y).buttonUp();
  }

  grabNumberOfElements(locator) {
    return this.helpers.WebDriverIO.browser.elements(locator).then((res) => {
      if (!res.value) {
        return 0;
      }
      return res.value.length;
    });
  }

  scrollElementIntoView(selector) {
    this.helpers.WebDriverIO.browser.execute((elSelector) => {
      /* global document, XPathResult */
      try {
        document.evaluate(elSelector, document, null,
          XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.scrollIntoView();
      } catch (err) {
        document.querySelector(elSelector).scrollIntoView();
      }
    }, selector);
  }

  waitForAngularLoad(timeout) {
    // this.helpers.WebDriverIO.browser.timeoutsAsyncScript(timeout * 1000);
    this.helpers.WebDriverIO.browser.timeouts('script', timeout * 1000);
    return this.helpers.WebDriverIO.browser.executeAsync((done) => {
      /* global window */
      if (window.angular) {
        const wait = () => {
          const pR = window.angular.element(window.document).injector().get('$http').pendingRequests.length;
          if (pR === 0) {
            done(true);
          } else {
            setTimeout(wait, 1);
          }
        };
        wait();
      } else {
        done(false);
      }
    }); // returns promise
  }
}

module.exports = Init;
