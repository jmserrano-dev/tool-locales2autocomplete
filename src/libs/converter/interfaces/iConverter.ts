export default interface IConverter {
    getDeclarationFromFolder(pathFolder: string): Promise<string>;
    getDeclarationFromFile(pathFile: string, namespace: string): Promise<string>;
}
