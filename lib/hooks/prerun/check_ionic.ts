import {Hook} from '@oclif/config'

const hook: Hook<'prerun'> = async function (opts) {
  const fs = require('fs')
  const filePath = './ionic.config.json'

  fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, error => {
    if (error) {
      this.log('Sorry! ionic-ad can only be run in an Ionic project directory.')
      return
    }
  })
}

export default hook
