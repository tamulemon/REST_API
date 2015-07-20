var gulp = require('gulp'),
		jshint = require('gulp-jshint'),
		mocha = require('gulp-mocha');

gulp.task('default', function() {
	return gulp
	.src('test/*.js')
	.pipe(mocha({reporter: 'Spec'}));
});

gulp.task('lint', function() {
	return gulp
	.src(['*.js', '*/*.js'])
	.pipe(jshint())
  .pipe(jshint.reporter('default'));
});


