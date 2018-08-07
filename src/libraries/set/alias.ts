const chalk = require('chalk')
const fs = require('fs')

export class Alias {
  public type: string
  constructor(type: string) {
    this.type = type

    require.extensions['.txt'] = (module, filename) => {
      module.exports = fs.readFileSync(filename, 'utf8')
    }
  }

  addWebpack() {
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
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Sorry. Implementation of type angular is still.'))
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
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Sorry. Implementation of type angular is still.'))
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
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Sorry. Implementation of type angular is still.'))
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
      return new Promise(resolve => resolve('[' + chalk.green('OK') + '] ' + 'Sorry. Implementation of type angular is still.'))
    }
  }
}
