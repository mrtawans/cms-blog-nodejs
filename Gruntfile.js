module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		htmlmin: {                                     // Task
			dist: {                                      // Target
				options: {                                 // Target options
					collapseWhitespace: true
				},
				files: {                       
				// 'destination': 'source'             
					'public/index.html': 'public/src/theme/index.html',      
					'public/dist/themes/home.html': 'public/src/theme/home.html',    
					'public/dist/themes/post.html': 'public/src/theme/post.html',  
				}
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			// build: {
			// 	src: 'public/src/js/<%= pkg.name %>.js',
			// 	dest: 'public/dist/js/<%= pkg.name %>.min.js'
			// },
			files: {
				src:'public/src/js/*.js',
				dest: 'public/dist/js/',
				expand: true,
				flatten: true,
				ext: '.min.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// Default task(s).
	grunt.registerTask('js', ['uglify']);
	grunt.registerTask('html', ['htmlmin']);
	// Run all
	grunt.task.registerTask('d', ['htmlmin', 'uglify']);



};
