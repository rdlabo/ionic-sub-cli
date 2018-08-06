import { Command, flags } from '@oclif/command';
export default class Hello extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        help: import("../../../../../../Users/sakakibara/dev/ionic-sub/node_modules/@oclif/parser/lib/flags").IBooleanFlag<void>;
        name: flags.IOptionFlag<string | undefined>;
        force: import("../../../../../../Users/sakakibara/dev/ionic-sub/node_modules/@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: {
        name: string;
    }[];
    run(): Promise<void>;
}
