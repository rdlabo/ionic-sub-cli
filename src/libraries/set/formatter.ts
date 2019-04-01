import cli from 'cli-ux'
const chalk = require('chalk')
const exec = require('child_process').exec
const fs = require('fs')

export class Formatter {
  public type: string
  public flags: any
  constructor(type: string, flags: object) {
    this.type = type
    this.flags = flags
  }

  installPackage(): Promise<string> {
    const packages = ['prettier', '@kaizenplatform/prettier-config', 'pre-commit', 'lint-staged'].join('')
    const installCmd = `npm install ${packages} --save-dev`
    cli.action.start('> ' + chalk.green(installCmd))
    return new Promise((resolve, reject) => {
      exec(installCmd, (error: any) => {
        cli.action.stop()
        if (error) {
          reject(chalk.red('Sorry. failed npm install. You should exec `' + installCmd + '`'))
          return
        }
        resolve('[' + chalk.green('OK') + '] ' + 'Complete install ' + packages)
      })
    })
  }
  addPrettierConfig(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      await fs.access('./prettier.config.js', fs.constants.R_OK || fs.constants.W_OK, (error: any) => {
        if (!error) {
          resolve('[' + chalk.green('OK') + '] ' + './prettier.config.js is exist Do not overwrite.')
          return
        }
      })
      await fs.writeFile('./prettier.config.js', 'module.exports =require(\'@kaizenplatform/prettier-config\');', (error: any) => {
        if (error) {
          reject(chalk.red('Sorry! ionic-sub did not write prettier.config.js.'))
          return
        }
        resolve('[' + chalk.green('OK') + '] ' + 'Create ./prettier.config.js')
      })
    })
  }
  rewritePackageJson(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile('./package.json', 'utf8', (error: any, data: string) => {
        if (error) {
          reject(chalk.red('Sorry! ionic-sub did not read package.json.'))
          return
        }

        const package_json = JSON.parse(data)
        if (!package_json.scripts['lint-staged']) package_json.scripts['lint-staged'] = 'lint-staged'
        if (!package_json.scripts.formatter) package_json.scripts.formatter = 'prettier --parser typescript --single-quote --write "./**/*.ts"'
        if (!package_json['pre-commit']) package_json['pre-commit'] = ['lint-staged']
        if (!package_json['lint-staged']) {
          package_json['lint-staged'] = {
            '*.ts': [
              'prettier --parser typescript --single-quote --write',
              'git add'
            ]
          }
        }

        fs.writeFile('./package.json', JSON.stringify(package_json, null, '  '), (error: any) => {
          if (error) {
            reject(chalk.red('Sorry! ionic-sub did not rewrite package.json.'))
            return
          }
          resolve('[' + chalk.green('OK') + '] ' + 'Rewrite package.json script. Add prettier and pre-commit.(not overwrite)')
        })
      })
    })
  }
}
