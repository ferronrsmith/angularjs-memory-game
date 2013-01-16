/*jslint nomen: true*/
/*global describe, beforeEach, inject, module, angular, document, it, expect, _*/
describe('JSON Loaded successfully', function () {
    "use strict";
    beforeEach(module('testGameApp'));

    var MainCtrl, scope, $httpBackend;

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('scripts/json/img.json').respond(
            [
                {"card": "image/01.jpg"}, {"card": "image/02.jpg"}, {"card": "image/03.jpg"}, {"card": "image/04.jpg"},
                {"card": "image/05.jpg"}, {"card": "image/06.jpg"}, {"card": "image/07.jpg"}, {"card": "image/08.jpg"},
                {"card": "image/09.jpg"}, {"card": "image/10.jpg"}, {"card": "image/01.jpg"}, {"card": "image/02.jpg"},
                {"card": "image/03.jpg"}, {"card": "image/04.jpg"}, {"card": "image/05.jpg"}, {"card": "image/06.jpg"},
                {"card": "image/07.jpg"}, {"card": "image/08.jpg"}, {"card": "image/09.jpg"}, {"card": "image/10.jpg"}
            ]
        );
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should load json data into controller using xhr', function () {
        expect(scope.cards).toBeUndefined();
        $httpBackend.flush();
        expect(scope.cards).toBeDefined();
        expect(scope.cards.length).toEqual(20);
    });

    it('items in the returned array should be shuffled', function () {
        var cardDup = [], _shuffled;
        expect(scope.cards).toBeUndefined();
        $httpBackend.flush();
        expect(scope.cards).toBeDefined();
        expect(scope.shuffle).toBeDefined();
        expect(scope.shuffle).toBeFunction();
        angular.copy(scope.cards, cardDup); // deep copy array to another location to avoid the original array being updated
        _shuffled = scope.shuffle(cardDup);
        expect(scope.cards).not.toEqual(_shuffled);
    });

    it('items in returned array are iterable', function () {
        var value = scope.cards[0];
        expect(scope.cards).toBeUndefined();
        $httpBackend.flush();
        expect(value.card.indexOf('image/')).toBeGreaterThan(-1);
        expect(value.card.lastIndexOf('.jpg')).toBeGreaterThan(-1);
    });
});