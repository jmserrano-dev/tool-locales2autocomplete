#!/usr/bin/env node

import { Utils } from '../helpers';

export default class DeclarationTypescriptTemplate {
  public getInterface(keys: string[], namespace: string): string {
    return `export interface I${Utils.capitalize(namespace)}Translations {
            ${keys.map(key => this.templateMethod(key, Utils.toLowerCase(namespace))).join("\n")}
        }`;
  }

  public getDeclaration(tsInterfaces: string[], module: string = "strong-typed-i18n"): string {
    return `declare module '${module}' {
            ${tsInterfaces.reduce((x, y) => `${x}\n${y}`)}
        }`;
  }

  private templateMethod(key:string , namespace: string): string {
    return `t(_: \"${namespace}:${key}\"): string;`;
  }
}
