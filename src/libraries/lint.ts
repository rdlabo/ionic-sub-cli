import cli from 'cli-ux'
const chalk = require('chalk')
const fs = require('fs')
const exec = require('child_process').exec
import {tsLintRule} from '../config/file.line'

export class Lint {
  public type: string
  constructor(type: string) {
    this.type = type
  }

  installPackage(): Promise<string> {
    if (this.type === 'ionic-angular') {
      cli.action.start('> ' + chalk.green('npm install codelyzer --save-dev'))
      return new Promise((resolve, reject) => {
        exec('npm install codelyzer --save-dev', (error: any) => {
          if (error) {
            reject(chalk.red('Sorry. failed npm install. You should exec npm install codelyzer --save-dev'))
          } else {
            reject('[' + chalk.green('OK') + '] ' + 'Complete install codelyzer --save-dev')
          }
          cli.action.stop()
          resolve('npm installed codelyzer')
        })
      })
    } else {
      return new Promise(resolve => resolve('need install codelyzer is ionic-angular only'))
    }
  }
  addTslint() {
    return new Promise((resolve, reject) => {
      fs.writeFile('./tslint.json', tsLintRule, (error: any) => {
        if (error) {
          reject(chalk.red('Sorry! ionic-sub did not re-write tslint-rule.'))
        }
        resolve('[' + chalk.green('OK') + '] ' + 'Complete re-write tslint-rule.')
      })
    })
  }
}
