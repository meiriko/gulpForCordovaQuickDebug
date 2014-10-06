gulpForCordovaQuickDebug
========================

gulp script for quick debug of ionic/cordova/phonegap apps

based on the great article by   Gonzalo Ayuso   (thx Gonzalo!)

see  http://java.dzone.com/articles/testing-phonegapcordova

git repository:  https://github.com/meiriko/gulpForCordovaQuickDebug

This script maps all required resources to appear as they are in location required for the appand eliminates the need for the links (ln -s) mentioned in the article

The gulp file actually sets up a server using node/express. You can add more mapped resources (see the app.use(... static ) parts)

To start using this script:
1.  Install nodejs on your computer
2.  Install gulp - run "npm install gulp"
3.  Install dependencies - run "npm install". This will user the pakcage.json file to get required dependencies.
4.  type gulp (see params below)

parameters:
this script will assume that it is ran in the root of a cordova/phonegap/ionic project and map resources accordingly:
to specify a different root directory, use -d (or --dir):

-d <directory>  for example: 

  (relative) "gulp -d ../project1"
  (relative) "gulp --dir project2"
  (absolute) "gulp -d /home/meiriko/projects/project3"

The files will be available under the root of your web server
For example: http://localhost:8080/index.html
To specify the path of your app on the server, use the -s (or --path) flag

-s <web path>  for example: "-gulp -s quickDebug/proj" or "gulp --path quickDebug/proj"

NOTE: do not use absolute path on server, i.e. use "gulp -s x/y/z" and NOT "gulp -s /x/y/z !!!

This will move the files to http://localhost:8080/quickDebug/proj
Thus http://localhost:8080/quickDebug/proj/index.html
and http://localhost:8080/quickDebug/proj/css/style.css (etc.)

-p (or --port) <port>  for example: "gulp -p 8100" (default is the env variable PORT with a fallback to 8080)

Parameters can be mixed (e.g. "gulp -p 8090 --port test --dir ../myproject")


