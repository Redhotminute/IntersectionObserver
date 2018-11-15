module.exports = function task(gulp, config, plugins) {
	gulp.task('build:js', function buildTask(taskReady) {
		return gulp
			.src(`${config.src.js}**/*.js`)
			.pipe(gulp.dest(config.output.js));
	});

	gulp.task('watch:js', function watchTask() {
		gulp.watch(`${config.src.js}**/*.js`, ['build:js']);
	});
};
