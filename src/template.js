#!/usr/bin/env node

const Utils = require("./utils");

class Template {
  static templateMethod(key, namespace) {
    return `t(_: \"${namespace}:${key}\"): string;`;
  }

  static getInterface(keys, namespace) {
    return `export interface I${Utils.capitalize(namespace)}Translations {
            ${keys.map(key => Template.templateMethod(key, Utils.toLowerCase(namespace))).join("\n")}
        }`;
  }

  static getDeclaration(tsInterfaces, module = "strong-typed-i18n") {
    return `declare module '${module}' {
            ${tsInterfaces.reduce((x, y) => `${x}\n${y}`)}
        }`;
  }
}

module.exports = Template;
