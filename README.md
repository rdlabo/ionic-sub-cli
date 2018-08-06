[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Build Status](https://travis-ci.org/rdlabo/ionic-ad.svg?branch=master)](https://travis-ci.org/rdlabo/ionic-ad)
[![npm version](https://badge.fury.io/js/%40rdlabo%2Fionic-sub.svg)](https://badge.fury.io/js/%40rdlabo%2Fionic-sub)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# ionic-sub
This is private command line interface (CLI) for support Ionic CLI. 
This CLI support for developing Ionic apps.

## Install
```bash
$ npm i @rdlabo/ionic-sub -g
```

- The corresponding version of nodejs is version 8 or higher!

## Usage

Just run the command!

```bash
$ ionic-sub set lint
$ ionic-sub set prettier
```

### set lint

This command rewrite tslint.json base of Angular 6.

- npm install codelyzer --save-dev (v3:ionic-angular only)
- rewrite ./tslint.json

### set prettier

import prettier and auto set pre-commit.

- npm install prettier @kaizenplatform/prettier-config pre-commit --save-dev
- add prettier.config.js
- add package.json script 'prettier' and 'pre-commit'


## License
[MIT](https://github.com/k-kuwahara/ja-greetings/blob/master/LICENSE)


## Others
I'm waiting for you at any time, including code reviews, bug reports, feature additions, questions and more!
