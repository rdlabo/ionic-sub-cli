import {expect, test} from '@oclif/test'
const chalk = require('chalk')
const fs = require('fs')
const mock = require('mock-fs')
import {Alias, Formatter, Lint} from '../../src/libraries'

describe('Failed set lint', () => {
  test.timeout(10000)
  test
    .stdout()
    .command(['set', 'lint'])
    .exit(412)
    .it('exit with status 412 when not found ionic')
})

describe('Testing libraries/set --type=ionic-angular', () => {
  before(done => {
    mock({
      'ionic.config.json': fs.readFileSync('./mock/ionic-angular/ionic.config.json', 'utf-8'),
      'package.json': fs.readFileSync('./mock/ionic-angular/package.json', 'utf-8'),
      'tsconfig.json': fs.readFileSync('./mock/ionic-angular/tsconfig.json', 'utf-8'),
      src: {
        template: {
          'tslint.json': fs.readFileSync('./src/template/tslint.json', 'utf-8'),
          ionic_angular: {
            'environment.dev.ts.txt': fs.readFileSync('./src/template/ionic_angular/environment.dev.ts.txt', 'utf-8'),
            'environment.prod.ts.txt': fs.readFileSync('./src/template/ionic_angular/environment.prod.ts.txt', 'utf-8'),
            'webpack.config.txt': fs.readFileSync('./src/template/ionic_angular/webpack.config.txt', 'utf-8'),
          }
        }
      }
    })
    done()
  })
  after(done => {
    mock.restore()
    done()
  })

  it('Testing libraries/set/lint', async () => {
    const Lib = new Lint('ionic-angular', {})
    expect('installPackage()')
    expect(await Lib.addLint()).to.include(chalk.green('OK'))
  })

  it('Testing libraries/set/prettier', async () => {
    const Lib = new Formatter('ionic-angular', {})
    expect('installPackage()')
    expect(await Lib.addPrettierConfig()).to.include(chalk.green('OK'))
    expect(await Lib.rewritePackageJson()).to.include(chalk.green('OK'))
  })

  it('Testing libraries/set/alias', async () => {
    const Lib = new Alias('ionic-angular', {})
    expect('installPackage()')
    expect(await Lib.addWebpack()).to.include(chalk.green('OK'))
    expect(await Lib.rewritePackageJson()).to.include(chalk.green('OK'))
    expect(await Lib.rewriteTsconfigJson()).to.include(chalk.green('OK'))
    expect(await Lib.addEnvironmentFile()).to.include(chalk.green('OK'))
  })
})

describe('Testing libraries/set --type=angular', () => {
  before(done => {
    mock({
      'ionic.config.json': fs.readFileSync('./mock/angular/ionic.config.json', 'utf-8'),
      'package.json': fs.readFileSync('./mock/angular/package.json', 'utf-8'),
      'tsconfig.json': fs.readFileSync('./mock/angular/tsconfig.json', 'utf-8'),
      src: {
        template: {
          'tslint.json': fs.readFileSync('./src/template/tslint.json', 'utf-8'),
        }
      }
    })
    done()
  })
  after(done => {
    mock.restore()
    done()
  })

  it('Testing libraries/set/lint', async () => {
    const Lib = new Lint('angular', {})
    expect('installPackage()')
    expect(await Lib.addLint()).to.include(chalk.green('OK'))
  })

  it('Testing libraries/set/prettier', async () => {
    const Lib = new Formatter('angular', {})
    expect('installPackage()')
    expect(await Lib.addPrettierConfig()).to.include(chalk.green('OK'))
    expect(await Lib.rewritePackageJson()).to.include(chalk.green('OK'))
  })

  it('Testing libraries/set/alias', async () => {
    const Lib = new Alias('angular', {})
    expect('installPackage()')
    expect(await Lib.addWebpack()).to.include(chalk.green('OK'))
    expect(await Lib.rewritePackageJson()).to.include(chalk.green('OK'))
    expect(await Lib.rewriteTsconfigJson()).to.include(chalk.green('OK'))
    expect(await Lib.addEnvironmentFile()).to.include(chalk.green('OK'))
  })
})
