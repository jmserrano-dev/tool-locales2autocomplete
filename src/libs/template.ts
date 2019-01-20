#!/usr/bin/env node

import { Utils } from '.';

class Template {
  public static getInterface(keys: string[], namespace: string): string {
    return `export interface I${Utils.capitalize(namespace)}Translations {
            ${keys.map(key => Template.templateMethod(key, Utils.toLowerCase(namespace))).join("\n")}
        }`;
  }

  public static getDeclaration(tsInterfaces: string[], module: string = "strong-typed-i18n"): string {
    return `declare module '${module}' {
            ${tsInterfaces.reduce((x, y) => `${x}\n${y}`)}
        }`;
  }

  private static templateMethod(key:string , namespace: string): string {
    return `t(_: \"${namespace}:${key}\"): string;`;
  }
}

export default Template;
