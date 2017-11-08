'use strict';

import { browser, element, by, protractor } from 'protractor/built';

describe('frontend-exercise App', () => {
  beforeEach(() => {
    return browser.get('/');
  });

  it('should display title \'Productgroep\'', () => {
    const pageTitle = element(by.css('app-root h4')).getText();
    expect(pageTitle).toEqual('Productgroep');
  });
});
