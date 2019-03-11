#!/usr/bin/env node

import { File } from '../helpers';
import IConverter from "./interfaces/iConverter";
import Converter from "./base/converter";
import { VSCodeSnippetTemplate } from "../template";

export default class VSCodeSnippetConverter extends Converter implements IConverter {
    public static typeName = 'vscode';
    private template: VSCodeSnippetTemplate;
    
    constructor() {
        super()
        this.template = new VSCodeSnippetTemplate();
    }

    public async getDeclarationFromFolder(pathFolder: string): Promise<string> {
        const tsInterfaces = []
        const filesToProcess = await this.getFilesToProcess(pathFolder);

        for(const file of filesToProcess){
            const { namespace, path } = file;
            const ts = await this.getSnippets(path, namespace);
            tsInterfaces.push(ts);
        }
    
        const declaration = this.template.getSnippet(tsInterfaces);
        return declaration;
    }
    
    public async getDeclarationFromFile(pathFile: string, namespace: string): Promise<string> {
        const ts = await this.getSnippets(pathFile, namespace);
        const declaration = this.template.getSnippet([ts]);
        return declaration;
    }

    private async getSnippets(filePath: string, namespace: string): Promise<string> {
        const result: string[] = [];
    
        const data = await File.readFile(filePath);
        this.processJsonObject(JSON.parse(data), "", result);
        return this.template.getSnippetsDefinition(result, namespace);
    }
}