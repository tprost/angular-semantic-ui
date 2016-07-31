module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-ngdocs');


  grunt.initConfig({
    ngdocs: {
      options: {
        dest: 'dist/api',
        scripts: [
          'angular.js',
          '../src.js'
        ],
        html5Mode: false
      },
      all: ['src/*.js']
    },
    api: {
      src: ['src/**/*.js'],
      title: 'API Documentation'
    }
  });

  grunt.registerTask('default', ['ngdocs']);

};
