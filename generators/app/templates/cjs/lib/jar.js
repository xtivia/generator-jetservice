module.exports = function (gulp, liferay_config) {	
  return function () {
	  
	//console.log("Construction of Liferay JAR begins...");
	
	const zip = require('gulp-zip');
	const replace = require('gulp-replace-task');
	const addsrc = require('gulp-add-src');
	const path = require('path');
	var through = require('through2').obj;

	var yo_options = require('../.yo-rc.json'); 
	yo_options['generator-jetservice'].now = '' + Date.now();
	var jar_name = yo_options['generator-jetservice'].serviceName + '.jar';
	
	var saved_files = [];

	return gulp.src(liferay_config.inputs)
		.pipe(addsrc(['.liferay/*INF/**/*']))
		.pipe(replace({ patterns: [ {json: yo_options['generator-jetservice'] }]}))
		.pipe(through(function(file, enc, cb) {
				  var f = path.parse(file.path);
				  var basename = f.name + f.ext;
				  if (basename == 'MANIFEST.MF') {
					this.push(file);
				  } else {
					saved_files.push(file);
				  }
				  cb();
			  },
			  function(cb) {
				  for (var fndx in saved_files) {
					  this.push(saved_files[fndx])
				  }
				  //console.log("Construction of Liferay JAR completes.");
				  cb();
			  }))
		.pipe(zip(jar_name))
		.pipe(gulp.dest(liferay_config.dist));
  }
};