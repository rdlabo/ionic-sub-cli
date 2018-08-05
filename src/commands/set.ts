import {Command, flags} from '@oclif/command'

export default class Set extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'name to print'}),
  }

  static args = [{name: 'package'}]

  async run() {
    const {args} = this.parse(Set)

    if (args.package === 'lint') {
      this.lint()
    } else {
      this.log('Please input set package. lint or prettier.')
    }
  }
  public lint() {
    const fs = require('fs')
    const filePath = './tslint.json'

    const exec = require('child_process').exec
    exec('npm install codelyzer --save-dev', error => {
      if (error) {
        this.log('Sorry. failed npm install. You should exec npm install codelyzer --save-dev')
      } else {
        this.log('Complete install codelyzer --save-dev')
      }
    })

    fs.writeFile(filePath, tsLintRule, error => {
      if (error) {
        this.log('Sorry! ionic-ad lint did not re-write ts-lint-rule.')
        return
      }
    })
    this.log('Complete change ts-lint rule')
  }
}

import {tsLintRule} from '../file.line'
