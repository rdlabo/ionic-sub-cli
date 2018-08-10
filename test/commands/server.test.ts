import {expect, test} from '@oclif/test'
const chalk = require('chalk')
const fs = require('fs')
const mock = require('mock-fs')
import {Netlify} from '../../src/libraries'

describe('Failed server netlify', () => {
  test
    .stdout()
    .command(['server', 'netlify'])
    .exit(412)
    .it('exit with status 412 when not found ionic')
})

describe('Testing libraries/set --type=ionic-angular', () => {
  before(done => {
    mock({
      'ionic.config.json': fs.readFileSync('./mock/ionic-angular/ionic.config.json', 'utf-8'),
      src: {
        template: {
          ionic_angular: {
            'netlify.build.js.txt': fs.readFileSync('./src/template/ionic_angular/netlify.build.js.txt', 'utf-8'),
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
    const Lib = new Netlify('ionic-angular', {})
    expect('installPackage()')
    expect(await Lib.installBuildFile()).to.include(chalk.green('OK'))
  })
})

describe('Testing libraries/netlify --type=angular', () => {
  before(done => {
    mock({
      'ionic.config.json': fs.readFileSync('./mock/angular/ionic.config.json', 'utf-8'),
      src: {
        template: {
          angular: {
            'netlify.build.js.txt': fs.readFileSync('./src/template/angular/netlify.build.js.txt', 'utf-8'),
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
    const Lib = new Netlify('angular', {})
    expect('installPackage()')
    expect(await Lib.installBuildFile()).to.include(chalk.green('OK'))
  })
})
