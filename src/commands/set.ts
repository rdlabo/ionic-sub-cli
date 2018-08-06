import {Command, flags} from '@oclif/command'

export default class Set extends Command {
  static description = 'auto set config. input arg `lint` or `prettier`' +
    'ex) ionic-sub set lint'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{
    name: 'package',
    description: 'input `lint` or `prettier`',
    required: true
  }]

  async run() {
    const {args} = this.parse(Set)
    const {Helper} = await import('../libraries/helper')
    this.type = await new Helper().getIonicType().catch(error => {
      this.error(error)
      this.exit(200)
    })
    if (this.type !== 'ionic-angular' && this.type !== 'angular') {
      this.error('Sorry! ionic-sub CLI can only be run in ionic-angular or angular only')
    }

    switch (args.package) {
      case 'lint':
        this.lint().catch()
        break
      case 'prettier':
        this.prettier().catch()
        break
      default:
    }
  }
  async lint() {
    const {Lint} = await import('../libraries/lint')
    const lint = new Lint(this.type)
    this.log(await lint.installPackage().catch(error => this.log(error)))
    this.log(await lint.addLint().catch(error => this.log(error)))
  }
  async prettier() {
    const {Prettier} = await import('../libraries/prettier')
    const prettier = new Prettier(this.type)
    this.log(await prettier.installPackage().catch(error => this.log(error)))
    this.log(await prettier.addPrettierConfig().catch(error => this.log(error)))
    this.log(await prettier.rewritePackageJson().catch(error => this.log(error)))
  }
}
