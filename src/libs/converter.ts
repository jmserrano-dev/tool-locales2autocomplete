#!/usr/bin/env node

import { File, Template } from '.';

class Converter {
    private static getParent(parent: string, child: string): string{
        return parent === '' || parent === undefined || parent === null
            ? `${child}`
            : `${parent}.${child}`;
    }

    private static processJsonObject(obj: any, parent: string, result: Array<string>) {
        for(const entry in obj) {
            const key = entry;
            const value = obj[key];
            if(typeof value === 'object') Converter.processJsonObject(value, Converter.getParent(parent, key), result);
            else result.push(Converter.getParent(parent, key));
        }
    }

    private static async getTypescriptInterface(filePath: string, namespace: string): Promise<string> {
        let result: string[] = [];
    
        const data = await File.readFile(filePath);
        Converter.processJsonObject(JSON.parse(data), "", result);
        var tsInterface = Template.getInterface(result, namespace);
    
        return tsInterface;
    }
    
    private static async getFilesToProcess(parentFolder: string)
        : Promise<Array<{namespace: string; path: string}>> {
        const folders = await File.readFolder(parentFolder);
    
        let filesToProcess = [];
        for (let i = 0; i < folders.length; i++) {
            const namespace = folders[i];
            const namespacePath = `${parentFolder}/${namespace}`;
    
            const filesWithinNamespace = await File.readFolder(namespacePath);
            if(filesWithinNamespace.length > 0) {
                filesToProcess.push({ namespace: namespace, path: `${namespacePath}/${filesWithinNamespace[0]}` });
            }
        }
    
        return filesToProcess;
    }
    
    static async getDeclarationFromFolder(pathFolder: string): Promise<string> {
        const tsInterfaces = []
        const filesToProcess = await Converter.getFilesToProcess(pathFolder);
    
        for (let i = 0; i < filesToProcess.length; i++) {
            const { namespace, path } = filesToProcess[i];
            var ts = await Converter.getTypescriptInterface(path, namespace);
            tsInterfaces.push(ts);
        }
    
        const declaration = Template.getDeclaration(tsInterfaces);
        return declaration;
    }
    
    public static async getDeclarationFromFile(pathFile: string, namespace: string): Promise<string> {
        var ts = await Converter.getTypescriptInterface(pathFile, namespace);
        const declaration = Template.getDeclaration([ts]);
        return declaration;
    }
}

export default Converter;
