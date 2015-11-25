/*
 * temperature-sensor-monitor - https://github.com/blueskyfish/temperature-sensor-monitor.git
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 BlueSkyFish
 */

'use strict';

var settings = require('./gulp-settings');

module.exports = {

  // Task: connection
  connect: {
    path: ['src/app', 'src/modules'],
    port: 4000,
    options: {
      rewriteRules: [
        '^/temo/(.*)$ http://www.blueskyfish.de/temo/$1 [P]'
      ]
    }
  },

  // Task: build-index & watch-index
  index: {
    sources: ['src/app/index.html'],
    dest: '',
    options: {
      replace: {
        vendors: {
          src: settings.getContextPath('assets/js/vendors.min.js'),
          tpl: '<script src="%s"></script>'
        },
        scripts: {
          src: settings.getContextPath('assets/js/application.min.js'),
          tpl: '<script src="%s"></script>'
        },
        styles: {
          src: settings.getContextPath('assets/css/application.min.css'),
          tpl: '<link rel="stylesheet" href="%s">'
        },
        templates: {
          src: settings.getContextPath('assets/js/templates.min.js'),
          tpl: '<script src="%s"></script>'
        },
        vendorStyles: {
          src: settings.getContextPath('assets/css/vendors.min.css'),
          tpl: '<link rel="stylesheet" href="%s">'
        }
      },
      inject: {
        sources: [
          'src/modules/**/*.js'
        ]
      },
      htmlMin: {
        collapseWhitespace: true,
        maxLineLength: 200
      }
    }
  },

  styles: {
    sources: [
      'src/styles/variables.less',
      'src/styles/mixins.less',
      'src/styles/core.less',
      'src/styles/common/**/*.less',
      'src/modules/**/*.less'
    ],
    dest: 'assets/css',
    name: 'application.css',
    minify: 'application.min.css',
    options: {
      less: {
        paths: ['src']
      },
      miniCSS: {
        keepSpecialComments: 0,
        keepBreaks: true
      }
    }
  },

  scripts: {
    sources: [
      'src/modules/AppModule.js',
      'src/modules/**/*Value.js',
      'src/modules/**/*Const.js',
      'src/modules/**/*Object.js',
      'src/modules/**/*Provider.js',
      'src/modules/**/*Service.js',
      'src/modules/**/*Util.js',
      'src/modules/**/*Filter.js',
      'src/modules/**/*Widget.js',
      'src/modules/**/*Backend.js',
      'src/modules/**/*Controller.js',
      'src/modules/**/*Config.js',
      'src/modules/**/*Run.js'
    ],
    dest: 'assets/js',
    name: 'application.js',
    minify: 'application.min.js',
    options: {
      uglify: {
        preserveComments: 'all'
      },
      eslint: {
        rules: {
          eqeqeq: 2,
          quotes: [1, 'single'],
          'no-unused-vars': 1,
          'no-undef': 1,
          semi: [1, "always"]
        },
        globals: {
          angular: 1,
          jQuery: 0,
          $: 0
        },
        env: {
          browser: 1
        }
      }
    }
  },

  // Task **build-assets**
  assets: {
    sources: [
      'src/app/assets/**/*.*'
    ],
    dest: 'assets'
  },

  templates: {
    sources: [
      'src/modules/**/*.html'
    ],
    name: 'templates.js',
    minify: 'templates.min.js',
    dest: 'assets/js',
    options: {
      templates: {
        module: 'tsm',
        templateHeader: [
          '/*',
          ' * temperature-sensor-monitor (templates)',
          ' * NOTE: do not edit directly, this file will be created automatically!',
          ' */',
          '',
          '(function (angular) {',
          '  \'use strict\';',
          '',
          '  angular.module(\'<%= module %>\'<%= standalone %>).run([\'$templateCache\', function($templateCache) {',
          ''
        ].join('\n'),
        templateFooter: [
          '',
          '  }]);',
          '',
          '} (window.angular))',
          ''
        ].join('\n'),
        templateBody: '    $templateCache.put("<%= url %>","<%= contents %>");'
      },
      uglify: {
        preserveComments: 'all'
      }
    }
  },

  vendorScripts: {
    sources: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js'
    ],
    dest: 'assets/js',
    name: 'vendors.min.js'
  },

  vendorStyles: {
    sources: [
      'bower_components/normalize-css/normalize.css',
      'bower_components/components-font-awesome/css/font-awesome.css',
//      'bower_components/bootstrap/dist/css/bootstrap.css',
      'bower_components/angular/angular-csp.css'
    ],
    dest: 'assets/css',
    name: 'vendors.css',
    minify: 'vendors.min.css',
    options: {
      miniCSS: {
        keepSpecialComments: 0,
        keepBreaks: true
      }
    }
  },
  vendorFonts: {
    sources: [
      'bower_components/bootstrap/fonts/**/*.*',
      'bower_components/components-font-awesome/fonts/**/*.*'
    ],
    dest: 'assets/fonts'
  }
};