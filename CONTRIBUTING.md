# Contributing

### Branches

* [`develop`](https://github.com/rdlabo/ionic-sub/tree/develop): **development** branch
* [`master`](https://github.com/rdlabo/ionic-sub/tree/master): **stable** version (`npm install -g @rdlabo/ionic-sub`)

### Bug Reports

Please also copy/paste the output of the `ionic info` command into your issue
and be as descriptive as possible. Include any steps that might help us
reproduce your issue.


### Pull Requests

Pull requests are most welcome! But, if you plan to add features or do large
refactors, please **open a dialogue** with us first by creating an issue. Small
bug fixes are welcome any time.

### Local Setup

#### Toolset

* npm 5 is required.
* Node 8+ is required.
* The codebase is written in [TypeScript](https://www.typescriptlang.org/). If
  you're unfamiliar with TypeScript, we recommend using [VS
  Code](https://code.visualstudio.com/) and finding a tutorial to familiarize
  yourself with basic concepts.

#### Setup

1. Fork the repo & clone it locally.
1. `npm install` to install the dev tools.
1. Optionally `npm run link` to make `ionic-sub` and other bin files point to your
   dev CLI.
1. TypeScript source files are in `src/`.
1. Good luck! :muscle: Please open an issue if you have questions or something
   is unclear.

#### Running Dev CLI

Switch to dev CLI:

```bash
$ npm uninstall -g @rdlabo/ionic-sub
$ npm run link
```

Switch back to stable CLI:

```bash
$ npm run unlink
$ npm install -g @rdlabo/ionic-sub
```

##### Code Structure

TODO: Be helpful about where to look for commands, utilities, etc.

##### Publishing

Publishing occurs in CI when new changes are merged into `master`.

To publish **testing** versions, follow these steps:

1. Cancel any watch scripts.
1. Run `npm run publish:testing`
