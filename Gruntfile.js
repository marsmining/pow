/* jshint node:true */
'use strict';

module.exports = function(grunt) {
    require('jit-grunt')(grunt, {
        closureCompiler: 'grunt-closure-tools',
        closureDepsWriter: 'grunt-closure-tools'
    });

    var sourceGlob = 'src/**/*.js';
    var testGlob = 'test/*.js';
    var allFiles = ['Gruntfile.js', 'karma.conf.js', sourceGlob, testGlob];

    grunt.initConfig({
        jshint: {
            files: allFiles,
            options: {
                jshintrc: '.jshintrc'
            }
        },
        jscs: {
            src: allFiles
        },
        connect: {
            server: {
                options: {
                    directory: '.',
                    hostname: '0.0.0.0'
                }
            }
        },
        watch: {
            all: {
                files: allFiles,
                tasks: ['watcher']
            },
            karma: {
                files: allFiles,
                tasks: ['karma:cont:run']
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            cont: {
                background: true,
                singleRun: false
            },
            unit: {
                singleRun: true
            }
        },
        closureDepsWriter: {
            options: {
                closureLibraryPath: 'bower_components/google-closure-library',
                'root_with_prefix': '\'src/ ../../../../src\''
            },
            all: {
                dest: 'deps.js'
            }
        },
        closureCompiler: {
            options: {
                compilerFile: 'cc/compiler.jar',
                compilerOpts: {
                    'warning_level': 'VERBOSE',
                    'create_source_map': '%outname%.map',
                    'only_closure_dependencies': null,
                    'summary_detail_level': 3,
                    'source_map_format': 'V3',
                    'source_map_location_mapping': ['\'bower_components|http://localhost:8000/bower_components\'', '\'src|http://localhost:8000/src\''],
                    'compilation_level': 'WHITESPACE_ONLY',
                    'generate_exports': null,
                    'language_in': 'ECMASCRIPT5_STRICT'
                }
            },
            pow: {
                src: [
                    'src/**/*.js',
                    'bower_components/google-closure-library'],
                dest: 'dist/pow.min.js',
                TEMPcompilerOpts: {
                    // use below options (temporarily) if curious what code is
                    // getting pulled in through advanced compilation
                    // 'debug': true,
                    // 'formatting': 'PRETTY_PRINT',
                    'compilation_level': 'ADVANCED',
                    'define': ["'goog.DEBUG=false'"],
                    'closure_entry_point': 'pow.main',
                    'output_wrapper_file': 'cc/wrapper.js'
                }
            }
        }
    });

    grunt.registerTask('pow', ['closureDepsWriter', 'closureCompiler:pow']);

    /** task run when watch:all triggered */
    grunt.registerTask('watcher', ['lint', 'karma:cont:run', 'current']);

    /** configure as the task you are currently working on */
    grunt.registerTask('current', ['pow']);

    /** lint and style checks */
    grunt.registerTask('lint', ['jshint', 'jscs']);

    /** execute linters and run tests */
    grunt.registerTask('test', ['lint', 'karma:unit']);

    /** run karma continuously */
    grunt.registerTask('dev', ['connect', 'karma:cont:start', 'watch:karma']);

    /** run tests than compile down to single artifact */
    grunt.registerTask('dist', ['test', 'current']);

    /** run tests than compile all artifacts */
    grunt.registerTask('all', ['test', 'pow']);

    /** file changes trigger linting, testing and 'current' task **/
    grunt.registerTask('default', ['connect', 'karma:cont:start', 'watch:all']);
};
