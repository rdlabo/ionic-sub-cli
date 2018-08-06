import {Command, flags} from '@oclif/command'
const chalk = require('chalk')

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
    const type = await new Helper().getIonicType().catch(error => {
      this.error(error)
    })

    if (type !== 'ionic-angular' && type !== 'angular') {
      this.error('Sorry! ionic-sub CLI can only be run in ionic-angular or angular only')
    }
    if (args.package === 'lint') {
      const {Lint} = await import('../libraries/lint')
      const lint = new Lint(type)
      this.log(await lint.installPackage().catch(error => {
        this.log(error)
      }))
      this.log(await lint.addTslint().catch(error => {
        this.log(error)
      }))
    } else if (args.package === 'prettier') {
      this.prettier().catch()
    }
  }
}
