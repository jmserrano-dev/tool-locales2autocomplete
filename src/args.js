#!/usr/bin/env node

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

class Args {
    static getUsage() {
        const sections =
        [
            {
                header: 'JSON2DTS',
                content: 'Convert json (i18n) in Typescript decalrations (d.ts)'
            },
            {
                header: 'Options',
                optionList:
                [
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
    
    static getOptionsFromCommandLine() {
        const optionDefinitions = [
            { name: 'input', alias: 'i', type: String },
            { name: 'output', alias: 'o', type: String },
            { name: 'help', alias:'h', type: String }
        ];
    
        const options = commandLineArgs(optionDefinitions);
        const {input, output, help} = options;
    
        if(help || (input == undefined || output == undefined)) {
            console.log(Args.getUsage());
            process.exit(0);
        }
    
        return { input, output };
    }
}

module.exports = Args;