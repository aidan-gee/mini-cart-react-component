var gulp = require('gulp');
var browser = require('browser-sync');

gulp.task('browsersync', ['html', 'js'], function() {
	browser({
	    port: 8080,
	    server: {
	      baseDir: "./"
	    }
	});
});

gulp.task('html', function () {
    gulp.watch("./*.html", browser.reload);
});
gulp.task('js', function () {
    gulp.watch(["**/*.jsx"], browser.reload);
});

gulp.task('default', ['browsersync']);