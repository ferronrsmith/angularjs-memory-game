/*global testGameApp, $*/

var id, boxopened = "", currentopened = "", imgopened = "", msg, innerImg, count = 0, found = 0;

testGameApp.directive('openCard', function ($timeout, $log) {
    "use strict";

    return function (scope, elem, attrs) {
        elem.bind('click', function (e) {
            innerImg = $(elem).find('img');

            if (innerImg.is(":hidden")) {
                innerImg.slideDown('fast');

                if (imgopened === "") {
                    boxopened = $(elem);
                    imgopened = innerImg.attr('src');

                } else {
                    currentopened = innerImg.attr('src');
                    $log.info(imgopened + "prev + curr" + currentopened);
                    $log.info(imgopened);
                    $log.info(currentopened);
                    if (imgopened !== currentopened) {
                        // close again
                        $timeout(function () {
                            innerImg.slideUp('fast');
                            boxopened.find('img').slideUp('fast');
                            boxopened = imgopened = "";
                        }, 400);
                    } else {
                        // found
                        innerImg.addClass("opacity");
                        boxopened.find("img").addClass("opacity");
                        found += 1;
                        boxopened = imgopened = "";
                    }
                }

                count += 1;
                $("#count").html(count);

                if (found === 10) {
                    msg = '<span id="msg">Congrats ! You Found All Sushi With </span>';
                    $("span.link").prepend(msg);
                }
            }
        });
    };
});

/**
 *
 */
testGameApp.directive('resetGame', function ($window) {
    "use strict";

    return function (scope, elem, attrs) {
        elem.bind('click', function (e) {
            $window.location.reload();
        });
    };
});
