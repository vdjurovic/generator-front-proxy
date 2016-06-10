module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src_dir: 'src',
    dist_dir: 'dist',
    js_dir: 'src/js',
    js_dist_dir: 'dist/js',
    css_dir: 'src/css',
    css_dist_dir: 'dist/css',
    img_dir: 'src/images',
    img_dist_dir: 'dist/images',
    concat: {
      options: {
        separator: ';'
      },
      js: {
	src: ['<%= js_dir %>/**/*.js'],
	dest: '<%= js_dist_dir %>/<%= pkg.name %>.js'
      },
      css: {
	src: ['<%= css_dir %>/**/*.css'],
	dest: '<%= css_dist_dir %>/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      js: {
        files: {
          '<%= js_dist_dir %>/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      options: {
	  banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	},
      dist: {
	files: {
          '<%= css_dist_dir %>/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      },
    },
    imagemin: {
      dist: {
	options: {
	  optimizationLevel: 5
	},
	files: [{
	  expand: true,
          cwd: '<%= img_dir %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= img_dist_dir %>'
	}]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
   wiredep: {
      app: {
        src: ['src/**/*.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    }, 
    karma: {
      unit: {
	configFile: 'test/karma.conf.js',
	singleRun: true
      }
    },
    copy: {
      html: {
	expand: true,
	cwd: '<%= src_dir %>',
	src: '**/*.html',
	dest: '<%= dist_dir %>',
	filter: 'isFile'
      },
      favicon: {
	src: '<%= src_dir %>/favicon.ico',
	dest: '<%= dist_dir %>/favicon.ico'
      }
    },
     usemin:{
        html:['<%= dist_dir %>/**/*.html']
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('test', ['jshint','karma']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  
  grunt.registerTask('dist',['copy', 'concat', 'uglify', 'cssmin', 'imagemin', 'usemin']);

};