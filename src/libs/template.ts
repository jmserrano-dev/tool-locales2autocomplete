#!/usr/bin/env node

import { Utils } from '.';

class Template {
  private static templateMethod(key:string , namespace: string): string {
    return `t(_: \"${namespace}:${key}\"): string;`;
  }

  public static getInterface(keys: Array<string>, namespace: string): string {
    return `export interface I${Utils.capitalize(namespace)}Translations {
            ${keys.map(key => Template.templateMethod(key, Utils.toLowerCase(namespace))).join("\n")}
        }`;
  }

  public static getDeclaration(tsInterfaces: Array<string>, module: string = "strong-typed-i18n"): string {
    return `declare module '${module}' {
            ${tsInterfaces.reduce((x, y) => `${x}\n${y}`)}
        }`;
  }
}

export default Template;
