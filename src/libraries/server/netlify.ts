const chalk = require('chalk')
const fs = require('fs')

export class Netlify {
  constructor(public type: string, public flags: any) {
    require.extensions['.txt'] = (module, filename) => {
      module.exports = fs.readFileSync(filename, 'utf8')
    }
  }

  installBuildFile(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      await fs.access('./netlify.build.js', fs.constants.R_OK || fs.constants.W_OK, (error: any) => {
        if (!error) {
          resolve('[' + chalk.green('OK') + '] ' + './netlify.build.js is exist. Do not overwrite.')
          return
        }
      })
      let filePath: string
      if (this.type === 'ionic-angular') {
        filePath = './../../template/ionic_angular/netlify.build.js'
      } else {
        filePath = './../../template/angular/netlify.build.js'
      }

      let data = require(filePath)

      if (this.flags.domain) {
        data = data.replace(/\'example\.com\'/, '\'' + this.flags.domain + '\'')
      }
      fs.writeFile('./netlify.build.js', data, (error: any) => {
        if (error) {
          reject(chalk.red('Sorry! ionic-sub did not write ./netlify.build.js.'))
          return
        }
        resolve('[' + chalk.green('OK') + '] ' + 'write ./netlify.build.js.')
      })
    })
  }
}
