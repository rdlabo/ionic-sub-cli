import {execSync} from 'child_process'
const chalk = require('chalk')
const fs = require('fs')

export class Helper {
  public getIonicType(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      await this.checkNpmVersion('ionic', 'ionic').catch(error => {
        process.stdout.write(error + '\n')
      })
      await this.checkNpmVersion('@rdlabo/ionic-sub', 'ionic-sub').catch(error => {
        process.stdout.write(error + '\n')
      })
      await fs.readFile('./ionic.config.json', 'utf8', (error: any, data: string) => {
        if (error) {
          reject('Sorry! ionic-sub CLI can only be run in an Ionic project directory.')
          return
        }
        const config = JSON.parse(data)
        if (!config.type) {
          reject('Sorry! ionic-sub CLI could not get Ionic type from ionic.config.json')
          return
        }
        resolve(config.type)
      })
    })
  }
  public async checkNpmVersion(pkg: string, command: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const v = await execSync('npm show ' + pkg + ' version').toString().match(/(\d|\.)+/)
        const l = await execSync(command + ' -v').toString().match(/(\d|\.)+/)
        if (l && l[0] && v && v[0]) {
          if (v[0] > l[0]) {
            const message = 'Local npm package `' + pkg + '` is old (New ' + v[0] + ' > Local ' + l[0] + '). Please exec `npm install ' + pkg + ' -g`'
            reject(chalk.red('[Warning] ') + message)
            return
          }
        }
        resolve()
      } catch {
        reject('[Warning] You should exec `npm install ' + pkg + ' -g` or set path.')
        return
      }
    })
  }
}
