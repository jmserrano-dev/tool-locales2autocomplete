#!/usr/bin/env node

const Args = require("./src/args");
const File = require("./src/file");
const Template = require("./src/template");
const Converter = require("./src/converter");

const { input, output } = Args.getOptionsFromCommandLine();


async function getTypescriptInterface(filePath, namespace) {
    let result = [];

    const data = await File.readFile(filePath);
    Converter.processJsonObject(JSON.parse(data), "", result);
    var tsInterface = Template.getInterface(result, namespace);

    return tsInterface;
}

async function getFilesToProcess(parentFolder) {
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

async function getDeclarationFromFolder(pathFolder) {
    const tsInterfaces = []
    const filesToProcess = await getFilesToProcess(pathFolder);

    for (let i = 0; i < filesToProcess.length; i++) {
        const { namespace, path } = filesToProcess[i];
        var ts = await getTypescriptInterface(path, namespace);
        tsInterfaces.push(ts);
    }

    const declaration = Template.getDeclaration(tsInterfaces);
    return declaration;
}

async function getDeclarationFromFile(pathFile, namespace) {
    var ts = await getTypescriptInterface(pathFile, namespace);
    const declaration = Template.getDeclaration([ts]);
    return declaration;
}

async function start() {
    const isDirectory = await File.isDirectory(input);
    const declaration = (isDirectory)
        ? await getDeclarationFromFolder(input)
        : await getDeclarationFromFile(input, "translations");
    File.writeFile(output, declaration);
};

start();
