import {Command, flags} from '@oclif/command'
const chalk = require('chalk')
const subcommands = chalk.green('lint') + ', ' + chalk.green('prettier') + ', ' + chalk.green('alias') + ', ' + chalk.green('all')

export default class Set extends Command {
  static description = 'Commands for set project auto. (subcommands: ' + subcommands + ')'

  static examples = ['$ ionic-sub set ' + chalk.green('lint')]

  static flags = {
    help: flags.help({char: 'h'}),
    dry: flags.boolean({char: 'd'}),
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
    const {Helper} = await import('../libraries/helper')
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
      case 'prettier':
        this.prettier().catch()
        break
      case 'alias':
        this.alias().catch()
        break
      case 'all':
        await this.lint().catch()
        await this.prettier().catch()
        await this.alias().catch()
        break
      default:
        this.error(args.package + ' args is not fount.')
    }
  }
  async lint() {
    const {Lint} = await import('../libraries/set/lint')
    const lint = new Lint(this.type, this.flags)
    this.log(await lint.installPackage().catch(error => error))
    this.log(await lint.addLint().catch(error => error))
  }
  async prettier() {
    const {Prettier} = await import('../libraries/set/prettier')
    const prettier = new Prettier(this.type, this.flags)
    this.log(await prettier.installPackage().catch(error => error))
    this.log(await prettier.addPrettierConfig().catch(error => error))
    this.log(await prettier.rewritePackageJson().catch(error => error))
  }
  async alias() {
    const {Alias} = await import('../libraries/set/alias')
    const alias = new Alias(this.type, this.flags)
    this.log(await alias.installPackage().catch(error => error))
    this.log(await alias.addWebpack().catch(error => error))
    this.log(await alias.rewritePackageJson().catch(error => error))
    this.log(await alias.rewriteTsconfigJson().catch(error => error))
    this.log(await alias.addEnvironmentFile().catch(error => error))
  }
}
