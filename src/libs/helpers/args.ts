#!/usr/bin/env node

import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

interface ICommandLineOptions {
    type: string;
    input: string;
    output: string;
}

class Args {
    public static getOptionsFromCommandLine(): ICommandLineOptions  {
        const optionDefinitions = [
            { name: 'type', alias: 't', type: String },
            { name: 'input', alias: 'i', type: String },
            { name: 'output', alias: 'o', type: String },
            { name: 'help', alias:'h', type: String }
        ];

        const options = commandLineArgs(optionDefinitions);
        const {type, input, output, help} = options;

        if(
            help ||
            (type === undefined || input === undefined || output === undefined) ||
            (type !== 'vscode' && type !== 'dts')
        ) {
            // tslint:disable-next-line:no-console
            console.log(Args.getUsage());
            process.exit(0);
        }

        return { type, input, output };
    }

    private static getUsage(): string {
        const sections =
        [
            {
                header: 'LOCALES2AUTOCOMPLETE',
                content: 'Convert json (i18n) in VSCode snippets (code-snippets) or Typescript decalrations (d.ts)'
            },
            {
                header: 'Options',
                optionList:
                [
                    {
                        alias: 't',
                        name: 'type',
                        typeLabel: '{underline vscode or dts}',
                        description: 'Type of declaration. You can generate VSCode snippet or typescript declaration.'
                    },
                    {
                        alias: 'i',
                        name: 'input',
                        typeLabel: '{underline file/folder}',
                        description: 'Path of the file/folder to be processed.'
                    },
                    {
                        alias: 'o',
                        name: 'output',
                        typeLabel: '{underline file}',
                        description: 'Output file path.'
                    },
                    {
                        alias: 'h',
                        name: 'help',
                        description: 'Print this usage guide.'
                    }
                ]
            }
        ];

        return commandLineUsage(sections);
    }
}

export default Args;