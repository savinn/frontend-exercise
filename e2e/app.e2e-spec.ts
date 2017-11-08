"use strict";

import { browser, element, by } from 'protractor';

describe('frontend-exercise App', () => {
  beforeEach(() => {
    return browser.get('/');
  });

  it('should display title "Productgroep"', () => {
    let pageTitle = element(by.css("app-root h4")).getText();
    expect(pageTitle).toEqual("Productgroep");
  });
});
