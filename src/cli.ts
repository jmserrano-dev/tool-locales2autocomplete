#!/usr/bin/env node

import { Args, File } from './libs/helpers'
import { IConverter, DeclarationTypescriptConverter, VSCodeSnippetConverter } from './libs/converter'

async function start(): Promise<void> {
    const isDirectory = await File.isDirectory(input);
    let converter: IConverter;

    switch(type) {
        case VSCodeSnippetConverter.typeName:
            converter = new VSCodeSnippetConverter();
            break;
        case DeclarationTypescriptConverter.typeName:
            converter = new DeclarationTypescriptConverter();
            break;
        default:
            throw new Error(`Type [${type}] no supported`)
    }

    const declaration = (isDirectory)
        ? await converter.getDeclarationFromFolder(input)
        : await converter.getDeclarationFromFile(input, "translations");
    File.writeFile(output, declaration);
};

const { type, input, output } = Args.getOptionsFromCommandLine();

start();
