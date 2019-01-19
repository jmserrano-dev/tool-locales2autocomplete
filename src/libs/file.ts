#!/usr/bin/env node

import fs from 'fs';

class File {
  public static readFile(fileName: string): Promise<string> {
    return new Promise((resolve, reject) =>
      fs.readFile(fileName, "utf8", (err, data) => {
        return err ? reject(err) : resolve(data);
      })
    );
  }

  public static writeFile(fileName: string, data: string): Promise<string> {
    return new Promise((resolve, reject) =>
      fs.writeFile(fileName, data, "utf8", err => {
        return err
          ? reject(err)
          : resolve("Typescript declaration generated correctly!");
      })
    );
  }

  public static readFolder(folderName: string): Promise<string[]> {
    return new Promise((resolve, reject) =>
      fs.readdir(folderName, (err, items) => {
        return err ? reject(err) : resolve(items);
      })
    );
  }

  public static isFile(path: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      fs.lstat(path, (err, stats) => {
        return err ? reject(err) : resolve(stats.isFile());
      })
    );
  }

  public static isDirectory(path: string): Promise<boolean> {
    return new Promise((resolve, reject) =>
      fs.lstat(path, (err, stats) => {
        return err ? reject(err) : resolve(stats.isDirectory());
      })
    );
  }
}

export default File;
