#!/usr/bin/env node

import { File } from '../helpers';
import { DeclarationTypescriptTemplate } from '../template';
import IConverter from './interfaces/iConverter';
import Converter from './base/converter';

export default class DeclarationTypescriptConverter extends Converter implements IConverter {
    public static typeName = 'dts';
    private template: DeclarationTypescriptTemplate;
    
    constructor() {
        super()
        this.template = new DeclarationTypescriptTemplate();
    }

    public async getDeclarationFromFolder(pathFolder: string): Promise<string> {
        const tsInterfaces = []
        const filesToProcess = await this.getFilesToProcess(pathFolder);

        for(const file of filesToProcess){
            const { namespace, path } = file;
            const ts = await this.getTypescriptInterface(path, namespace);
            tsInterfaces.push(ts);
        }
    
        const declaration = this.template.getDeclaration(tsInterfaces);
        return declaration;
    }
    
    public async getDeclarationFromFile(pathFile: string, namespace: string): Promise<string> {
        const ts = await this.getTypescriptInterface(pathFile, namespace);
        const declaration = this.template.getDeclaration([ts]);
        return declaration;
    }

    private async getTypescriptInterface(filePath: string, namespace: string): Promise<string> {
        const result: string[] = [];
    
        const data = await File.readFile(filePath);
        this.processJsonObject(JSON.parse(data), "", result);
        return this.template.getInterface(result, namespace);
    }
}
