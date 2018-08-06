import cli from 'cli-ux'
const chalk = require('chalk')
const exec = require('child_process').exec
const fs = require('fs')

export class Prettier {
  public type: string
  constructor(type: string) {
    this.type = type
  }

  installPackage(): Promise<string> {
    cli.action.start('> ' + chalk.green('npm install prettier @kaizenplatform/prettier-config pre-commit --save-dev'))
    return new Promise((resolve, reject) => {
      exec('npm install prettier @kaizenplatform/prettier-config pre-commit --save-dev', (error: any) => {
        cli.action.stop()
        if (error) {
          reject(chalk.red('Sorry. failed npm install. You should exec `npm install prettier @kaizenplatform/prettier-config pre-commit --save-dev`'))
          return
        }
        resolve('[' + chalk.green('OK') + '] ' + 'Complete install prettier @kaizenplatform/prettier-config pre-commit --save-dev')
      })
    })
  }
  addPrettierConfig(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.writeFile('./prettier.config.js', 'module.exports =require(\'@kaizenplatform/prettier-config\');', (error: any) => {
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
        if (!package_json.scripts.prettier) {
          package_json.scripts.prettier = 'prettier --parser typescript --single-quote --write "./**/*.ts"'
        }

        if (!package_json['pre-commit']) {
          package_json['pre-commit'] = [
            'prettier'
          ]
        }

        fs.writeFile('./package.json', JSON.stringify(package_json, null, '  '), (error: any) => {
          if (error) {
            reject(chalk.red('Sorry! ionic-sub did not re-write package.json/'))
            return
          }
          resolve('[' + chalk.green('OK') + '] ' + 'Rewrite package.json script. Add prettier and pre-commit.')
        })
      })
    })
  }
}
