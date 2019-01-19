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
const libs_1 = require("./libs");
const { input, output } = libs_1.Args.getOptionsFromCommandLine();
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const isDirectory = yield libs_1.File.isDirectory(input);
        const declaration = (isDirectory)
            ? yield libs_1.Converter.getDeclarationFromFolder(input)
            : yield libs_1.Converter.getDeclarationFromFile(input, "translations");
        libs_1.File.writeFile(output, declaration);
    });
}
;
start();
