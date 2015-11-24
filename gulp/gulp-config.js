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
    path: ['src/app'],
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
      'src/modules/app.js',
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

  vendorScripts: {
    sources: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js'
    ],
    dest: 'assets/js',
    name: 'vendors.min.js'
  },

  vendorStyles: {
    sources: [
      'bower_components/bootstrap/dist/css/bootstrap.css',
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
      'bower_components/bootstrap/fonts/**/*.*'
    ],
    dest: 'assets/fonts'
  }
};