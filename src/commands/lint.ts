import {Command, flags} from '@oclif/command'

export default class Lint extends Command {
  static description = 'add original tslint format.'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  async run() {
    this.parse(Lint)
    const fs = require('fs')
    const filePath = './tslint.json'

    const exec = require('child_process').exec
    exec('npm install codelyzer --save-dev', error => {
      if (error) {
        this.log('Sorry. failed npm install. You should exec npm install codelyzer --save-dev')
      } else {
        this.log('Complete install codelyzer --save-dev')
      }
    })

    fs.writeFile(filePath, tsLintRule, error => {
      if (error) {
        this.log('Sorry! ionic-ad lint did not re-write ts-lint-rule.')
        return
      }
    })
    this.log('Complete change ts-lint rule')
  }
}

const tsLintRule: string =
  '{\n' +
  '  "rulesDirectory": [\n' +
  '    "node_modules/codelyzer"\n' +
  '  ],\n' +
  '  "rules": {\n' +
  '    "arrow-return-shorthand": true,\n' +
  '    "callable-types": true,\n' +
  '    "class-name": true,\n' +
  '    "comment-format": [\n' +
  '      true,\n' +
  '      "check-space"\n' +
  '    ],\n' +
  '    "curly": true,\n' +
  '    "deprecation": {\n' +
  '      "severity": "warn"\n' +
  '    },\n' +
  '    "eofline": true,\n' +
  '    "forin": true,\n' +
  '    "import-spacing": true,\n' +
  '    "indent": [\n' +
  '      true,\n' +
  '      "spaces"\n' +
  '    ],\n' +
  '    "interface-over-type-literal": true,\n' +
  '    "label-position": true,\n' +
  '    "max-line-length": [\n' +
  '      true,\n' +
  '      140\n' +
  '    ],\n' +
  '    "member-access": false,\n' +
  '    "member-ordering": [\n' +
  '      true,\n' +
  '      {\n' +
  '        "order": [\n' +
  '          "static-field",\n' +
  '          "instance-field",\n' +
  '          "static-method",\n' +
  '          "instance-method"\n' +
  '        ]\n' +
  '      }\n' +
  '    ],\n' +
  '    "no-arg": true,\n' +
  '    "no-bitwise": true,\n' +
  '    "no-console": [\n' +
  '      true,\n' +
  '      "debug",\n' +
  '      "info",\n' +
  '      "time",\n' +
  '      "timeEnd",\n' +
  '      "trace"\n' +
  '    ],\n' +
  '    "no-construct": true,\n' +
  '    "no-debugger": true,\n' +
  '    "no-duplicate-super": true,\n' +
  '    "no-empty": false,\n' +
  '    "no-empty-interface": true,\n' +
  '    "no-eval": true,\n' +
  '    "no-inferrable-types": [\n' +
  '      false,\n' +
  '      "ignore-params"\n' +
  '    ],\n' +
  '    "no-misused-new": true,\n' +
  '    "no-non-null-assertion": true,\n' +
  '    "no-shadowed-variable": true,\n' +
  '    "no-string-literal": false,\n' +
  '    "no-string-throw": true,\n' +
  '    "no-switch-case-fall-through": true,\n' +
  '    "no-trailing-whitespace": false,\n' +
  '    "no-unnecessary-initializer": true,\n' +
  '    "no-unused-expression": true,\n' +
  '    "no-use-before-declare": true,\n' +
  '    "no-var-keyword": true,\n' +
  '    "object-literal-sort-keys": false,\n' +
  '    "one-line": [\n' +
  '      true,\n' +
  '      "check-open-brace",\n' +
  '      "check-catch",\n' +
  '      "check-else",\n' +
  '      "check-whitespace"\n' +
  '    ],\n' +
  '    "prefer-const": true,\n' +
  '    "quotemark": [\n' +
  '      true,\n' +
  '      "single"\n' +
  '    ],\n' +
  '    "radix": true,\n' +
  '    "semicolon": [\n' +
  '      true,\n' +
  '      "always"\n' +
  '    ],\n' +
  '    "triple-equals": [\n' +
  '      true,\n' +
  '      "allow-null-check"\n' +
  '    ],\n' +
  '    "typedef-whitespace": [\n' +
  '      true,\n' +
  '      {\n' +
  '        "call-signature": "nospace",\n' +
  '        "index-signature": "nospace",\n' +
  '        "parameter": "nospace",\n' +
  '        "property-declaration": "nospace",\n' +
  '        "variable-declaration": "nospace"\n' +
  '      }\n' +
  '    ],\n' +
  '    "unified-signatures": true,\n' +
  '    "variable-name": false,\n' +
  '    "whitespace": [\n' +
  '      true,\n' +
  '      "check-branch",\n' +
  '      "check-decl",\n' +
  '      "check-operator",\n' +
  '      //      "check-separator",\n' +
  '      "check-type"\n' +
  '    ],\n' +
  '    "directive-selector": [\n' +
  '      true,\n' +
  '      "attribute",\n' +
  '      "app",\n' +
  '      "camelCase"\n' +
  '    ],\n' +
  '    "component-selector": [\n' +
  '      true,\n' +
  '      "element",\n' +
  '      "app",\n' +
  '      "kebab-case"\n' +
  '    ],\n' +
  '    "no-output-on-prefix": true,\n' +
  '    "use-input-property-decorator": true,\n' +
  '    "use-output-property-decorator": true,\n' +
  '    "use-host-property-decorator": true,\n' +
  '    "no-input-rename": true,\n' +
  '    "no-output-rename": true,\n' +
  '    "use-life-cycle-interface": true,\n' +
  '    "use-pipe-transform-interface": true,\n' +
  '    "directive-class-suffix": true\n' +
  '  }\n' +
  '}'
