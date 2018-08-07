import cli from 'cli-ux'
const chalk = require('chalk')
const fs = require('fs')
const exec = require('child_process').exec

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
            return
          }
          cli.action.stop()
          resolve('[' + chalk.green('OK') + '] ' + 'Complete install codelyzer --save-dev')
        })
      })
    } else {
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Do not need package install.'))
    }
  }
  addLint() {
    return new Promise((resolve, reject) => {
      const tslint = require('../../template/tslint.json')
      fs.writeFile('./tslint.json', JSON.stringify(tslint, null, '  '), (error: any) => {
        if (error) {
          reject(chalk.red('Sorry! ionic-sub did not rewrite ./tslint.json.'))
          return
        }
        resolve('[' + chalk.green('OK') + '] ' + 'Complete rewrite ./tslint.json.')
      })
    })
  }
}
