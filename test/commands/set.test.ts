import {expect, test} from '@oclif/test'
const chalk = require('chalk')
const fs = require('fs')
const mock = require('mock-fs')
import {Lint} from '../../src/libraries/set/lint'

describe('Failed set lint', () => {
  test
    .stdout()
    .command(['set', 'lint'])
    .exit(412)
    .it('exit with status 412 when not found ionic')
})

describe('Testing libraries/set', () => {
  before(done => {
    mock({
      'ionic.config.json': fs.readFileSync('./mock/ionic-angular/ionic.config.json', 'utf-8'),
      'package.json': fs.readFileSync('./mock/ionic-angular/package.json', 'utf-8'),
      src: {
        template: {
          'tslint.json': fs.readFileSync('./src/template/tslint.json', 'utf-8'),
          'ionic-angular': {
            'environment.dev.ts.txt': fs.readFileSync('./src/template/ionic-angular/environment.dev.ts.txt', 'utf-8'),
            'environment.prod.ts.txt': fs.readFileSync('./src/template/ionic-angular/environment.prod.ts.txt', 'utf-8'),
            'webpack.config.txt': fs.readFileSync('./src/template/ionic-angular/webpack.config.txt', 'utf-8'),
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
    const lint = new Lint('ionic-angular', {dry: true})
    expect(await lint.addLint()).to.include(chalk.green('OK'))
    expect('lint.installPackage()')
  })
})
