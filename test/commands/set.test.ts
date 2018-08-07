import {fancy} from 'fancy-test'
import {expect, test} from '@oclif/test'
const chalk = require('chalk')
const fs = require('fs')

describe('set', () => {
  test
    .stdout()
    .command(['set', 'lint'])
    .exit(412)
    .it('exit with status 412 when not found ionic')

  fancy
    .add('create ionic.config.json', () => {
      const config = {name: 'test1', integrations: {}, type: 'ionic-angular'}
      fs.writeFileSync('./ionic.config.json', JSON.stringify(config, null, '  '))
    })
    .do(() => {
      test
        .stdout()
        .command(['set', 'lint', '--dry'])
        .it('runs set lint --dry', ctx => {
          expect(ctx.stdout).to.contain('hello jeff')
        })
    })
    .it('delete ionic.config.json', () => {
      fs.unlinkSync('./ionic.config.json')
    })
})
