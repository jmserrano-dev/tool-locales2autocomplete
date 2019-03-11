#!/usr/bin/env node

import { Utils } from '../helpers';

export default class VSCodeSnippetTemplate {
    public getSnippetsDefinition(keys: string[], namespace: string): string {
        return keys.map(key => this.getSnippetDefinition(key, namespace)).join(",\n");
    }

    public getSnippetDefinition(key: string, namespace: string): string {
        const value = `${Utils.toLowerCase(namespace)}:${key}`;
        return `"${value}": { "prefix": "${value}", "body": ["${value}"] }`;
    }

    public getSnippet(snippets: string[]): string {
        return` {
            ${snippets.reduce((x, y) => `${x},\n${y}`)}
        }`;
    }
}
