#!/usr/bin/env node

class Utils {
  public static capitalize(str: string): string {
    return str && str[0].toUpperCase() + str.slice(1);
  }

  public static toLowerCase(str: string): string {
    return str && str.toLowerCase();
  }
}

export default Utils;