/* jshint node:true */
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine', 'closure'],
        files: [
            // closure base
            {pattern: 'bower_components/google-closure-library/closure/goog/base.js'},
            // included files - tests
            {pattern: 'test/*.js'},
            // these are only watched and served
            {pattern: 'src/*.js', included: false},
            // external deps
            {pattern: 'bower_components/google-closure-library/closure/goog/deps.js', included: false, served: false},
            {pattern: 'bower_components/google-closure-library/closure/goog/**/*.js', included: false}
        ],

        preprocessors: {
            'test/*.js': ['closure', 'closure-iit'],
            'js/*.js': ['closure'],
            'bower_components/google-closure-library/closure/goog/deps.js': ['closure-deps']
        },

        browsers: ['PhantomJS'],
        autoWatch: true
    });
};
