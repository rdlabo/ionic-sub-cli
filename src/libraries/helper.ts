const fs = require('fs')

export class Helper {
  public getIonicType(): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile('./ionic.config.json', 'utf8', (error: any, data: string) => {
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
}
