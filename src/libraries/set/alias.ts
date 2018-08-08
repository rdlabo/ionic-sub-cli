import cli from 'cli-ux'

const chalk = require('chalk')
const exec = require('child_process').exec
const fs = require('fs')

export class Alias {
  public type: string
  public flags: any
  constructor(type: string, flags: object) {
    this.type = type
    this.flags = flags

    require.extensions['.txt'] = (module, filename) => {
      module.exports = fs.readFileSync(filename, 'utf8')
    }
  }
  installPackage(): Promise<string> {
    if (this.type === 'ionic-angular') {
      cli.action.start('> ' + chalk.green('npm install semver-dsl --save-dev.'))
      return new Promise((resolve, reject) => {
        exec('npm install semver-dsl --save-dev', (error: any) => {
          if (error) {
            reject(chalk.red('Sorry. failed npm install. You should exec `npm install semver-dsl --save-dev`.'))
            return
          }
          cli.action.stop()
          resolve('[' + chalk.green('OK') + '] ' + 'Complete install semver-dsl --save-dev.')
        })
      })
    } else {
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Do not need package install.'))
    }
  }

  addWebpack(): Promise<string> {
    if (this.type === 'ionic-angular') {
      return new Promise((resolve, reject) => {
        fs.writeFile('./webpack.config.js', require('../../template/ionic_angular/webpack.config.txt'), (error: any) => {
          if (error) {
            reject(chalk.red('Sorry! ionic-sub did not create ./webpack.config.js.'))
            return
          }
          resolve('[' + chalk.green('OK') + '] ' + 'Complete create ./webpack.config.js.')
        })
      })
    } else {
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Do not need to create webpack.config.js.'))
    }
  }

  rewritePackageJson(): Promise<string> {
    if (this.type === 'ionic-angular') {
      return new Promise((resolve, reject) => {
        fs.readFile('./package.json', 'utf8', (error: any, data: string) => {
          if (error) {
            reject(chalk.red('Sorry! ionic-sub did not read package.json.'))
            return
          }

          const package_json = JSON.parse(data)
          package_json.config = {ionic_webpack: './webpack.config.js'}

          fs.writeFile('./package.json', JSON.stringify(package_json, null, '  '), (error: any) => {
            if (error) {
              reject(chalk.red('Sorry! ionic-sub did not rewrite package.json'))
              return
            }
            resolve('[' + chalk.green('OK') + '] ' + 'Rewrite package.json script. Add config.ionic_webpack.')
          })
        })
      })
    } else {
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Do not need to rewrite package.json script'))
    }
  }

  rewriteTsconfigJson(): Promise<string> {
    if (this.type === 'ionic-angular') {
      return new Promise((resolve, reject) => {
        fs.readFile('./tsconfig.json', 'utf8', (error: any, data: string) => {
          if (error) {
            reject(chalk.red('Sorry! ionic-sub did not read tsconfig.json.'))
            return
          }

          const tsconfig_json = JSON.parse(data)
          tsconfig_json.compilerOptions.baseUrl = 'src'
          tsconfig_json.compilerOptions.paths = {
            '@app/environment': ['environments/environment.prod.ts', 'environments/environment.dev.ts'],
            '@/*': ['*']
          }
          fs.writeFile('./tsconfig.json', JSON.stringify(tsconfig_json, null, '  '), (error: any) => {
            if (error) {
              reject(chalk.red('Sorry! ionic-sub did not rewrite tsconfig.json'))
              return
            }
            resolve('[' + chalk.green('OK') + '] ' + 'Rewrite tsconfig.json. Add baseUrl and path.')
          })
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        fs.readFile('./tsconfig.json', 'utf8', (error: any, data: string) => {
          if (error) {
            reject(chalk.red('Sorry! ionic-sub did not read tsconfig.json.'))
            return
          }

          const tsconfig_json = JSON.parse(data)
          tsconfig_json.compilerOptions.baseUrl = 'src'
          tsconfig_json.compilerOptions.paths = {
            '@/*': ['app/*']
          }
          fs.writeFile('./tsconfig.json', JSON.stringify(tsconfig_json, null, '  '), (error: any) => {
            if (error) {
              reject(chalk.red('Sorry! ionic-sub did not rewrite tsconfig.json'))
              return
            }
            resolve('[' + chalk.green('OK') + '] ' + 'Rewrite tsconfig.json. Add baseUrl and path.')
          })
        })
      })
    }
  }
  addEnvironmentFile(): Promise<string> {
    if (this.type === 'ionic-angular') {
      return new Promise((resolve, reject) => {
        // add folder
        fs.mkdir('./src/environments', (error: any) => {
          if (error) {}
          // add environment file
          fs.writeFile('./src/environments/environment.dev.ts', require('../../template/ionic_angular/environment.dev.ts.txt'), (error: any) => {
            if (error) {
              reject(chalk.red('Sorry! ionic-sub did not create ./src/environments/environment.dev.ts.'))
              return
            }

            fs.writeFile('./src/environments/environment.prod.ts', require('../../template/ionic_angular/environment.prod.ts.txt'), (error: any) => {
              if (error) {
                reject(chalk.red('Sorry! ionic-sub did not create ./src/environments/environment.prod.ts.'))
                return
              }
              resolve('[' + chalk.green('OK') + '] ' + 'Complete create ./src/environments/environment.ts and ./src/environments/environment.prod.ts.')
            })
          })
        })
      })
    } else {
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Do not need to create environment file.'))
    }
  }
}
