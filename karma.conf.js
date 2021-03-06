module.exports = function (config) {

    var browsers = require('./browser-providers.conf');

    var debugTests = false;

    var appBase = 'app/';       // transpiled app JS and map files

    // Testing helpers (optional) are conventionally in a folder called `testing`
    var testingBase = 'testing/'; // transpiled test JS and map files

    config.set({
        basePath: '',
        frameworks: ['jasmine'],

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-ie-launcher'),
            require('karma-firefox-launcher'),
            require('karma-safari-launcher'),
            require('karma-browserstack-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-junit-reporter'),
            require('karma-spec-reporter'),
            require('karma-coverage')
        ],

        client: {
            builtPaths: [appBase, testingBase], // add more spec base paths as needed
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        customLaunchers: browsers.customLaunchers,

        files: [
            // System.js for module loading
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/systemjs/dist/system-polyfills.js',

            // Polyfills
            'node_modules/core-js/client/shim.js',
            'node_modules/web-animations-js/web-animations.min.js',
            'node_modules/file-saver/FileSaver.min.js',
            'node_modules/intl/dist/Intl.min.js',
            'node_modules/intl/locale-data/jsonp/en-US.js',
            'ie.intl.shim.js',

            // zone.js
            'node_modules/zone.js/dist/zone.js',
            'node_modules/zone.js/dist/long-stack-trace-zone.js',
            'node_modules/zone.js/dist/proxy.js',
            'node_modules/zone.js/dist/sync-test.js',
            'node_modules/zone.js/dist/jasmine-patch.js',
            'node_modules/zone.js/dist/async-test.js',
            'node_modules/zone.js/dist/fake-async-test.js',

            // JWT
            {pattern: 'node_modules/angular2-jwt/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/angular2-jwt/**/*.js.map', included: false, watched: false},

            // RxJs
            {pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false},

            // Paths loaded via module imports:
            // Angular itself
            {pattern: 'node_modules/@angular/**/*.js', included: false, watched: false},
            {pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false},

            // Load google charts
            'https://www.gstatic.com/charts/loader.js',

            {pattern: 'systemjs.config.js', included: false, watched: false},
            'karma-test-shim.js', // optionally extend SystemJS mapping e.g., with barrels

            // transpiled application & spec code paths loaded via module imports
            {pattern: appBase + '**/*.js', included: false, watched: true},
            {pattern: testingBase + '**/*.js', included: false, watched: true},


            // Asset (HTML & CSS) paths loaded via Angular's component compiler
            // (these paths need to be rewritten, see proxies section)
            {pattern: 'index.html', included: false, watched: true},
            {pattern: appBase + '**/*.html', included: false, watched: true},
            {pattern: appBase + '**/*.css', included: false, watched: true},

            // Paths for debugging with source maps in dev tools
            {pattern: appBase + '**/*.ts', included: false, watched: false},
            {pattern: appBase + '**/*.js.map', included: false, watched: false},
            {pattern: testingBase + '**/*.ts', included: false, watched: false},
            {pattern: testingBase + '**/*.js.map', included: false, watched: false}
        ],

        // Proxied base paths for loading assets
        proxies: {
            // required for modules fetched by SystemJS
            '/base/src/node_modules/': '/base/node_modules/'
        },

        exclude: [],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/**/!(*.spec|*.types|*.module|main).js': debugTests ? [] : ['coverage']
        },

        coverageReporter: {
            includeAllSources: true,
            reporters: [
                // Generate HTML based output for generated JS files
                {type: 'lcov'},
                // Generate JSON based output for generated JS files, this is used to remap back to TypeScript
                {type: 'json'}
            ],
            dir: 'coverage/'
        },

        junitReporter: {
            outputDir: 'reports'
        },

        browserStack: {
            binaryBasePath: 'browserStackBin/',
            project: 'DAVe-UI',
            build: 'DAVe-UI/Karma test local',
            name: 'DAVe-UI - Karma test',
            retryLimit: 3,
            timeout: 1800, // Timeout in seconds (30 min.)
            pollingTimeout: 10000
        },

        specReporter: {
            showSpecTiming: true      // print the time elapsed for each spec
        },

        port: 9876,
        colors: true,
        crossOriginAttribute: false,
        singleRun: !debugTests,
        logLevel: config.LOG_INFO,
        captureTimeout: 180000,
        browserDisconnectTimeout: 180000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 300000
    });

    if (process.env.CIRCLECI) {
        config.browserStack.build = process.env.CIRCLE_PROJECT_USERNAME + '/' + process.env.CIRCLE_PROJECT_REPONAME
            + '/' + process.env.CIRCLE_BRANCH + '/build ' + process.env.CIRCLE_BUILD_NUM;
        config.browserStack.name = process.env.CIRCLE_PROJECT_REPONAME + '/' + process.env.CIRCLE_BRANCH + ' - Karma test';
    }
};