#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Converter {
    static getParent(parent, child) {
        return parent === '' || parent === undefined || parent === null
            ? `${child}`
            : `${parent}.${child}`;
    }
    static processJsonObject(obj, parent, result) {
        for (const entry in obj) {
            const key = entry;
            const value = obj[key];
            if (typeof value === 'object')
                Converter.processJsonObject(value, Converter.getParent(parent, key), result);
            else
                result.push(Converter.getParent(parent, key));
        }
    }
    static getTypescriptInterface(filePath, namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            const data = yield _1.File.readFile(filePath);
            Converter.processJsonObject(JSON.parse(data), "", result);
            var tsInterface = _1.Template.getInterface(result, namespace);
            return tsInterface;
        });
    }
    static getFilesToProcess(parentFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield _1.File.readFolder(parentFolder);
            let filesToProcess = [];
            for (let i = 0; i < folders.length; i++) {
                const namespace = folders[i];
                const namespacePath = `${parentFolder}/${namespace}`;
                const filesWithinNamespace = yield _1.File.readFolder(namespacePath);
                if (filesWithinNamespace.length > 0) {
                    filesToProcess.push({ namespace: namespace, path: `${namespacePath}/${filesWithinNamespace[0]}` });
                }
            }
            return filesToProcess;
        });
    }
    static getDeclarationFromFolder(pathFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            const tsInterfaces = [];
            const filesToProcess = yield Converter.getFilesToProcess(pathFolder);
            for (let i = 0; i < filesToProcess.length; i++) {
                const { namespace, path } = filesToProcess[i];
                var ts = yield Converter.getTypescriptInterface(path, namespace);
                tsInterfaces.push(ts);
            }
            const declaration = _1.Template.getDeclaration(tsInterfaces);
            return declaration;
        });
    }
    static getDeclarationFromFile(pathFile, namespace) {
        return __awaiter(this, void 0, void 0, function* () {
            var ts = yield Converter.getTypescriptInterface(pathFile, namespace);
            const declaration = _1.Template.getDeclaration([ts]);
            return declaration;
        });
    }
}
exports.default = Converter;
