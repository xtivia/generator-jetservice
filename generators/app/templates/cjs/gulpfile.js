var gulp = require('gulp');
var clean = require('gulp-clean');

/*
 A very simple and trivial build task. The key here is to have build step(s)
 that produce(s) output into a directory that is used by the 'jar' and
 'deploy' tasks below to produce/deploy the relevant Liferay service artifact.
 In a 'real' application replace this with your own copy/transpile steps as
 needed.
*/
gulp.task('build', function() {
	return gulp.src(['service/**/*'])
		.pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return gulp.src(['build','dist'], {read: false})
        .pipe(clean());
});

/*
 A configuration object to control operations of the Liferay-related gulp tasks (jar & deploy)
*/
var liferay_config = {
	inputs        : 'build/**/*',           // glob spec for inputs to the Liferay JAR. globstring or [globstrings]
	dist          : 'dist',                 // directory to use as output target for JAR file
	gogo_port     : 11311                  // telnet port for Liferay gogo shell (used by deploy)
};

gulp.task('jar', ['build'], require('./.lib/jar')(gulp,liferay_config));
									   
gulp.task('deploy', ['jar'], require('./.lib/deploy')(gulp,liferay_config));

gulp.task('default', ['deploy']);

gulp.task('watch', function () {
  gulp.watch(['service/**/*.js'], ['deploy']);
});