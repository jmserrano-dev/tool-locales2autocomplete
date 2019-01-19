#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static capitalize(str) {
        return str && str[0].toUpperCase() + str.slice(1);
    }
    static toLowerCase(str) {
        return str && str.toLowerCase();
    }
}
exports.default = Utils;
