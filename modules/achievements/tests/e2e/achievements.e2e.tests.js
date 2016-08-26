'use strict';

describe('Achievements E2E Tests:', function () {
  describe('Test Achievements page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/achievements');
      expect(element.all(by.repeater('achievement in achievements')).count()).toEqual(0);
    });
  });
});
