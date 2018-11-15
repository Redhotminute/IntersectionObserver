module.exports = function task(gulp, config, plugins) {
	const
		autoprefixer = require('autoprefixer'),
		cssnano = require('cssnano');

	gulp.task('build:css', function buildTask() {
		return gulp.src(`${ config.src.css }**/*.scss`)
			// Make sure errors don't stop the gulp process.
			.pipe(plugins.plumber())
			// Create a source map when not in development mode
			.pipe(plugins.if((!config.production), plugins.sourcemaps.init()))
			// Convert the SCSS to CSS
			.pipe(plugins.sass())
			// For production use the autoprefixer and minify the CSS
			.pipe(plugins.if((config.production), plugins.postcss([autoprefixer(), cssnano()])))
			// Write a source map when not in development mode
			.pipe(plugins.if((!config.production), plugins.sourcemaps.write('.')))
			// Write the output to disk.
			.pipe(gulp.dest(config.output.css))
	});

	gulp.task('watch:css', function watchTask() {
		gulp.watch(`${ config.src.css }**/*.scss`, ['build:css']);
	});
}
