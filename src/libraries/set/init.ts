import cli from 'cli-ux'

const chalk = require('chalk')
const exec = require('child_process').exec
const fs = require('fs')

export class Init {
  public type: string
  public flags: any
  constructor(type: string, flags: object) {
    this.type = type
    this.flags = flags

    require.extensions['.txt'] = (module, filename) => {
      module.exports = fs.readFileSync(filename, 'utf8')
    }
  }
  async installModules(): Promise<string> {
    if (this.type === 'ionic-angular') {
      return '[' + chalk.green('OK') + '] ' + 'Do not need install.'
    } else {
      const returnMessage = []
      const installModuleCmd = 'ionic g module directives && ionic g module pipes'
      cli.action.start('> ' + chalk.green(installModuleCmd))
      const installModule = await new Promise((resolve, reject) => {
        exec(installModuleCmd, (error: any) => {
          cli.action.stop()
          if (error) {
            reject(chalk.red('Sorry. failed ionic command. You should exec `' + installModuleCmd + '`'))
            return
          }
          resolve('[' + chalk.green('OK') + '] ' + 'Complete install ' + installModuleCmd)
        })
      }).catch(e => e)
      returnMessage.push(installModule)

      const createInterfaceCmd = 'mkdir src/interfaces && touch src/interfaces/index.ts && mkdir src/app/components'
      const createInterface = await new Promise((resolve, reject) => {
        exec(createInterfaceCmd, (error: any) => {
          cli.action.stop()
          if (error) {
            reject(chalk.red('Sorry. failed command. You should exec `' + createInterfaceCmd + '`'))
            return
          }
          resolve('[' + chalk.green('OK') + '] ' + 'Complete ' + createInterfaceCmd)
        })
      }).catch(e => e)
      returnMessage.push(createInterface)

      const createComponents = await new Promise(async (resolve, reject) => {
        await fs.access('./src/app/components/components.module.ts', fs.constants.R_OK || fs.constants.W_OK, (error: any) => {
          if (!error) {
            resolve('[' + chalk.green('OK') + '] ' + 'components.module.ts is exist. Do not overwrite.')
            return
          }
        })
        const filePath = './../../template/angular/components.module.ts'
        let data = require(filePath)

        fs.writeFile('./src/app/components/components.module.ts', data, (error: any) => {
          if (error) {
            reject(chalk.red('Sorry! ionic-sub did not write ./src/app/components/components.module.ts'))
            return
          }
          resolve('[' + chalk.green('OK') + '] ' + 'write ./src/app/components/components.module.ts')
        })
      }).catch(e => e)
      returnMessage.push(createComponents)

      return returnMessage.join('\n')
    }
  }
}
