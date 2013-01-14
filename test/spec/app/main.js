/*jslint nomen:true*/
/*global describe, inject, it, beforeEach, module, _, jasmine, expect*/
describe('Testing application routing mechanism', function () {
    "use strict";
    beforeEach(module('testGameApp'));

    var $httpBackend, scope, MainCtrl;

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
        $httpBackend.whenGET('main.html').respond('main');
        $httpBackend.whenGET('views/main.html').respond('main');

        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));



    it('should load main.html view', function () {
        // testing the / route
        var callback = jasmine.createSpy('onChange');

        inject(function ($route, $location, $rootScope) {
            $rootScope.$on('$routeChangeStart', callback);

            expect($route.current).toBeUndefined();
            expect(callback).not.toHaveBeenCalled();

            $location.path('/');
            $rootScope.$digest();

            expect(callback).toHaveBeenCalled();
            expect($route.current.templateUrl).toBe('views/main.html');
            expect($route.current.controller).toBe('MainCtrl');
        });

    });

    it('should load main.html when unknown route is accessed', function () {
        // testing the otherwise clause
        var callback = jasmine.createSpy('onChange');

        inject(function ($route, $location, $rootScope) {
            $rootScope.$on('$routeChangeStart', callback);

            expect($route.current).toBeUndefined();
            expect(callback).not.toHaveBeenCalled();

            $location.path('/asasas');
            $rootScope.$digest();

            expect(callback).toHaveBeenCalled();
            expect($route.current.templateUrl).toBe('views/main.html');
            expect($route.current.controller).toBe('MainCtrl');
        });

    });

});
