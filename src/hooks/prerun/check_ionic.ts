import {Hook} from '@oclif/config'

// todo: check ionic platform.
const hook: Hook<'prerun'> = async function () {
  // const fs = require('fs')
  // const filePath = './ionic.config.json'
  //
  // fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (error: any) => {
  //   if (error) {
  //     this.warn('Sorry! ionic-ad can only be run in an Ionic project directory.')
  //     this.exit()
  //   }
  // })
}

export default hook
