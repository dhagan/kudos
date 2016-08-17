'use strict';

describe('Kudos E2E Tests:', function () {
  describe('Test Kudos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/kudos');
      expect(element.all(by.repeater('kudo in kudos')).count()).toEqual(0);
    });
  });
});
