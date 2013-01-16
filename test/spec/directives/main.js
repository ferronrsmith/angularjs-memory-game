/*global describe, beforeEach, inject, module, angular, document, it, expect, $, navigator, window, spyOn */
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

    it('opacity class should be added after 2 clicks', function () {
        element.find('div').click();
        element.find('div').click();
        expect(element.find('div').eq(0).find('img')).toHaveClass('opacity');
    });

    it('should increment found if value matches', function () {
        window.imgopened = 'image/01.jpg';
        window.found = 9;
        element.find('div').eq(0).click();
        expect(window.found).toEqual(10);
    });

    it('should reset imgopened & boxopened after timeout - $browser.defer.flush', inject(function ($timeout, $browser) {
        window.imgopened = 'image/02.jpg';
        window.boxopened = element.find('div').eq(1);
        element.find('div').eq(0).click();
        expect(window.imgopened).not.toEqual(window.currentopened);

        $browser.defer.flush();

        expect(function () {
            $browser.defer.flush();
        }).toThrow('No deferred tasks to be flushed');
        expect(window.imgopened).toEqual('');
        expect(window.boxopened).toEqual('');
    }));

    it('should reset imgopened & boxopened after timeout - $timeout.flush ', inject(function ($timeout, $rootScope) {
        var applySpy = spyOn($rootScope, '$apply').andCallThrough();
        window.imgopened = 'image/02.jpg';
        element.find('div').eq(0).click();
        expect(window.imgopened).not.toEqual(window.currentopened);

        window.boxopened = element.find('div').eq(1);
        expect(applySpy).not.toHaveBeenCalled();
        $timeout.flush();

        expect(applySpy).toHaveBeenCalled();
        applySpy.reset();

        expect(window.imgopened).toEqual('');
        expect(window.boxopened).toEqual('');
    }));

    it('window should be mapped to the global window', inject(function ($window) {
        // if $window && global window are the same then window.location.reload == $window.location.reload
        expect($window).toBe(window);
        expect($window.location.reload).toBe(window.location.reload);
    }));

    it('should call reset function', inject(function ($compile) {
        var reset = angular.element('<a class="link" reset-game>Reset</a>');

        $compile(reset)(scope);
        scope.$apply();

        expect(reset.html()).toEqual('Reset');
        expect(reset.click().html()).toEqual('Reset');


    }));
});
