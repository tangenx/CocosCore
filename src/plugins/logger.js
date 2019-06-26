"use strict";

const { appendFileSync } = require('fs');

function pad(num) {
  return num > 10 ? num : `${num} `;
}

class Logger {
  constructor(filePath = null) {
    this.filePath = filePath;
    this.counter = 0;
    this.lastMessage = null;
    this.dcolors = ["\u001B[7m", "\u001B[42m", "\u001B[44m", "\u001B[44m", "\u001B[43m", "\u001B[43m", "\u001B[41m", "\u001B[41m", "\u001B[41m", "\u001B[41m"];
    this.prefixes = {
      log: "\u001B[7m  LOG \u001B[0m",
      ok: "\u001B[42m  OK  \u001B[0m",
      error: "\u001B[41m ERRO \u001B[0m",
      warn: "\u001B[43m WARN \u001B[0m",
      info: "\u001B[44m INFO \u001B[0m",
    };

    for (const key in this.prefixes) {
      this.add(key, this.prefixes[key], key === "error");
    }
  }

  add(key, prefix, error) {
    this.prefixes[key] = prefix;

    const fn = console[error ? "error" : "log"];

    this[key] = this._log.bind(this, fn, key, prefix);
  }

  _log(fn, key, ...args) {
    const message = args.join(" ");

    if (this.lastMessage === message) {
      this.counter++;

      const color = this.dcolors[Math.floor(this.counter / 10)] || "\u001B[7m";

      process.stdout.write(`\u001B[1A${color}  x${pad(this.counter)} \u001B[0m`);
    } else {
      this.lastMessage = message;
      this.counter = 1;
    }

    fn(...args);

    if (this.filePath) {
      const log = `[${key.toUpperCase()}]: ${args.slice(1).join(" ")}\n`;

      appendFileSync(this.filePath, log);
    };
  };
};


module.exports = Logger;