/**
 * This file is Netlify's build file for Angular Project
 * You can set your environment to this file.
 *
 * This file build for 4 method.
 *   1. create robot.txt.
 *   2. create _redirects for redirect to www
 *   3. create _headers for ServerPush
 *   4. change styles inline
 *
 * If you use this file, you put this file in package.json's directory.
 * And in Netlify's deploy setting, add Build command `node netlify.build.js`
 */

/***************************************************************************************************
 * Please change your environment.
 */

/** Ionic Framework v4 is `www/` */
const publicDir = 'www/';

/** not add `www` */
const appDomain = 'example.com';

/** create accessable file */
const debug = true;

/**
 *  If you need not execute method, please set
 */
const execute = {
  createRobot: true, /** create robot.txt */
  createRedirects: true, /** create _redirects for redirect to www */
  createJavaScriptFileServerPush: true, /** create _headers for ServerPush  */
  changeInlineStyleSheet: true  /** change styles inline */
};


/***************************************************************************************************
 * Under this line is execute method.
 */

const fs = require('fs');
class method {
  constructor(publicDir, appDomain, debug) {
    this.publicDir = publicDir;
    this.appDomain = appDomain;
    this.debug = debug;
  }

  createRobot(){
    const robot = 'User-Agent: *\nAllow: /\nHost: ' + this.appDomain;
    fs.writeFileSync(this.publicDir + 'robot.txt', robot);
  }

  createRedirects(){
    if　(this.appDomain.split('.').length === 2){
      const robot = 'https://' + this.appDomain + '/*  https://www.' + this.appDomain + '/:splat  301\n/* /index.html 200';
      fs.writeFileSync(this.publicDir + '_redirects', robot);
      if (this.debug) fs.writeFileSync(this.publicDir + 'redirects.txt', robot);
    }
  }

  createJavaScriptFileServerPush(fileArray, subDir = ''){
    let pushFile = '/*\n';
    fileArray.forEach(file => {
      if(this.__getFileName(file, subDir)){
        pushFile += '  Link: <' + subDir + this.__getFileName(file, subDir) + '>; rel=preload; as=script\n';
      }
    });
    fs.writeFileSync(this.publicDir + '_headers', pushFile);
    if (this.debug) fs.writeFileSync(this.publicDir + 'headers.txt', pushFile);
  }

  changeInlineStyleSheet(){
    if (this.__getFileName('styles')) {
      const stylesheet = fs.readFileSync(this.publicDir + this.__getFileName('styles')).toString();
      const indexFile = fs.readFileSync(this.publicDir + 'index.html').toString();
      const changeString = indexFile.replace(/\n\<link rel=(\"|\')stylesheet(\"|\')[^>]*>/g, '<style>' + stylesheet + '</style>');
      fs.writeFileSync(this.publicDir + 'index.html', changeString);
    }
  }

  __getFileName(search, subDir = ''){
    const files = fs.readdirSync(publicDir + subDir);
    const fileList = files.filter((file) => {
      return (file.match(new RegExp(search)) !== null)
    });

    if (fileList[0]) {
      return fileList[0];
    } else {
      return false;
    }
  }
}

const build = new method(publicDir, appDomain, debug);
if (execute.createRobot) build.createRobot();
if (execute.createRedirects) build.createRedirects();
if (execute.createJavaScriptFileServerPush) build.createJavaScriptFileServerPush(['main', 'polyfills', 'runtime']);
if (execute.changeInlineStyleSheet) build.changeInlineStyleSheet();
