import {Command, flags} from '@oclif/command'
const chalk = require('chalk')
const subcommands = chalk.green('netlify')
import {Helper, Netlify} from '../libraries'

export default class Server extends Command {
  static description = 'Commands for set server environment. (subcommands: ' + subcommands + ')'

  static examples = ['$ ionic-sub server ' + chalk.green('netlify')]

  static flags = {
    help: flags.help({char: 'h'}),
    domain: flags.string({
      char: 'd',
      description: 'set your domain. default is `example.com`',
    }),
  }

  static args = [{
    name: 'package',
    description: subcommands,
    required: true
  }]
  public type = ''
  public flags: object = {}

  async run() {
    const {args, flags} = this.parse(Server)
    this.type = await new Helper().getIonicType().catch(error => {
      this.error(error, {exit: 412})
      return error
    })
    if (this.type !== 'ionic-angular' && this.type !== 'angular') {
      this.error('Sorry! ionic-sub CLI can only be run in ionic-angular or angular only')
    }
    this.flags = flags

    switch (args.package) {
    case 'netlify':
      this.netlify().catch()
      break
    default:
      this.error(args.package + ' args is not fount.')
    }
  }
  async netlify() {
    const netlify = new Netlify(this.type, this.flags)
    this.log(await netlify.installBuildFile().catch(error => error))
  }
}
