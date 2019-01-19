#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
const command_line_usage_1 = __importDefault(require("command-line-usage"));
class Args {
    static getUsage() {
        const sections = [
            {
                header: 'JSON2DTS',
                content: 'Convert json (i18n) in Typescript decalrations (d.ts)'
            },
            {
                header: 'Options',
                optionList: [
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
        return command_line_usage_1.default(sections);
    }
    static getOptionsFromCommandLine() {
        const optionDefinitions = [
            { name: 'input', alias: 'i', type: String },
            { name: 'output', alias: 'o', type: String },
            { name: 'help', alias: 'h', type: String }
        ];
        const options = command_line_args_1.default(optionDefinitions);
        const { input, output, help } = options;
        if (help || (input == undefined || output == undefined)) {
            console.log(Args.getUsage());
            process.exit(0);
        }
        return { input, output };
    }
}
exports.default = Args;
