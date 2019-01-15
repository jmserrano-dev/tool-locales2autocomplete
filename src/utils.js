#!/usr/bin/env node

class Utils {
  static capitalize(str) {
    return str && str[0].toUpperCase() + str.slice(1);
  }
  static toLowerCase(str) {
    return str && str.toLowerCase();
  }
}

module.exports = Utils;