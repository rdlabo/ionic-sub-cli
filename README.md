[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/rdlabo)
[![Build Status](https://travis-ci.org/rdlabo/ionic-sub-cli.svg?branch=master)](https://travis-ci.org/rdlabo/ionic-sub-cli)
[![npm version](https://badge.fury.io/js/%40rdlabo%2Fionic-sub.svg)](https://badge.fury.io/js/%40rdlabo%2Fionic-sub)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

# Ionic-sub CLI
This is private command line interface (CLI) for support Ionic CLI. 
This CLI support for developing Ionic Framework Project.

## Install
```bash
$ npm i @rdlabo/ionic-sub -g
```

- The corresponding version of nodejs is version 8 or higher!

## Usage

Just run the command!

### set
```bash
$ ionic-sub set lint
$ ionic-sub set formatter
$ ionic-sub set alias
$ ionic-sub set all
```

#### set lint
This command rewrite tslint.json base of Angular 6.

#### set formatter

This command set formatter. Import `prettier` and set `package.json`.

#### set alias

You can use `@` alias. `@` connect `src` folder. so you can write.

```
import { HomePage } from '../pages/home/home';
↓
import { HomePage } from '@/pages/home/home';
```

```
import { Example } from '../../providers/example/example';
↓
import { HomePage } from '@/providers/example/example';
```

And you can use environment file. This change `--prod` or none. 
(This is __ionic-angular(v3) only.__ angular(v4) have default environment file)

```
import { environment } from '@app/environment';

console.log(environment)
```

Environment file create `src/environments`. If you add command `--prod`, environment is `environment/environment.prod.ts`. 
Or nothing, environment is `environment/environment.dev.ts`.

### server
```bash
$ ionic-sub server netlify
```

#### server netlify
This command create Netlify's build file. This file auto set this.

1. create robot.txt.
2. create _redirects for redirect to www.
3. create _headers for ServerPush.
4. change styles inline. (v4 only)

You should add Build command node netlify.build.js in Netlify's deploy setting.

## License
[MIT](https://github.com/k-kuwahara/ja-greetings/blob/master/LICENSE)

## Donation
If this project help you reduce time to develop, you can give me a cup of coffee :) 

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/rdlabo)

## Others
I'm waiting for you at any time, including code reviews, bug reports, feature additions, questions and more!
