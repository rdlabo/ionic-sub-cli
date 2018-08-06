import cli from 'cli-ux'
import {tsLintRule} from '../config/file.line'

export class Prettier {
  async prettier() {
    cli.action.start('> ' + chalk.green('npm install prettier @kaizenplatform/prettier-config pre-commit --save-dev'))
    await new Promise(resolve => {
      exec('npm install prettier @kaizenplatform/prettier-config pre-commit --save-dev', (error: any) => {
        if (error) {
          this.log(chalk.red('Sorry. failed npm install. You should exec npm install @kaizenplatform/prettier-config --save-dev'))
        } else {
          this.log('[' + chalk.green('OK') + '] ' + 'Complete install prettier @kaizenplatform/prettier-config pre-commit --save-dev')
        }
        cli.action.stop()
        resolve()
      })
    })

    fs.writeFile('./prettier.config.js', 'module.exports =require(\'@kaizenplatform/prettier-config\');', (error: any) => {
      if (error) {
        this.log(chalk.red('Sorry! ionic-sub did not write prettier.config.js.'))
      } else {
        this.log('[' + chalk.green('OK') + '] ' + 'create prettier.config.js')
      }
    })

    fs.readFile('./package.json', 'utf8', (error: any, data: string) => {
      if (error) {
        this.log(chalk.red('Sorry! ionic-sub did not read package.json.'))
        return
      }

      const executed = data.match(/\"pre-commit: {\"/g)
      if (executed) {
        this.log(chalk.red('package.json have \'"pre-commit: {\' line. this command do not overwrite.'))
        return
      }

      const scriptPrettier = '"lint": "ionic-app-scripts lint",\n    "prettier": "prettier --parser typescript --single-quote --write \\"./**/*.ts\\""'
      data = data.replace('\"lint\"\: \"ionic-app-scripts lint\"', scriptPrettier)
      const scriptPrecommit = '"pre-commit": ["prettier"],\n  "dependencies": {'
      data = data.replace('"dependencies": {', scriptPrecommit)

      fs.writeFile('./package.json', data, (error: any) => {
        if (error) {
          this.log(chalk.red('Sorry! ionic-sub did not re-write package.json/'))
        } else {
          this.log('[' + chalk.green('OK') + '] ' + 'write prettier and pre-commit in package.json')
        }
        return
      })
    })
  }
}
