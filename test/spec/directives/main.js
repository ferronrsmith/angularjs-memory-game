/*global describe, beforeEach, inject, module, angular, document, it, expect, $, navigator */
describe('Testing OpenCard Directive', function () {
    "use strict";
    var element, compile, scope, rootElement;

    beforeEach(module('testGameApp'));

    beforeEach(inject(function ($compile, $rootScope) {
        scope = $rootScope.$new();
        angular.extend(scope, {
            cards : [
                {"card": "image/01.jpg"}, {"card": "image/02.jpg"}, {"card": "image/03.jpg"}]
        });
        compile = $compile;
        element = angular.element('<div id="boxcard"><div ng-repeat="card in cards" open-card>' +
            '<img ng-src="{{ card.card }}" ng-hide="true"/>' +
            '</div></div>');

        $compile(element)(scope);
        scope.$apply();

    }));


    it('should have n image tags', function () {
        expect(element.find('img').length).toEqual(3);
    });

    it('scope list should match img src attribute properties', function () {
        expect(element.find('img')).toHaveMatchingAtrr('src', scope.cards);
    });

    it('should set src when repeater iterates', function () {
        expect(element.find('div').find('img').eq(0)).toHaveAttr('src', 'image/01.jpg');
        expect(element.find('div').find('img').eq(1)).toHaveAttr('src', 'image/02.jpg');
        expect(element.find('div').find('img').eq(2)).toHaveAttr('src', 'image/03.jpg');
    });

    it('image should display should be inline when clicked', function () {
        var attr = {display: 'inline'};
        if (/[Cc]hrome/.test(navigator.userAgent)) {
            attr.display = 'inline-block';
        }
        expect(element.find('div').click().eq(0).find('img')).toHaveCss(attr);
    });

    it('should ...', function () {
        element.find('div').click();
        element.find('div').click();
        expect(element.find('div').eq(0).find('img')).toHaveClass('opacity');
    });

    it('should ...', function () {
        element.find('div').click();
        expect(element.find('div').eq(0).find('img')).not.toHaveClass('opacity');
    });

});
