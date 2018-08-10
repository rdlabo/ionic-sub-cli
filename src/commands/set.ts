import {Command, flags} from '@oclif/command'
const chalk = require('chalk')
const subcommands = chalk.green('lint') + ', ' + chalk.green('formatter') + ', ' + chalk.green('alias') + ', ' + chalk.green('all')
import {Alias, Formatter, Helper, Lint} from '../libraries'

export default class Set extends Command {
  static description = 'Commands for set project auto. (subcommands: ' + subcommands + ')'

  static examples = ['$ ionic-sub set ' + chalk.green('lint')]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{
    name: 'package',
    description: subcommands,
    required: true
  }]
  public type: string = ''
  public flags: object = {}

  async run() {
    const {args, flags} = this.parse(Set)
    this.type = await new Helper().getIonicType().catch(error => {
      this.error(error, {exit: 412})
      return error
    })
    if (this.type !== 'ionic-angular' && this.type !== 'angular') {
      this.error('Sorry! ionic-sub CLI can only be run in ionic-angular or angular only')
    }
    this.flags = flags

    switch (args.package) {
      case 'lint':
        this.lint().catch()
        break
      case ('prettier' || 'formatter'):
        this.formatter().catch()
        break
      case 'alias':
        this.alias().catch()
        break
      case 'all':
        await this.lint().catch()
        await this.formatter().catch()
        await this.alias().catch()
        break
      default:
        this.error(args.package + ' args is not fount.')
    }
  }
  async lint() {
    const lint = new Lint(this.type, this.flags)
    this.log(await lint.installPackage().catch(error => error))
    this.log(await lint.addLint().catch(error => error))
  }
  async formatter() {
    const formatter = new Formatter(this.type, this.flags)
    this.log(await formatter.installPackage().catch(error => error))
    this.log(await formatter.addPrettierConfig().catch(error => error))
    this.log(await formatter.rewritePackageJson().catch(error => error))
  }
  async alias() {
    const alias = new Alias(this.type, this.flags)
    this.log(await alias.installPackage().catch(error => error))
    this.log(await alias.addWebpack().catch(error => error))
    this.log(await alias.rewritePackageJson().catch(error => error))
    this.log(await alias.rewriteTsconfigJson().catch(error => error))
    this.log(await alias.addEnvironmentFile().catch(error => error))
  }
}
