/**
 * Created by meir.shahar on 06/06/2014.
 */

var gulp = require('gulp'),
	colors = require('gulp-util').colors,
    _ = require('lodash'),
	express = require('express'),
    path = require('path'),
    livereload = require('gulp-livereload')();

var app = express();

var wwwSlug = 'www';
var cordovaSlug = 'platforms/android/assets/www/cordova.js';
var cordovaPluginsSlug = 'platforms/android/assets/www/cordova_plugins.js';
var pluginsSlug = 'platforms/android/assets/www/plugins';

var baseDir = gulp.env.dir || gulp.env.d || '.';
if(!(/\/$/.test(baseDir))){
	baseDir += '/';
}

var serverBasePath = gulp.env.path || gulp.env.s || '/' ;

if(!(/^\//.test(serverBasePath))){
	serverBasePath = '/' + serverBasePath;
}
if(!(/\/$/.test(serverBasePath))){
	serverBasePath += '/';
}
// console.log('bd: ', baseDir);
// console.log('sbp: ', serverBasePath);

var sourceFiles = {
    ionic: baseDir + 'www/**/*.*'
};

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.use(serverBasePath, express.static(path.resolve(baseDir) + '/www'));
app.use(serverBasePath + 'cordova.js', express.static(path.resolve(baseDir + cordovaSlug)));
app.use(serverBasePath + 'cordova_plugins.js', express.static(path.resolve(baseDir + cordovaPluginsSlug)));
app.use(serverBasePath + 'plugins', express.static(path.resolve(baseDir + pluginsSlug )));

gulp.task('help', function(){
	console.log('\n------------------------------\n');
	console.log('gulp script for quick debug of ionic/cordova/phonegap apps\n');
	console.log('based on the great article by ', colors.bold.bgWhite.blue(' Gonzalo Ayuso '), colors.bold(' (thx Gonzalo!)\n'));
	console.log('see ', colors.bold.underline('http://java.dzone.com/articles/testing-phonegapcordova\n'));
	console.log('git repository: ', colors.bold.underline('https://github.com/meiriko/gulpForCordovaQuickDebug\n'));
	console.log('This script maps all required resources to appear as they are in location required for the app' +
		'and eliminates the need for the links (ln -s) mentioned in the article\n');
	console.log('The gulp file actually sets up a server using node/express. You can add more mapped resources (see the app.use(... static ) parts)\n');
	console.log('To start using this script:');
	console.log(colors.bold('1. '), 'Install nodejs on your computer');
	console.log(colors.bold('2. '), 'Install gulp - run "npm install gulp"');
	console.log(colors.bold('3. '), 'Install dependencies - run "npm install". This will user the pakcage.json file to get required dependencies.');
	console.log(colors.bold('4. '), 'type gulp (see params below)\n');
	console.log(colors.bold('parameters:'));
	console.log('this script will assume that it is ran in the root of a cordova/phonegap/ionic project and map resources accordingly:');
	console.log('to specify a different root directory, use -d (or --dir):\n');
	console.log(colors.bold('-d <directory>'), ' for example: \n')
	console.log(colors.bold('  (relative) "gulp -d ../project1"'));
	console.log(colors.bold('  (relative) "gulp --dir project2"'));
	console.log(colors.bold('  (absolute) "gulp -d /home/meiriko/projects/project3"\n'));
	console.log('The files will be available under the root of your web server');
	console.log('For example: http://localhost:8080/index.html');
	console.log('To specify the path of your app on the server, use the -s (or --path) flag\n');
	console.log(colors.bold('-s <web path>'), ' for example: "-gulp -s quickDebug/proj" or "gulp --path quickDebug/proj"\n');
	console.log(colors.bold('NOTE: do not use absolute path on server, i.e. use "gulp -s x/y/z" and NOT "gulp -s /x/y/z !!!\n'));
	console.log('This will move the files to http://localhost:8080/quickDebug/proj');
	console.log('Thus http://localhost:8080/quickDebug/proj/index.html');
	console.log('and http://localhost:8080/quickDebug/proj/css/style.css (etc.)\n');

	console.log(colors.bold('-p (or --port) <port>'), ' for example: "gulp -p 8100" (default is the env variable PORT with a fallback to 8080)\n');
	console.log('Parameters can be mixed (e.g. "gulp -p 8090 --port test --dir ../myproject")\n');
	console.log('------------------------------\n');
});

gulp.task('default', function() {
	livereload.changed();
	console.log(colors.bold.white('\nFirst time here? Not sure what to do? Type "gulp help"\n'));
    // creating a separate watcher for each file type/directory
    _.forEach(sourceFiles, function(files, key) {
        gulp.watch(files).on('change', function(file){
	        console.log(colors.red.bgYellow(path.relative(__dirname, file.path)),
		        colors.red(' changed'));
            if(key === 'less'){
                gulp.src(file.path)
                    .pipe(less())
                    .pipe(gulp.dest('./styles'));
            } else {
                livereload.changed(file.path);
            }
        });
    });

	console.log('your server will read files from', colors.bold(path.resolve(baseDir)));
	console.log('your files will be under', colors.bold(serverBasePath));
	var port = (gulp.env.port || gulp.env.p || process.env.PORT || "8080");
	console.log('your server port is ', colors.bold(port), '\n');
	// console.log('listening on port: ', port);
	app.listen(port);
});

