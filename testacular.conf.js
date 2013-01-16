// Testacular configuration


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  'components/jquery/jquery.js',
  'app/scripts/vendor/angular.js',
  'test/vendor/angular-mocks.js',
 // 'test/vendor/angular-scenario.js',
  'app/scripts/*.js',
  'app/scripts/**/*.js',
//  'test/mock/**/*.js',
  'test/spec/**/*.js',
  'matchers/*.js'
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: dots || progress
//reporter = 'progress';
//reporters = ['progress', 'coverage'];
reporters = ['progress', 'coverage'];


preprocessors = {
    '**/app/scripts/controllers/*.js' : 'coverage',
    '**/app/scripts/directives/*.js' : 'coverage',
    '**/app/scripts/app.js' : 'coverage'
};

coverageReporter = {
    type : 'html',
    dir : 'coverage/'
}
// web server port
port = 8080;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ['PhantomJS'];
//browsers = ['Firefox'];
//browsers = ['Chrome'];


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
