import { File } from '../../helpers';
import IConverter from '../interfaces/iConverter';

export default abstract class Converter implements IConverter {

    public abstract getDeclarationFromFolder(pathFolder: string): Promise<string>;
    public abstract getDeclarationFromFile(pathFile: string, namespace: string): Promise<string>;

    protected processJsonObject(obj: any, parent: string, result: string[]) {
        for (const entry in obj) {
            const key = entry;
            const value = obj[key];
            if (typeof value === 'object') {
                this.processJsonObject(value, this.getParent(parent, key), result);
            }
            else {
                result.push(this.getParent(parent, key));
            }
        }
    }

    protected async getFilesToProcess(parentFolder: string): Promise<Array<{
        namespace: string;
        path: string;
    }>> {
        const folders = await File.readFolder(parentFolder);
        const filesToProcess = [];
        for (const folder of folders) {
            const namespace = folder;
            const namespacePath = `${parentFolder}/${namespace}`;
            const filesWithinNamespace = await File.readFolder(namespacePath);
            if (filesWithinNamespace.length > 0) {
                filesToProcess.push({ namespace, path: `${namespacePath}/${filesWithinNamespace[0]}` });
            }
        }
        return filesToProcess;
    }

    private getParent(parent: string, child: string): string {
        return parent === '' || parent === undefined || parent === null
            ? `${child}`
            : `${parent}.${child}`;
    }
}
