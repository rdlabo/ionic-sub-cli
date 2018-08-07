import cli from 'cli-ux'
const chalk = require('chalk')
const fs = require('fs')
const exec = require('child_process').exec

export class Lint {
  public type: string
  public flags: any
  constructor(type: string, flags: object) {
    this.type = type
    this.flags = flags
  }

  installPackage(): Promise<string> {
    if (this.type === 'ionic-angular') {
      const option = (this.flags.dry) ? ' --dry-run' : ''
      cli.action.start('> ' + chalk.green('npm install codelyzer --save-dev' + option))
      return new Promise((resolve, reject) => {
        exec('npm install codelyzer --save-dev' + option, (error: any) => {
          if (error) {
            reject(chalk.red('Sorry. failed npm install. You should exec npm install codelyzer --save-dev' + option))
            return
          }
          cli.action.stop()
          resolve('[' + chalk.green('OK') + '] ' + 'Complete install codelyzer --save-dev' + option)
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
