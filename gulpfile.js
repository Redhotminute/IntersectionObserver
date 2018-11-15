const gulp = require('gulp'),
	runSequence = require('run-sequence'),
	plugins = require('gulp-load-plugins')(),
	argv = require('yargs').argv,
	config = {
		output: {
			base: './dist/',
			css: './dist/css/',
			html: './dist/',
			js: './dist/js/'
		},
		production: argv.mode === 'production',
		src: {
			css: './src/css/',
			html: './src/',
			js: './src/js/'
		}
	};

// Load the tasks, these needs to be done after config is fully setup.
require('./gulp/clean')(gulp, config, plugins);
require('./gulp/css')(gulp, config, plugins);
require('./gulp/html')(gulp, config, plugins);
require('./gulp/js')(gulp, config, plugins);

// Global Gulp tasks. These are the taks that will usually be run from the CLI.
gulp.task('webserver', function webserver(taskReady) {
	gulp.src('dist').pipe(
		plugins.serverLivereload({
			directoryListing: false,
			livereload: true,
			open: true
		})
	);
});

gulp.task('build', function build(taskReady) {
	runSequence(
		'clean',
		['build:html', 'build:css', 'build:js'],
		taskReady
	);
});

gulp.task('dev', function devTask(taskReady) {
	runSequence(
		'build',
		['watch:css', 'watch:html', 'watch:js', 'webserver'],
		taskReady
	);
});
