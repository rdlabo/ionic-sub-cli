import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
const fs = require('fs')
const exec = require('child_process').exec

export default class Set extends Command {
  static description = 'auto set config. input arg `lint` or `prettier`' +
    'ex) ionic-ad set lint'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{
    name: 'package',
    description: 'input `lint` or `prettier`',
    required: true
  }]

  async run() {
    const {args} = this.parse(Set)

    if (args.package === 'lint') {
      this.lint().catch()
    } else if (args.package === 'prettier') {
      this.prettier().catch()
    } else {
      this.log('Please input set package. lint or prettier.')
    }
  }
  async lint() {
    // npm install codelyzer
    cli.action.start('npm install codelyzer --save-dev')
    await new Promise(resolve => {
      exec('npm install codelyzer --save-dev', (error: any) => {
        if (error) {
          this.log('Sorry. failed npm install. You should exec npm install codelyzer --save-dev')
        } else {
          this.log('Complete install codelyzer --save-dev')
        }
        cli.action.stop()
        resolve()
      })
    })

    // change tsLintRule
    fs.writeFile('./tslint.json', tsLintRule, (error: any) => {
      if (error) {
        this.log('Sorry! ionic-ad did not re-write tslint-rule.')
      } else {
        this.log('Complete re-write tslint-rule.')
      }
    })
  }
  async prettier() {
    cli.action.start('npm install prettier @kaizenplatform/prettier-config pre-commit --save-dev')
    await new Promise(resolve => {
      exec('npm install @kaizenplatform/prettier-config pre-commit --save-dev', (error: any) => {
        if (error) {
          this.log('Sorry. failed npm install. You should exec npm install @kaizenplatform/prettier-config --save-dev')
        } else {
          this.log('Complete install @kaizenplatform/prettier-config pre-commit --save-dev')
        }
        cli.action.stop()
        resolve()
      })
    })

    fs.writeFile('./prettier.config.js', 'module.exports =require(\'@kaizenplatform/prettier-config\');', (error: any) => {
      if (error) {
        this.log('Sorry! ionic-ad did not write prettier.config.js.')
      } else {
        this.log('create prettier.config.js')
      }
    })

    fs.readFile('./package.json', 'utf8', (error: any, data: string) => {
      if (error) {
        this.log('Sorry! ionic-ad did not read package.json.')
        return
      }

      const executed = data.match(/(\"prettier\"|\"pre-commit: {\")/g)
      if (executed) {
        this.log('package.json have prettier or pre-commit script. this command do not overwrite.')
        return
      }

      const scriptPrettier = '"lint": "ionic-app-scripts lint",\n    "prettier": "prettier --parser typescript --single-quote --write \\"./**/*.ts\\""'
      data = data.replace('\"lint\"\: \"ionic-app-scripts lint\"', scriptPrettier)
      const scriptPrecommit = '"pre-commit": ["prettier"],\n  "dependencies": {'
      data = data.replace('"dependencies": {', scriptPrecommit)

      fs.writeFile('./package.json', data, (error: any) => {
        if (error) {
          this.log('Sorry! ionic-ad did not re-write package.json/')
        } else {
          this.log('write prettier and pre-commit in package.json')
        }
        return
      })
    })
  }
}

import {tsLintRule} from '../file.line'
