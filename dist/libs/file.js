#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class File {
    static readFile(fileName) {
        return new Promise((resolve, reject) => fs_1.default.readFile(fileName, "utf8", (err, data) => {
            return err ? reject(err) : resolve(data);
        }));
    }
    static writeFile(fileName, data) {
        return new Promise((resolve, reject) => fs_1.default.writeFile(fileName, data, "utf8", err => {
            return err
                ? reject(err)
                : resolve("Typescript declaration generated correctly!");
        }));
    }
    static readFolder(folderName) {
        return new Promise((resolve, reject) => fs_1.default.readdir(folderName, (err, items) => {
            return err ? reject(err) : resolve(items);
        }));
    }
    static isFile(path) {
        return new Promise((resolve, reject) => fs_1.default.lstat(path, (err, stats) => {
            return err ? reject(err) : resolve(stats.isFile());
        }));
    }
    static isDirectory(path) {
        return new Promise((resolve, reject) => fs_1.default.lstat(path, (err, stats) => {
            return err ? reject(err) : resolve(stats.isDirectory());
        }));
    }
}
exports.default = File;
