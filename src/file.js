#!/usr/bin/env node

const fs = require("fs");

class File {
  static readFile(fileName) {
    return new Promise((resolve, reject) =>
      fs.readFile(fileName, "utf8", (err, data) => {
        return err ? reject(err) : resolve(data);
      })
    );
  }

  static writeFile(fileName, data) {
    return new Promise((resolve, reject) =>
      fs.writeFile(fileName, data, "utf8", err => {
        return err
          ? reject(err)
          : resolve("Typescript declaration generated correctly!");
      })
    );
  }

  static readFolder(folderName) {
    return new Promise((resolve, reject) =>
      fs.readdir(folderName, (err, items) => {
        return err ? reject(err) : resolve(items);
      })
    );
  }

  static isFile(path) {
    return new Promise((resolve, reject) =>
      fs.lstat(path, (err, stats) => {
        return err ? reject(err) : resolve(stats.isFile());
      })
    );
  }

  static isDirectory(path) {
    return new Promise((resolve, reject) =>
      fs.lstat(path, (err, stats) => {
        return err ? reject(err) : resolve(stats.isDirectory());
      })
    );
  }
}

module.exports = File;
