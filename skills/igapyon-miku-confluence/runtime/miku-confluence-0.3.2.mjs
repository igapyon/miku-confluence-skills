#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/adapters/filesystem/env-template.ts
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
async function initializeEnvTemplate(workingDirectory) {
  try {
    await writeFile(join(workingDirectory, templatePath), envTemplate, { encoding: "utf8", flag: "wx", mode: 384 });
    return {
      schemaVersion: 1,
      command: "config.init",
      success: true,
      created: true,
      path: templatePath,
      diagnostics: [{ severity: "info", code: "ENV_TEMPLATE_CREATED", message: "Created .env with empty values. Source it explicitly before a live API call." }]
    };
  } catch (error) {
    if (isAlreadyPresent(error)) {
      return {
        schemaVersion: 1,
        command: "config.init",
        success: true,
        created: false,
        path: templatePath,
        diagnostics: [{ severity: "info", code: "ENV_TEMPLATE_EXISTS", message: "Existing .env was not changed." }]
      };
    }
    return {
      schemaVersion: 1,
      command: "config.init",
      success: false,
      created: false,
      path: templatePath,
      diagnostics: [{ severity: "error", code: "ENV_TEMPLATE_NOT_CREATED", message: "Could not create the .env template." }]
    };
  }
}
function isAlreadyPresent(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "EEXIST";
}
var templatePath, envTemplate;
var init_env_template = __esm({
  "src/adapters/filesystem/env-template.ts"() {
    "use strict";
    templatePath = ".env";
    envTemplate = [
      "# miku-confluence local configuration",
      "# This file is not loaded automatically. Run: source .env",
      "# Keep this file local. Do not commit it or put values in CLI arguments or JSON input.",
      "",
      'export MIKU_CONFLUENCE_BASE_URL="https://your-site.atlassian.net"',
      'export MIKU_CONFLUENCE_EMAIL="you@example.com"',
      'export MIKU_CONFLUENCE_API_TOKEN=""',
      ""
    ].join("\n");
  }
});

// node_modules/lossless-json/lib/esm/config.js
var init_config = __esm({
  "node_modules/lossless-json/lib/esm/config.js"() {
  }
});

// node_modules/lossless-json/lib/esm/utils.js
function isInteger(value) {
  return INTEGER_REGEX.test(value);
}
function isNumber(value) {
  return NUMBER_REGEX.test(value);
}
function isSafeNumber(value, config2) {
  if (isInteger(value)) {
    return Number.isSafeInteger(Number.parseInt(value, 10));
  }
  const num = Number.parseFloat(value);
  const parsed = String(num);
  if (value === parsed) {
    return true;
  }
  const valueDigits = extractSignificantDigits(value);
  const parsedDigits = extractSignificantDigits(parsed);
  if (valueDigits === parsedDigits) {
    return true;
  }
  if (config2?.approx === true) {
    const requiredDigits = 14;
    if (!isInteger(value) && parsedDigits.length >= requiredDigits && valueDigits.startsWith(parsedDigits.substring(0, requiredDigits))) {
      return true;
    }
  }
  return false;
}
function getUnsafeNumberReason(value) {
  if (isSafeNumber(value, {
    approx: false
  })) {
    return void 0;
  }
  if (isInteger(value)) {
    return UnsafeNumberReason.truncate_integer;
  }
  const num = Number.parseFloat(value);
  if (!Number.isFinite(num)) {
    return UnsafeNumberReason.overflow;
  }
  if (num === 0) {
    return UnsafeNumberReason.underflow;
  }
  return UnsafeNumberReason.truncate_float;
}
function extractSignificantDigits(value) {
  const {
    start,
    end
  } = getSignificantDigitRange(value);
  const digits = value.substring(start, end);
  const dot = digits.indexOf(".");
  if (dot === -1) {
    return digits;
  }
  return digits.substring(0, dot) + digits.substring(dot + 1);
}
function getSignificantDigitRange(value) {
  let start = 0;
  if (value[0] === "-") {
    start++;
  }
  while (value[start] === "0" || value[start] === ".") {
    start++;
  }
  let end = value.lastIndexOf("e");
  if (end === -1) {
    end = value.lastIndexOf("E");
  }
  if (end === -1) {
    end = value.length;
  }
  while ((value[end - 1] === "0" || value[end - 1] === ".") && end > start) {
    end--;
  }
  return {
    start,
    end
  };
}
var INTEGER_REGEX, NUMBER_REGEX, UnsafeNumberReason;
var init_utils = __esm({
  "node_modules/lossless-json/lib/esm/utils.js"() {
    INTEGER_REGEX = /^-?[0-9]+$/;
    NUMBER_REGEX = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;
    UnsafeNumberReason = /* @__PURE__ */ (function(UnsafeNumberReason2) {
      UnsafeNumberReason2["underflow"] = "underflow";
      UnsafeNumberReason2["overflow"] = "overflow";
      UnsafeNumberReason2["truncate_integer"] = "truncate_integer";
      UnsafeNumberReason2["truncate_float"] = "truncate_float";
      return UnsafeNumberReason2;
    })({});
  }
});

// node_modules/lossless-json/lib/esm/LosslessNumber.js
function isLosslessNumber(value) {
  return value && typeof value === "object" && value.isLosslessNumber || false;
}
var LosslessNumber;
var init_LosslessNumber = __esm({
  "node_modules/lossless-json/lib/esm/LosslessNumber.js"() {
    init_utils();
    LosslessNumber = class {
      // numeric value as string
      // type information
      isLosslessNumber = true;
      constructor(value) {
        if (!isNumber(value)) {
          throw new Error(`Invalid number (value: "${value}")`);
        }
        this.value = value;
      }
      /**
       * Get the value of the LosslessNumber as number or bigint.
       *
       * - a number is returned for safe numbers and decimal values that only lose some insignificant digits
       * - a bigint is returned for big integer numbers
       * - an Error is thrown for values that will overflow or underflow
       *
       * Note that you can implement your own strategy for conversion by just getting the value as string
       * via .toString(), and using util functions like isInteger, isSafeNumber, getUnsafeNumberReason,
       * and toSafeNumberOrThrow to convert it to a numeric value.
       */
      valueOf() {
        const unsafeReason = getUnsafeNumberReason(this.value);
        if (unsafeReason === void 0 || unsafeReason === UnsafeNumberReason.truncate_float) {
          return Number.parseFloat(this.value);
        }
        if (isInteger(this.value)) {
          return BigInt(this.value);
        }
        throw new Error(`Cannot safely convert to number: the value '${this.value}' would ${unsafeReason} and become ${Number.parseFloat(this.value)}`);
      }
      /**
       * Get the value of the LosslessNumber as string.
       */
      toString() {
        return this.value;
      }
      // Note: we do NOT implement a .toJSON() method, and you should not implement
      // or use that, it cannot safely turn the numeric value in the string into
      // stringified JSON since it has to be parsed into a number first.
    };
  }
});

// node_modules/lossless-json/lib/esm/numberParsers.js
function parseLosslessNumber(value) {
  return new LosslessNumber(value);
}
var init_numberParsers = __esm({
  "node_modules/lossless-json/lib/esm/numberParsers.js"() {
    init_LosslessNumber();
    init_utils();
  }
});

// node_modules/lossless-json/lib/esm/revive.js
function revive(json, reviver) {
  return reviveValue({
    "": json
  }, "", json, reviver);
}
function reviveValue(context, key, value, reviver) {
  if (Array.isArray(value)) {
    return reviver.call(context, key, reviveArray(value, reviver));
  }
  if (value && typeof value === "object" && !isLosslessNumber(value)) {
    return reviver.call(context, key, reviveObject(value, reviver));
  }
  return reviver.call(context, key, value);
}
function reviveObject(object, reviver) {
  for (const key of Object.keys(object)) {
    const value = reviveValue(object, key, object[key], reviver);
    if (value !== void 0) {
      object[key] = value;
    } else {
      delete object[key];
    }
  }
  return object;
}
function reviveArray(array, reviver) {
  for (let i = 0; i < array.length; i++) {
    array[i] = reviveValue(array, String(i), array[i], reviver);
  }
  return array;
}
var init_revive = __esm({
  "node_modules/lossless-json/lib/esm/revive.js"() {
    init_LosslessNumber();
  }
});

// node_modules/lossless-json/lib/esm/parse.js
function parse(text, reviver, options) {
  const optionsObj = typeof options === "function" ? {
    parseNumber: options
  } : options;
  const parseNumber = optionsObj?.parseNumber ?? parseLosslessNumber;
  const onDuplicateKey = optionsObj?.onDuplicateKey ?? throwDuplicateKey;
  let i = 0;
  const value = parseValue();
  expectValue(value);
  expectEndOfInput();
  return reviver ? revive(value, reviver) : value;
  function parseObject() {
    if (text.charCodeAt(i) === codeOpeningBrace) {
      i++;
      skipWhitespace();
      const object = {};
      let initial = true;
      while (i < text.length && text.charCodeAt(i) !== codeClosingBrace) {
        if (!initial) {
          eatComma();
          skipWhitespace();
        } else {
          initial = false;
        }
        const start = i;
        const key = parseString();
        if (key === void 0) {
          throwObjectKeyExpected();
          return;
        }
        skipWhitespace();
        eatColon();
        const value2 = parseValue();
        if (value2 === void 0) {
          throwObjectValueExpected();
          return;
        }
        if (Object.prototype.hasOwnProperty.call(object, key) && !isDeepEqual(value2, object[key])) {
          const returnedValue = onDuplicateKey({
            key,
            position: start + 1,
            oldValue: object[key],
            newValue: value2
          });
          if (returnedValue !== void 0) {
            object[key] = returnedValue;
          }
        } else {
          object[key] = value2;
        }
      }
      if (text.charCodeAt(i) !== codeClosingBrace) {
        throwObjectKeyOrEndExpected();
      }
      i++;
      return object;
    }
  }
  function parseArray() {
    if (text.charCodeAt(i) === codeOpeningBracket) {
      i++;
      skipWhitespace();
      const array = [];
      let initial = true;
      while (i < text.length && text.charCodeAt(i) !== codeClosingBracket) {
        if (!initial) {
          eatComma();
        } else {
          initial = false;
        }
        const value2 = parseValue();
        expectArrayItem(value2);
        array.push(value2);
      }
      if (text.charCodeAt(i) !== codeClosingBracket) {
        throwArrayItemOrEndExpected();
      }
      i++;
      return array;
    }
  }
  function parseValue() {
    skipWhitespace();
    const value2 = parseString() ?? parseNumeric() ?? parseObject() ?? parseArray() ?? parseKeyword("true", true) ?? parseKeyword("false", false) ?? parseKeyword("null", null);
    skipWhitespace();
    return value2;
  }
  function parseKeyword(name, value2) {
    if (text.slice(i, i + name.length) === name) {
      i += name.length;
      return value2;
    }
  }
  function skipWhitespace() {
    while (isWhitespace(text.charCodeAt(i))) {
      i++;
    }
  }
  function parseString() {
    if (text.charCodeAt(i) === codeDoubleQuote) {
      i++;
      let result3 = "";
      while (i < text.length && text.charCodeAt(i) !== codeDoubleQuote) {
        if (text.charCodeAt(i) === codeBackslash) {
          const char = text[i + 1];
          const escapeChar = escapeCharacters[char];
          if (escapeChar !== void 0) {
            result3 += escapeChar;
            i++;
          } else if (char === "u") {
            if (isHex(text.charCodeAt(i + 2)) && isHex(text.charCodeAt(i + 3)) && isHex(text.charCodeAt(i + 4)) && isHex(text.charCodeAt(i + 5))) {
              result3 += String.fromCharCode(Number.parseInt(text.slice(i + 2, i + 6), 16));
              i += 5;
            } else {
              throwInvalidUnicodeCharacter(i);
            }
          } else {
            throwInvalidEscapeCharacter(i);
          }
        } else {
          if (isValidStringCharacter(text.charCodeAt(i))) {
            result3 += text[i];
          } else {
            throwInvalidCharacter(text[i]);
          }
        }
        i++;
      }
      expectEndOfString();
      i++;
      return result3;
    }
  }
  function parseNumeric() {
    const start = i;
    if (text.charCodeAt(i) === codeMinus) {
      i++;
      expectDigit(start);
    }
    if (text.charCodeAt(i) === codeZero) {
      i++;
    } else if (isNonZeroDigit(text.charCodeAt(i))) {
      i++;
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }
    if (text.charCodeAt(i) === codeDot) {
      i++;
      expectDigit(start);
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }
    if (text.charCodeAt(i) === codeLowercaseE || text.charCodeAt(i) === codeUppercaseE) {
      i++;
      if (text.charCodeAt(i) === codeMinus || text.charCodeAt(i) === codePlus) {
        i++;
      }
      expectDigit(start);
      while (isDigit(text.charCodeAt(i))) {
        i++;
      }
    }
    if (i > start) {
      return parseNumber(text.slice(start, i));
    }
  }
  function eatComma() {
    if (text.charCodeAt(i) !== codeComma) {
      throw new SyntaxError(`Comma ',' expected after value ${gotAt()}`);
    }
    i++;
  }
  function eatColon() {
    if (text.charCodeAt(i) !== codeColon) {
      throw new SyntaxError(`Colon ':' expected after property name ${gotAt()}`);
    }
    i++;
  }
  function expectValue(value2) {
    if (value2 === void 0) {
      throw new SyntaxError(`JSON value expected ${gotAt()}`);
    }
  }
  function expectArrayItem(value2) {
    if (value2 === void 0) {
      throw new SyntaxError(`Array item expected ${gotAt()}`);
    }
  }
  function expectEndOfInput() {
    if (i < text.length) {
      throw new SyntaxError(`Expected end of input ${gotAt()}`);
    }
  }
  function expectDigit(start) {
    if (!isDigit(text.charCodeAt(i))) {
      const numSoFar = text.slice(start, i);
      throw new SyntaxError(`Invalid number '${numSoFar}', expecting a digit ${gotAt()}`);
    }
  }
  function expectEndOfString() {
    if (text.charCodeAt(i) !== codeDoubleQuote) {
      throw new SyntaxError(`End of string '"' expected ${gotAt()}`);
    }
  }
  function throwObjectKeyExpected() {
    throw new SyntaxError(`Quoted object key expected ${gotAt()}`);
  }
  function throwDuplicateKey(_ref) {
    let {
      key,
      position
    } = _ref;
    throw new SyntaxError(`Duplicate key '${key}' encountered at position ${position}`);
  }
  function throwObjectKeyOrEndExpected() {
    throw new SyntaxError(`Quoted object key or end of object '}' expected ${gotAt()}`);
  }
  function throwArrayItemOrEndExpected() {
    throw new SyntaxError(`Array item or end of array ']' expected ${gotAt()}`);
  }
  function throwInvalidCharacter(char) {
    throw new SyntaxError(`Invalid character '${char}' ${pos()}`);
  }
  function throwInvalidEscapeCharacter(start) {
    const chars = text.slice(start, start + 2);
    throw new SyntaxError(`Invalid escape character '${chars}' ${pos()}`);
  }
  function throwObjectValueExpected() {
    throw new SyntaxError(`Object value expected after ':' ${pos()}`);
  }
  function throwInvalidUnicodeCharacter(start) {
    const chars = text.slice(start, start + 6);
    throw new SyntaxError(`Invalid unicode character '${chars}' ${pos()}`);
  }
  function pos() {
    return `at position ${i}`;
  }
  function got() {
    return i < text.length ? `but got '${text[i]}'` : "but reached end of input";
  }
  function gotAt() {
    return `${got()} ${pos()}`;
  }
}
function isWhitespace(code) {
  return code === codeSpace || code === codeNewline || code === codeTab || code === codeReturn;
}
function isHex(code) {
  return code >= codeZero && code <= codeNine || code >= codeUppercaseA && code <= codeUppercaseF || code >= codeLowercaseA && code <= codeLowercaseF;
}
function isDigit(code) {
  return code >= codeZero && code <= codeNine;
}
function isNonZeroDigit(code) {
  return code >= codeOne && code <= codeNine;
}
function isValidStringCharacter(code) {
  return code >= 32 && code <= 1114111;
}
function isDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, index) => isDeepEqual(item, b[index]));
  }
  if (isObject(a) && isObject(b)) {
    const keys = [.../* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(b)])];
    return keys.every((key) => isDeepEqual(a[key], b[key]));
  }
  return false;
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
var escapeCharacters, codeBackslash, codeOpeningBrace, codeClosingBrace, codeOpeningBracket, codeClosingBracket, codeSpace, codeNewline, codeTab, codeReturn, codeDoubleQuote, codePlus, codeMinus, codeZero, codeOne, codeNine, codeComma, codeDot, codeColon, codeUppercaseA, codeLowercaseA, codeUppercaseE, codeLowercaseE, codeUppercaseF, codeLowercaseF;
var init_parse = __esm({
  "node_modules/lossless-json/lib/esm/parse.js"() {
    init_numberParsers();
    init_revive();
    escapeCharacters = {
      '"': '"',
      "\\": "\\",
      "/": "/",
      b: "\b",
      f: "\f",
      n: "\n",
      r: "\r",
      t: "	"
      // note that \u is handled separately in parseString()
    };
    codeBackslash = 92;
    codeOpeningBrace = 123;
    codeClosingBrace = 125;
    codeOpeningBracket = 91;
    codeClosingBracket = 93;
    codeSpace = 32;
    codeNewline = 10;
    codeTab = 9;
    codeReturn = 13;
    codeDoubleQuote = 34;
    codePlus = 43;
    codeMinus = 45;
    codeZero = 48;
    codeOne = 49;
    codeNine = 57;
    codeComma = 44;
    codeDot = 46;
    codeColon = 58;
    codeUppercaseA = 65;
    codeLowercaseA = 97;
    codeUppercaseE = 69;
    codeLowercaseE = 101;
    codeUppercaseF = 70;
    codeLowercaseF = 102;
  }
});

// node_modules/lossless-json/lib/esm/reviveDate.js
var init_reviveDate = __esm({
  "node_modules/lossless-json/lib/esm/reviveDate.js"() {
  }
});

// node_modules/lossless-json/lib/esm/stringify.js
function stringify(value, replacer, space, numberStringifiers) {
  const resolvedSpace = resolveSpace(space);
  const replacedValue = typeof replacer === "function" ? replacer.call({
    "": value
  }, "", value) : value;
  return stringifyValue(replacedValue, "");
  function stringifyValue(value2, indent) {
    if (Array.isArray(numberStringifiers)) {
      const stringifier = numberStringifiers.find((item) => item.test(value2));
      if (stringifier) {
        const str = stringifier.stringify(value2);
        if (typeof str !== "string" || !isNumber(str)) {
          throw new Error(`Invalid JSON number: output of a number stringifier must be a string containing a JSON number (output: ${str})`);
        }
        return str;
      }
    }
    if (typeof value2 === "boolean" || typeof value2 === "number" || typeof value2 === "string" || value2 === null || value2 instanceof Date || value2 instanceof Boolean || value2 instanceof Number || value2 instanceof String) {
      return JSON.stringify(value2);
    }
    if (value2?.isLosslessNumber) {
      return value2.toString();
    }
    if (typeof value2 === "bigint") {
      return value2.toString();
    }
    if (Array.isArray(value2)) {
      return stringifyArray(value2, indent);
    }
    if (value2 && typeof value2 === "object") {
      return stringifyObject(value2, indent);
    }
    return void 0;
  }
  function stringifyArray(array, indent) {
    if (array.length === 0) {
      return "[]";
    }
    const childIndent = resolvedSpace ? indent + resolvedSpace : void 0;
    let str = resolvedSpace ? "[\n" : "[";
    for (let i = 0; i < array.length; i++) {
      const item = typeof replacer === "function" ? replacer.call(array, String(i), array[i]) : array[i];
      if (resolvedSpace) {
        str += childIndent;
      }
      if (typeof item !== "undefined" && typeof item !== "function") {
        str += stringifyValue(item, childIndent);
      } else {
        str += "null";
      }
      if (i < array.length - 1) {
        str += resolvedSpace ? ",\n" : ",";
      }
    }
    str += resolvedSpace ? `
${indent}]` : "]";
    return str;
  }
  function stringifyObject(object, indent) {
    if (typeof object.toJSON === "function") {
      return stringify(object.toJSON(), replacer, space, void 0);
    }
    const keys = Array.isArray(replacer) ? replacer.map(String) : Object.keys(object);
    if (keys.length === 0) {
      return "{}";
    }
    const childIndent = resolvedSpace ? indent + resolvedSpace : void 0;
    let first = true;
    let str = resolvedSpace ? "{\n" : "{";
    for (const key of keys) {
      const value2 = typeof replacer === "function" ? replacer.call(object, key, object[key]) : object[key];
      if (includeProperty(key, value2)) {
        if (first) {
          first = false;
        } else {
          str += resolvedSpace ? ",\n" : ",";
        }
        const keyStr = JSON.stringify(key);
        str += resolvedSpace ? `${childIndent + keyStr}: ` : `${keyStr}:`;
        str += stringifyValue(value2, childIndent);
      }
    }
    str += resolvedSpace ? `
${indent}}` : "}";
    return str;
  }
  function includeProperty(_key, value2) {
    return typeof value2 !== "undefined" && typeof value2 !== "function" && typeof value2 !== "symbol";
  }
}
function resolveSpace(space) {
  if (typeof space === "number") {
    return " ".repeat(space);
  }
  if (typeof space === "string" && space !== "") {
    return space;
  }
  return void 0;
}
var init_stringify = __esm({
  "node_modules/lossless-json/lib/esm/stringify.js"() {
    init_utils();
  }
});

// node_modules/lossless-json/lib/esm/types.js
var init_types = __esm({
  "node_modules/lossless-json/lib/esm/types.js"() {
  }
});

// node_modules/lossless-json/lib/esm/index.js
var init_esm = __esm({
  "node_modules/lossless-json/lib/esm/index.js"() {
    init_config();
    init_LosslessNumber();
    init_numberParsers();
    init_parse();
    init_reviveDate();
    init_stringify();
    init_types();
    init_utils();
  }
});

// src/core/json.ts
function stringifyJson(value) {
  const serialized = stringify(value, void 0, 2);
  if (serialized === void 0) throw new Error("A JSON output value is required.");
  return serialized;
}
var init_json = __esm({
  "src/core/json.ts"() {
    "use strict";
    init_esm();
  }
});

// src/core/permissions.ts
function parsePermissionSet(raw, source) {
  if (raw === void 0) return { ok: true, value: /* @__PURE__ */ new Set(["READ"]) };
  const values = raw.split(",").map((value) => value.trim().toUpperCase());
  if (values.length === 0 || values.some((value) => value.length === 0)) {
    return invalidPermissionSet(source);
  }
  const allowed = /* @__PURE__ */ new Set();
  for (const value of values) {
    if (!permissionValues.includes(value)) return invalidPermissionSet(source);
    allowed.add(value);
  }
  return { ok: true, value: allowed };
}
function allowsPermission(environmentPermissions, callPermissions, required) {
  return environmentPermissions.has(required) && callPermissions.has(required);
}
function invalidPermissionSet(source) {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "CONFIGURATION_ERROR",
      message: `${source} must be a non-empty comma-separated set of READ, CREATE, UPDATE, and DELETE.`
    }
  };
}
var permissionValues;
var init_permissions = __esm({
  "src/core/permissions.ts"() {
    "use strict";
    permissionValues = ["READ", "CREATE", "UPDATE", "DELETE"];
  }
});

// src/help.ts
function helpText() {
  return [
    "miku-confluence - Confluence Cloud REST API v2 CLI",
    "",
    "Usage:",
    "  miku-confluence --version",
    "  miku-confluence --help | -h",
    "  miku-confluence config init",
    "  miku-confluence operations list",
    "  miku-confluence operations describe <operation>",
    "  miku-confluence call <operation> [--input <file|->] [--allow <permissions>] [--dry-run] [--confirm-destructive] [--verbose]",
    "",
    "Implemented API operations perform one Confluence REST API v2 request. Planned and excluded operations remain inspectable but cannot be called.",
    "snapshot.export-markdown is an offline Workflow: it converts a finalized local API snapshot and never reads credentials or contacts Confluence.",
    "page.inspect-markdown-preservation checks a Markdown sidecar and block mapping locally; it generates neither candidate Storage XML nor a Confluence request.",
    "page.prepare-markdown-update accepts an explicit preservation profile for local review-only candidate Storage; that profile cannot be applied yet.",
    "page.apply-markdown-update applies a reviewed digest-bound plan only with UPDATE permission and --confirm-destructive.",
    "page.apply-markdown-create creates one reviewed child page only with CREATE permission and --confirm-destructive.",
    "snapshot.prepare-import makes a local create-only plan from a complete Storage snapshot; it does not contact Confluence.",
    "snapshot.apply-import creates a reviewed snapshot subtree only with CREATE permission, a matching plan digest, and --confirm-destructive.",
    "config init creates a values-empty .env template only when it is absent; it never loads or overwrites the file.",
    ""
  ].join("\n");
}
var init_help = __esm({
  "src/help.ts"() {
    "use strict";
  }
});

// src/adapters/confluence-v2/auth.ts
function createBasicAuthorization(email, apiToken) {
  return `Basic ${Buffer.from(`${email}:${apiToken}`, "utf8").toString("base64")}`;
}
var init_auth = __esm({
  "src/adapters/confluence-v2/auth.ts"() {
    "use strict";
  }
});

// src/adapters/confluence-v2/access-context.ts
function parseConfiguredPermissions(environment) {
  return parsePermissionSet(environment.MIKU_CONFLUENCE_ALLOWED_PERMISSIONS, "MIKU_CONFLUENCE_ALLOWED_PERMISSIONS");
}
function createConfluenceAccessContext(environment) {
  const baseUrl = parseBaseUrl(environment.MIKU_CONFLUENCE_BASE_URL);
  if (baseUrl.ok === false) return baseUrl;
  const email = requiredSecret(environment.MIKU_CONFLUENCE_EMAIL, "MIKU_CONFLUENCE_EMAIL");
  if (email.ok === false) return email;
  const token = requiredSecret(environment.MIKU_CONFLUENCE_API_TOKEN, "MIKU_CONFLUENCE_API_TOKEN");
  if (token.ok === false) return token;
  const permissions = parseConfiguredPermissions(environment);
  if (permissions.ok === false) return permissions;
  return {
    ok: true,
    value: {
      apiBaseUrl: new URL("/wiki/api/v2", baseUrl.value),
      authorization: createBasicAuthorization(email.value, token.value),
      allowedPermissions: permissions.value
    }
  };
}
function parseBaseUrl(value) {
  if (value === void 0 || value.length === 0) return missingConfiguration("MIKU_CONFLUENCE_BASE_URL");
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return invalidBaseUrl();
  }
  if (parsed.protocol !== "https:" || parsed.hostname.length === 0 || parsed.username.length > 0 || parsed.password.length > 0 || parsed.search.length > 0 || parsed.hash.length > 0 || parsed.pathname !== "" && parsed.pathname !== "/") {
    return invalidBaseUrl();
  }
  return { ok: true, value: parsed.origin };
}
function requiredSecret(value, name) {
  if (value === void 0 || value.length === 0) return missingConfiguration(name);
  if (/[\r\n]/u.test(value)) {
    return {
      ok: false,
      diagnostic: {
        severity: "error",
        code: "CONFIGURATION_ERROR",
        message: `${name} must not contain a line break.`
      }
    };
  }
  return { ok: true, value };
}
function missingConfiguration(name) {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "CONFIGURATION_ERROR",
      message: `${name} is required for Confluence API calls.`
    }
  };
}
function invalidBaseUrl() {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "CONFIGURATION_ERROR",
      message: "MIKU_CONFLUENCE_BASE_URL must be an HTTPS origin without credentials, path, query, or fragment."
    }
  };
}
var init_access_context = __esm({
  "src/adapters/confluence-v2/access-context.ts"() {
    "use strict";
    init_permissions();
    init_auth();
  }
});

// src/adapters/confluence-v2/attachment-download.ts
function createAttachmentDownloader(context, dependencies) {
  return {
    download: (downloadLink, timeoutMs) => downloadAttachment(context, dependencies.fetch, downloadLink, timeoutMs)
  };
}
async function downloadAttachment(context, fetch, downloadLink, timeoutMs) {
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 18e5) {
    return { ok: false, diagnostic: { severity: "error", code: "INVALID_INPUT", message: "downloadTimeoutMs must be an integer between 1 and 1800000.", path: "$.limits.downloadTimeoutMs" } };
  }
  const initial = validateInitialDownloadUrl(downloadLink, context.apiBaseUrl);
  if (initial.ok === false) return initial;
  let current = initial.value;
  for (let redirects = 0; redirects <= maximumRedirects; redirects += 1) {
    const responseResult = await fetchDownload(current, context, fetch, timeoutMs);
    if (responseResult.ok === false) return responseResult;
    const response = responseResult.value.response;
    const controller = responseResult.value.controller;
    const timer = responseResult.value.timer;
    if (isRedirect(response.status)) {
      clearTimeout(timer);
      const location = response.headers.get("location");
      if (location === null || redirects === maximumRedirects) return downloadFailure("INVALID_ATTACHMENT_DOWNLOAD_LINK", "The attachment download redirect was invalid or exceeded the redirect limit.");
      const next = validateRedirectUrl(location, current);
      if (next.ok === false) return next;
      current = next.value;
      continue;
    }
    if (!response.ok) {
      clearTimeout(timer);
      return {
        ok: false,
        diagnostic: {
          severity: "error",
          code: "HTTP_ERROR",
          message: "The attachment download request failed.",
          httpStatus: response.status,
          retryable: response.status === 429 || response.status >= 500
        }
      };
    }
    return { ok: true, body: responseBodyStream(response, controller, timer) };
  }
  return downloadFailure("INVALID_ATTACHMENT_DOWNLOAD_LINK", "The attachment download redirect was invalid or exceeded the redirect limit.");
}
async function fetchDownload(url, context, fetch, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const headers = url.origin === context.apiBaseUrl.origin ? { accept: "application/octet-stream, */*", authorization: context.authorization } : { accept: "application/octet-stream, */*" };
    const response = await fetch(url, { method: "GET", headers, redirect: "manual", signal: controller.signal });
    return { ok: true, value: { response, controller, timer } };
  } catch {
    clearTimeout(timer);
    return {
      ok: false,
      diagnostic: {
        severity: "error",
        code: controller.signal.aborted ? "TIMEOUT" : "NETWORK_ERROR",
        message: controller.signal.aborted ? "The attachment download timed out." : "The attachment download could not be completed.",
        retryable: true
      }
    };
  }
}
async function* responseBodyStream(response, controller, timer) {
  try {
    if (response.body === null) return;
    for await (const chunk of response.body) yield chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk);
  } catch {
    throw new AttachmentDownloadStreamFailure(controller.signal.aborted ? "TIMEOUT" : "NETWORK_ERROR");
  } finally {
    clearTimeout(timer);
  }
}
function validateInitialDownloadUrl(value, apiBaseUrl) {
  let url;
  try {
    url = new URL(value, apiBaseUrl.origin);
  } catch {
    return downloadFailure("INVALID_ATTACHMENT_DOWNLOAD_LINK", "The attachment download link was invalid or unsafe.");
  }
  if (url.protocol !== "https:" || url.origin !== apiBaseUrl.origin || url.username.length > 0 || url.password.length > 0) {
    return downloadFailure("INVALID_ATTACHMENT_DOWNLOAD_LINK", "The attachment download link was invalid or unsafe.");
  }
  return { ok: true, value: url };
}
function validateRedirectUrl(value, currentUrl) {
  let url;
  try {
    url = new URL(value, currentUrl);
  } catch {
    return downloadFailure("INVALID_ATTACHMENT_DOWNLOAD_LINK", "The attachment download redirect was invalid or unsafe.");
  }
  if (url.protocol !== "https:" || url.username.length > 0 || url.password.length > 0) {
    return downloadFailure("INVALID_ATTACHMENT_DOWNLOAD_LINK", "The attachment download redirect was invalid or unsafe.");
  }
  return { ok: true, value: url };
}
function downloadFailure(code, message) {
  return { ok: false, diagnostic: { severity: "error", code, message } };
}
function isRedirect(status) {
  return status === 301 || status === 302 || status === 303 || status === 307 || status === 308;
}
var maximumRedirects, AttachmentDownloadStreamFailure;
var init_attachment_download = __esm({
  "src/adapters/confluence-v2/attachment-download.ts"() {
    "use strict";
    maximumRedirects = 5;
    AttachmentDownloadStreamFailure = class extends Error {
      downloadDiagnosticCode;
      constructor(code) {
        super(code === "TIMEOUT" ? "Attachment download timed out." : "Attachment download stream failed.");
        this.downloadDiagnosticCode = code;
        this.name = "AttachmentDownloadStreamFailure";
      }
    };
  }
});

// src/adapters/confluence-v2/http-client.ts
async function executePreparedApiRequest(context, prepared, policy, dependencies) {
  const timeout = normalizeTimeout(dependencies.requestTimeoutMs);
  if (timeout === void 0) return failure(prepared, [{
    severity: "error",
    code: "INVALID_INPUT",
    message: "requestTimeoutMs must be an integer between 1 and 300000.",
    path: "$.requestTimeoutMs"
  }]);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await dependencies.fetch(prepared.url, {
      method: prepared.method,
      headers: {
        accept: "application/json",
        ...prepared.contentType === void 0 ? {} : { "content-type": prepared.contentType },
        authorization: context.authorization
      },
      ...prepared.body === void 0 ? {} : { body: prepared.body },
      redirect: "manual",
      signal: controller.signal
    });
    const headers = safeResponseHeaders(response.headers, policy.safeResponseHeaders);
    const responseBody = await parseResponseBody(response);
    if (responseBody.ok === false) {
      return failure(prepared, [{
        severity: "error",
        code: "INVALID_API_RESPONSE",
        message: "Confluence API returned malformed JSON.",
        operation: prepared.operation.operationName,
        httpStatus: response.status,
        retryable: false
      }], { status: response.status, headers, body: null });
    }
    const normalizedResponse = {
      status: response.status,
      headers,
      body: responseBody.value
    };
    if (response.ok) return success(prepared, normalizedResponse);
    return failure(prepared, [httpFailureDiagnostic(prepared.operation.operationName, response.status)], normalizedResponse);
  } catch {
    if (controller.signal.aborted) {
      return failure(prepared, [{
        severity: "error",
        code: "TIMEOUT",
        message: "Confluence API request timed out.",
        operation: prepared.operation.operationName,
        retryable: true
      }]);
    }
    return failure(prepared, [{
      severity: "error",
      code: "NETWORK_ERROR",
      message: "Confluence API request could not be completed.",
      operation: prepared.operation.operationName,
      retryable: true
    }]);
  } finally {
    clearTimeout(timer);
  }
}
function normalizeTimeout(value) {
  if (value === void 0) return defaultRequestTimeoutMs;
  if (!Number.isInteger(value) || value < 1 || value > maximumRequestTimeoutMs) return void 0;
  return value;
}
async function parseResponseBody(response) {
  if (response.status === 204) return { ok: true, value: null };
  const text = await response.text();
  if (text.length === 0) return { ok: true, value: null };
  try {
    return { ok: true, value: parse(text) };
  } catch {
    return { ok: false };
  }
}
function safeResponseHeaders(headers, allowlist) {
  const normalized = {};
  for (const rawName of allowlist) {
    const value = headers.get(rawName);
    if (value === null) continue;
    const outputName = safeHeaderName(rawName);
    if (outputName !== void 0) normalized[outputName] = value;
  }
  return normalized;
}
function safeHeaderName(rawName) {
  switch (rawName.toLowerCase()) {
    case "link":
      return "link";
    case "retry-after":
      return "retryAfter";
    case "x-request-id":
      return "requestId";
    case "atl-traceid":
      return "atlTraceId";
    default:
      return void 0;
  }
}
function success(prepared, response) {
  return {
    schemaVersion: 1,
    operation: prepared.operation.operationName,
    kind: "api",
    success: true,
    api: apiMetadata(prepared),
    response,
    diagnostics: []
  };
}
function failure(prepared, diagnostics, response) {
  const base = {
    schemaVersion: 1,
    operation: prepared.operation.operationName,
    kind: "api",
    success: false,
    api: apiMetadata(prepared),
    diagnostics
  };
  return response === void 0 ? base : { ...base, response };
}
function apiMetadata(prepared) {
  return {
    version: "v2",
    operationId: prepared.operation.operationId,
    method: prepared.method,
    pathTemplate: prepared.operation.pathTemplate
  };
}
function httpFailureDiagnostic(operation, status) {
  if (status === 401) {
    return {
      severity: "error",
      code: "AUTHENTICATION_ERROR",
      message: "Confluence API authentication failed.",
      operation,
      httpStatus: status,
      retryable: false
    };
  }
  if (status === 403) {
    return {
      severity: "error",
      code: "ACCESS_PERMISSION_REQUIRED",
      message: "Confluence API permission was denied.",
      operation,
      httpStatus: status,
      retryable: false
    };
  }
  return {
    severity: "error",
    code: "HTTP_ERROR",
    message: "Confluence API request failed.",
    operation,
    httpStatus: status,
    retryable: status === 429 || status >= 500
  };
}
var defaultRequestTimeoutMs, maximumRequestTimeoutMs;
var init_http_client = __esm({
  "src/adapters/confluence-v2/http-client.ts"() {
    "use strict";
    init_esm();
    defaultRequestTimeoutMs = 3e4;
    maximumRequestTimeoutMs = 3e5;
  }
});

// src/adapters/confluence-v2/request-builder.ts
function prepareApiRequest(context, operation, input) {
  const relative = prepareRelativeApiRequest(operation, input);
  if (relative.ok === false) return relative;
  const url = new URL(relative.value.relativePath, context.apiBaseUrl.origin);
  return {
    ok: true,
    value: {
      ...relative.value,
      url
    }
  };
}
function prepareRelativeApiRequest(operation, input) {
  const inputValidation = validateApiInput(operation, input);
  if (inputValidation.ok === false) return inputValidation;
  const values = inputValidation.value;
  const pathValues = values.path ?? {};
  const queryValues = values.query ?? {};
  let path2 = operation.pathTemplate;
  for (const parameter of operation.parameters.filter((candidate) => candidate.location === "path")) {
    const rawValue = pathValues[parameter.name];
    if (rawValue === void 0) continue;
    path2 = path2.replace(`{${parameter.name}}`, encodeURIComponent(stringifyScalar(rawValue)));
  }
  const url = new URL("https://miku-confluence.invalid");
  url.pathname = `/wiki/api/v2${path2}`;
  const queryParameterNames = [];
  for (const parameter of operation.parameters.filter((candidate) => candidate.location === "query")) {
    const rawValue = queryValues[parameter.name];
    if (rawValue === void 0) continue;
    queryParameterNames.push(parameter.name);
    if (Array.isArray(rawValue)) {
      for (const item of rawValue) url.searchParams.append(parameter.name, stringifyScalar(item));
      continue;
    }
    url.searchParams.append(parameter.name, stringifyScalar(rawValue));
  }
  const requestBody = values.body === void 0 ? {} : { body: JSON.stringify(values.body), contentType: operation.requestBody.contentType };
  return {
    ok: true,
    value: {
      ...requestBody,
      operation,
      method: operation.method,
      relativePath: `${url.pathname}${url.search}`,
      queryParameterNames
    }
  };
}
function validateApiInput(operation, input) {
  if (!isRecord(input)) return invalidInput("$", "must be a JSON object");
  const allowedLocations = new Set(operation.parameters.map((parameter) => parameter.location));
  if (operation.requestBody !== void 0) allowedLocations.add("body");
  for (const key of Object.keys(input)) {
    if (!allowedLocations.has(key)) return invalidInput(`$.${key}`, "is not allowed for this operation");
  }
  const validated = {};
  for (const location of ["path", "query"]) {
    const parameters = operation.parameters.filter((parameter) => parameter.location === location);
    if (parameters.length === 0) continue;
    const rawLocation = input[location];
    if (rawLocation === void 0) {
      if (parameters.some((parameter) => parameter.required)) return invalidInput(`$.${location}`, "is required");
      continue;
    }
    if (!isRecord(rawLocation)) return invalidInput(`$.${location}`, "must be an object");
    const allowedNames = new Set(parameters.map((parameter) => parameter.name));
    for (const key of Object.keys(rawLocation)) {
      if (!allowedNames.has(key)) return invalidInput(`$.${location}.${key}`, "is not an OpenAPI parameter for this operation");
    }
    const locationValues = {};
    for (const parameter of parameters) {
      const value = rawLocation[parameter.name];
      if (value === void 0) {
        if (parameter.required) return invalidInput(`$.${location}.${parameter.name}`, "is required");
        continue;
      }
      if (!isJsonValue(value)) return invalidInput(`$.${location}.${parameter.name}`, "must be JSON data");
      const problem = validateSchema(value, parameter.effectiveSchema, `$.${location}.${parameter.name}`);
      if (problem !== void 0) return problem;
      locationValues[parameter.name] = value;
    }
    validated[location] = locationValues;
  }
  if (operation.requestBody !== void 0) {
    const body = input.body;
    if (body === void 0) {
      if (operation.requestBody.required) return invalidInput("$.body", "is required");
    } else {
      if (!isJsonValue(body)) return invalidInput("$.body", "must be JSON data");
      const problem = validateSchema(body, operation.requestBody.effectiveSchema, "$.body");
      if (problem !== void 0) return problem;
      validated.body = body;
    }
  }
  return { ok: true, value: validated };
}
function validateSchema(value, schema, path2) {
  if (value === null && schema.nullable === true) return void 0;
  if (Array.isArray(schema.oneOf)) {
    const matches = schema.oneOf.some((candidate) => isJsonObject(candidate) && validateSchema(value, candidate, path2) === void 0);
    if (matches) return void 0;
    return invalidInput(path2, "does not match any supported request-body form");
  }
  const expectedType = schema.type;
  if (expectedType === "string" && typeof value !== "string") return invalidInput(path2, "must be a string");
  if (expectedType === "boolean" && typeof value !== "boolean") return invalidInput(path2, "must be a boolean");
  if (expectedType === "integer" && (!Number.isInteger(value) || typeof value !== "number")) return invalidInput(path2, "must be an integer");
  if (expectedType === "array" && !Array.isArray(value)) return invalidInput(path2, "must be an array");
  if (typeof value === "string" && typeof schema.pattern === "string" && !new RegExp(schema.pattern, "u").test(value)) {
    return invalidInput(path2, "does not match the required pattern");
  }
  if (typeof value === "number" && typeof schema.minimum === "number" && value < schema.minimum) return invalidInput(path2, "is below the minimum");
  if (typeof value === "number" && typeof schema.maximum === "number" && value > schema.maximum) return invalidInput(path2, "is above the maximum");
  if (Array.isArray(schema.enum) && !schema.enum.some((candidate) => candidate === value)) return invalidInput(path2, "is not an allowed value");
  if (Array.isArray(value) && typeof schema.maxItems === "number" && value.length > schema.maxItems) {
    return invalidInput(path2, "has too many items");
  }
  if (Array.isArray(value) && typeof schema.minItems === "number" && value.length < schema.minItems) {
    return invalidInput(path2, "has too few items");
  }
  if (Array.isArray(value) && isJsonObject(schema.items)) {
    for (let index = 0; index < value.length; index += 1) {
      const problem = validateSchema(value[index], schema.items, `${path2}[${index}]`);
      if (problem !== void 0) return problem;
    }
  }
  if (isRecord(value)) {
    const properties = isJsonObject(schema.properties) ? schema.properties : void 0;
    const required = Array.isArray(schema.required) ? schema.required.filter((name) => typeof name === "string") : [];
    for (const name of required) {
      if (!(name in value)) return invalidInput(`${path2}.${name}`, "is required");
    }
    if (schema.additionalProperties === false && properties !== void 0) {
      for (const name of Object.keys(value)) {
        if (!(name in properties)) return invalidInput(`${path2}.${name}`, "is not allowed");
      }
    }
    if (properties !== void 0) {
      for (const [name, child] of Object.entries(properties)) {
        if (!(name in value) || !isJsonObject(child)) continue;
        const problem = validateSchema(value[name], child, `${path2}.${name}`);
        if (problem !== void 0) return problem;
      }
    }
  }
  return void 0;
}
function invalidInput(path2, reason) {
  return {
    ok: false,
    diagnostics: [{
      severity: "error",
      code: "INVALID_INPUT",
      message: `Operation input ${reason}.`,
      path: path2
    }]
  };
}
function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isJsonObject(value) {
  return value !== void 0 && value !== null && typeof value === "object" && !Array.isArray(value);
}
function isJsonValue(value) {
  if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.every((item) => isJsonValue(item));
  if (!isRecord(value)) return false;
  return Object.values(value).every((item) => isJsonValue(item));
}
function stringifyScalar(value) {
  if (typeof value === "string") return value;
  if (typeof value === "boolean" || typeof value === "number") return String(value);
  throw new Error("Validated API parameter was not a scalar.");
}
var init_request_builder = __esm({
  "src/adapters/confluence-v2/request-builder.ts"() {
    "use strict";
  }
});

// src/adapters/confluence-v2/execute-operation.ts
async function executeApiOperation(context, operation, policy, input, dependencies) {
  if (!context.allowedPermissions.has(policy.requiredPermission)) {
    return {
      schemaVersion: 1,
      operation: operation.operationName,
      kind: "api",
      success: false,
      api: {
        version: "v2",
        operationId: operation.operationId,
        method: operation.method,
        pathTemplate: operation.pathTemplate
      },
      diagnostics: [{
        severity: "error",
        code: "PERMISSION_REQUIRED",
        message: "The configured local permission set does not allow this operation.",
        operation: operation.operationName
      }]
    };
  }
  const prepared = prepareApiRequest(context, operation, input);
  if (prepared.ok === false) {
    return {
      schemaVersion: 1,
      operation: operation.operationName,
      kind: "api",
      success: false,
      api: {
        version: "v2",
        operationId: operation.operationId,
        method: operation.method,
        pathTemplate: operation.pathTemplate
      },
      diagnostics: prepared.diagnostics
    };
  }
  return executePreparedApiRequest(context, prepared.value, policy, dependencies);
}
var init_execute_operation = __esm({
  "src/adapters/confluence-v2/execute-operation.ts"() {
    "use strict";
    init_http_client();
    init_request_builder();
  }
});

// src/adapters/confluence-v2/pagination.ts
function nextPageUrl(page, options) {
  const linkValue = nextLinkRelation(page.response.headers.link);
  const bodyValue = nextBodyLink(page.response.body);
  if (linkValue.ok === false) return linkValue;
  if (bodyValue.ok === false) return bodyValue;
  if (linkValue.value === void 0 && bodyValue.value === void 0) return { ok: true, value: void 0 };
  const resolvedLink = linkValue.value === void 0 ? void 0 : validateNextUrl(linkValue.value, page.currentUrl, options);
  if (resolvedLink?.ok === false) return resolvedLink;
  const resolvedBody = bodyValue.value === void 0 ? void 0 : validateNextUrl(bodyValue.value, page.currentUrl, options);
  if (resolvedBody?.ok === false) return resolvedBody;
  if (resolvedLink?.value !== void 0 && resolvedBody?.value !== void 0 && resolvedLink.value.toString() !== resolvedBody.value.toString()) {
    return invalidPaginationLink();
  }
  return { ok: true, value: resolvedLink?.value ?? resolvedBody?.value };
}
function nextLinkRelation(header) {
  if (header === void 0) return { ok: true, value: void 0 };
  for (const segment of splitLinkHeader(header)) {
    const match = /^\s*<([^>]+)>\s*(.*)$/u.exec(segment);
    if (match === null) return invalidPaginationLink();
    const url = match[1];
    const parameterText = match[2] ?? "";
    const relations = parameterText.split(";").map((parameter) => parameter.trim()).filter((parameter) => parameter.toLowerCase().startsWith("rel=")).flatMap((parameter) => parameter.slice(4).replace(/^"|"$/gu, "").split(/\s+/u));
    if (relations.some((relation) => relation.toLowerCase() === "next")) return { ok: true, value: url };
  }
  return { ok: true, value: void 0 };
}
function splitLinkHeader(header) {
  const result3 = [];
  let current = "";
  let angleDepth = 0;
  for (const character of header) {
    if (character === "<") angleDepth += 1;
    if (character === ">" && angleDepth > 0) angleDepth -= 1;
    if (character === "," && angleDepth === 0) {
      result3.push(current);
      current = "";
      continue;
    }
    current += character;
  }
  result3.push(current);
  return result3;
}
function nextBodyLink(body) {
  if (!isRecord2(body)) return { ok: true, value: void 0 };
  const links = body._links;
  if (!isRecord2(links) || links.next === void 0) return { ok: true, value: void 0 };
  if (typeof links.next !== "string" || links.next.length === 0) return invalidPaginationLink();
  return { ok: true, value: links.next };
}
function validateNextUrl(value, currentUrl, options) {
  let next;
  try {
    next = new URL(value, currentUrl);
  } catch {
    return invalidPaginationLink();
  }
  if (next.protocol !== "https:" || next.origin !== options.apiBaseUrl.origin || next.username.length > 0 || next.password.length > 0 || next.pathname !== options.collectionPath) {
    return invalidPaginationLink();
  }
  return { ok: true, value: next };
}
function invalidPaginationLink() {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "INVALID_PAGINATION_LINK",
      message: "Confluence returned an unsafe or invalid pagination next link."
    }
  };
}
function isRecord2(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
var init_pagination = __esm({
  "src/adapters/confluence-v2/pagination.ts"() {
    "use strict";
  }
});

// src/adapters/filesystem/snapshot-writer.ts
import { createHash } from "node:crypto";
import { lstat, mkdir, mkdtemp, open, rename, rm, unlink, writeFile as writeFile2 } from "node:fs/promises";
import { homedir } from "node:os";
import { basename, dirname, resolve } from "node:path";
async function planSnapshotOutput(outputDirectory, operation = "page.export-subtree") {
  const finalDirectory = resolve(outputDirectory);
  const currentDirectory = resolve(process.cwd());
  const userHome = resolve(homedir());
  if (dirname(finalDirectory) === finalDirectory || finalDirectory === currentDirectory || finalDirectory === userHome) {
    return failure2("UNSAFE_OUTPUT_PATH", "The snapshot output directory must not be the filesystem root, current directory, or user home.", operation);
  }
  try {
    await lstat(finalDirectory);
    return failure2("OUTPUT_EXISTS", "The snapshot output directory already exists.", operation);
  } catch (error) {
    if (!isNotFound(error)) return failure2("FILESYSTEM_ERROR", "The snapshot output directory could not be inspected.", operation);
  }
  try {
    const parent = await lstat(dirname(finalDirectory));
    if (!parent.isDirectory() || parent.isSymbolicLink()) {
      return failure2("UNSAFE_OUTPUT_PATH", "The snapshot output parent must be a non-symbolic-link directory.", operation);
    }
  } catch {
    return failure2("FILESYSTEM_ERROR", "The snapshot output parent must already exist and be accessible.", operation);
  }
  return { ok: true, value: { outputDirectory, finalDirectory } };
}
function failure2(code, message, operation) {
  return { ok: false, diagnostic: { severity: "error", code, message, operation } };
}
function isNotFound(error) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
function contentExtension(originalFileName, mediaType) {
  const nameMatch = /\.([A-Za-z0-9]{1,16})$/u.exec(originalFileName);
  if (nameMatch?.[1] !== void 0) return nameMatch[1].toLowerCase();
  const mediaTypeExtensions = {
    "application/json": "json",
    "application/pdf": "pdf",
    "application/zip": "zip",
    "image/gif": "gif",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/svg+xml": "svg",
    "text/csv": "csv",
    "text/plain": "txt"
  };
  return mediaTypeExtensions[mediaType.toLowerCase()] ?? "bin";
}
function isDownloadStreamFailure(error) {
  return typeof error === "object" && error !== null && "downloadDiagnosticCode" in error && (error.downloadDiagnosticCode === "NETWORK_ERROR" || error.downloadDiagnosticCode === "TIMEOUT");
}
var SnapshotWriter, filesystemSnapshotStorage;
var init_snapshot_writer = __esm({
  "src/adapters/filesystem/snapshot-writer.ts"() {
    "use strict";
    init_json();
    SnapshotWriter = class _SnapshotWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        const parent = dirname(plan.finalDirectory);
        const stagingPrefix = `.${basename(plan.finalDirectory)}.miku-confluence-staging-`;
        const stagingDirectory = await mkdtemp(resolve(parent, stagingPrefix));
        return new _SnapshotWriter(plan, stagingDirectory);
      }
      async writePage(pageId, pageBody, storageValue5, diagnostics) {
        const directory = await this.pageDirectory(pageId);
        await writeFile2(resolve(directory, "page.api-v2.json"), `${stringifyJson(pageBody)}
`, "utf8");
        await writeFile2(resolve(directory, "body.storage.xml"), storageValue5, "utf8");
        await this.writePageDiagnostics(pageId, diagnostics);
      }
      async writePageDiagnostics(pageId, diagnostics) {
        const directory = await this.pageDirectory(pageId);
        await writeFile2(resolve(directory, "diagnostics.json"), `${stringifyJson({
          schemaVersion: "miku-confluence.page-diagnostics/v1",
          pageId,
          items: diagnostics
        })}
`, "utf8");
      }
      async writeAttachmentMetadata(pageId, attachmentId, attachmentBody) {
        const directory = await this.attachmentDirectory(pageId, attachmentId);
        await writeFile2(resolve(directory, "attachment.api-v2.json"), `${stringifyJson(attachmentBody)}
`, "utf8");
      }
      async writeAttachmentContent(pageId, attachmentId, content, options) {
        const directory = await this.attachmentDirectory(pageId, attachmentId);
        const extension = contentExtension(options.originalFileName, options.mediaType);
        const contentPath = `content.${extension}`;
        const temporaryPath = resolve(directory, ".content.part");
        const finalPath = resolve(directory, contentPath);
        let handle;
        let finalPathWritten = false;
        let bytes = 0;
        const hash = createHash("sha256");
        try {
          handle = await open(temporaryPath, "wx");
          for await (const chunk of content) {
            if (!(chunk instanceof Uint8Array)) throw new Error("attachment stream was not binary");
            if (bytes + chunk.byteLength > options.maxBytes) {
              await handle.close();
              handle = void 0;
              await unlink(temporaryPath);
              return { ok: false, code: "LIMIT_EXCEEDED" };
            }
            await handle.write(chunk);
            hash.update(chunk);
            bytes += chunk.byteLength;
          }
          await handle.close();
          handle = void 0;
          await rename(temporaryPath, finalPath);
          finalPathWritten = true;
          const sha2562 = hash.digest("hex");
          await writeFile2(resolve(directory, "content.json"), `${stringifyJson({
            schemaVersion: "miku-confluence.attachment-content/v1",
            attachmentId,
            originalFileName: options.originalFileName,
            mediaType: options.mediaType,
            contentPath,
            bytes,
            sha256: sha2562
          })}
`, "utf8");
          return {
            ok: true,
            value: {
              contentPath,
              bytes,
              sha256: sha2562
            }
          };
        } catch (error) {
          if (handle !== void 0) await handle.close().catch(() => void 0);
          await unlink(temporaryPath).catch(() => void 0);
          if (finalPathWritten) await unlink(finalPath).catch(() => void 0);
          const downloadCode = isDownloadStreamFailure(error) ? error.downloadDiagnosticCode : void 0;
          return { ok: false, code: downloadCode ?? "FILESYSTEM_ERROR" };
        }
      }
      async writeTree(tree) {
        await writeFile2(resolve(this.stagingDirectory, "tree.json"), `${stringifyJson(tree)}
`, "utf8");
      }
      async writeExportManifest(manifest) {
        await writeFile2(resolve(this.stagingDirectory, "export.json"), `${stringifyJson(manifest)}
`, "utf8");
      }
      async finalize() {
        try {
          await lstat(this.plan.finalDirectory);
          throw new Error("final output exists");
        } catch (error) {
          if (!isNotFound(error) && !(error instanceof Error && error.message === "final output exists")) throw error;
          if (error instanceof Error && error.message === "final output exists") throw error;
        }
        await rename(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm(this.stagingDirectory, { recursive: true, force: true });
      }
      async pageDirectory(pageId) {
        if (!/^[0-9]+$/u.test(pageId)) throw new Error("unsafe page identifier");
        const directory = resolve(this.stagingDirectory, "pages", pageId);
        await mkdir(directory, { recursive: true });
        return directory;
      }
      async attachmentDirectory(pageId, attachmentId) {
        if (!/^(att)?[0-9]+$/u.test(attachmentId)) throw new Error("unsafe attachment identifier");
        const pageDirectory = await this.pageDirectory(pageId);
        const directory = resolve(pageDirectory, "attachments", attachmentId);
        await mkdir(directory, { recursive: true });
        return directory;
      }
    };
    filesystemSnapshotStorage = {
      planOutput: planSnapshotOutput,
      create: SnapshotWriter.create
    };
  }
});

// node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
    "use strict";
    function find(list, predicate, ac) {
      if (ac === void 0) {
        ac = Array.prototype;
      }
      if (list && typeof ac.find === "function") {
        return ac.find.call(list, predicate);
      }
      for (var i = 0; i < list.length; i++) {
        if (hasOwn(list, i)) {
          var item = list[i];
          if (predicate.call(void 0, item, i, list)) {
            return item;
          }
        }
      }
    }
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      if (oc && typeof oc.getOwnPropertyDescriptors === "function") {
        object = oc.create(null, oc.getOwnPropertyDescriptors(object));
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    function hasOwn(object, key) {
      return Object.prototype.hasOwnProperty.call(object, key);
    }
    function assign(target, source) {
      if (target === null || typeof target !== "object") {
        throw new TypeError("target is not an object");
      }
      for (var key in source) {
        if (hasOwn(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
    var HTML_BOOLEAN_ATTRIBUTES = freeze({
      allowfullscreen: true,
      async: true,
      autofocus: true,
      autoplay: true,
      checked: true,
      controls: true,
      default: true,
      defer: true,
      disabled: true,
      formnovalidate: true,
      hidden: true,
      ismap: true,
      itemscope: true,
      loop: true,
      multiple: true,
      muted: true,
      nomodule: true,
      novalidate: true,
      open: true,
      playsinline: true,
      readonly: true,
      required: true,
      reversed: true,
      selected: true
    });
    function isHTMLBooleanAttribute(name) {
      return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
    }
    var HTML_VOID_ELEMENTS = freeze({
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    });
    function isHTMLVoidElement(tagName) {
      return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
    }
    var HTML_RAW_TEXT_ELEMENTS = freeze({
      script: false,
      style: false,
      textarea: true,
      title: true
    });
    function isHTMLRawTextElement(tagName) {
      var key = tagName.toLowerCase();
      return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
    }
    function isHTMLEscapableRawTextElement(tagName) {
      var key = tagName.toLowerCase();
      return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
    }
    function isHTMLMimeType(mimeType) {
      return mimeType === MIME_TYPE.HTML;
    }
    function hasDefaultHTMLNamespace(mimeType) {
      return isHTMLMimeType(mimeType) || mimeType === MIME_TYPE.XML_XHTML_APPLICATION;
    }
    var MIME_TYPE = freeze({
      /**
       * `text/html`, the only mime type that triggers treating an XML document as HTML.
       *
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
       *      WHATWG HTML Spec
       */
      HTML: "text/html",
      /**
       * `application/xml`, the standard mime type for XML documents.
       *
       * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
       *      registration
       * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_APPLICATION: "application/xml",
      /**
       * `text/xml`, an alias for `application/xml`.
       *
       * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
       * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_TEXT: "text/xml",
      /**
       * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
       * but is parsed as an XML document.
       *
       * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
       *      registration
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
       * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
       */
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      /**
       * `image/svg+xml`,
       *
       * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
       * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
       * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
       */
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
      return MIME_TYPE[key];
    });
    function isValidMimeType(mimeType) {
      return _MIME_TYPES.indexOf(mimeType) > -1;
    }
    var NAMESPACE = freeze({
      /**
       * The XHTML namespace.
       *
       * @see http://www.w3.org/1999/xhtml
       */
      HTML: "http://www.w3.org/1999/xhtml",
      /**
       * The SVG namespace.
       *
       * @see http://www.w3.org/2000/svg
       */
      SVG: "http://www.w3.org/2000/svg",
      /**
       * The `xml:` namespace.
       *
       * @see http://www.w3.org/XML/1998/namespace
       */
      XML: "http://www.w3.org/XML/1998/namespace",
      /**
       * The `xmlns:` namespace.
       *
       * @see https://www.w3.org/2000/xmlns/
       */
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports.assign = assign;
    exports.find = find;
    exports.freeze = freeze;
    exports.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
    exports.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
    exports.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
    exports.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace;
    exports.hasOwn = hasOwn;
    exports.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
    exports.isHTMLRawTextElement = isHTMLRawTextElement;
    exports.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement;
    exports.isHTMLMimeType = isHTMLMimeType;
    exports.isHTMLVoidElement = isHTMLVoidElement;
    exports.isValidMimeType = isValidMimeType;
    exports.MIME_TYPE = MIME_TYPE;
    exports.NAMESPACE = NAMESPACE;
  }
});

// node_modules/@xmldom/xmldom/lib/errors.js
var require_errors = __commonJS({
  "node_modules/@xmldom/xmldom/lib/errors.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    function extendError(constructor, writableName) {
      constructor.prototype = Object.create(Error.prototype, {
        constructor: { value: constructor },
        name: { value: constructor.name, enumerable: true, writable: writableName }
      });
    }
    var DOMExceptionName = conventions.freeze({
      /**
       * the default value as defined by the spec
       */
      Error: "Error",
      /**
       * @deprecated
       * Use RangeError instead.
       */
      IndexSizeError: "IndexSizeError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      DomstringSizeError: "DomstringSizeError",
      HierarchyRequestError: "HierarchyRequestError",
      WrongDocumentError: "WrongDocumentError",
      InvalidCharacterError: "InvalidCharacterError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      NoDataAllowedError: "NoDataAllowedError",
      NoModificationAllowedError: "NoModificationAllowedError",
      NotFoundError: "NotFoundError",
      NotSupportedError: "NotSupportedError",
      InUseAttributeError: "InUseAttributeError",
      InvalidStateError: "InvalidStateError",
      SyntaxError: "SyntaxError",
      InvalidModificationError: "InvalidModificationError",
      NamespaceError: "NamespaceError",
      /**
       * @deprecated
       * Use TypeError for invalid arguments,
       * "NotSupportedError" DOMException for unsupported operations,
       * and "NotAllowedError" DOMException for denied requests instead.
       */
      InvalidAccessError: "InvalidAccessError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      ValidationError: "ValidationError",
      /**
       * @deprecated
       * Use TypeError instead.
       */
      TypeMismatchError: "TypeMismatchError",
      SecurityError: "SecurityError",
      NetworkError: "NetworkError",
      AbortError: "AbortError",
      /**
       * @deprecated
       * Just to match the related static code, not part of the spec.
       */
      URLMismatchError: "URLMismatchError",
      QuotaExceededError: "QuotaExceededError",
      TimeoutError: "TimeoutError",
      InvalidNodeTypeError: "InvalidNodeTypeError",
      DataCloneError: "DataCloneError",
      EncodingError: "EncodingError",
      NotReadableError: "NotReadableError",
      UnknownError: "UnknownError",
      ConstraintError: "ConstraintError",
      DataError: "DataError",
      TransactionInactiveError: "TransactionInactiveError",
      ReadOnlyError: "ReadOnlyError",
      VersionError: "VersionError",
      OperationError: "OperationError",
      NotAllowedError: "NotAllowedError",
      OptOutError: "OptOutError"
    });
    var DOMExceptionNames = Object.keys(DOMExceptionName);
    function isValidDomExceptionCode(value) {
      return typeof value === "number" && value >= 1 && value <= 25;
    }
    function endsWithError(value) {
      return typeof value === "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
    }
    function DOMException(messageOrCode, nameOrMessage) {
      if (isValidDomExceptionCode(messageOrCode)) {
        this.name = DOMExceptionNames[messageOrCode];
        this.message = nameOrMessage || "";
      } else {
        this.message = messageOrCode;
        this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error;
      }
      if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
    }
    extendError(DOMException, true);
    Object.defineProperties(DOMException.prototype, {
      code: {
        enumerable: true,
        get: function() {
          var code = DOMExceptionNames.indexOf(this.name);
          if (isValidDomExceptionCode(code)) return code;
          return 0;
        }
      }
    });
    var ExceptionCode = {
      INDEX_SIZE_ERR: 1,
      DOMSTRING_SIZE_ERR: 2,
      HIERARCHY_REQUEST_ERR: 3,
      WRONG_DOCUMENT_ERR: 4,
      INVALID_CHARACTER_ERR: 5,
      NO_DATA_ALLOWED_ERR: 6,
      NO_MODIFICATION_ALLOWED_ERR: 7,
      NOT_FOUND_ERR: 8,
      NOT_SUPPORTED_ERR: 9,
      INUSE_ATTRIBUTE_ERR: 10,
      INVALID_STATE_ERR: 11,
      SYNTAX_ERR: 12,
      INVALID_MODIFICATION_ERR: 13,
      NAMESPACE_ERR: 14,
      INVALID_ACCESS_ERR: 15,
      VALIDATION_ERR: 16,
      TYPE_MISMATCH_ERR: 17,
      SECURITY_ERR: 18,
      NETWORK_ERR: 19,
      ABORT_ERR: 20,
      URL_MISMATCH_ERR: 21,
      QUOTA_EXCEEDED_ERR: 22,
      TIMEOUT_ERR: 23,
      INVALID_NODE_TYPE_ERR: 24,
      DATA_CLONE_ERR: 25
    };
    var entries = Object.entries(ExceptionCode);
    for (i = 0; i < entries.length; i++) {
      key = entries[i][0];
      DOMException[key] = entries[i][1];
    }
    var key;
    var i;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
    }
    extendError(ParseError);
    exports.DOMException = DOMException;
    exports.DOMExceptionName = DOMExceptionName;
    exports.ExceptionCode = ExceptionCode;
    exports.ParseError = ParseError;
  }
});

// node_modules/@xmldom/xmldom/lib/grammar.js
var require_grammar = __commonJS({
  "node_modules/@xmldom/xmldom/lib/grammar.js"(exports) {
    "use strict";
    function detectUnicodeSupport(RegExpImpl) {
      try {
        if (typeof RegExpImpl !== "function") {
          RegExpImpl = RegExp;
        }
        var match = new RegExpImpl("\u{1D306}", "u").exec("\u{1D306}");
        return !!match && match[0].length === 2;
      } catch (error) {
      }
      return false;
    }
    var UNICODE_SUPPORT = detectUnicodeSupport();
    function chars(regexp) {
      if (regexp.source[0] !== "[") {
        throw new Error(regexp + " can not be used with chars");
      }
      return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
    }
    function chars_without(regexp, search) {
      if (regexp.source[0] !== "[") {
        throw new Error("/" + regexp.source + "/ can not be used with chars_without");
      }
      if (!search || typeof search !== "string") {
        throw new Error(JSON.stringify(search) + " is not a valid search");
      }
      if (regexp.source.indexOf(search) === -1) {
        throw new Error('"' + search + '" is not is /' + regexp.source + "/");
      }
      if (search === "-" && regexp.source.indexOf(search) !== 1) {
        throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
      }
      return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
    }
    function reg(args) {
      var self = this;
      return new RegExp(
        Array.prototype.slice.call(arguments).map(function(part) {
          var isStr = typeof part === "string";
          if (isStr && self === void 0 && part === "|") {
            throw new Error("use regg instead of reg to wrap expressions with `|`!");
          }
          return isStr ? part : part.source;
        }).join(""),
        UNICODE_SUPPORT ? "mu" : "m"
      );
    }
    function regg(args) {
      if (arguments.length === 0) {
        throw new Error("no parameters provided");
      }
      return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
    }
    var UNICODE_REPLACEMENT_CHARACTER = "\uFFFD";
    var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
    if (UNICODE_SUPPORT) {
      Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]");
    }
    var InvalidChar = new RegExp("[^" + chars(Char) + "]", UNICODE_SUPPORT ? "u" : "");
    var _SChar = /[\x20\x09\x0D\x0A]/;
    var SChar_s = chars(_SChar);
    var S = reg(_SChar, "+");
    var S_OPT = reg(_SChar, "*");
    var NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    if (UNICODE_SUPPORT) {
      NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]");
    }
    var NameStartChar_s = chars(NameStartChar);
    var NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]");
    var Name = reg(NameStartChar, NameChar, "*");
    var Nmtoken = reg(NameChar, "+");
    var EntityRef = reg("&", Name, ";");
    var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);
    var Reference = regg(EntityRef, "|", CharRef);
    var PEReference = reg("%", Name, ";");
    var EntityValue = regg(
      reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'),
      "|",
      reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'")
    );
    var AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'");
    var NCNameStartChar = chars_without(NameStartChar, ":");
    var NCNameChar = chars_without(NameChar, ":");
    var NCName = reg(NCNameStartChar, NCNameChar, "*");
    var QName = reg(NCName, regg(":", NCName), "?");
    var QName_exact = reg("^", QName, "$");
    var QName_group = reg("(", QName, ")");
    var SystemLiteral = regg(/"[^"]*"|'[^']*'/);
    var PI = reg(/^<\?/, "(", Name, ")", regg(S, "(", Char, "*?)"), "?", /\?>/);
    var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;
    var PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'");
    var COMMENT_START = "<!--";
    var COMMENT_END = "-->";
    var Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END);
    var PCDATA = "#PCDATA";
    var Mixed = regg(
      reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/),
      "|",
      reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/)
    );
    var _children_quantity = /[?*+]?/;
    var children = reg(
      /\([^>]+\)/,
      _children_quantity
      /*regg(choice, '|', seq), _children_quantity*/
    );
    var contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children);
    var ELEMENTDECL_START = "<!ELEMENT";
    var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">");
    var NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/);
    var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/);
    var EnumeratedType = regg(NotationType, "|", Enumeration);
    var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType);
    var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue));
    var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);
    var ATTLIST_DECL_START = "<!ATTLIST";
    var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">");
    var ABOUT_LEGACY_COMPAT = "about:legacy-compat";
    var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'");
    var SYSTEM = "SYSTEM";
    var PUBLIC = "PUBLIC";
    var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
    var ExternalID_match = reg(
      "^",
      regg(
        regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"),
        "|",
        regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")
      )
    );
    var PubidLiteral_match = reg("^", PubidLiteral, "$");
    var SystemLiteral_match = reg("^", SystemLiteral, "$");
    var NDataDecl = regg(S, "NDATA", S, Name);
    var EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?"));
    var ENTITY_DECL_START = "<!ENTITY";
    var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">");
    var PEDef = regg(EntityValue, "|", ExternalID);
    var PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">");
    var EntityDecl = regg(GEDecl, "|", PEDecl);
    var PublicID = reg(PUBLIC, S, PubidLiteral);
    var NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">");
    var Eq = reg(S_OPT, "=", S_OPT);
    var VersionNum = /1[.]\d+/;
    var VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"'));
    var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
    var EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'"));
    var SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"'));
    var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/);
    var DOCTYPE_DECL_START = "<!DOCTYPE";
    var CDATA_START = "<![CDATA[";
    var CDATA_END = "]]>";
    var CDStart = /<!\[CDATA\[/;
    var CDEnd = /\]\]>/;
    var CData = reg(Char, "*?", CDEnd);
    var CDSect = reg(CDStart, CData);
    exports.chars = chars;
    exports.chars_without = chars_without;
    exports.detectUnicodeSupport = detectUnicodeSupport;
    exports.reg = reg;
    exports.regg = regg;
    exports.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
    exports.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
    exports.AttlistDecl = AttlistDecl;
    exports.CDATA_START = CDATA_START;
    exports.CDATA_END = CDATA_END;
    exports.CDSect = CDSect;
    exports.Char = Char;
    exports.Comment = Comment;
    exports.COMMENT_START = COMMENT_START;
    exports.COMMENT_END = COMMENT_END;
    exports.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
    exports.elementdecl = elementdecl;
    exports.EntityDecl = EntityDecl;
    exports.EntityValue = EntityValue;
    exports.ExternalID = ExternalID;
    exports.ExternalID_match = ExternalID_match;
    exports.Name = Name;
    exports.NotationDecl = NotationDecl;
    exports.Reference = Reference;
    exports.PEReference = PEReference;
    exports.PI = PI;
    exports.PUBLIC = PUBLIC;
    exports.PubidLiteral = PubidLiteral;
    exports.PubidLiteral_match = PubidLiteral_match;
    exports.QName = QName;
    exports.QName_exact = QName_exact;
    exports.QName_group = QName_group;
    exports.S = S;
    exports.SChar_s = SChar_s;
    exports.S_OPT = S_OPT;
    exports.SYSTEM = SYSTEM;
    exports.SystemLiteral = SystemLiteral;
    exports.SystemLiteral_match = SystemLiteral_match;
    exports.InvalidChar = InvalidChar;
    exports.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
    exports.UNICODE_SUPPORT = UNICODE_SUPPORT;
    exports.XMLDecl = XMLDecl;
  }
});

// node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    var find = conventions.find;
    var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    var hasOwn = conventions.hasOwn;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
    var isHTMLVoidElement = conventions.isHTMLVoidElement;
    var MIME_TYPE = conventions.MIME_TYPE;
    var NAMESPACE = conventions.NAMESPACE;
    var PDC = /* @__PURE__ */ Symbol();
    var errors = require_errors();
    var DOMException = errors.DOMException;
    var DOMExceptionName = errors.DOMExceptionName;
    var g = require_grammar();
    function checkSymbol(symbol) {
      if (symbol !== PDC) {
        throw new TypeError("Illegal constructor");
      }
    }
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!hasOwn(current, element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input) return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function validateQualifiedName(qualifiedName) {
      if (!g.QName_exact.test(qualifiedName)) {
        throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
      }
    }
    function validateAndExtract(namespace, qualifiedName) {
      validateQualifiedName(qualifiedName);
      namespace = namespace || null;
      var prefix = null;
      var localName = qualifiedName;
      if (qualifiedName.indexOf(":") >= 0) {
        var splitResult = qualifiedName.split(":");
        prefix = splitResult[0];
        localName = splitResult[1];
      }
      if (prefix !== null && namespace === null) {
        throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
      }
      if (prefix === "xml" && namespace !== conventions.NAMESPACE.XML) {
        throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
      }
      if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions.NAMESPACE.XMLNS) {
        throw new DOMException(
          DOMException.NAMESPACE_ERR,
          'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
        );
      }
      if (namespace === conventions.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns") {
        throw new DOMException(
          DOMException.NAMESPACE_ERR,
          'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
        );
      }
      return [namespace, prefix, localName];
    }
    function copy(src, dest) {
      for (var p in src) {
        if (hasOwn(src, p)) {
          dest[p] = src[p];
        }
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t = function() {
        };
        t.prototype = Super.prototype;
        t = new t();
        copy(pt, t);
        Class.prototype = pt = t;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var DocumentPosition = conventions.freeze({
      DOCUMENT_POSITION_DISCONNECTED: 1,
      DOCUMENT_POSITION_PRECEDING: 2,
      DOCUMENT_POSITION_FOLLOWING: 4,
      DOCUMENT_POSITION_CONTAINS: 8,
      DOCUMENT_POSITION_CONTAINED_BY: 16,
      DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
    });
    function commonAncestor(a, b) {
      if (b.length < a.length) return commonAncestor(b, a);
      var c = null;
      for (var n in a) {
        if (a[n] !== b[n]) return c;
        c = a[n];
      }
      return c;
    }
    function docGUID(doc) {
      if (!doc.guid) doc.guid = Math.random();
      return doc.guid;
    }
    function NodeList() {
    }
    NodeList.prototype = {
      /**
       * The number of nodes in the list. The range of valid child node indices is 0 to length-1
       * inclusive.
       *
       * @type {number}
       */
      length: 0,
      /**
       * Returns the item at `index`. If index is greater than or equal to the number of nodes in
       * the list, this returns null.
       *
       * @param index
       * Unsigned long Index into the collection.
       * @returns {Node | null}
       * The node at position `index` in the NodeList,
       * or null if that is not a valid index.
       */
      item: function(index) {
        return index >= 0 && index < this.length ? this[index] : null;
      },
      /**
       * Returns a string representation of the NodeList.
       *
       * Accepts the same `options` object as `XMLSerializer.prototype.serializeToString`
       * (`requireWellFormed`, `splitCDATASections`, `nodeFilter`). Passing a function is treated as
       * a legacy `nodeFilter` for backward compatibility.
       *
       * @param {Object | function} [options]
       * @param {boolean} [options.requireWellFormed=false]
       * @param {boolean} [options.splitCDATASections=true]
       * @param {function} [options.nodeFilter]
       * @returns {string}
       */
      toString: function(options) {
        var opts;
        if (typeof options === "function") {
          opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
        } else if (!!options) {
          opts = {
            requireWellFormed: !!options.requireWellFormed,
            splitCDATASections: options.splitCDATASections !== false,
            nodeFilter: options.nodeFilter || null
          };
        } else {
          opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
        }
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, null, opts);
        }
        return buf.join("");
      },
      /**
       * Filters the NodeList based on a predicate.
       *
       * @param {function(Node): boolean} predicate
       * - A predicate function to filter the NodeList.
       * @returns {Node[]}
       * An array of nodes that satisfy the predicate.
       * @private
       */
      filter: function(predicate) {
        return Array.prototype.filter.call(this, predicate);
      },
      /**
       * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
       * not present.
       *
       * @param {Node} item
       * - The Node item to locate in the NodeList.
       * @returns {number}
       * The first index of the node in the NodeList; -1 if not found.
       * @private
       */
      indexOf: function(item) {
        return Array.prototype.indexOf.call(this, item);
      }
    };
    NodeList.prototype[Symbol.iterator] = function() {
      var me = this;
      var index = 0;
      return {
        next: function() {
          if (index < me.length) {
            return {
              value: me[index++],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        },
        return: function() {
          return {
            done: true
          };
        }
      };
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc !== inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        if (!list.$$length || ls.length < list.$$length) {
          for (var i = ls.length; i in list; i++) {
            if (hasOwn(list, i)) {
              delete list[i];
            }
          }
        }
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i] || null;
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = 0;
      while (i < list.length) {
        if (list[i] === node) {
          return i;
        }
        i++;
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length] = newAttr;
        list.length++;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i <= lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
          }
          attr.ownerElement = null;
        }
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      /**
       * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
       * document.
       *
       * @param {string} localName
       * The local name of the attribute.
       * @returns {Attr | null}
       * The attribute with the given local name, or null if no such attribute exists.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
       */
      getNamedItem: function(localName) {
        if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
          localName = localName.toLowerCase();
        }
        var i = 0;
        while (i < this.length) {
          var attr = this[i];
          if (attr.nodeName === localName) {
            return attr;
          }
          i++;
        }
        return null;
      },
      /**
       * Set an attribute.
       *
       * @param {Attr} attr
       * The attribute to set.
       * @returns {Attr | null}
       * The old attribute with the same local name and namespace URI as the new one, or null if no
       * such attribute exists.
       * @throws {DOMException}
       * With code:
       * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
       * element.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
       */
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el !== this._ownerElement) {
          throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        if (oldAttr === attr) {
          return attr;
        }
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /**
       * Set an attribute, replacing an existing attribute with the same local name and namespace
       * URI if one exists.
       *
       * @param {Attr} attr
       * The attribute to set.
       * @returns {Attr | null}
       * The old attribute with the same local name and namespace URI as the new one, or null if no
       * such attribute exists.
       * @throws {DOMException}
       * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
       * attribute of another element.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
       */
      setNamedItemNS: function(attr) {
        return this.setNamedItem(attr);
      },
      /**
       * Removes an attribute specified by the local name.
       *
       * @param {string} localName
       * The local name of the attribute to be removed.
       * @returns {Attr}
       * The attribute node that was removed.
       * @throws {DOMException}
       * With code:
       * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
       * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
       */
      removeNamedItem: function(localName) {
        var attr = this.getNamedItem(localName);
        if (!attr) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
        }
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      /**
       * Removes an attribute specified by the namespace and local name.
       *
       * @param {string | null} namespaceURI
       * The namespace URI of the attribute to be removed.
       * @param {string} localName
       * The local name of the attribute to be removed.
       * @returns {Attr}
       * The attribute node that was removed.
       * @throws {DOMException}
       * With code:
       * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
       * name is found.
       * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
       */
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        if (!attr) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
        }
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      /**
       * Get an attribute by namespace and local name.
       *
       * @param {string | null} namespaceURI
       * The namespace URI of the attribute.
       * @param {string} localName
       * The local name of the attribute.
       * @returns {Attr | null}
       * The attribute with the given namespace URI and local name, or null if no such attribute
       * exists.
       * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
       */
      getNamedItemNS: function(namespaceURI, localName) {
        if (!namespaceURI) {
          namespaceURI = null;
        }
        var i = 0;
        while (i < this.length) {
          var node = this[i];
          if (node.localName === localName && node.namespaceURI === namespaceURI) {
            return node;
          }
          i++;
        }
        return null;
      }
    };
    NamedNodeMap.prototype[Symbol.iterator] = function() {
      var me = this;
      var index = 0;
      return {
        next: function() {
          if (index < me.length) {
            return {
              value: me[index++],
              done: false
            };
          } else {
            return {
              done: true
            };
          }
        },
        return: function() {
          return {
            done: true
          };
        }
      };
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      /**
       * Test if the DOM implementation implements a specific feature and version, as specified in
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
       *
       * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
       * feature is supported. The different implementations fairly diverged in what kind of
       * features were reported. The latest version of the spec settled to force this method to
       * always return true, where the functionality was accurate and in use.
       *
       * @deprecated
       * It is deprecated and modern browsers return true in all cases.
       * @function DOMImplementation#hasFeature
       * @param {string} feature
       * The name of the feature to test.
       * @param {string} [version]
       * This is the version number of the feature to test.
       * @returns {boolean}
       * Always returns true.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
       * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
       */
      hasFeature: function(feature, version) {
        return true;
      },
      /**
       * Creates a DOM Document object of the specified type with its document element. Note that
       * based on the {@link DocumentType}
       * given to create the document, the implementation may instantiate specialized
       * {@link Document} objects that support additional features than the "Core", such as "HTML"
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
       * On the other hand, setting the {@link DocumentType} after the document was created makes
       * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
       * such as createHTMLDocument
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
       * can be used to obtain specific types of {@link Document} objects.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - There is no interface/class `XMLDocument`, it returns a `Document`
       * instance (with it's `type` set to `'xml'`).
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       *
       * @function DOMImplementation.createDocument
       * @param {string | null} namespaceURI
       * The
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
       * of the document element to create or null.
       * @param {string | null} qualifiedName
       * The
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
       * of the document element to be created or null.
       * @param {DocumentType | null} [doctype=null]
       * The type of document to be created or null. When doctype is not null, its
       * {@link Node#ownerDocument} attribute is set to the document being created. Default is
       * `null`
       * @returns {Document}
       * A new {@link Document} object with its document element. If the NamespaceURI,
       * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
       * document element.
       * @throws {DOMException}
       * With code:
       *
       * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
       * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
       * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
       * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
       * is different from null, or if the qualifiedName has a prefix that is "xml" and the
       * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
       * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
       * or if the DOM implementation does not support the "XML" feature but a non-null namespace
       * URI was provided, since namespaces were defined by XML.
       * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
       * or was created from a different implementation.
       * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
       * "XML" and the language exposed through the Document does not support XML Namespaces (such
       * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
       * @since DOM Level 2.
       * @see {@link #createHTMLDocument}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
       *      Level 3 Core
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
       *      Level 2 Core (initial)
       */
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var contentType = MIME_TYPE.XML_APPLICATION;
        if (namespaceURI === NAMESPACE.HTML) {
          contentType = MIME_TYPE.XML_XHTML_APPLICATION;
        } else if (namespaceURI === NAMESPACE.SVG) {
          contentType = MIME_TYPE.XML_SVG_IMAGE;
        }
        var doc = new Document(PDC, { contentType });
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      /**
       * Creates an empty DocumentType node. Entity declarations and notations are not made
       * available. Entity reference expansions and default attribute additions do not occur.
       *
       * **This behavior is slightly different from the one in the specs**:
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       * - `publicId` and `systemId` contain the raw data including any possible quotes,
       *   so they can always be serialized back to the original value
       * - `internalSubset` contains the raw string between `[` and `]` if present,
       *   but is not parsed or validated in any form.
       *
       * @function DOMImplementation#createDocumentType
       * @param {string} qualifiedName
       * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
       * name} of the document type to be created.
       * @param {string} [publicId]
       * The external subset public identifier. Stored verbatim including surrounding quotes.
       * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       * if the value is non-empty and does not match the XML `PubidLiteral` production
       * (W3C DOM Parsing §3.2.1.3; XML 1.0 production [12]). Creation-time validation is not
       * enforced — deferred to a future breaking release.
       * @param {string} [systemId]
       * The external subset system identifier. Stored verbatim including surrounding quotes.
       * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       * if the value is non-empty and does not match the XML `SystemLiteral` production
       * (W3C DOM Parsing §3.2.1.3; XML 1.0 production [11]). Creation-time validation is not
       * enforced — deferred to a future breaking release.
       * @param {string} [internalSubset]
       * The internal subset or an empty string if it is not present. Stored verbatim.
       * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       * if the value contains `"]>"`. Creation-time validation is not enforced.
       * @returns {DocumentType}
       * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
       * @throws {DOMException}
       * With code:
       *
       * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
       * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
       * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
       * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
       * "XML" and the language exposed through the Document does not support XML Namespaces (such
       * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
       * @since DOM Level 2.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
       *      MDN
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
       *      Standard
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
       *      Level 3 Core
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
       *      Level 2 Core
       * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
       * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
       * @prettierignore
       */
      createDocumentType: function(qualifiedName, publicId, systemId, internalSubset) {
        validateQualifiedName(qualifiedName);
        var node = new DocumentType(PDC);
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        node.internalSubset = internalSubset || "";
        node.childNodes = new NodeList();
        return node;
      },
      /**
       * Returns an HTML document, that might already have a basic DOM structure.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
       * omitted)
       * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       *
       * @param {string | false} [title]
       * A string containing the title to give the new HTML document.
       * @returns {Document}
       * The HTML document.
       * @since WHATWG Living Standard.
       * @see {@link #createDocument}
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
       * @see https://dom.spec.whatwg.org/#html-document
       */
      createHTMLDocument: function(title) {
        var doc = new Document(PDC, { contentType: MIME_TYPE.HTML });
        doc.implementation = this;
        doc.childNodes = new NodeList();
        if (title !== false) {
          doc.doctype = this.createDocumentType("html");
          doc.doctype.ownerDocument = doc;
          doc.appendChild(doc.doctype);
          var htmlNode = doc.createElement("html");
          doc.appendChild(htmlNode);
          var headNode = doc.createElement("head");
          htmlNode.appendChild(headNode);
          if (typeof title === "string") {
            var titleNode = doc.createElement("title");
            titleNode.appendChild(doc.createTextNode(title));
            headNode.appendChild(titleNode);
          }
          htmlNode.appendChild(doc.createElement("body"));
        }
        return doc;
      }
    };
    function Node5(symbol) {
      checkSymbol(symbol);
    }
    Node5.prototype = {
      /**
       * The first child of this node.
       *
       * @type {Node | null}
       */
      firstChild: null,
      /**
       * The last child of this node.
       *
       * @type {Node | null}
       */
      lastChild: null,
      /**
       * The previous sibling of this node.
       *
       * @type {Node | null}
       */
      previousSibling: null,
      /**
       * The next sibling of this node.
       *
       * @type {Node | null}
       */
      nextSibling: null,
      /**
       * The parent node of this node.
       *
       * @type {Node | null}
       */
      parentNode: null,
      /**
       * The parent element of this node.
       *
       * @type {Element | null}
       */
      get parentElement() {
        return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
      },
      /**
       * The child nodes of this node.
       *
       * @type {NodeList}
       */
      childNodes: null,
      /**
       * The document object associated with this node.
       *
       * @type {Document | null}
       */
      ownerDocument: null,
      /**
       * The value of this node.
       *
       * @type {string | null}
       */
      nodeValue: null,
      /**
       * The namespace URI of this node.
       *
       * @type {string | null}
       */
      namespaceURI: null,
      /**
       * The prefix of the namespace for this node.
       *
       * @type {string | null}
       */
      prefix: null,
      /**
       * The local part of the qualified name of this node.
       *
       * @type {string | null}
       */
      localName: null,
      /**
       * The baseURI is currently always `about:blank`,
       * since that's what happens when you create a document from scratch.
       *
       * @type {'about:blank'}
       */
      baseURI: "about:blank",
      /**
       * Is true if this node is part of a document.
       *
       * @type {boolean}
       */
      get isConnected() {
        var rootNode = this.getRootNode();
        return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
      },
      /**
       * Checks whether `other` is an inclusive descendant of this node.
       *
       * @param {Node | null | undefined} other
       * The node to check.
       * @returns {boolean}
       * True if `other` is an inclusive descendant of this node; false otherwise.
       * @see https://dom.spec.whatwg.org/#dom-node-contains
       */
      contains: function(other) {
        if (!other) return false;
        var parent = other;
        do {
          if (this === parent) return true;
          parent = parent.parentNode;
        } while (parent);
        return false;
      },
      /**
       * @typedef GetRootNodeOptions
       * @property {boolean} [composed=false]
       */
      /**
       * Searches for the root node of this node.
       *
       * **This behavior is slightly different from the in the specs**:
       * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
       *
       * @param {GetRootNodeOptions} [options]
       * @returns {Node}
       * Root node.
       * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
       * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
       */
      getRootNode: function(options) {
        var parent = this;
        do {
          if (!parent.parentNode) {
            return parent;
          }
          parent = parent.parentNode;
        } while (parent);
      },
      /**
       * Checks whether the given node is equal to this node.
       *
       * Two nodes are equal when they have the same type, defining characteristics (for the type),
       * and the same childNodes. The comparison is iterative to avoid stack overflows on
       * deeply-nested trees. Attribute nodes of each Element pair are also pushed onto the stack
       * and compared the same way.
       *
       * @param {Node} [otherNode]
       * @returns {boolean}
       * @see https://dom.spec.whatwg.org/#concept-node-equals
       * @see ../docs/walk-dom.md.
       */
      isEqualNode: function(otherNode) {
        if (!otherNode) return false;
        var stack = [{ node: this, other: otherNode }];
        while (stack.length > 0) {
          var pair = stack.pop();
          var node = pair.node;
          var other = pair.other;
          if (node.nodeType !== other.nodeType) return false;
          switch (node.nodeType) {
            case node.DOCUMENT_TYPE_NODE:
              if (node.name !== other.name) return false;
              if (node.publicId !== other.publicId) return false;
              if (node.systemId !== other.systemId) return false;
              break;
            case node.ELEMENT_NODE:
              if (node.namespaceURI !== other.namespaceURI) return false;
              if (node.prefix !== other.prefix) return false;
              if (node.localName !== other.localName) return false;
              if (node.attributes.length !== other.attributes.length) return false;
              for (var i = 0; i < node.attributes.length; i++) {
                var attr = node.attributes.item(i);
                var otherAttr = other.getAttributeNodeNS(attr.namespaceURI, attr.localName);
                if (!otherAttr) return false;
                stack.push({ node: attr, other: otherAttr });
              }
              break;
            case node.ATTRIBUTE_NODE:
              if (node.namespaceURI !== other.namespaceURI) return false;
              if (node.localName !== other.localName) return false;
              if (node.value !== other.value) return false;
              break;
            case node.PROCESSING_INSTRUCTION_NODE:
              if (node.target !== other.target || node.data !== other.data) return false;
              break;
            case node.TEXT_NODE:
            case node.CDATA_SECTION_NODE:
            case node.COMMENT_NODE:
              if (node.data !== other.data) return false;
              break;
          }
          if (node.childNodes.length !== other.childNodes.length) return false;
          for (var i = node.childNodes.length - 1; i >= 0; i--) {
            stack.push({ node: node.childNodes[i], other: other.childNodes[i] });
          }
        }
        return true;
      },
      /**
       * Checks whether or not the given node is this node.
       *
       * @param {Node} [otherNode]
       */
      isSameNode: function(otherNode) {
        return this === otherNode;
      },
      /**
       * Inserts a node before a reference node as a child of this node.
       *
       * @param {Node} newChild
       * The new child node to be inserted.
       * @param {Node | null} refChild
       * The reference node before which newChild will be inserted.
       * @returns {Node}
       * The new child node successfully inserted.
       * @throws {DOMException}
       * Throws a DOMException if inserting the node would result in a DOM tree that is not
       * well-formed, or if `child` is provided but is not a child of `parent`.
       * See {@link _insertBefore} for more details.
       * @since Modified in DOM L2
       */
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      /**
       * Replaces an old child node with a new child node within this node.
       *
       * @param {Node} newChild
       * The new node that is to replace the old node.
       * If it already exists in the DOM, it is removed from its original position.
       * @param {Node} oldChild
       * The existing child node to be replaced.
       * @returns {Node}
       * Returns the replaced child node.
       * @throws {DOMException}
       * Throws a DOMException if replacing the node would result in a DOM tree that is not
       * well-formed, or if `oldChild` is not a child of `this`.
       * This can also occur if the pre-replacement validity assertion fails.
       * See {@link _insertBefore}, {@link Node.removeChild}, and
       * {@link assertPreReplacementValidityInDocument} for more details.
       * @see https://dom.spec.whatwg.org/#concept-node-replace
       */
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      /**
       * Removes an existing child node from this node.
       *
       * @param {Node} oldChild
       * The child node to be removed.
       * @returns {Node}
       * Returns the removed child node.
       * @throws {DOMException}
       * Throws a DOMException if `oldChild` is not a child of `this`.
       * See {@link _removeChild} for more details.
       */
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      /**
       * Appends a child node to this node.
       *
       * @param {Node} newChild
       * The child node to be appended to this node.
       * If it already exists in the DOM, it is removed from its original position.
       * @returns {Node}
       * Returns the appended child node.
       * @throws {DOMException}
       * Throws a DOMException if appending the node would result in a DOM tree that is not
       * well-formed, or if `newChild` is not a valid Node.
       * See {@link insertBefore} for more details.
       */
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      /**
       * Determines whether this node has any child nodes.
       *
       * @returns {boolean}
       * Returns true if this node has any child nodes, and false otherwise.
       */
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      /**
       * Creates a copy of the calling node.
       *
       * @param {boolean} deep
       * If true, the contents of the node are recursively copied.
       * If false, only the node itself (and its attributes, if it is an element) are copied.
       * @returns {Node}
       * Returns the newly created copy of the node.
       * @throws {DOMException}
       * May throw a DOMException if operations within {@link Element#setAttributeNode} or
       * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
       * specific constraints.
       * @see {@link cloneNode}
       */
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      /**
       * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
       * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
       *
       * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
       * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
       * nodes.
       *
       * This method iterativly traverses all child nodes to normalize all descendent nodes within
       * the subtree.
       *
       * @throws {DOMException}
       * May throw a DOMException if operations within removeChild or appendData (which are
       * potentially invoked in this method) do not meet their specific constraints.
       * @since Modified in DOM Level 2
       * @see {@link Node.removeChild}
       * @see {@link CharacterData.appendData}
       * @see ../docs/walk-dom.md.
       */
      normalize: function() {
        walkDOM(this, null, {
          enter: function(node) {
            var child = node.firstChild;
            while (child) {
              var next = child.nextSibling;
              if (next !== null && next.nodeType === TEXT_NODE && child.nodeType === TEXT_NODE) {
                node.removeChild(next);
                child.appendData(next.data);
              } else {
                child = next;
              }
            }
            return true;
          }
        });
      },
      /**
       * Checks whether the DOM implementation implements a specific feature and its version.
       *
       * @deprecated
       * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
       * @param {string} feature
       * The package name of the feature to test. This is the same name that can be passed to the
       * method `hasFeature` on `DOMImplementation`.
       * @param {string} version
       * This is the version number of the package name to test.
       * @returns {boolean}
       * Returns true in all cases in the current implementation.
       * @since Introduced in DOM Level 2
       * @see {@link DOMImplementation.hasFeature}
       */
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      /**
       * Look up the prefix associated to the given namespace URI, starting from this node.
       * **The default namespace declarations are ignored by this method.**
       * See Namespace Prefix Lookup for details on the algorithm used by this method.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} namespaceURI
       * The namespace URI for which to find the associated prefix.
       * @returns {string | null}
       * The associated prefix, if found; otherwise, null.
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
       * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
       * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
       * @see https://github.com/xmldom/xmldom/issues/322
       * @prettierignore
       */
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (hasOwn(map, n) && map[n] === namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      /**
       * This function is used to look up the namespace URI associated with the given prefix,
       * starting from this node.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} prefix
       * The prefix for which to find the associated namespace URI.
       * @returns {string | null}
       * The associated namespace URI, if found; otherwise, null.
       * @since DOM Level 3
       * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
       * @prettierignore
       */
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (hasOwn(map, prefix)) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      /**
       * Determines whether the given namespace URI is the default namespace.
       *
       * The function works by looking up the prefix associated with the given namespace URI. If no
       * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
       * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
       * the default.
       *
       * **This behavior is different from the in the specs**:
       * - no node type specific handling
       * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
       *
       * @param {string | null} namespaceURI
       * The namespace URI to be checked.
       * @returns {boolean}
       * Returns true if the given namespace URI is the default namespace, false otherwise.
       * @since DOM Level 3
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
       * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
       * @prettierignore
       */
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      },
      /**
       * Compares the reference node with a node with regard to their position in the document and
       * according to the document order.
       *
       * @param {Node} other
       * The node to compare the reference node to.
       * @returns {number}
       * Returns how the node is positioned relatively to the reference node according to the
       * bitmask. 0 if reference node and given node are the same.
       * @since DOM Level 3
       * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
       * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
       */
      compareDocumentPosition: function(other) {
        if (this === other) return 0;
        var node1 = other;
        var node2 = this;
        var attr1 = null;
        var attr2 = null;
        if (node1 instanceof Attr) {
          attr1 = node1;
          node1 = attr1.ownerElement;
        }
        if (node2 instanceof Attr) {
          attr2 = node2;
          node2 = attr2.ownerElement;
          if (attr1 && node1 && node2 === node1) {
            for (var i = 0, attr; attr = node2.attributes[i]; i++) {
              if (attr === attr1)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
              if (attr === attr2)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            }
          }
        }
        if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
          return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
        }
        if (attr2 && node1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        if (attr1 && node1 === node2) {
          return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
        }
        var chain1 = [];
        var ancestor1 = node1.parentNode;
        while (ancestor1) {
          if (!attr2 && ancestor1 === node2) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          }
          chain1.push(ancestor1);
          ancestor1 = ancestor1.parentNode;
        }
        chain1.reverse();
        var chain2 = [];
        var ancestor2 = node2.parentNode;
        while (ancestor2) {
          if (!attr1 && ancestor2 === node1) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          }
          chain2.push(ancestor2);
          ancestor2 = ancestor2.parentNode;
        }
        chain2.reverse();
        var ca = commonAncestor(chain1, chain2);
        for (var n in ca.childNodes) {
          var child = ca.childNodes[n];
          if (child === node2) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          if (child === node1) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          if (chain2.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          if (chain1.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
        }
        return 0;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node5);
    copy(NodeType, Node5.prototype);
    copy(DocumentPosition, Node5);
    copy(DocumentPosition, Node5.prototype);
    function _visitNode(node, callback) {
      walkDOM(node, null, {
        enter: function(n) {
          return callback(n) ? walkDOM.STOP : true;
        }
      });
    }
    function walkDOM(node, context, callbacks) {
      var stack = [{ node, context, phase: walkDOM.ENTER }];
      while (stack.length > 0) {
        var frame = stack.pop();
        if (frame.phase === walkDOM.ENTER) {
          var childContext = callbacks.enter(frame.node, frame.context);
          if (childContext === walkDOM.STOP) {
            return walkDOM.STOP;
          }
          stack.push({ node: frame.node, context: childContext, phase: walkDOM.EXIT });
          if (childContext === null || childContext === void 0) {
            continue;
          }
          var child = frame.node.lastChild;
          while (child) {
            stack.push({ node: child, context: childContext, phase: walkDOM.ENTER });
            child = child.previousSibling;
          }
        } else {
          if (callbacks.exit) {
            callbacks.exit(frame.node, frame.context);
          }
        }
      }
    }
    walkDOM.STOP = /* @__PURE__ */ Symbol("walkDOM.STOP");
    walkDOM.ENTER = 0;
    walkDOM.EXIT = 1;
    function Document(symbol, options) {
      checkSymbol(symbol);
      var opt = options || {};
      this.ownerDocument = this;
      this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION;
      this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, parent, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var childNodes = parent.childNodes;
        if (newChild && !newChild.nextSibling) {
          childNodes[childNodes.length++] = newChild;
        } else {
          var child = parent.firstChild;
          var i = 0;
          while (child) {
            childNodes[i++] = child;
            child = child.nextSibling;
          }
          childNodes.length = i;
          delete childNodes[childNodes.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      if (parentNode !== child.parentNode) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
      }
      var oldPreviousSibling = child.previousSibling;
      var oldNextSibling = child.nextSibling;
      if (oldPreviousSibling) {
        oldPreviousSibling.nextSibling = oldNextSibling;
      } else {
        parentNode.firstChild = oldNextSibling;
      }
      if (oldNextSibling) {
        oldNextSibling.previousSibling = oldPreviousSibling;
      } else {
        parentNode.lastChild = oldPreviousSibling;
      }
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      return child;
    }
    function hasValidParentNodeType(node) {
      return node && (node.nodeType === Node5.DOCUMENT_NODE || node.nodeType === Node5.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node5.ELEMENT_NODE);
    }
    function hasInsertableNodeType(node) {
      return node && (node.nodeType === Node5.CDATA_SECTION_NODE || node.nodeType === Node5.COMMENT_NODE || node.nodeType === Node5.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node5.DOCUMENT_TYPE_NODE || node.nodeType === Node5.ELEMENT_NODE || node.nodeType === Node5.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node5.TEXT_NODE);
    }
    function isDocTypeNode(node) {
      return node && node.nodeType === Node5.DOCUMENT_TYPE_NODE;
    }
    function isElementNode(node) {
      return node && node.nodeType === Node5.ELEMENT_NODE;
    }
    function isTextNode(node) {
      return node && node.nodeType === Node5.TEXT_NODE;
    }
    function isElementInsertionPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function isElementReplacementPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      function hasElementChildThatIsNotChild(node) {
        return isElementNode(node) && node !== child;
      }
      if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function assertPreInsertionValidity1to5(parent, node, child) {
      if (!hasValidParentNodeType(parent)) {
        throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
      }
      if (child && child.parentNode !== parent) {
        throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
      }
      if (
        // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
        !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
        // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
        // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
        // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
        isDocTypeNode(node) && parent.nodeType !== Node5.DOCUMENT_NODE
      ) {
        throw new DOMException(
          DOMException.HIERARCHY_REQUEST_ERR,
          "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
        );
      }
    }
    function assertPreInsertionValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node5.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementInsertionPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (find(parentChildNodes, isDocTypeNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    function assertPreReplacementValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node5.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementReplacementPossible(parent, child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        let hasDoctypeChildThatIsNotChild = function(node2) {
          return isDocTypeNode(node2) && node2 !== child;
        };
        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
    }
    function _insertBefore(parent, node, child, _inDocumentAssertion) {
      assertPreInsertionValidity1to5(parent, node, child);
      if (parent.nodeType === Node5.DOCUMENT_NODE) {
        (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
      }
      var cp = node.parentNode;
      if (cp) {
        cp.removeChild(node);
      }
      if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = node.firstChild;
        if (newFirst == null) {
          return node;
        }
        var newLast = node.lastChild;
      } else {
        newFirst = newLast = node;
      }
      var pre = child ? child.previousSibling : parent.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = child;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parent.firstChild = newFirst;
      }
      if (child == null) {
        parent.lastChild = newLast;
      } else {
        child.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parent;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parent.ownerDocument || parent, parent, node);
      if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
        node.firstChild = node.lastChild = null;
      }
      return node;
    }
    Document.prototype = {
      /**
       * The implementation that created this document.
       *
       * @type DOMImplementation
       * @readonly
       */
      implementation: null,
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      /**
       * The DocumentType node of the document.
       *
       * @type DocumentType
       * @readonly
       */
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        _insertBefore(this, newChild, refChild);
        newChild.ownerDocument = this;
        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        var removed = _removeChild(this, oldChild);
        if (removed === this.documentElement) {
          this.documentElement = null;
        }
        return removed;
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        newChild.ownerDocument = this;
        if (oldChild) {
          this.removeChild(oldChild);
        }
        if (isElementNode(newChild)) {
          this.documentElement = newChild;
        }
      },
      /**
       * Imports a node from another document into this document, creating a new copy owned by this
       * document. The source node and its subtree are not modified.
       *
       * @param {Node} importedNode
       * The node to import.
       * @param {boolean} deep
       * If true, the contents of the node are recursively imported.
       * If false, only the node itself (and its attributes, if it is an element) are imported.
       * @returns {Node}
       * Returns the newly created import of the node.
       * @see {@link importNode}
       * @see {@link https://dom.spec.whatwg.org/#dom-document-importnode}
       */
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      // Introduced in DOM Level 2:
      getElementById: function(id2) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id2) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      /**
       * Creates a new `Element` that is owned by this `Document`.
       * In HTML Documents `localName` is the lower cased `tagName`,
       * otherwise no transformation is being applied.
       * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
       *
       * __This implementation differs from the specification:__ - The provided name is not checked
       * against the `Name` production,
       * so no related error will be thrown.
       * - There is no interface `HTMLElement`, it is always an `Element`.
       * - There is no support for a second argument to indicate using custom elements.
       *
       * @param {string} tagName
       * @returns {Element}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
       * @see https://dom.spec.whatwg.org/#dom-document-createelement
       * @see https://dom.spec.whatwg.org/#concept-create-element
       */
      createElement: function(tagName) {
        var node = new Element(PDC);
        node.ownerDocument = this;
        if (this.type === "html") {
          tagName = tagName.toLowerCase();
        }
        if (hasDefaultHTMLNamespace(this.contentType)) {
          node.namespaceURI = NAMESPACE.HTML;
        }
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      /**
       * @returns {DocumentFragment}
       */
      createDocumentFragment: function() {
        var node = new DocumentFragment(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      /**
       * @param {string} data
       * @returns {Text}
       */
      createTextNode: function(data) {
        var node = new Text(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * @param {string} data
       * @returns {Comment}
       * @see https://dom.spec.whatwg.org/#dom-document-createcomment
       * @see https://www.w3.org/TR/xml/#NT-Comment XML 1.0 production [15]
       * @see https://www.w3.org/TR/DOM-Parsing/#dfn-concept-serialize-xml §3.2.1.3
       *
       *      Note: no validation is performed at creation time. When the resulting document is
       *      serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
       *      if the comment data contains `--` anywhere, ends with `-`, or contains characters
       *      outside the XML Char production (W3C DOM Parsing §3.2.1.3). Without that option the
       *      data is emitted verbatim.
       */
      createComment: function(data) {
        var node = new Comment(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * Returns a new CDATASection node whose data is `data`.
       *
       * __This implementation differs from the specification:__ - calling this method on an HTML
       * document does not throw `NotSupportedError`.
       *
       * @param {string} data
       * @returns {CDATASection}
       * @throws {DOMException}
       * With code `INVALID_CHARACTER_ERR` if `data` contains `"]]>"`.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createCDATASection
       * @see https://dom.spec.whatwg.org/#dom-document-createcdatasection
       */
      createCDATASection: function(data) {
        if (data.indexOf("]]>") !== -1) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'data contains "]]>"');
        }
        var node = new CDATASection(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.appendData(data);
        return node;
      },
      /**
       * Returns a ProcessingInstruction node whose target is target and data is data.
       *
       * __This behavior is slightly different from the in the specs__:
       * - it does not do any input validation on the arguments and doesn't throw
       * "InvalidCharacterError".
       *
       * Note: When the resulting document is serialized with `requireWellFormed: true`, the
       * serializer throws `InvalidStateError` if `.target` contains `:` or is an ASCII
       * case-insensitive match for `"xml"`, or if `.data` contains `?>` or characters outside the
       * XML Char production (W3C DOM Parsing §3.2.1.7). Without that option the data is emitted
       * verbatim.
       *
       * @param {string} target
       * @param {string} data
       * @returns {ProcessingInstruction}
       * @see https://developer.mozilla.org/docs/Web/API/Document/createProcessingInstruction
       * @see https://dom.spec.whatwg.org/#dom-document-createprocessinginstruction
       * @see https://www.w3.org/TR/DOM-Parsing/#dfn-concept-serialize-xml §3.2.1.7
       */
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      /**
       * Creates an `Attr` node that is owned by this document.
       * In HTML Documents `localName` is the lower cased `name`,
       * otherwise no transformation is being applied.
       *
       * __This implementation differs from the specification:__ - The provided name is not checked
       * against the `Name` production,
       * so no related error will be thrown.
       *
       * @param {string} name
       * @returns {Attr}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
       * @see https://dom.spec.whatwg.org/#dom-document-createattribute
       */
      createAttribute: function(name) {
        if (!g.QName_exact.test(name)) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
        }
        if (this.type === "html") {
          name = name.toLowerCase();
        }
        return this._createAttribute(name);
      },
      _createAttribute: function(name) {
        var node = new Attr(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      /**
       * Creates an EntityReference object.
       * The current implementation does not fill the `childNodes` with those of the corresponding
       * `Entity`
       *
       * @deprecated
       * In DOM Level 4.
       * @param {string} name
       * The name of the entity to reference. No namespace well-formedness checks are performed.
       * @returns {EntityReference}
       * @throws {DOMException}
       * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
       * @throws {DOMException}
       * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
       */
      createEntityReference: function(name) {
        if (!g.Name.test(name)) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
        }
        if (this.type === "html") {
          throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
        }
        var node = new EntityReference(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = name;
        return node;
      },
      // Introduced in DOM Level 2:
      /**
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @returns {Element}
       */
      createElementNS: function(namespaceURI, qualifiedName) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var node = new Element(PDC);
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = validated[0];
        node.prefix = validated[1];
        node.localName = validated[2];
        attrs._ownerElement = node;
        return node;
      },
      // Introduced in DOM Level 2:
      /**
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @returns {Attr}
       */
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var node = new Attr(PDC);
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.specified = true;
        node.namespaceURI = validated[0];
        node.prefix = validated[1];
        node.localName = validated[2];
        return node;
      }
    };
    _extends(Document, Node5);
    function Element(symbol) {
      checkSymbol(symbol);
      this._nsMap = /* @__PURE__ */ Object.create(null);
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      /**
       * The attributes of this element.
       *
       * @type {NamedNodeMap | null}
       */
      attributes: null,
      getQualifiedName: function() {
        return this.prefix ? this.prefix + ":" + this.localName : this.localName;
      },
      _isInHTMLDocumentAndNamespace: function() {
        return this.ownerDocument.type === "html" && this.namespaceURI === NAMESPACE.HTML;
      },
      /**
       * Implementaton of Level2 Core function hasAttributes.
       *
       * @returns {boolean}
       * True if attribute list is not empty.
       * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
       */
      hasAttributes: function() {
        return !!(this.attributes && this.attributes.length);
      },
      hasAttribute: function(name) {
        return !!this.getAttributeNode(name);
      },
      /**
       * Returns element’s first attribute whose qualified name is `name`, and `null`
       * if there is no such attribute.
       *
       * @param {string} name
       * @returns {string | null}
       */
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr ? attr.value : null;
      },
      getAttributeNode: function(name) {
        if (this._isInHTMLDocumentAndNamespace()) {
          name = name.toLowerCase();
        }
        return this.attributes.getNamedItem(name);
      },
      /**
       * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
       *
       * @param {string} name
       * @param {string} value
       */
      setAttribute: function(name, value) {
        if (this._isInHTMLDocumentAndNamespace()) {
          name = name.toLowerCase();
        }
        var attr = this.getAttributeNode(name);
        if (attr) {
          attr.value = attr.nodeValue = "" + value;
        } else {
          attr = this.ownerDocument._createAttribute(name);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        }
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      //get real attribute name,and remove it by removeAttributeNode
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      /**
       * Returns element’s attribute whose namespace is `namespaceURI` and local name is
       * `localName`,
       * or `null` if there is no such attribute.
       *
       * @param {string} namespaceURI
       * @param {string} localName
       * @returns {string | null}
       */
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr ? attr.value : null;
      },
      /**
       * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
       * `localName` to value.
       *
       * @param {string} namespaceURI
       * @param {string} qualifiedName
       * @param {string} value
       * @see https://dom.spec.whatwg.org/#dom-element-setattributens
       */
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var validated = validateAndExtract(namespaceURI, qualifiedName);
        var localName = validated[2];
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        if (attr) {
          attr.value = attr.nodeValue = "" + value;
        } else {
          attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
          attr.value = attr.nodeValue = "" + value;
          this.setAttributeNode(attr);
        }
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      /**
       * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
       *
       * Returns an empty list if `classNames` is an empty string or only contains HTML white space
       * characters.
       *
       * Warning: This returns a live LiveNodeList.
       * Changes in the DOM will reflect in the array as the changes occur.
       * If an element selected by this array no longer qualifies for the selector,
       * it will automatically be removed. Be aware of this for iteration purposes.
       *
       * @param {string} classNames
       * Is a string representing the class name(s) to match; multiple class names are separated by
       * (ASCII-)whitespace.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
       */
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      /**
       * Returns a LiveNodeList of elements with the given qualifiedName.
       * Searching for all descendants can be done by passing `*` as `qualifiedName`.
       *
       * All descendants of the specified element are searched, but not the element itself.
       * The returned list is live, which means it updates itself with the DOM tree automatically.
       * Therefore, there is no need to call `Element.getElementsByTagName()`
       * with the same element and arguments repeatedly if the DOM changes in between calls.
       *
       * When called on an HTML element in an HTML document,
       * `getElementsByTagName` lower-cases the argument before searching for it.
       * This is undesirable when trying to match camel-cased SVG elements (such as
       * `<linearGradient>`) in an HTML document.
       * Instead, use `Element.getElementsByTagNameNS()`,
       * which preserves the capitalization of the tag name.
       *
       * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
       * except that it only searches for elements that are descendants of the specified element.
       *
       * @param {string} qualifiedName
       * @returns {LiveNodeList}
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
       */
      getElementsByTagName: function(qualifiedName) {
        var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html";
        var lowerQualifiedName = qualifiedName.toLowerCase();
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node === base || node.nodeType !== ELEMENT_NODE) {
              return;
            }
            if (qualifiedName === "*") {
              ls.push(node);
            } else {
              var nodeQualifiedName = node.getQualifiedName();
              var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
              if (nodeQualifiedName === matchingQName) {
                ls.push(node);
              }
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node5);
    function Attr(symbol) {
      checkSymbol(symbol);
      this.namespaceURI = null;
      this.prefix = null;
      this.ownerElement = null;
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node5);
    function CharacterData(symbol) {
      checkSymbol(symbol);
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node5);
    function Text(symbol) {
      checkSymbol(symbol);
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment(symbol) {
      checkSymbol(symbol);
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection(symbol) {
      checkSymbol(symbol);
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, Text);
    function DocumentType(symbol) {
      checkSymbol(symbol);
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node5);
    function Notation(symbol) {
      checkSymbol(symbol);
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node5);
    function Entity(symbol) {
      checkSymbol(symbol);
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node5);
    function EntityReference(symbol) {
      checkSymbol(symbol);
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node5);
    function DocumentFragment(symbol) {
      checkSymbol(symbol);
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node5);
    function ProcessingInstruction(symbol) {
      checkSymbol(symbol);
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, CharacterData);
    function XMLSerializer3() {
    }
    XMLSerializer3.prototype.serializeToString = function(node, options) {
      return nodeSerializeToString.call(node, options);
    };
    Node5.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(options) {
      var opts;
      if (typeof options === "function") {
        opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
      } else if (options != null) {
        opts = {
          requireWellFormed: !!options.requireWellFormed,
          splitCDATASections: options.splitCDATASections !== false,
          nodeFilter: options.nodeFilter || null
        };
      } else {
        opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
      }
      var buf = [];
      var refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
            //{namespace:uri,prefix:''}
          ];
        }
      }
      serializeToString(this, buf, visibleNamespaces, opts);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, visibleNamespaces, opts) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      var nodeFilter = opts.nodeFilter;
      var requireWellFormed = opts.requireWellFormed;
      var splitCDATASections = opts.splitCDATASections;
      var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
      var isHTML = doc.type === "html";
      walkDOM(
        node,
        { ns: visibleNamespaces },
        {
          enter: function(n, ctx) {
            var namespaces = ctx.ns;
            if (nodeFilter) {
              n = nodeFilter(n);
              if (n) {
                if (typeof n == "string") {
                  buf.push(n);
                  return null;
                }
              } else {
                return null;
              }
            }
            switch (n.nodeType) {
              case ELEMENT_NODE:
                var attrs = n.attributes;
                var len = attrs.length;
                var nodeName = n.tagName;
                var prefixedNodeName = nodeName;
                if (!isHTML && !n.prefix && n.namespaceURI) {
                  var defaultNS;
                  for (var ai = 0; ai < attrs.length; ai++) {
                    if (attrs.item(ai).name === "xmlns") {
                      defaultNS = attrs.item(ai).value;
                      break;
                    }
                  }
                  if (!defaultNS) {
                    for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                      var nsEntry = namespaces[nsi];
                      if (nsEntry.prefix === "" && nsEntry.namespace === n.namespaceURI) {
                        defaultNS = nsEntry.namespace;
                        break;
                      }
                    }
                  }
                  if (defaultNS !== n.namespaceURI) {
                    for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                      var nsEntry = namespaces[nsi];
                      if (nsEntry.namespace === n.namespaceURI) {
                        if (nsEntry.prefix) {
                          prefixedNodeName = nsEntry.prefix + ":" + nodeName;
                        }
                        break;
                      }
                    }
                  }
                }
                buf.push("<", prefixedNodeName);
                var childNamespaces = namespaces.slice();
                for (var i = 0; i < len; i++) {
                  var attr = attrs.item(i);
                  if (attr.prefix == "xmlns") {
                    childNamespaces.push({
                      prefix: attr.localName,
                      namespace: attr.value
                    });
                  } else if (attr.nodeName == "xmlns") {
                    childNamespaces.push({ prefix: "", namespace: attr.value });
                  }
                }
                for (var i = 0; i < len; i++) {
                  var attr = attrs.item(i);
                  if (needNamespaceDefine(attr, isHTML, childNamespaces)) {
                    var attrPrefix = attr.prefix || "";
                    var uri = attr.namespaceURI;
                    addSerializedAttribute(buf, attrPrefix ? "xmlns:" + attrPrefix : "xmlns", uri);
                    childNamespaces.push({ prefix: attrPrefix, namespace: uri });
                  }
                  var filteredAttr = nodeFilter ? nodeFilter(attr) : attr;
                  if (filteredAttr) {
                    if (typeof filteredAttr === "string") {
                      buf.push(filteredAttr);
                    } else {
                      addSerializedAttribute(buf, filteredAttr.name, filteredAttr.value);
                    }
                  }
                }
                if (nodeName === prefixedNodeName && needNamespaceDefine(n, isHTML, childNamespaces)) {
                  var nodePrefix = n.prefix || "";
                  var uri = n.namespaceURI;
                  addSerializedAttribute(buf, nodePrefix ? "xmlns:" + nodePrefix : "xmlns", uri);
                  childNamespaces.push({ prefix: nodePrefix, namespace: uri });
                }
                var canCloseTag = !n.firstChild;
                if (canCloseTag && (isHTML || n.namespaceURI === NAMESPACE.HTML)) {
                  canCloseTag = isHTMLVoidElement(nodeName);
                }
                if (canCloseTag) {
                  buf.push("/>");
                  return null;
                }
                buf.push(">");
                if (isHTML && isHTMLRawTextElement(nodeName)) {
                  var child = n.firstChild;
                  while (child) {
                    if (child.data) {
                      buf.push(child.data);
                    } else {
                      serializeToString(child, buf, childNamespaces.slice(), opts);
                    }
                    child = child.nextSibling;
                  }
                  buf.push("</", prefixedNodeName, ">");
                  return null;
                }
                return { ns: childNamespaces, tag: prefixedNodeName };
              case DOCUMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                if (requireWellFormed && n.nodeType === DOCUMENT_NODE && n.documentElement == null) {
                  throw new DOMException("The Document has no documentElement", DOMExceptionName.InvalidStateError);
                }
                return { ns: namespaces };
              case ATTRIBUTE_NODE:
                addSerializedAttribute(buf, n.name, n.value);
                return null;
              case TEXT_NODE:
                if (requireWellFormed && g.InvalidChar.test(n.data)) {
                  throw new DOMException(
                    "The Text node data contains characters outside the XML Char production",
                    DOMExceptionName.InvalidStateError
                  );
                }
                buf.push(n.data.replace(/[<&>]/g, _xmlEncoder));
                return null;
              case CDATA_SECTION_NODE:
                if (requireWellFormed && n.data.indexOf("]]>") !== -1) {
                  throw new DOMException('The CDATASection data contains "]]>"', DOMExceptionName.InvalidStateError);
                }
                if (splitCDATASections) {
                  buf.push(g.CDATA_START, n.data.replace(/]]>/g, "]]]]><![CDATA[>"), g.CDATA_END);
                } else {
                  buf.push(g.CDATA_START, n.data, g.CDATA_END);
                }
                return null;
              case COMMENT_NODE:
                if (requireWellFormed) {
                  if (g.InvalidChar.test(n.data)) {
                    throw new DOMException(
                      "The comment node data contains characters outside the XML Char production",
                      DOMExceptionName.InvalidStateError
                    );
                  }
                  if (n.data.indexOf("--") !== -1 || n.data[n.data.length - 1] === "-") {
                    throw new DOMException(
                      'The comment node data contains "--" or ends with "-"',
                      DOMExceptionName.InvalidStateError
                    );
                  }
                }
                buf.push(g.COMMENT_START, n.data, g.COMMENT_END);
                return null;
              case DOCUMENT_TYPE_NODE:
                var pubid = n.publicId;
                var sysid = n.systemId;
                if (requireWellFormed) {
                  if (pubid && !g.PubidLiteral_match.test(pubid)) {
                    throw new DOMException("DocumentType publicId is not a valid PubidLiteral", DOMExceptionName.InvalidStateError);
                  }
                  if (sysid && sysid !== "." && !g.SystemLiteral_match.test(sysid)) {
                    throw new DOMException("DocumentType systemId is not a valid SystemLiteral", DOMExceptionName.InvalidStateError);
                  }
                  if (n.internalSubset && n.internalSubset.indexOf("]>") !== -1) {
                    throw new DOMException('DocumentType internalSubset contains "]>"', DOMExceptionName.InvalidStateError);
                  }
                }
                buf.push(g.DOCTYPE_DECL_START, " ", n.name);
                if (pubid) {
                  buf.push(" ", g.PUBLIC, " ", pubid);
                  if (sysid && sysid !== ".") {
                    buf.push(" ", sysid);
                  }
                } else if (sysid && sysid !== ".") {
                  buf.push(" ", g.SYSTEM, " ", sysid);
                }
                if (n.internalSubset) {
                  buf.push(" [", n.internalSubset, "]");
                }
                buf.push(">");
                return null;
              case PROCESSING_INSTRUCTION_NODE:
                if (requireWellFormed) {
                  if (n.target.indexOf(":") !== -1 || n.target.toLowerCase() === "xml") {
                    throw new DOMException("The ProcessingInstruction target is not well-formed", DOMExceptionName.InvalidStateError);
                  }
                  if (g.InvalidChar.test(n.data)) {
                    throw new DOMException(
                      "The ProcessingInstruction data contains characters outside the XML Char production",
                      DOMExceptionName.InvalidStateError
                    );
                  }
                  if (n.data.indexOf("?>") !== -1) {
                    throw new DOMException('The ProcessingInstruction data contains "?>"', DOMExceptionName.InvalidStateError);
                  }
                }
                buf.push("<?", n.target, " ", n.data, "?>");
                return null;
              case ENTITY_REFERENCE_NODE:
                buf.push("&", n.nodeName, ";");
                return null;
              //case ENTITY_NODE:
              //case NOTATION_NODE:
              default:
                buf.push("??", n.nodeName);
                return null;
            }
          },
          exit: function(n, childCtx) {
            if (childCtx && childCtx.tag) {
              buf.push("</", childCtx.tag, ">");
            }
          }
        }
      );
    }
    function importNode(doc, node, deep) {
      var destRoot;
      walkDOM(node, null, {
        enter: function(srcNode, destParent) {
          var destNode = srcNode.cloneNode(false);
          destNode.ownerDocument = doc;
          destNode.parentNode = null;
          if (destParent === null) {
            destRoot = destNode;
          } else {
            destParent.appendChild(destNode);
          }
          var shouldDeep = srcNode.nodeType === ATTRIBUTE_NODE || deep;
          return shouldDeep ? destNode : null;
        }
      });
      return destRoot;
    }
    function cloneNode(doc, node, deep) {
      var destRoot;
      walkDOM(node, null, {
        enter: function(srcNode, destParent) {
          var destNode = new srcNode.constructor(PDC);
          for (var n in srcNode) {
            if (hasOwn(srcNode, n)) {
              var v = srcNode[n];
              if (typeof v != "object") {
                if (v != destNode[n]) {
                  destNode[n] = v;
                }
              }
            }
          }
          if (srcNode.childNodes) {
            destNode.childNodes = new NodeList();
          }
          destNode.ownerDocument = doc;
          var shouldDeep = deep;
          switch (destNode.nodeType) {
            case ELEMENT_NODE:
              var attrs = srcNode.attributes;
              var attrs2 = destNode.attributes = new NamedNodeMap();
              var len = attrs.length;
              attrs2._ownerElement = destNode;
              for (var i = 0; i < len; i++) {
                destNode.setAttributeNode(cloneNode(doc, attrs.item(i), true));
              }
              break;
            case ATTRIBUTE_NODE:
              shouldDeep = true;
          }
          if (destParent !== null) {
            destParent.appendChild(destNode);
          } else {
            destRoot = destNode;
          }
          return shouldDeep ? destNode : null;
        }
      });
      return destRoot;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    function childrenRefresh(node) {
      var ls = [];
      var child = node.firstChild;
      while (child) {
        if (child.nodeType === ELEMENT_NODE) {
          ls.push(child);
        }
        child = child.nextSibling;
      }
      return ls;
    }
    try {
      if (Object.defineProperty) {
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node5.prototype, "textContent", {
          get: function() {
            if (this.nodeType === ELEMENT_NODE || this.nodeType === DOCUMENT_FRAGMENT_NODE) {
              var buf = [];
              walkDOM(this, null, {
                enter: function(n) {
                  if (n.nodeType === ELEMENT_NODE || n.nodeType === DOCUMENT_FRAGMENT_NODE) {
                    return true;
                  }
                  if (n.nodeType === PROCESSING_INSTRUCTION_NODE || n.nodeType === COMMENT_NODE) {
                    return null;
                  }
                  buf.push(n.nodeValue);
                }
              });
              return buf.join("");
            }
            return this.nodeValue;
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        Object.defineProperty(Element.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        });
        Object.defineProperty(Document.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        });
        Object.defineProperty(DocumentFragment.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    exports._updateLiveList = _updateLiveList;
    exports.Attr = Attr;
    exports.CDATASection = CDATASection;
    exports.CharacterData = CharacterData;
    exports.Comment = Comment;
    exports.Document = Document;
    exports.DocumentFragment = DocumentFragment;
    exports.DocumentType = DocumentType;
    exports.DOMImplementation = DOMImplementation;
    exports.Element = Element;
    exports.Entity = Entity;
    exports.EntityReference = EntityReference;
    exports.LiveNodeList = LiveNodeList;
    exports.NamedNodeMap = NamedNodeMap;
    exports.Node = Node5;
    exports.NodeList = NodeList;
    exports.Notation = Notation;
    exports.Text = Text;
    exports.ProcessingInstruction = ProcessingInstruction;
    exports.walkDOM = walkDOM;
    exports.XMLSerializer = XMLSerializer3;
  }
});

// node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
    "use strict";
    var freeze = require_conventions().freeze;
    exports.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports.HTML_ENTITIES = freeze({
      Aacute: "\xC1",
      aacute: "\xE1",
      Abreve: "\u0102",
      abreve: "\u0103",
      ac: "\u223E",
      acd: "\u223F",
      acE: "\u223E\u0333",
      Acirc: "\xC2",
      acirc: "\xE2",
      acute: "\xB4",
      Acy: "\u0410",
      acy: "\u0430",
      AElig: "\xC6",
      aelig: "\xE6",
      af: "\u2061",
      Afr: "\u{1D504}",
      afr: "\u{1D51E}",
      Agrave: "\xC0",
      agrave: "\xE0",
      alefsym: "\u2135",
      aleph: "\u2135",
      Alpha: "\u0391",
      alpha: "\u03B1",
      Amacr: "\u0100",
      amacr: "\u0101",
      amalg: "\u2A3F",
      AMP: "&",
      amp: "&",
      And: "\u2A53",
      and: "\u2227",
      andand: "\u2A55",
      andd: "\u2A5C",
      andslope: "\u2A58",
      andv: "\u2A5A",
      ang: "\u2220",
      ange: "\u29A4",
      angle: "\u2220",
      angmsd: "\u2221",
      angmsdaa: "\u29A8",
      angmsdab: "\u29A9",
      angmsdac: "\u29AA",
      angmsdad: "\u29AB",
      angmsdae: "\u29AC",
      angmsdaf: "\u29AD",
      angmsdag: "\u29AE",
      angmsdah: "\u29AF",
      angrt: "\u221F",
      angrtvb: "\u22BE",
      angrtvbd: "\u299D",
      angsph: "\u2222",
      angst: "\xC5",
      angzarr: "\u237C",
      Aogon: "\u0104",
      aogon: "\u0105",
      Aopf: "\u{1D538}",
      aopf: "\u{1D552}",
      ap: "\u2248",
      apacir: "\u2A6F",
      apE: "\u2A70",
      ape: "\u224A",
      apid: "\u224B",
      apos: "'",
      ApplyFunction: "\u2061",
      approx: "\u2248",
      approxeq: "\u224A",
      Aring: "\xC5",
      aring: "\xE5",
      Ascr: "\u{1D49C}",
      ascr: "\u{1D4B6}",
      Assign: "\u2254",
      ast: "*",
      asymp: "\u2248",
      asympeq: "\u224D",
      Atilde: "\xC3",
      atilde: "\xE3",
      Auml: "\xC4",
      auml: "\xE4",
      awconint: "\u2233",
      awint: "\u2A11",
      backcong: "\u224C",
      backepsilon: "\u03F6",
      backprime: "\u2035",
      backsim: "\u223D",
      backsimeq: "\u22CD",
      Backslash: "\u2216",
      Barv: "\u2AE7",
      barvee: "\u22BD",
      Barwed: "\u2306",
      barwed: "\u2305",
      barwedge: "\u2305",
      bbrk: "\u23B5",
      bbrktbrk: "\u23B6",
      bcong: "\u224C",
      Bcy: "\u0411",
      bcy: "\u0431",
      bdquo: "\u201E",
      becaus: "\u2235",
      Because: "\u2235",
      because: "\u2235",
      bemptyv: "\u29B0",
      bepsi: "\u03F6",
      bernou: "\u212C",
      Bernoullis: "\u212C",
      Beta: "\u0392",
      beta: "\u03B2",
      beth: "\u2136",
      between: "\u226C",
      Bfr: "\u{1D505}",
      bfr: "\u{1D51F}",
      bigcap: "\u22C2",
      bigcirc: "\u25EF",
      bigcup: "\u22C3",
      bigodot: "\u2A00",
      bigoplus: "\u2A01",
      bigotimes: "\u2A02",
      bigsqcup: "\u2A06",
      bigstar: "\u2605",
      bigtriangledown: "\u25BD",
      bigtriangleup: "\u25B3",
      biguplus: "\u2A04",
      bigvee: "\u22C1",
      bigwedge: "\u22C0",
      bkarow: "\u290D",
      blacklozenge: "\u29EB",
      blacksquare: "\u25AA",
      blacktriangle: "\u25B4",
      blacktriangledown: "\u25BE",
      blacktriangleleft: "\u25C2",
      blacktriangleright: "\u25B8",
      blank: "\u2423",
      blk12: "\u2592",
      blk14: "\u2591",
      blk34: "\u2593",
      block: "\u2588",
      bne: "=\u20E5",
      bnequiv: "\u2261\u20E5",
      bNot: "\u2AED",
      bnot: "\u2310",
      Bopf: "\u{1D539}",
      bopf: "\u{1D553}",
      bot: "\u22A5",
      bottom: "\u22A5",
      bowtie: "\u22C8",
      boxbox: "\u29C9",
      boxDL: "\u2557",
      boxDl: "\u2556",
      boxdL: "\u2555",
      boxdl: "\u2510",
      boxDR: "\u2554",
      boxDr: "\u2553",
      boxdR: "\u2552",
      boxdr: "\u250C",
      boxH: "\u2550",
      boxh: "\u2500",
      boxHD: "\u2566",
      boxHd: "\u2564",
      boxhD: "\u2565",
      boxhd: "\u252C",
      boxHU: "\u2569",
      boxHu: "\u2567",
      boxhU: "\u2568",
      boxhu: "\u2534",
      boxminus: "\u229F",
      boxplus: "\u229E",
      boxtimes: "\u22A0",
      boxUL: "\u255D",
      boxUl: "\u255C",
      boxuL: "\u255B",
      boxul: "\u2518",
      boxUR: "\u255A",
      boxUr: "\u2559",
      boxuR: "\u2558",
      boxur: "\u2514",
      boxV: "\u2551",
      boxv: "\u2502",
      boxVH: "\u256C",
      boxVh: "\u256B",
      boxvH: "\u256A",
      boxvh: "\u253C",
      boxVL: "\u2563",
      boxVl: "\u2562",
      boxvL: "\u2561",
      boxvl: "\u2524",
      boxVR: "\u2560",
      boxVr: "\u255F",
      boxvR: "\u255E",
      boxvr: "\u251C",
      bprime: "\u2035",
      Breve: "\u02D8",
      breve: "\u02D8",
      brvbar: "\xA6",
      Bscr: "\u212C",
      bscr: "\u{1D4B7}",
      bsemi: "\u204F",
      bsim: "\u223D",
      bsime: "\u22CD",
      bsol: "\\",
      bsolb: "\u29C5",
      bsolhsub: "\u27C8",
      bull: "\u2022",
      bullet: "\u2022",
      bump: "\u224E",
      bumpE: "\u2AAE",
      bumpe: "\u224F",
      Bumpeq: "\u224E",
      bumpeq: "\u224F",
      Cacute: "\u0106",
      cacute: "\u0107",
      Cap: "\u22D2",
      cap: "\u2229",
      capand: "\u2A44",
      capbrcup: "\u2A49",
      capcap: "\u2A4B",
      capcup: "\u2A47",
      capdot: "\u2A40",
      CapitalDifferentialD: "\u2145",
      caps: "\u2229\uFE00",
      caret: "\u2041",
      caron: "\u02C7",
      Cayleys: "\u212D",
      ccaps: "\u2A4D",
      Ccaron: "\u010C",
      ccaron: "\u010D",
      Ccedil: "\xC7",
      ccedil: "\xE7",
      Ccirc: "\u0108",
      ccirc: "\u0109",
      Cconint: "\u2230",
      ccups: "\u2A4C",
      ccupssm: "\u2A50",
      Cdot: "\u010A",
      cdot: "\u010B",
      cedil: "\xB8",
      Cedilla: "\xB8",
      cemptyv: "\u29B2",
      cent: "\xA2",
      CenterDot: "\xB7",
      centerdot: "\xB7",
      Cfr: "\u212D",
      cfr: "\u{1D520}",
      CHcy: "\u0427",
      chcy: "\u0447",
      check: "\u2713",
      checkmark: "\u2713",
      Chi: "\u03A7",
      chi: "\u03C7",
      cir: "\u25CB",
      circ: "\u02C6",
      circeq: "\u2257",
      circlearrowleft: "\u21BA",
      circlearrowright: "\u21BB",
      circledast: "\u229B",
      circledcirc: "\u229A",
      circleddash: "\u229D",
      CircleDot: "\u2299",
      circledR: "\xAE",
      circledS: "\u24C8",
      CircleMinus: "\u2296",
      CirclePlus: "\u2295",
      CircleTimes: "\u2297",
      cirE: "\u29C3",
      cire: "\u2257",
      cirfnint: "\u2A10",
      cirmid: "\u2AEF",
      cirscir: "\u29C2",
      ClockwiseContourIntegral: "\u2232",
      CloseCurlyDoubleQuote: "\u201D",
      CloseCurlyQuote: "\u2019",
      clubs: "\u2663",
      clubsuit: "\u2663",
      Colon: "\u2237",
      colon: ":",
      Colone: "\u2A74",
      colone: "\u2254",
      coloneq: "\u2254",
      comma: ",",
      commat: "@",
      comp: "\u2201",
      compfn: "\u2218",
      complement: "\u2201",
      complexes: "\u2102",
      cong: "\u2245",
      congdot: "\u2A6D",
      Congruent: "\u2261",
      Conint: "\u222F",
      conint: "\u222E",
      ContourIntegral: "\u222E",
      Copf: "\u2102",
      copf: "\u{1D554}",
      coprod: "\u2210",
      Coproduct: "\u2210",
      COPY: "\xA9",
      copy: "\xA9",
      copysr: "\u2117",
      CounterClockwiseContourIntegral: "\u2233",
      crarr: "\u21B5",
      Cross: "\u2A2F",
      cross: "\u2717",
      Cscr: "\u{1D49E}",
      cscr: "\u{1D4B8}",
      csub: "\u2ACF",
      csube: "\u2AD1",
      csup: "\u2AD0",
      csupe: "\u2AD2",
      ctdot: "\u22EF",
      cudarrl: "\u2938",
      cudarrr: "\u2935",
      cuepr: "\u22DE",
      cuesc: "\u22DF",
      cularr: "\u21B6",
      cularrp: "\u293D",
      Cup: "\u22D3",
      cup: "\u222A",
      cupbrcap: "\u2A48",
      CupCap: "\u224D",
      cupcap: "\u2A46",
      cupcup: "\u2A4A",
      cupdot: "\u228D",
      cupor: "\u2A45",
      cups: "\u222A\uFE00",
      curarr: "\u21B7",
      curarrm: "\u293C",
      curlyeqprec: "\u22DE",
      curlyeqsucc: "\u22DF",
      curlyvee: "\u22CE",
      curlywedge: "\u22CF",
      curren: "\xA4",
      curvearrowleft: "\u21B6",
      curvearrowright: "\u21B7",
      cuvee: "\u22CE",
      cuwed: "\u22CF",
      cwconint: "\u2232",
      cwint: "\u2231",
      cylcty: "\u232D",
      Dagger: "\u2021",
      dagger: "\u2020",
      daleth: "\u2138",
      Darr: "\u21A1",
      dArr: "\u21D3",
      darr: "\u2193",
      dash: "\u2010",
      Dashv: "\u2AE4",
      dashv: "\u22A3",
      dbkarow: "\u290F",
      dblac: "\u02DD",
      Dcaron: "\u010E",
      dcaron: "\u010F",
      Dcy: "\u0414",
      dcy: "\u0434",
      DD: "\u2145",
      dd: "\u2146",
      ddagger: "\u2021",
      ddarr: "\u21CA",
      DDotrahd: "\u2911",
      ddotseq: "\u2A77",
      deg: "\xB0",
      Del: "\u2207",
      Delta: "\u0394",
      delta: "\u03B4",
      demptyv: "\u29B1",
      dfisht: "\u297F",
      Dfr: "\u{1D507}",
      dfr: "\u{1D521}",
      dHar: "\u2965",
      dharl: "\u21C3",
      dharr: "\u21C2",
      DiacriticalAcute: "\xB4",
      DiacriticalDot: "\u02D9",
      DiacriticalDoubleAcute: "\u02DD",
      DiacriticalGrave: "`",
      DiacriticalTilde: "\u02DC",
      diam: "\u22C4",
      Diamond: "\u22C4",
      diamond: "\u22C4",
      diamondsuit: "\u2666",
      diams: "\u2666",
      die: "\xA8",
      DifferentialD: "\u2146",
      digamma: "\u03DD",
      disin: "\u22F2",
      div: "\xF7",
      divide: "\xF7",
      divideontimes: "\u22C7",
      divonx: "\u22C7",
      DJcy: "\u0402",
      djcy: "\u0452",
      dlcorn: "\u231E",
      dlcrop: "\u230D",
      dollar: "$",
      Dopf: "\u{1D53B}",
      dopf: "\u{1D555}",
      Dot: "\xA8",
      dot: "\u02D9",
      DotDot: "\u20DC",
      doteq: "\u2250",
      doteqdot: "\u2251",
      DotEqual: "\u2250",
      dotminus: "\u2238",
      dotplus: "\u2214",
      dotsquare: "\u22A1",
      doublebarwedge: "\u2306",
      DoubleContourIntegral: "\u222F",
      DoubleDot: "\xA8",
      DoubleDownArrow: "\u21D3",
      DoubleLeftArrow: "\u21D0",
      DoubleLeftRightArrow: "\u21D4",
      DoubleLeftTee: "\u2AE4",
      DoubleLongLeftArrow: "\u27F8",
      DoubleLongLeftRightArrow: "\u27FA",
      DoubleLongRightArrow: "\u27F9",
      DoubleRightArrow: "\u21D2",
      DoubleRightTee: "\u22A8",
      DoubleUpArrow: "\u21D1",
      DoubleUpDownArrow: "\u21D5",
      DoubleVerticalBar: "\u2225",
      DownArrow: "\u2193",
      Downarrow: "\u21D3",
      downarrow: "\u2193",
      DownArrowBar: "\u2913",
      DownArrowUpArrow: "\u21F5",
      DownBreve: "\u0311",
      downdownarrows: "\u21CA",
      downharpoonleft: "\u21C3",
      downharpoonright: "\u21C2",
      DownLeftRightVector: "\u2950",
      DownLeftTeeVector: "\u295E",
      DownLeftVector: "\u21BD",
      DownLeftVectorBar: "\u2956",
      DownRightTeeVector: "\u295F",
      DownRightVector: "\u21C1",
      DownRightVectorBar: "\u2957",
      DownTee: "\u22A4",
      DownTeeArrow: "\u21A7",
      drbkarow: "\u2910",
      drcorn: "\u231F",
      drcrop: "\u230C",
      Dscr: "\u{1D49F}",
      dscr: "\u{1D4B9}",
      DScy: "\u0405",
      dscy: "\u0455",
      dsol: "\u29F6",
      Dstrok: "\u0110",
      dstrok: "\u0111",
      dtdot: "\u22F1",
      dtri: "\u25BF",
      dtrif: "\u25BE",
      duarr: "\u21F5",
      duhar: "\u296F",
      dwangle: "\u29A6",
      DZcy: "\u040F",
      dzcy: "\u045F",
      dzigrarr: "\u27FF",
      Eacute: "\xC9",
      eacute: "\xE9",
      easter: "\u2A6E",
      Ecaron: "\u011A",
      ecaron: "\u011B",
      ecir: "\u2256",
      Ecirc: "\xCA",
      ecirc: "\xEA",
      ecolon: "\u2255",
      Ecy: "\u042D",
      ecy: "\u044D",
      eDDot: "\u2A77",
      Edot: "\u0116",
      eDot: "\u2251",
      edot: "\u0117",
      ee: "\u2147",
      efDot: "\u2252",
      Efr: "\u{1D508}",
      efr: "\u{1D522}",
      eg: "\u2A9A",
      Egrave: "\xC8",
      egrave: "\xE8",
      egs: "\u2A96",
      egsdot: "\u2A98",
      el: "\u2A99",
      Element: "\u2208",
      elinters: "\u23E7",
      ell: "\u2113",
      els: "\u2A95",
      elsdot: "\u2A97",
      Emacr: "\u0112",
      emacr: "\u0113",
      empty: "\u2205",
      emptyset: "\u2205",
      EmptySmallSquare: "\u25FB",
      emptyv: "\u2205",
      EmptyVerySmallSquare: "\u25AB",
      emsp: "\u2003",
      emsp13: "\u2004",
      emsp14: "\u2005",
      ENG: "\u014A",
      eng: "\u014B",
      ensp: "\u2002",
      Eogon: "\u0118",
      eogon: "\u0119",
      Eopf: "\u{1D53C}",
      eopf: "\u{1D556}",
      epar: "\u22D5",
      eparsl: "\u29E3",
      eplus: "\u2A71",
      epsi: "\u03B5",
      Epsilon: "\u0395",
      epsilon: "\u03B5",
      epsiv: "\u03F5",
      eqcirc: "\u2256",
      eqcolon: "\u2255",
      eqsim: "\u2242",
      eqslantgtr: "\u2A96",
      eqslantless: "\u2A95",
      Equal: "\u2A75",
      equals: "=",
      EqualTilde: "\u2242",
      equest: "\u225F",
      Equilibrium: "\u21CC",
      equiv: "\u2261",
      equivDD: "\u2A78",
      eqvparsl: "\u29E5",
      erarr: "\u2971",
      erDot: "\u2253",
      Escr: "\u2130",
      escr: "\u212F",
      esdot: "\u2250",
      Esim: "\u2A73",
      esim: "\u2242",
      Eta: "\u0397",
      eta: "\u03B7",
      ETH: "\xD0",
      eth: "\xF0",
      Euml: "\xCB",
      euml: "\xEB",
      euro: "\u20AC",
      excl: "!",
      exist: "\u2203",
      Exists: "\u2203",
      expectation: "\u2130",
      ExponentialE: "\u2147",
      exponentiale: "\u2147",
      fallingdotseq: "\u2252",
      Fcy: "\u0424",
      fcy: "\u0444",
      female: "\u2640",
      ffilig: "\uFB03",
      fflig: "\uFB00",
      ffllig: "\uFB04",
      Ffr: "\u{1D509}",
      ffr: "\u{1D523}",
      filig: "\uFB01",
      FilledSmallSquare: "\u25FC",
      FilledVerySmallSquare: "\u25AA",
      fjlig: "fj",
      flat: "\u266D",
      fllig: "\uFB02",
      fltns: "\u25B1",
      fnof: "\u0192",
      Fopf: "\u{1D53D}",
      fopf: "\u{1D557}",
      ForAll: "\u2200",
      forall: "\u2200",
      fork: "\u22D4",
      forkv: "\u2AD9",
      Fouriertrf: "\u2131",
      fpartint: "\u2A0D",
      frac12: "\xBD",
      frac13: "\u2153",
      frac14: "\xBC",
      frac15: "\u2155",
      frac16: "\u2159",
      frac18: "\u215B",
      frac23: "\u2154",
      frac25: "\u2156",
      frac34: "\xBE",
      frac35: "\u2157",
      frac38: "\u215C",
      frac45: "\u2158",
      frac56: "\u215A",
      frac58: "\u215D",
      frac78: "\u215E",
      frasl: "\u2044",
      frown: "\u2322",
      Fscr: "\u2131",
      fscr: "\u{1D4BB}",
      gacute: "\u01F5",
      Gamma: "\u0393",
      gamma: "\u03B3",
      Gammad: "\u03DC",
      gammad: "\u03DD",
      gap: "\u2A86",
      Gbreve: "\u011E",
      gbreve: "\u011F",
      Gcedil: "\u0122",
      Gcirc: "\u011C",
      gcirc: "\u011D",
      Gcy: "\u0413",
      gcy: "\u0433",
      Gdot: "\u0120",
      gdot: "\u0121",
      gE: "\u2267",
      ge: "\u2265",
      gEl: "\u2A8C",
      gel: "\u22DB",
      geq: "\u2265",
      geqq: "\u2267",
      geqslant: "\u2A7E",
      ges: "\u2A7E",
      gescc: "\u2AA9",
      gesdot: "\u2A80",
      gesdoto: "\u2A82",
      gesdotol: "\u2A84",
      gesl: "\u22DB\uFE00",
      gesles: "\u2A94",
      Gfr: "\u{1D50A}",
      gfr: "\u{1D524}",
      Gg: "\u22D9",
      gg: "\u226B",
      ggg: "\u22D9",
      gimel: "\u2137",
      GJcy: "\u0403",
      gjcy: "\u0453",
      gl: "\u2277",
      gla: "\u2AA5",
      glE: "\u2A92",
      glj: "\u2AA4",
      gnap: "\u2A8A",
      gnapprox: "\u2A8A",
      gnE: "\u2269",
      gne: "\u2A88",
      gneq: "\u2A88",
      gneqq: "\u2269",
      gnsim: "\u22E7",
      Gopf: "\u{1D53E}",
      gopf: "\u{1D558}",
      grave: "`",
      GreaterEqual: "\u2265",
      GreaterEqualLess: "\u22DB",
      GreaterFullEqual: "\u2267",
      GreaterGreater: "\u2AA2",
      GreaterLess: "\u2277",
      GreaterSlantEqual: "\u2A7E",
      GreaterTilde: "\u2273",
      Gscr: "\u{1D4A2}",
      gscr: "\u210A",
      gsim: "\u2273",
      gsime: "\u2A8E",
      gsiml: "\u2A90",
      Gt: "\u226B",
      GT: ">",
      gt: ">",
      gtcc: "\u2AA7",
      gtcir: "\u2A7A",
      gtdot: "\u22D7",
      gtlPar: "\u2995",
      gtquest: "\u2A7C",
      gtrapprox: "\u2A86",
      gtrarr: "\u2978",
      gtrdot: "\u22D7",
      gtreqless: "\u22DB",
      gtreqqless: "\u2A8C",
      gtrless: "\u2277",
      gtrsim: "\u2273",
      gvertneqq: "\u2269\uFE00",
      gvnE: "\u2269\uFE00",
      Hacek: "\u02C7",
      hairsp: "\u200A",
      half: "\xBD",
      hamilt: "\u210B",
      HARDcy: "\u042A",
      hardcy: "\u044A",
      hArr: "\u21D4",
      harr: "\u2194",
      harrcir: "\u2948",
      harrw: "\u21AD",
      Hat: "^",
      hbar: "\u210F",
      Hcirc: "\u0124",
      hcirc: "\u0125",
      hearts: "\u2665",
      heartsuit: "\u2665",
      hellip: "\u2026",
      hercon: "\u22B9",
      Hfr: "\u210C",
      hfr: "\u{1D525}",
      HilbertSpace: "\u210B",
      hksearow: "\u2925",
      hkswarow: "\u2926",
      hoarr: "\u21FF",
      homtht: "\u223B",
      hookleftarrow: "\u21A9",
      hookrightarrow: "\u21AA",
      Hopf: "\u210D",
      hopf: "\u{1D559}",
      horbar: "\u2015",
      HorizontalLine: "\u2500",
      Hscr: "\u210B",
      hscr: "\u{1D4BD}",
      hslash: "\u210F",
      Hstrok: "\u0126",
      hstrok: "\u0127",
      HumpDownHump: "\u224E",
      HumpEqual: "\u224F",
      hybull: "\u2043",
      hyphen: "\u2010",
      Iacute: "\xCD",
      iacute: "\xED",
      ic: "\u2063",
      Icirc: "\xCE",
      icirc: "\xEE",
      Icy: "\u0418",
      icy: "\u0438",
      Idot: "\u0130",
      IEcy: "\u0415",
      iecy: "\u0435",
      iexcl: "\xA1",
      iff: "\u21D4",
      Ifr: "\u2111",
      ifr: "\u{1D526}",
      Igrave: "\xCC",
      igrave: "\xEC",
      ii: "\u2148",
      iiiint: "\u2A0C",
      iiint: "\u222D",
      iinfin: "\u29DC",
      iiota: "\u2129",
      IJlig: "\u0132",
      ijlig: "\u0133",
      Im: "\u2111",
      Imacr: "\u012A",
      imacr: "\u012B",
      image: "\u2111",
      ImaginaryI: "\u2148",
      imagline: "\u2110",
      imagpart: "\u2111",
      imath: "\u0131",
      imof: "\u22B7",
      imped: "\u01B5",
      Implies: "\u21D2",
      in: "\u2208",
      incare: "\u2105",
      infin: "\u221E",
      infintie: "\u29DD",
      inodot: "\u0131",
      Int: "\u222C",
      int: "\u222B",
      intcal: "\u22BA",
      integers: "\u2124",
      Integral: "\u222B",
      intercal: "\u22BA",
      Intersection: "\u22C2",
      intlarhk: "\u2A17",
      intprod: "\u2A3C",
      InvisibleComma: "\u2063",
      InvisibleTimes: "\u2062",
      IOcy: "\u0401",
      iocy: "\u0451",
      Iogon: "\u012E",
      iogon: "\u012F",
      Iopf: "\u{1D540}",
      iopf: "\u{1D55A}",
      Iota: "\u0399",
      iota: "\u03B9",
      iprod: "\u2A3C",
      iquest: "\xBF",
      Iscr: "\u2110",
      iscr: "\u{1D4BE}",
      isin: "\u2208",
      isindot: "\u22F5",
      isinE: "\u22F9",
      isins: "\u22F4",
      isinsv: "\u22F3",
      isinv: "\u2208",
      it: "\u2062",
      Itilde: "\u0128",
      itilde: "\u0129",
      Iukcy: "\u0406",
      iukcy: "\u0456",
      Iuml: "\xCF",
      iuml: "\xEF",
      Jcirc: "\u0134",
      jcirc: "\u0135",
      Jcy: "\u0419",
      jcy: "\u0439",
      Jfr: "\u{1D50D}",
      jfr: "\u{1D527}",
      jmath: "\u0237",
      Jopf: "\u{1D541}",
      jopf: "\u{1D55B}",
      Jscr: "\u{1D4A5}",
      jscr: "\u{1D4BF}",
      Jsercy: "\u0408",
      jsercy: "\u0458",
      Jukcy: "\u0404",
      jukcy: "\u0454",
      Kappa: "\u039A",
      kappa: "\u03BA",
      kappav: "\u03F0",
      Kcedil: "\u0136",
      kcedil: "\u0137",
      Kcy: "\u041A",
      kcy: "\u043A",
      Kfr: "\u{1D50E}",
      kfr: "\u{1D528}",
      kgreen: "\u0138",
      KHcy: "\u0425",
      khcy: "\u0445",
      KJcy: "\u040C",
      kjcy: "\u045C",
      Kopf: "\u{1D542}",
      kopf: "\u{1D55C}",
      Kscr: "\u{1D4A6}",
      kscr: "\u{1D4C0}",
      lAarr: "\u21DA",
      Lacute: "\u0139",
      lacute: "\u013A",
      laemptyv: "\u29B4",
      lagran: "\u2112",
      Lambda: "\u039B",
      lambda: "\u03BB",
      Lang: "\u27EA",
      lang: "\u27E8",
      langd: "\u2991",
      langle: "\u27E8",
      lap: "\u2A85",
      Laplacetrf: "\u2112",
      laquo: "\xAB",
      Larr: "\u219E",
      lArr: "\u21D0",
      larr: "\u2190",
      larrb: "\u21E4",
      larrbfs: "\u291F",
      larrfs: "\u291D",
      larrhk: "\u21A9",
      larrlp: "\u21AB",
      larrpl: "\u2939",
      larrsim: "\u2973",
      larrtl: "\u21A2",
      lat: "\u2AAB",
      lAtail: "\u291B",
      latail: "\u2919",
      late: "\u2AAD",
      lates: "\u2AAD\uFE00",
      lBarr: "\u290E",
      lbarr: "\u290C",
      lbbrk: "\u2772",
      lbrace: "{",
      lbrack: "[",
      lbrke: "\u298B",
      lbrksld: "\u298F",
      lbrkslu: "\u298D",
      Lcaron: "\u013D",
      lcaron: "\u013E",
      Lcedil: "\u013B",
      lcedil: "\u013C",
      lceil: "\u2308",
      lcub: "{",
      Lcy: "\u041B",
      lcy: "\u043B",
      ldca: "\u2936",
      ldquo: "\u201C",
      ldquor: "\u201E",
      ldrdhar: "\u2967",
      ldrushar: "\u294B",
      ldsh: "\u21B2",
      lE: "\u2266",
      le: "\u2264",
      LeftAngleBracket: "\u27E8",
      LeftArrow: "\u2190",
      Leftarrow: "\u21D0",
      leftarrow: "\u2190",
      LeftArrowBar: "\u21E4",
      LeftArrowRightArrow: "\u21C6",
      leftarrowtail: "\u21A2",
      LeftCeiling: "\u2308",
      LeftDoubleBracket: "\u27E6",
      LeftDownTeeVector: "\u2961",
      LeftDownVector: "\u21C3",
      LeftDownVectorBar: "\u2959",
      LeftFloor: "\u230A",
      leftharpoondown: "\u21BD",
      leftharpoonup: "\u21BC",
      leftleftarrows: "\u21C7",
      LeftRightArrow: "\u2194",
      Leftrightarrow: "\u21D4",
      leftrightarrow: "\u2194",
      leftrightarrows: "\u21C6",
      leftrightharpoons: "\u21CB",
      leftrightsquigarrow: "\u21AD",
      LeftRightVector: "\u294E",
      LeftTee: "\u22A3",
      LeftTeeArrow: "\u21A4",
      LeftTeeVector: "\u295A",
      leftthreetimes: "\u22CB",
      LeftTriangle: "\u22B2",
      LeftTriangleBar: "\u29CF",
      LeftTriangleEqual: "\u22B4",
      LeftUpDownVector: "\u2951",
      LeftUpTeeVector: "\u2960",
      LeftUpVector: "\u21BF",
      LeftUpVectorBar: "\u2958",
      LeftVector: "\u21BC",
      LeftVectorBar: "\u2952",
      lEg: "\u2A8B",
      leg: "\u22DA",
      leq: "\u2264",
      leqq: "\u2266",
      leqslant: "\u2A7D",
      les: "\u2A7D",
      lescc: "\u2AA8",
      lesdot: "\u2A7F",
      lesdoto: "\u2A81",
      lesdotor: "\u2A83",
      lesg: "\u22DA\uFE00",
      lesges: "\u2A93",
      lessapprox: "\u2A85",
      lessdot: "\u22D6",
      lesseqgtr: "\u22DA",
      lesseqqgtr: "\u2A8B",
      LessEqualGreater: "\u22DA",
      LessFullEqual: "\u2266",
      LessGreater: "\u2276",
      lessgtr: "\u2276",
      LessLess: "\u2AA1",
      lesssim: "\u2272",
      LessSlantEqual: "\u2A7D",
      LessTilde: "\u2272",
      lfisht: "\u297C",
      lfloor: "\u230A",
      Lfr: "\u{1D50F}",
      lfr: "\u{1D529}",
      lg: "\u2276",
      lgE: "\u2A91",
      lHar: "\u2962",
      lhard: "\u21BD",
      lharu: "\u21BC",
      lharul: "\u296A",
      lhblk: "\u2584",
      LJcy: "\u0409",
      ljcy: "\u0459",
      Ll: "\u22D8",
      ll: "\u226A",
      llarr: "\u21C7",
      llcorner: "\u231E",
      Lleftarrow: "\u21DA",
      llhard: "\u296B",
      lltri: "\u25FA",
      Lmidot: "\u013F",
      lmidot: "\u0140",
      lmoust: "\u23B0",
      lmoustache: "\u23B0",
      lnap: "\u2A89",
      lnapprox: "\u2A89",
      lnE: "\u2268",
      lne: "\u2A87",
      lneq: "\u2A87",
      lneqq: "\u2268",
      lnsim: "\u22E6",
      loang: "\u27EC",
      loarr: "\u21FD",
      lobrk: "\u27E6",
      LongLeftArrow: "\u27F5",
      Longleftarrow: "\u27F8",
      longleftarrow: "\u27F5",
      LongLeftRightArrow: "\u27F7",
      Longleftrightarrow: "\u27FA",
      longleftrightarrow: "\u27F7",
      longmapsto: "\u27FC",
      LongRightArrow: "\u27F6",
      Longrightarrow: "\u27F9",
      longrightarrow: "\u27F6",
      looparrowleft: "\u21AB",
      looparrowright: "\u21AC",
      lopar: "\u2985",
      Lopf: "\u{1D543}",
      lopf: "\u{1D55D}",
      loplus: "\u2A2D",
      lotimes: "\u2A34",
      lowast: "\u2217",
      lowbar: "_",
      LowerLeftArrow: "\u2199",
      LowerRightArrow: "\u2198",
      loz: "\u25CA",
      lozenge: "\u25CA",
      lozf: "\u29EB",
      lpar: "(",
      lparlt: "\u2993",
      lrarr: "\u21C6",
      lrcorner: "\u231F",
      lrhar: "\u21CB",
      lrhard: "\u296D",
      lrm: "\u200E",
      lrtri: "\u22BF",
      lsaquo: "\u2039",
      Lscr: "\u2112",
      lscr: "\u{1D4C1}",
      Lsh: "\u21B0",
      lsh: "\u21B0",
      lsim: "\u2272",
      lsime: "\u2A8D",
      lsimg: "\u2A8F",
      lsqb: "[",
      lsquo: "\u2018",
      lsquor: "\u201A",
      Lstrok: "\u0141",
      lstrok: "\u0142",
      Lt: "\u226A",
      LT: "<",
      lt: "<",
      ltcc: "\u2AA6",
      ltcir: "\u2A79",
      ltdot: "\u22D6",
      lthree: "\u22CB",
      ltimes: "\u22C9",
      ltlarr: "\u2976",
      ltquest: "\u2A7B",
      ltri: "\u25C3",
      ltrie: "\u22B4",
      ltrif: "\u25C2",
      ltrPar: "\u2996",
      lurdshar: "\u294A",
      luruhar: "\u2966",
      lvertneqq: "\u2268\uFE00",
      lvnE: "\u2268\uFE00",
      macr: "\xAF",
      male: "\u2642",
      malt: "\u2720",
      maltese: "\u2720",
      Map: "\u2905",
      map: "\u21A6",
      mapsto: "\u21A6",
      mapstodown: "\u21A7",
      mapstoleft: "\u21A4",
      mapstoup: "\u21A5",
      marker: "\u25AE",
      mcomma: "\u2A29",
      Mcy: "\u041C",
      mcy: "\u043C",
      mdash: "\u2014",
      mDDot: "\u223A",
      measuredangle: "\u2221",
      MediumSpace: "\u205F",
      Mellintrf: "\u2133",
      Mfr: "\u{1D510}",
      mfr: "\u{1D52A}",
      mho: "\u2127",
      micro: "\xB5",
      mid: "\u2223",
      midast: "*",
      midcir: "\u2AF0",
      middot: "\xB7",
      minus: "\u2212",
      minusb: "\u229F",
      minusd: "\u2238",
      minusdu: "\u2A2A",
      MinusPlus: "\u2213",
      mlcp: "\u2ADB",
      mldr: "\u2026",
      mnplus: "\u2213",
      models: "\u22A7",
      Mopf: "\u{1D544}",
      mopf: "\u{1D55E}",
      mp: "\u2213",
      Mscr: "\u2133",
      mscr: "\u{1D4C2}",
      mstpos: "\u223E",
      Mu: "\u039C",
      mu: "\u03BC",
      multimap: "\u22B8",
      mumap: "\u22B8",
      nabla: "\u2207",
      Nacute: "\u0143",
      nacute: "\u0144",
      nang: "\u2220\u20D2",
      nap: "\u2249",
      napE: "\u2A70\u0338",
      napid: "\u224B\u0338",
      napos: "\u0149",
      napprox: "\u2249",
      natur: "\u266E",
      natural: "\u266E",
      naturals: "\u2115",
      nbsp: "\xA0",
      nbump: "\u224E\u0338",
      nbumpe: "\u224F\u0338",
      ncap: "\u2A43",
      Ncaron: "\u0147",
      ncaron: "\u0148",
      Ncedil: "\u0145",
      ncedil: "\u0146",
      ncong: "\u2247",
      ncongdot: "\u2A6D\u0338",
      ncup: "\u2A42",
      Ncy: "\u041D",
      ncy: "\u043D",
      ndash: "\u2013",
      ne: "\u2260",
      nearhk: "\u2924",
      neArr: "\u21D7",
      nearr: "\u2197",
      nearrow: "\u2197",
      nedot: "\u2250\u0338",
      NegativeMediumSpace: "\u200B",
      NegativeThickSpace: "\u200B",
      NegativeThinSpace: "\u200B",
      NegativeVeryThinSpace: "\u200B",
      nequiv: "\u2262",
      nesear: "\u2928",
      nesim: "\u2242\u0338",
      NestedGreaterGreater: "\u226B",
      NestedLessLess: "\u226A",
      NewLine: "\n",
      nexist: "\u2204",
      nexists: "\u2204",
      Nfr: "\u{1D511}",
      nfr: "\u{1D52B}",
      ngE: "\u2267\u0338",
      nge: "\u2271",
      ngeq: "\u2271",
      ngeqq: "\u2267\u0338",
      ngeqslant: "\u2A7E\u0338",
      nges: "\u2A7E\u0338",
      nGg: "\u22D9\u0338",
      ngsim: "\u2275",
      nGt: "\u226B\u20D2",
      ngt: "\u226F",
      ngtr: "\u226F",
      nGtv: "\u226B\u0338",
      nhArr: "\u21CE",
      nharr: "\u21AE",
      nhpar: "\u2AF2",
      ni: "\u220B",
      nis: "\u22FC",
      nisd: "\u22FA",
      niv: "\u220B",
      NJcy: "\u040A",
      njcy: "\u045A",
      nlArr: "\u21CD",
      nlarr: "\u219A",
      nldr: "\u2025",
      nlE: "\u2266\u0338",
      nle: "\u2270",
      nLeftarrow: "\u21CD",
      nleftarrow: "\u219A",
      nLeftrightarrow: "\u21CE",
      nleftrightarrow: "\u21AE",
      nleq: "\u2270",
      nleqq: "\u2266\u0338",
      nleqslant: "\u2A7D\u0338",
      nles: "\u2A7D\u0338",
      nless: "\u226E",
      nLl: "\u22D8\u0338",
      nlsim: "\u2274",
      nLt: "\u226A\u20D2",
      nlt: "\u226E",
      nltri: "\u22EA",
      nltrie: "\u22EC",
      nLtv: "\u226A\u0338",
      nmid: "\u2224",
      NoBreak: "\u2060",
      NonBreakingSpace: "\xA0",
      Nopf: "\u2115",
      nopf: "\u{1D55F}",
      Not: "\u2AEC",
      not: "\xAC",
      NotCongruent: "\u2262",
      NotCupCap: "\u226D",
      NotDoubleVerticalBar: "\u2226",
      NotElement: "\u2209",
      NotEqual: "\u2260",
      NotEqualTilde: "\u2242\u0338",
      NotExists: "\u2204",
      NotGreater: "\u226F",
      NotGreaterEqual: "\u2271",
      NotGreaterFullEqual: "\u2267\u0338",
      NotGreaterGreater: "\u226B\u0338",
      NotGreaterLess: "\u2279",
      NotGreaterSlantEqual: "\u2A7E\u0338",
      NotGreaterTilde: "\u2275",
      NotHumpDownHump: "\u224E\u0338",
      NotHumpEqual: "\u224F\u0338",
      notin: "\u2209",
      notindot: "\u22F5\u0338",
      notinE: "\u22F9\u0338",
      notinva: "\u2209",
      notinvb: "\u22F7",
      notinvc: "\u22F6",
      NotLeftTriangle: "\u22EA",
      NotLeftTriangleBar: "\u29CF\u0338",
      NotLeftTriangleEqual: "\u22EC",
      NotLess: "\u226E",
      NotLessEqual: "\u2270",
      NotLessGreater: "\u2278",
      NotLessLess: "\u226A\u0338",
      NotLessSlantEqual: "\u2A7D\u0338",
      NotLessTilde: "\u2274",
      NotNestedGreaterGreater: "\u2AA2\u0338",
      NotNestedLessLess: "\u2AA1\u0338",
      notni: "\u220C",
      notniva: "\u220C",
      notnivb: "\u22FE",
      notnivc: "\u22FD",
      NotPrecedes: "\u2280",
      NotPrecedesEqual: "\u2AAF\u0338",
      NotPrecedesSlantEqual: "\u22E0",
      NotReverseElement: "\u220C",
      NotRightTriangle: "\u22EB",
      NotRightTriangleBar: "\u29D0\u0338",
      NotRightTriangleEqual: "\u22ED",
      NotSquareSubset: "\u228F\u0338",
      NotSquareSubsetEqual: "\u22E2",
      NotSquareSuperset: "\u2290\u0338",
      NotSquareSupersetEqual: "\u22E3",
      NotSubset: "\u2282\u20D2",
      NotSubsetEqual: "\u2288",
      NotSucceeds: "\u2281",
      NotSucceedsEqual: "\u2AB0\u0338",
      NotSucceedsSlantEqual: "\u22E1",
      NotSucceedsTilde: "\u227F\u0338",
      NotSuperset: "\u2283\u20D2",
      NotSupersetEqual: "\u2289",
      NotTilde: "\u2241",
      NotTildeEqual: "\u2244",
      NotTildeFullEqual: "\u2247",
      NotTildeTilde: "\u2249",
      NotVerticalBar: "\u2224",
      npar: "\u2226",
      nparallel: "\u2226",
      nparsl: "\u2AFD\u20E5",
      npart: "\u2202\u0338",
      npolint: "\u2A14",
      npr: "\u2280",
      nprcue: "\u22E0",
      npre: "\u2AAF\u0338",
      nprec: "\u2280",
      npreceq: "\u2AAF\u0338",
      nrArr: "\u21CF",
      nrarr: "\u219B",
      nrarrc: "\u2933\u0338",
      nrarrw: "\u219D\u0338",
      nRightarrow: "\u21CF",
      nrightarrow: "\u219B",
      nrtri: "\u22EB",
      nrtrie: "\u22ED",
      nsc: "\u2281",
      nsccue: "\u22E1",
      nsce: "\u2AB0\u0338",
      Nscr: "\u{1D4A9}",
      nscr: "\u{1D4C3}",
      nshortmid: "\u2224",
      nshortparallel: "\u2226",
      nsim: "\u2241",
      nsime: "\u2244",
      nsimeq: "\u2244",
      nsmid: "\u2224",
      nspar: "\u2226",
      nsqsube: "\u22E2",
      nsqsupe: "\u22E3",
      nsub: "\u2284",
      nsubE: "\u2AC5\u0338",
      nsube: "\u2288",
      nsubset: "\u2282\u20D2",
      nsubseteq: "\u2288",
      nsubseteqq: "\u2AC5\u0338",
      nsucc: "\u2281",
      nsucceq: "\u2AB0\u0338",
      nsup: "\u2285",
      nsupE: "\u2AC6\u0338",
      nsupe: "\u2289",
      nsupset: "\u2283\u20D2",
      nsupseteq: "\u2289",
      nsupseteqq: "\u2AC6\u0338",
      ntgl: "\u2279",
      Ntilde: "\xD1",
      ntilde: "\xF1",
      ntlg: "\u2278",
      ntriangleleft: "\u22EA",
      ntrianglelefteq: "\u22EC",
      ntriangleright: "\u22EB",
      ntrianglerighteq: "\u22ED",
      Nu: "\u039D",
      nu: "\u03BD",
      num: "#",
      numero: "\u2116",
      numsp: "\u2007",
      nvap: "\u224D\u20D2",
      nVDash: "\u22AF",
      nVdash: "\u22AE",
      nvDash: "\u22AD",
      nvdash: "\u22AC",
      nvge: "\u2265\u20D2",
      nvgt: ">\u20D2",
      nvHarr: "\u2904",
      nvinfin: "\u29DE",
      nvlArr: "\u2902",
      nvle: "\u2264\u20D2",
      nvlt: "<\u20D2",
      nvltrie: "\u22B4\u20D2",
      nvrArr: "\u2903",
      nvrtrie: "\u22B5\u20D2",
      nvsim: "\u223C\u20D2",
      nwarhk: "\u2923",
      nwArr: "\u21D6",
      nwarr: "\u2196",
      nwarrow: "\u2196",
      nwnear: "\u2927",
      Oacute: "\xD3",
      oacute: "\xF3",
      oast: "\u229B",
      ocir: "\u229A",
      Ocirc: "\xD4",
      ocirc: "\xF4",
      Ocy: "\u041E",
      ocy: "\u043E",
      odash: "\u229D",
      Odblac: "\u0150",
      odblac: "\u0151",
      odiv: "\u2A38",
      odot: "\u2299",
      odsold: "\u29BC",
      OElig: "\u0152",
      oelig: "\u0153",
      ofcir: "\u29BF",
      Ofr: "\u{1D512}",
      ofr: "\u{1D52C}",
      ogon: "\u02DB",
      Ograve: "\xD2",
      ograve: "\xF2",
      ogt: "\u29C1",
      ohbar: "\u29B5",
      ohm: "\u03A9",
      oint: "\u222E",
      olarr: "\u21BA",
      olcir: "\u29BE",
      olcross: "\u29BB",
      oline: "\u203E",
      olt: "\u29C0",
      Omacr: "\u014C",
      omacr: "\u014D",
      Omega: "\u03A9",
      omega: "\u03C9",
      Omicron: "\u039F",
      omicron: "\u03BF",
      omid: "\u29B6",
      ominus: "\u2296",
      Oopf: "\u{1D546}",
      oopf: "\u{1D560}",
      opar: "\u29B7",
      OpenCurlyDoubleQuote: "\u201C",
      OpenCurlyQuote: "\u2018",
      operp: "\u29B9",
      oplus: "\u2295",
      Or: "\u2A54",
      or: "\u2228",
      orarr: "\u21BB",
      ord: "\u2A5D",
      order: "\u2134",
      orderof: "\u2134",
      ordf: "\xAA",
      ordm: "\xBA",
      origof: "\u22B6",
      oror: "\u2A56",
      orslope: "\u2A57",
      orv: "\u2A5B",
      oS: "\u24C8",
      Oscr: "\u{1D4AA}",
      oscr: "\u2134",
      Oslash: "\xD8",
      oslash: "\xF8",
      osol: "\u2298",
      Otilde: "\xD5",
      otilde: "\xF5",
      Otimes: "\u2A37",
      otimes: "\u2297",
      otimesas: "\u2A36",
      Ouml: "\xD6",
      ouml: "\xF6",
      ovbar: "\u233D",
      OverBar: "\u203E",
      OverBrace: "\u23DE",
      OverBracket: "\u23B4",
      OverParenthesis: "\u23DC",
      par: "\u2225",
      para: "\xB6",
      parallel: "\u2225",
      parsim: "\u2AF3",
      parsl: "\u2AFD",
      part: "\u2202",
      PartialD: "\u2202",
      Pcy: "\u041F",
      pcy: "\u043F",
      percnt: "%",
      period: ".",
      permil: "\u2030",
      perp: "\u22A5",
      pertenk: "\u2031",
      Pfr: "\u{1D513}",
      pfr: "\u{1D52D}",
      Phi: "\u03A6",
      phi: "\u03C6",
      phiv: "\u03D5",
      phmmat: "\u2133",
      phone: "\u260E",
      Pi: "\u03A0",
      pi: "\u03C0",
      pitchfork: "\u22D4",
      piv: "\u03D6",
      planck: "\u210F",
      planckh: "\u210E",
      plankv: "\u210F",
      plus: "+",
      plusacir: "\u2A23",
      plusb: "\u229E",
      pluscir: "\u2A22",
      plusdo: "\u2214",
      plusdu: "\u2A25",
      pluse: "\u2A72",
      PlusMinus: "\xB1",
      plusmn: "\xB1",
      plussim: "\u2A26",
      plustwo: "\u2A27",
      pm: "\xB1",
      Poincareplane: "\u210C",
      pointint: "\u2A15",
      Popf: "\u2119",
      popf: "\u{1D561}",
      pound: "\xA3",
      Pr: "\u2ABB",
      pr: "\u227A",
      prap: "\u2AB7",
      prcue: "\u227C",
      prE: "\u2AB3",
      pre: "\u2AAF",
      prec: "\u227A",
      precapprox: "\u2AB7",
      preccurlyeq: "\u227C",
      Precedes: "\u227A",
      PrecedesEqual: "\u2AAF",
      PrecedesSlantEqual: "\u227C",
      PrecedesTilde: "\u227E",
      preceq: "\u2AAF",
      precnapprox: "\u2AB9",
      precneqq: "\u2AB5",
      precnsim: "\u22E8",
      precsim: "\u227E",
      Prime: "\u2033",
      prime: "\u2032",
      primes: "\u2119",
      prnap: "\u2AB9",
      prnE: "\u2AB5",
      prnsim: "\u22E8",
      prod: "\u220F",
      Product: "\u220F",
      profalar: "\u232E",
      profline: "\u2312",
      profsurf: "\u2313",
      prop: "\u221D",
      Proportion: "\u2237",
      Proportional: "\u221D",
      propto: "\u221D",
      prsim: "\u227E",
      prurel: "\u22B0",
      Pscr: "\u{1D4AB}",
      pscr: "\u{1D4C5}",
      Psi: "\u03A8",
      psi: "\u03C8",
      puncsp: "\u2008",
      Qfr: "\u{1D514}",
      qfr: "\u{1D52E}",
      qint: "\u2A0C",
      Qopf: "\u211A",
      qopf: "\u{1D562}",
      qprime: "\u2057",
      Qscr: "\u{1D4AC}",
      qscr: "\u{1D4C6}",
      quaternions: "\u210D",
      quatint: "\u2A16",
      quest: "?",
      questeq: "\u225F",
      QUOT: '"',
      quot: '"',
      rAarr: "\u21DB",
      race: "\u223D\u0331",
      Racute: "\u0154",
      racute: "\u0155",
      radic: "\u221A",
      raemptyv: "\u29B3",
      Rang: "\u27EB",
      rang: "\u27E9",
      rangd: "\u2992",
      range: "\u29A5",
      rangle: "\u27E9",
      raquo: "\xBB",
      Rarr: "\u21A0",
      rArr: "\u21D2",
      rarr: "\u2192",
      rarrap: "\u2975",
      rarrb: "\u21E5",
      rarrbfs: "\u2920",
      rarrc: "\u2933",
      rarrfs: "\u291E",
      rarrhk: "\u21AA",
      rarrlp: "\u21AC",
      rarrpl: "\u2945",
      rarrsim: "\u2974",
      Rarrtl: "\u2916",
      rarrtl: "\u21A3",
      rarrw: "\u219D",
      rAtail: "\u291C",
      ratail: "\u291A",
      ratio: "\u2236",
      rationals: "\u211A",
      RBarr: "\u2910",
      rBarr: "\u290F",
      rbarr: "\u290D",
      rbbrk: "\u2773",
      rbrace: "}",
      rbrack: "]",
      rbrke: "\u298C",
      rbrksld: "\u298E",
      rbrkslu: "\u2990",
      Rcaron: "\u0158",
      rcaron: "\u0159",
      Rcedil: "\u0156",
      rcedil: "\u0157",
      rceil: "\u2309",
      rcub: "}",
      Rcy: "\u0420",
      rcy: "\u0440",
      rdca: "\u2937",
      rdldhar: "\u2969",
      rdquo: "\u201D",
      rdquor: "\u201D",
      rdsh: "\u21B3",
      Re: "\u211C",
      real: "\u211C",
      realine: "\u211B",
      realpart: "\u211C",
      reals: "\u211D",
      rect: "\u25AD",
      REG: "\xAE",
      reg: "\xAE",
      ReverseElement: "\u220B",
      ReverseEquilibrium: "\u21CB",
      ReverseUpEquilibrium: "\u296F",
      rfisht: "\u297D",
      rfloor: "\u230B",
      Rfr: "\u211C",
      rfr: "\u{1D52F}",
      rHar: "\u2964",
      rhard: "\u21C1",
      rharu: "\u21C0",
      rharul: "\u296C",
      Rho: "\u03A1",
      rho: "\u03C1",
      rhov: "\u03F1",
      RightAngleBracket: "\u27E9",
      RightArrow: "\u2192",
      Rightarrow: "\u21D2",
      rightarrow: "\u2192",
      RightArrowBar: "\u21E5",
      RightArrowLeftArrow: "\u21C4",
      rightarrowtail: "\u21A3",
      RightCeiling: "\u2309",
      RightDoubleBracket: "\u27E7",
      RightDownTeeVector: "\u295D",
      RightDownVector: "\u21C2",
      RightDownVectorBar: "\u2955",
      RightFloor: "\u230B",
      rightharpoondown: "\u21C1",
      rightharpoonup: "\u21C0",
      rightleftarrows: "\u21C4",
      rightleftharpoons: "\u21CC",
      rightrightarrows: "\u21C9",
      rightsquigarrow: "\u219D",
      RightTee: "\u22A2",
      RightTeeArrow: "\u21A6",
      RightTeeVector: "\u295B",
      rightthreetimes: "\u22CC",
      RightTriangle: "\u22B3",
      RightTriangleBar: "\u29D0",
      RightTriangleEqual: "\u22B5",
      RightUpDownVector: "\u294F",
      RightUpTeeVector: "\u295C",
      RightUpVector: "\u21BE",
      RightUpVectorBar: "\u2954",
      RightVector: "\u21C0",
      RightVectorBar: "\u2953",
      ring: "\u02DA",
      risingdotseq: "\u2253",
      rlarr: "\u21C4",
      rlhar: "\u21CC",
      rlm: "\u200F",
      rmoust: "\u23B1",
      rmoustache: "\u23B1",
      rnmid: "\u2AEE",
      roang: "\u27ED",
      roarr: "\u21FE",
      robrk: "\u27E7",
      ropar: "\u2986",
      Ropf: "\u211D",
      ropf: "\u{1D563}",
      roplus: "\u2A2E",
      rotimes: "\u2A35",
      RoundImplies: "\u2970",
      rpar: ")",
      rpargt: "\u2994",
      rppolint: "\u2A12",
      rrarr: "\u21C9",
      Rrightarrow: "\u21DB",
      rsaquo: "\u203A",
      Rscr: "\u211B",
      rscr: "\u{1D4C7}",
      Rsh: "\u21B1",
      rsh: "\u21B1",
      rsqb: "]",
      rsquo: "\u2019",
      rsquor: "\u2019",
      rthree: "\u22CC",
      rtimes: "\u22CA",
      rtri: "\u25B9",
      rtrie: "\u22B5",
      rtrif: "\u25B8",
      rtriltri: "\u29CE",
      RuleDelayed: "\u29F4",
      ruluhar: "\u2968",
      rx: "\u211E",
      Sacute: "\u015A",
      sacute: "\u015B",
      sbquo: "\u201A",
      Sc: "\u2ABC",
      sc: "\u227B",
      scap: "\u2AB8",
      Scaron: "\u0160",
      scaron: "\u0161",
      sccue: "\u227D",
      scE: "\u2AB4",
      sce: "\u2AB0",
      Scedil: "\u015E",
      scedil: "\u015F",
      Scirc: "\u015C",
      scirc: "\u015D",
      scnap: "\u2ABA",
      scnE: "\u2AB6",
      scnsim: "\u22E9",
      scpolint: "\u2A13",
      scsim: "\u227F",
      Scy: "\u0421",
      scy: "\u0441",
      sdot: "\u22C5",
      sdotb: "\u22A1",
      sdote: "\u2A66",
      searhk: "\u2925",
      seArr: "\u21D8",
      searr: "\u2198",
      searrow: "\u2198",
      sect: "\xA7",
      semi: ";",
      seswar: "\u2929",
      setminus: "\u2216",
      setmn: "\u2216",
      sext: "\u2736",
      Sfr: "\u{1D516}",
      sfr: "\u{1D530}",
      sfrown: "\u2322",
      sharp: "\u266F",
      SHCHcy: "\u0429",
      shchcy: "\u0449",
      SHcy: "\u0428",
      shcy: "\u0448",
      ShortDownArrow: "\u2193",
      ShortLeftArrow: "\u2190",
      shortmid: "\u2223",
      shortparallel: "\u2225",
      ShortRightArrow: "\u2192",
      ShortUpArrow: "\u2191",
      shy: "\xAD",
      Sigma: "\u03A3",
      sigma: "\u03C3",
      sigmaf: "\u03C2",
      sigmav: "\u03C2",
      sim: "\u223C",
      simdot: "\u2A6A",
      sime: "\u2243",
      simeq: "\u2243",
      simg: "\u2A9E",
      simgE: "\u2AA0",
      siml: "\u2A9D",
      simlE: "\u2A9F",
      simne: "\u2246",
      simplus: "\u2A24",
      simrarr: "\u2972",
      slarr: "\u2190",
      SmallCircle: "\u2218",
      smallsetminus: "\u2216",
      smashp: "\u2A33",
      smeparsl: "\u29E4",
      smid: "\u2223",
      smile: "\u2323",
      smt: "\u2AAA",
      smte: "\u2AAC",
      smtes: "\u2AAC\uFE00",
      SOFTcy: "\u042C",
      softcy: "\u044C",
      sol: "/",
      solb: "\u29C4",
      solbar: "\u233F",
      Sopf: "\u{1D54A}",
      sopf: "\u{1D564}",
      spades: "\u2660",
      spadesuit: "\u2660",
      spar: "\u2225",
      sqcap: "\u2293",
      sqcaps: "\u2293\uFE00",
      sqcup: "\u2294",
      sqcups: "\u2294\uFE00",
      Sqrt: "\u221A",
      sqsub: "\u228F",
      sqsube: "\u2291",
      sqsubset: "\u228F",
      sqsubseteq: "\u2291",
      sqsup: "\u2290",
      sqsupe: "\u2292",
      sqsupset: "\u2290",
      sqsupseteq: "\u2292",
      squ: "\u25A1",
      Square: "\u25A1",
      square: "\u25A1",
      SquareIntersection: "\u2293",
      SquareSubset: "\u228F",
      SquareSubsetEqual: "\u2291",
      SquareSuperset: "\u2290",
      SquareSupersetEqual: "\u2292",
      SquareUnion: "\u2294",
      squarf: "\u25AA",
      squf: "\u25AA",
      srarr: "\u2192",
      Sscr: "\u{1D4AE}",
      sscr: "\u{1D4C8}",
      ssetmn: "\u2216",
      ssmile: "\u2323",
      sstarf: "\u22C6",
      Star: "\u22C6",
      star: "\u2606",
      starf: "\u2605",
      straightepsilon: "\u03F5",
      straightphi: "\u03D5",
      strns: "\xAF",
      Sub: "\u22D0",
      sub: "\u2282",
      subdot: "\u2ABD",
      subE: "\u2AC5",
      sube: "\u2286",
      subedot: "\u2AC3",
      submult: "\u2AC1",
      subnE: "\u2ACB",
      subne: "\u228A",
      subplus: "\u2ABF",
      subrarr: "\u2979",
      Subset: "\u22D0",
      subset: "\u2282",
      subseteq: "\u2286",
      subseteqq: "\u2AC5",
      SubsetEqual: "\u2286",
      subsetneq: "\u228A",
      subsetneqq: "\u2ACB",
      subsim: "\u2AC7",
      subsub: "\u2AD5",
      subsup: "\u2AD3",
      succ: "\u227B",
      succapprox: "\u2AB8",
      succcurlyeq: "\u227D",
      Succeeds: "\u227B",
      SucceedsEqual: "\u2AB0",
      SucceedsSlantEqual: "\u227D",
      SucceedsTilde: "\u227F",
      succeq: "\u2AB0",
      succnapprox: "\u2ABA",
      succneqq: "\u2AB6",
      succnsim: "\u22E9",
      succsim: "\u227F",
      SuchThat: "\u220B",
      Sum: "\u2211",
      sum: "\u2211",
      sung: "\u266A",
      Sup: "\u22D1",
      sup: "\u2283",
      sup1: "\xB9",
      sup2: "\xB2",
      sup3: "\xB3",
      supdot: "\u2ABE",
      supdsub: "\u2AD8",
      supE: "\u2AC6",
      supe: "\u2287",
      supedot: "\u2AC4",
      Superset: "\u2283",
      SupersetEqual: "\u2287",
      suphsol: "\u27C9",
      suphsub: "\u2AD7",
      suplarr: "\u297B",
      supmult: "\u2AC2",
      supnE: "\u2ACC",
      supne: "\u228B",
      supplus: "\u2AC0",
      Supset: "\u22D1",
      supset: "\u2283",
      supseteq: "\u2287",
      supseteqq: "\u2AC6",
      supsetneq: "\u228B",
      supsetneqq: "\u2ACC",
      supsim: "\u2AC8",
      supsub: "\u2AD4",
      supsup: "\u2AD6",
      swarhk: "\u2926",
      swArr: "\u21D9",
      swarr: "\u2199",
      swarrow: "\u2199",
      swnwar: "\u292A",
      szlig: "\xDF",
      Tab: "	",
      target: "\u2316",
      Tau: "\u03A4",
      tau: "\u03C4",
      tbrk: "\u23B4",
      Tcaron: "\u0164",
      tcaron: "\u0165",
      Tcedil: "\u0162",
      tcedil: "\u0163",
      Tcy: "\u0422",
      tcy: "\u0442",
      tdot: "\u20DB",
      telrec: "\u2315",
      Tfr: "\u{1D517}",
      tfr: "\u{1D531}",
      there4: "\u2234",
      Therefore: "\u2234",
      therefore: "\u2234",
      Theta: "\u0398",
      theta: "\u03B8",
      thetasym: "\u03D1",
      thetav: "\u03D1",
      thickapprox: "\u2248",
      thicksim: "\u223C",
      ThickSpace: "\u205F\u200A",
      thinsp: "\u2009",
      ThinSpace: "\u2009",
      thkap: "\u2248",
      thksim: "\u223C",
      THORN: "\xDE",
      thorn: "\xFE",
      Tilde: "\u223C",
      tilde: "\u02DC",
      TildeEqual: "\u2243",
      TildeFullEqual: "\u2245",
      TildeTilde: "\u2248",
      times: "\xD7",
      timesb: "\u22A0",
      timesbar: "\u2A31",
      timesd: "\u2A30",
      tint: "\u222D",
      toea: "\u2928",
      top: "\u22A4",
      topbot: "\u2336",
      topcir: "\u2AF1",
      Topf: "\u{1D54B}",
      topf: "\u{1D565}",
      topfork: "\u2ADA",
      tosa: "\u2929",
      tprime: "\u2034",
      TRADE: "\u2122",
      trade: "\u2122",
      triangle: "\u25B5",
      triangledown: "\u25BF",
      triangleleft: "\u25C3",
      trianglelefteq: "\u22B4",
      triangleq: "\u225C",
      triangleright: "\u25B9",
      trianglerighteq: "\u22B5",
      tridot: "\u25EC",
      trie: "\u225C",
      triminus: "\u2A3A",
      TripleDot: "\u20DB",
      triplus: "\u2A39",
      trisb: "\u29CD",
      tritime: "\u2A3B",
      trpezium: "\u23E2",
      Tscr: "\u{1D4AF}",
      tscr: "\u{1D4C9}",
      TScy: "\u0426",
      tscy: "\u0446",
      TSHcy: "\u040B",
      tshcy: "\u045B",
      Tstrok: "\u0166",
      tstrok: "\u0167",
      twixt: "\u226C",
      twoheadleftarrow: "\u219E",
      twoheadrightarrow: "\u21A0",
      Uacute: "\xDA",
      uacute: "\xFA",
      Uarr: "\u219F",
      uArr: "\u21D1",
      uarr: "\u2191",
      Uarrocir: "\u2949",
      Ubrcy: "\u040E",
      ubrcy: "\u045E",
      Ubreve: "\u016C",
      ubreve: "\u016D",
      Ucirc: "\xDB",
      ucirc: "\xFB",
      Ucy: "\u0423",
      ucy: "\u0443",
      udarr: "\u21C5",
      Udblac: "\u0170",
      udblac: "\u0171",
      udhar: "\u296E",
      ufisht: "\u297E",
      Ufr: "\u{1D518}",
      ufr: "\u{1D532}",
      Ugrave: "\xD9",
      ugrave: "\xF9",
      uHar: "\u2963",
      uharl: "\u21BF",
      uharr: "\u21BE",
      uhblk: "\u2580",
      ulcorn: "\u231C",
      ulcorner: "\u231C",
      ulcrop: "\u230F",
      ultri: "\u25F8",
      Umacr: "\u016A",
      umacr: "\u016B",
      uml: "\xA8",
      UnderBar: "_",
      UnderBrace: "\u23DF",
      UnderBracket: "\u23B5",
      UnderParenthesis: "\u23DD",
      Union: "\u22C3",
      UnionPlus: "\u228E",
      Uogon: "\u0172",
      uogon: "\u0173",
      Uopf: "\u{1D54C}",
      uopf: "\u{1D566}",
      UpArrow: "\u2191",
      Uparrow: "\u21D1",
      uparrow: "\u2191",
      UpArrowBar: "\u2912",
      UpArrowDownArrow: "\u21C5",
      UpDownArrow: "\u2195",
      Updownarrow: "\u21D5",
      updownarrow: "\u2195",
      UpEquilibrium: "\u296E",
      upharpoonleft: "\u21BF",
      upharpoonright: "\u21BE",
      uplus: "\u228E",
      UpperLeftArrow: "\u2196",
      UpperRightArrow: "\u2197",
      Upsi: "\u03D2",
      upsi: "\u03C5",
      upsih: "\u03D2",
      Upsilon: "\u03A5",
      upsilon: "\u03C5",
      UpTee: "\u22A5",
      UpTeeArrow: "\u21A5",
      upuparrows: "\u21C8",
      urcorn: "\u231D",
      urcorner: "\u231D",
      urcrop: "\u230E",
      Uring: "\u016E",
      uring: "\u016F",
      urtri: "\u25F9",
      Uscr: "\u{1D4B0}",
      uscr: "\u{1D4CA}",
      utdot: "\u22F0",
      Utilde: "\u0168",
      utilde: "\u0169",
      utri: "\u25B5",
      utrif: "\u25B4",
      uuarr: "\u21C8",
      Uuml: "\xDC",
      uuml: "\xFC",
      uwangle: "\u29A7",
      vangrt: "\u299C",
      varepsilon: "\u03F5",
      varkappa: "\u03F0",
      varnothing: "\u2205",
      varphi: "\u03D5",
      varpi: "\u03D6",
      varpropto: "\u221D",
      vArr: "\u21D5",
      varr: "\u2195",
      varrho: "\u03F1",
      varsigma: "\u03C2",
      varsubsetneq: "\u228A\uFE00",
      varsubsetneqq: "\u2ACB\uFE00",
      varsupsetneq: "\u228B\uFE00",
      varsupsetneqq: "\u2ACC\uFE00",
      vartheta: "\u03D1",
      vartriangleleft: "\u22B2",
      vartriangleright: "\u22B3",
      Vbar: "\u2AEB",
      vBar: "\u2AE8",
      vBarv: "\u2AE9",
      Vcy: "\u0412",
      vcy: "\u0432",
      VDash: "\u22AB",
      Vdash: "\u22A9",
      vDash: "\u22A8",
      vdash: "\u22A2",
      Vdashl: "\u2AE6",
      Vee: "\u22C1",
      vee: "\u2228",
      veebar: "\u22BB",
      veeeq: "\u225A",
      vellip: "\u22EE",
      Verbar: "\u2016",
      verbar: "|",
      Vert: "\u2016",
      vert: "|",
      VerticalBar: "\u2223",
      VerticalLine: "|",
      VerticalSeparator: "\u2758",
      VerticalTilde: "\u2240",
      VeryThinSpace: "\u200A",
      Vfr: "\u{1D519}",
      vfr: "\u{1D533}",
      vltri: "\u22B2",
      vnsub: "\u2282\u20D2",
      vnsup: "\u2283\u20D2",
      Vopf: "\u{1D54D}",
      vopf: "\u{1D567}",
      vprop: "\u221D",
      vrtri: "\u22B3",
      Vscr: "\u{1D4B1}",
      vscr: "\u{1D4CB}",
      vsubnE: "\u2ACB\uFE00",
      vsubne: "\u228A\uFE00",
      vsupnE: "\u2ACC\uFE00",
      vsupne: "\u228B\uFE00",
      Vvdash: "\u22AA",
      vzigzag: "\u299A",
      Wcirc: "\u0174",
      wcirc: "\u0175",
      wedbar: "\u2A5F",
      Wedge: "\u22C0",
      wedge: "\u2227",
      wedgeq: "\u2259",
      weierp: "\u2118",
      Wfr: "\u{1D51A}",
      wfr: "\u{1D534}",
      Wopf: "\u{1D54E}",
      wopf: "\u{1D568}",
      wp: "\u2118",
      wr: "\u2240",
      wreath: "\u2240",
      Wscr: "\u{1D4B2}",
      wscr: "\u{1D4CC}",
      xcap: "\u22C2",
      xcirc: "\u25EF",
      xcup: "\u22C3",
      xdtri: "\u25BD",
      Xfr: "\u{1D51B}",
      xfr: "\u{1D535}",
      xhArr: "\u27FA",
      xharr: "\u27F7",
      Xi: "\u039E",
      xi: "\u03BE",
      xlArr: "\u27F8",
      xlarr: "\u27F5",
      xmap: "\u27FC",
      xnis: "\u22FB",
      xodot: "\u2A00",
      Xopf: "\u{1D54F}",
      xopf: "\u{1D569}",
      xoplus: "\u2A01",
      xotime: "\u2A02",
      xrArr: "\u27F9",
      xrarr: "\u27F6",
      Xscr: "\u{1D4B3}",
      xscr: "\u{1D4CD}",
      xsqcup: "\u2A06",
      xuplus: "\u2A04",
      xutri: "\u25B3",
      xvee: "\u22C1",
      xwedge: "\u22C0",
      Yacute: "\xDD",
      yacute: "\xFD",
      YAcy: "\u042F",
      yacy: "\u044F",
      Ycirc: "\u0176",
      ycirc: "\u0177",
      Ycy: "\u042B",
      ycy: "\u044B",
      yen: "\xA5",
      Yfr: "\u{1D51C}",
      yfr: "\u{1D536}",
      YIcy: "\u0407",
      yicy: "\u0457",
      Yopf: "\u{1D550}",
      yopf: "\u{1D56A}",
      Yscr: "\u{1D4B4}",
      yscr: "\u{1D4CE}",
      YUcy: "\u042E",
      yucy: "\u044E",
      Yuml: "\u0178",
      yuml: "\xFF",
      Zacute: "\u0179",
      zacute: "\u017A",
      Zcaron: "\u017D",
      zcaron: "\u017E",
      Zcy: "\u0417",
      zcy: "\u0437",
      Zdot: "\u017B",
      zdot: "\u017C",
      zeetrf: "\u2128",
      ZeroWidthSpace: "\u200B",
      Zeta: "\u0396",
      zeta: "\u03B6",
      Zfr: "\u2128",
      zfr: "\u{1D537}",
      ZHcy: "\u0416",
      zhcy: "\u0436",
      zigrarr: "\u21DD",
      Zopf: "\u2124",
      zopf: "\u{1D56B}",
      Zscr: "\u{1D4B5}",
      zscr: "\u{1D4CF}",
      zwj: "\u200D",
      zwnj: "\u200C"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  }
});

// node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    var g = require_grammar();
    var errors = require_errors();
    var isHTMLEscapableRawTextElement = conventions.isHTMLEscapableRawTextElement;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
    var hasOwn = conventions.hasOwn;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = errors.ParseError;
    var DOMException = errors.DOMException;
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = /* @__PURE__ */ Object.create(null));
        parse2(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
        domBuilder.endDocument();
      }
    };
    var ENTITY_REG = /&#?\w+;?/g;
    function parse2(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      var isHTML = isHTMLMimeType(domBuilder.mimeType);
      if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
        errorHandler.warning("Unicode replacement character detected, source encoding issues?");
      }
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
        if (!isHTML && complete !== a2) {
          errorHandler.error("EntityRef: expecting ;");
          return a2;
        }
        var match = g.Reference.exec(complete);
        if (!match || match[0].length !== complete.length) {
          errorHandler.error("entity not matching Reference production: " + a2);
          return a2;
        }
        var k = complete.slice(1, -1);
        if (hasOwn(entityMap, k)) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substring(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText2(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /\r\n?|\n|$/g;
      var locator = domBuilder.locator;
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = lineEnd;
          lineEnd = m.index + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var unclosedTags = [];
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!isHTML && unclosedTags.length > 0) {
              return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
            }
            if (!source.substring(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substring(start));
              if (doc.documentElement) {
                return errorHandler.error("Extra content at the end of the document");
              }
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            var fromSource = source.substring(start, tagStart);
            if (!isHTML && unclosedTags.length === 0) {
              fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), "");
              fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
            }
            appendText2(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 2);
              var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : void 0);
              if (!tagNameRaw) {
                return errorHandler.fatalError("end tag name missing");
              }
              var tagNameMatch = end > 0 && g.reg("^", g.QName_group, g.S_OPT, "$").exec(tagNameRaw);
              if (!tagNameMatch) {
                return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
              }
              if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
                return;
              }
              var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
              if (currentTagName !== tagNameMatch[1]) {
                var tagNameLower = tagNameMatch[1].toLowerCase();
                if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
                  return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
                }
              }
              var config2 = parseStack.pop();
              unclosedTags.pop();
              var localNSMap = config2.localNSMap;
              domBuilder.endElement(config2.uri, config2.localName, currentTagName);
              if (localNSMap) {
                for (var prefix in localNSMap) {
                  if (hasOwn(localNSMap, prefix)) {
                    domBuilder.endPrefixMapping(prefix);
                  }
                }
              }
              end++;
              break;
            // end element
            case "?":
              locator && position(tagStart);
              end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
              var len = el.length;
              if (!el.closed) {
                if (isHTML && conventions.isHTMLVoidElement(el.tagName)) {
                  el.closed = true;
                } else {
                  unclosedTags.push(el.tagName);
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (isHTML && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          } else if (e instanceof DOMException) {
            throw new ParseError(e.name + ": " + e.message, domBuilder.locator, e);
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText2(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
      function addAttribute(qname, value2, startIndex) {
        if (hasOwn(el.attributeNames, qname)) {
          return errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        if (!isHTML && value2.indexOf("<") >= 0) {
          return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
        }
        el.addValue(
          qname,
          // @see https://www.w3.org/TR/xml/#AVNormalize
          // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
          // - recursive replacement of (DTD) entity references
          // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
          value2.replace(/[\t\n\r]/g, " ").replace(ENTITY_REG, entityReplacer),
          startIndex
        );
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                break;
              case S_ATTR_SPACE:
                el.closed = true;
                break;
              //case S_EQ:
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              //normal
              case S_ATTR_NOQUOT_VALUE:
              //Compatible state
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!isHTML) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                if (!isHTML) {
                  return errorHandler.fatalError(`AttValue: ' or " expected`);
                }
            }
            return p;
          /*xml space '\x20' | #x9 | #xD | #xA; */
          case "\x80":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                //case S_TAG:void();break;
                //case S_ATTR:void();break;
                //case S_ATTR_NOQUOT_VALUE:void();break;
                case S_ATTR_SPACE:
                  if (!isHTML) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = /* @__PURE__ */ Object.create(null);
            _copy(currentNSMap, currentNSMap = /* @__PURE__ */ Object.create(null));
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        if (a.prefix) {
          if (a.prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (a.prefix !== "xmlns") {
            a.uri = currentNSMap[a.prefix];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            if (hasOwn(localNSMap, prefix)) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
      if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (isEscapableRaw) {
          text = text.replace(ENTITY_REG, entityReplacer);
        }
        domBuilder.characters(text, 0, text.length);
        return elEndStart;
      }
      return elStartEnd + 1;
    }
    function _copy(source, target) {
      for (var n in source) {
        if (hasOwn(source, n)) {
          target[n] = source[n];
        }
      }
    }
    function parseUtils(source, start) {
      var index = start;
      function char(n) {
        n = n || 0;
        return source.charAt(index + n);
      }
      function skip(n) {
        n = n || 1;
        index += n;
      }
      function skipBlanks() {
        var blanks = 0;
        while (index < source.length) {
          var c = char();
          if (c !== " " && c !== "\n" && c !== "	" && c !== "\r") {
            return blanks;
          }
          blanks++;
          skip();
        }
        return -1;
      }
      function substringFromIndex() {
        return source.substring(index);
      }
      function substringStartsWith(text) {
        return source.substring(index, index + text.length) === text;
      }
      function substringStartsWithCaseInsensitive(text) {
        return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
      }
      function getMatch(args) {
        var expr = g.reg("^", args);
        var match = expr.exec(substringFromIndex());
        if (match) {
          skip(match[0].length);
          return match[0];
        }
        return null;
      }
      return {
        char,
        getIndex: function() {
          return index;
        },
        getMatch,
        getSource: function() {
          return source;
        },
        skip,
        skipBlanks,
        substringFromIndex,
        substringStartsWith,
        substringStartsWithCaseInsensitive
      };
    }
    function parseDoctypeInternalSubset(p, errorHandler) {
      function parsePI(p2, errorHandler2) {
        var match = g.PI.exec(p2.substringFromIndex());
        if (!match) {
          return errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
        }
        if (match[1].toLowerCase() === "xml") {
          return errorHandler2.fatalError(
            "xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex()
          );
        }
        p2.skip(match[0].length);
        return match[0];
      }
      var source = p.getSource();
      if (p.char() === "[") {
        p.skip(1);
        var intSubsetStart = p.getIndex();
        while (p.getIndex() < source.length) {
          p.skipBlanks();
          if (p.char() === "]") {
            var internalSubset = source.substring(intSubsetStart, p.getIndex());
            p.skip(1);
            return internalSubset;
          }
          var current = null;
          if (p.char() === "<" && p.char(1) === "!") {
            switch (p.char(2)) {
              case "E":
                if (p.char(3) === "L") {
                  current = p.getMatch(g.elementdecl);
                } else if (p.char(3) === "N") {
                  current = p.getMatch(g.EntityDecl);
                }
                break;
              case "A":
                current = p.getMatch(g.AttlistDecl);
                break;
              case "N":
                current = p.getMatch(g.NotationDecl);
                break;
              case "-":
                current = p.getMatch(g.Comment);
                break;
            }
          } else if (p.char() === "<" && p.char(1) === "?") {
            current = parsePI(p, errorHandler);
          } else if (p.char() === "%") {
            current = p.getMatch(g.PEReference);
          } else {
            return errorHandler.fatalError("Error detected in Markup declaration");
          }
          if (!current) {
            return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
          }
        }
        return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
      }
    }
    function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
      var p = parseUtils(source, start);
      switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
        case "-":
          var comment = p.getMatch(g.Comment);
          if (comment) {
            domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
            return p.getIndex();
          } else {
            return errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
          }
        case "[":
          var cdata = p.getMatch(g.CDSect);
          if (cdata) {
            if (!isHTML && !domBuilder.currentElement) {
              return errorHandler.fatalError("CDATA outside of element");
            }
            domBuilder.startCDATA();
            domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
            domBuilder.endCDATA();
            return p.getIndex();
          } else {
            return errorHandler.fatalError("Invalid CDATA starting at position " + start);
          }
        case "D": {
          if (domBuilder.doc && domBuilder.doc.documentElement) {
            return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
          }
          if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
            return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
          }
          p.skip(g.DOCTYPE_DECL_START.length);
          if (p.skipBlanks() < 1) {
            return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
          }
          var doctype = {
            name: void 0,
            publicId: void 0,
            systemId: void 0,
            internalSubset: void 0
          };
          doctype.name = p.getMatch(g.Name);
          if (!doctype.name)
            return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
          if (isHTML && doctype.name.toLowerCase() !== "html") {
            errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex());
          }
          p.skipBlanks();
          if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
            var match = g.ExternalID_match.exec(p.substringFromIndex());
            if (!match) {
              return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
            }
            if (match.groups.SystemLiteralOnly !== void 0) {
              doctype.systemId = match.groups.SystemLiteralOnly;
            } else {
              doctype.systemId = match.groups.SystemLiteral;
              doctype.publicId = match.groups.PubidLiteral;
            }
            p.skip(match[0].length);
          } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
            p.skip(g.SYSTEM.length);
            if (p.skipBlanks() < 1) {
              return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
            }
            doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
            if (!doctype.systemId) {
              return errorHandler.fatalError(
                "Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex()
              );
            }
          }
          if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
            errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex());
          }
          if (!isHTML) {
            p.skipBlanks();
            doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
          }
          p.skipBlanks();
          if (p.char() !== ">") {
            return errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex());
          }
          p.skip(1);
          domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
          domBuilder.endDTD();
          return p.getIndex();
        }
        default:
          return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
      }
    }
    function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
      var match = source.substring(start).match(g.PI);
      if (!match) {
        return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
      }
      if (match[1].toLowerCase() === "xml") {
        if (start > 0) {
          return errorHandler.fatalError(
            "processing instruction at position " + start + " is an xml declaration which is only at the start of the document"
          );
        }
        if (!g.XMLDecl.test(source.substring(start))) {
          return errorHandler.fatalError("xml declaration is not well-formed");
        }
      }
      domBuilder.processingInstruction(match[1], match[2]);
      return start + match[0].length;
    }
    function ElementAttributes() {
      this.attributeNames = /* @__PURE__ */ Object.create(null);
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!g.QName_exact.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!g.QName_exact.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
      //	,getIndex:function(uri, localName)){
      //		if(localName){
      //
      //		}else{
      //			var qName = uri
      //		}
      //	},
      //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
      //	getType:function(uri,localName){}
      //	getType:function(i){},
    };
    exports.XMLReader = XMLReader;
    exports.parseUtils = parseUtils;
    exports.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;
  }
});

// node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    var dom = require_dom();
    var errors = require_errors();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    var isHTMLMimeType = conventions.isHTMLMimeType;
    var isValidMimeType = conventions.isValidMimeType;
    var MIME_TYPE = conventions.MIME_TYPE;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = errors.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings2(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028\u2029]/g, "\n");
    }
    function DOMParser5(options) {
      options = options || {};
      if (options.locator === void 0) {
        options.locator = true;
      }
      this.assign = options.assign || conventions.assign;
      this.domHandler = options.domHandler || DOMHandler;
      this.onError = options.onError || options.errorHandler;
      if (options.errorHandler && typeof options.errorHandler !== "function") {
        throw new TypeError("errorHandler object is no longer supported, switch to onError!");
      } else if (options.errorHandler) {
        options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this);
      }
      this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings2;
      this.locator = !!options.locator;
      this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), options.xmlns);
    }
    DOMParser5.prototype.parseFromString = function(source, mimeType) {
      if (!isValidMimeType(mimeType)) {
        throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
      }
      var defaultNSMap = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns);
      var entityMap = entities.XML_ENTITIES;
      var defaultNamespace = defaultNSMap[""] || null;
      if (hasDefaultHTMLNamespace(mimeType)) {
        entityMap = entities.HTML_ENTITIES;
        defaultNamespace = NAMESPACE.HTML;
      } else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
        defaultNamespace = NAMESPACE.SVG;
      }
      defaultNSMap[""] = defaultNamespace;
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var domBuilder = new this.domHandler({
        mimeType,
        defaultNamespace,
        onError: this.onError
      });
      var locator = this.locator ? {} : void 0;
      if (this.locator) {
        domBuilder.setDocumentLocator(locator);
      }
      var sax2 = new XMLReader();
      sax2.errorHandler = domBuilder;
      sax2.domBuilder = domBuilder;
      var isXml = !conventions.isHTMLMimeType(mimeType);
      if (isXml && typeof source !== "string") {
        sax2.errorHandler.fatalError("source is not a string");
      }
      sax2.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
      if (!domBuilder.doc.documentElement) {
        sax2.errorHandler.fatalError("missing root element");
      }
      return domBuilder.doc;
    };
    function DOMHandler(options) {
      var opt = options || {};
      this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;
      this.defaultNamespace = opt.defaultNamespace || null;
      this.cdata = false;
      this.currentElement = void 0;
      this.doc = void 0;
      this.locator = void 0;
      this.onError = opt.onError;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      /**
       * Either creates an XML or an HTML document and stores it under `this.doc`.
       * If it is an XML document, `this.defaultNamespace` is used to create it,
       * and it will not contain any `childNodes`.
       * If it is an HTML document, it will be created without any `childNodes`.
       *
       * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
       */
      startDocument: function() {
        var impl = new DOMImplementation();
        this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, "");
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        this.currentElement = this.currentElement.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      /**
       * Stores the locator to be able to set the `columnNumber` and `lineNumber`
       * on the created DOM nodes.
       *
       * @param {Locator} locator
       */
      setDocumentLocator: function(locator) {
        if (locator) {
          locator.lineNumber = 0;
        }
        this.locator = locator;
      },
      //LexicalHandler
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId, internalSubset) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      reportError: function(level, message) {
        if (typeof this.onError === "function") {
          try {
            this.onError(level, message, this);
          } catch (e) {
            throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
          }
        } else {
          console.error("[xmldom " + level + "]	" + message, _locator(this.locator));
        }
      },
      /**
       * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function(message) {
        this.reportError("warning", message);
      },
      error: function(message) {
        this.reportError("error", message);
      },
      /**
       * This function reports a fatal error and throws a ParseError.
       *
       * @param {string} message
       * - The message to be used for reporting and throwing the error.
       * @returns {never}
       * This function always throws an error and never returns a value.
       * @throws {ParseError}
       * Always throws a ParseError with the provided message.
       */
      fatalError: function(message) {
        this.reportError("fatalError", message);
        throw new ParseError(message, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
      /\w+/g,
      function(key) {
        DOMHandler.prototype[key] = function() {
          return null;
        };
      }
    );
    function appendElement(handler, node) {
      if (!handler.currentElement) {
        handler.doc.appendChild(node);
      } else {
        handler.currentElement.appendChild(node);
      }
    }
    function onErrorStopParsing(level) {
      if (level === "error") throw "onErrorStopParsing";
    }
    function onWarningStopParsing() {
      throw "onWarningStopParsing";
    }
    exports.__DOMHandler = DOMHandler;
    exports.DOMParser = DOMParser5;
    exports.normalizeLineEndings = normalizeLineEndings2;
    exports.onErrorStopParsing = onErrorStopParsing;
    exports.onWarningStopParsing = onWarningStopParsing;
  }
});

// node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/@xmldom/xmldom/lib/index.js"(exports) {
    "use strict";
    var conventions = require_conventions();
    exports.assign = conventions.assign;
    exports.hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
    exports.isHTMLMimeType = conventions.isHTMLMimeType;
    exports.isValidMimeType = conventions.isValidMimeType;
    exports.MIME_TYPE = conventions.MIME_TYPE;
    exports.NAMESPACE = conventions.NAMESPACE;
    var errors = require_errors();
    exports.DOMException = errors.DOMException;
    exports.DOMExceptionName = errors.DOMExceptionName;
    exports.ExceptionCode = errors.ExceptionCode;
    exports.ParseError = errors.ParseError;
    var dom = require_dom();
    exports.Attr = dom.Attr;
    exports.CDATASection = dom.CDATASection;
    exports.CharacterData = dom.CharacterData;
    exports.Comment = dom.Comment;
    exports.Document = dom.Document;
    exports.DocumentFragment = dom.DocumentFragment;
    exports.DocumentType = dom.DocumentType;
    exports.DOMImplementation = dom.DOMImplementation;
    exports.Element = dom.Element;
    exports.Entity = dom.Entity;
    exports.EntityReference = dom.EntityReference;
    exports.LiveNodeList = dom.LiveNodeList;
    exports.NamedNodeMap = dom.NamedNodeMap;
    exports.Node = dom.Node;
    exports.NodeList = dom.NodeList;
    exports.Notation = dom.Notation;
    exports.ProcessingInstruction = dom.ProcessingInstruction;
    exports.Text = dom.Text;
    exports.XMLSerializer = dom.XMLSerializer;
    var domParser = require_dom_parser();
    exports.DOMParser = domParser.DOMParser;
    exports.normalizeLineEndings = domParser.normalizeLineEndings;
    exports.onErrorStopParsing = domParser.onErrorStopParsing;
    exports.onWarningStopParsing = domParser.onWarningStopParsing;
  }
});

// src/core/markdown/storage-to-markdown.ts
function convertStorageToMarkdown(storage, options) {
  const diagnostics = [];
  const document = parseStorageFragment(storage);
  const root = document.documentElement;
  if (root === null) throw new Error("The storage body could not be parsed as XML.");
  const context = { ...options, annotations: [], diagnostics, fallbackNodes: /* @__PURE__ */ new Set(), opaqueBlocks: [] };
  const renderedBlocks = [];
  let rendered = "";
  for (let index = 0; index < root.childNodes.length; index += 1) {
    const child = root.childNodes.item(index);
    if (child === null) continue;
    const storagePath = `$.children[${index}]`;
    const markdown2 = renderNode(child, context, "block", storagePath);
    rendered += markdown2;
    if (child.nodeType === import_xmldom.Node.ELEMENT_NODE && markdown2.trim().length > 0) {
      const element = child;
      renderedBlocks.push({
        storagePath,
        nodeName: element.nodeName,
        storageSubtree: serializer.serializeToString(element),
        markdown: markdown2
      });
    }
  }
  const markdown = normalizeMarkdown(rendered);
  return { markdown, diagnostics, annotations: context.annotations, opaqueBlocks: context.opaqueBlocks, renderedBlocks };
}
function parseStorageFragment(storage) {
  const parser = new import_xmldom.DOMParser({
    locator: false,
    onError(level, message) {
      if (level === "warning") return;
      throw new Error(`Invalid Confluence storage XML: ${message}`);
    }
  });
  return parser.parseFromString(
    `<miku-root xmlns:ac="http://atlassian.com/content" xmlns:ri="http://atlassian.com/resource/identifier">${storage}</miku-root>`,
    "application/xml"
  );
}
function renderChildren(element, context, mode, storagePath) {
  let output = "";
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const child = element.childNodes.item(index);
    if (child !== null) output += renderNode(child, context, mode, `${storagePath}.children[${index}]`);
  }
  return output;
}
function renderNode(node, context, mode, storagePath) {
  if (node.nodeType === import_xmldom.Node.TEXT_NODE || node.nodeType === import_xmldom.Node.CDATA_SECTION_NODE) {
    return escapeMarkdownText(node.nodeValue ?? "");
  }
  if (node.nodeType === import_xmldom.Node.COMMENT_NODE || node.nodeType === import_xmldom.Node.PROCESSING_INSTRUCTION_NODE) return "";
  if (node.nodeType !== import_xmldom.Node.ELEMENT_NODE) return "";
  const element = node;
  const tag = element.nodeName.toLowerCase();
  collectStorageAnnotation(element, context, storagePath);
  if (tag === "p") return `${renderChildren(element, context, "inline", storagePath)}

`;
  if (/^h[1-6]$/u.test(tag)) {
    const level = Number.parseInt(tag.slice(1), 10);
    return `${"#".repeat(level)} ${renderChildren(element, context, "inline", storagePath).trim()}

`;
  }
  if (tag === "br") return "  \n";
  if (tag === "hr") return "---\n\n";
  if (tag === "strong" || tag === "b") return wrap("**", renderChildren(element, context, "inline", storagePath));
  if (tag === "em" || tag === "i") return wrap("*", renderChildren(element, context, "inline", storagePath));
  if (tag === "del" || tag === "s" || tag === "strike") return wrap("~~", renderChildren(element, context, "inline", storagePath));
  if (tag === "code") return inlineCode(element.textContent ?? "");
  if (tag === "pre") return fencedCode(element.textContent ?? "");
  if (tag === "blockquote") return blockQuote(renderChildren(element, context, "block", storagePath));
  if (tag === "ul" || tag === "ol") return renderList(element, context, tag === "ol", 0, storagePath);
  if (tag === "a") return htmlLink(element, context, storagePath);
  if (tag === "img") return htmlImage(element, context);
  if (tag === "ac:link") return confluenceLink(element, context, storagePath);
  if (tag === "ac:image") return confluenceImage(element, context, storagePath);
  if (tag === "span" || tag === "div" || tag === "section" || tag === "article" || tag === "body") {
    const rendered = renderChildren(element, context, mode, storagePath);
    return tag === "div" || tag === "section" || tag === "article" || tag === "body" ? `${rendered}
` : rendered;
  }
  return storageFallback(element, context, storagePath);
}
function renderList(element, context, ordered, depth, storagePath) {
  const lines = [];
  let ordinal = 1;
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const child = element.childNodes.item(index);
    if (child === null || child.nodeType !== import_xmldom.Node.ELEMENT_NODE || child.nodeName.toLowerCase() !== "li") continue;
    const item = child;
    let body = "";
    let nested = "";
    for (let childIndex = 0; childIndex < item.childNodes.length; childIndex += 1) {
      const itemChild = item.childNodes.item(childIndex);
      if (itemChild === null) continue;
      if (itemChild.nodeType === import_xmldom.Node.ELEMENT_NODE) {
        const itemTag = itemChild.nodeName.toLowerCase();
        if (itemTag === "ul" || itemTag === "ol") {
          nested += renderList(itemChild, context, itemTag === "ol", depth + 1, `${storagePath}.children[${childIndex}]`).trimEnd();
          continue;
        }
      }
      body += renderNode(itemChild, context, "inline", `${storagePath}.children[${childIndex}]`);
    }
    const marker = ordered ? `${ordinal}. ` : "- ";
    lines.push(`${"  ".repeat(depth)}${marker}${body.trim()}`);
    if (nested.length > 0) lines.push(nested);
    ordinal += 1;
  }
  return lines.length === 0 ? "" : `${lines.join("\n")}

`;
}
function htmlLink(element, context, storagePath) {
  const label = renderChildren(element, context, "inline", storagePath).trim() || element.getAttribute("href") || "link";
  const href = element.getAttribute("href");
  if (href === null || href.length === 0) return label;
  return `[${label}](${escapeMarkdownDestination(href)})`;
}
function htmlImage(element, context) {
  const source = element.getAttribute("src");
  const alt = element.getAttribute("alt") ?? "image";
  if (source === null || source.length === 0) return alt;
  return `![${escapeMarkdownText(alt)}](${escapeMarkdownDestination(source)})`;
}
function confluenceLink(element, context, storagePath) {
  const page = findDescendant(element, "ri:page");
  const attachment = findDescendant(element, "ri:attachment");
  const body = findDescendant(element, "ac:link-body");
  const label = (body === void 0 ? "" : renderChildren(body, context, "inline", storagePath)).trim();
  if (attachment !== void 0) {
    const filename = attribute(attachment, "ri:filename", "filename");
    const attachmentPage = findDescendant(element, "ri:page");
    const attachmentPageId = attachmentPage === void 0 ? context.pageId : attribute(attachmentPage, "ri:content-id", "content-id") ?? context.pageId;
    if (filename !== void 0) {
      const target = resolveAttachment(attachmentPageId, filename, context);
      return `[${label || filename}](${target})`;
    }
  }
  if (page !== void 0) {
    const pageId = attribute(page, "ri:content-id", "content-id");
    if (pageId !== void 0 && /^[0-9]+$/u.test(pageId)) {
      const target = context.pageIds.has(pageId) ? `../${pageId}/page.md` : unresolvedPageTarget(pageId, context);
      return `[${label || pageId}](${target})`;
    }
  }
  return storageFallback(element, context, storagePath);
}
function confluenceImage(element, context, storagePath) {
  const attachment = findDescendant(element, "ri:attachment");
  if (attachment === void 0) return storageFallback(element, context, storagePath);
  const filename = attribute(attachment, "ri:filename", "filename");
  const page = findDescendant(element, "ri:page");
  const attachmentPageId = page === void 0 ? context.pageId : attribute(page, "ri:content-id", "content-id") ?? context.pageId;
  if (filename === void 0) return storageFallback(element, context, storagePath);
  return `![${escapeMarkdownText(filename)}](${resolveAttachment(attachmentPageId, filename, context)})`;
}
function resolveAttachment(pageId, filename, context) {
  const attachment = context.attachmentsByPageId.get(pageId)?.get(filename);
  if (attachment !== void 0) {
    return pageId === context.pageId ? `attachments/${attachment.attachmentId}/${attachment.contentPath}` : `../${pageId}/attachments/${attachment.attachmentId}/${attachment.contentPath}`;
  }
  context.diagnostics.push({
    severity: "warning",
    code: "UNRESOLVED_ATTACHMENT_REFERENCE",
    message: "A Confluence attachment reference could not be mapped to a copied attachment.",
    operation: "snapshot.export-markdown",
    pageId: context.pageId
  });
  return `confluence-attachment:${encodeURIComponent(filename)}`;
}
function unresolvedPageTarget(pageId, context) {
  context.diagnostics.push({
    severity: "warning",
    code: "UNRESOLVED_PAGE_REFERENCE",
    message: "A Confluence page reference is outside the converted snapshot.",
    operation: "snapshot.export-markdown",
    pageId: context.pageId
  });
  return `confluence-page:${pageId}`;
}
function collectStorageAnnotation(element, context, storagePath) {
  const opaqueIdentifiers = {};
  for (let index = 0; index < element.attributes.length; index += 1) {
    const attribute2 = element.attributes.item(index);
    if (attribute2 === null) continue;
    const name = attribute2.nodeName.toLowerCase();
    if (name === "local-id" || name === "ac:local-id" || name === "ac:macro-id") opaqueIdentifiers[attribute2.nodeName] = attribute2.nodeValue ?? "";
  }
  const presentation = {};
  const dataFontSize = element.getAttribute("data-font-size");
  if (dataFontSize !== null && dataFontSize.length > 0) presentation["data-font-size"] = dataFontSize;
  const style = element.getAttribute("style");
  if (style !== null) {
    for (const declaration of style.split(";")) {
      const separator = declaration.indexOf(":");
      if (separator < 1) continue;
      const name = declaration.slice(0, separator).trim().toLowerCase();
      const value = declaration.slice(separator + 1).trim();
      if (value.length > 0 && ["background-color", "color", "font-size", "margin-left", "text-align"].includes(name)) presentation[name] = value;
    }
  }
  const identifierNames = Object.keys(opaqueIdentifiers);
  const presentationNames2 = Object.keys(presentation);
  if (identifierNames.length === 0 && presentationNames2.length === 0) return;
  context.annotations.push({
    nodeName: element.nodeName,
    storagePath,
    ...identifierNames.length === 0 ? {} : { opaqueIdentifiers },
    ...presentationNames2.length === 0 ? {} : { presentation }
  });
  if (presentationNames2.length > 0) {
    context.diagnostics.push({
      severity: "warning",
      code: "PRESENTATION_ATTRIBUTE_PRESERVED",
      message: `Confluence presentation attributes (${presentationNames2.join(", ")}) were preserved in the page attribute sidecar because Markdown has no equivalent.`,
      operation: "snapshot.export-markdown",
      pageId: context.pageId,
      path: storagePath
    });
  }
}
function storageFallback(element, context, storagePath) {
  if (!context.fallbackNodes.has(element)) {
    context.fallbackNodes.add(element);
    context.diagnostics.push({
      severity: "warning",
      code: "UNSUPPORTED_STORAGE_NODE",
      message: "A Confluence storage element was preserved as an explicit Markdown fallback or opaque extension.",
      operation: "snapshot.export-markdown",
      pageId: context.pageId
    });
  }
  const serialized = serializer.serializeToString(element);
  if (/^\$\.children\[[0-9]+\]$/u.test(storagePath)) {
    const placeholder = `__miku_opaque_${context.opaqueBlocks.length + 1}__`;
    const tag = element.nodeName.toLowerCase();
    const kind = tag === "table" ? "complex-table" : tag === "ac:structured-macro" ? "structured-macro" : "storage-node";
    const label = kind === "structured-macro" ? element.getAttribute("ac:name") ?? "macro" : tag;
    context.opaqueBlocks.push({ kind, label, placeholder, storagePath, storageSubtree: serialized });
    return `\`\`\`confluence-extension
blockKey: "${placeholder}"
kind: "${kind}"
label: ${JSON.stringify(label)}
\`\`\`

`;
  }
  const fence = `\`${"`".repeat(Math.max(2, longestBacktickRun(serialized)))}`;
  return `${fence}confluence-storage
${serialized}
${fence}

`;
}
function findDescendant(element, name) {
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const child = element.childNodes.item(index);
    if (child === null || child.nodeType !== import_xmldom.Node.ELEMENT_NODE) continue;
    const childElement = child;
    if (childElement.nodeName.toLowerCase() === name) return childElement;
    const nested = findDescendant(childElement, name);
    if (nested !== void 0) return nested;
  }
  return void 0;
}
function attribute(element, ...names) {
  for (const name of names) {
    const value = element.getAttribute(name);
    if (value !== null && value.length > 0) return value;
  }
  return void 0;
}
function wrap(marker, value) {
  const trimmed = value.trim();
  return trimmed.length === 0 ? "" : `${marker}${trimmed}${marker}`;
}
function inlineCode(value) {
  const fence = `\`${"`".repeat(longestBacktickRun(value))}`;
  return `${fence}${value}${fence}`;
}
function fencedCode(value) {
  const fence = `\`${"`".repeat(Math.max(2, longestBacktickRun(value)))}`;
  return `${fence}
${value.replace(/\n$/u, "")}
${fence}

`;
}
function blockQuote(value) {
  const lines = value.trim().split("\n");
  return lines.length === 0 ? "" : `${lines.map((line) => `> ${line}`).join("\n")}

`;
}
function escapeMarkdownText(value) {
  return value.replace(/([\\`*_[\]<>])/gu, "\\$1");
}
function escapeMarkdownDestination(value) {
  return value.replace(/[\\()\s]/gu, (character) => character === " " ? "%20" : `\\${character}`);
}
function longestBacktickRun(value) {
  return Math.max(0, ...[...value.matchAll(/`+/gu)].map((match) => match[0].length));
}
function normalizeMarkdown(value) {
  const lines = value.replace(/[ \t]+\n/gu, "\n").split("\n");
  const normalized = [];
  let blank = 0;
  for (const line of lines) {
    if (line.trim().length === 0) {
      blank += 1;
      if (blank <= 2) normalized.push("");
      continue;
    }
    blank = 0;
    normalized.push(line.trimEnd());
  }
  return `${normalized.join("\n").trim()}
`;
}
var import_xmldom, serializer;
var init_storage_to_markdown = __esm({
  "src/core/markdown/storage-to-markdown.ts"() {
    "use strict";
    import_xmldom = __toESM(require_lib(), 1);
    serializer = new import_xmldom.XMLSerializer();
  }
});

// src/core/markdown/markdown-storage-profile.ts
import { createHash as createHash2 } from "node:crypto";
function parseWorkingMarkdown(markdown, expectedTitle) {
  try {
    const normalized = normalizeLineEndings(markdown).replace(/^\uFEFF/u, "");
    const lines = normalized.split("\n");
    const titleLine = lines[0] ?? "";
    const titleMatch = /^# (.*)$/u.exec(titleLine);
    if (titleMatch?.[1] === void 0) fail("TITLE_CHANGE_NOT_SUPPORTED", "Working Markdown must begin with the unchanged page title as one level-one heading.", "$.title");
    const titleChildren = parseInline(titleMatch[1], "$.title", false);
    if (!titleChildren.every((child) => child.type === "text")) {
      fail("TITLE_CHANGE_NOT_SUPPORTED", "The document title heading must contain plain text only.", "$.title");
    }
    const title = titleChildren.map((child) => child.type === "text" ? child.value : "").join("");
    if (title !== expectedTitle) {
      fail("TITLE_CHANGE_NOT_SUPPORTED", "The document title differs from the snapshot page title.", "$.title");
    }
    let index = 1;
    if (index < lines.length && lines[index]?.trim().length !== 0) {
      fail("INVALID_MARKDOWN", "A blank line must follow the document title heading.", "$.blocks");
    }
    while (index < lines.length && lines[index]?.trim().length === 0) index += 1;
    const blocks = parseBlocks(lines, index);
    return { ok: true, value: documentFor(title, blocks.value) };
  } catch (error) {
    return { ok: false, problem: toProblem(error) };
  }
}
function parseStorageToNormalized(storage, title) {
  try {
    const document = parseStorageFragment2(storage);
    const root = document.documentElement;
    if (root === null) fail("INVALID_STORAGE_XML", "The Storage XML fragment could not be parsed.");
    const blocks = [];
    for (let index = 0; index < root.childNodes.length; index += 1) {
      const node = root.childNodes.item(index);
      if (node === null) continue;
      const path2 = `$[${index}]`;
      if (node.nodeType === import_xmldom2.Node.TEXT_NODE || node.nodeType === import_xmldom2.Node.CDATA_SECTION_NODE) {
        if ((node.nodeValue ?? "").trim().length === 0) continue;
        fail("UNSUPPORTED_STORAGE_NODE", "Non-whitespace text is not allowed directly in the Storage XML fragment.", path2);
      }
      if (node.nodeType === import_xmldom2.Node.COMMENT_NODE || node.nodeType === import_xmldom2.Node.PROCESSING_INSTRUCTION_NODE) {
        fail("UNSUPPORTED_STORAGE_NODE", "Comments and processing instructions are not writable in profile v1.", path2);
      }
      if (node.nodeType !== import_xmldom2.Node.ELEMENT_NODE) fail("UNSUPPORTED_STORAGE_NODE", "The Storage XML fragment contains an unsupported node.", path2);
      blocks.push(parseBlockElement(node, path2, 0));
    }
    return { ok: true, value: documentFor(title, blocks) };
  } catch (error) {
    return { ok: false, problem: toProblem(error) };
  }
}
function renderStorage(document) {
  return document.blocks.map(renderBlockStorage).join("");
}
function renderMarkdown(document) {
  const title = escapeMarkdownText2(document.title);
  if (document.blocks.length === 0) return `# ${title}
`;
  return `# ${title}

${document.blocks.map(renderBlockMarkdown).join("\n\n").trimEnd()}
`;
}
function normalizedDigest(document) {
  return sha256(canonicalJson(document));
}
function sha256(value) {
  return createHash2("sha256").update(value, "utf8").digest("hex");
}
function canonicalJson(value) {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value) || !Number.isSafeInteger(value)) throw new Error("Only finite safe integer values are supported in canonical JSON.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (typeof value === "object") {
    const object = value;
    return `{${Object.keys(object).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(object[key])}`).join(",")}}`;
  }
  throw new Error("Unsupported canonical JSON value.");
}
function compareNormalized(left, right, leftArtifactSha256, rightArtifactSha256) {
  if (canonicalJson(left) === canonicalJson(right)) {
    return {
      classification: leftArtifactSha256 === rightArtifactSha256 ? "byte-identical" : "structurally-equivalent",
      structurallyEquivalent: true,
      materialDifference: false,
      normalizationNotes: leftArtifactSha256 === rightArtifactSha256 ? [] : ["blank-lines", "soft-line-wrap", "list-marker-style", "emphasis-marker-style", "storage-alias"],
      differences: []
    };
  }
  return {
    classification: "material-difference",
    structurallyEquivalent: false,
    materialDifference: true,
    normalizationNotes: [],
    differences: [{
      kind: "block-structure",
      leftPath: "$.blocks",
      rightPath: "$.blocks",
      material: true,
      summary: "The normalized Markdown structures differ."
    }]
  };
}
function documentFor(title, blocks) {
  return { schemaVersion: normalizedMarkdownSchemaVersion, profileVersion: markdownStorageProfileVersion, title, blocks };
}
function parseBlocks(lines, start) {
  const blocks = [];
  let index = start;
  while (index < lines.length) {
    while (index < lines.length && lines[index]?.trim().length === 0) index += 1;
    if (index >= lines.length) break;
    const line = lines[index] ?? "";
    if (isFence(line)) {
      const parsed2 = parseFencedCode(lines, index);
      blocks.push(parsed2.block);
      index = parsed2.nextIndex;
      continue;
    }
    if (isIndentedCode(line)) {
      const parsed2 = parseIndentedCode(lines, index);
      blocks.push(parsed2.block);
      index = parsed2.nextIndex;
      continue;
    }
    if (isTableStart(lines, index)) {
      const parsed2 = parseTable(lines, index);
      blocks.push(parsed2.block);
      index = parsed2.nextIndex;
      continue;
    }
    const heading = /^(#{1,6})[ \t]+(.+?)\s*$/u.exec(line);
    if (heading?.[1] !== void 0 && heading[2] !== void 0) {
      const level = heading[1].length;
      blocks.push({ type: "heading", level, children: requireInline(parseInline(stripClosingHeadingHashes(heading[2]), `$.blocks[${blocks.length}]`), `$.blocks[${blocks.length}]`) });
      index += 1;
      continue;
    }
    if (isThematicBreak(line)) {
      blocks.push({ type: "thematicBreak" });
      index += 1;
      continue;
    }
    if (/^> ?/u.test(line)) {
      const parsed2 = parseBlockQuote(lines, index, blocks.length);
      blocks.push(parsed2.block);
      index = parsed2.nextIndex;
      continue;
    }
    if (listMarker(line, 0) !== void 0) {
      const parsed2 = parseList(lines, index, 0, 1, blocks.length);
      blocks.push(parsed2.block);
      index = parsed2.nextIndex;
      continue;
    }
    if (/^\s*</u.test(line)) fail("UNSUPPORTED_MARKDOWN_NODE", "Raw HTML is not writable in profile v1.", `$.blocks[${blocks.length}]`);
    const parsed = parseParagraph(lines, index, blocks.length);
    blocks.push(parsed.block);
    index = parsed.nextIndex;
  }
  return { value: blocks };
}
function parseParagraph(lines, start, blockIndex) {
  const children = [];
  let index = start;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (line.trim().length === 0) break;
    if (index !== start && startsBlock(lines, index)) break;
    const hard = hardBreakLine(line);
    appendInlineChildren(children, parseInline(hard.value, `$.blocks[${blockIndex}].children`));
    if (hard.hard) children.push({ type: "hardBreak" });
    else if (index + 1 < lines.length && (lines[index + 1] ?? "").trim().length !== 0 && !startsBlock(lines, index + 1)) appendText(children, " ");
    index += 1;
  }
  return { block: { type: "paragraph", children: requireInline(children, `$.blocks[${blockIndex}]`) }, nextIndex: index };
}
function parseFencedCode(lines, start) {
  const opening = /^\s*(`{3,}|~{3,})(.*)$/u.exec(lines[start] ?? "");
  if (opening?.[1] === void 0 || opening[2] === void 0) fail("INVALID_MARKDOWN", "Invalid fenced code block.");
  if (opening[2].trim().length !== 0) fail("UNSUPPORTED_MARKDOWN_NODE", "Code block language and info strings are not writable in profile v1.", `$.blocks[${start}]`);
  const fence = opening[1];
  const character = fence[0] ?? "`";
  let index = start + 1;
  const content = [];
  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (new RegExp(`^\\s*${escapeRegExp(character)}{${fence.length},}\\s*$`, "u").test(line)) {
      return { block: { type: "codeBlock", language: null, value: content.join("\n") }, nextIndex: index + 1 };
    }
    content.push(line);
    index += 1;
  }
  fail("INVALID_MARKDOWN", "Fenced code block has no closing fence.", `$.blocks[${start}]`);
}
function parseIndentedCode(lines, start) {
  const content = [];
  let index = start;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    if (line.startsWith("    ")) {
      content.push(line.slice(4));
      index += 1;
      continue;
    }
    if (line.length === 0) {
      content.push("");
      index += 1;
      continue;
    }
    break;
  }
  while (content.length > 0 && content[content.length - 1] === "") content.pop();
  return { block: { type: "codeBlock", language: null, value: content.join("\n") }, nextIndex: index };
}
function parseBlockQuote(lines, start, blockIndex) {
  const quoted = [];
  let index = start;
  while (index < lines.length) {
    const line = lines[index] ?? "";
    const match = /^> ?(.*)$/u.exec(line);
    if (match?.[1] === void 0) break;
    if (/^>/u.test(match[1])) fail("UNSUPPORTED_MARKDOWN_NODE", "Nested block quotes are not writable in profile v1.", `$.blocks[${blockIndex}]`);
    quoted.push(match[1]);
    index += 1;
  }
  const children = [];
  let quotedIndex = 0;
  while (quotedIndex < quoted.length) {
    while (quotedIndex < quoted.length && (quoted[quotedIndex] ?? "").trim().length === 0) quotedIndex += 1;
    if (quotedIndex >= quoted.length) break;
    const inline = [];
    while (quotedIndex < quoted.length && (quoted[quotedIndex] ?? "").trim().length !== 0) {
      const line = quoted[quotedIndex] ?? "";
      if (startsBlock(quoted, quotedIndex)) fail("UNSUPPORTED_MARKDOWN_NODE", "Only paragraph content is writable inside a block quote.", `$.blocks[${blockIndex}]`);
      const hard = hardBreakLine(line);
      appendInlineChildren(inline, parseInline(hard.value, `$.blocks[${blockIndex}].children[${children.length}]`));
      if (hard.hard) inline.push({ type: "hardBreak" });
      else if (quotedIndex + 1 < quoted.length && (quoted[quotedIndex + 1] ?? "").trim().length !== 0) appendText(inline, " ");
      quotedIndex += 1;
    }
    children.push({ type: "paragraph", children: requireInline(inline, `$.blocks[${blockIndex}].children[${children.length}]`) });
  }
  if (children.length === 0) fail("INVALID_MARKDOWN", "A block quote must contain at least one paragraph.", `$.blocks[${blockIndex}]`);
  return { block: { type: "blockQuote", children }, nextIndex: index };
}
function parseList(lines, start, indent, depth, blockIndex) {
  if (depth > maxListDepth) fail("LIST_NESTING_LIMIT", "List nesting exceeds the profile v1 limit of four levels.", `$.blocks[${blockIndex}]`);
  const first = listMarker(lines[start] ?? "", indent);
  if (first === void 0) fail("INVALID_MARKDOWN", "Invalid list item.", `$.blocks[${blockIndex}]`);
  if (first.ordered && first.number !== 1) fail("UNSUPPORTED_MARKDOWN_NODE", "Ordered lists must begin at 1 in profile v1.", `$.blocks[${blockIndex}]`);
  const items = [];
  let index = start;
  while (index < lines.length) {
    const marker = listMarker(lines[index] ?? "", indent);
    if (marker === void 0 || marker.ordered !== first.ordered) break;
    if (/^\[[ xX]\][ \t]+/u.test(marker.content)) fail("UNSUPPORTED_MARKDOWN_NODE", "Task list items are not writable in profile v1.", `$.blocks[${blockIndex}].items[${items.length}]`);
    const children = requireInline(parseInline(marker.content, `$.blocks[${blockIndex}].items[${items.length}]`), `$.blocks[${blockIndex}].items[${items.length}]`);
    index += 1;
    let nestedList;
    const next = lines[index];
    if (next !== void 0) {
      const nested = listMarker(next, indent + 2);
      if (nested !== void 0) {
        const parsed = parseList(lines, index, indent + 2, depth + 1, blockIndex);
        nestedList = parsed.block;
        index = parsed.nextIndex;
      } else if (leadingSpaces(next) > indent) {
        fail("UNSUPPORTED_MARKDOWN_NODE", "List items may contain only inline content and one nested list.", `$.blocks[${blockIndex}].items[${items.length}]`);
      }
    }
    items.push(nestedList === void 0 ? { children } : { children, nestedList });
  }
  return { block: { type: "list", ordered: first.ordered, start: first.ordered ? 1 : null, items }, nextIndex: index };
}
function parseTable(lines, start) {
  const headerCells = splitTableRow(lines[start] ?? "");
  const separatorCells = splitTableRow(lines[start + 1] ?? "");
  if (headerCells.length === 0 || headerCells.length !== separatorCells.length || !separatorCells.every((value) => /^-{3,}$/u.test(value.trim()))) {
    fail("TABLE_SHAPE_UNSUPPORTED", "A writable table requires a simple unaligned Markdown header separator.");
  }
  const header = { cells: headerCells.map((cell, index2) => ({ children: parseTableCell(cell, `$.blocks.table.header[${index2}]`) })) };
  const rows = [];
  let index = start + 2;
  while (index < lines.length && isPipeTableLine(lines[index] ?? "")) {
    const values = splitTableRow(lines[index] ?? "");
    if (values.length !== header.cells.length) fail("TABLE_SHAPE_UNSUPPORTED", "Every table row must have the header column count.");
    rows.push({ cells: values.map((cell, cellIndex) => ({ children: parseTableCell(cell, `$.blocks.table.rows[${rows.length}][${cellIndex}]`) })) });
    index += 1;
  }
  if (rows.length === 0 || header.cells.length > 20) fail("TABLE_SHAPE_UNSUPPORTED", "A writable table needs one or more body rows and at most twenty columns.");
  return { block: { type: "table", header, rows }, nextIndex: index };
}
function parseTableCell(value, path2) {
  const children = parseInline(value.trim(), path2);
  if (children.some((child) => child.type === "hardBreak")) fail("TABLE_SHAPE_UNSUPPORTED", "Table cells cannot contain hard breaks.", path2);
  return children;
}
function parseInline(value, path2, allowLinks = true) {
  const result3 = [];
  let index = 0;
  while (index < value.length) {
    const character = value[index] ?? "";
    if (character === "\\") {
      const escaped = value[index + 1];
      if (escaped === void 0) fail("INVALID_MARKDOWN", "A trailing Markdown escape is invalid.", path2);
      appendText(result3, escaped);
      index += 2;
      continue;
    }
    if (value.startsWith("![", index)) fail("UNSUPPORTED_MARKDOWN_NODE", "Images and attachment references are not writable in profile v1.", path2);
    if (character === "[") {
      if (!allowLinks) fail("UNSUPPORTED_MARKDOWN_NODE", "Nested links are not writable in profile v1.", path2);
      const link = parseLink(value, index, path2);
      if (link !== void 0) {
        const children = requireInline(parseInline(link.label, path2, false), path2);
        result3.push({ type: "link", destination: validateExternalLink(link.destination, path2), children });
        index = link.nextIndex;
        continue;
      }
    }
    if (value.startsWith("**", index) || value.startsWith("__", index)) {
      const delimiter = value.slice(index, index + 2);
      const closing = findUnescaped(value, delimiter, index + 2);
      if (closing >= 0) {
        result3.push({ type: "strong", children: requireInline(parseInline(value.slice(index + 2, closing), path2, allowLinks), path2) });
        index = closing + 2;
        continue;
      }
    }
    if (value.startsWith("~~", index)) {
      const closing = findUnescaped(value, "~~", index + 2);
      if (closing >= 0) {
        result3.push({ type: "strike", children: requireInline(parseInline(value.slice(index + 2, closing), path2, allowLinks), path2) });
        index = closing + 2;
        continue;
      }
    }
    if (character === "*" || character === "_") {
      const closing = findUnescaped(value, character, index + 1);
      if (closing >= 0) {
        result3.push({ type: "emphasis", children: requireInline(parseInline(value.slice(index + 1, closing), path2, allowLinks), path2) });
        index = closing + 1;
        continue;
      }
    }
    if (character === "`") {
      const run = backtickRun(value, index);
      const delimiter = "`".repeat(run);
      const closing = value.indexOf(delimiter, index + run);
      if (closing < 0) fail("INVALID_MARKDOWN", "An inline code span has no closing fence.", path2);
      const code = value.slice(index + run, closing);
      if (code.includes("\n")) fail("UNSUPPORTED_MARKDOWN_NODE", "Inline code cannot span lines in profile v1.", path2);
      result3.push({ type: "inlineCode", value: code });
      index = closing + run;
      continue;
    }
    if (character === "<" && /^<\/?[A-Za-z]/u.test(value.slice(index))) {
      fail("UNSUPPORTED_MARKDOWN_NODE", "Raw HTML and autolinks are not writable in profile v1.", path2);
    }
    appendText(result3, character);
    index += 1;
  }
  return result3;
}
function parseLink(value, start, path2) {
  let index = start + 1;
  while (index < value.length) {
    if (value[index] === "\\") {
      index += 2;
      continue;
    }
    if (value.startsWith("](", index)) break;
    index += 1;
  }
  if (!value.startsWith("](", index)) return void 0;
  const label = value.slice(start + 1, index);
  let destinationEnd = index + 2;
  while (destinationEnd < value.length) {
    if (value[destinationEnd] === "\\") {
      destinationEnd += 2;
      continue;
    }
    if (value[destinationEnd] === ")") break;
    destinationEnd += 1;
  }
  if (value[destinationEnd] !== ")") fail("INVALID_MARKDOWN", "An inline link has no closing parenthesis.", path2);
  const destination = value.slice(index + 2, destinationEnd);
  if (destination.length === 0 || /\s/u.test(destination) || destination.includes('"') || destination.includes("'")) {
    fail("UNSUPPORTED_MARKDOWN_NODE", "Link titles and whitespace in destinations are not writable in profile v1.", path2);
  }
  return { label, destination: unescapeMarkdown(destination), nextIndex: destinationEnd + 1 };
}
function parseStorageFragment2(storage) {
  const parser = new import_xmldom2.DOMParser({
    locator: false,
    onError(level, message) {
      if (level === "warning") return;
      throw new ProfileError("INVALID_STORAGE_XML", `Storage XML could not be parsed: ${message}`);
    }
  });
  return parser.parseFromString(
    `<miku-root xmlns:ac="http://atlassian.com/content" xmlns:ri="http://atlassian.com/resource/identifier">${storage}</miku-root>`,
    "application/xml"
  );
}
function parseBlockElement(element, path2, listDepth) {
  const tag = storageTag(element, path2);
  if (tag === "p") return { type: "paragraph", children: requireInline(parseInlineChildren(element, path2), path2) };
  if (/^h[1-6]$/u.test(tag)) {
    return { type: "heading", level: Number.parseInt(tag.slice(1), 10), children: requireInline(parseInlineChildren(element, path2), path2) };
  }
  if (tag === "hr") {
    requireNoAttributes(element, path2);
    requireNoChildContent(element, path2);
    return { type: "thematicBreak" };
  }
  if (tag === "ul" || tag === "ol") return parseStorageList(element, path2, listDepth + 1);
  if (tag === "blockquote") return parseStorageQuote(element, path2);
  if (tag === "pre") {
    requireNoAttributes(element, path2);
    return { type: "codeBlock", language: null, value: textOnly(element, path2).replace(/\r\n?/gu, "\n") };
  }
  if (tag === "table") return parseStorageTable(element, path2);
  fail("UNSUPPORTED_STORAGE_NODE", `Storage element <${element.nodeName}> is outside writable profile v1.`, path2);
}
function parseInlineChildren(element, path2) {
  const result3 = [];
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const node = element.childNodes.item(index);
    if (node === null) continue;
    const nodePath = `${path2}.children[${index}]`;
    if (node.nodeType === import_xmldom2.Node.TEXT_NODE || node.nodeType === import_xmldom2.Node.CDATA_SECTION_NODE) {
      appendText(result3, (node.nodeValue ?? "").replace(/\r\n?|\n/gu, " "));
      continue;
    }
    if (node.nodeType === import_xmldom2.Node.COMMENT_NODE || node.nodeType === import_xmldom2.Node.PROCESSING_INSTRUCTION_NODE) fail("UNSUPPORTED_STORAGE_NODE", "Comments and processing instructions are not writable in profile v1.", nodePath);
    if (node.nodeType !== import_xmldom2.Node.ELEMENT_NODE) fail("UNSUPPORTED_STORAGE_NODE", "The Storage XML contains an unsupported inline node.", nodePath);
    const child = node;
    const tag = storageTag(child, nodePath);
    if (tag === "strong" || tag === "b") {
      requireNoAttributes(child, nodePath);
      result3.push({ type: "strong", children: requireInline(parseInlineChildren(child, nodePath), nodePath) });
      continue;
    }
    if (tag === "em" || tag === "i") {
      requireNoAttributes(child, nodePath);
      result3.push({ type: "emphasis", children: requireInline(parseInlineChildren(child, nodePath), nodePath) });
      continue;
    }
    if (tag === "span") {
      requireExactAttributes(child, { style: "text-decoration: line-through;" }, nodePath);
      result3.push({ type: "strike", children: requireInline(parseInlineChildren(child, nodePath), nodePath) });
      continue;
    }
    if (tag === "del" || tag === "s" || tag === "strike") {
      requireNoAttributes(child, nodePath);
      result3.push({ type: "strike", children: requireInline(parseInlineChildren(child, nodePath), nodePath) });
      continue;
    }
    if (tag === "code") {
      requireNoAttributes(child, nodePath);
      result3.push({ type: "inlineCode", value: textOnly(child, nodePath) });
      continue;
    }
    if (tag === "br") {
      requireNoAttributes(child, nodePath);
      requireNoChildContent(child, nodePath);
      result3.push({ type: "hardBreak" });
      continue;
    }
    if (tag === "a") {
      requireExactAttributeNames(child, ["href"], nodePath);
      const href = child.getAttribute("href");
      if (href === null) fail("UNSAFE_EXTERNAL_LINK", "An external link requires href.", nodePath);
      result3.push({ type: "link", destination: validateExternalLink(href, nodePath), children: requireInline(parseInlineChildren(child, nodePath), nodePath) });
      continue;
    }
    fail("UNSUPPORTED_STORAGE_NODE", `Storage inline element <${child.nodeName}> is outside writable profile v1.`, nodePath);
  }
  return result3;
}
function parseStorageList(element, path2, depth) {
  if (depth > maxListDepth) fail("LIST_NESTING_LIMIT", "List nesting exceeds the profile v1 limit of four levels.", path2);
  requireNoAttributes(element, path2);
  const ordered = storageTag(element, path2) === "ol";
  const items = [];
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const node = element.childNodes.item(index);
    if (node === null) continue;
    const nodePath = `${path2}.items[${items.length}]`;
    if (isWhitespaceNode(node)) continue;
    if (node.nodeType !== import_xmldom2.Node.ELEMENT_NODE || storageTag(node, nodePath) !== "li") fail("UNSUPPORTED_STORAGE_NODE", "A writable list contains only li elements.", nodePath);
    const item = node;
    requireNoAttributes(item, nodePath);
    const inlineNodes = [];
    let nestedList;
    for (let itemIndex = 0; itemIndex < item.childNodes.length; itemIndex += 1) {
      const child = item.childNodes.item(itemIndex);
      if (child === null) continue;
      if (child.nodeType === import_xmldom2.Node.ELEMENT_NODE) {
        const tag = storageTag(child, `${nodePath}.children[${itemIndex}]`);
        if (tag === "ul" || tag === "ol") {
          if (nestedList !== void 0 || itemIndex !== item.childNodes.length - 1) fail("UNSUPPORTED_STORAGE_NODE", "A list item may end with one nested list only.", nodePath);
          nestedList = parseStorageList(child, `${nodePath}.nestedList`, depth + 1);
          continue;
        }
      }
      inlineNodes.push(child);
    }
    const children = requireInline(parseInlineNodeList(inlineNodes, nodePath), nodePath);
    items.push(nestedList === void 0 ? { children } : { children, nestedList });
  }
  if (items.length === 0) fail("INVALID_STORAGE_XML", "A writable list must contain one or more list items.", path2);
  return { type: "list", ordered, start: ordered ? 1 : null, items };
}
function parseStorageQuote(element, path2) {
  requireNoAttributes(element, path2);
  const children = [];
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const node = element.childNodes.item(index);
    if (node === null || isWhitespaceNode(node)) continue;
    const nodePath = `${path2}.children[${children.length}]`;
    if (node.nodeType !== import_xmldom2.Node.ELEMENT_NODE || storageTag(node, nodePath) !== "p") fail("UNSUPPORTED_STORAGE_NODE", "A writable block quote contains paragraphs only.", nodePath);
    const paragraph = node;
    children.push({ type: "paragraph", children: requireInline(parseInlineChildren(paragraph, nodePath), nodePath) });
  }
  if (children.length === 0) fail("INVALID_STORAGE_XML", "A writable block quote must contain one or more paragraphs.", path2);
  return { type: "blockQuote", children };
}
function parseStorageTable(element, path2) {
  requireNoAttributes(element, path2);
  const direct = meaningfulElementChildren(element, path2);
  const tbody = direct.length === 1 && storageTag(direct[0], `${path2}.tbody`) === "tbody" ? direct[0] : void 0;
  if (tbody !== void 0) requireNoAttributes(tbody, `${path2}.tbody`);
  const rowContainer = tbody === void 0 ? direct : meaningfulElementChildren(tbody, `${path2}.tbody`);
  if (rowContainer.length < 2) fail("TABLE_SHAPE_UNSUPPORTED", "A writable table requires one header row and one or more body rows.", path2);
  const rows = rowContainer.map((row, rowIndex) => parseStorageTableRow(row, `${path2}.rows[${rowIndex}]`, rowIndex === 0));
  const width = rows[0]?.cells.length ?? 0;
  if (width === 0 || width > 20 || rows.some((row) => row.cells.length !== width)) fail("TABLE_SHAPE_UNSUPPORTED", "Every writable table row must have the same one-to-twenty column count.", path2);
  return { type: "table", header: rows[0], rows: rows.slice(1) };
}
function parseStorageTableRow(element, path2, header) {
  if (storageTag(element, path2) !== "tr") fail("TABLE_SHAPE_UNSUPPORTED", "A writable table contains tr rows only.", path2);
  requireNoAttributes(element, path2);
  const expectedTag = header ? "th" : "td";
  const cells = [];
  for (const child of meaningfulElementChildren(element, path2)) {
    const cellPath = `${path2}.cells[${cells.length}]`;
    if (storageTag(child, cellPath) !== expectedTag) fail("TABLE_SHAPE_UNSUPPORTED", "Table header and body cells cannot be mixed.", cellPath);
    requireNoAttributes(child, cellPath);
    const children = parseInlineChildren(child, cellPath);
    if (children.some((inline) => inline.type === "hardBreak")) fail("TABLE_SHAPE_UNSUPPORTED", "Table cells cannot contain hard breaks.", cellPath);
    cells.push({ children });
  }
  if (cells.length === 0) fail("TABLE_SHAPE_UNSUPPORTED", "A writable table row must have cells.", path2);
  return { cells };
}
function parseInlineNodeList(nodes, path2) {
  const holder = { childNodes: nodes };
  const result3 = [];
  for (let index = 0; index < holder.childNodes.length; index += 1) {
    const node = holder.childNodes[index];
    if (node === void 0) continue;
    const temporary = parseInlineNode(node, `${path2}.children[${index}]`);
    if (temporary.type === "text") appendText(result3, temporary.value);
    else result3.push(temporary);
  }
  return result3;
}
function parseInlineNode(node, path2) {
  if (node.nodeType === import_xmldom2.Node.TEXT_NODE || node.nodeType === import_xmldom2.Node.CDATA_SECTION_NODE) return { type: "text", value: (node.nodeValue ?? "").replace(/\r\n?|\n/gu, " ") };
  if (node.nodeType !== import_xmldom2.Node.ELEMENT_NODE) fail("UNSUPPORTED_STORAGE_NODE", "The Storage XML contains an unsupported inline node.", path2);
  const holder = node.ownerDocument?.createElement("miku-inline-holder");
  if (holder === void 0) fail("INVALID_STORAGE_XML", "The Storage XML node has no owner document.", path2);
  holder.appendChild(node.cloneNode(true));
  const children = parseInlineChildren(holder, path2);
  if (children.length !== 1) fail("UNSUPPORTED_STORAGE_NODE", "The Storage XML inline node could not be normalized.", path2);
  return children[0];
}
function renderBlockStorage(block) {
  if (block.type === "paragraph") return `<p>${renderInlineStorage(block.children)}</p>`;
  if (block.type === "heading") return `<h${block.level}>${renderInlineStorage(block.children)}</h${block.level}>`;
  if (block.type === "thematicBreak") return "<hr />";
  if (block.type === "list") return renderListStorage(block);
  if (block.type === "blockQuote") return `<blockquote>${block.children.map(renderBlockStorage).join("")}</blockquote>`;
  if (block.type === "codeBlock") return `<pre>${escapeXmlText(block.value)}</pre>`;
  return `<table><tbody><tr>${block.header.cells.map((cell) => `<th>${renderInlineStorage(cell.children)}</th>`).join("")}</tr>${block.rows.map((row) => `<tr>${row.cells.map((cell) => `<td>${renderInlineStorage(cell.children)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
}
function renderListStorage(list) {
  const tag = list.ordered ? "ol" : "ul";
  return `<${tag}>${list.items.map((item) => `<li>${renderInlineStorage(item.children)}${item.nestedList === void 0 ? "" : renderListStorage(item.nestedList)}</li>`).join("")}</${tag}>`;
}
function renderInlineStorage(children) {
  return children.map((child) => {
    if (child.type === "text") return escapeXmlText(child.value);
    if (child.type === "strong") return `<strong>${renderInlineStorage(child.children)}</strong>`;
    if (child.type === "emphasis") return `<em>${renderInlineStorage(child.children)}</em>`;
    if (child.type === "strike") return `<span style="text-decoration: line-through;">${renderInlineStorage(child.children)}</span>`;
    if (child.type === "inlineCode") return `<code>${escapeXmlText(child.value)}</code>`;
    if (child.type === "hardBreak") return "<br />";
    if (child.type === "link") return `<a href="${escapeXmlAttribute(child.destination)}">${renderInlineStorage(child.children)}</a>`;
    throw new Error("Unknown normalized inline node.");
  }).join("");
}
function renderBlockMarkdown(block) {
  if (block.type === "paragraph") return renderInlineMarkdown(block.children);
  if (block.type === "heading") return `${"#".repeat(block.level)} ${renderInlineMarkdown(block.children)}`;
  if (block.type === "thematicBreak") return "---";
  if (block.type === "list") return renderListMarkdown(block, 0);
  if (block.type === "blockQuote") return block.children.map((paragraph) => renderInlineMarkdown(paragraph.children).split("\n").map((line) => `> ${line}`).join("\n")).join("\n>\n");
  if (block.type === "codeBlock") {
    const fence = `\`${"`".repeat(Math.max(2, longestBacktickRun2(block.value)))}`;
    return `${fence}
${block.value}
${fence}`;
  }
  const header = `| ${block.header.cells.map((cell) => renderInlineMarkdown(cell.children)).join(" | ")} |`;
  const separator = `| ${block.header.cells.map(() => "---").join(" | ")} |`;
  const rows = block.rows.map((row) => `| ${row.cells.map((cell) => renderInlineMarkdown(cell.children)).join(" | ")} |`);
  return [header, separator, ...rows].join("\n");
}
function renderListMarkdown(list, depth) {
  const lines = [];
  for (let index = 0; index < list.items.length; index += 1) {
    const item = list.items[index];
    lines.push(`${"  ".repeat(depth)}${list.ordered ? `${index + 1}.` : "-"} ${renderInlineMarkdown(item.children)}`);
    if (item.nestedList !== void 0) lines.push(renderListMarkdown(item.nestedList, depth + 1));
  }
  return lines.join("\n");
}
function renderInlineMarkdown(children) {
  return children.map((child) => {
    if (child.type === "text") return escapeMarkdownText2(child.value);
    if (child.type === "strong") return `**${renderInlineMarkdown(child.children)}**`;
    if (child.type === "emphasis") return `*${renderInlineMarkdown(child.children)}*`;
    if (child.type === "strike") return `~~${renderInlineMarkdown(child.children)}~~`;
    if (child.type === "inlineCode") {
      const fence = "`".repeat(Math.max(1, longestBacktickRun2(child.value) + 1));
      return `${fence}${child.value}${fence}`;
    }
    if (child.type === "hardBreak") return "\\\n";
    if (child.type === "link") return `[${renderInlineMarkdown(child.children)}](${child.destination})`;
    throw new Error("Unknown normalized inline node.");
  }).join("");
}
function storageTag(element, path2) {
  const name = element.nodeName.toLowerCase();
  if (name.includes(":")) fail("UNSUPPORTED_STORAGE_NODE", `Namespaced Storage element <${element.nodeName}> is outside writable profile v1.`, path2);
  return name;
}
function requireNoAttributes(element, path2) {
  if (element.attributes.length !== 0) fail("UNSUPPORTED_STORAGE_ATTRIBUTE", `Storage element <${element.nodeName}> has unsupported attributes.`, path2);
}
function requireExactAttributes(element, expected, path2) {
  const names = Object.keys(expected);
  requireExactAttributeNames(element, names, path2);
  for (const name of names) {
    if (element.getAttribute(name) !== expected[name]) fail("UNSUPPORTED_STORAGE_ATTRIBUTE", `Storage attribute ${name} has an unsupported value.`, path2);
  }
}
function requireExactAttributeNames(element, expected, path2) {
  if (element.attributes.length !== expected.length) fail("UNSUPPORTED_STORAGE_ATTRIBUTE", `Storage element <${element.nodeName}> has unsupported attributes.`, path2);
  for (const name of expected) {
    if (!element.hasAttribute(name)) fail("UNSUPPORTED_STORAGE_ATTRIBUTE", `Storage element <${element.nodeName}> is missing required attribute ${name}.`, path2);
  }
}
function requireNoChildContent(element, path2) {
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const child = element.childNodes.item(index);
    if (child !== null && !isWhitespaceNode(child)) fail("UNSUPPORTED_STORAGE_NODE", `Storage element <${element.nodeName}> cannot contain child content.`, path2);
  }
}
function textOnly(element, path2) {
  let output = "";
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const child = element.childNodes.item(index);
    if (child === null) continue;
    if (child.nodeType !== import_xmldom2.Node.TEXT_NODE && child.nodeType !== import_xmldom2.Node.CDATA_SECTION_NODE) fail("UNSUPPORTED_STORAGE_NODE", `Storage element <${element.nodeName}> cannot contain nested elements.`, path2);
    output += child.nodeValue ?? "";
  }
  return output;
}
function meaningfulElementChildren(element, path2) {
  const result3 = [];
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const child = element.childNodes.item(index);
    if (child === null || isWhitespaceNode(child)) continue;
    if (child.nodeType !== import_xmldom2.Node.ELEMENT_NODE) fail("UNSUPPORTED_STORAGE_NODE", "The Storage XML contains unsupported table content.", path2);
    result3.push(child);
  }
  return result3;
}
function isWhitespaceNode(node) {
  return (node.nodeType === import_xmldom2.Node.TEXT_NODE || node.nodeType === import_xmldom2.Node.CDATA_SECTION_NODE) && (node.nodeValue ?? "").trim().length === 0;
}
function validateExternalLink(value, path2) {
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail("UNSAFE_EXTERNAL_LINK", "External links must use an absolute HTTPS URL.", path2);
  }
  if (parsed.protocol !== "https:" || parsed.hostname.length === 0 || parsed.username.length !== 0 || parsed.password.length !== 0) {
    fail("UNSAFE_EXTERNAL_LINK", "External links must use HTTPS without user information.", path2);
  }
  return value;
}
function requireInline(children, path2) {
  if (children.length === 0) fail("INVALID_MARKDOWN", "Content must not be empty in writable profile v1.", path2);
  return children;
}
function appendText(children, value) {
  if (value.length === 0) return;
  const previous = children[children.length - 1];
  if (previous?.type === "text") children[children.length - 1] = { type: "text", value: previous.value + value };
  else children.push({ type: "text", value });
}
function appendInlineChildren(target, source) {
  for (const child of source) {
    if (child.type === "text") appendText(target, child.value);
    else target.push(child);
  }
}
function startsBlock(lines, index) {
  const line = lines[index] ?? "";
  return isFence(line) || isIndentedCode(line) || isTableStart(lines, index) || /^(#{1,6})[ \t]+/u.test(line) || isThematicBreak(line) || /^> ?/u.test(line) || listMarker(line, 0) !== void 0;
}
function isFence(line) {
  return /^\s*(`{3,}|~{3,})/u.test(line);
}
function isIndentedCode(line) {
  return line.startsWith("    ");
}
function isThematicBreak(line) {
  return /^(?:\s*-\s*){3,}$/u.test(line) || /^(?:\s*\*\s*){3,}$/u.test(line) || /^(?:\s*_\s*){3,}$/u.test(line);
}
function isTableStart(lines, index) {
  return isPipeTableLine(lines[index] ?? "") && isPipeTableLine(lines[index + 1] ?? "") && splitTableRow(lines[index + 1] ?? "").every((value) => /^\s*-{3,}\s*$/u.test(value));
}
function isPipeTableLine(line) {
  return line.includes("|");
}
function splitTableRow(line) {
  const trimmed = line.trim();
  const body = trimmed.startsWith("|") ? trimmed.slice(1) : trimmed;
  const withoutTrailing = body.endsWith("|") ? body.slice(0, -1) : body;
  const values = [];
  let current = "";
  let escaped = false;
  for (const character of withoutTrailing) {
    if (escaped) {
      current += `\\${character}`;
      escaped = false;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (character === "|") {
      values.push(current);
      current = "";
      continue;
    }
    current += character;
  }
  if (escaped) current += "\\";
  values.push(current);
  return values;
}
function listMarker(line, indent) {
  const match = new RegExp(`^ {${indent}}(?:([-+*])|([0-9]+)\\.)[ \\t]+(.*)$`, "u").exec(line);
  if (match?.[3] === void 0) return void 0;
  return { ordered: match[2] !== void 0, number: match[2] === void 0 ? void 0 : Number.parseInt(match[2], 10), content: match[3] };
}
function leadingSpaces(value) {
  return /^ */u.exec(value)?.[0].length ?? 0;
}
function hardBreakLine(line) {
  if (/ {2,}$/u.test(line)) return { hard: true, value: line.replace(/ {2,}$/u, "") };
  let backslashes = 0;
  for (let index = line.length - 1; index >= 0 && line[index] === "\\"; index -= 1) backslashes += 1;
  return backslashes % 2 === 1 ? { hard: true, value: line.slice(0, -1) } : { hard: false, value: line };
}
function stripClosingHeadingHashes(value) {
  return value.replace(/[ \t]+#+[ \t]*$/u, "");
}
function findUnescaped(value, delimiter, start) {
  for (let index = start; index <= value.length - delimiter.length; index += 1) {
    if (value[index] === "\\") {
      index += 1;
      continue;
    }
    if (value.startsWith(delimiter, index)) return index;
  }
  return -1;
}
function backtickRun(value, start) {
  let run = 0;
  while (value[start + run] === "`") run += 1;
  return run;
}
function longestBacktickRun2(value) {
  return Math.max(0, ...[...value.matchAll(/`+/gu)].map((match) => match[0].length));
}
function normalizeLineEndings(value) {
  return value.replace(/\r\n?/gu, "\n");
}
function unescapeMarkdown(value) {
  return value.replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/gu, "$1");
}
function escapeMarkdownText2(value) {
  return value.replace(/([\\`*_[\]~<>|])/gu, "\\$1");
}
function escapeXmlText(value) {
  return value.replace(/&/gu, "&amp;").replace(/</gu, "&lt;").replace(/>/gu, "&gt;");
}
function escapeXmlAttribute(value) {
  return escapeXmlText(value).replace(/"/gu, "&quot;");
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function fail(code, message, nodePath) {
  throw new ProfileError(code, message, nodePath);
}
function toProblem(error) {
  if (error instanceof ProfileError) {
    return error.nodePath === void 0 ? { code: error.code, message: error.message } : { code: error.code, message: error.message, nodePath: error.nodePath };
  }
  return { code: "INVALID_STORAGE_XML", message: "The Markdown or Storage XML representation could not be normalized." };
}
var import_xmldom2, markdownStorageProfileVersion, normalizedMarkdownSchemaVersion, maxListDepth, ProfileError;
var init_markdown_storage_profile = __esm({
  "src/core/markdown/markdown-storage-profile.ts"() {
    "use strict";
    import_xmldom2 = __toESM(require_lib(), 1);
    markdownStorageProfileVersion = "miku-confluence.markdown-storage-profile/v1";
    normalizedMarkdownSchemaVersion = "miku-confluence.normalized-markdown/v1";
    maxListDepth = 4;
    ProfileError = class extends Error {
      constructor(code, message, nodePath) {
        super(message);
        this.code = code;
        this.nodePath = nodePath;
      }
      code;
      nodePath;
    };
  }
});

// src/core/markdown/preservation.ts
function buildPreservationBaseline(pageId, renderedBlocks) {
  const pending = [];
  for (const rendered of renderedBlocks) {
    for (const normalized of parsePreservationBody(rendered.markdown)) {
      pending.push({
        normalized,
        nodeName: rendered.nodeName,
        storagePath: rendered.storagePath,
        storageSubtreeSha256: sha256(rendered.storageSubtree)
      });
    }
  }
  const occurrences = /* @__PURE__ */ new Map();
  const keys = pending.map((block, index) => {
    const markdownPath2 = `$.blocks[${index}]`;
    const occurrenceKey = `${block.storagePath}\0${block.nodeName}`;
    const occurrence = (occurrences.get(occurrenceKey) ?? 0) + 1;
    occurrences.set(occurrenceKey, occurrence);
    return {
      key: `b-${sha256(canonicalJson({ markdownPath: markdownPath2, nodeName: block.nodeName, pageId, storagePath: block.storagePath, storageSubtreeSha256: block.storageSubtreeSha256 }))}`,
      markdownPath: markdownPath2,
      occurrence
    };
  });
  return pending.map((block, index) => {
    const key = keys[index];
    if (key === void 0) throw new Error("Missing preservation block key.");
    const normalizedSha256 = sha256(canonicalJson(block.normalized));
    const previousKey = index === 0 ? void 0 : keys[index - 1]?.key;
    const nextKey = index + 1 >= keys.length ? void 0 : keys[index + 1]?.key;
    return {
      blockKey: key.key,
      nodeName: block.nodeName,
      storagePath: block.storagePath,
      storageSubtreeSha256: block.storageSubtreeSha256,
      baseline: {
        kind: block.normalized.kind,
        markdownPath: key.markdownPath,
        normalized: block.normalized,
        normalizedSha256,
        parentKey: null,
        ...previousKey === void 0 ? {} : { previousKey },
        ...nextKey === void 0 ? {} : { nextKey },
        occurrence: key.occurrence
      }
    };
  });
}
function linkAnnotationsToBlocks(annotations, blocks) {
  return annotations.map((annotation) => {
    const matching = blocks.filter((block2) => annotation.storagePath === block2.storagePath || annotation.storagePath.startsWith(`${block2.storagePath}.children[`)).sort((left, right) => right.storagePath.length - left.storagePath.length);
    const block = matching[0];
    return block === void 0 ? annotation : { ...annotation, blockKey: block.blockKey };
  });
}
function buildPreservationInlineRanges(storage, annotations, blocks) {
  const document = parseStorageFragment3(storage);
  const result3 = [];
  for (const annotation of annotations) {
    if (annotation.blockKey === void 0 || annotation.presentation === void 0) continue;
    const block = blocks.find((item) => item.blockKey === annotation.blockKey);
    const element = sourceElementAt(document, annotation.storagePath);
    const blockElement = block === void 0 ? void 0 : sourceElementAt(document, block.storagePath);
    if (block === void 0 || element === void 0 || blockElement === void 0) continue;
    const sourceText = normalizeInlineText(element.textContent ?? "");
    const blockText = normalizeInlineText(blockElement.textContent ?? "");
    const occurrenceCount = sourceText.length === 0 ? 0 : countOccurrences(blockText, sourceText);
    const start = occurrenceCount === 1 ? blockText.indexOf(sourceText) : -1;
    for (const [attribute2, value] of Object.entries(annotation.presentation)) {
      if (!isInlinePresentationAttribute(attribute2)) continue;
      const sourceTextSha256 = sha256(sourceText);
      const itemKey = `i-${sha256(canonicalJson({ attribute: attribute2, blockKey: annotation.blockKey, sourceTextSha256, storagePath: annotation.storagePath, value }))}`;
      result3.push({
        itemKey,
        attribute: attribute2,
        blockKey: annotation.blockKey,
        normalizedInlinePath: normalizedInlinePath(block, annotation.storagePath),
        ...start < 0 ? {} : { sourceRange: { start, end: start + sourceText.length } },
        sourceText,
        sourceTextSha256,
        sourceTextOccurrenceCount: occurrenceCount,
        storagePath: annotation.storagePath
      });
    }
  }
  return result3.sort((left, right) => left.itemKey < right.itemKey ? -1 : left.itemKey > right.itemKey ? 1 : 0);
}
function parsePreservationDocument(markdown, expectedTitle) {
  const normalized = markdown.replace(/\r\n?/gu, "\n").replace(/^\uFEFF/u, "");
  if (!normalized.startsWith("---\n")) return { ok: false, reason: "The working Markdown must begin with generated mikuConfluence front matter." };
  const closing = normalized.indexOf("\n---\n", 4);
  if (closing < 0) return { ok: false, reason: "The generated front matter must have one closing delimiter." };
  const frontMatter = parseFrontMatter(normalized.slice(4, closing));
  if (frontMatter.ok === false) return frontMatter;
  const afterFrontMatter = normalized.slice(closing + "\n---\n".length);
  const heading = /^\n*# (.*)\n(?:\n|$)/u.exec(afterFrontMatter);
  if (heading?.[1] === void 0) return { ok: false, reason: "The front matter must be followed by the unchanged level-one page title." };
  const title = unescapeHeading(heading[1]);
  if (title !== expectedTitle) return { ok: false, reason: "The document title differs from the snapshot page title." };
  const body = afterFrontMatter.slice(heading[0].length);
  return { ok: true, value: { frontMatter: frontMatter.value, body, blocks: parsePreservationBody(body) } };
}
function parseConfluenceExtensionBlock(source) {
  const lines = source.replace(/\r\n?/gu, "\n").split("\n");
  if ((lines[0] ?? "") !== "```confluence-extension") return { extension: false };
  if (lines.length !== 5 || lines[4] !== "```") return { extension: true, ok: false };
  const blockKey = /^blockKey: "(b-[a-f0-9]{64})"$/u.exec(lines[1] ?? "")?.[1];
  const kind = /^kind: "(complex-table|storage-node|structured-macro)"$/u.exec(lines[2] ?? "")?.[1];
  const labelMatch = /^label: ("(?:[^"\\]|\\["\\/bfnrt]|\\u[0-9a-fA-F]{4})*")$/u.exec(lines[3] ?? "");
  if (blockKey === void 0 || !isOpaqueExtensionKind(kind) || labelMatch?.[1] === void 0) return { extension: true, ok: false };
  try {
    const label = JSON.parse(labelMatch[1]);
    return typeof label === "string" && label.length > 0 && !/[\r\n]/u.test(label) ? { extension: true, ok: true, value: { blockKey, kind, label } } : { extension: true, ok: false };
  } catch {
    return { extension: true, ok: false };
  }
}
function parsePreservationBody(markdown) {
  return parsePreservationBodyBlocks(markdown).map((block) => block.normalized);
}
function parsePreservationBodyBlocks(markdown) {
  const lines = markdown.replace(/\r\n?/gu, "\n").replace(/^\uFEFF/u, "").split("\n");
  const blocks = [];
  let index = 0;
  while (index < lines.length) {
    while (index < lines.length && (lines[index] ?? "").trim().length === 0) index += 1;
    if (index >= lines.length) break;
    const line = lines[index] ?? "";
    const fence = /^\s*(`{3,}|~{3,})(.*)$/u.exec(line);
    if (fence?.[1] !== void 0) {
      const marker = fence[1];
      const character = marker[0] ?? "`";
      const chunk2 = [line];
      index += 1;
      while (index < lines.length) {
        const current = lines[index] ?? "";
        chunk2.push(current);
        index += 1;
        if (new RegExp(`^\\s*${escapeRegExp2(character)}{${marker.length},}\\s*$`, "u").test(current)) break;
      }
      const source2 = chunk2.join("\n");
      blocks.push({ source: source2, normalized: normalizedBlock("fencedCode", source2) });
      continue;
    }
    if (/^(#{1,6})[ \t]+/u.test(line)) {
      blocks.push({ source: line, normalized: normalizedBlock("heading", line) });
      index += 1;
      continue;
    }
    if (/^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/u.test(line)) {
      blocks.push({ source: line, normalized: normalizedBlock("thematicBreak", line) });
      index += 1;
      continue;
    }
    if (/^> ?/u.test(line)) {
      const chunk2 = [];
      while (index < lines.length && /^> ?/u.test(lines[index] ?? "")) {
        chunk2.push(lines[index] ?? "");
        index += 1;
      }
      const source2 = chunk2.join("\n");
      blocks.push({ source: source2, normalized: normalizedBlock("blockQuote", source2) });
      continue;
    }
    if (/^\s*(?:[-+*]|[0-9]+\.)[ \t]+/u.test(line)) {
      const chunk2 = [];
      while (index < lines.length) {
        const current = lines[index] ?? "";
        if (current.trim().length === 0) break;
        if (!/^\s*(?:[-+*]|[0-9]+\.)[ \t]+/u.test(current) && !/^\s{2,}/u.test(current)) break;
        chunk2.push(current);
        index += 1;
      }
      const source2 = chunk2.join("\n");
      blocks.push({ source: source2, normalized: normalizedBlock("list", source2) });
      continue;
    }
    if (looksLikeTable(lines, index)) {
      const chunk2 = [];
      while (index < lines.length && (lines[index] ?? "").trim().length > 0 && /\|/u.test(lines[index] ?? "")) {
        chunk2.push(lines[index] ?? "");
        index += 1;
      }
      const source2 = chunk2.join("\n");
      blocks.push({ source: source2, normalized: normalizedBlock("table", source2) });
      continue;
    }
    const chunk = [];
    while (index < lines.length && (lines[index] ?? "").trim().length > 0) {
      if (chunk.length > 0 && startsPreservationBlock(lines, index)) break;
      chunk.push(lines[index] ?? "");
      index += 1;
    }
    const source = chunk.join("\n");
    blocks.push({ source, normalized: normalizedBlock("paragraph", source) });
  }
  return blocks;
}
function mapPreservationBlocks(baseline, working) {
  if (baseline.length === working.length && baseline.every((source, index) => source.baseline.normalizedSha256 === sha256(canonicalJson(working[index])))) {
    return {
      mappings: baseline.map((source, index) => ({
        blockKey: source.blockKey,
        sourceMarkdownPath: source.baseline.markdownPath,
        sourceStoragePath: source.storagePath,
        state: "unchanged",
        targetMarkdownPath: markdownPath(index),
        rule: "body-identical"
      })),
      newWorkingMarkdownPaths: []
    };
  }
  const mappings = new Array(baseline.length);
  const usedTargets = /* @__PURE__ */ new Set();
  const sourceGroups = groupIndexes(baseline.map((block) => block.baseline.normalizedSha256));
  const targetGroups = groupIndexes(working.map((block) => sha256(canonicalJson(block))));
  for (const [digest3, sourceIndexes] of sourceGroups) {
    const targetIndexes = targetGroups.get(digest3) ?? [];
    if (sourceIndexes.length === 1 && targetIndexes.length === 1) {
      const sourceIndex = sourceIndexes[0];
      const targetIndex = targetIndexes[0];
      if (sourceIndex === void 0 || targetIndex === void 0) continue;
      const block = baseline[sourceIndex];
      if (block === void 0) continue;
      mappings[sourceIndex] = {
        blockKey: block.blockKey,
        sourceMarkdownPath: block.baseline.markdownPath,
        sourceStoragePath: block.storagePath,
        state: sourceIndex === targetIndex ? "unchanged" : "moved",
        targetMarkdownPath: markdownPath(targetIndex),
        rule: "unique-normalized-subtree"
      };
      usedTargets.add(targetIndex);
      continue;
    }
    if (sourceIndexes.length > 1 || targetIndexes.length > 1) {
      for (const sourceIndex of sourceIndexes) {
        const block = baseline[sourceIndex];
        if (block === void 0) continue;
        mappings[sourceIndex] = {
          blockKey: block.blockKey,
          sourceMarkdownPath: block.baseline.markdownPath,
          sourceStoragePath: block.storagePath,
          state: "ambiguous"
        };
      }
    }
  }
  for (let sourceIndex = 0; sourceIndex < baseline.length; sourceIndex += 1) {
    if (mappings[sourceIndex] !== void 0) continue;
    const source = baseline[sourceIndex];
    if (source === void 0) continue;
    const previousTarget = sourceIndex === 0 ? -1 : targetIndexFor(mappings[sourceIndex - 1]);
    const nextTarget = sourceIndex + 1 >= baseline.length ? working.length : targetIndexFor(mappings[sourceIndex + 1]);
    if (previousTarget === void 0 || nextTarget === void 0 || nextTarget <= previousTarget) continue;
    const candidates = [];
    for (let targetIndex2 = previousTarget + 1; targetIndex2 < nextTarget; targetIndex2 += 1) {
      if (!usedTargets.has(targetIndex2) && working[targetIndex2]?.kind === source.baseline.kind) candidates.push(targetIndex2);
    }
    if (candidates.length !== 1) continue;
    const targetIndex = candidates[0];
    if (targetIndex === void 0) continue;
    mappings[sourceIndex] = {
      blockKey: source.blockKey,
      sourceMarkdownPath: source.baseline.markdownPath,
      sourceStoragePath: source.storagePath,
      state: "edited",
      targetMarkdownPath: markdownPath(targetIndex),
      rule: "unique-anchored-edit"
    };
    usedTargets.add(targetIndex);
  }
  for (let sourceIndex = 0; sourceIndex < baseline.length; sourceIndex += 1) {
    if (mappings[sourceIndex] !== void 0) continue;
    const source = baseline[sourceIndex];
    if (source === void 0) continue;
    const candidates = working.map((block, targetIndex) => ({ block, targetIndex })).filter(({ block, targetIndex }) => !usedTargets.has(targetIndex) && block.kind === source.baseline.kind);
    const state = candidates.length > 1 ? "ambiguous" : candidates.length === 0 && working[sourceIndex] !== void 0 && working[sourceIndex]?.kind !== source.baseline.kind ? "incompatible" : "deleted";
    mappings[sourceIndex] = {
      blockKey: source.blockKey,
      sourceMarkdownPath: source.baseline.markdownPath,
      sourceStoragePath: source.storagePath,
      state
    };
  }
  return {
    mappings: mappings.filter((mapping) => mapping !== void 0),
    newWorkingMarkdownPaths: working.map((_block, index) => index).filter((index) => !usedTargets.has(index)).map(markdownPath)
  };
}
function validatePreservationSidecar(value) {
  if (!isRecord3(value) || value.schemaVersion !== pageAttributesSchemaVersion || !isPageId(value.pageId) || !isRecord3(value.source) || !Array.isArray(value.blocks) || !Array.isArray(value.extensions) || !Array.isArray(value.inlineRanges) || !Array.isArray(value.annotations)) {
    return { ok: false, reason: "The attribute sidecar is not a supported preservation sidecar." };
  }
  const source = value.source;
  if (!isDigest(source.storageSha256) || !isDigest(source.markdownBodySha256) || source.mappingProfile !== "miku-confluence.markdown-block-map/v1" || source.version !== void 0 && (typeof source.version !== "number" || !Number.isSafeInteger(source.version) || source.version < 1)) {
    return { ok: false, reason: "The preservation sidecar source metadata is invalid." };
  }
  const blocks = [];
  const seenKeys = /* @__PURE__ */ new Set();
  for (let index = 0; index < value.blocks.length; index += 1) {
    const parsed = parseBaselineBlock(value.blocks[index], value.pageId, index);
    if (parsed.ok === false || seenKeys.has(parsed.value.blockKey)) return { ok: false, reason: parsed.ok === false ? parsed.reason : "The preservation sidecar repeats a block key." };
    seenKeys.add(parsed.value.blockKey);
    blocks.push(parsed.value);
  }
  const annotations = [];
  for (const item of value.annotations) {
    if (!isRecord3(item) || typeof item.nodeName !== "string" || typeof item.storagePath !== "string") return { ok: false, reason: "The preservation sidecar has an invalid annotation." };
    if (item.blockKey !== void 0 && (typeof item.blockKey !== "string" || !seenKeys.has(item.blockKey))) return { ok: false, reason: "The preservation sidecar annotation refers to an unknown block key." };
    const opaqueIdentifiers = stringRecord(item.opaqueIdentifiers);
    const presentation = stringRecord(item.presentation);
    annotations.push({
      nodeName: item.nodeName,
      storagePath: item.storagePath,
      ...typeof item.blockKey === "string" ? { blockKey: item.blockKey } : {},
      ...opaqueIdentifiers === void 0 ? {} : { opaqueIdentifiers },
      ...presentation === void 0 ? {} : { presentation }
    });
  }
  const inlineRanges = [];
  const seenInlineKeys = /* @__PURE__ */ new Set();
  for (const item of value.inlineRanges) {
    const parsed = parseInlineRange(item, seenKeys);
    if (parsed.ok === false || seenInlineKeys.has(parsed.value.itemKey)) return { ok: false, reason: parsed.ok === false ? parsed.reason : "The preservation sidecar repeats an inline item key." };
    seenInlineKeys.add(parsed.value.itemKey);
    inlineRanges.push(parsed.value);
  }
  const extensions = [];
  const seenExtensionKeys = /* @__PURE__ */ new Set();
  for (const item of value.extensions) {
    const parsed = parseOpaqueExtension(item, seenKeys);
    if (parsed.ok === false || seenExtensionKeys.has(parsed.value.blockKey)) return { ok: false, reason: parsed.ok === false ? parsed.reason : "The preservation sidecar repeats an opaque extension block key." };
    seenExtensionKeys.add(parsed.value.blockKey);
    extensions.push(parsed.value);
  }
  return {
    ok: true,
    value: {
      schemaVersion: pageAttributesSchemaVersion,
      pageId: value.pageId,
      source: {
        storageSha256: source.storageSha256,
        markdownBodySha256: source.markdownBodySha256,
        mappingProfile: "miku-confluence.markdown-block-map/v1",
        ...typeof source.version === "number" ? { version: source.version } : {}
      },
      blocks,
      extensions,
      inlineRanges,
      annotations
    }
  };
}
function parseOpaqueExtension(value, blockKeys) {
  if (!isRecord3(value) || typeof value.blockKey !== "string" || !blockKeys.has(value.blockKey) || !isOpaqueExtensionKind(value.kind) || typeof value.label !== "string" || value.label.length === 0 || /[\r\n]/u.test(value.label) || typeof value.storagePath !== "string" || !/^\$\.children\[[0-9]+\]$/u.test(value.storagePath) || typeof value.storageFragment !== "string" || value.storageFragment.length === 0 || typeof value.storageFragmentSha256 !== "string" || !isDigest(value.storageFragmentSha256)) {
    return { ok: false, reason: "The preservation sidecar has an invalid opaque extension." };
  }
  if (sha256(value.storageFragment) !== value.storageFragmentSha256) return { ok: false, reason: "The preservation sidecar opaque extension digest is invalid." };
  return { ok: true, value: { blockKey: value.blockKey, kind: value.kind, label: value.label, storagePath: value.storagePath, storageFragment: value.storageFragment, storageFragmentSha256: value.storageFragmentSha256 } };
}
function parseInlineRange(value, blockKeys) {
  if (!isRecord3(value) || typeof value.itemKey !== "string" || !/^i-[a-f0-9]{64}$/u.test(value.itemKey) || !isInlinePresentationAttribute(value.attribute) || typeof value.blockKey !== "string" || !blockKeys.has(value.blockKey) || typeof value.normalizedInlinePath !== "string" || !/^\$\.blocks\[[0-9]+\]\.inlineSource(?:\.children\[[0-9]+\])*$/u.test(value.normalizedInlinePath) || typeof value.storagePath !== "string" || !value.storagePath.startsWith("$") || typeof value.sourceText !== "string" || typeof value.sourceTextSha256 !== "string" || !isDigest(value.sourceTextSha256) || typeof value.sourceTextOccurrenceCount !== "number" || !Number.isSafeInteger(value.sourceTextOccurrenceCount) || value.sourceTextOccurrenceCount < 0) {
    return { ok: false, reason: "The preservation sidecar has an invalid inline range." };
  }
  if (value.sourceTextSha256 !== sha256(value.sourceText)) return { ok: false, reason: "The preservation sidecar inline text digest is invalid." };
  let sourceRange;
  if (value.sourceRange !== void 0) {
    if (!isRecord3(value.sourceRange) || typeof value.sourceRange.start !== "number" || typeof value.sourceRange.end !== "number" || !Number.isSafeInteger(value.sourceRange.start) || !Number.isSafeInteger(value.sourceRange.end) || value.sourceRange.start < 0 || value.sourceRange.end <= value.sourceRange.start || value.sourceRange.end - value.sourceRange.start !== value.sourceText.length || value.sourceTextOccurrenceCount !== 1) return { ok: false, reason: "The preservation sidecar inline range is invalid." };
    sourceRange = { start: value.sourceRange.start, end: value.sourceRange.end };
  } else if (value.sourceTextOccurrenceCount === 1) {
    return { ok: false, reason: "The preservation sidecar omits a unique inline range." };
  }
  return {
    ok: true,
    value: {
      itemKey: value.itemKey,
      attribute: value.attribute,
      blockKey: value.blockKey,
      normalizedInlinePath: value.normalizedInlinePath,
      ...sourceRange === void 0 ? {} : { sourceRange },
      sourceText: value.sourceText,
      sourceTextSha256: value.sourceTextSha256,
      sourceTextOccurrenceCount: value.sourceTextOccurrenceCount,
      storagePath: value.storagePath
    }
  };
}
function parseFrontMatter(text) {
  const lines = text.split("\n");
  const start = lines.findIndex((line) => line === "mikuConfluence:");
  if (start < 0 || lines.filter((line) => line === "mikuConfluence:").length !== 1) return { ok: false, reason: "The front matter must contain exactly one mikuConfluence mapping." };
  const section = [];
  for (let index2 = start + 1; index2 < lines.length; index2 += 1) {
    const line = lines[index2] ?? "";
    if (line.length > 0 && !line.startsWith(" ")) break;
    section.push(line);
  }
  if (section.some((line) => /(?:^|\s)(?:&|\*|<<:|!)/u.test(line))) return { ok: false, reason: "The mikuConfluence front matter may not use aliases, merge keys, or tags." };
  const expected = [
    "  schemaVersion: 1",
    "  source:"
  ];
  if (section[0] !== expected[0] || section[1] !== expected[1]) return { ok: false, reason: "The mikuConfluence front matter does not use the generated schema." };
  let index = 2;
  const source = {};
  while (index < section.length && /^    [A-Za-z][A-Za-z0-9]*: /u.test(section[index] ?? "")) {
    const line = section[index] ?? "";
    const match = /^    ([A-Za-z][A-Za-z0-9]*): (.+)$/u.exec(line);
    if (match?.[1] === void 0 || match[2] === void 0 || source[match[1]] !== void 0) return { ok: false, reason: "The source front matter contains an invalid or duplicate field." };
    const parsed = parseScalar(match[2]);
    if (parsed === void 0) return { ok: false, reason: "The source front matter contains an invalid scalar." };
    source[match[1]] = parsed;
    index += 1;
  }
  if (section[index] !== "  attributes:") return { ok: false, reason: "The mikuConfluence front matter is missing attributes." };
  index += 1;
  const attributes = {};
  while (index < section.length && /^    [A-Za-z][A-Za-z0-9]*: /u.test(section[index] ?? "")) {
    const line = section[index] ?? "";
    const match = /^    ([A-Za-z][A-Za-z0-9]*): (.+)$/u.exec(line);
    if (match?.[1] === void 0 || match[2] === void 0 || attributes[match[1]] !== void 0) return { ok: false, reason: "The attributes front matter contains an invalid or duplicate field." };
    const parsed = parseScalar(match[2]);
    if (parsed === void 0) return { ok: false, reason: "The attributes front matter contains an invalid scalar." };
    attributes[match[1]] = parsed;
    index += 1;
  }
  if (index !== section.length || !isPageId(source.pageId) || !isDigest(source.storageSha256) || source.spaceId !== void 0 && !isPageId(source.spaceId) || source.version !== void 0 && (typeof source.version !== "number" || !Number.isSafeInteger(source.version) || source.version < 1) || attributes.path !== "page.attributes.json" || !isDigest(attributes.sha256)) {
    return { ok: false, reason: "The mikuConfluence front matter has invalid source or attribute values." };
  }
  return {
    ok: true,
    value: {
      pageId: source.pageId,
      storageSha256: source.storageSha256,
      attributesPath: attributes.path,
      attributesSha256: attributes.sha256,
      ...typeof source.spaceId === "string" ? { spaceId: source.spaceId } : {},
      ...typeof source.version === "number" ? { version: source.version } : {}
    }
  };
}
function parseBaselineBlock(value, pageId, index) {
  if (!isRecord3(value) || typeof value.blockKey !== "string" || !/^b-[a-f0-9]{64}$/u.test(value.blockKey) || typeof value.nodeName !== "string" || value.nodeName.length === 0 || typeof value.storagePath !== "string" || !isDigest(value.storageSubtreeSha256) || !isRecord3(value.baseline)) return { ok: false, reason: "The preservation sidecar has an invalid baseline block." };
  const baseline = value.baseline;
  if (!isBlockKind(baseline.kind) || typeof baseline.markdownPath !== "string" || baseline.markdownPath !== markdownPath(index) || !isRecord3(baseline.normalized) || !isBlockKind(baseline.normalized.kind) || typeof baseline.normalized.value !== "string" || !isDigest(baseline.normalizedSha256) || baseline.parentKey !== null || typeof baseline.occurrence !== "number" || !Number.isSafeInteger(baseline.occurrence) || baseline.occurrence < 1) return { ok: false, reason: "The preservation sidecar baseline structure is invalid." };
  const normalized = { kind: baseline.normalized.kind, value: baseline.normalized.value };
  const normalizedSha256 = sha256(canonicalJson(normalized));
  if (baseline.kind !== normalized.kind || baseline.normalizedSha256 !== normalizedSha256) return { ok: false, reason: "The preservation sidecar baseline digest is invalid." };
  const expectedKey = `b-${sha256(canonicalJson({ markdownPath: baseline.markdownPath, nodeName: value.nodeName, pageId, storagePath: value.storagePath, storageSubtreeSha256: value.storageSubtreeSha256 }))}`;
  if (value.blockKey !== expectedKey) return { ok: false, reason: "The preservation sidecar block key is invalid." };
  if (baseline.previousKey !== void 0 && (typeof baseline.previousKey !== "string" || !/^b-[a-f0-9]{64}$/u.test(baseline.previousKey)) || baseline.nextKey !== void 0 && (typeof baseline.nextKey !== "string" || !/^b-[a-f0-9]{64}$/u.test(baseline.nextKey))) return { ok: false, reason: "The preservation sidecar block neighbor is invalid." };
  return {
    ok: true,
    value: {
      blockKey: value.blockKey,
      nodeName: value.nodeName,
      storagePath: value.storagePath,
      storageSubtreeSha256: value.storageSubtreeSha256,
      baseline: {
        kind: baseline.kind,
        markdownPath: baseline.markdownPath,
        normalized,
        normalizedSha256,
        parentKey: null,
        ...typeof baseline.previousKey === "string" ? { previousKey: baseline.previousKey } : {},
        ...typeof baseline.nextKey === "string" ? { nextKey: baseline.nextKey } : {},
        occurrence: baseline.occurrence
      }
    }
  };
}
function normalizedBlock(kind, source) {
  const value = kind === "fencedCode" ? source.replace(/\r\n?/gu, "\n").trimEnd() : source.replace(/[ \t]+\n/gu, "\n").split("\n").map((line) => line.trim()).join("\n").replace(/[ \t]+/gu, " ").trim();
  return { kind, value };
}
function parseStorageFragment3(storage) {
  const parser = new import_xmldom3.DOMParser({ locator: false, onError(level, message) {
    if (level !== "warning") throw new Error(message);
  } });
  return parser.parseFromString(`<miku-root xmlns:ac="http://atlassian.com/content" xmlns:ri="http://atlassian.com/resource/identifier">${storage}</miku-root>`, "application/xml");
}
function sourceElementAt(document, storagePath) {
  const root = document.documentElement;
  if (root === null || !storagePath.startsWith("$")) return void 0;
  let node = root;
  const segments = [...storagePath.matchAll(/\.children\[([0-9]+)\]/gu)];
  if (`$${segments.map((item) => `.children[${item[1]}]`).join("")}` !== storagePath) return void 0;
  for (const segment of segments) {
    const child = node.childNodes.item(Number(segment[1]));
    if (child === null) return void 0;
    node = child;
  }
  return node.nodeType === import_xmldom3.Node.ELEMENT_NODE ? node : void 0;
}
function normalizedInlinePath(block, storagePath) {
  const blockIndex = /^\$\.blocks\[([0-9]+)\]$/u.exec(block.baseline.markdownPath)?.[1];
  const suffix = storagePath.slice(block.storagePath.length);
  return `$.blocks[${blockIndex ?? "0"}].inlineSource${suffix}`;
}
function normalizeInlineText(value) {
  return value.replace(/\r\n?/gu, "\n").replace(/[\t\n ]+/gu, " ").trim();
}
function countOccurrences(value, needle) {
  if (needle.length === 0) return 0;
  let count = 0;
  let start = 0;
  while (start <= value.length - needle.length) {
    const index = value.indexOf(needle, start);
    if (index < 0) break;
    count += 1;
    start = index + needle.length;
  }
  return count;
}
function startsPreservationBlock(lines, index) {
  const line = lines[index] ?? "";
  return /^\s*(`{3,}|~{3,})/u.test(line) || /^(#{1,6})[ \t]+/u.test(line) || /^\s{0,3}([-*_])(?:\s*\1){2,}\s*$/u.test(line) || /^> ?/u.test(line) || /^\s*(?:[-+*]|[0-9]+\.)[ \t]+/u.test(line) || looksLikeTable(lines, index);
}
function looksLikeTable(lines, index) {
  return /\|/u.test(lines[index] ?? "") && /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/u.test(lines[index + 1] ?? "");
}
function targetIndexFor(mapping) {
  if (mapping?.targetMarkdownPath === void 0) return void 0;
  const match = /^\$\.blocks\[([0-9]+)\]$/u.exec(mapping.targetMarkdownPath);
  return match?.[1] === void 0 ? void 0 : Number.parseInt(match[1], 10);
}
function groupIndexes(values) {
  const grouped = /* @__PURE__ */ new Map();
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === void 0) continue;
    const existing = grouped.get(value) ?? [];
    existing.push(index);
    grouped.set(value, existing);
  }
  return grouped;
}
function markdownPath(index) {
  return `$.blocks[${index}]`;
}
function parseScalar(value) {
  if (/^[0-9]+$/u.test(value)) {
    const parsed = Number(value);
    return Number.isSafeInteger(parsed) ? parsed : void 0;
  }
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "string" ? parsed : void 0;
  } catch {
    return void 0;
  }
}
function unescapeHeading(value) {
  return value.replace(/\\([\\`*_#{}\[\]<>])/gu, "$1");
}
function escapeRegExp2(value) {
  return value.replace(/[\\^$.*+?()[\]{}|]/gu, "\\$&");
}
function isPageId(value) {
  return typeof value === "string" && /^[0-9]+$/u.test(value);
}
function isDigest(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
}
function isRecord3(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isBlockKind(value) {
  return value === "blockQuote" || value === "fencedCode" || value === "heading" || value === "list" || value === "paragraph" || value === "table" || value === "thematicBreak";
}
function isInlinePresentationAttribute(value) {
  return value === "background-color" || value === "color" || value === "data-font-size" || value === "font-size";
}
function isOpaqueExtensionKind(value) {
  return value === "complex-table" || value === "storage-node" || value === "structured-macro";
}
function stringRecord(value) {
  if (!isRecord3(value) || Object.values(value).some((item) => typeof item !== "string")) return void 0;
  return value;
}
var import_xmldom3, preservationProfileVersion, pageAttributesSchemaVersion;
var init_preservation = __esm({
  "src/core/markdown/preservation.ts"() {
    "use strict";
    import_xmldom3 = __toESM(require_lib(), 1);
    init_markdown_storage_profile();
    preservationProfileVersion = "miku-confluence.markdown-preservation/v1";
    pageAttributesSchemaVersion = "miku-confluence.markdown-page-attributes/v4";
  }
});

// src/core/workflows/export-markdown.ts
function parseExportMarkdownInput(value) {
  if (!isRecord4(value)) return invalidInput2("$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["inputDirectory", "outputDirectory"]);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) return invalidInput2(`$.${key}`, "is not allowed for this operation");
  }
  const inputDirectory = value.inputDirectory;
  if (typeof inputDirectory !== "string" || inputDirectory.length === 0 || inputDirectory.includes("\0")) {
    return invalidInput2("$.inputDirectory", "must be a non-empty path without NUL");
  }
  const outputDirectory = value.outputDirectory;
  if (typeof outputDirectory !== "string" || outputDirectory.length === 0 || outputDirectory.includes("\0")) {
    return invalidInput2("$.outputDirectory", "must be a non-empty path without NUL");
  }
  return { ok: true, value: { inputDirectory, outputDirectory } };
}
function exportMarkdownDryRun(input) {
  return {
    schemaVersion: 1,
    operation: operationName,
    kind: "workflow",
    success: true,
    dryRun: true,
    plan: {
      inputDirectory: input.inputDirectory,
      outputDirectory: input.outputDirectory,
      artifacts: [
        "markdown-export.json",
        "tree.json",
        "pages/<pageId>/page.md",
        "pages/<pageId>/page.metadata.json",
        "pages/<pageId>/diagnostics.json",
        "pages/<pageId>/attachments/<attachmentId>/attachment.metadata.json",
        "pages/<pageId>/attachments/<attachmentId>/content.<ext>"
      ]
    },
    diagnostics: []
  };
}
function exportMarkdownFailure(diagnostics) {
  return { schemaVersion: 1, operation: operationName, kind: "workflow", success: false, diagnostics };
}
function invalidInput2(path2, reason) {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "INVALID_INPUT",
      message: `Invalid input at ${path2}: ${reason}.`,
      operation: operationName,
      path: path2
    }
  };
}
function isRecord4(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var operationName;
var init_export_markdown = __esm({
  "src/core/workflows/export-markdown.ts"() {
    "use strict";
    operationName = "snapshot.export-markdown";
  }
});

// src/adapters/filesystem/markdown-export.ts
import { copyFile, lstat as lstat2, mkdir as mkdir2, mkdtemp as mkdtemp2, readFile, readdir, rename as rename2, rm as rm2, writeFile as writeFile3 } from "node:fs/promises";
import { basename as basename2, dirname as dirname2, resolve as resolve2 } from "node:path";
async function exportSnapshotAsMarkdown(input) {
  let source;
  try {
    source = await readSourceSnapshot(input.inputDirectory);
  } catch {
    return exportMarkdownFailure([{
      severity: "error",
      code: "INVALID_SNAPSHOT",
      message: "The input directory is not a complete, safe miku-confluence export snapshot.",
      operation: operationName2
    }]);
  }
  if (source.ok === false) return exportMarkdownFailure([source.diagnostic]);
  const outputPlan = await planSnapshotOutput(input.outputDirectory, operationName2);
  if (outputPlan.ok === false) return exportMarkdownFailure([outputPlan.diagnostic]);
  let writer;
  try {
    writer = await MarkdownExportWriter.create(outputPlan.value);
    const counts = {
      pagesConverted: 0,
      pagesWithWarnings: 0,
      attachmentsCopied: 0,
      attributesPreserved: 0
    };
    const diagnostics = [];
    const pageIds = new Set(source.value.pages.map((page) => page.pageId));
    await writer.writeTree(source.value.tree);
    for (const page of source.value.pages) {
      const pageDiagnostics = [...source.value.attachmentDiagnosticsByPageId.get(page.pageId) ?? []];
      let converted;
      try {
        converted = convertStorageToMarkdown(page.storage, {
          pageId: page.pageId,
          pageIds,
          attachmentsByPageId: source.value.attachmentsByPageId
        });
      } catch {
        await writer.abort();
        return exportMarkdownFailure([{
          severity: "error",
          code: "INVALID_SNAPSHOT",
          message: "The input snapshot contains storage XML that could not be parsed safely.",
          operation: operationName2,
          pageId: page.pageId
        }]);
      }
      pageDiagnostics.push(...converted.diagnostics);
      const attributeSidecar = createPageAttributeSidecar(page, converted.markdown, converted.annotations, converted.opaqueBlocks, converted.renderedBlocks);
      for (const attachment of source.value.attachmentArtifactsByPageId.get(page.pageId) ?? []) {
        await writer.copyAttachment(page.pageId, attachment);
        counts.attachmentsCopied += 1;
      }
      await writer.writePage(page, pageMarkdown(page, attributeSidecar.markdown, attributeSidecar), attributeSidecar, pageDiagnostics);
      counts.pagesConverted += 1;
      counts.attributesPreserved += attributeSidecar.attributeCount;
      if (pageDiagnostics.some((diagnostic4) => diagnostic4.severity === "warning")) counts.pagesWithWarnings += 1;
      diagnostics.push(...pageDiagnostics);
    }
    const manifest = {
      schemaVersion: "miku-confluence.markdown-export/v1",
      complete: true,
      source: {
        snapshotSchemaVersion: "miku-confluence.export/v1",
        rootPageId: source.value.rootPageId
      },
      paths: { tree: "tree.json", pages: "pages" },
      counts,
      diagnostics: {
        summary: diagnosticSummary(diagnostics),
        items: diagnostics
      }
    };
    await writer.writeManifest(manifest);
    await writer.finalize();
    return {
      schemaVersion: 1,
      operation: operationName2,
      kind: "workflow",
      success: true,
      result: {
        inputDirectory: input.inputDirectory,
        outputDirectory: input.outputDirectory,
        complete: true,
        counts
      },
      diagnostics
    };
  } catch {
    if (writer !== void 0) await writer.abort();
    return exportMarkdownFailure([{
      severity: "error",
      code: "FILESYSTEM_ERROR",
      message: "The Markdown export could not be written safely.",
      operation: operationName2
    }]);
  }
}
async function readSourceSnapshot(inputDirectory) {
  const root = resolve2(inputDirectory);
  const rootStat = await safeLstat(root);
  if (rootStat === void 0 || !rootStat.isDirectory() || rootStat.isSymbolicLink()) return invalidSnapshot();
  const manifest = await readJsonFile(resolve2(root, "export.json"));
  if (!isRecord5(manifest) || manifest.schemaVersion !== "miku-confluence.export/v1" || manifest.complete !== true || !isPageId2(manifest.rootPageId)) {
    return invalidSnapshot();
  }
  const tree = await readRegularTextFile(resolve2(root, "tree.json"));
  if (tree === void 0) return invalidSnapshot();
  const treeValue = parseJson(tree);
  if (!isRecord5(treeValue) || treeValue.schemaVersion !== "miku-confluence.tree/v1" || treeValue.rootPageId !== manifest.rootPageId || !Array.isArray(treeValue.nodes)) return invalidSnapshot();
  const pagesRoot = resolve2(root, "pages");
  const pagesRootStat = await safeLstat(pagesRoot);
  if (pagesRootStat === void 0 || !pagesRootStat.isDirectory() || pagesRootStat.isSymbolicLink()) return invalidSnapshot();
  const pageIds = [];
  for (const node of treeValue.nodes) {
    if (!isRecord5(node) || !isPageId2(node.pageId) || node.artifactStatus !== "written") return invalidSnapshot();
    if (pageIds.includes(node.pageId)) return invalidSnapshot();
    pageIds.push(node.pageId);
  }
  if (pageIds.length === 0 || !pageIds.includes(manifest.rootPageId)) return invalidSnapshot();
  const pages = [];
  const attachmentsByPageId = /* @__PURE__ */ new Map();
  const attachmentArtifactsByPageId = /* @__PURE__ */ new Map();
  const attachmentDiagnosticsByPageId = /* @__PURE__ */ new Map();
  for (const pageId of pageIds) {
    const directory = resolve2(root, "pages", pageId);
    const directoryStat = await safeLstat(directory);
    if (directoryStat === void 0 || !directoryStat.isDirectory() || directoryStat.isSymbolicLink()) return invalidSnapshot();
    const pagePath = resolve2(directory, "page.api-v2.json");
    const pageBody = await readJsonFile(pagePath);
    const storagePath = resolve2(directory, "body.storage.xml");
    const storage = await readRegularTextFile(storagePath);
    if (!isRecord5(pageBody) || pageBody.id !== pageId || typeof pageBody.title !== "string" || storage === void 0 || storageValue(pageBody) !== storage) return invalidSnapshot();
    pages.push({
      pageId,
      title: pageBody.title,
      spaceId: typeof pageBody.spaceId === "string" ? pageBody.spaceId : void 0,
      storage,
      sourcePagePath: `pages/${pageId}/page.api-v2.json`,
      sourceStoragePath: `pages/${pageId}/body.storage.xml`,
      version: pageVersion(pageBody)
    });
    const attachments = await readAttachments(directory, pageId);
    attachmentsByPageId.set(pageId, attachments.byName);
    attachmentArtifactsByPageId.set(pageId, attachments.artifacts);
    attachmentDiagnosticsByPageId.set(pageId, attachments.diagnostics);
  }
  return {
    ok: true,
    value: {
      rootPageId: manifest.rootPageId,
      tree,
      pages,
      attachmentsByPageId,
      attachmentArtifactsByPageId,
      attachmentDiagnosticsByPageId
    }
  };
}
async function readAttachments(pageDirectory, pageId) {
  const attachmentRoot = resolve2(pageDirectory, "attachments");
  const attachmentRootStat = await safeLstat(attachmentRoot);
  if (attachmentRootStat === void 0) return { artifacts: [], byName: /* @__PURE__ */ new Map(), diagnostics: [] };
  if (!attachmentRootStat.isDirectory() || attachmentRootStat.isSymbolicLink()) return malformedAttachmentResult(pageId);
  const entries = await readdir(attachmentRoot, { withFileTypes: true });
  const artifacts = [];
  const diagnostics = [];
  for (const entry of entries.sort((left, right) => compareCodePoint(left.name, right.name))) {
    if (!entry.isDirectory() || entry.isSymbolicLink() || !isAttachmentId(entry.name)) {
      diagnostics.push(malformedAttachmentDiagnostic(pageId));
      continue;
    }
    const directory = resolve2(attachmentRoot, entry.name);
    const content = await readJsonFile(resolve2(directory, "content.json"));
    if (!isRecord5(content) || content.attachmentId !== entry.name || typeof content.originalFileName !== "string" || !isSafeContentPath(content.contentPath)) {
      diagnostics.push(malformedAttachmentDiagnostic(pageId));
      continue;
    }
    const sourcePath = resolve2(directory, content.contentPath);
    if (await readRegularFileStatus(sourcePath) === false) {
      diagnostics.push(malformedAttachmentDiagnostic(pageId));
      continue;
    }
    artifacts.push({
      attachmentId: entry.name,
      contentPath: content.contentPath,
      originalFileName: content.originalFileName,
      sourcePath
    });
  }
  const byName = /* @__PURE__ */ new Map();
  for (const artifact2 of artifacts) {
    if (byName.has(artifact2.originalFileName)) byName.set(artifact2.originalFileName, void 0);
    else byName.set(artifact2.originalFileName, artifact2);
  }
  return { artifacts, byName, diagnostics };
}
function malformedAttachmentResult(pageId) {
  return { artifacts: [], byName: /* @__PURE__ */ new Map(), diagnostics: [malformedAttachmentDiagnostic(pageId)] };
}
function malformedAttachmentDiagnostic(pageId) {
  return {
    severity: "warning",
    code: "INVALID_ATTACHMENT_ARTIFACT",
    message: "A source attachment artifact could not be copied into the Markdown export.",
    operation: operationName2,
    pageId
  };
}
function invalidSnapshot() {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "INVALID_SNAPSHOT",
      message: "The input directory is not a complete, safe miku-confluence export snapshot.",
      operation: operationName2
    }
  };
}
function diagnosticSummary(items) {
  return {
    info: items.filter((item) => item.severity === "info").length,
    warning: items.filter((item) => item.severity === "warning").length,
    error: items.filter((item) => item.severity === "error").length
  };
}
async function safeLstat(path2) {
  try {
    return await lstat2(path2);
  } catch {
    return void 0;
  }
}
async function readRegularTextFile(path2) {
  if (await readRegularFileStatus(path2) === false) return void 0;
  try {
    return await readFile(path2, "utf8");
  } catch {
    return void 0;
  }
}
async function readRegularFileStatus(path2) {
  const fileStat = await safeLstat(path2);
  return fileStat !== void 0 && fileStat.isFile() && !fileStat.isSymbolicLink();
}
async function readJsonFile(path2) {
  const text = await readRegularTextFile(path2);
  return text === void 0 ? void 0 : parseJson(text);
}
function parseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return void 0;
  }
}
function isRecord5(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function storageValue(pageBody) {
  const body = pageBody.body;
  if (!isRecord5(body)) return void 0;
  const storage = body.storage;
  return isRecord5(storage) && typeof storage.value === "string" ? storage.value : void 0;
}
function pageVersion(pageBody) {
  const version = pageBody.version;
  return isRecord5(version) && typeof version.number === "number" && Number.isSafeInteger(version.number) && version.number > 0 ? version.number : void 0;
}
function isPageId2(value) {
  return typeof value === "string" && /^[0-9]+$/u.test(value);
}
function isAttachmentId(value) {
  return /^(att)?[0-9]+$/u.test(value);
}
function isSafeContentPath(value) {
  return typeof value === "string" && /^content\.[A-Za-z0-9]{1,16}$/u.test(value);
}
function compareCodePoint(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
function escapeHeading(value) {
  return value.replace(/([\\`*_#{}\[\]<>])/gu, "\\$1").replace(/\n/gu, " ");
}
function createPageAttributeSidecar(page, markdown, annotations, opaqueBlocks, renderedBlocks) {
  const provisionalBlocks = buildPreservationBaseline(page.pageId, renderedBlocks);
  const extensions = opaqueBlocks.map((opaque) => {
    const block = provisionalBlocks.find((candidate) => candidate.storagePath === opaque.storagePath);
    if (block === void 0) throw new Error("An opaque extension has no top-level preservation block.");
    return {
      blockKey: block.blockKey,
      kind: opaque.kind,
      label: opaque.label,
      storagePath: opaque.storagePath,
      storageFragment: opaque.storageSubtree,
      storageFragmentSha256: sha256(opaque.storageSubtree)
    };
  });
  const extensionKeyByPlaceholder = new Map(opaqueBlocks.map((opaque, index) => [opaque.placeholder, extensions[index]?.blockKey]));
  const replaceExtensionPlaceholders = (value) => [...extensionKeyByPlaceholder.entries()].reduce((output, [placeholder, blockKey]) => blockKey === void 0 ? output : output.replaceAll(placeholder, blockKey), value);
  const finalMarkdown = replaceExtensionPlaceholders(markdown);
  const blocks = buildPreservationBaseline(page.pageId, renderedBlocks.map((block) => ({ ...block, markdown: replaceExtensionPlaceholders(block.markdown) })));
  const linkedAnnotations = linkAnnotationsToBlocks(annotations, blocks);
  const inlineRanges = buildPreservationInlineRanges(page.storage, linkedAnnotations, blocks);
  const content = `${stringifyJson({
    schemaVersion: pageAttributesSchemaVersion,
    pageId: page.pageId,
    source: {
      storageSha256: sha256(page.storage),
      ...page.version === void 0 ? {} : { version: page.version },
      markdownBodySha256: sha256(finalMarkdown),
      mappingProfile: "miku-confluence.markdown-block-map/v1"
    },
    blocks,
    extensions,
    inlineRanges,
    annotations: linkedAnnotations
  })}
`;
  return {
    content,
    sha256: sha256(content),
    markdown: finalMarkdown,
    attributeCount: extensions.length + linkedAnnotations.reduce((count, annotation) => count + Object.keys(annotation.opaqueIdentifiers ?? {}).length + Object.keys(annotation.presentation ?? {}).length, 0)
  };
}
function pageMarkdown(page, body, attributeSidecar) {
  const source = [
    "---",
    "mikuConfluence:",
    "  schemaVersion: 1",
    "  source:",
    `    pageId: ${JSON.stringify(page.pageId)}`,
    ...page.spaceId === void 0 ? [] : [`    spaceId: ${JSON.stringify(page.spaceId)}`],
    ...page.version === void 0 ? [] : [`    version: ${page.version}`],
    `    storageSha256: ${JSON.stringify(sha256(page.storage))}`,
    "  attributes:",
    '    path: "page.attributes.json"',
    `    sha256: ${JSON.stringify(attributeSidecar.sha256)}`,
    "---"
  ];
  return `${source.join("\n")}

# ${escapeHeading(page.title)}

${body}`;
}
var operationName2, MarkdownExportWriter;
var init_markdown_export = __esm({
  "src/adapters/filesystem/markdown-export.ts"() {
    "use strict";
    init_storage_to_markdown();
    init_json();
    init_markdown_storage_profile();
    init_preservation();
    init_export_markdown();
    init_snapshot_writer();
    operationName2 = "snapshot.export-markdown";
    MarkdownExportWriter = class _MarkdownExportWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        const prefix = `.${basename2(plan.finalDirectory)}.miku-confluence-staging-`;
        const stagingDirectory = await mkdtemp2(resolve2(dirname2(plan.finalDirectory), prefix));
        return new _MarkdownExportWriter(plan, stagingDirectory);
      }
      async writeTree(tree) {
        await writeFile3(resolve2(this.stagingDirectory, "tree.json"), tree, "utf8");
      }
      async copyAttachment(pageId, attachment) {
        const directory = await this.attachmentDirectory(pageId, attachment.attachmentId);
        await copyFile(attachment.sourcePath, resolve2(directory, attachment.contentPath));
        await writeFile3(resolve2(directory, "attachment.metadata.json"), `${stringifyJson({
          schemaVersion: "miku-confluence.markdown-attachment/v1",
          attachmentId: attachment.attachmentId,
          originalFileName: attachment.originalFileName,
          contentPath: attachment.contentPath
        })}
`, "utf8");
      }
      async writePage(page, markdown, attributeSidecar, diagnostics) {
        const directory = await this.pageDirectory(page.pageId);
        await writeFile3(resolve2(directory, "page.attributes.json"), attributeSidecar.content, "utf8");
        await writeFile3(resolve2(directory, "page.md"), markdown, "utf8");
        const metadata = {
          schemaVersion: "miku-confluence.markdown-page/v1",
          pageId: page.pageId,
          title: page.title,
          source: { page: page.sourcePagePath, storage: page.sourceStoragePath, storageSha256: sha256(page.storage) },
          attributes: { path: "page.attributes.json", sha256: attributeSidecar.sha256 }
        };
        if (page.spaceId !== void 0) metadata.spaceId = page.spaceId;
        if (page.version !== void 0) metadata.version = page.version;
        await writeFile3(resolve2(directory, "page.metadata.json"), `${stringifyJson(metadata)}
`, "utf8");
        await writeFile3(resolve2(directory, "diagnostics.json"), `${stringifyJson({
          schemaVersion: "miku-confluence.markdown-page-diagnostics/v1",
          pageId: page.pageId,
          items: diagnostics
        })}
`, "utf8");
      }
      async writeManifest(manifest) {
        await writeFile3(resolve2(this.stagingDirectory, "markdown-export.json"), `${stringifyJson(manifest)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename2(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm2(this.stagingDirectory, { recursive: true, force: true });
      }
      async pageDirectory(pageId) {
        const directory = resolve2(this.stagingDirectory, "pages", pageId);
        await mkdir2(directory, { recursive: true });
        return directory;
      }
      async attachmentDirectory(pageId, attachmentId) {
        const directory = resolve2(await this.pageDirectory(pageId), "attachments", attachmentId);
        await mkdir2(directory, { recursive: true });
        return directory;
      }
    };
  }
});

// src/core/workflows/prepare-markdown-update.ts
function parsePrepareMarkdownUpdateInput(value) {
  if (!isRecord6(value)) return invalidInput3("$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set([
    "snapshotDirectory",
    "pageId",
    "workingMarkdownPath",
    "outputDirectory",
    "expectedBaseStorageSha256",
    "expectedWorkingMarkdownSha256",
    "preservationProfile"
  ]);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) return invalidInput3(`$.${key}`, "is not allowed for this operation");
  }
  const snapshotDirectory = validPath(value.snapshotDirectory, "$.snapshotDirectory");
  if (snapshotDirectory.ok === false) return snapshotDirectory;
  const pageId = value.pageId;
  if (typeof pageId !== "string" || !/^[0-9]+$/u.test(pageId)) return invalidInput3("$.pageId", "must be a decimal page ID");
  const workingMarkdownPath = validPath(value.workingMarkdownPath, "$.workingMarkdownPath");
  if (workingMarkdownPath.ok === false) return workingMarkdownPath;
  const outputDirectory = validPath(value.outputDirectory, "$.outputDirectory");
  if (outputDirectory.ok === false) return outputDirectory;
  const expectedBaseStorageSha256 = optionalDigest(value.expectedBaseStorageSha256, "$.expectedBaseStorageSha256");
  if (expectedBaseStorageSha256.ok === false) return expectedBaseStorageSha256;
  const expectedWorkingMarkdownSha256 = optionalDigest(value.expectedWorkingMarkdownSha256, "$.expectedWorkingMarkdownSha256");
  if (expectedWorkingMarkdownSha256.ok === false) return expectedWorkingMarkdownSha256;
  if (value.preservationProfile !== void 0 && value.preservationProfile !== preservationProfileVersion) return invalidInput3("$.preservationProfile", `must equal ${preservationProfileVersion}`);
  const result3 = {
    snapshotDirectory: snapshotDirectory.value,
    pageId,
    workingMarkdownPath: workingMarkdownPath.value,
    outputDirectory: outputDirectory.value
  };
  return {
    ok: true,
    value: {
      ...result3,
      ...expectedBaseStorageSha256.value === void 0 ? {} : { expectedBaseStorageSha256: expectedBaseStorageSha256.value },
      ...expectedWorkingMarkdownSha256.value === void 0 ? {} : { expectedWorkingMarkdownSha256: expectedWorkingMarkdownSha256.value },
      ...value.preservationProfile === void 0 ? {} : { preservationProfile: preservationProfileVersion }
    }
  };
}
function prepareMarkdownUpdateDryRun(input) {
  const preservationArtifacts = [
    "update-plan.json",
    "artifacts/base.storage.xml",
    "artifacts/working.md",
    "artifacts/candidate.storage.xml",
    "artifacts/preview.md",
    "artifacts/block-mapping.json",
    "artifacts/preservation-ledger.json",
    "artifacts/candidate-preservation.json",
    "artifacts/diagnostics.json"
  ];
  return {
    schemaVersion: 1,
    operation: operationName3,
    kind: "workflow",
    success: true,
    dryRun: true,
    plan: {
      inputDirectory: input.snapshotDirectory,
      outputDirectory: input.outputDirectory,
      artifacts: input.preservationProfile === void 0 ? [
        "update-plan.json",
        "artifacts/base.storage.xml",
        "artifacts/initial.md",
        "artifacts/working.md",
        "artifacts/candidate.storage.xml",
        "artifacts/preview.md",
        "artifacts/equivalence.json",
        "artifacts/diff.patch",
        "artifacts/diagnostics.json"
      ] : preservationArtifacts
    },
    diagnostics: []
  };
}
function prepareMarkdownUpdateFailure(diagnostics) {
  return { schemaVersion: 1, operation: operationName3, kind: "workflow", success: false, diagnostics };
}
function validPath(value, path2) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) return invalidInput3(path2, "must be a non-empty path without NUL");
  return { ok: true, value };
}
function optionalDigest(value, path2) {
  if (value === void 0) return { ok: true, value: void 0 };
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) return invalidInput3(path2, "must be a lowercase SHA-256 digest");
  return { ok: true, value };
}
function invalidInput3(path2, reason) {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "INVALID_INPUT",
      message: `Invalid input at ${path2}: ${reason}.`,
      operation: operationName3,
      path: path2
    }
  };
}
function isRecord6(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var operationName3;
var init_prepare_markdown_update = __esm({
  "src/core/workflows/prepare-markdown-update.ts"() {
    "use strict";
    init_preservation();
    operationName3 = "page.prepare-markdown-update";
  }
});

// src/core/markdown/block-presentation.ts
function parseBlockPresentation(name, value) {
  if (name === "text-align") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "left" || normalized === "center" || normalized === "right" || normalized === "justify") {
      return { ok: true, value: { name, value: normalized } };
    }
    return { ok: false, reason: "text-align must be one of left, center, right, or justify" };
  }
  if (name === "margin-left") {
    const match = /^([0-9]+(?:\.[0-9]+)?)px$/u.exec(value.trim().toLowerCase());
    if (match?.[1] === void 0) return { ok: false, reason: "margin-left must be a non-negative px value" };
    const numeric = Number(match[1]);
    if (!Number.isFinite(numeric) || numeric > 1e4) return { ok: false, reason: "margin-left is outside the supported range" };
    return { ok: true, value: { name, value: `${canonicalDecimal(match[1])}px` } };
  }
  return { ok: false, reason: "the presentation attribute is not block-rescuable in Phase 22.2b-1" };
}
function parseInlinePresentation(name, value) {
  if (name === "color" || name === "background-color") {
    const parsed = parseColor(value);
    return parsed.ok ? { ok: true, value: { name, value: parsed.value } } : parsed;
  }
  if (name === "font-size") {
    const match = /^([0-9]+(?:\.[0-9]+)?)px$/u.exec(value.trim().toLowerCase());
    if (match?.[1] === void 0) return { ok: false, reason: "font-size must be a non-negative px value" };
    const numeric = Number(match[1]);
    if (!Number.isFinite(numeric) || numeric === 0 || numeric > 1e3) return { ok: false, reason: "font-size is outside the supported range" };
    return { ok: true, value: { name, value: `${canonicalDecimal(match[1])}px` } };
  }
  if (name === "data-font-size") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "small" || normalized === "medium" || normalized === "large" || normalized === "x-large" || normalized === "xx-large") {
      return { ok: true, value: { name, value: normalized } };
    }
    return { ok: false, reason: "data-font-size must be one of small, medium, large, x-large, or xx-large" };
  }
  return { ok: false, reason: "the presentation attribute is not inline-rescuable in Phase 22.2b-2" };
}
function parseConservativeStyle(value) {
  const declarations = [];
  const names = /* @__PURE__ */ new Set();
  for (const raw of value.split(";")) {
    const declaration = raw.trim();
    if (declaration.length === 0) continue;
    const separator = declaration.indexOf(":");
    if (separator < 1 || separator !== declaration.lastIndexOf(":")) return { ok: false, reason: "style declarations must contain one property and one value" };
    const name = declaration.slice(0, separator).trim().toLowerCase();
    const propertyValue = declaration.slice(separator + 1).trim();
    if (!/^[a-z][a-z-]*$/u.test(name) || propertyValue.length === 0) return { ok: false, reason: "style declarations use an unsupported property grammar" };
    if (/[{}@!"']/u.test(propertyValue) || /\b(?:url|var|calc)\s*\(/iu.test(propertyValue) || /[()]/u.test(propertyValue) && !isStrictRgb(propertyValue)) return { ok: false, reason: "style declarations may not use functions, URLs, variables, or priority modifiers" };
    if (names.has(name)) return { ok: false, reason: `style repeats ${name}` };
    names.add(name);
    declarations.push({ name, value: propertyValue });
  }
  return { ok: true, declarations };
}
function canonicalBlockStyle(items) {
  return [...items].sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0).map((item) => `${item.name}: ${item.value};`).join(" ");
}
function canonicalInlineStyle(items) {
  return [...items].filter((item) => item.name !== "data-font-size").sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0).map((item) => `${item.name}: ${item.value};`).join(" ");
}
function parseColor(value) {
  const normalized = value.trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/u.test(normalized) || /^#[0-9a-f]{3}$/u.test(normalized)) return { ok: true, value: normalized };
  const match = /^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$/u.exec(normalized);
  if (match?.[1] === void 0 || match[2] === void 0 || match[3] === void 0) return { ok: false, reason: "color must be a hexadecimal color or an rgb() triplet" };
  const channels = [Number(match[1]), Number(match[2]), Number(match[3])];
  if (channels.some((channel) => !Number.isSafeInteger(channel) || channel < 0 || channel > 255)) return { ok: false, reason: "rgb() channels must be between 0 and 255" };
  return { ok: true, value: `rgb(${channels.join(", ")})` };
}
function isStrictRgb(value) {
  return /^rgb\(\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*,\s*[0-9]{1,3}\s*\)$/iu.test(value);
}
function canonicalDecimal(value) {
  const [integer3, fraction = ""] = value.split(".");
  const canonicalInteger = (integer3 ?? "0").replace(/^0+(?=\d)/u, "") || "0";
  const canonicalFraction = fraction.replace(/0+$/u, "");
  return canonicalFraction.length === 0 ? canonicalInteger : `${canonicalInteger}.${canonicalFraction}`;
}
var init_block_presentation = __esm({
  "src/core/markdown/block-presentation.ts"() {
    "use strict";
  }
});

// src/adapters/filesystem/markdown-preserving-update-prepare.ts
import { lstat as lstat3, mkdir as mkdir3, mkdtemp as mkdtemp3, readFile as readFile2, rename as rename3, rm as rm3, writeFile as writeFile4 } from "node:fs/promises";
import { basename as basename3, dirname as dirname3, resolve as resolve3 } from "node:path";
async function preparePreservingMarkdownUpdateFromSnapshot(input) {
  const source = await readPreservingSource(input);
  if (source.ok === false) return prepareMarkdownUpdateFailure([source.diagnostic]);
  const outputPlan = await planSnapshotOutput(input.outputDirectory, operationName3);
  if (outputPlan.ok === false) return prepareMarkdownUpdateFailure([outputPlan.diagnostic]);
  let writer;
  try {
    writer = await PreservingUpdateWriter.create(outputPlan.value);
    const mapped = mapPreservationBlocks(source.value.sidecar.blocks, source.value.working.blocks);
    const mappingByKey = new Map(mapped.mappings.map((mapping) => [mapping.blockKey, mapping]));
    const diagnostics = [];
    const ledger = [];
    let blockerCount = 0;
    const addDiagnostic2 = (code, message, path2) => {
      blockerCount += 1;
      diagnostics.push({ severity: "error", code, message, operation: operationName3, pageId: source.value.pageId, ...path2 === void 0 ? {} : { path: path2 } });
    };
    for (const mapping of mapped.mappings) {
      if (mapping.state === "ambiguous") addDiagnostic2("PRESERVATION_BLOCK_MAPPING_AMBIGUOUS", "A source Markdown block has more than one equally valid working Markdown destination.", mapping.sourceMarkdownPath);
      if (mapping.state === "incompatible") addDiagnostic2("PRESERVATION_BLOCK_KIND_INCOMPATIBLE", "A source Markdown block changed to an incompatible working Markdown block kind.", mapping.sourceMarkdownPath);
    }
    const noOp = mapped.newWorkingMarkdownPaths.length === 0 && mapped.mappings.every((mapping) => mapping.state === "unchanged");
    if (noOp) {
      for (const extension of source.value.sidecar.extensions) {
        ledger.push({ blockKey: extension.blockKey, sourceStoragePath: extension.storagePath, category: "opaqueExtension", attribute: extension.kind, sourceValue: extension.storageFragmentSha256, disposition: "preserved-exact", blocking: false, message: "The source Storage is retained byte-for-byte because the visible Markdown is a no-op." });
      }
      for (const annotation of source.value.sidecar.annotations) {
        for (const [attribute2, value] of Object.entries(annotation.presentation ?? {})) {
          ledger.push(exactLedger(annotation.blockKey, annotation.storagePath, "presentation", attribute2, value));
        }
        for (const [attribute2, value] of Object.entries(annotation.opaqueIdentifiers ?? {})) {
          ledger.push(exactLedger(annotation.blockKey, annotation.storagePath, "opaqueIdentifier", attribute2, value));
        }
      }
      return await writePreservingOutcome({
        source: source.value,
        writer,
        mapped,
        ledger,
        diagnostics,
        blockerCount,
        candidateStorage: source.value.baseStorage,
        previewMarkdown: workingProfileMarkdown(source.value.title, source.value.working.body),
        candidateEligible: true,
        action: "no-op",
        outputDirectory: input.outputDirectory
      });
    }
    const baseDocument = parseStorageFragment4(source.value.baseStorage);
    const opaqueProjection = projectOpaqueExtensions(source.value, mappingByKey, baseDocument, ledger, addDiagnostic2);
    if (opaqueProjection.ok === false) {
      return await writePreservingOutcome({ source: source.value, writer, mapped, ledger, diagnostics, blockerCount, candidateEligible: false, action: "blocked", outputDirectory: input.outputDirectory });
    }
    const profileMarkdown = workingProfileMarkdown(source.value.title, opaqueProjection.value.profileBody);
    const workingProfile = parseWorkingMarkdown(profileMarkdown, source.value.title);
    if (workingProfile.ok === false) {
      addDiagnostic2(workingProfile.problem.code, workingProfile.problem.message, workingProfile.problem.nodePath);
      return await writePreservingOutcome({ source: source.value, writer, mapped, ledger, diagnostics, blockerCount, candidateEligible: false, action: "blocked", outputDirectory: input.outputDirectory });
    }
    const alignment = verifyProfileAlignment(opaqueProjection.value.profileBlocks, workingProfile.value.blocks);
    if (alignment.ok === false) {
      addDiagnostic2("PRESERVATION_PROFILE_AST_MISMATCH", alignment.reason);
      return await writePreservingOutcome({ source: source.value, writer, mapped, ledger, diagnostics, blockerCount, candidateEligible: false, action: "blocked", outputDirectory: input.outputDirectory });
    }
    const pending = [];
    const pendingInline = [];
    for (const issue of unreviewedSourcePresentation(baseDocument, source.value.sidecar)) {
      const blocked = {
        ...issue.blockKey === void 0 ? {} : { blockKey: issue.blockKey },
        sourceStoragePath: issue.storagePath,
        category: "unreviewedPresentation",
        attribute: issue.attribute,
        ...issue.value === void 0 ? {} : { sourceValue: issue.value },
        disposition: "unsupported",
        blocking: true,
        code: "PRESERVATION_ATTRIBUTE_UNSUPPORTED",
        message: issue.reason
      };
      ledger.push(blocked);
      addDiagnostic2(blocked.code, blocked.message, issue.storagePath);
    }
    for (const annotation of source.value.sidecar.annotations) {
      const mapping = annotation.blockKey === void 0 ? void 0 : mappingByKey.get(annotation.blockKey);
      const block = annotation.blockKey === void 0 ? void 0 : source.value.sidecar.blocks.find((item) => item.blockKey === annotation.blockKey);
      for (const [attribute2, value] of Object.entries(annotation.opaqueIdentifiers ?? {})) {
        const item = mappedLedger(annotation.blockKey, annotation.storagePath, mapping, "opaqueIdentifier", attribute2, value);
        if (item.blocking) addDiagnostic2(item.code ?? "PRESERVATION_BLOCK_MAPPING_AMBIGUOUS", item.message, mapping?.sourceMarkdownPath);
        else {
          const blocked = { ...item, disposition: "server-managed-pending", blocking: true, code: "PRESERVATION_IDENTIFIER_UNVERIFIED", message: "A Confluence-managed identifier cannot be reused or normalized by this local-only preserving profile." };
          ledger.push(blocked);
          addDiagnostic2(blocked.code, blocked.message, mapping?.sourceMarkdownPath);
          continue;
        }
        ledger.push(item);
      }
      for (const [attribute2, value] of Object.entries(annotation.presentation ?? {})) {
        const item = mappedLedger(annotation.blockKey, annotation.storagePath, mapping, "presentation", attribute2, value);
        if (item.blocking || block === void 0 || mapping === void 0) {
          ledger.push(item);
          addDiagnostic2(item.code ?? "PRESERVATION_BLOCK_MAPPING_AMBIGUOUS", item.message, mapping?.sourceMarkdownPath);
          continue;
        }
        const workingIndex = markdownPathIndex(mapping.targetMarkdownPath);
        const targetIndex = workingIndex === void 0 ? void 0 : opaqueProjection.value.profileIndexByWorkingIndex.get(workingIndex);
        const sourceElement = sourceElementAt2(baseDocument, annotation.storagePath);
        if (isInlinePresentationAttribute2(attribute2)) {
          const inlineRange = source.value.sidecar.inlineRanges.find((candidate2) => candidate2.blockKey === annotation.blockKey && candidate2.storagePath === annotation.storagePath && candidate2.attribute === attribute2);
          const sourceStyle2 = sourceElement === void 0 ? void 0 : inspectSourceElementPresentation(sourceElement);
          const sourceBlockElement = sourceElementAt2(baseDocument, block.storagePath);
          const inlineFailure = targetIndex === void 0 || sourceElement === void 0 || sourceBlockElement === void 0 || inlineRange === void 0 || !isSupportedBlockElement(block.nodeName) || !matchesProfileElement(block.nodeName, workingProfile.value.blocks[targetIndex]) || sourceStyle2 === void 0 || sourceStyle2.ok === false || sourceStyle2.value[attribute2] !== value || !isSupportedInlineSourceElement(sourceElement, block, annotation.storagePath) || !matchesSourceInlineBaseline(sourceElement, sourceBlockElement, inlineRange, attribute2, value);
          if (inlineFailure) {
            const lost = inlineMappingLostLedger(annotation.blockKey, annotation.storagePath, attribute2, value, mapping.targetMarkdownPath, sourceStyle2 !== void 0 && sourceStyle2.ok === false ? sourceStyle2.reason : "The inline presentation lacks a supported source element, range baseline, or compatible mapped parent block.");
            ledger.push(lost);
            addDiagnostic2(lost.code, lost.message, mapping.targetMarkdownPath);
            continue;
          }
          if (inlineRange.sourceRange === void 0 || inlineRange.sourceTextOccurrenceCount !== 1 || inlineRange.sourceText.length === 0) {
            const lost = inlineMappingLostLedger(annotation.blockKey, annotation.storagePath, attribute2, value, mapping.targetMarkdownPath, "The source inline presentation does not have one exact normalized-text range.");
            ledger.push(lost);
            addDiagnostic2(lost.code, lost.message, mapping.targetMarkdownPath);
            continue;
          }
          const typed2 = parseInlinePresentation(attribute2, value);
          if (typed2.ok === false) {
            const unsupported = unsupportedLedger(annotation.blockKey, annotation.storagePath, attribute2, value, mapping.targetMarkdownPath, typed2.reason);
            ledger.push(unsupported);
            addDiagnostic2(unsupported.code, unsupported.message, mapping.targetMarkdownPath);
            continue;
          }
          const ledgerIndex2 = ledger.length;
          ledger.push({
            sourceStoragePath: annotation.storagePath,
            blockKey: annotation.blockKey,
            targetMarkdownPath: mapping.targetMarkdownPath,
            targetStoragePath: `$.children[${targetIndex}]`,
            category: "presentation",
            attribute: attribute2,
            sourceValue: value,
            disposition: "unsupported",
            blocking: false,
            message: "The exact inline presentation range is pending candidate reconstruction."
          });
          pendingInline.push({
            attribute: typed2.value.name,
            block,
            blockKey: annotation.blockKey,
            directElement: annotation.storagePath === block.storagePath,
            inlineRange,
            ledgerIndex: ledgerIndex2,
            sourceStoragePath: annotation.storagePath,
            targetIndex,
            typed: typed2.value
          });
          continue;
        }
        if (targetIndex === void 0 || sourceElement === void 0 || annotation.storagePath !== block.storagePath || annotation.nodeName.toLowerCase() !== block.nodeName.toLowerCase() || !isSupportedBlockElement(block.nodeName) || !matchesProfileElement(block.nodeName, workingProfile.value.blocks[targetIndex])) {
          const unsupported = unsupportedLedger(annotation.blockKey, annotation.storagePath, attribute2, value, mapping.targetMarkdownPath, "The presentation attribute is not attached directly to a compatible top-level paragraph or heading.");
          ledger.push(unsupported);
          addDiagnostic2(unsupported.code, unsupported.message, mapping.targetMarkdownPath);
          continue;
        }
        const sourceStyle = inspectSourceElementPresentation(sourceElement);
        if (sourceStyle.ok === false || sourceStyle.value[attribute2] !== value) {
          const unsupported = unsupportedLedger(annotation.blockKey, annotation.storagePath, attribute2, value, mapping.targetMarkdownPath, sourceStyle.ok === false ? sourceStyle.reason : "The sidecar presentation value no longer matches the source Storage element.");
          ledger.push(unsupported);
          addDiagnostic2(unsupported.code, unsupported.message, mapping.targetMarkdownPath);
          continue;
        }
        const typed = parseBlockPresentation(attribute2, value);
        if (typed.ok === false) {
          const unsupported = unsupportedLedger(annotation.blockKey, annotation.storagePath, attribute2, value, mapping.targetMarkdownPath, typed.reason);
          ledger.push(unsupported);
          addDiagnostic2(unsupported.code, unsupported.message, mapping.targetMarkdownPath);
          continue;
        }
        const ledgerIndex = ledger.length;
        ledger.push({
          sourceStoragePath: annotation.storagePath,
          ...annotation.blockKey === void 0 ? {} : { blockKey: annotation.blockKey },
          ...mapping.targetMarkdownPath === void 0 ? {} : { targetMarkdownPath: mapping.targetMarkdownPath },
          targetStoragePath: `$.children[${targetIndex}]`,
          category: "presentation",
          attribute: attribute2,
          sourceValue: value,
          disposition: "unsupported",
          blocking: false,
          message: "The typed block presentation is pending candidate reconstruction."
        });
        pending.push({ attribute: typed.value.name, block, blockKey: annotation.blockKey, ledgerIndex, sourceStoragePath: annotation.storagePath, targetIndex, typed: typed.value });
      }
    }
    const ordinaryCandidate = applyPreservedPresentation(renderStorage(workingProfile.value), pending, pendingInline);
    const candidate = ordinaryCandidate.ok === false ? ordinaryCandidate : applyOpaqueExtensions(ordinaryCandidate.value.storage, opaqueProjection.value.pendingExtensions);
    if (candidate.ok === false) {
      const candidateCode = pendingInline.length > 0 ? "PRESERVATION_INLINE_MAPPING_LOST" : "PRESERVATION_CANDIDATE_INVALID";
      addDiagnostic2(candidateCode, candidate.reason);
      for (const item of pending) ledger[item.ledgerIndex] = unsupportedLedger(item.blockKey, item.sourceStoragePath, item.attribute, item.typed.value, `$.blocks[${item.targetIndex}]`, "The candidate Storage could not receive the reviewed block presentation.");
      for (const item of pendingInline) ledger[item.ledgerIndex] = inlineMappingLostLedger(item.blockKey, item.sourceStoragePath, item.attribute, item.typed.value, `$.blocks[${item.targetIndex}]`, "The candidate Storage could not receive the exact inline presentation range.");
      for (const item of opaqueProjection.value.pendingExtensions) ledger[item.ledgerIndex] = extensionChangedLedger(item.extension, "The candidate Storage could not reinsert the exact opaque extension fragment.");
      return await writePreservingOutcome({ source: source.value, writer, mapped, ledger, diagnostics, blockerCount: blockerCount + pending.length + pendingInline.length + opaqueProjection.value.pendingExtensions.length, candidateEligible: false, action: "blocked", outputDirectory: input.outputDirectory });
    }
    const projected = validateCandidateProjection(candidate.value.storage, pending, pendingInline, opaqueProjection.value.pendingExtensions, source.value.title);
    if (projected.ok === false) {
      addDiagnostic2("PRESERVATION_CANDIDATE_INVALID", projected.reason);
      for (const item of pending) ledger[item.ledgerIndex] = unsupportedLedger(item.blockKey, item.sourceStoragePath, item.attribute, item.typed.value, `$.blocks[${item.targetIndex}]`, "The candidate Storage presentation does not satisfy the typed preservation contract.");
      for (const item of pendingInline) ledger[item.ledgerIndex] = inlineMappingLostLedger(item.blockKey, item.sourceStoragePath, item.attribute, item.typed.value, `$.blocks[${item.targetIndex}]`, "The candidate Storage does not satisfy the exact inline presentation contract.");
      for (const item of opaqueProjection.value.pendingExtensions) ledger[item.ledgerIndex] = extensionChangedLedger(item.extension, "The candidate Storage opaque extension fragment differs from the reviewed source fragment.");
      return await writePreservingOutcome({ source: source.value, writer, mapped, ledger, diagnostics, blockerCount: blockerCount + pending.length + pendingInline.length + opaqueProjection.value.pendingExtensions.length, candidateStorage: candidate.value.storage, candidateEligible: false, action: "blocked", outputDirectory: input.outputDirectory });
    }
    const roundTrip = compareNormalized(workingProfile.value, projected.value.document, sha256(profileMarkdown), sha256(projected.value.visibleStorage));
    if (!roundTrip.structurallyEquivalent) addDiagnostic2("ROUND_TRIP_INVALID", "The candidate Storage does not project to structurally equivalent working Markdown.");
    for (const item of pending) {
      const candidateIndex = candidateIndexForProfileBlock(item.targetIndex, opaqueProjection.value.pendingExtensions);
      ledger[item.ledgerIndex] = {
        blockKey: item.blockKey,
        sourceStoragePath: item.sourceStoragePath,
        targetMarkdownPath: `$.blocks[${item.targetIndex}]`,
        targetStoragePath: `$.children[${candidateIndex}]`,
        category: "presentation",
        attribute: item.attribute,
        sourceValue: item.typed.value,
        disposition: "preserved-equivalent",
        blocking: false,
        message: "The typed block presentation appears in the local candidate with its canonical equivalent value."
      };
    }
    for (const item of pendingInline) {
      const candidateIndex = candidateIndexForProfileBlock(item.targetIndex, opaqueProjection.value.pendingExtensions);
      ledger[item.ledgerIndex] = {
        blockKey: item.blockKey,
        sourceStoragePath: item.sourceStoragePath,
        targetMarkdownPath: `$.blocks[${item.targetIndex}]`,
        targetStoragePath: `$.children[${candidateIndex}]`,
        category: "presentation",
        attribute: item.attribute,
        sourceValue: item.typed.value,
        disposition: "preserved-equivalent",
        blocking: false,
        message: "The typed inline presentation appears at one exact normalized-text range in the local candidate."
      };
    }
    for (const [ordinal, item] of orderedOpaqueExtensions(opaqueProjection.value.pendingExtensions).entries()) {
      const candidateIndex = item.insertionIndex + ordinal;
      ledger[item.ledgerIndex] = { blockKey: item.extension.blockKey, sourceStoragePath: item.extension.storagePath, targetMarkdownPath: `$.blocks[${item.workingIndex}]`, targetStoragePath: `$.children[${candidateIndex}]`, category: "opaqueExtension", attribute: item.extension.kind, sourceValue: item.extension.storageFragmentSha256, disposition: "preserved-exact", blocking: false, message: "The unchanged opaque extension fragment was reinserted byte-for-byte into the local candidate." };
    }
    const candidateEligible = blockerCount === 0 && roundTrip.structurallyEquivalent;
    return await writePreservingOutcome({
      source: source.value,
      writer,
      mapped,
      ledger,
      diagnostics,
      blockerCount,
      candidateStorage: candidate.value.storage,
      previewMarkdown: workingProfileMarkdown(source.value.title, source.value.working.body),
      candidateEligible,
      action: candidateEligible ? "review" : "blocked",
      outputDirectory: input.outputDirectory,
      roundTrip
    });
  } catch {
    if (writer !== void 0) await writer.abort();
    return prepareMarkdownUpdateFailure([{ severity: "error", code: "FILESYSTEM_ERROR", message: "The preserving Markdown update artifacts could not be written safely.", operation: operationName3, pageId: input.pageId }]);
  }
}
async function writePreservingOutcome(input) {
  const artifacts = {
    baseStorage: await input.writer.writeArtifact("baseStorage", input.source.baseStorage),
    workingMarkdown: await input.writer.writeArtifact("workingMarkdown", input.source.workingMarkdown),
    blockMapping: await input.writer.writeArtifact("blockMapping", `${stringifyJson({ schemaVersion: "miku-confluence.markdown-block-mapping/v1", profileVersion: preservationProfileVersion, pageId: input.source.pageId, mappings: input.mapped.mappings, newWorkingMarkdownPaths: input.mapped.newWorkingMarkdownPaths })}
`),
    preservationLedger: await input.writer.writeArtifact("preservationLedger", `${stringifyJson({ schemaVersion: "miku-confluence.markdown-preservation-ledger/v2", profileVersion: preservationProfileVersion, pageId: input.source.pageId, items: input.ledger })}
`)
  };
  if (input.candidateStorage !== void 0) artifacts.candidateStorage = await input.writer.writeArtifact("candidateStorage", input.candidateStorage);
  if (input.previewMarkdown !== void 0) artifacts.previewMarkdown = await input.writer.writeArtifact("previewMarkdown", input.previewMarkdown);
  artifacts.candidatePreservation = await input.writer.writeArtifact("candidatePreservation", `${stringifyJson({ schemaVersion: candidatePreservationSchemaVersion, profileVersion: preservationProfileVersion, pageId: input.source.pageId, sourceSidecarSha256: input.source.sidecarSha256, candidateStorageSha256: input.candidateStorage === void 0 ? void 0 : sha256(input.candidateStorage), items: input.ledger })}
`);
  artifacts.diagnostics = await input.writer.writeArtifact("diagnostics", `${stringifyJson(diagnosticsDocument(input.source.pageId, input.diagnostics, input.blockerCount))}
`);
  const plan = {
    schemaVersion: preservingPlanSchemaVersion,
    profileVersion: preservationProfileVersion,
    page: { id: input.source.pageId, title: input.source.title, status: "current", baseVersion: input.source.baseVersion },
    source: {
      snapshotSchemaVersion: "miku-confluence.export/v1",
      ...input.source.openApiSha256 === void 0 ? {} : { openApiSha256: input.source.openApiSha256 },
      baseStorageSha256: input.source.baseStorageSha256,
      sidecarSha256: input.source.sidecarSha256
    },
    artifacts,
    assessment: {
      candidateGeneration: input.candidateStorage === void 0 ? "blocked" : "complete",
      candidateEligible: input.candidateEligible,
      applyAction: input.action,
      applyEligible: false,
      blockerCount: input.blockerCount,
      ...input.roundTrip === void 0 ? {} : { roundTrip: input.roundTrip.classification }
    },
    safety: { requiredPermission: "READ", applyAvailable: false, automaticRetry: false, automaticMerge: false }
  };
  const planDigest = sha256(canonicalJson(plan));
  await input.writer.writePlan({ ...plan, planDigest: { algorithm: "sha256", canonicalization: "RFC8785", value: planDigest } });
  await input.writer.finalize();
  const result3 = { pageId: input.source.pageId, outputDirectory: input.outputDirectory, action: input.action, applyEligible: false, planDigest };
  return {
    schemaVersion: 1,
    operation: operationName3,
    kind: "workflow",
    success: input.action !== "blocked",
    result: result3,
    diagnostics: input.action === "blocked" ? input.diagnostics : []
  };
}
async function readPreservingSource(input) {
  const root = resolve3(input.snapshotDirectory);
  const rootStat = await safeLstat2(root);
  if (rootStat === void 0 || !rootStat.isDirectory() || rootStat.isSymbolicLink()) return invalidSnapshot2();
  const manifest = await readJsonFile2(resolve3(root, "export.json"));
  const tree = await readJsonFile2(resolve3(root, "tree.json"));
  if (!isRecord7(manifest) || manifest.schemaVersion !== "miku-confluence.export/v1" || manifest.complete !== true || !isRecord7(tree) || tree.schemaVersion !== "miku-confluence.tree/v1" || !Array.isArray(tree.nodes)) return invalidSnapshot2();
  if (!tree.nodes.some((node) => isRecord7(node) && node.pageId === input.pageId && node.artifactStatus === "written")) return sourceFailure("PAGE_ID_MISMATCH", "The requested page ID is not a written page in the complete snapshot.", input.pageId);
  const pageDirectory = resolve3(root, "pages", input.pageId);
  const pageDirectoryStat = await safeLstat2(pageDirectory);
  if (pageDirectoryStat === void 0 || !pageDirectoryStat.isDirectory() || pageDirectoryStat.isSymbolicLink()) return invalidSnapshot2();
  const page = await readJsonFile2(resolve3(pageDirectory, "page.api-v2.json"));
  const storage = await readRegularTextFile2(resolve3(pageDirectory, "body.storage.xml"));
  if (!isRecord7(page) || page.id !== input.pageId || page.status !== "current" || typeof page.title !== "string" || !isRecord7(page.version) || typeof page.version.number !== "number" || !Number.isSafeInteger(page.version.number) || page.version.number < 1 || storage === void 0 || storageValue2(page) !== storage) return invalidSnapshot2();
  const pageVersion2 = page.version.number;
  const baseStorageSha256 = sha256(storage);
  if (input.expectedBaseStorageSha256 !== void 0 && input.expectedBaseStorageSha256 !== baseStorageSha256) return sourceFailure("SOURCE_DIGEST_MISMATCH", "The expected base Storage XML digest does not match the complete snapshot.", input.pageId, "$.expectedBaseStorageSha256");
  const workingMarkdown = await readRegularTextFile2(resolve3(input.workingMarkdownPath));
  if (workingMarkdown === void 0) return sourceFailure("INVALID_INPUT", "The working Markdown path must name a regular, non-symbolic-link UTF-8 file.", input.pageId, "$.workingMarkdownPath");
  if (input.expectedWorkingMarkdownSha256 !== void 0 && input.expectedWorkingMarkdownSha256 !== sha256(workingMarkdown)) return sourceFailure("SOURCE_DIGEST_MISMATCH", "The expected working Markdown digest does not match the input file.", input.pageId, "$.expectedWorkingMarkdownSha256");
  const working = parsePreservationDocument(workingMarkdown, page.title);
  if (working.ok === false) return sourceFailure("PRESERVATION_FRONT_MATTER_INVALID", working.reason, input.pageId, "$.workingMarkdownPath");
  if (working.value.frontMatter.pageId !== input.pageId || working.value.frontMatter.storageSha256 !== baseStorageSha256 || working.value.frontMatter.version !== pageVersion2 || working.value.frontMatter.spaceId !== void 0 && working.value.frontMatter.spaceId !== page.spaceId) return sourceFailure("PRESERVATION_BASE_MISMATCH", "The working Markdown provenance does not match the complete snapshot page.", input.pageId, "$.workingMarkdownPath");
  const workingDirectory = dirname3(resolve3(input.workingMarkdownPath));
  const sidecarPath = resolve3(workingDirectory, working.value.frontMatter.attributesPath);
  if (sidecarPath !== resolve3(workingDirectory, "page.attributes.json")) return sourceFailure("PRESERVATION_SIDECAR_MISSING", "The generated attribute sidecar path is unsafe or unsupported.", input.pageId, "$.workingMarkdownPath");
  const sidecarText = await readRegularTextFile2(sidecarPath);
  if (sidecarText === void 0) return sourceFailure("PRESERVATION_SIDECAR_MISSING", "The generated attribute sidecar is missing or unsafe.", input.pageId, "$.workingMarkdownPath");
  const sidecarSha256 = sha256(sidecarText);
  if (sidecarSha256 !== working.value.frontMatter.attributesSha256) return sourceFailure("PRESERVATION_SIDECAR_DIGEST_MISMATCH", "The attribute sidecar bytes do not match the front matter digest.", input.pageId, "$.workingMarkdownPath");
  const sidecar = validatePreservationSidecar(parseJson2(sidecarText));
  if (sidecar.ok === false) return sourceFailure("PRESERVATION_SIDECAR_VERSION_UNSUPPORTED", sidecar.reason, input.pageId, "$.workingMarkdownPath");
  if (sidecar.value.pageId !== input.pageId || sidecar.value.source.storageSha256 !== baseStorageSha256 || sidecar.value.source.version !== pageVersion2) return sourceFailure("PRESERVATION_BASE_MISMATCH", "The attribute sidecar provenance does not match the complete snapshot page.", input.pageId, "$.workingMarkdownPath");
  const openApiSha256 = isRecord7(manifest.api) && isDigest2(manifest.api.openApiSha256) ? manifest.api.openApiSha256 : void 0;
  return { ok: true, value: { baseStorage: storage, baseStorageSha256, baseVersion: pageVersion2, ...openApiSha256 === void 0 ? {} : { openApiSha256 }, pageId: input.pageId, sidecar: sidecar.value, sidecarSha256, title: page.title, workingMarkdown, working: working.value } };
}
function projectOpaqueExtensions(source, mappingByKey, baseDocument, ledger, addDiagnostic2) {
  const records = parsePreservationBodyBlocks(source.working.body);
  if (records.length !== source.working.blocks.length) {
    addDiagnostic2("PRESERVATION_EXTENSION_CHANGED", "The working Markdown extension blocks could not be aligned with the preservation block map.");
    return { ok: false };
  }
  const extensionByTarget = /* @__PURE__ */ new Map();
  const seenExtensionKeys = /* @__PURE__ */ new Set();
  let valid = true;
  const reject = (extension, message, path2) => {
    ledger.push(extensionChangedLedger(extension, message));
    addDiagnostic2("PRESERVATION_EXTENSION_CHANGED", message, path2);
    valid = false;
  };
  for (const extension of source.sidecar.extensions) {
    const mapping = mappingByKey.get(extension.blockKey);
    const block = source.sidecar.blocks.find((candidate) => candidate.blockKey === extension.blockKey);
    const targetIndex = markdownPathIndex(mapping?.targetMarkdownPath);
    const sourceElement = sourceElementAt2(baseDocument, extension.storagePath);
    if (block === void 0 || block.storagePath !== extension.storagePath || sourceElement === void 0 || serializeElement(sourceElement) !== extension.storageFragment || sha256(extension.storageFragment) !== extension.storageFragmentSha256 || opaqueKindForElement(sourceElement) !== extension.kind) {
      reject(extension, "The opaque extension sidecar fragment no longer matches the canonical source Storage.", mapping?.sourceMarkdownPath);
      continue;
    }
    if (mapping === void 0 || mapping.state !== "unchanged" && mapping.state !== "moved" || targetIndex === void 0 || seenExtensionKeys.has(extension.blockKey)) {
      reject(extension, "The opaque extension was deleted, edited, duplicated, or has no unique mapped destination.", mapping?.sourceMarkdownPath);
      continue;
    }
    const parsed = parseConfluenceExtensionBlock(records[targetIndex]?.source ?? "");
    if (!parsed.extension || parsed.ok === false || parsed.value.blockKey !== extension.blockKey || parsed.value.kind !== extension.kind || parsed.value.label !== extension.label) {
      reject(extension, "The compact opaque extension block was changed or does not match its sidecar fragment.", mapping?.targetMarkdownPath);
      continue;
    }
    seenExtensionKeys.add(extension.blockKey);
    extensionByTarget.set(targetIndex, { extension, ledgerIndex: ledger.length });
    ledger.push({ blockKey: extension.blockKey, sourceStoragePath: extension.storagePath, ...mapping.targetMarkdownPath === void 0 ? {} : { targetMarkdownPath: mapping.targetMarkdownPath }, category: "opaqueExtension", attribute: extension.kind, sourceValue: extension.storageFragmentSha256, disposition: "unsupported", blocking: false, message: "The unchanged opaque extension is pending exact candidate reinsertion." });
  }
  for (let index = 0; index < records.length; index += 1) {
    const parsed = parseConfluenceExtensionBlock(records[index]?.source ?? "");
    if (parsed.extension && (parsed.ok === false || !extensionByTarget.has(index))) {
      const synthetic = { blockKey: parsed.extension && parsed.ok ? parsed.value.blockKey : "b-unknown", kind: parsed.extension && parsed.ok ? parsed.value.kind : "storage-node", label: parsed.extension && parsed.ok ? parsed.value.label : "extension", storagePath: "$", storageFragment: "", storageFragmentSha256: "" };
      reject(synthetic, "The working Markdown contains an unknown, duplicate, or malformed compact opaque extension block.", `$.blocks[${index}]`);
    }
  }
  if (!valid) return { ok: false };
  const profileIndexByWorkingIndex = /* @__PURE__ */ new Map();
  const pendingExtensions = [];
  const profileRecords = [];
  for (let index = 0; index < records.length; index += 1) {
    const extension = extensionByTarget.get(index);
    if (extension !== void 0) {
      pendingExtensions.push({ extension: extension.extension, insertionIndex: profileRecords.length, ledgerIndex: extension.ledgerIndex, workingIndex: index });
      continue;
    }
    const record = records[index];
    if (record === void 0) continue;
    profileIndexByWorkingIndex.set(index, profileRecords.length);
    profileRecords.push({ kind: record.normalized.kind, source: record.source });
  }
  return { ok: true, value: { pendingExtensions, profileBlocks: profileRecords.map((record) => ({ kind: record.kind })), profileBody: profileRecords.map((record) => record.source).join("\n\n"), profileIndexByWorkingIndex } };
}
function verifyProfileAlignment(working, profileBlocks) {
  if (working.length !== profileBlocks.length) return { ok: false, reason: "The preservation block parser and writable Markdown profile do not agree on the top-level block sequence." };
  for (let index = 0; index < working.length; index += 1) {
    if (working[index]?.kind !== preservationKind(profileBlocks[index])) return { ok: false, reason: `The preservation block parser and writable Markdown profile disagree at $.blocks[${index}].` };
  }
  return { ok: true };
}
function mappedLedger(blockKey, storagePath, mapping, category, attribute2, value) {
  const identity = { ...blockKey === void 0 ? {} : { blockKey }, sourceStoragePath: storagePath, category, attribute: attribute2, sourceValue: value };
  if (mapping === void 0 || mapping.state === "ambiguous" || mapping.state === "incompatible") return { ...identity, disposition: "mapping-lost", blocking: true, code: "PRESERVATION_BLOCK_MAPPING_AMBIGUOUS", message: "The preserved item has no unique compatible Markdown block mapping." };
  if (mapping.state === "deleted") return { ...identity, disposition: "removed-pending-review", blocking: true, code: "PRESERVATION_REMOVAL_REQUIRES_REVIEW", message: "The preserved item belongs to a deleted Markdown block and needs item-scoped review." };
  return { ...identity, ...mapping.targetMarkdownPath === void 0 ? {} : { targetMarkdownPath: mapping.targetMarkdownPath }, disposition: "unsupported", blocking: false, message: "The preserved item has a unique compatible Markdown block mapping." };
}
function exactLedger(blockKey, storagePath, category, attribute2, value) {
  return { ...blockKey === void 0 ? {} : { blockKey }, sourceStoragePath: storagePath, category, attribute: attribute2, sourceValue: value, disposition: "preserved-exact", blocking: false, message: "The source Storage is retained byte-for-byte because the visible Markdown is a no-op." };
}
function unsupportedLedger(blockKey, storagePath, attribute2, value, targetMarkdownPath, reason) {
  return { ...blockKey === void 0 ? {} : { blockKey }, sourceStoragePath: storagePath, ...targetMarkdownPath === void 0 ? {} : { targetMarkdownPath }, category: "presentation", attribute: attribute2, sourceValue: value, disposition: "unsupported", blocking: true, code: "PRESERVATION_ATTRIBUTE_UNSUPPORTED", message: reason };
}
function inlineMappingLostLedger(blockKey, storagePath, attribute2, value, targetMarkdownPath, reason) {
  return { ...blockKey === void 0 ? {} : { blockKey }, sourceStoragePath: storagePath, ...targetMarkdownPath === void 0 ? {} : { targetMarkdownPath }, category: "presentation", attribute: attribute2, sourceValue: value, disposition: "mapping-lost", blocking: true, code: "PRESERVATION_INLINE_MAPPING_LOST", message: reason };
}
function extensionChangedLedger(extension, reason) {
  return { blockKey: extension.blockKey, sourceStoragePath: extension.storagePath, category: "opaqueExtension", attribute: extension.kind, sourceValue: extension.storageFragmentSha256, disposition: "mapping-lost", blocking: true, code: "PRESERVATION_EXTENSION_CHANGED", message: reason };
}
function inspectSourceElementPresentation(element) {
  const values = {};
  const dataFontSize = element.getAttribute("data-font-size");
  if (dataFontSize !== null && dataFontSize.length > 0) values["data-font-size"] = dataFontSize;
  const style = element.getAttribute("style");
  if (style !== null) {
    const parsed = parseConservativeStyle(style);
    if (parsed.ok === false) return parsed;
    for (const declaration of parsed.declarations) {
      if (!presentationNames.has(declaration.name)) return { ok: false, reason: `The source Storage has an unreviewed style declaration ${declaration.name}.` };
      values[declaration.name] = declaration.value;
    }
  }
  return { ok: true, value: values };
}
function isInlinePresentationAttribute2(value) {
  return value === "background-color" || value === "color" || value === "data-font-size" || value === "font-size";
}
function unreviewedSourcePresentation(document, sidecar) {
  const root = document.documentElement;
  if (root === null) return [{ attribute: "style", reason: "The source Storage has no root for presentation inspection.", storagePath: "$" }];
  const annotations = new Map(sidecar.annotations.map((annotation) => [annotation.storagePath, annotation]));
  const issues = [];
  const blockKeyAt = (storagePath) => sidecar.blocks.filter((block) => storagePath === block.storagePath || storagePath.startsWith(`${block.storagePath}.children[`)).sort((left, right) => right.storagePath.length - left.storagePath.length)[0]?.blockKey;
  const visit = (node, storagePath) => {
    if (node.nodeType === import_xmldom4.Node.ELEMENT_NODE) {
      const element = node;
      const annotation = annotations.get(storagePath);
      const blockKey = blockKeyAt(storagePath);
      const identity = blockKey === void 0 ? {} : { blockKey };
      const dataFontSize = element.getAttribute("data-font-size");
      if (dataFontSize !== null && dataFontSize.length > 0 && annotation?.presentation?.["data-font-size"] !== dataFontSize) {
        issues.push({ ...identity, storagePath, attribute: "data-font-size", value: dataFontSize, reason: "The source data-font-size is not represented by the digest-bound sidecar." });
      }
      const style = element.getAttribute("style");
      if (style !== null) {
        const parsed = parseConservativeStyle(style);
        if (parsed.ok === false) {
          issues.push({ ...identity, storagePath, attribute: "style", value: style, reason: `The source style cannot be safely classified: ${parsed.reason}.` });
        } else if (!isSemanticStrikeStyle(element, parsed.declarations)) {
          for (const declaration of parsed.declarations) {
            if (!presentationNames.has(declaration.name) || annotation?.presentation?.[declaration.name] !== declaration.value) {
              issues.push({ ...identity, storagePath, attribute: declaration.name, value: declaration.value, reason: !presentationNames.has(declaration.name) ? `The source Storage has an unreviewed style declaration ${declaration.name}.` : `The source style declaration ${declaration.name} is not represented by the digest-bound sidecar.` });
            }
          }
        }
      }
    }
    for (let index = 0; index < node.childNodes.length; index += 1) {
      const child = node.childNodes.item(index);
      if (child !== null) visit(child, `${storagePath}.children[${index}]`);
    }
  };
  for (let index = 0; index < root.childNodes.length; index += 1) {
    const child = root.childNodes.item(index);
    if (child !== null) visit(child, `$.children[${index}]`);
  }
  return issues;
}
function isSemanticStrikeStyle(element, declarations) {
  return element.nodeName.toLowerCase() === "span" && declarations.length === 1 && declarations[0]?.name === "text-decoration" && declarations[0]?.value === "line-through";
}
function applyPreservedPresentation(storage, blockItems, inlineItems) {
  const blocks = applyBlockPresentation(storage, blockItems);
  return blocks.ok === false ? blocks : applyInlinePresentation(blocks.value.storage, inlineItems);
}
function applyBlockPresentation(storage, items) {
  try {
    const document = parseStorageFragment4(storage);
    const root = document.documentElement;
    if (root === null) return { ok: false, reason: "The generated candidate Storage has no root." };
    const elements = topLevelElements(root);
    const byTarget = /* @__PURE__ */ new Map();
    for (const item of items) byTarget.set(item.targetIndex, [...byTarget.get(item.targetIndex) ?? [], item]);
    for (const [targetIndex, targetItems] of byTarget) {
      const element = elements[targetIndex];
      if (element === void 0 || !targetItems.every((item) => element.nodeName.toLowerCase() === item.block.nodeName.toLowerCase())) return { ok: false, reason: "A mapped candidate block does not retain the reviewed top-level element kind." };
      if (new Set(targetItems.map((item) => item.attribute)).size !== targetItems.length) return { ok: false, reason: "Multiple source presentation items target the same candidate CSS property." };
      element.setAttribute("style", canonicalBlockStyle(targetItems.map((item) => item.typed)));
    }
    return { ok: true, value: { storage: serializeFragment(root) } };
  } catch {
    return { ok: false, reason: "The generated candidate Storage could not be parsed for presentation reconstruction." };
  }
}
function applyInlinePresentation(storage, items) {
  try {
    const document = parseStorageFragment4(storage);
    const root = document.documentElement;
    if (root === null) return { ok: false, reason: "The generated candidate Storage has no root." };
    const elements = topLevelElements(root);
    const direct = /* @__PURE__ */ new Map();
    const wrapped = /* @__PURE__ */ new Map();
    for (const item of items) {
      if (item.directElement) direct.set(item.targetIndex, [...direct.get(item.targetIndex) ?? [], item]);
      else {
        const key = `${item.targetIndex}\0${item.sourceStoragePath}`;
        wrapped.set(key, [...wrapped.get(key) ?? [], item]);
      }
    }
    for (const [targetIndex, targetItems] of direct) {
      const element = elements[targetIndex];
      if (element === void 0 || !targetItems.every((item) => element.nodeName.toLowerCase() === item.block.nodeName.toLowerCase())) return { ok: false, reason: "A mapped inline presentation does not retain its reviewed top-level element kind." };
      const range = exactCandidateRange(element, targetItems[0]?.inlineRange);
      if (range === void 0 || range.start !== 0 || range.end !== range.text.length) return { ok: false, reason: "An element-scoped presentation no longer covers one exact unchanged text range." };
      if (!mergePresentationOnElement(element, targetItems.map((item) => item.typed))) return { ok: false, reason: "Multiple source presentation items conflict on one candidate element." };
    }
    const ranges = [];
    for (const targetItems of wrapped.values()) {
      const targetIndex = targetItems[0]?.targetIndex;
      if (targetIndex === void 0) return { ok: false, reason: "A mapped inline presentation has no candidate parent." };
      const element = targetIndex === void 0 ? void 0 : elements[targetIndex];
      if (element === void 0 || !targetItems.every((item) => !item.directElement && item.targetIndex === targetIndex && item.block.nodeName.toLowerCase() === element.nodeName.toLowerCase())) return { ok: false, reason: "A mapped inline presentation does not retain its reviewed parent element." };
      const range = exactCandidateRange(element, targetItems[0]?.inlineRange);
      if (range === void 0 || !targetItems.every((item) => sameInlineRange(item.inlineRange, targetItems[0].inlineRange))) return { ok: false, reason: "An inline presentation range is no longer unique and exact in the candidate." };
      ranges.push({ targetIndex, start: range.start, end: range.end, items: targetItems });
    }
    ranges.sort((left, right) => left.targetIndex - right.targetIndex || right.start - left.start || right.end - left.end);
    for (let index = 1; index < ranges.length; index += 1) {
      const previous = ranges[index - 1];
      const current = ranges[index];
      if (previous !== void 0 && current !== void 0 && previous.targetIndex === current.targetIndex && current.end > previous.start) return { ok: false, reason: "Two independent inline presentation ranges overlap in the candidate." };
    }
    for (const range of ranges) {
      const element = elements[range.targetIndex];
      if (element === void 0 || !wrapExactTextRange(element, range.start, range.end, range.items.map((item) => item.typed))) return { ok: false, reason: "An exact inline presentation range does not fit within one candidate text node." };
    }
    return { ok: true, value: { storage: serializeFragment(root) } };
  } catch {
    return { ok: false, reason: "The generated candidate Storage could not be parsed for inline presentation reconstruction." };
  }
}
function applyOpaqueExtensions(storage, items) {
  try {
    const document = parseStorageFragment4(storage);
    const root = document.documentElement;
    if (root === null) return { ok: false, reason: "The generated candidate Storage has no root for opaque extension insertion." };
    let inserted = 0;
    for (const item of orderedOpaqueExtensions(items)) {
      const fragment = singleFragmentElement(item.extension.storageFragment);
      if (fragment === void 0 || sha256(item.extension.storageFragment) !== item.extension.storageFragmentSha256) return { ok: false, reason: "An opaque extension fragment is not one validated Storage element." };
      const candidateIndex = item.insertionIndex + inserted;
      const reference = topLevelElements(root)[candidateIndex];
      const copy = fragment.cloneNode(true);
      if (reference === void 0) root.appendChild(copy);
      else root.insertBefore(copy, reference);
      inserted += 1;
    }
    return { ok: true, value: { storage: serializeFragment(root) } };
  } catch {
    return { ok: false, reason: "The generated candidate Storage could not reinsert opaque extension fragments." };
  }
}
function validateCandidateProjection(storage, blockItems, inlineItems, opaqueItems, title) {
  try {
    const document = parseStorageFragment4(storage);
    const root = document.documentElement;
    if (root === null) return { ok: false, reason: "The candidate Storage has no root." };
    const elements = topLevelElements(root);
    const blockByTarget = /* @__PURE__ */ new Map();
    const directByTarget = /* @__PURE__ */ new Map();
    for (const item of blockItems) blockByTarget.set(item.targetIndex, [...blockByTarget.get(item.targetIndex) ?? [], item]);
    for (const item of inlineItems.filter((candidate) => candidate.directElement)) directByTarget.set(item.targetIndex, [...directByTarget.get(item.targetIndex) ?? [], item]);
    const targetIndexes = /* @__PURE__ */ new Set([...blockByTarget.keys(), ...directByTarget.keys()]);
    for (const targetIndex of targetIndexes) {
      const element = elements[targetIndex];
      if (element === void 0) return { ok: false, reason: "A candidate presentation target is missing." };
      const targetItems = blockByTarget.get(targetIndex) ?? [];
      const directItems = directByTarget.get(targetIndex) ?? [];
      const actual = element.getAttribute("style");
      const expected = canonicalMergedStyle(targetItems.map((item) => item.typed), directItems.map((item) => item.typed));
      if ((expected.length === 0 ? null : expected) !== actual) return { ok: false, reason: "A candidate presentation style differs from its canonical typed value." };
      if (expected.length > 0) element.removeAttribute("style");
      const dataFont = directItems.find((item) => item.typed.name === "data-font-size")?.typed.value;
      if ((dataFont ?? null) !== element.getAttribute("data-font-size")) return { ok: false, reason: "A candidate data-font-size differs from its canonical typed value." };
      if (dataFont !== void 0) element.removeAttribute("data-font-size");
    }
    for (const items of groupWrappedInlineItems(inlineItems)) {
      const target = elements[items[0].targetIndex];
      if (target === void 0 || !unwrapExactInlineSpan(target, items)) return { ok: false, reason: "A candidate inline presentation range differs from its canonical typed value." };
    }
    const opaqueElements = [];
    let inserted = 0;
    for (const item of orderedOpaqueExtensions(opaqueItems)) {
      const candidateIndex = item.insertionIndex + inserted;
      const element = topLevelElements(root)[candidateIndex];
      if (element === void 0 || serializeElement(element) !== item.extension.storageFragment || sha256(item.extension.storageFragment) !== item.extension.storageFragmentSha256) return { ok: false, reason: "A candidate opaque extension fragment differs from the reviewed source fragment." };
      opaqueElements.push({ element, item });
      inserted += 1;
    }
    for (const opaque of opaqueElements.reverse()) {
      if (opaque.element.parentNode === null) return { ok: false, reason: "A candidate opaque extension fragment is detached from its expected parent." };
      opaque.element.parentNode.removeChild(opaque.element);
    }
    const visibleStorage = serializeFragment(root);
    const parsed = parseStorageToNormalized(visibleStorage, title);
    if (parsed.ok === false) return { ok: false, reason: `The candidate Storage outside preserved attributes is not writable: ${parsed.problem.message}` };
    return { ok: true, value: { document: parsed.value, visibleStorage } };
  } catch {
    return { ok: false, reason: "The candidate Storage could not be validated after removing reviewed presentation attributes." };
  }
}
function exactCandidateRange(element, baseline) {
  if (baseline === void 0 || baseline.sourceRange === void 0 || baseline.sourceTextOccurrenceCount !== 1 || baseline.sourceText.length === 0) return void 0;
  const text = element.textContent ?? "";
  if (normalizeInlineText2(text) !== text) return void 0;
  const occurrences = countOccurrences2(text, baseline.sourceText);
  if (occurrences !== 1) return void 0;
  const start = text.indexOf(baseline.sourceText);
  return start < 0 ? void 0 : { start, end: start + baseline.sourceText.length, text };
}
function sameInlineRange(left, right) {
  return left.itemKey === right.itemKey || left.storagePath === right.storagePath && left.sourceTextSha256 === right.sourceTextSha256 && left.sourceRange?.start === right.sourceRange?.start && left.sourceRange?.end === right.sourceRange?.end;
}
function mergePresentationOnElement(element, items) {
  if (new Set(items.map((item) => item.name)).size !== items.length) return false;
  const existingStyle = element.getAttribute("style");
  const parsed = existingStyle === null ? { ok: true, declarations: [] } : parseConservativeStyle(existingStyle);
  if (parsed.ok === false) return false;
  const declarations = new Map(parsed.declarations.map((item) => [item.name, item.value]));
  for (const item of items) {
    if (item.name === "data-font-size") continue;
    if (declarations.has(item.name)) return false;
    declarations.set(item.name, item.value);
  }
  const dataFont = items.find((item) => item.name === "data-font-size")?.value;
  if (dataFont !== void 0 && element.getAttribute("data-font-size") !== null) return false;
  const style = [...declarations.entries()].sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0).map(([name, value]) => `${name}: ${value};`).join(" ");
  if (style.length > 0) element.setAttribute("style", style);
  if (dataFont !== void 0) element.setAttribute("data-font-size", dataFont);
  return true;
}
function wrapExactTextRange(element, start, end, items) {
  if (new Set(items.map((item) => item.name)).size !== items.length || start < 0 || end <= start) return false;
  let offset = 0;
  for (const textNode of textNodes(element)) {
    const value = textNode.nodeValue ?? "";
    const nodeStart = offset;
    const nodeEnd = offset + value.length;
    if (start >= nodeStart && end <= nodeEnd) {
      const parent = textNode.parentNode;
      const owner = textNode.ownerDocument;
      if (parent === null || owner === null) return false;
      const localStart = start - nodeStart;
      const localEnd = end - nodeStart;
      const before = value.slice(0, localStart);
      const selected = value.slice(localStart, localEnd);
      const after = value.slice(localEnd);
      if (selected.length === 0) return false;
      const span = owner.createElement("span");
      const style = canonicalInlineStyle(items);
      const dataFont = items.find((item) => item.name === "data-font-size")?.value;
      if (style.length > 0) span.setAttribute("style", style);
      if (dataFont !== void 0) span.setAttribute("data-font-size", dataFont);
      span.appendChild(owner.createTextNode(selected));
      if (before.length > 0) parent.insertBefore(owner.createTextNode(before), textNode);
      parent.insertBefore(span, textNode);
      if (after.length > 0) parent.insertBefore(owner.createTextNode(after), textNode);
      parent.removeChild(textNode);
      return true;
    }
    offset = nodeEnd;
  }
  return false;
}
function groupWrappedInlineItems(items) {
  const grouped = /* @__PURE__ */ new Map();
  for (const item of items) {
    if (item.directElement) continue;
    const key = `${item.targetIndex}\0${item.sourceStoragePath}`;
    grouped.set(key, [...grouped.get(key) ?? [], item]);
  }
  return [...grouped.values()];
}
function unwrapExactInlineSpan(target, items) {
  const expectedStyle = canonicalInlineStyle(items.map((item) => item.typed));
  const expectedDataFont = items.find((item) => item.typed.name === "data-font-size")?.typed.value;
  const expectedText = items[0]?.inlineRange.sourceText;
  const matches = descendantElements(target).filter((element) => element.nodeName.toLowerCase() === "span" && element.getAttribute("style") === (expectedStyle.length === 0 ? null : expectedStyle) && element.getAttribute("data-font-size") === (expectedDataFont ?? null) && element.textContent === expectedText);
  const span = matches[0];
  if (span === void 0 || matches.length !== 1 || span.parentNode === null) return false;
  const parent = span.parentNode;
  while (span.firstChild !== null) parent.insertBefore(span.firstChild, span);
  parent.removeChild(span);
  return true;
}
function canonicalMergedStyle(blockItems, inlineItems) {
  const declarations = [
    ...blockItems.map((item) => ({ name: item.name, value: item.value })),
    ...inlineItems.filter((item) => item.name !== "data-font-size").map((item) => ({ name: item.name, value: item.value }))
  ];
  if (new Set(declarations.map((item) => item.name)).size !== declarations.length) return "";
  return declarations.sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0).map((item) => `${item.name}: ${item.value};`).join(" ");
}
function textNodes(root) {
  const result3 = [];
  const visit = (node) => {
    if (node.nodeType === import_xmldom4.Node.TEXT_NODE || node.nodeType === import_xmldom4.Node.CDATA_SECTION_NODE) {
      result3.push(node);
      return;
    }
    for (let index = 0; index < node.childNodes.length; index += 1) {
      const child = node.childNodes.item(index);
      if (child !== null) visit(child);
    }
  };
  visit(root);
  return result3;
}
function descendantElements(root) {
  const result3 = [];
  const visit = (node) => {
    for (let index = 0; index < node.childNodes.length; index += 1) {
      const child = node.childNodes.item(index);
      if (child === null) continue;
      if (child.nodeType === import_xmldom4.Node.ELEMENT_NODE) result3.push(child);
      visit(child);
    }
  };
  visit(root);
  return result3;
}
function normalizeInlineText2(value) {
  return value.replace(/\r\n?/gu, "\n").replace(/[\t\n ]+/gu, " ").trim();
}
function countOccurrences2(value, needle) {
  if (needle.length === 0) return 0;
  let count = 0;
  let offset = 0;
  while (offset <= value.length - needle.length) {
    const index = value.indexOf(needle, offset);
    if (index < 0) break;
    count += 1;
    offset = index + needle.length;
  }
  return count;
}
function parseStorageFragment4(storage) {
  const parser = new import_xmldom4.DOMParser({ locator: false, onError(level, message) {
    if (level !== "warning") throw new Error(message);
  } });
  return parser.parseFromString(`<miku-root xmlns:ac="http://atlassian.com/content" xmlns:ri="http://atlassian.com/resource/identifier">${storage}</miku-root>`, "application/xml");
}
function sourceElementAt2(document, storagePath) {
  const root = document.documentElement;
  if (root === null || !storagePath.startsWith("$")) return void 0;
  let node = root;
  const segments = [...storagePath.matchAll(/\.children\[([0-9]+)\]/gu)];
  if (`$${segments.map((item) => `.children[${item[1]}]`).join("")}` !== storagePath) return void 0;
  for (const segment of segments) {
    const index = Number(segment[1]);
    const child = node.childNodes.item(index);
    if (child === null) return void 0;
    node = child;
  }
  return node.nodeType === import_xmldom4.Node.ELEMENT_NODE ? node : void 0;
}
function topLevelElements(root) {
  const elements = [];
  for (let index = 0; index < root.childNodes.length; index += 1) {
    const child = root.childNodes.item(index);
    if (child?.nodeType === import_xmldom4.Node.ELEMENT_NODE) elements.push(child);
  }
  return elements;
}
function orderedOpaqueExtensions(items) {
  return [...items].sort((left, right) => left.insertionIndex - right.insertionIndex || left.workingIndex - right.workingIndex);
}
function candidateIndexForProfileBlock(profileIndex, extensions) {
  return profileIndex + extensions.filter((item) => item.insertionIndex <= profileIndex).length;
}
function singleFragmentElement(storage) {
  const root = parseStorageFragment4(storage).documentElement;
  if (root === null) return void 0;
  const elements = topLevelElements(root);
  if (elements.length !== 1) return void 0;
  for (let index = 0; index < root.childNodes.length; index += 1) {
    const node = root.childNodes.item(index);
    if (node !== null && node.nodeType !== import_xmldom4.Node.ELEMENT_NODE && (node.nodeValue ?? "").trim().length > 0) return void 0;
  }
  return elements[0];
}
function serializeElement(element) {
  return serializer2.serializeToString(element);
}
function opaqueKindForElement(element) {
  const tag = element.nodeName.toLowerCase();
  return tag === "table" ? "complex-table" : tag === "ac:structured-macro" ? "structured-macro" : "storage-node";
}
function serializeFragment(root) {
  let output = "";
  for (let index = 0; index < root.childNodes.length; index += 1) {
    const child = root.childNodes.item(index);
    if (child !== null) output += serializer2.serializeToString(child);
  }
  return output;
}
function matchesProfileElement(sourceNodeName, block) {
  if (block === void 0) return false;
  const source = sourceNodeName.toLowerCase();
  return source === "p" ? block.type === "paragraph" : /^h([1-6])$/u.test(source) && block.type === "heading" && source === `h${block.level}`;
}
function isSupportedBlockElement(value) {
  return value.toLowerCase() === "p" || /^h[1-6]$/u.test(value.toLowerCase());
}
function isSupportedInlineSourceElement(element, block, storagePath) {
  if (storagePath === block.storagePath) return element.nodeName.toLowerCase() === block.nodeName.toLowerCase() && isSupportedBlockElement(block.nodeName);
  if (element.nodeName.toLowerCase() !== "span") return false;
  for (let index = 0; index < element.childNodes.length; index += 1) {
    const child = element.childNodes.item(index);
    if (child !== null && child.nodeType !== import_xmldom4.Node.TEXT_NODE && child.nodeType !== import_xmldom4.Node.CDATA_SECTION_NODE) return false;
  }
  return (element.textContent ?? "").trim().length > 0;
}
function matchesSourceInlineBaseline(element, blockElement, baseline, attribute2, value) {
  const sourceText = normalizeInlineText2(element.textContent ?? "");
  const blockText = normalizeInlineText2(blockElement.textContent ?? "");
  const occurrenceCount = countOccurrences2(blockText, sourceText);
  const expectedItemKey = `i-${sha256(canonicalJson({ attribute: attribute2, blockKey: baseline.blockKey, sourceTextSha256: sha256(sourceText), storagePath: baseline.storagePath, value }))}`;
  if (baseline.itemKey !== expectedItemKey || sourceText !== baseline.sourceText || sha256(sourceText) !== baseline.sourceTextSha256 || occurrenceCount !== baseline.sourceTextOccurrenceCount) return false;
  if (occurrenceCount !== 1 || baseline.sourceRange === void 0) return false;
  const start = blockText.indexOf(sourceText);
  return start >= 0 && baseline.sourceRange.start === start && baseline.sourceRange.end === start + sourceText.length;
}
function preservationKind(block) {
  if (block === void 0) return void 0;
  if (block.type === "codeBlock") return "fencedCode";
  return block.type;
}
function markdownPathIndex(path2) {
  const matched = /^\$\.blocks\[([0-9]+)\]$/u.exec(path2 ?? "");
  return matched?.[1] === void 0 ? void 0 : Number(matched[1]);
}
function workingProfileMarkdown(title, body) {
  return `# ${escapeHeading2(title)}

${body}`;
}
function escapeHeading2(value) {
  return value.replace(/([\\`*_#{}\[\]<>])/gu, "\\$1").replace(/\n/gu, " ");
}
function diagnosticsDocument(pageId, diagnostics, blockerCount) {
  return { schemaVersion: "miku-confluence.markdown-preserving-update-diagnostics/v1", profileVersion: preservationProfileVersion, pageId, eligible: blockerCount === 0, summary: { info: diagnostics.filter((item) => item.severity === "info").length, warning: diagnostics.filter((item) => item.severity === "warning").length, error: diagnostics.filter((item) => item.severity === "error").length, blockers: blockerCount }, items: diagnostics };
}
function artifactPath(name) {
  const paths = {
    baseStorage: "artifacts/base.storage.xml",
    workingMarkdown: "artifacts/working.md",
    candidateStorage: "artifacts/candidate.storage.xml",
    previewMarkdown: "artifacts/preview.md",
    blockMapping: "artifacts/block-mapping.json",
    preservationLedger: "artifacts/preservation-ledger.json",
    candidatePreservation: "artifacts/candidate-preservation.json",
    diagnostics: "artifacts/diagnostics.json"
  };
  return paths[name];
}
function sourceFailure(code, message, pageId, path2) {
  return { ok: false, diagnostic: { severity: "error", code, message, operation: operationName3, pageId, ...path2 === void 0 ? {} : { path: path2 } } };
}
function invalidSnapshot2() {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_SNAPSHOT", message: "The input directory is not a complete, safe miku-confluence export snapshot.", operation: operationName3 } };
}
async function safeLstat2(path2) {
  try {
    return await lstat3(path2);
  } catch {
    return void 0;
  }
}
async function readRegularTextFile2(path2) {
  const stat = await safeLstat2(path2);
  if (stat === void 0 || !stat.isFile() || stat.isSymbolicLink()) return void 0;
  try {
    return await readFile2(path2, "utf8");
  } catch {
    return void 0;
  }
}
async function readJsonFile2(path2) {
  const text = await readRegularTextFile2(path2);
  return text === void 0 ? void 0 : parseJson2(text);
}
function parseJson2(value) {
  try {
    return JSON.parse(value);
  } catch {
    return void 0;
  }
}
function isRecord7(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isDigest2(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
}
function storageValue2(page) {
  const body = page.body;
  return isRecord7(body) && isRecord7(body.storage) && typeof body.storage.value === "string" ? body.storage.value : void 0;
}
var import_xmldom4, preservingPlanSchemaVersion, candidatePreservationSchemaVersion, serializer2, presentationNames, PreservingUpdateWriter;
var init_markdown_preserving_update_prepare = __esm({
  "src/adapters/filesystem/markdown-preserving-update-prepare.ts"() {
    "use strict";
    import_xmldom4 = __toESM(require_lib(), 1);
    init_json();
    init_block_presentation();
    init_markdown_storage_profile();
    init_preservation();
    init_prepare_markdown_update();
    init_snapshot_writer();
    preservingPlanSchemaVersion = "miku-confluence.markdown-preserving-update-plan/v1";
    candidatePreservationSchemaVersion = "miku-confluence.markdown-candidate-preservation/v1";
    serializer2 = new import_xmldom4.XMLSerializer();
    presentationNames = /* @__PURE__ */ new Set(["background-color", "color", "font-size", "margin-left", "text-align"]);
    PreservingUpdateWriter = class _PreservingUpdateWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        const stagingDirectory = await mkdtemp3(resolve3(dirname3(plan.finalDirectory), `.${basename3(plan.finalDirectory)}.miku-confluence-staging-`));
        return new _PreservingUpdateWriter(plan, stagingDirectory);
      }
      async writeArtifact(name, value) {
        const path2 = artifactPath(name);
        const target = resolve3(this.stagingDirectory, path2);
        await mkdir3(dirname3(target), { recursive: true });
        await writeFile4(target, value, "utf8");
        return { path: path2, sha256: sha256(value) };
      }
      async writePlan(value) {
        await writeFile4(resolve3(this.stagingDirectory, "update-plan.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat2(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename3(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm3(this.stagingDirectory, { recursive: true, force: true });
      }
    };
  }
});

// src/adapters/filesystem/markdown-update-prepare.ts
import { lstat as lstat4, mkdir as mkdir4, mkdtemp as mkdtemp4, readFile as readFile3, rename as rename4, rm as rm4, writeFile as writeFile5 } from "node:fs/promises";
import { basename as basename4, dirname as dirname4, resolve as resolve4 } from "node:path";
async function prepareMarkdownUpdateFromSnapshot(input) {
  if (input.preservationProfile !== void 0) return preparePreservingMarkdownUpdateFromSnapshot(input);
  const source = await readPrepareSource(input);
  if (source.ok === false) return prepareMarkdownUpdateFailure([source.diagnostic]);
  const outputPlan = await planSnapshotOutput(input.outputDirectory, operationName3);
  if (outputPlan.ok === false) return prepareMarkdownUpdateFailure([outputPlan.diagnostic]);
  let writer;
  try {
    writer = await MarkdownUpdateWriter.create(outputPlan.value);
    const base = parseStorageToNormalized(source.value.baseStorage, source.value.title);
    const initialMarkdown = base.ok ? renderMarkdown(base.value) : readOnlyInitialMarkdown(source.value);
    const working = parseWorkingMarkdown(source.value.workingMarkdown, source.value.title);
    if (base.ok === false || working.ok === false) {
      const problem = base.ok === false ? base.problem : working.ok === false ? working.problem : { code: "INVALID_MARKDOWN", message: "The writable representations could not be normalized." };
      const blocked = await writeBlockedPlan(writer, source.value, initialMarkdown, problem);
      await writer.finalize();
      return blockedEnvelope(source.value, blocked, problem, input.outputDirectory);
    }
    const candidateStorage = renderStorage(working.value);
    const candidate = parseStorageToNormalized(candidateStorage, source.value.title);
    if (candidate.ok === false) {
      const blocked = await writeBlockedPlan(writer, source.value, initialMarkdown, candidate.problem);
      await writer.finalize();
      return blockedEnvelope(source.value, blocked, candidate.problem, input.outputDirectory);
    }
    const previewMarkdown = renderMarkdown(candidate.value);
    const preview = parseWorkingMarkdown(previewMarkdown, source.value.title);
    if (preview.ok === false) {
      const problem = { code: "INVALID_MARKDOWN", message: "The candidate Storage XML could not be rendered as writable preview Markdown." };
      const blocked = await writeBlockedPlan(writer, source.value, initialMarkdown, problem);
      await writer.finalize();
      return blockedEnvelope(source.value, blocked, problem, input.outputDirectory);
    }
    const initialDigest = sha256(initialMarkdown);
    const workingDigest = sha256(source.value.workingMarkdown);
    const candidateDigest = sha256(candidateStorage);
    const previewDigest = sha256(previewMarkdown);
    const baseComparison = comparison("base-change", "initial", base.value, initialDigest, "working", working.value, workingDigest);
    const roundTripComparison = comparison("candidate-round-trip", "working", working.value, workingDigest, "preview", preview.value, previewDigest);
    const roundTripSafe = roundTripComparison.structurallyEquivalent;
    const baseNoOp = baseComparison.structurallyEquivalent;
    const applyAction = !roundTripSafe ? "blocked" : baseNoOp ? "no-op" : "update";
    const diagnostics = completeDiagnostics(source.value.pageId, applyAction, baseNoOp, roundTripSafe, roundTripComparison);
    const complete = await writeCompletePlan(writer, source.value, {
      initialMarkdown,
      candidateStorage,
      previewMarkdown,
      diagnostics,
      equivalence: {
        schemaVersion: "miku-confluence.markdown-equivalence/v1",
        profileVersion: markdownStorageProfileVersion,
        pageId: source.value.pageId,
        comparisons: [baseComparison, roundTripComparison]
      },
      diff: unifiedDiff(initialMarkdown, source.value.workingMarkdown),
      assessment: {
        generation: "complete",
        baseChange: baseNoOp ? "no-op" : "material-change",
        roundTrip: roundTripComparison.classification,
        applyAction,
        applyEligible: applyAction === "update",
        blockerCount: applyAction === "blocked" ? 1 : 0
      }
    });
    await writer.finalize();
    if (applyAction === "blocked") {
      const problem = { code: "ROUND_TRIP_INVALID", message: "Candidate Storage XML does not round-trip to structurally equivalent Markdown." };
      return blockedEnvelope(source.value, complete, problem, input.outputDirectory);
    }
    return successEnvelope(source.value, complete, applyAction, input.outputDirectory);
  } catch {
    if (writer !== void 0) await writer.abort();
    return prepareMarkdownUpdateFailure([{
      severity: "error",
      code: "FILESYSTEM_ERROR",
      message: "The Markdown update prepare artifacts could not be written safely.",
      operation: operationName3,
      pageId: input.pageId
    }]);
  }
}
async function readPrepareSource(input) {
  const root = resolve4(input.snapshotDirectory);
  const rootStat = await safeLstat3(root);
  if (rootStat === void 0 || !rootStat.isDirectory() || rootStat.isSymbolicLink()) return invalidSnapshot3();
  const manifest = await readJsonFile3(resolve4(root, "export.json"));
  if (!isRecord8(manifest) || manifest.schemaVersion !== "miku-confluence.export/v1" || manifest.complete !== true || !isRecord8(manifest.api) || typeof manifest.api.openApiSha256 !== "string" || !/^[a-f0-9]{64}$/u.test(manifest.api.openApiSha256)) return invalidSnapshot3();
  const tree = await readJsonFile3(resolve4(root, "tree.json"));
  if (!isRecord8(tree) || tree.schemaVersion !== "miku-confluence.tree/v1" || !Array.isArray(tree.nodes)) return invalidSnapshot3();
  const targetNode = tree.nodes.find((node) => isRecord8(node) && node.pageId === input.pageId && node.artifactStatus === "written");
  if (targetNode === void 0) {
    return { ok: false, diagnostic: {
      severity: "error",
      code: "PAGE_ID_MISMATCH",
      message: "The requested page ID is not a written page in the complete snapshot.",
      operation: operationName3,
      pageId: input.pageId
    } };
  }
  const pageDirectory = resolve4(root, "pages", input.pageId);
  const pageDirectoryStat = await safeLstat3(pageDirectory);
  if (pageDirectoryStat === void 0 || !pageDirectoryStat.isDirectory() || pageDirectoryStat.isSymbolicLink()) return invalidSnapshot3();
  const page = await readJsonFile3(resolve4(pageDirectory, "page.api-v2.json"));
  const storage = await readRegularTextFile3(resolve4(pageDirectory, "body.storage.xml"));
  if (!isRecord8(page) || page.id !== input.pageId || page.status !== "current" || typeof page.title !== "string" || page.title.length === 0 || !isRecord8(page.version) || !Number.isSafeInteger(page.version.number) || page.version.number < 1 || storage === void 0 || storageValue3(page) !== storage) return invalidSnapshot3();
  const workingMarkdown = await readRegularTextFile3(resolve4(input.workingMarkdownPath));
  if (workingMarkdown === void 0) {
    return { ok: false, diagnostic: {
      severity: "error",
      code: "INVALID_INPUT",
      message: "The working Markdown path must name a regular, non-symbolic-link UTF-8 file.",
      operation: operationName3,
      pageId: input.pageId,
      path: "$.workingMarkdownPath"
    } };
  }
  const baseStorageSha256 = sha256(storage);
  if (input.expectedBaseStorageSha256 !== void 0 && input.expectedBaseStorageSha256 !== baseStorageSha256) {
    return digestMismatch("The expected base Storage XML digest does not match the complete snapshot.", "$.expectedBaseStorageSha256", input.pageId);
  }
  const workingSha256 = sha256(workingMarkdown);
  if (input.expectedWorkingMarkdownSha256 !== void 0 && input.expectedWorkingMarkdownSha256 !== workingSha256) {
    return digestMismatch("The expected working Markdown digest does not match the input file.", "$.expectedWorkingMarkdownSha256", input.pageId);
  }
  return {
    ok: true,
    value: {
      pageId: input.pageId,
      title: page.title,
      baseVersion: page.version.number,
      baseStorage: storage,
      openApiSha256: manifest.api.openApiSha256,
      workingMarkdown
    }
  };
}
async function writeBlockedPlan(writer, source, initialMarkdown, problem) {
  const diagnostic4 = profileDiagnostic(problem, problem.code === "TITLE_CHANGE_NOT_SUPPORTED" ? "working-markdown" : "base-storage");
  const diagnostics = diagnosticsDocument2(source.pageId, false, [diagnostic4]);
  const artifacts = {
    baseStorage: await writer.writeArtifact("baseStorage", source.baseStorage),
    initialMarkdown: await writer.writeArtifact("initialMarkdown", initialMarkdown),
    workingMarkdown: await writer.writeArtifact("workingMarkdown", source.workingMarkdown),
    diagnostics: await writer.writeArtifact("diagnostics", `${stringifyJson(diagnostics)}
`)
  };
  const plan = planDocument(source, artifacts, {
    generation: "blocked",
    baseChange: "unknown",
    roundTrip: "not-run",
    applyAction: "blocked",
    applyEligible: false,
    blockerCount: 1
  });
  const planDigest = sha256(canonicalJson(plan));
  await writer.writePlan({ ...plan, planDigest: { algorithm: "sha256", canonicalization: "RFC8785", value: planDigest } });
  return { ...artifacts, planDigest };
}
async function writeCompletePlan(writer, source, input) {
  const artifacts = {
    baseStorage: await writer.writeArtifact("baseStorage", source.baseStorage),
    initialMarkdown: await writer.writeArtifact("initialMarkdown", input.initialMarkdown),
    workingMarkdown: await writer.writeArtifact("workingMarkdown", source.workingMarkdown),
    candidateStorage: await writer.writeArtifact("candidateStorage", input.candidateStorage),
    previewMarkdown: await writer.writeArtifact("previewMarkdown", input.previewMarkdown),
    equivalence: await writer.writeArtifact("equivalence", `${stringifyJson(input.equivalence)}
`),
    diff: await writer.writeArtifact("diff", input.diff),
    diagnostics: await writer.writeArtifact("diagnostics", `${stringifyJson(input.diagnostics)}
`)
  };
  const plan = planDocument(source, artifacts, input.assessment);
  const planDigest = sha256(canonicalJson(plan));
  await writer.writePlan({ ...plan, planDigest: { algorithm: "sha256", canonicalization: "RFC8785", value: planDigest } });
  return { ...artifacts, planDigest };
}
function planDocument(source, artifacts, assessment) {
  const base = {
    schemaVersion: "miku-confluence.markdown-update-plan/v1",
    profileVersion: markdownStorageProfileVersion,
    page: { id: source.pageId, title: source.title, status: "current", baseVersion: source.baseVersion },
    source: { snapshotSchemaVersion: "miku-confluence.export/v1", openApiSha256: source.openApiSha256 },
    artifacts,
    assessment,
    safety: { requiredPermission: "UPDATE", confirmation: "plan-digest", automaticRetry: false, automaticMerge: false }
  };
  if (assessment.applyAction === "update") {
    base.request = {
      operation: "api.v2.updatePage",
      method: "PUT",
      pageId: source.pageId,
      status: "current",
      title: source.title,
      bodyRepresentation: "storage",
      nextVersion: source.baseVersion + 1
    };
  }
  return base;
}
function comparison(purpose, leftRole, left, leftArtifactSha256, rightRole, right, rightArtifactSha256) {
  const compared = compareNormalized(left, right, leftArtifactSha256, rightArtifactSha256);
  return {
    purpose,
    left: { role: leftRole, artifactSha256: leftArtifactSha256, normalizedSha256: normalizedDigest(left) },
    right: { role: rightRole, artifactSha256: rightArtifactSha256, normalizedSha256: normalizedDigest(right) },
    ...compared
  };
}
function completeDiagnostics(pageId, action, noOp, roundTripSafe, comparisonValue) {
  const items = [];
  if (noOp) {
    items.push({ severity: "info", code: "NO_MATERIAL_CHANGE", message: "Initial and working Markdown are structurally equivalent; no remote update is applicable.", blocking: false, artifactRole: "working-markdown" });
  }
  if (roundTripSafe && comparisonValue.classification === "structurally-equivalent") {
    items.push({ severity: "info", code: "ROUND_TRIP_FORMATTING_NORMALIZED", message: "Candidate Storage XML round-tripped to structurally equivalent Markdown with visible formatting normalization.", blocking: false, artifactRole: "equivalence" });
  }
  if (!roundTripSafe || action === "blocked") {
    items.push({ severity: "error", code: "ROUND_TRIP_MATERIAL_DIFFERENCE", message: "Candidate Storage XML did not round-trip to structurally equivalent Markdown.", blocking: true, artifactRole: "equivalence" });
  }
  return diagnosticsDocument2(pageId, action !== "blocked", items);
}
function diagnosticsDocument2(pageId, eligible, items) {
  return {
    schemaVersion: "miku-confluence.markdown-update-diagnostics/v1",
    profileVersion: markdownStorageProfileVersion,
    pageId,
    eligible,
    summary: {
      info: items.filter((item) => item.severity === "info").length,
      warning: items.filter((item) => item.severity === "warning").length,
      error: items.filter((item) => item.severity === "error").length,
      blockers: items.filter((item) => item.blocking).length
    },
    items
  };
}
function profileDiagnostic(problem, role) {
  return {
    severity: "error",
    code: problem.code,
    message: problem.message,
    blocking: true,
    ...role === void 0 ? {} : { artifactRole: role },
    ...problem.nodePath === void 0 ? {} : { nodePath: problem.nodePath }
  };
}
function successEnvelope(source, prepared, action, outputDirectory) {
  const result3 = {
    outputDirectory,
    pageId: source.pageId,
    action,
    applyEligible: action === "update",
    planDigest: prepared.planDigest
  };
  return { schemaVersion: 1, operation: operationName3, kind: "workflow", success: true, result: result3, diagnostics: [] };
}
function blockedEnvelope(source, prepared, problem, outputDirectory) {
  const result3 = {
    outputDirectory,
    pageId: source.pageId,
    action: "blocked",
    applyEligible: false,
    planDigest: prepared.planDigest
  };
  return {
    schemaVersion: 1,
    operation: operationName3,
    kind: "workflow",
    success: false,
    result: result3,
    diagnostics: [{
      severity: "error",
      code: problem.code,
      message: problem.message,
      operation: operationName3,
      pageId: source.pageId,
      ...problem.nodePath === void 0 ? {} : { path: problem.nodePath }
    }]
  };
}
function readOnlyInitialMarkdown(source) {
  try {
    const converted = convertStorageToMarkdown(source.baseStorage, {
      pageId: source.pageId,
      pageIds: /* @__PURE__ */ new Set([source.pageId]),
      attachmentsByPageId: /* @__PURE__ */ new Map()
    });
    return `# ${escapeHeading3(source.title)}

${converted.markdown}`;
  } catch {
    return `# ${escapeHeading3(source.title)}
`;
  }
}
function unifiedDiff(initial, working) {
  if (initial === working) return "--- artifacts/initial.md\n+++ artifacts/working.md\n";
  const left = initial.split("\n");
  const right = working.split("\n");
  let prefix = 0;
  while (prefix < left.length && prefix < right.length && left[prefix] === right[prefix]) prefix += 1;
  let suffix = 0;
  while (suffix < left.length - prefix && suffix < right.length - prefix && left[left.length - 1 - suffix] === right[right.length - 1 - suffix]) suffix += 1;
  const removed = left.slice(prefix, left.length - suffix).map((line) => `-${line}`);
  const added = right.slice(prefix, right.length - suffix).map((line) => `+${line}`);
  return ["--- artifacts/initial.md", "+++ artifacts/working.md", `@@ -${prefix + 1} +${prefix + 1} @@`, ...removed, ...added, ""].join("\n");
}
function artifactPath2(name) {
  const paths = {
    baseStorage: "artifacts/base.storage.xml",
    initialMarkdown: "artifacts/initial.md",
    workingMarkdown: "artifacts/working.md",
    candidateStorage: "artifacts/candidate.storage.xml",
    previewMarkdown: "artifacts/preview.md",
    equivalence: "artifacts/equivalence.json",
    diff: "artifacts/diff.patch",
    diagnostics: "artifacts/diagnostics.json"
  };
  return paths[name];
}
function invalidSnapshot3() {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "INVALID_SNAPSHOT",
      message: "The input directory is not a complete, safe miku-confluence export snapshot.",
      operation: operationName3
    }
  };
}
function digestMismatch(message, path2, pageId) {
  return { ok: false, diagnostic: { severity: "error", code: "SOURCE_DIGEST_MISMATCH", message, operation: operationName3, pageId, path: path2 } };
}
async function safeLstat3(path2) {
  try {
    return await lstat4(path2);
  } catch {
    return void 0;
  }
}
async function readRegularTextFile3(path2) {
  const file = await safeLstat3(path2);
  if (file === void 0 || !file.isFile() || file.isSymbolicLink()) return void 0;
  try {
    return await readFile3(path2, "utf8");
  } catch {
    return void 0;
  }
}
async function readJsonFile3(path2) {
  const value = await readRegularTextFile3(path2);
  if (value === void 0) return void 0;
  try {
    return JSON.parse(value);
  } catch {
    return void 0;
  }
}
function storageValue3(page) {
  const body = page.body;
  if (!isRecord8(body) || !isRecord8(body.storage)) return void 0;
  return typeof body.storage.value === "string" ? body.storage.value : void 0;
}
function isRecord8(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function escapeHeading3(value) {
  return value.replace(/([\\`*_#{}\[\]~<>|])/gu, "\\$1").replace(/\r?\n/gu, " ");
}
var MarkdownUpdateWriter;
var init_markdown_update_prepare = __esm({
  "src/adapters/filesystem/markdown-update-prepare.ts"() {
    "use strict";
    init_snapshot_writer();
    init_storage_to_markdown();
    init_markdown_storage_profile();
    init_json();
    init_prepare_markdown_update();
    init_markdown_preserving_update_prepare();
    MarkdownUpdateWriter = class _MarkdownUpdateWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        const stagingDirectory = await mkdtemp4(resolve4(dirname4(plan.finalDirectory), `.${basename4(plan.finalDirectory)}.miku-confluence-staging-`));
        return new _MarkdownUpdateWriter(plan, stagingDirectory);
      }
      async writeArtifact(name, value) {
        const path2 = artifactPath2(name);
        const target = resolve4(this.stagingDirectory, path2);
        await mkdir4(dirname4(target), { recursive: true });
        await writeFile5(target, value, "utf8");
        return { path: path2, sha256: sha256(value) };
      }
      async writePlan(value) {
        await writeFile5(resolve4(this.stagingDirectory, "update-plan.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat3(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename4(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm4(this.stagingDirectory, { recursive: true, force: true });
      }
    };
  }
});

// src/core/workflows/inspect-markdown-preservation.ts
function parseInspectMarkdownPreservationInput(value) {
  if (!isRecord9(value)) return invalidInput4("$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["snapshotDirectory", "pageId", "workingMarkdownPath", "preservationProfile", "outputDirectory"]);
  for (const key of Object.keys(value)) if (!allowed.has(key)) return invalidInput4(`$.${key}`, "is not allowed for this operation");
  const snapshotDirectory = validPath2(value.snapshotDirectory, "$.snapshotDirectory");
  if (snapshotDirectory.ok === false) return snapshotDirectory;
  const pageId = value.pageId;
  if (typeof pageId !== "string" || !/^[0-9]+$/u.test(pageId)) return invalidInput4("$.pageId", "must be a decimal page ID");
  const workingMarkdownPath = validPath2(value.workingMarkdownPath, "$.workingMarkdownPath");
  if (workingMarkdownPath.ok === false) return workingMarkdownPath;
  if (value.preservationProfile !== preservationProfileVersion) return invalidInput4("$.preservationProfile", `must equal ${preservationProfileVersion}`);
  const outputDirectory = validPath2(value.outputDirectory, "$.outputDirectory");
  if (outputDirectory.ok === false) return outputDirectory;
  return {
    ok: true,
    value: {
      snapshotDirectory: snapshotDirectory.value,
      pageId,
      workingMarkdownPath: workingMarkdownPath.value,
      preservationProfile: preservationProfileVersion,
      outputDirectory: outputDirectory.value
    }
  };
}
function inspectMarkdownPreservationDryRun(input) {
  return {
    schemaVersion: 1,
    operation: operationName4,
    kind: "workflow",
    success: true,
    dryRun: true,
    plan: {
      inputDirectory: input.snapshotDirectory,
      outputDirectory: input.outputDirectory,
      artifacts: [
        "preservation-inspection.json",
        "artifacts/block-mapping.json",
        "artifacts/preservation-ledger.json",
        "artifacts/diagnostics.json"
      ]
    },
    diagnostics: []
  };
}
function inspectMarkdownPreservationFailure(diagnostics) {
  return { schemaVersion: 1, operation: operationName4, kind: "workflow", success: false, diagnostics };
}
function validPath2(value, path2) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) return invalidInput4(path2, "must be a non-empty path without NUL");
  return { ok: true, value };
}
function invalidInput4(path2, reason) {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "INVALID_INPUT",
      message: `Invalid input at ${path2}: ${reason}.`,
      operation: operationName4,
      path: path2
    }
  };
}
function isRecord9(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var operationName4;
var init_inspect_markdown_preservation = __esm({
  "src/core/workflows/inspect-markdown-preservation.ts"() {
    "use strict";
    init_preservation();
    operationName4 = "page.inspect-markdown-preservation";
  }
});

// src/adapters/filesystem/markdown-preservation-inspect.ts
import { lstat as lstat5, mkdir as mkdir5, mkdtemp as mkdtemp5, readFile as readFile4, rename as rename5, rm as rm5, writeFile as writeFile6 } from "node:fs/promises";
import { basename as basename5, dirname as dirname5, resolve as resolve5 } from "node:path";
async function inspectMarkdownPreservation(input) {
  const source = await readInspectionSource(input);
  if (source.ok === false) return inspectMarkdownPreservationFailure([source.diagnostic]);
  const outputPlan = await planSnapshotOutput(input.outputDirectory, operationName4);
  if (outputPlan.ok === false) return inspectMarkdownPreservationFailure([outputPlan.diagnostic]);
  let writer;
  try {
    writer = await PreservationInspectionWriter.create(outputPlan.value);
    const mapped = mapPreservationBlocks(source.value.sidecar.blocks, source.value.workingBlocks);
    const mappingByKey = new Map(mapped.mappings.map((mapping) => [mapping.blockKey, mapping]));
    const diagnostics = [];
    const ledger = [];
    let blockerCount = 0;
    for (const mapping of mapped.mappings) {
      if (mapping.state === "ambiguous") {
        diagnostics.push(blockingDiagnostic("PRESERVATION_BLOCK_MAPPING_AMBIGUOUS", "A source Markdown block has more than one equally valid working Markdown destination.", source.value.pageId, mapping.sourceMarkdownPath));
        blockerCount += 1;
      }
      if (mapping.state === "incompatible") {
        diagnostics.push(blockingDiagnostic("PRESERVATION_BLOCK_KIND_INCOMPATIBLE", "A source Markdown block changed to an incompatible working Markdown block kind.", source.value.pageId, mapping.sourceMarkdownPath));
        blockerCount += 1;
      }
    }
    for (const annotation of source.value.sidecar.annotations) {
      const mapping = annotation.blockKey === void 0 ? void 0 : mappingByKey.get(annotation.blockKey);
      const names = [
        ...Object.keys(annotation.presentation ?? {}).map((name) => ({ name, category: "presentation" })),
        ...Object.keys(annotation.opaqueIdentifiers ?? {}).map((name) => ({ name, category: "opaqueIdentifier" }))
      ];
      for (const item of names) {
        const evaluated = ledgerDisposition(mapping?.state, item.category);
        ledger.push({
          ...annotation.blockKey === void 0 ? {} : { blockKey: annotation.blockKey },
          storagePath: annotation.storagePath,
          attribute: item.name,
          category: item.category,
          disposition: evaluated.disposition,
          blocking: evaluated.blocking
        });
        if (evaluated.blocking) {
          blockerCount += 1;
          diagnostics.push(blockingDiagnostic(evaluated.code, evaluated.message, source.value.pageId, mapping?.sourceMarkdownPath));
        }
      }
    }
    const mappingArtifact = await writer.writeArtifact("block-mapping.json", {
      schemaVersion: "miku-confluence.markdown-block-mapping/v1",
      profileVersion: preservationProfileVersion,
      pageId: source.value.pageId,
      sourceBlockCount: source.value.sidecar.blocks.length,
      workingBlockCount: source.value.workingBlocks.length,
      mappings: mapped.mappings,
      newWorkingMarkdownPaths: mapped.newWorkingMarkdownPaths
    });
    const ledgerArtifact = await writer.writeArtifact("preservation-ledger.json", {
      schemaVersion: "miku-confluence.markdown-preservation-ledger/v1",
      profileVersion: preservationProfileVersion,
      pageId: source.value.pageId,
      items: ledger
    });
    const diagnosticsArtifact = await writer.writeArtifact("diagnostics.json", diagnosticsDocument3(source.value.pageId, diagnostics, blockerCount));
    const mappingEligible = blockerCount === 0;
    const manifest = {
      schemaVersion: "miku-confluence.markdown-preservation-inspection/v1",
      profileVersion: preservationProfileVersion,
      page: { id: source.value.pageId, title: source.value.title, baseVersion: source.value.baseVersion },
      source: {
        snapshotSchemaVersion: "miku-confluence.export/v1",
        baseStorageSha256: source.value.baseStorageSha256,
        sidecarSha256: source.value.sidecarSha256,
        workingMarkdownSha256: source.value.workingMarkdownSha256
      },
      assessment: {
        candidateStorageGenerated: false,
        mappingEligible,
        writeEligible: false,
        blockerCount
      },
      artifacts: { blockMapping: mappingArtifact, preservationLedger: ledgerArtifact, diagnostics: diagnosticsArtifact }
    };
    await writer.writeManifest(manifest);
    await writer.finalize();
    const result3 = {
      outputDirectory: input.outputDirectory,
      pageId: source.value.pageId,
      mappingEligible,
      writeEligible: false,
      blockerCount,
      sourceBlockCount: source.value.sidecar.blocks.length,
      workingBlockCount: source.value.workingBlocks.length
    };
    return { schemaVersion: 1, operation: operationName4, kind: "workflow", success: mappingEligible, result: result3, diagnostics };
  } catch {
    if (writer !== void 0) await writer.abort();
    return inspectMarkdownPreservationFailure([{
      severity: "error",
      code: "FILESYSTEM_ERROR",
      message: "The Markdown preservation inspection artifacts could not be written safely.",
      operation: operationName4,
      pageId: input.pageId
    }]);
  }
}
async function readInspectionSource(input) {
  const root = resolve5(input.snapshotDirectory);
  const rootStat = await safeLstat4(root);
  if (rootStat === void 0 || !rootStat.isDirectory() || rootStat.isSymbolicLink()) return invalidSnapshot4();
  const manifest = await readJsonFile4(resolve5(root, "export.json"));
  const tree = await readJsonFile4(resolve5(root, "tree.json"));
  if (!isRecord10(manifest) || manifest.schemaVersion !== "miku-confluence.export/v1" || manifest.complete !== true || !isRecord10(tree) || tree.schemaVersion !== "miku-confluence.tree/v1" || !Array.isArray(tree.nodes)) return invalidSnapshot4();
  if (!tree.nodes.some((node) => isRecord10(node) && node.pageId === input.pageId && node.artifactStatus === "written")) return sourceFailure2("PAGE_ID_MISMATCH", "The requested page ID is not a written page in the complete snapshot.", input.pageId);
  const pageDirectory = resolve5(root, "pages", input.pageId);
  const pageDirectoryStat = await safeLstat4(pageDirectory);
  if (pageDirectoryStat === void 0 || !pageDirectoryStat.isDirectory() || pageDirectoryStat.isSymbolicLink()) return invalidSnapshot4();
  const page = await readJsonFile4(resolve5(pageDirectory, "page.api-v2.json"));
  const storage = await readRegularTextFile4(resolve5(pageDirectory, "body.storage.xml"));
  if (!isRecord10(page) || page.id !== input.pageId || page.status !== "current" || typeof page.title !== "string" || !isRecord10(page.version) || typeof page.version.number !== "number" || !Number.isSafeInteger(page.version.number) || page.version.number < 1 || storage === void 0 || storageValue4(page) !== storage) return invalidSnapshot4();
  const pageVersion2 = page.version.number;
  const workingPath = resolve5(input.workingMarkdownPath);
  const workingMarkdown = await readRegularTextFile4(workingPath);
  if (workingMarkdown === void 0) return sourceFailure2("INVALID_INPUT", "The working Markdown path must name a regular, non-symbolic-link UTF-8 file.", input.pageId, "$.workingMarkdownPath");
  const document = parsePreservationDocument(workingMarkdown, page.title);
  if (document.ok === false) return sourceFailure2("PRESERVATION_FRONT_MATTER_INVALID", document.reason, input.pageId, "$.workingMarkdownPath");
  if (document.value.frontMatter.pageId !== input.pageId || document.value.frontMatter.storageSha256 !== sha256(storage) || document.value.frontMatter.version !== pageVersion2 || document.value.frontMatter.spaceId !== void 0 && document.value.frontMatter.spaceId !== page.spaceId) {
    return sourceFailure2("PRESERVATION_BASE_MISMATCH", "The working Markdown provenance does not match the complete snapshot page.", input.pageId, "$.workingMarkdownPath");
  }
  const workingDirectory = dirname5(workingPath);
  const sidecarPath = resolve5(workingDirectory, document.value.frontMatter.attributesPath);
  if (sidecarPath !== resolve5(workingDirectory, "page.attributes.json")) return sourceFailure2("PRESERVATION_SIDECAR_MISSING", "The generated attribute sidecar path is unsafe or unsupported.", input.pageId, "$.workingMarkdownPath");
  const sidecarText = await readRegularTextFile4(sidecarPath);
  if (sidecarText === void 0) return sourceFailure2("PRESERVATION_SIDECAR_MISSING", "The generated attribute sidecar is missing or unsafe.", input.pageId, "$.workingMarkdownPath");
  if (sha256(sidecarText) !== document.value.frontMatter.attributesSha256) return sourceFailure2("PRESERVATION_SIDECAR_DIGEST_MISMATCH", "The attribute sidecar bytes do not match the front matter digest.", input.pageId, "$.workingMarkdownPath");
  const sidecarValue = parseJson3(sidecarText);
  const sidecar = validatePreservationSidecar(sidecarValue);
  if (sidecar.ok === false) return sourceFailure2("PRESERVATION_SIDECAR_VERSION_UNSUPPORTED", sidecar.reason, input.pageId, "$.workingMarkdownPath");
  if (sidecar.value.pageId !== input.pageId || sidecar.value.source.storageSha256 !== sha256(storage) || sidecar.value.source.version !== pageVersion2) return sourceFailure2("PRESERVATION_BASE_MISMATCH", "The attribute sidecar provenance does not match the complete snapshot page.", input.pageId, "$.workingMarkdownPath");
  return {
    ok: true,
    value: {
      pageId: input.pageId,
      title: page.title,
      baseVersion: pageVersion2,
      baseStorageSha256: sha256(storage),
      sidecarSha256: sha256(sidecarText),
      sidecar: sidecar.value,
      workingBlocks: document.value.blocks,
      workingMarkdownSha256: sha256(workingMarkdown)
    }
  };
}
function ledgerDisposition(state, category) {
  if (state === void 0 || state === "ambiguous" || state === "incompatible") return { blocking: true, disposition: "mapping-lost", code: "PRESERVATION_BLOCK_MAPPING_AMBIGUOUS", message: "A preserved source attribute has no unique compatible Markdown block mapping." };
  if (state === "deleted") return { blocking: true, disposition: "removed-pending-review", code: "PRESERVATION_REMOVAL_REQUIRES_REVIEW", message: "A Markdown deletion would remove a source attribute without item-scoped review." };
  if (category === "opaqueIdentifier") return { blocking: true, disposition: "server-managed-pending", code: "PRESERVATION_IDENTIFIER_UNVERIFIED", message: "A Confluence-managed identifier cannot yet be reused or normalized by a writable profile." };
  return { blocking: false, disposition: "mapped-pending-rescue", code: "PRESERVATION_ATTRIBUTE_UNSUPPORTED", message: "The presentation attribute has a unique block mapping but candidate Storage reconstruction is not implemented in this phase." };
}
function diagnosticsDocument3(pageId, items, blockers) {
  return {
    schemaVersion: "miku-confluence.markdown-preservation-diagnostics/v1",
    profileVersion: preservationProfileVersion,
    pageId,
    eligible: blockers === 0,
    summary: {
      info: items.filter((item) => item.severity === "info").length,
      warning: items.filter((item) => item.severity === "warning").length,
      error: items.filter((item) => item.severity === "error").length,
      blockers
    },
    items
  };
}
function blockingDiagnostic(code, message, pageId, path2) {
  return { severity: "error", code, message, operation: operationName4, pageId, ...path2 === void 0 ? {} : { path: path2 } };
}
function sourceFailure2(code, message, pageId, path2) {
  return { ok: false, diagnostic: { severity: "error", code, message, operation: operationName4, pageId, ...path2 === void 0 ? {} : { path: path2 } } };
}
function invalidSnapshot4() {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_SNAPSHOT", message: "The input directory is not a complete, safe miku-confluence export snapshot.", operation: operationName4 } };
}
async function safeLstat4(path2) {
  try {
    return await lstat5(path2);
  } catch {
    return void 0;
  }
}
async function readRegularTextFile4(path2) {
  const stat = await safeLstat4(path2);
  if (stat === void 0 || !stat.isFile() || stat.isSymbolicLink()) return void 0;
  try {
    return await readFile4(path2, "utf8");
  } catch {
    return void 0;
  }
}
async function readJsonFile4(path2) {
  const text = await readRegularTextFile4(path2);
  return text === void 0 ? void 0 : parseJson3(text);
}
function parseJson3(text) {
  try {
    return JSON.parse(text);
  } catch {
    return void 0;
  }
}
function isRecord10(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function storageValue4(page) {
  const body = page.body;
  return isRecord10(body) && isRecord10(body.storage) && typeof body.storage.value === "string" ? body.storage.value : void 0;
}
var PreservationInspectionWriter;
var init_markdown_preservation_inspect = __esm({
  "src/adapters/filesystem/markdown-preservation-inspect.ts"() {
    "use strict";
    init_json();
    init_preservation();
    init_markdown_storage_profile();
    init_inspect_markdown_preservation();
    init_snapshot_writer();
    PreservationInspectionWriter = class _PreservationInspectionWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        const stagingDirectory = await mkdtemp5(resolve5(dirname5(plan.finalDirectory), `.${basename5(plan.finalDirectory)}.miku-confluence-staging-`));
        await mkdir5(resolve5(stagingDirectory, "artifacts"));
        return new _PreservationInspectionWriter(plan, stagingDirectory);
      }
      async writeArtifact(name, value) {
        const content = `${stringifyJson(value)}
`;
        await writeFile6(resolve5(this.stagingDirectory, "artifacts", name), content, "utf8");
        return { path: `artifacts/${name}`, sha256: sha256(content) };
      }
      async writeManifest(value) {
        await writeFile6(resolve5(this.stagingDirectory, "preservation-inspection.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat4(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename5(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm5(this.stagingDirectory, { recursive: true, force: true });
      }
    };
  }
});

// src/core/workflows/apply-markdown-update.ts
function parseApplyMarkdownUpdateInput(value) {
  if (!isRecord11(value)) return invalidInput5("$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["planDirectory", "expectedPlanDigest", "attemptDirectory"]);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) return invalidInput5(`$.${key}`, "is not allowed for this operation");
  }
  const planDirectory = validPath3(value.planDirectory, "$.planDirectory");
  if (planDirectory.ok === false) return planDirectory;
  const expectedPlanDigest = validDigest(value.expectedPlanDigest, "$.expectedPlanDigest");
  if (expectedPlanDigest.ok === false) return expectedPlanDigest;
  const attemptDirectory = validPath3(value.attemptDirectory, "$.attemptDirectory");
  if (attemptDirectory.ok === false) return attemptDirectory;
  return { ok: true, value: { planDirectory: planDirectory.value, expectedPlanDigest: expectedPlanDigest.value, attemptDirectory: attemptDirectory.value } };
}
function applyMarkdownUpdateDryRun(input) {
  return {
    schemaVersion: 1,
    operation: operationName5,
    kind: "workflow",
    success: true,
    dryRun: true,
    plan: {
      planDirectory: input.planDirectory,
      outputDirectory: input.attemptDirectory,
      expectedPlanDigest: input.expectedPlanDigest,
      artifacts: ["attempt.json", "artifacts/remote-before.storage.xml", "artifacts/accepted.storage.xml", "artifacts/accepted.md", "artifacts/postcondition.json"]
    },
    diagnostics: []
  };
}
function applyMarkdownUpdateFailure(diagnostics) {
  return { schemaVersion: 1, operation: operationName5, kind: "workflow", success: false, diagnostics };
}
function validPath3(value, path2) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) return invalidInput5(path2, "must be a non-empty path without NUL");
  return { ok: true, value };
}
function validDigest(value, path2) {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) return invalidInput5(path2, "must be a lowercase SHA-256 digest");
  return { ok: true, value };
}
function invalidInput5(path2, reason) {
  return {
    ok: false,
    diagnostic: {
      severity: "error",
      code: "INVALID_INPUT",
      message: `Invalid input at ${path2}: ${reason}.`,
      operation: operationName5,
      path: path2
    }
  };
}
function isRecord11(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var operationName5;
var init_apply_markdown_update = __esm({
  "src/core/workflows/apply-markdown-update.ts"() {
    "use strict";
    operationName5 = "page.apply-markdown-update";
  }
});

// src/adapters/filesystem/markdown-update-apply.ts
import { lstat as lstat6, mkdir as mkdir6, mkdtemp as mkdtemp6, readFile as readFile5, rename as rename6, rm as rm6, writeFile as writeFile7 } from "node:fs/promises";
import { basename as basename6, dirname as dirname6, resolve as resolve6 } from "node:path";
async function inspectMarkdownUpdateApply(input) {
  const loaded = await loadPlan(input);
  if (loaded.ok === false) return loaded;
  const outputPlan = await planSnapshotOutput(input.attemptDirectory, operationName5);
  if (outputPlan.ok === false) return outputPlan;
  return { ok: true, value: { plan: loaded.value, outputPlan: outputPlan.value } };
}
async function applyInspectedMarkdownUpdate(inspection, api) {
  let writer;
  try {
    writer = await MarkdownUpdateAttemptWriter.create(inspection.outputPlan);
  } catch {
    return applyMarkdownUpdateFailure([diagnostic("FILESYSTEM_ERROR", "The apply attempt directory could not be created.", inspection.plan)]);
  }
  try {
    if (inspection.plan.action === "blocked") {
      const diagnostics = [diagnostic("PLAN_NOT_APPLY_ELIGIBLE", "The reviewed plan is blocked and cannot be applied.", inspection.plan)];
      await writer.writeAttempt(attemptRecord(inspection.plan, "blocked", 0, diagnostics));
      await writer.finalize();
      return failure3(inspection.plan, "blocked", 0, diagnostics, inspection.outputPlan.outputDirectory);
    }
    if (inspection.plan.action === "no-op") {
      const diagnostics = [info("NO_REMOTE_UPDATE", "The reviewed plan is a no-op; no Confluence request was made.", inspection.plan)];
      await writer.writeAttempt(attemptRecord(inspection.plan, "no-op", 0, diagnostics));
      await writer.finalize();
      return success2(inspection.plan, "no-op", 0, diagnostics, inspection.outputPlan.outputDirectory);
    }
    if (api === void 0) {
      const diagnostics = [diagnostic("API_PORT_UNAVAILABLE", "The reviewed update could not obtain a Confluence API port.", inspection.plan)];
      await writer.writeAttempt(attemptRecord(inspection.plan, "unresolved", 0, diagnostics));
      await writer.finalize();
      return failure3(inspection.plan, "unresolved", 0, diagnostics, inspection.outputPlan.outputDirectory);
    }
    return await applyUpdate(inspection.plan, inspection.outputPlan.outputDirectory, writer, api);
  } catch {
    await writer.abort();
    return applyMarkdownUpdateFailure([diagnostic("FILESYSTEM_ERROR", "The apply attempt artifacts could not be written safely.", inspection.plan)]);
  }
}
async function applyUpdate(plan, attemptDirectory, writer, api) {
  const before = await api.getPageById(plan.pageId);
  if (!before.success) {
    const diagnostics2 = apiFailure("REMOTE_PRECONDITION_READ_FAILED", "The current page could not be re-read before the update; no PUT was issued.", plan, before.diagnostics);
    await writer.writeAttempt(attemptRecord(plan, "unresolved", 1, diagnostics2));
    await writer.finalize();
    return failure3(plan, "unresolved", 1, diagnostics2, attemptDirectory);
  }
  const current = remotePage(before, plan);
  if (current.ok === false) {
    await writer.writeAttempt(attemptRecord(plan, "unresolved", 1, [current.diagnostic]));
    await writer.finalize();
    return failure3(plan, "unresolved", 1, [current.diagnostic], attemptDirectory);
  }
  await writer.writeArtifact("remote-before.storage.xml", current.value.storage);
  if (current.value.version !== plan.baseVersion) {
    const diagnostics2 = [diagnostic("VERSION_CONFLICT", "The current page version differs from the reviewed base version; no PUT was issued.", plan)];
    await writer.writeAttempt(attemptRecord(plan, "blocked", 1, diagnostics2, current.value));
    await writer.finalize();
    return failure3(plan, "blocked", 1, diagnostics2, attemptDirectory);
  }
  if (sha256(current.value.storage) !== plan.baseStorageSha256) {
    const diagnostics2 = [diagnostic("BASE_STORAGE_CONFLICT", "The current Storage XML digest differs from the reviewed base; no PUT was issued.", plan)];
    await writer.writeAttempt(attemptRecord(plan, "blocked", 1, diagnostics2, current.value));
    await writer.finalize();
    return failure3(plan, "blocked", 1, diagnostics2, attemptDirectory);
  }
  const update = await api.updatePage({
    path: { id: plan.pageId },
    body: {
      id: plan.pageId,
      status: "current",
      title: plan.title,
      body: { representation: "storage", value: plan.candidateStorage },
      version: { number: plan.nextVersion }
    }
  });
  if (!update.success) {
    const diagnostics2 = apiFailure("UPDATE_REQUEST_FAILED", "The update request did not return success. The outcome is unresolved and was not retried.", plan, update.diagnostics);
    await writer.writeAttempt(attemptRecord(plan, "unresolved", 2, diagnostics2, current.value));
    await writer.finalize();
    return failure3(plan, "unresolved", 2, diagnostics2, attemptDirectory);
  }
  const after = await api.getPageById(plan.pageId);
  if (!after.success) {
    const diagnostics2 = apiFailure("POSTCONDITION_READ_FAILED", "The page could not be re-read after a successful PUT. The update outcome is unresolved and was not retried.", plan, after.diagnostics);
    await writer.writeAttempt(attemptRecord(plan, "unresolved", 3, diagnostics2, current.value));
    await writer.finalize();
    return failure3(plan, "unresolved", 3, diagnostics2, attemptDirectory);
  }
  const accepted = remotePage(after, plan);
  if (accepted.ok === false) {
    await writer.writeAttempt(attemptRecord(plan, "unresolved", 3, [accepted.diagnostic], current.value));
    await writer.finalize();
    return failure3(plan, "unresolved", 3, [accepted.diagnostic], attemptDirectory);
  }
  const acceptedNormalized = parseStorageToNormalized(accepted.value.storage, plan.title);
  if (acceptedNormalized.ok === false) {
    const diagnostics2 = [diagnostic("POSTCONDITION_DIVERGENCE", "The returned Storage XML is outside the writable profile.", plan)];
    await writer.writeArtifact("accepted.storage.xml", accepted.value.storage);
    await writer.writeAttempt(attemptRecord(plan, "unresolved", 3, diagnostics2, current.value, accepted.value));
    await writer.finalize();
    return failure3(plan, "unresolved", 3, diagnostics2, attemptDirectory);
  }
  const canonicalAcceptedStorage = renderStorage(acceptedNormalized.value);
  const acceptedMarkdown = renderMarkdown(acceptedNormalized.value);
  await writer.writeArtifact("accepted.storage.xml", canonicalAcceptedStorage);
  await writer.writeArtifact("accepted.md", acceptedMarkdown);
  const postcondition = postconditionRecord(plan, accepted.value, acceptedNormalized.value, canonicalAcceptedStorage, acceptedMarkdown);
  await writer.writeArtifact("postcondition.json", `${stringifyJson(postcondition)}
`);
  const divergent = accepted.value.version !== plan.nextVersion || !postcondition.comparisons.candidateToAccepted.structurallyEquivalent || !postcondition.comparisons.workingToAccepted.structurallyEquivalent;
  const diagnostics = divergent ? [diagnostic("POSTCONDITION_DIVERGENCE", "The re-read page does not satisfy the reviewed version or Markdown/Storage postcondition.", plan)] : [info("POSTCONDITION_VERIFIED", "The re-read page satisfies the reviewed version and Markdown/Storage postcondition.", plan)];
  if (divergent) {
    await writer.writeAttempt(attemptRecord(plan, "unresolved", 3, diagnostics, current.value, accepted.value, postcondition));
    await writer.finalize();
    return failure3(plan, "unresolved", 3, diagnostics, attemptDirectory);
  }
  await writer.writeAttempt(attemptRecord(plan, "updated", 3, diagnostics, current.value, accepted.value, postcondition));
  await writer.finalize();
  return success2(plan, "updated", 3, diagnostics, attemptDirectory);
}
async function loadPlan(input) {
  const planDirectory = resolve6(input.planDirectory);
  const directory = await safeLstat5(planDirectory);
  if (directory === void 0 || !directory.isDirectory() || directory.isSymbolicLink()) return invalidPlan("The plan directory must be a non-symbolic-link directory.");
  const raw = await readJsonFile5(resolve6(planDirectory, "update-plan.json"));
  if (!isRecord12(raw)) return invalidPlan("update-plan.json is missing or invalid.");
  const declaredDigest = digestValue(raw.planDigest);
  if (declaredDigest === void 0) return invalidPlan("The plan digest is missing or invalid.");
  const { planDigest: _planDigest, ...covered } = raw;
  let calculatedDigest;
  try {
    calculatedDigest = sha256(canonicalJson(covered));
  } catch {
    return invalidPlan("The plan cannot be canonicalized safely.");
  }
  if (calculatedDigest !== declaredDigest) return planDigestMismatch("The plan digest does not match its immutable content.");
  if (declaredDigest !== input.expectedPlanDigest) return planDigestMismatch("The supplied plan digest does not match the reviewed plan.");
  const page = raw.page;
  const source = raw.source;
  const assessment = raw.assessment;
  const safety = raw.safety;
  const artifacts = raw.artifacts;
  if (raw.schemaVersion !== "miku-confluence.markdown-update-plan/v1" || raw.profileVersion !== "miku-confluence.markdown-storage-profile/v1" || !isRecord12(page) || !isRecord12(source) || !isRecord12(assessment) || !isRecord12(safety) || !isRecord12(artifacts)) return invalidPlan("The plan is missing required sections.");
  if (source.snapshotSchemaVersion !== "miku-confluence.export/v1" || !isDigest3(source.openApiSha256)) return invalidPlan("The plan source contract is invalid.");
  const pageId = stringValue(page.id);
  const title = stringValue(page.title);
  const baseVersion = integerValue(page.baseVersion);
  if (pageId === void 0 || !/^[0-9]+$/u.test(pageId) || title === void 0 || title.length === 0 || baseVersion === void 0 || baseVersion < 1 || page.status !== "current") return invalidPlan("The reviewed page identity is invalid.");
  if (safety.requiredPermission !== "UPDATE" || safety.confirmation !== "plan-digest" || safety.automaticRetry !== false || safety.automaticMerge !== false) return invalidPlan("The plan safety contract is not supported.");
  const action = assessment.applyAction;
  if (action !== "blocked" && action !== "no-op" && action !== "update") return invalidPlan("The apply action is invalid.");
  if (!validAssessment(action, assessment)) return invalidPlan("The plan assessment is not internally consistent.");
  const references = await loadArtifacts(planDirectory, artifacts, action !== "blocked");
  if (references.ok === false) return references;
  const baseStorage = references.value.contents.baseStorage;
  const workingMarkdown = references.value.contents.workingMarkdown;
  const baseStorageReference = references.value.references.baseStorage;
  if (baseStorage === void 0 || workingMarkdown === void 0 || baseStorageReference === void 0) return invalidPlan("The required reviewed artifacts are missing.");
  const baseParsed = parseStorageToNormalized(baseStorage, title);
  if (baseParsed.ok === false) return invalidPlan("The reviewed base Storage XML is outside the writable profile.");
  const workingParsed = parseWorkingMarkdown(workingMarkdown, title);
  if (workingParsed.ok === false) return invalidPlan("The reviewed working Markdown is outside the writable profile.");
  let candidateStorage;
  let candidateStorageSha256;
  let previewMarkdown;
  let nextVersion;
  if (action === "update") {
    const request = raw.request;
    if (!isRecord12(request) || request.operation !== "api.v2.updatePage" || request.method !== "PUT" || request.pageId !== pageId || request.status !== "current" || request.title !== title || request.bodyRepresentation !== "storage") return invalidPlan("The reviewed update request is invalid.");
    nextVersion = integerValue(request.nextVersion);
    if (nextVersion !== baseVersion + 1) return invalidPlan("The reviewed update version is invalid.");
    candidateStorage = references.value.contents.candidateStorage;
    previewMarkdown = references.value.contents.previewMarkdown;
    if (candidateStorage === void 0 || previewMarkdown === void 0) return invalidPlan("The reviewed update artifacts are missing.");
    const candidateParsed = parseStorageToNormalized(candidateStorage, title);
    const previewParsed = parseWorkingMarkdown(previewMarkdown, title);
    if (candidateParsed.ok === false || previewParsed.ok === false) return invalidPlan("The reviewed candidate artifacts are outside the writable profile.");
    candidateStorageSha256 = references.value.references.candidateStorage?.sha256;
  } else if (raw.request !== void 0) {
    return invalidPlan("A no-op or blocked plan must not include an update request.");
  }
  return {
    ok: true,
    value: {
      action,
      artifacts: references.value.references,
      baseStorage,
      baseStorageSha256: baseStorageReference.sha256,
      baseVersion,
      ...candidateStorage === void 0 ? {} : { candidateStorage },
      ...candidateStorageSha256 === void 0 ? {} : { candidateStorageSha256 },
      ...nextVersion === void 0 ? {} : { nextVersion },
      pageId,
      planDigest: declaredDigest,
      ...previewMarkdown === void 0 ? {} : { previewMarkdown },
      title,
      workingMarkdown
    }
  };
}
async function loadArtifacts(planDirectory, artifacts, complete) {
  const required = complete ? ["baseStorage", "initialMarkdown", "workingMarkdown", "candidateStorage", "previewMarkdown", "equivalence", "diff", "diagnostics"] : ["baseStorage", "initialMarkdown", "workingMarkdown", "diagnostics"];
  if (Object.keys(artifacts).length !== required.length || required.some((role) => !(role in artifacts))) return invalidPlan("The plan artifact roles are not valid for its action.");
  const references = {};
  const contents = {};
  for (const role of required) {
    const reference = artifactReference(artifacts[role]);
    if (reference === void 0) return invalidPlan(`The ${role} artifact reference is invalid.`);
    const target = artifactTarget(planDirectory, reference.path);
    if (target === void 0) return invalidPlan(`The ${role} artifact path is unsafe.`);
    const value = await readRegularTextFile5(target);
    if (value === void 0 || sha256(value) !== reference.sha256) return planArtifactMismatch(`The ${role} artifact no longer matches the reviewed digest.`);
    references[role] = reference;
    contents[role] = value;
  }
  return { ok: true, value: { references, contents } };
}
function validAssessment(action, assessment) {
  if (action === "update") return assessment.generation === "complete" && assessment.baseChange === "material-change" && assessment.applyEligible === true && assessment.blockerCount === 0 && (assessment.roundTrip === "byte-identical" || assessment.roundTrip === "structurally-equivalent");
  if (action === "no-op") return assessment.generation === "complete" && assessment.baseChange === "no-op" && assessment.applyEligible === false && assessment.blockerCount === 0 && (assessment.roundTrip === "byte-identical" || assessment.roundTrip === "structurally-equivalent");
  return assessment.applyEligible === false && typeof assessment.blockerCount === "number" && Number.isInteger(assessment.blockerCount) && assessment.blockerCount >= 1;
}
function remotePage(envelope, plan) {
  const body = envelope.response?.body;
  if (!isRecord12(body)) return { ok: false, diagnostic: diagnostic("REMOTE_PAGE_INVALID", "The re-read page response is not an object.", plan) };
  const id2 = stringValue(body.id);
  const title = stringValue(body.title);
  const status = body.status;
  const version = isRecord12(body.version) ? integerValue(body.version.number) : void 0;
  const storage = isRecord12(body.body) && isRecord12(body.body.storage) ? stringValue(body.body.storage.value) : void 0;
  if (id2 !== plan.pageId || title === void 0 || status !== "current" || version === void 0 || version < 1 || storage === void 0) {
    return { ok: false, diagnostic: diagnostic("REMOTE_PAGE_INVALID", "The re-read page response is missing the expected current page identity, version, or Storage XML.", plan) };
  }
  return { ok: true, value: { id: id2, title, status, version, storage } };
}
function postconditionRecord(plan, accepted, acceptedNormalized, canonicalAcceptedStorage, acceptedMarkdown) {
  const candidateNormalized = parseStorageToNormalized(plan.candidateStorage ?? "", plan.title);
  const workingNormalized = parseWorkingMarkdown(plan.workingMarkdown, plan.title);
  const previewNormalized = parseWorkingMarkdown(plan.previewMarkdown ?? "", plan.title);
  if (candidateNormalized.ok === false || workingNormalized.ok === false || previewNormalized.ok === false) throw new Error("Reviewed artifacts became invalid after inspection.");
  const acceptedStorageSha256 = sha256(canonicalAcceptedStorage);
  const acceptedMarkdownSha256 = sha256(acceptedMarkdown);
  return {
    schemaVersion: "miku-confluence.markdown-update-postcondition/v1",
    page: { id: accepted.id, title: accepted.title, status: accepted.status, version: accepted.version },
    planDigest: plan.planDigest,
    accepted: { storageSha256: acceptedStorageSha256, markdownSha256: acceptedMarkdownSha256 },
    comparisons: {
      candidateToAccepted: compareNormalized(candidateNormalized.value, acceptedNormalized, plan.candidateStorageSha256 ?? "", acceptedStorageSha256),
      workingToAccepted: compareNormalized(workingNormalized.value, acceptedNormalized, sha256(plan.workingMarkdown), acceptedMarkdownSha256),
      previewToAccepted: compareNormalized(previewNormalized.value, acceptedNormalized, sha256(plan.previewMarkdown ?? ""), acceptedMarkdownSha256)
    }
  };
}
function attemptRecord(plan, outcome, requestCount, diagnostics, before, after, postcondition) {
  return {
    schemaVersion: "miku-confluence.markdown-update-attempt/v1",
    operation: operationName5,
    plan: { digest: plan.planDigest, pageId: plan.pageId, action: plan.action },
    outcome,
    requestCount,
    ...before === void 0 ? {} : { before: { version: before.version, storageSha256: sha256(before.storage) } },
    ...after === void 0 ? {} : { after: { version: after.version, storageSha256: sha256(after.storage) } },
    ...postcondition === void 0 ? {} : { postcondition },
    diagnostics
  };
}
function apiFailure(code, message, plan, apiDiagnostics2) {
  return [diagnostic(code, message, plan), ...apiDiagnostics2.map((item) => ({ ...item, operation: operationName5, pageId: plan.pageId }))];
}
function success2(plan, outcome, requestCount, diagnostics, attemptDirectory) {
  return {
    schemaVersion: 1,
    operation: operationName5,
    kind: "workflow",
    success: true,
    result: result(plan, outcome, requestCount, attemptDirectory),
    diagnostics
  };
}
function failure3(plan, outcome, requestCount, diagnostics, attemptDirectory) {
  return {
    schemaVersion: 1,
    operation: operationName5,
    kind: "workflow",
    success: false,
    result: result(plan, outcome, requestCount, attemptDirectory),
    diagnostics
  };
}
function result(plan, outcome, requestCount, attemptDirectory) {
  return { attemptDirectory, outcome, pageId: plan.pageId, planDigest: plan.planDigest, requestCount };
}
function diagnostic(code, message, plan) {
  return { severity: "error", code, message, operation: operationName5, pageId: plan.pageId };
}
function info(code, message, plan) {
  return { severity: "info", code, message, operation: operationName5, pageId: plan.pageId };
}
function invalidPlan(message) {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_UPDATE_PLAN", message, operation: operationName5 } };
}
function planDigestMismatch(message) {
  return { ok: false, diagnostic: { severity: "error", code: "PLAN_DIGEST_MISMATCH", message, operation: operationName5 } };
}
function planArtifactMismatch(message) {
  return { ok: false, diagnostic: { severity: "error", code: "PLAN_ARTIFACT_MISMATCH", message, operation: operationName5 } };
}
function digestValue(value) {
  if (!isRecord12(value) || value.algorithm !== "sha256" || value.canonicalization !== "RFC8785") return void 0;
  const digest3 = stringValue(value.value);
  return digest3 !== void 0 && isDigest3(digest3) ? digest3 : void 0;
}
function artifactReference(value) {
  if (!isRecord12(value)) return void 0;
  const path2 = stringValue(value.path);
  const digest3 = stringValue(value.sha256);
  if (path2 === void 0 || digest3 === void 0 || !/^[a-f0-9]{64}$/u.test(digest3)) return void 0;
  return { path: path2, sha256: digest3 };
}
function artifactTarget(planDirectory, path2) {
  if (!/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9._/-]+$/u.test(path2)) return void 0;
  const target = resolve6(planDirectory, path2);
  return target.startsWith(`${planDirectory}/`) ? target : void 0;
}
function stringValue(value) {
  return typeof value === "string" ? value : void 0;
}
function integerValue(value) {
  if (typeof value === "number" && Number.isSafeInteger(value)) return value;
  if (!isRecord12(value) || value.isLosslessNumber !== true || typeof value.value !== "string" || !/^-?(?:0|[1-9][0-9]*)$/u.test(value.value)) return void 0;
  const converted = Number(value.value);
  return Number.isSafeInteger(converted) ? converted : void 0;
}
function isDigest3(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
}
function isRecord12(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function safeLstat5(path2) {
  try {
    return await lstat6(path2);
  } catch {
    return void 0;
  }
}
async function readRegularTextFile5(path2) {
  const stat = await safeLstat5(path2);
  if (stat === void 0 || !stat.isFile() || stat.isSymbolicLink()) return void 0;
  try {
    return await readFile5(path2, "utf8");
  } catch {
    return void 0;
  }
}
async function readJsonFile5(path2) {
  const text = await readRegularTextFile5(path2);
  if (text === void 0) return void 0;
  try {
    return JSON.parse(text);
  } catch {
    return void 0;
  }
}
var MarkdownUpdateAttemptWriter;
var init_markdown_update_apply = __esm({
  "src/adapters/filesystem/markdown-update-apply.ts"() {
    "use strict";
    init_snapshot_writer();
    init_json();
    init_markdown_storage_profile();
    init_apply_markdown_update();
    MarkdownUpdateAttemptWriter = class _MarkdownUpdateAttemptWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        const stagingDirectory = await mkdtemp6(resolve6(dirname6(plan.finalDirectory), `.${basename6(plan.finalDirectory)}.miku-confluence-staging-`));
        return new _MarkdownUpdateAttemptWriter(plan, stagingDirectory);
      }
      async writeArtifact(path2, value) {
        const target = resolve6(this.stagingDirectory, "artifacts", path2);
        await mkdir6(dirname6(target), { recursive: true });
        await writeFile7(target, value, "utf8");
      }
      async writeAttempt(value) {
        await writeFile7(resolve6(this.stagingDirectory, "attempt.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat5(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename6(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm6(this.stagingDirectory, { recursive: true, force: true });
      }
    };
  }
});

// src/core/workflows/apply-markdown-create.ts
function parseApplyMarkdownCreateInput(value) {
  if (!isRecord13(value)) return invalidInput6("$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["planDirectory", "expectedPlanDigest", "attemptDirectory"]);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) return invalidInput6(`$.${key}`, "is not allowed for this operation");
  }
  const planDirectory = validPath4(value.planDirectory, "$.planDirectory");
  if (planDirectory.ok === false) return planDirectory;
  const expectedPlanDigest = digest(value.expectedPlanDigest, "$.expectedPlanDigest");
  if (expectedPlanDigest.ok === false) return expectedPlanDigest;
  const attemptDirectory = validPath4(value.attemptDirectory, "$.attemptDirectory");
  if (attemptDirectory.ok === false) return attemptDirectory;
  return { ok: true, value: { planDirectory: planDirectory.value, expectedPlanDigest: expectedPlanDigest.value, attemptDirectory: attemptDirectory.value } };
}
function applyMarkdownCreateDryRun(input) {
  return {
    schemaVersion: 1,
    operation: operationName6,
    kind: "workflow",
    success: true,
    dryRun: true,
    plan: {
      planDirectory: input.planDirectory,
      expectedPlanDigest: input.expectedPlanDigest,
      outputDirectory: input.attemptDirectory,
      artifacts: ["attempt.json", "artifacts/accepted.storage.xml", "artifacts/accepted.md", "artifacts/postcondition.json"]
    },
    diagnostics: []
  };
}
function applyMarkdownCreateFailure(diagnostics) {
  return { schemaVersion: 1, operation: operationName6, kind: "workflow", success: false, diagnostics };
}
function validPath4(value, path2) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) return invalidInput6(path2, "must be a non-empty path without NUL");
  return { ok: true, value };
}
function digest(value, path2) {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) return invalidInput6(path2, "must be a lowercase SHA-256 digest");
  return { ok: true, value };
}
function invalidInput6(path2, reason) {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_INPUT", message: `Invalid input at ${path2}: ${reason}.`, operation: operationName6, path: path2 } };
}
function isRecord13(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var operationName6;
var init_apply_markdown_create = __esm({
  "src/core/workflows/apply-markdown-create.ts"() {
    "use strict";
    operationName6 = "page.apply-markdown-create";
  }
});

// src/adapters/filesystem/markdown-create-apply.ts
import { lstat as lstat7, mkdir as mkdir7, mkdtemp as mkdtemp7, readFile as readFile6, rename as rename7, rm as rm7, writeFile as writeFile8 } from "node:fs/promises";
import { basename as basename7, dirname as dirname7, resolve as resolve7 } from "node:path";
async function inspectMarkdownCreateApply(input) {
  const plan = await loadPlan2(input);
  if (plan.ok === false) return plan;
  const outputPlan = await planSnapshotOutput(input.attemptDirectory, operationName6);
  if (outputPlan.ok === false) return outputPlan;
  return { ok: true, value: { plan: plan.value, outputPlan: outputPlan.value } };
}
async function applyInspectedMarkdownCreate(inspection, api) {
  let writer;
  try {
    writer = await MarkdownCreateAttemptWriter.create(inspection.outputPlan);
  } catch {
    return applyMarkdownCreateFailure([diagnostic2("FILESYSTEM_ERROR", "The create attempt directory could not be created.", inspection.plan)]);
  }
  try {
    if (inspection.plan.action === "blocked") {
      const diagnostics = [diagnostic2("PLAN_NOT_APPLY_ELIGIBLE", "The reviewed create plan is blocked and cannot be applied.", inspection.plan)];
      await writer.writeAttempt(attemptRecord2(inspection.plan, "blocked", 0, diagnostics));
      await writer.finalize();
      return failure4(inspection.plan, "blocked", 0, diagnostics, inspection.outputPlan.outputDirectory);
    }
    if (api === void 0) {
      const diagnostics = [diagnostic2("API_PORT_UNAVAILABLE", "The reviewed create could not obtain a Confluence API port.", inspection.plan)];
      await writer.writeAttempt(attemptRecord2(inspection.plan, "unresolved", 0, diagnostics));
      await writer.finalize();
      return failure4(inspection.plan, "unresolved", 0, diagnostics, inspection.outputPlan.outputDirectory);
    }
    return await createAndVerify(inspection.plan, inspection.outputPlan.outputDirectory, writer, api);
  } catch {
    await writer.abort();
    return applyMarkdownCreateFailure([diagnostic2("FILESYSTEM_ERROR", "The create attempt artifacts could not be written safely.", inspection.plan)]);
  }
}
async function createAndVerify(plan, attemptDirectory, writer, api) {
  const created = await api.createPage({
    body: {
      spaceId: plan.spaceId,
      parentId: plan.parentPageId,
      status: "current",
      title: plan.title,
      body: { representation: "storage", value: plan.candidateStorage }
    }
  });
  if (!created.success) {
    const diagnostics2 = apiFailure2("CREATE_REQUEST_FAILED", "The create request did not return success. The outcome is unresolved and was not retried.", plan, created.diagnostics);
    await writer.writeAttempt(attemptRecord2(plan, "unresolved", 1, diagnostics2));
    await writer.finalize();
    return failure4(plan, "unresolved", 1, diagnostics2, attemptDirectory);
  }
  const createdId = pageIdFromCreateResponse(created);
  if (createdId === void 0) {
    const diagnostics2 = [diagnostic2("CREATE_RESPONSE_INVALID", "The successful create response did not contain a decimal page ID; the outcome is unresolved.", plan)];
    await writer.writeAttempt(attemptRecord2(plan, "unresolved", 1, diagnostics2));
    await writer.finalize();
    return failure4(plan, "unresolved", 1, diagnostics2, attemptDirectory);
  }
  const fetched = await api.getPageById(createdId);
  if (!fetched.success) {
    const diagnostics2 = apiFailure2("POSTCONDITION_READ_FAILED", "The created page could not be re-read. The outcome is unresolved and was not retried.", plan, fetched.diagnostics);
    await writer.writeAttempt(attemptRecord2(plan, "unresolved", 2, diagnostics2, createdId));
    await writer.finalize();
    return failure4(plan, "unresolved", 2, diagnostics2, attemptDirectory, createdId);
  }
  const accepted = remotePage2(fetched, plan, createdId);
  if (accepted.ok === false) {
    await writer.writeAttempt(attemptRecord2(plan, "unresolved", 2, [accepted.diagnostic], createdId));
    await writer.finalize();
    return failure4(plan, "unresolved", 2, [accepted.diagnostic], attemptDirectory, createdId);
  }
  const normalizedAccepted = parseStorageToNormalized(accepted.value.storage, plan.title);
  if (normalizedAccepted.ok === false) {
    const diagnostics2 = [diagnostic2("POSTCONDITION_DIVERGENCE", "The re-read Storage XML is outside the writable profile.", plan, createdId)];
    await writer.writeArtifact("accepted.storage.xml", accepted.value.storage);
    await writer.writeAttempt(attemptRecord2(plan, "unresolved", 2, diagnostics2, createdId));
    await writer.finalize();
    return failure4(plan, "unresolved", 2, diagnostics2, attemptDirectory, createdId);
  }
  const canonicalStorage = renderStorage(normalizedAccepted.value);
  const acceptedMarkdown = renderMarkdown(normalizedAccepted.value);
  await writer.writeArtifact("accepted.storage.xml", canonicalStorage);
  await writer.writeArtifact("accepted.md", acceptedMarkdown);
  const postcondition = postconditionRecord2(plan, accepted.value, normalizedAccepted.value, canonicalStorage, acceptedMarkdown);
  await writer.writeArtifact("postcondition.json", `${stringifyJson(postcondition)}
`);
  const divergent = accepted.value.title !== plan.title || !postcondition.comparisons.candidateToAccepted.structurallyEquivalent || !postcondition.comparisons.workingToAccepted.structurallyEquivalent;
  const diagnostics = divergent ? [diagnostic2("POSTCONDITION_DIVERGENCE", "The re-read page does not satisfy the reviewed Markdown/Storage postcondition.", plan, createdId)] : [info2("POSTCONDITION_VERIFIED", "The re-read page satisfies the reviewed Markdown/Storage postcondition.", plan, createdId)];
  if (divergent) {
    await writer.writeAttempt(attemptRecord2(plan, "unresolved", 2, diagnostics, createdId, postcondition));
    await writer.finalize();
    return failure4(plan, "unresolved", 2, diagnostics, attemptDirectory, createdId);
  }
  await writer.writeAttempt(attemptRecord2(plan, "created", 2, diagnostics, createdId, postcondition));
  await writer.finalize();
  return success3(plan, "created", 2, diagnostics, attemptDirectory, createdId);
}
async function loadPlan2(input) {
  const directory = resolve7(input.planDirectory);
  const stat = await safeLstat6(directory);
  if (stat === void 0 || !stat.isDirectory() || stat.isSymbolicLink()) return invalidPlan2("The plan directory must be a non-symbolic-link directory.");
  const raw = await readJsonFile6(resolve7(directory, "create-plan.json"));
  if (!isRecord14(raw)) return invalidPlan2("create-plan.json is missing or invalid.");
  const declared = digestValue2(raw.planDigest);
  if (declared === void 0) return invalidPlan2("The plan digest is missing or invalid.");
  const { planDigest: _digest, ...covered } = raw;
  let calculated;
  try {
    calculated = sha256(canonicalJson(covered));
  } catch {
    return invalidPlan2("The plan cannot be canonicalized safely.");
  }
  if (calculated !== declared || declared !== input.expectedPlanDigest) return planDigestMismatch2("The supplied plan digest does not match the immutable plan.");
  const target = raw.target;
  const source = raw.source;
  const assessment = raw.assessment;
  const safety = raw.safety;
  const artifacts = raw.artifacts;
  if (raw.schemaVersion !== "miku-confluence.markdown-create-plan/v1" || raw.profileVersion !== "miku-confluence.markdown-storage-profile/v1" || !isRecord14(target) || !isRecord14(source) || !isRecord14(assessment) || !isRecord14(safety) || !isRecord14(artifacts)) return invalidPlan2("The plan is missing required sections.");
  const spaceId = decimalId(target.spaceId);
  const parentPageId = decimalId(target.parentPageId);
  const title = stringValue2(target.title);
  if (spaceId === void 0 || parentPageId === void 0 || title === void 0 || title.length === 0 || target.status !== "current" || !isDigest4(source.openApiSha256)) return invalidPlan2("The reviewed create target is invalid.");
  if (safety.requiredPermission !== "CREATE" || safety.confirmation !== "plan-digest" || safety.automaticRetry !== false) return invalidPlan2("The plan safety contract is not supported.");
  const action = assessment.applyAction;
  if (action !== "blocked" && action !== "create") return invalidPlan2("The create action is invalid.");
  if (!validAssessment2(action, assessment)) return invalidPlan2("The plan assessment is not internally consistent.");
  const loadedArtifacts = await loadArtifacts2(directory, artifacts, action === "create");
  if (loadedArtifacts.ok === false) return loadedArtifacts;
  const workingMarkdown = loadedArtifacts.value.contents.workingMarkdown;
  if (workingMarkdown === void 0 || parseWorkingMarkdown(workingMarkdown, title).ok === false) return invalidPlan2("The reviewed working Markdown is outside the writable profile.");
  if (action === "blocked") {
    if (raw.request !== void 0) return invalidPlan2("A blocked create plan must not include a create request.");
    return { ok: true, value: { action, parentPageId, planDigest: declared, spaceId, title, workingMarkdown } };
  }
  const request = raw.request;
  const candidateStorage = loadedArtifacts.value.contents.candidateStorage;
  const candidateReference = loadedArtifacts.value.references.candidateStorage;
  if (!isRecord14(request) || request.operation !== "api.v2.createPage" || request.method !== "POST" || request.spaceId !== spaceId || request.parentPageId !== parentPageId || request.status !== "current" || request.title !== title || request.bodyRepresentation !== "storage" || candidateStorage === void 0 || candidateReference === void 0 || parseStorageToNormalized(candidateStorage, title).ok === false) return invalidPlan2("The reviewed create request or candidate is invalid.");
  return { ok: true, value: { action, candidateStorage, candidateStorageSha256: candidateReference.sha256, parentPageId, planDigest: declared, spaceId, title, workingMarkdown } };
}
async function loadArtifacts2(directory, artifacts, complete) {
  const required = complete ? ["workingMarkdown", "candidateStorage", "previewMarkdown", "equivalence", "diagnostics"] : ["workingMarkdown", "diagnostics"];
  if (Object.keys(artifacts).length !== required.length || required.some((role) => !(role in artifacts))) return invalidPlan2("The plan artifact roles are not valid for its action.");
  const references = {};
  const contents = {};
  for (const role of required) {
    const reference = artifactReference2(artifacts[role]);
    if (reference === void 0) return invalidPlan2(`The ${role} artifact reference is invalid.`);
    const target = artifactTarget2(directory, reference.path);
    if (target === void 0) return invalidPlan2(`The ${role} artifact path is unsafe.`);
    const content = await readRegularTextFile6(target);
    if (content === void 0 || sha256(content) !== reference.sha256) return artifactMismatch(`The ${role} artifact no longer matches the reviewed digest.`);
    references[role] = reference;
    contents[role] = content;
  }
  return { ok: true, value: { references, contents } };
}
function validAssessment2(action, assessment) {
  if (action === "create") return assessment.generation === "complete" && assessment.applyEligible === true && assessment.blockerCount === 0;
  return assessment.generation === "blocked" && assessment.applyEligible === false && typeof assessment.blockerCount === "number" && Number.isInteger(assessment.blockerCount) && assessment.blockerCount >= 1;
}
function pageIdFromCreateResponse(envelope) {
  return isRecord14(envelope.response?.body) ? decimalId(envelope.response.body.id) : void 0;
}
function remotePage2(envelope, plan, expectedId) {
  const body = envelope.response?.body;
  if (!isRecord14(body)) return { ok: false, diagnostic: diagnostic2("REMOTE_PAGE_INVALID", "The re-read page response is not an object.", plan, expectedId) };
  const id2 = decimalId(body.id);
  const title = stringValue2(body.title);
  const storage = isRecord14(body.body) && isRecord14(body.body.storage) ? stringValue2(body.body.storage.value) : void 0;
  const version = isRecord14(body.version) ? integerValue2(body.version.number) : void 0;
  if (id2 !== expectedId || title === void 0 || body.status !== "current" || storage === void 0) return { ok: false, diagnostic: diagnostic2("REMOTE_PAGE_INVALID", "The re-read page response is missing the expected page identity, current status, or Storage XML.", plan, expectedId) };
  return { ok: true, value: { id: id2, title, status: "current", storage, version } };
}
function postconditionRecord2(plan, accepted, normalizedAccepted, canonicalStorage, acceptedMarkdown) {
  const candidate = parseStorageToNormalized(plan.candidateStorage ?? "", plan.title);
  const working = parseWorkingMarkdown(plan.workingMarkdown, plan.title);
  if (candidate.ok === false || working.ok === false) throw new Error("Reviewed create artifacts became invalid after inspection.");
  const acceptedStorageSha256 = sha256(canonicalStorage);
  const acceptedMarkdownSha256 = sha256(acceptedMarkdown);
  return {
    schemaVersion: "miku-confluence.markdown-create-postcondition/v1",
    page: { id: accepted.id, title: accepted.title, status: accepted.status, ...accepted.version === void 0 ? {} : { version: accepted.version } },
    planDigest: plan.planDigest,
    accepted: { storageSha256: acceptedStorageSha256, markdownSha256: acceptedMarkdownSha256 },
    comparisons: {
      candidateToAccepted: compareNormalized(candidate.value, normalizedAccepted, plan.candidateStorageSha256 ?? "", acceptedStorageSha256),
      workingToAccepted: compareNormalized(working.value, normalizedAccepted, sha256(plan.workingMarkdown), acceptedMarkdownSha256)
    }
  };
}
function attemptRecord2(plan, outcome, requestCount, diagnostics, pageId, postcondition) {
  return {
    schemaVersion: "miku-confluence.markdown-create-attempt/v1",
    operation: operationName6,
    plan: { digest: plan.planDigest, spaceId: plan.spaceId, parentPageId: plan.parentPageId, action: plan.action },
    outcome,
    requestCount,
    ...pageId === void 0 ? {} : { pageId },
    ...postcondition === void 0 ? {} : { postcondition },
    diagnostics
  };
}
function apiFailure2(code, message, plan, apiDiagnostics2) {
  return [diagnostic2(code, message, plan), ...apiDiagnostics2.map((entry) => ({ ...entry, operation: operationName6 }))];
}
function success3(plan, outcome, requestCount, diagnostics, attemptDirectory, pageId) {
  return { schemaVersion: 1, operation: operationName6, kind: "workflow", success: true, result: result2(plan, outcome, requestCount, attemptDirectory, pageId), diagnostics };
}
function failure4(plan, outcome, requestCount, diagnostics, attemptDirectory, pageId) {
  return { schemaVersion: 1, operation: operationName6, kind: "workflow", success: false, result: result2(plan, outcome, requestCount, attemptDirectory, pageId), diagnostics };
}
function result2(plan, outcome, requestCount, attemptDirectory, pageId) {
  return { attemptDirectory, outcome, planDigest: plan.planDigest, requestCount, ...pageId === void 0 ? {} : { pageId } };
}
function diagnostic2(code, message, plan, pageId) {
  return { severity: "error", code, message, operation: operationName6, ...pageId === void 0 ? {} : { pageId } };
}
function info2(code, message, plan, pageId) {
  return { severity: "info", code, message, operation: operationName6, ...pageId === void 0 ? {} : { pageId } };
}
function invalidPlan2(message) {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_CREATE_PLAN", message, operation: operationName6 } };
}
function planDigestMismatch2(message) {
  return { ok: false, diagnostic: { severity: "error", code: "PLAN_DIGEST_MISMATCH", message, operation: operationName6 } };
}
function artifactMismatch(message) {
  return { ok: false, diagnostic: { severity: "error", code: "PLAN_ARTIFACT_MISMATCH", message, operation: operationName6 } };
}
function digestValue2(value) {
  if (!isRecord14(value) || value.algorithm !== "sha256" || value.canonicalization !== "RFC8785") return void 0;
  return isDigest4(value.value) ? value.value : void 0;
}
function artifactReference2(value) {
  if (!isRecord14(value) || typeof value.path !== "string" || !isDigest4(value.sha256)) return void 0;
  return { path: value.path, sha256: value.sha256 };
}
function artifactTarget2(directory, path2) {
  if (!/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9._/-]+$/u.test(path2)) return void 0;
  const target = resolve7(directory, path2);
  return target.startsWith(`${directory}/`) ? target : void 0;
}
function decimalId(value) {
  return typeof value === "string" && /^[0-9]+$/u.test(value) ? value : void 0;
}
function stringValue2(value) {
  return typeof value === "string" ? value : void 0;
}
function integerValue2(value) {
  if (typeof value === "number" && Number.isSafeInteger(value)) return value;
  if (!isRecord14(value) || value.isLosslessNumber !== true || typeof value.value !== "string" || !/^-?(?:0|[1-9][0-9]*)$/u.test(value.value)) return void 0;
  const converted = Number(value.value);
  return Number.isSafeInteger(converted) ? converted : void 0;
}
function isDigest4(value) {
  return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
}
function isRecord14(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function safeLstat6(path2) {
  try {
    return await lstat7(path2);
  } catch {
    return void 0;
  }
}
async function readRegularTextFile6(path2) {
  const stat = await safeLstat6(path2);
  if (stat === void 0 || !stat.isFile() || stat.isSymbolicLink()) return void 0;
  try {
    return await readFile6(path2, "utf8");
  } catch {
    return void 0;
  }
}
async function readJsonFile6(path2) {
  const text = await readRegularTextFile6(path2);
  if (text === void 0) return void 0;
  try {
    return JSON.parse(text);
  } catch {
    return void 0;
  }
}
var MarkdownCreateAttemptWriter;
var init_markdown_create_apply = __esm({
  "src/adapters/filesystem/markdown-create-apply.ts"() {
    "use strict";
    init_snapshot_writer();
    init_json();
    init_markdown_storage_profile();
    init_apply_markdown_create();
    MarkdownCreateAttemptWriter = class _MarkdownCreateAttemptWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        return new _MarkdownCreateAttemptWriter(plan, await mkdtemp7(resolve7(dirname7(plan.finalDirectory), `.${basename7(plan.finalDirectory)}.miku-confluence-staging-`)));
      }
      async writeArtifact(name, value) {
        const target = resolve7(this.stagingDirectory, "artifacts", name);
        await mkdir7(dirname7(target), { recursive: true });
        await writeFile8(target, value, "utf8");
      }
      async writeAttempt(value) {
        await writeFile8(resolve7(this.stagingDirectory, "attempt.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat6(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename7(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm7(this.stagingDirectory, { recursive: true, force: true });
      }
    };
  }
});

// src/generated/confluence-v2-operations.ts
var confluenceV2OpenApiSource, confluenceV2Operations;
var init_confluence_v2_operations = __esm({
  "src/generated/confluence-v2-operations.ts"() {
    "use strict";
    confluenceV2OpenApiSource = {
      "url": "https://dac-static.atlassian.com/cloud/confluence/openapi-v2.v3.json",
      "retrievedAt": "2026-08-04T00:14:54.111Z",
      "openApiVersion": "3.0.3",
      "infoVersion": "2.0.0",
      "sha256": "c4bd1ed570f21cd6dee2360d9cda0d5aa09933233491c8286d60cc4fa16c5df5",
      "serverTemplate": "https://{your-domain}/wiki/api/v2"
    };
    confluenceV2Operations = [
      {
        "operationName": "api.v2.createPage",
        "operationId": "createPage",
        "summary": "Create page",
        "method": "POST",
        "pathTemplate": "/pages",
        "scopes": [
          "write:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "query",
            "name": "embedded",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "private",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "root-level",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          }
        ],
        "requestBody": {
          "contentType": "application/json",
          "required": true,
          "sourceSchema": {
            "type": "object",
            "required": [
              "spaceId"
            ],
            "properties": {
              "spaceId": {
                "type": "string",
                "description": "ID of the space."
              },
              "status": {
                "enum": [
                  "current",
                  "draft"
                ],
                "type": "string",
                "description": "The status of the page, published or draft."
              },
              "title": {
                "type": "string",
                "description": "Title of the page, required if page status is not draft."
              },
              "parentId": {
                "type": "string",
                "description": "The parent content ID of the page. If the `root-level` query parameter is set to false and a value is \nnot supplied for this parameter, then the space homepage's ID will be used. If the `root-level` query \nparameter is set to true, then a value may not be supplied for this parameter."
              },
              "body": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "representation": {
                        "enum": [
                          "storage",
                          "atlas_doc_format",
                          "wiki"
                        ],
                        "type": "string",
                        "description": "Type of content representation used for the value field."
                      },
                      "value": {
                        "type": "string",
                        "description": "Body of the page, in the format found in the representation field."
                      }
                    }
                  },
                  {
                    "type": "object",
                    "description": "Body of the page. Only one body format should be specified as the property\nfor this object, e.g. `storage`.",
                    "properties": {
                      "storage": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "atlas_doc_format": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "wiki": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      }
                    }
                  }
                ]
              },
              "subtype": {
                "enum": [
                  "live"
                ],
                "type": "string",
                "description": "The subtype of the page. Provide the subtype live to create a live doc or no subtype to create a page."
              }
            }
          },
          "effectiveSchema": {
            "type": "object",
            "required": [
              "spaceId"
            ],
            "properties": {
              "spaceId": {
                "type": "string",
                "description": "ID of the space."
              },
              "status": {
                "enum": [
                  "current",
                  "draft"
                ],
                "type": "string",
                "description": "The status of the page, published or draft."
              },
              "title": {
                "type": "string",
                "description": "Title of the page, required if page status is not draft."
              },
              "parentId": {
                "type": "string",
                "description": "The parent content ID of the page. If the `root-level` query parameter is set to false and a value is \nnot supplied for this parameter, then the space homepage's ID will be used. If the `root-level` query \nparameter is set to true, then a value may not be supplied for this parameter."
              },
              "body": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "representation": {
                        "enum": [
                          "storage",
                          "atlas_doc_format",
                          "wiki"
                        ],
                        "type": "string",
                        "description": "Type of content representation used for the value field."
                      },
                      "value": {
                        "type": "string",
                        "description": "Body of the page, in the format found in the representation field."
                      }
                    }
                  },
                  {
                    "type": "object",
                    "description": "Body of the page. Only one body format should be specified as the property\nfor this object, e.g. `storage`.",
                    "properties": {
                      "storage": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "atlas_doc_format": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "wiki": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      }
                    }
                  }
                ]
              },
              "subtype": {
                "enum": [
                  "live"
                ],
                "type": "string",
                "description": "The subtype of the page. Provide the subtype live to create a live doc or no subtype to create a page."
              }
            }
          }
        }
      },
      {
        "operationName": "api.v2.getAttachmentById",
        "operationId": "getAttachmentById",
        "summary": "Get attachment by id",
        "method": "GET",
        "pathTemplate": "/attachments/{id}",
        "scopes": [
          "read:attachment:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "type": "string",
              "pattern": "(att)?[0-9]+"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^(att)?[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "version",
            "required": false,
            "sourceSchema": {
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "integer"
            }
          },
          {
            "location": "query",
            "name": "include-labels",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-properties",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-operations",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-versions",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-version",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": true
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": true
            }
          },
          {
            "location": "query",
            "name": "include-collaborators",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getAttachmentLabels",
        "operationId": "getAttachmentLabels",
        "summary": "Get labels for attachment",
        "method": "GET",
        "pathTemplate": "/attachments/{id}/labels",
        "scopes": [
          "read:attachment:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "prefix",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "enum": [
                "my",
                "team",
                "global",
                "system"
              ]
            },
            "effectiveSchema": {
              "type": "string",
              "enum": [
                "my",
                "team",
                "global",
                "system"
              ]
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "items": {
                "$ref": "#/components/schemas/LabelSortOrder"
              }
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "id",
                "-id",
                "name",
                "-name"
              ],
              "type": "string",
              "description": "The sort fields for labels. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getBlogPostById",
        "operationId": "getBlogPostById",
        "summary": "Get blog post by id",
        "method": "GET",
        "pathTemplate": "/blogposts/{id}",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PrimaryBodyRepresentationSingle"
            },
            "effectiveSchema": {
              "enum": [
                "storage",
                "atlas_doc_format",
                "view",
                "export_view",
                "anonymous_export_view",
                "styled_view",
                "editor"
              ],
              "type": "string",
              "description": "The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed formats in certain use cases."
            }
          },
          {
            "location": "query",
            "name": "get-draft",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "status",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "trashed",
                  "deleted",
                  "historical",
                  "draft"
                ]
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "trashed",
                  "deleted",
                  "historical",
                  "draft"
                ]
              }
            }
          },
          {
            "location": "query",
            "name": "version",
            "required": false,
            "sourceSchema": {
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "integer"
            }
          },
          {
            "location": "query",
            "name": "include-labels",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-properties",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-operations",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-likes",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-versions",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-version",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": true
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": true
            }
          },
          {
            "location": "query",
            "name": "include-favorited-by-current-user-status",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-webresources",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-collaborators",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getBlogPostLabels",
        "operationId": "getBlogPostLabels",
        "summary": "Get labels for blog post",
        "method": "GET",
        "pathTemplate": "/blogposts/{id}/labels",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "prefix",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "enum": [
                "my",
                "team",
                "global",
                "system"
              ]
            },
            "effectiveSchema": {
              "type": "string",
              "enum": [
                "my",
                "team",
                "global",
                "system"
              ]
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "items": {
                "$ref": "#/components/schemas/LabelSortOrder"
              }
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "id",
                "-id",
                "name",
                "-name"
              ],
              "type": "string",
              "description": "The sort fields for labels. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getBlogPosts",
        "operationId": "getBlogPosts",
        "summary": "Get blog posts",
        "method": "GET",
        "pathTemplate": "/blogposts",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "query",
            "name": "id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "space-id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/BlogPostSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "id",
                "-id",
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date"
              ],
              "type": "string",
              "description": "The sort fields for blog posts. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "status",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "deleted",
                  "trashed"
                ]
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "deleted",
                  "trashed"
                ]
              }
            }
          },
          {
            "location": "query",
            "name": "title",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PrimaryBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "storage",
                "atlas_doc_format"
              ],
              "type": "string",
              "description": "The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed formats in certain use cases."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getChildPages",
        "operationId": "getChildPages",
        "summary": "Get child pages",
        "method": "GET",
        "pathTemplate": "/pages/{id}/children",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": true,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "items": {
                "$ref": "#/components/schemas/ChildPageSortOrder"
              }
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "id",
                "-id",
                "child-position",
                "-child-position",
                "modified-date",
                "-modified-date"
              ],
              "type": "string",
              "description": "The sort fields for child pages. The default sort direction is ascending by child-position. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getCustomContentById",
        "operationId": "getCustomContentById",
        "summary": "Get custom content by id",
        "method": "GET",
        "pathTemplate": "/custom-content/{id}",
        "scopes": [
          "read:custom-content:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/CustomContentBodyRepresentationSingle"
            },
            "effectiveSchema": {
              "enum": [
                "raw",
                "storage",
                "atlas_doc_format",
                "view",
                "export_view",
                "anonymous_export_view"
              ],
              "type": "string",
              "description": "The formats a custom content body can be represented as. A subset of BodyRepresentation."
            }
          },
          {
            "location": "query",
            "name": "version",
            "required": false,
            "sourceSchema": {
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "integer"
            }
          },
          {
            "location": "query",
            "name": "include-labels",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-properties",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-operations",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-versions",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-version",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": true
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": true
            }
          },
          {
            "location": "query",
            "name": "include-collaborators",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getCustomContentByType",
        "operationId": "getCustomContentByType",
        "summary": "Get custom content by type",
        "method": "GET",
        "pathTemplate": "/custom-content",
        "scopes": [
          "read:custom-content:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "query",
            "name": "type",
            "required": true,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "space-id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/CustomContentSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "id",
                "-id",
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date",
                "title",
                "-title"
              ],
              "type": "string",
              "description": "The sort fields for custom content. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/CustomContentBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "raw",
                "storage",
                "atlas_doc_format"
              ],
              "type": "string",
              "description": "The formats a custom content body can be represented as. A subset of BodyRepresentation."
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getLabelAttachments",
        "operationId": "getLabelAttachments",
        "summary": "Get attachments for label",
        "method": "GET",
        "pathTemplate": "/labels/{id}/attachments",
        "scopes": [
          "read:attachment:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/AttachmentSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date"
              ],
              "type": "string",
              "description": "The sort fields for attachments. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getLabelBlogPosts",
        "operationId": "getLabelBlogPosts",
        "summary": "Get blog posts for label",
        "method": "GET",
        "pathTemplate": "/labels/{id}/blogposts",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "space-id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PrimaryBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "storage",
                "atlas_doc_format"
              ],
              "type": "string",
              "description": "The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed formats in certain use cases."
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/BlogPostSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "id",
                "-id",
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date"
              ],
              "type": "string",
              "description": "The sort fields for blog posts. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getLabelPages",
        "operationId": "getLabelPages",
        "summary": "Get pages for label",
        "method": "GET",
        "pathTemplate": "/labels/{id}/pages",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "space-id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PrimaryBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "storage",
                "atlas_doc_format"
              ],
              "type": "string",
              "description": "The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed formats in certain use cases."
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PageSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "id",
                "-id",
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date",
                "title",
                "-title"
              ],
              "type": "string",
              "description": "The sort fields for pages. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getLabels",
        "operationId": "getLabels",
        "summary": "Get labels",
        "method": "GET",
        "pathTemplate": "/labels",
        "scopes": [
          "read:label:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "query",
            "name": "label-id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "prefix",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "items": {
                "$ref": "#/components/schemas/LabelSortOrder"
              }
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "id",
                "-id",
                "name",
                "-name"
              ],
              "type": "string",
              "description": "The sort fields for labels. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getPageAttachments",
        "operationId": "getPageAttachments",
        "summary": "Get attachments for page",
        "method": "GET",
        "pathTemplate": "/pages/{id}/attachments",
        "scopes": [
          "read:attachment:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/AttachmentSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date"
              ],
              "type": "string",
              "description": "The sort fields for attachments. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "status",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "trashed"
                ]
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "trashed"
                ]
              }
            }
          },
          {
            "location": "query",
            "name": "mediaType",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "filename",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 50,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 50,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getPageById",
        "operationId": "getPageById",
        "summary": "Get page by id",
        "method": "GET",
        "pathTemplate": "/pages/{id}",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PrimaryBodyRepresentationSingle"
            },
            "effectiveSchema": {
              "enum": [
                "storage",
                "atlas_doc_format",
                "view",
                "export_view",
                "anonymous_export_view",
                "styled_view",
                "editor"
              ],
              "type": "string",
              "description": "The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed formats in certain use cases."
            }
          },
          {
            "location": "query",
            "name": "get-draft",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "status",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "trashed",
                  "deleted",
                  "historical",
                  "draft"
                ]
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "trashed",
                  "deleted",
                  "historical",
                  "draft"
                ]
              }
            }
          },
          {
            "location": "query",
            "name": "version",
            "required": false,
            "sourceSchema": {
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "integer"
            }
          },
          {
            "location": "query",
            "name": "include-labels",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-properties",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-operations",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-likes",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-versions",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-version",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": true
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": true
            }
          },
          {
            "location": "query",
            "name": "include-favorited-by-current-user-status",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-webresources",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-collaborators",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-direct-children",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getPageDirectChildren",
        "operationId": "getPageDirectChildren",
        "summary": "Get direct children of a page",
        "method": "GET",
        "pathTemplate": "/pages/{id}/direct-children",
        "scopes": [
          "read:hierarchical-content:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "items": {
                "$ref": "#/components/schemas/ContentSortOrder"
              }
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "id",
                "-id",
                "modified-date",
                "-modified-date",
                "child-position",
                "-child-position",
                "title",
                "-title"
              ],
              "type": "string",
              "description": "The sort fields for hierarchical content types. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getPageLabels",
        "operationId": "getPageLabels",
        "summary": "Get labels for page",
        "method": "GET",
        "pathTemplate": "/pages/{id}/labels",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "prefix",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "enum": [
                "my",
                "team",
                "global",
                "system"
              ]
            },
            "effectiveSchema": {
              "type": "string",
              "enum": [
                "my",
                "team",
                "global",
                "system"
              ]
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "items": {
                "$ref": "#/components/schemas/LabelSortOrder"
              }
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "id",
                "-id",
                "name",
                "-name"
              ],
              "type": "string",
              "description": "The sort fields for labels. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getPages",
        "operationId": "getPages",
        "summary": "Get pages",
        "method": "GET",
        "pathTemplate": "/pages",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "query",
            "name": "id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "space-id",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 100,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PageSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "id",
                "-id",
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date",
                "title",
                "-title"
              ],
              "type": "string",
              "description": "The sort fields for pages. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "status",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "deleted",
                  "trashed"
                ]
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "deleted",
                  "trashed"
                ]
              }
            }
          },
          {
            "location": "query",
            "name": "title",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PrimaryBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "storage",
                "atlas_doc_format"
              ],
              "type": "string",
              "description": "The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed formats in certain use cases."
            }
          },
          {
            "location": "query",
            "name": "subtype",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "enum": [
                "live",
                "page"
              ]
            },
            "effectiveSchema": {
              "type": "string",
              "enum": [
                "live",
                "page"
              ]
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getPagesInSpace",
        "operationId": "getPagesInSpace",
        "summary": "Get pages in space",
        "method": "GET",
        "pathTemplate": "/spaces/{id}/pages",
        "scopes": [
          "read:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "depth",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "default": "all",
              "enum": [
                "all",
                "root"
              ]
            },
            "effectiveSchema": {
              "type": "string",
              "default": "all",
              "enum": [
                "all",
                "root"
              ]
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PageSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "id",
                "-id",
                "created-date",
                "-created-date",
                "modified-date",
                "-modified-date",
                "title",
                "-title"
              ],
              "type": "string",
              "description": "The sort fields for pages. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "status",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "deleted",
                  "trashed"
                ]
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": [
                  "current",
                  "archived",
                  "deleted",
                  "trashed"
                ]
              }
            }
          },
          {
            "location": "query",
            "name": "title",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "body-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/PrimaryBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "storage",
                "atlas_doc_format"
              ],
              "type": "string",
              "description": "The primary formats a body can be represented as. A subset of BodyRepresentation. These formats are the only allowed formats in certain use cases."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getSpaceById",
        "operationId": "getSpaceById",
        "summary": "Get space by id",
        "method": "GET",
        "pathTemplate": "/spaces/{id}",
        "scopes": [
          "read:space:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "description-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/SpaceDescriptionBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "plain",
                "view"
              ],
              "type": "string",
              "description": "The formats a space description can be represented as. A subset of BodyRepresentation."
            }
          },
          {
            "location": "query",
            "name": "include-icon",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-operations",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-properties",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-permissions",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-role-assignments",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "include-labels",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getSpaceLabels",
        "operationId": "getSpaceLabels",
        "summary": "Get labels for space",
        "method": "GET",
        "pathTemplate": "/spaces/{id}/labels",
        "scopes": [
          "read:space:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          },
          {
            "location": "query",
            "name": "prefix",
            "required": false,
            "sourceSchema": {
              "default": "my, team",
              "type": "string",
              "enum": [
                "my",
                "team"
              ]
            },
            "effectiveSchema": {
              "default": "my, team",
              "type": "string",
              "enum": [
                "my",
                "team"
              ]
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "items": {
                "$ref": "#/components/schemas/LabelSortOrder"
              }
            },
            "effectiveSchema": {
              "enum": [
                "created-date",
                "-created-date",
                "id",
                "-id",
                "name",
                "-name"
              ],
              "type": "string",
              "description": "The sort fields for labels. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.getSpaces",
        "operationId": "getSpaces",
        "summary": "Get spaces",
        "method": "GET",
        "pathTemplate": "/spaces",
        "scopes": [
          "read:space:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "query",
            "name": "ids",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "integer",
                "format": "int64"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "string",
                "pattern": "^[0-9]+$"
              }
            }
          },
          {
            "location": "query",
            "name": "keys",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "string"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "maxItems": 250,
              "items": {
                "type": "string"
              }
            }
          },
          {
            "location": "query",
            "name": "type",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "enum": [
                "global",
                "collaboration",
                "knowledge_base",
                "personal",
                "system",
                "onboarding",
                "xflow_sample_space"
              ]
            },
            "effectiveSchema": {
              "type": "string",
              "enum": [
                "global",
                "collaboration",
                "knowledge_base",
                "personal",
                "system",
                "onboarding",
                "xflow_sample_space"
              ]
            }
          },
          {
            "location": "query",
            "name": "status",
            "required": false,
            "sourceSchema": {
              "type": "string",
              "enum": [
                "current",
                "archived"
              ]
            },
            "effectiveSchema": {
              "type": "string",
              "enum": [
                "current",
                "archived"
              ]
            }
          },
          {
            "location": "query",
            "name": "labels",
            "required": false,
            "sourceSchema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "effectiveSchema": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          {
            "location": "query",
            "name": "favorited-by",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "not-favorited-by",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "sort",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/SpaceSortOrder"
            },
            "effectiveSchema": {
              "enum": [
                "id",
                "-id",
                "key",
                "-key",
                "name",
                "-name"
              ],
              "type": "string",
              "description": "The sort fields for spaces. The default sort direction is ascending. To sort in descending order, append a `-` character before the sort field. For example, `fieldName` or `-fieldName`."
            }
          },
          {
            "location": "query",
            "name": "description-format",
            "required": false,
            "sourceSchema": {
              "$ref": "#/components/schemas/SpaceDescriptionBodyRepresentation"
            },
            "effectiveSchema": {
              "enum": [
                "plain",
                "view"
              ],
              "type": "string",
              "description": "The formats a space description can be represented as. A subset of BodyRepresentation."
            }
          },
          {
            "location": "query",
            "name": "include-icon",
            "required": false,
            "sourceSchema": {
              "type": "boolean",
              "default": false
            },
            "effectiveSchema": {
              "type": "boolean",
              "default": false
            }
          },
          {
            "location": "query",
            "name": "cursor",
            "required": false,
            "sourceSchema": {
              "type": "string"
            },
            "effectiveSchema": {
              "type": "string"
            }
          },
          {
            "location": "query",
            "name": "limit",
            "required": false,
            "sourceSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            },
            "effectiveSchema": {
              "format": "int32",
              "default": 25,
              "minimum": 1,
              "maximum": 250,
              "type": "integer"
            }
          }
        ]
      },
      {
        "operationName": "api.v2.updatePage",
        "operationId": "updatePage",
        "summary": "Update page",
        "method": "PUT",
        "pathTemplate": "/pages/{id}",
        "scopes": [
          "write:page:confluence"
        ],
        "deprecated": false,
        "experimental": false,
        "parameters": [
          {
            "location": "path",
            "name": "id",
            "required": true,
            "sourceSchema": {
              "format": "int64",
              "type": "integer"
            },
            "effectiveSchema": {
              "type": "string",
              "pattern": "^[0-9]+$"
            }
          }
        ],
        "requestBody": {
          "contentType": "application/json",
          "required": true,
          "sourceSchema": {
            "type": "object",
            "required": [
              "id",
              "status",
              "title",
              "body",
              "version"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Id of the page."
              },
              "status": {
                "enum": [
                  "current",
                  "draft"
                ],
                "type": "string",
                "description": "The updated status of the page.\n\nNote, if you change the status of a page from 'current' to 'draft' and it has an existing draft, the existing draft will be deleted in favor of the updated draft.\nAdditionally, this endpoint can be used to restore a 'trashed' or 'deleted' page to 'current' status. For restoration, page contents will not be updated and only the page status will be changed."
              },
              "title": {
                "type": "string",
                "description": "Title of the page."
              },
              "spaceId": {
                "format": "string",
                "description": "ID of the containing space.\n\nThis currently **does not support moving the page to a different space**."
              },
              "parentId": {
                "format": "string",
                "description": "ID of the parent content.\n\nThis allows the page to be moved under a different parent within the same space."
              },
              "ownerId": {
                "format": "string",
                "description": "Account ID of the page owner.\n\nThis allows page ownership to be transferred to another user."
              },
              "body": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "representation": {
                        "enum": [
                          "storage",
                          "atlas_doc_format",
                          "wiki"
                        ],
                        "type": "string",
                        "description": "Type of content representation used for the value field."
                      },
                      "value": {
                        "type": "string",
                        "description": "Body of the page, in the format found in the representation field."
                      }
                    }
                  },
                  {
                    "type": "object",
                    "description": "Body of the page. Only one body format should be specified as the property\nfor this object, e.g. `storage`.",
                    "properties": {
                      "storage": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "atlas_doc_format": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "wiki": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      }
                    }
                  }
                ]
              },
              "version": {
                "type": "object",
                "properties": {
                  "number": {
                    "format": "int32",
                    "type": "integer",
                    "description": "The new version of the updated page. \nSet this to the current version number plus one, unless you are updating the status to 'draft' which requires a version number of 1.\n\nIf you don't know the current version number, use Get page by id."
                  },
                  "message": {
                    "type": "string",
                    "description": "An optional message to be stored with the version."
                  }
                }
              }
            }
          },
          "effectiveSchema": {
            "type": "object",
            "required": [
              "id",
              "status",
              "title",
              "body",
              "version"
            ],
            "properties": {
              "id": {
                "type": "string",
                "description": "Id of the page."
              },
              "status": {
                "enum": [
                  "current",
                  "draft"
                ],
                "type": "string",
                "description": "The updated status of the page.\n\nNote, if you change the status of a page from 'current' to 'draft' and it has an existing draft, the existing draft will be deleted in favor of the updated draft.\nAdditionally, this endpoint can be used to restore a 'trashed' or 'deleted' page to 'current' status. For restoration, page contents will not be updated and only the page status will be changed."
              },
              "title": {
                "type": "string",
                "description": "Title of the page."
              },
              "spaceId": {
                "format": "string",
                "description": "ID of the containing space.\n\nThis currently **does not support moving the page to a different space**."
              },
              "parentId": {
                "format": "string",
                "description": "ID of the parent content.\n\nThis allows the page to be moved under a different parent within the same space."
              },
              "ownerId": {
                "format": "string",
                "description": "Account ID of the page owner.\n\nThis allows page ownership to be transferred to another user."
              },
              "body": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "representation": {
                        "enum": [
                          "storage",
                          "atlas_doc_format",
                          "wiki"
                        ],
                        "type": "string",
                        "description": "Type of content representation used for the value field."
                      },
                      "value": {
                        "type": "string",
                        "description": "Body of the page, in the format found in the representation field."
                      }
                    }
                  },
                  {
                    "type": "object",
                    "description": "Body of the page. Only one body format should be specified as the property\nfor this object, e.g. `storage`.",
                    "properties": {
                      "storage": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "atlas_doc_format": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      },
                      "wiki": {
                        "type": "object",
                        "properties": {
                          "representation": {
                            "enum": [
                              "storage",
                              "atlas_doc_format",
                              "wiki"
                            ],
                            "type": "string",
                            "description": "Type of content representation used for the value field."
                          },
                          "value": {
                            "type": "string",
                            "description": "Body of the page, in the format found in the representation field."
                          }
                        }
                      }
                    }
                  }
                ]
              },
              "version": {
                "type": "object",
                "properties": {
                  "number": {
                    "format": "int32",
                    "type": "integer",
                    "description": "The new version of the updated page. \nSet this to the current version number plus one, unless you are updating the status to 'draft' which requires a version number of 1.\n\nIf you don't know the current version number, use Get page by id."
                  },
                  "message": {
                    "type": "string",
                    "description": "An optional message to be stored with the version."
                  }
                }
              }
            }
          }
        }
      }
    ];
  }
});

// src/core/workflows/prepare-markdown-create.ts
function parsePrepareMarkdownCreateInput(value) {
  if (!isRecord15(value)) return invalidInput7("$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["spaceId", "parentPageId", "title", "workingMarkdownPath", "outputDirectory", "expectedWorkingMarkdownSha256"]);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) return invalidInput7(`$.${key}`, "is not allowed for this operation");
  }
  const spaceId = decimalId2(value.spaceId, "$.spaceId", "space");
  if (spaceId.ok === false) return spaceId;
  const parentPageId = decimalId2(value.parentPageId, "$.parentPageId", "parent page");
  if (parentPageId.ok === false) return parentPageId;
  const title = nonEmptyString(value.title, "$.title");
  if (title.ok === false) return title;
  const workingMarkdownPath = validPath5(value.workingMarkdownPath, "$.workingMarkdownPath");
  if (workingMarkdownPath.ok === false) return workingMarkdownPath;
  const outputDirectory = validPath5(value.outputDirectory, "$.outputDirectory");
  if (outputDirectory.ok === false) return outputDirectory;
  const expectedWorkingMarkdownSha256 = optionalDigest2(value.expectedWorkingMarkdownSha256, "$.expectedWorkingMarkdownSha256");
  if (expectedWorkingMarkdownSha256.ok === false) return expectedWorkingMarkdownSha256;
  return {
    ok: true,
    value: {
      spaceId: spaceId.value,
      parentPageId: parentPageId.value,
      title: title.value,
      workingMarkdownPath: workingMarkdownPath.value,
      outputDirectory: outputDirectory.value,
      ...expectedWorkingMarkdownSha256.value === void 0 ? {} : { expectedWorkingMarkdownSha256: expectedWorkingMarkdownSha256.value }
    }
  };
}
function prepareMarkdownCreateDryRun(input) {
  return {
    schemaVersion: 1,
    operation: operationName7,
    kind: "workflow",
    success: true,
    dryRun: true,
    plan: {
      outputDirectory: input.outputDirectory,
      artifacts: ["create-plan.json", "artifacts/working.md", "artifacts/candidate.storage.xml", "artifacts/preview.md", "artifacts/equivalence.json", "artifacts/diagnostics.json"]
    },
    diagnostics: []
  };
}
function prepareMarkdownCreateFailure(diagnostics) {
  return { schemaVersion: 1, operation: operationName7, kind: "workflow", success: false, diagnostics };
}
function decimalId2(value, path2, label) {
  if (typeof value !== "string" || !/^[0-9]+$/u.test(value)) return invalidInput7(path2, `must be a decimal ${label} ID`);
  return { ok: true, value };
}
function nonEmptyString(value, path2) {
  if (typeof value !== "string" || value.length === 0 || /[\r\n]/u.test(value)) return invalidInput7(path2, "must be a non-empty single-line string");
  return { ok: true, value };
}
function validPath5(value, path2) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) return invalidInput7(path2, "must be a non-empty path without NUL");
  return { ok: true, value };
}
function optionalDigest2(value, path2) {
  if (value === void 0) return { ok: true, value: void 0 };
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) return invalidInput7(path2, "must be a lowercase SHA-256 digest");
  return { ok: true, value };
}
function invalidInput7(path2, reason) {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_INPUT", message: `Invalid input at ${path2}: ${reason}.`, operation: operationName7, path: path2 } };
}
function isRecord15(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var operationName7;
var init_prepare_markdown_create = __esm({
  "src/core/workflows/prepare-markdown-create.ts"() {
    "use strict";
    operationName7 = "page.prepare-markdown-create";
  }
});

// src/adapters/filesystem/markdown-create-prepare.ts
import { lstat as lstat8, mkdir as mkdir8, mkdtemp as mkdtemp8, readFile as readFile7, rename as rename8, rm as rm8, writeFile as writeFile9 } from "node:fs/promises";
import { basename as basename8, dirname as dirname8, resolve as resolve8 } from "node:path";
async function prepareMarkdownCreate(input) {
  const working = await readWorkingMarkdown(input);
  if (working.ok === false) return prepareMarkdownCreateFailure([working.diagnostic]);
  const outputPlan = await planSnapshotOutput(input.outputDirectory, operationName7);
  if (outputPlan.ok === false) return prepareMarkdownCreateFailure([outputPlan.diagnostic]);
  const source = { spaceId: input.spaceId, parentPageId: input.parentPageId, title: input.title, workingMarkdown: working.value };
  let writer;
  try {
    writer = await MarkdownCreatePlanWriter.create(outputPlan.value);
    const normalizedWorking = parseWorkingMarkdown(source.workingMarkdown, source.title);
    if (normalizedWorking.ok === false) {
      const prepared = await writeBlockedPlan2(writer, source, normalizedWorking.problem);
      await writer.finalize();
      return blockedEnvelope2(source, prepared.planDigest, input.outputDirectory, normalizedWorking.problem);
    }
    const candidateStorage = renderStorage(normalizedWorking.value);
    const normalizedCandidate = parseStorageToNormalized(candidateStorage, source.title);
    if (normalizedCandidate.ok === false) {
      const prepared = await writeBlockedPlan2(writer, source, normalizedCandidate.problem);
      await writer.finalize();
      return blockedEnvelope2(source, prepared.planDigest, input.outputDirectory, normalizedCandidate.problem);
    }
    const previewMarkdown = renderMarkdown(normalizedCandidate.value);
    const normalizedPreview = parseWorkingMarkdown(previewMarkdown, source.title);
    if (normalizedPreview.ok === false) {
      const problem = { code: "ROUND_TRIP_INVALID", message: "The candidate Storage XML could not be rendered as profile Markdown." };
      const prepared = await writeBlockedPlan2(writer, source, problem);
      await writer.finalize();
      return blockedEnvelope2(source, prepared.planDigest, input.outputDirectory, problem);
    }
    const workingDigest = sha256(source.workingMarkdown);
    const previewDigest = sha256(previewMarkdown);
    const comparison2 = compareNormalized(normalizedWorking.value, normalizedPreview.value, workingDigest, previewDigest);
    if (!comparison2.structurallyEquivalent) {
      const problem = { code: "ROUND_TRIP_INVALID", message: "The candidate Storage XML does not round-trip to structurally equivalent Markdown." };
      const prepared = await writeBlockedPlan2(writer, source, problem);
      await writer.finalize();
      return blockedEnvelope2(source, prepared.planDigest, input.outputDirectory, problem);
    }
    const diagnostics = diagnosticsDocument4(true, []);
    const artifacts = {
      workingMarkdown: await writer.writeArtifact("workingMarkdown", source.workingMarkdown),
      candidateStorage: await writer.writeArtifact("candidateStorage", candidateStorage),
      previewMarkdown: await writer.writeArtifact("previewMarkdown", previewMarkdown),
      equivalence: await writer.writeArtifact("equivalence", `${stringifyJson({
        schemaVersion: "miku-confluence.markdown-create-equivalence/v1",
        profileVersion: markdownStorageProfileVersion,
        target: { spaceId: source.spaceId, parentPageId: source.parentPageId, title: source.title },
        working: { artifactSha256: workingDigest, normalizedSha256: normalizedDigest(normalizedWorking.value) },
        preview: { artifactSha256: previewDigest, normalizedSha256: normalizedDigest(normalizedPreview.value) },
        comparison: comparison2
      })}
`),
      diagnostics: await writer.writeArtifact("diagnostics", `${stringifyJson(diagnostics)}
`)
    };
    const plan = createPlanDocument(source, artifacts, { generation: "complete", applyAction: "create", applyEligible: true, blockerCount: 0 });
    const planDigest = sha256(canonicalJson(plan));
    await writer.writePlan({ ...plan, planDigest: { algorithm: "sha256", canonicalization: "RFC8785", value: planDigest } });
    await writer.finalize();
    return successEnvelope2(source, planDigest, input.outputDirectory);
  } catch {
    if (writer !== void 0) await writer.abort();
    return prepareMarkdownCreateFailure([{ severity: "error", code: "FILESYSTEM_ERROR", message: "The Markdown create prepare artifacts could not be written safely.", operation: operationName7 }]);
  }
}
async function readWorkingMarkdown(input) {
  const markdown = await readRegularTextFile7(resolve8(input.workingMarkdownPath));
  if (markdown === void 0) return invalidInput8("$.workingMarkdownPath", "must name a regular, non-symbolic-link UTF-8 file");
  const digest3 = sha256(markdown);
  if (input.expectedWorkingMarkdownSha256 !== void 0 && input.expectedWorkingMarkdownSha256 !== digest3) {
    return { ok: false, diagnostic: { severity: "error", code: "SOURCE_DIGEST_MISMATCH", message: "The expected working Markdown digest does not match the input file.", operation: operationName7, path: "$.expectedWorkingMarkdownSha256" } };
  }
  return { ok: true, value: markdown };
}
async function writeBlockedPlan2(writer, source, problem) {
  const diagnostics = diagnosticsDocument4(false, [{ severity: "error", code: problem.code, message: problem.message, blocking: true, ...problem.nodePath === void 0 ? {} : { nodePath: problem.nodePath } }]);
  const artifacts = {
    workingMarkdown: await writer.writeArtifact("workingMarkdown", source.workingMarkdown),
    diagnostics: await writer.writeArtifact("diagnostics", `${stringifyJson(diagnostics)}
`)
  };
  const plan = createPlanDocument(source, artifacts, { generation: "blocked", applyAction: "blocked", applyEligible: false, blockerCount: 1 });
  const planDigest = sha256(canonicalJson(plan));
  await writer.writePlan({ ...plan, planDigest: { algorithm: "sha256", canonicalization: "RFC8785", value: planDigest } });
  return { planDigest };
}
function createPlanDocument(source, artifacts, assessment) {
  const plan = {
    schemaVersion: "miku-confluence.markdown-create-plan/v1",
    profileVersion: markdownStorageProfileVersion,
    target: { spaceId: source.spaceId, parentPageId: source.parentPageId, title: source.title, status: "current" },
    source: { openApiSha256: confluenceV2OpenApiSource.sha256 },
    artifacts,
    assessment,
    safety: { requiredPermission: "CREATE", confirmation: "plan-digest", automaticRetry: false }
  };
  if (assessment.applyAction === "create") {
    plan.request = {
      operation: "api.v2.createPage",
      method: "POST",
      spaceId: source.spaceId,
      parentPageId: source.parentPageId,
      status: "current",
      title: source.title,
      bodyRepresentation: "storage"
    };
  }
  return plan;
}
function diagnosticsDocument4(eligible, items) {
  return {
    schemaVersion: "miku-confluence.markdown-create-diagnostics/v1",
    profileVersion: markdownStorageProfileVersion,
    eligible,
    summary: {
      info: items.filter((item) => item.severity === "info").length,
      warning: items.filter((item) => item.severity === "warning").length,
      error: items.filter((item) => item.severity === "error").length,
      blockers: items.filter((item) => item.blocking === true).length
    },
    items
  };
}
function successEnvelope2(source, planDigest, outputDirectory) {
  const result3 = { action: "create", applyEligible: true, outputDirectory, planDigest, spaceId: source.spaceId };
  return { schemaVersion: 1, operation: operationName7, kind: "workflow", success: true, result: result3, diagnostics: [] };
}
function blockedEnvelope2(source, planDigest, outputDirectory, problem) {
  const result3 = { action: "blocked", applyEligible: false, outputDirectory, planDigest, spaceId: source.spaceId };
  return { schemaVersion: 1, operation: operationName7, kind: "workflow", success: false, result: result3, diagnostics: [{ severity: "error", code: problem.code, message: problem.message, operation: operationName7, ...problem.nodePath === void 0 ? {} : { path: problem.nodePath } }] };
}
function invalidInput8(path2, reason) {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_INPUT", message: `Invalid input at ${path2}: ${reason}.`, operation: operationName7, path: path2 } };
}
async function readRegularTextFile7(path2) {
  try {
    const stat = await lstat8(path2);
    if (!stat.isFile() || stat.isSymbolicLink()) return void 0;
    return await readFile7(path2, "utf8");
  } catch {
    return void 0;
  }
}
function artifactPath3(name) {
  const paths = {
    workingMarkdown: "artifacts/working.md",
    candidateStorage: "artifacts/candidate.storage.xml",
    previewMarkdown: "artifacts/preview.md",
    equivalence: "artifacts/equivalence.json",
    diagnostics: "artifacts/diagnostics.json"
  };
  return paths[name];
}
var MarkdownCreatePlanWriter;
var init_markdown_create_prepare = __esm({
  "src/adapters/filesystem/markdown-create-prepare.ts"() {
    "use strict";
    init_snapshot_writer();
    init_json();
    init_markdown_storage_profile();
    init_confluence_v2_operations();
    init_prepare_markdown_create();
    MarkdownCreatePlanWriter = class _MarkdownCreatePlanWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        const stagingDirectory = await mkdtemp8(resolve8(dirname8(plan.finalDirectory), `.${basename8(plan.finalDirectory)}.miku-confluence-staging-`));
        return new _MarkdownCreatePlanWriter(plan, stagingDirectory);
      }
      async writeArtifact(name, value) {
        const path2 = artifactPath3(name);
        const target = resolve8(this.stagingDirectory, path2);
        await mkdir8(dirname8(target), { recursive: true });
        await writeFile9(target, value, "utf8");
        return { path: path2, sha256: sha256(value) };
      }
      async writePlan(value) {
        await writeFile9(resolve8(this.stagingDirectory, "create-plan.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        try {
          await lstat8(this.plan.finalDirectory);
          throw new Error("final output exists");
        } catch (error) {
          if (error.code !== "ENOENT") throw error;
        }
        await rename8(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm8(this.stagingDirectory, { recursive: true, force: true });
      }
    };
  }
});

// src/core/workflows/snapshot-import.ts
function parsePrepareSnapshotImportInput(value) {
  if (!isRecord16(value)) return invalid(prepareOperationName, "$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["snapshotDirectory", "sourceRootPageId", "targetSpaceId", "targetParentPageId", "outputDirectory"]);
  for (const key of Object.keys(value)) if (!allowed.has(key)) return invalid(prepareOperationName, `$.${key}`, "is not allowed for this operation");
  const snapshotDirectory = path(value.snapshotDirectory, "$.snapshotDirectory", prepareOperationName);
  if (snapshotDirectory.ok === false) return snapshotDirectory;
  const sourceRootPageId = id(value.sourceRootPageId, "$.sourceRootPageId", prepareOperationName);
  if (sourceRootPageId.ok === false) return sourceRootPageId;
  const targetSpaceId = id(value.targetSpaceId, "$.targetSpaceId", prepareOperationName);
  if (targetSpaceId.ok === false) return targetSpaceId;
  const targetParentPageId = id(value.targetParentPageId, "$.targetParentPageId", prepareOperationName);
  if (targetParentPageId.ok === false) return targetParentPageId;
  const outputDirectory = path(value.outputDirectory, "$.outputDirectory", prepareOperationName);
  if (outputDirectory.ok === false) return outputDirectory;
  return { ok: true, value: { snapshotDirectory: snapshotDirectory.value, sourceRootPageId: sourceRootPageId.value, targetSpaceId: targetSpaceId.value, targetParentPageId: targetParentPageId.value, outputDirectory: outputDirectory.value } };
}
function parseApplySnapshotImportInput(value) {
  if (!isRecord16(value)) return invalid(applyOperationName, "$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["planDirectory", "expectedPlanDigest", "attemptDirectory"]);
  for (const key of Object.keys(value)) if (!allowed.has(key)) return invalid(applyOperationName, `$.${key}`, "is not allowed for this operation");
  const planDirectory = path(value.planDirectory, "$.planDirectory", applyOperationName);
  if (planDirectory.ok === false) return planDirectory;
  const expectedPlanDigest = digest2(value.expectedPlanDigest, "$.expectedPlanDigest", applyOperationName);
  if (expectedPlanDigest.ok === false) return expectedPlanDigest;
  const attemptDirectory = path(value.attemptDirectory, "$.attemptDirectory", applyOperationName);
  if (attemptDirectory.ok === false) return attemptDirectory;
  return { ok: true, value: { planDirectory: planDirectory.value, expectedPlanDigest: expectedPlanDigest.value, attemptDirectory: attemptDirectory.value } };
}
function prepareSnapshotImportDryRun(input) {
  return { schemaVersion: 1, operation: prepareOperationName, kind: "workflow", success: true, dryRun: true, plan: { inputDirectory: input.snapshotDirectory, outputDirectory: input.outputDirectory, artifacts: ["snapshot-import-plan.json", "artifacts/source-manifest.json", "artifacts/tree.json", "artifacts/mapping.json", "artifacts/diagnostics.json", "artifacts/pages/<sourcePageId>/source.api-v2.json", "artifacts/pages/<sourcePageId>/source.storage.xml"] }, diagnostics: [] };
}
function applySnapshotImportDryRun(input) {
  return { schemaVersion: 1, operation: applyOperationName, kind: "workflow", success: true, dryRun: true, plan: { planDirectory: input.planDirectory, expectedPlanDigest: input.expectedPlanDigest, outputDirectory: input.attemptDirectory, artifacts: ["attempt.json", "artifacts/mapping.json", "artifacts/pages/<sourcePageId>/accepted.storage.xml", "artifacts/pages/<sourcePageId>/postcondition.json"] }, diagnostics: [] };
}
function snapshotImportFailure(operation, diagnostics) {
  return { schemaVersion: 1, operation, kind: "workflow", success: false, diagnostics };
}
function id(value, path2, operation) {
  if (typeof value !== "string" || !/^[0-9]+$/u.test(value)) return invalid(operation, path2, "must be a decimal ID");
  return { ok: true, value };
}
function digest2(value, path2, operation) {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) return invalid(operation, path2, "must be a lowercase SHA-256 digest");
  return { ok: true, value };
}
function path(value, path2, operation) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0")) return invalid(operation, path2, "must be a non-empty path without NUL");
  return { ok: true, value };
}
function invalid(operation, path2, reason) {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_INPUT", message: `Invalid input at ${path2}: ${reason}.`, operation, path: path2 } };
}
function isRecord16(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var prepareOperationName, applyOperationName;
var init_snapshot_import = __esm({
  "src/core/workflows/snapshot-import.ts"() {
    "use strict";
    prepareOperationName = "snapshot.prepare-import";
    applyOperationName = "snapshot.apply-import";
  }
});

// src/adapters/filesystem/snapshot-import-apply.ts
import { lstat as lstat9, mkdir as mkdir9, mkdtemp as mkdtemp9, readFile as readFile8, rename as rename9, rm as rm9, writeFile as writeFile10 } from "node:fs/promises";
import { basename as basename9, dirname as dirname9, resolve as resolve9 } from "node:path";
async function inspectSnapshotImportApply(input) {
  const plan = await loadPlan3(input);
  if (plan.ok === false) return plan;
  const outputPlan = await planSnapshotOutput(input.attemptDirectory, applyOperationName);
  if (outputPlan.ok === false) return outputPlan;
  return { ok: true, value: { plan: plan.value, outputPlan: outputPlan.value } };
}
async function applyInspectedSnapshotImport(inspection, api) {
  let writer;
  try {
    writer = await AttemptWriter.create(inspection.outputPlan);
  } catch {
    return snapshotImportFailure(applyOperationName, [diagnostic3("FILESYSTEM_ERROR", "The snapshot import attempt directory could not be created.")]);
  }
  if (api === void 0) {
    const diagnostics = [diagnostic3("API_PORT_UNAVAILABLE", "The snapshot import could not obtain a Confluence API port.")];
    await writer.writeAttempt(attempt(inspection.plan, "unresolved", 0, 0, {}, diagnostics));
    await writer.finalize();
    return failure5(inspection.plan, "unresolved", 0, 0, inspection.outputPlan.outputDirectory, diagnostics);
  }
  const mapping = {};
  let requestCount = 0;
  try {
    for (const page of inspection.plan.pages) {
      const parentId = page.parentSourcePageId === void 0 ? inspection.plan.targetParentPageId : mapping[page.parentSourcePageId];
      if (parentId === void 0) return await stop(writer, inspection, mapping, requestCount, "partial", [diagnostic3("PARENT_MAPPING_MISSING", "A source parent was not created, so import stopped without creating its child.", page.id)]);
      const candidate = await readCandidate(inspection.plan, page);
      if (candidate.ok === false) return await stop(writer, inspection, mapping, requestCount, "unresolved", [candidate.diagnostic]);
      const created = await api.createPage({ body: { spaceId: inspection.plan.targetSpaceId, parentId, status: "current", title: page.title, body: { representation: "storage", value: candidate.value } } });
      requestCount += 1;
      if (!created.success) return await stop(writer, inspection, mapping, requestCount, Object.keys(mapping).length === 0 ? "unresolved" : "partial", apiDiagnostics("CREATE_REQUEST_FAILED", "The create request failed; no retry was attempted.", page.id, created.diagnostics));
      const targetId = responseId(created);
      if (targetId === void 0) return await stop(writer, inspection, mapping, requestCount, Object.keys(mapping).length === 0 ? "unresolved" : "partial", [diagnostic3("CREATE_RESPONSE_INVALID", "The create response did not contain a decimal page ID.", page.id)]);
      const fetched = await api.getPageById(targetId);
      requestCount += 1;
      if (!fetched.success) return await stop(writer, inspection, mapping, requestCount, "partial", apiDiagnostics("POSTCONDITION_READ_FAILED", "The created page could not be re-read; no retry was attempted.", page.id, fetched.diagnostics));
      const accepted = acceptedStorage(fetched, targetId, page.title);
      if (accepted === void 0 || accepted !== candidate.value) return await stop(writer, inspection, mapping, requestCount, "partial", [diagnostic3("POSTCONDITION_DIVERGENCE", "The created page did not return the reviewed title and byte-identical Storage XML.", page.id)]);
      mapping[page.id] = targetId;
      await writer.writeArtifact(`pages/${page.id}/accepted.storage.xml`, accepted);
      await writer.writeArtifact(`pages/${page.id}/postcondition.json`, `${stringifyJson({ schemaVersion: "miku-confluence.snapshot-import-postcondition/v1", sourcePageId: page.id, targetPageId: targetId, title: page.title, sourceStorageSha256: sha256(candidate.value), acceptedStorageSha256: sha256(accepted), byteIdentical: true })}
`);
    }
    await writer.writeMapping(mapping);
    const diagnostics = [info3("POSTCONDITION_VERIFIED", "Every imported page was re-read with byte-identical Storage XML.")];
    await writer.writeAttempt(attempt(inspection.plan, "created", inspection.plan.pages.length, requestCount, mapping, diagnostics));
    await writer.finalize();
    return success4(inspection.plan, requestCount, inspection.outputPlan.outputDirectory, diagnostics);
  } catch {
    await writer.abort();
    return snapshotImportFailure(applyOperationName, [diagnostic3("FILESYSTEM_ERROR", "The snapshot import attempt artifacts could not be written safely.")]);
  }
}
async function readCandidate(plan, page) {
  const content = await artifactContent(plan.planDirectory, page.storage);
  if (content === void 0 || sha256(content) !== page.storage.sha256) return { ok: false, diagnostic: diagnostic3("PLAN_ARTIFACT_MISMATCH", "A reviewed source Storage artifact no longer matches its digest.", page.id) };
  return { ok: true, value: content };
}
async function stop(writer, inspection, mapping, requestCount, outcome, diagnostics) {
  await writer.writeMapping(mapping);
  await writer.writeAttempt(attempt(inspection.plan, outcome, Object.keys(mapping).length, requestCount, mapping, diagnostics));
  await writer.finalize();
  return failure5(inspection.plan, outcome, Object.keys(mapping).length, requestCount, inspection.outputPlan.outputDirectory, diagnostics);
}
async function loadPlan3(input) {
  const directory = resolve9(input.planDirectory);
  const stat = await safeLstat7(directory);
  if (stat === void 0 || !stat.isDirectory() || stat.isSymbolicLink()) return invalidPlan3("The plan directory must be a non-symbolic-link directory.");
  const raw = parseJson4(await regularText(directory, "snapshot-import-plan.json"));
  if (!isRecord17(raw) || raw.schemaVersion !== "miku-confluence.snapshot-import-plan/v1" || !isRecord17(raw.planDigest)) return invalidPlan3("snapshot-import-plan.json is missing or invalid.");
  const declared = digestValue3(raw.planDigest);
  const { planDigest: _digest, ...covered } = raw;
  if (declared === void 0 || sha256(canonicalJson(covered)) !== declared || declared !== input.expectedPlanDigest) return mismatch("The supplied plan digest does not match the immutable import plan.");
  if (!isRecord17(raw.source) || !decimal(raw.source.rootPageId) || raw.source.snapshotSchemaVersion !== "miku-confluence.export/v1" || raw.source.openApiSha256 !== confluenceV2OpenApiSource.sha256 || !isRecord17(raw.target) || !decimal(raw.target.spaceId) || !decimal(raw.target.parentPageId) || !isRecord17(raw.assessment) || raw.assessment.applyAction !== "create" || raw.assessment.applyEligible !== true || !integer(raw.assessment.pageCount) || !isRecord17(raw.safety) || raw.safety.requiredPermission !== "CREATE" || raw.safety.confirmation !== "plan-digest" || raw.safety.automaticRetry !== false || raw.safety.automaticRollback !== false || !Array.isArray(raw.pages) || raw.pages.length === 0 || raw.assessment.pageCount !== raw.pages.length || !isRecord17(raw.artifacts)) return invalidPlan3("The import plan source, target, safety contract, or pages are invalid.");
  const pages = [];
  for (const entry of raw.pages) {
    if (!isRecord17(entry) || !decimal(entry.sourcePageId) || !integer(entry.sequence) || typeof entry.title !== "string" || entry.title.length === 0 || /[\r\n]/u.test(entry.title) || !isRecord17(entry.storageArtifact) || !isRecord17(entry.apiArtifact)) return invalidPlan3("The import plan page entry is invalid.");
    const parent = entry.parentSourcePageId;
    if (parent !== void 0 && !decimal(parent)) return invalidPlan3("The import plan parent source ID is invalid.");
    const storage = artifact(entry.storageArtifact);
    const api = artifact(entry.apiArtifact);
    if (storage === void 0 || api === void 0) return invalidPlan3("The import plan artifact reference is invalid.");
    pages.push({ id: entry.sourcePageId, ...parent === void 0 ? {} : { parentSourcePageId: parent }, sequence: entry.sequence, title: entry.title, storage, api });
  }
  pages.sort((left, right) => left.sequence - right.sequence || left.id.localeCompare(right.id));
  if (new Set(pages.map((page) => page.id)).size !== pages.length || pages[0]?.id !== raw.source.rootPageId || pages[0]?.parentSourcePageId !== void 0) return invalidPlan3("The import plan source order is invalid.");
  const ids = new Set(pages.map((page) => page.id));
  for (const page of pages) if (page.parentSourcePageId !== void 0 && (!ids.has(page.parentSourcePageId) || pages.findIndex((candidate) => candidate.id === page.parentSourcePageId) >= pages.findIndex((candidate) => candidate.id === page.id))) return invalidPlan3("The import plan does not create parents before children.");
  const planArtifacts = [raw.artifacts.sourceManifest, raw.artifacts.tree, raw.artifacts.mapping, raw.artifacts.diagnostics];
  for (const rawArtifact of planArtifacts) {
    if (!isRecord17(rawArtifact)) return invalidPlan3("The import plan shared artifact reference is invalid.");
    const reference = artifact(rawArtifact);
    if (reference === void 0) return invalidPlan3("The import plan shared artifact reference is invalid.");
    const content = await artifactContent(directory, reference);
    if (content === void 0 || sha256(content) !== reference.sha256) return artifactMismatch2("A reviewed shared artifact no longer matches its digest.");
  }
  for (const page of pages) for (const reference of [page.storage, page.api]) {
    const content = await artifactContent(directory, reference);
    if (content === void 0 || sha256(content) !== reference.sha256) return artifactMismatch2("A reviewed source artifact no longer matches its digest.");
  }
  return { ok: true, value: { pages, planDigest: declared, targetSpaceId: raw.target.spaceId, targetParentPageId: raw.target.parentPageId, planDirectory: directory } };
}
function attempt(plan, outcome, createdPageCount, requestCount, mapping, diagnostics) {
  return { schemaVersion: "miku-confluence.snapshot-import-attempt/v1", operation: applyOperationName, planDigest: plan.planDigest, target: { spaceId: plan.targetSpaceId, parentPageId: plan.targetParentPageId }, outcome, createdPageCount, requestCount, mapping, diagnostics };
}
function success4(plan, requestCount, attemptDirectory, diagnostics) {
  const result3 = { attemptDirectory, outcome: "created", createdPageCount: plan.pages.length, planDigest: plan.planDigest, requestCount };
  return { schemaVersion: 1, operation: applyOperationName, kind: "workflow", success: true, result: result3, diagnostics };
}
function failure5(plan, outcome, createdPageCount, requestCount, attemptDirectory, diagnostics) {
  const result3 = { attemptDirectory, outcome, createdPageCount, planDigest: plan.planDigest, requestCount };
  return { schemaVersion: 1, operation: applyOperationName, kind: "workflow", success: false, result: result3, diagnostics };
}
function responseId(envelope) {
  return isRecord17(envelope.response?.body) && decimal(envelope.response.body.id) ? envelope.response.body.id : void 0;
}
function acceptedStorage(envelope, id2, title) {
  const body = envelope.response?.body;
  return isRecord17(body) && body.id === id2 && body.title === title && body.status === "current" && isRecord17(body.body) && isRecord17(body.body.storage) && typeof body.body.storage.value === "string" ? body.body.storage.value : void 0;
}
async function artifactContent(directory, reference) {
  if (typeof reference === "string") return void 0;
  return regularText(directory, reference.path);
}
async function safeLstat7(path2) {
  try {
    return await lstat9(path2);
  } catch {
    return void 0;
  }
}
async function regularText(directory, relativePath) {
  if (!/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9._/-]+$/u.test(relativePath)) return void 0;
  let current = directory;
  for (const part of relativePath.split("/")) {
    const parent = await safeLstat7(current);
    if (parent === void 0 || !parent.isDirectory() || parent.isSymbolicLink()) return void 0;
    current = resolve9(current, part);
    const stat2 = await safeLstat7(current);
    if (stat2 === void 0 || stat2.isSymbolicLink()) return void 0;
  }
  const stat = await safeLstat7(current);
  if (stat === void 0 || !stat.isFile()) return void 0;
  try {
    return await readFile8(current, "utf8");
  } catch {
    return void 0;
  }
}
function parseJson4(value) {
  try {
    return value === void 0 ? void 0 : JSON.parse(value);
  } catch {
    return void 0;
  }
}
function artifact(value) {
  return typeof value.path === "string" && /^[a-f0-9]{64}$/u.test(String(value.sha256)) ? { path: value.path, sha256: String(value.sha256) } : void 0;
}
function digestValue3(value) {
  return value.algorithm === "sha256" && value.canonicalization === "RFC8785" && typeof value.value === "string" && /^[a-f0-9]{64}$/u.test(value.value) ? value.value : void 0;
}
function decimal(value) {
  return typeof value === "string" && /^[0-9]+$/u.test(value);
}
function integer(value) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
function isRecord17(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function diagnostic3(code, message, pageId) {
  return { severity: "error", code, message, operation: applyOperationName, ...pageId === void 0 ? {} : { pageId } };
}
function info3(code, message) {
  return { severity: "info", code, message, operation: applyOperationName };
}
function apiDiagnostics(code, message, pageId, entries) {
  return [diagnostic3(code, message, pageId), ...entries.map((entry) => ({ ...entry, operation: applyOperationName, pageId }))];
}
function invalidPlan3(message) {
  return { ok: false, diagnostic: diagnostic3("INVALID_IMPORT_PLAN", message) };
}
function mismatch(message) {
  return { ok: false, diagnostic: diagnostic3("PLAN_DIGEST_MISMATCH", message) };
}
function artifactMismatch2(message) {
  return { ok: false, diagnostic: diagnostic3("PLAN_ARTIFACT_MISMATCH", message) };
}
var AttemptWriter;
var init_snapshot_import_apply = __esm({
  "src/adapters/filesystem/snapshot-import-apply.ts"() {
    "use strict";
    init_snapshot_writer();
    init_json();
    init_markdown_storage_profile();
    init_confluence_v2_operations();
    init_snapshot_import();
    AttemptWriter = class _AttemptWriter {
      constructor(plan, staging) {
        this.plan = plan;
        this.staging = staging;
      }
      plan;
      staging;
      static async create(plan) {
        return new _AttemptWriter(plan, await mkdtemp9(resolve9(dirname9(plan.finalDirectory), `.${basename9(plan.finalDirectory)}.miku-confluence-staging-`)));
      }
      async writeArtifact(path2, content) {
        const target = resolve9(this.staging, "artifacts", path2);
        await mkdir9(dirname9(target), { recursive: true });
        await writeFile10(target, content, "utf8");
      }
      async writeMapping(mapping) {
        await this.writeArtifact("mapping.json", `${stringifyJson({ schemaVersion: "miku-confluence.snapshot-import-created-mapping/v1", mapping })}
`);
      }
      async writeAttempt(value) {
        await writeFile10(resolve9(this.staging, "attempt.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat7(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename9(this.staging, this.plan.finalDirectory);
      }
      async abort() {
        await rm9(this.staging, { recursive: true, force: true });
      }
    };
  }
});

// src/adapters/filesystem/snapshot-import-prepare.ts
import { lstat as lstat10, mkdir as mkdir10, mkdtemp as mkdtemp10, readFile as readFile9, readdir as readdir2, rename as rename10, rm as rm10, writeFile as writeFile11 } from "node:fs/promises";
import { basename as basename10, dirname as dirname10, resolve as resolve10 } from "node:path";
async function prepareSnapshotImport(input) {
  const source = await readSource(input);
  if (source.ok === false) return snapshotImportFailure(prepareOperationName, [source.diagnostic]);
  const output = await planSnapshotOutput(input.outputDirectory, prepareOperationName);
  if (output.ok === false) return snapshotImportFailure(prepareOperationName, [output.diagnostic]);
  let writer;
  try {
    writer = await ImportPlanWriter.create(output.value);
    const artifacts = await writeSourceArtifacts(writer, source.value);
    const plan = {
      schemaVersion: "miku-confluence.snapshot-import-plan/v1",
      source: { rootPageId: input.sourceRootPageId, openApiSha256: confluenceV2OpenApiSource.sha256, snapshotSchemaVersion: "miku-confluence.export/v1" },
      target: { spaceId: input.targetSpaceId, parentPageId: input.targetParentPageId },
      pages: source.value.pages.map((page) => ({ sourcePageId: page.id, ...page.parentSourcePageId === void 0 ? {} : { parentSourcePageId: page.parentSourcePageId }, sequence: page.sequence, title: page.title, storageArtifact: artifacts.pages[page.id].storage, apiArtifact: artifacts.pages[page.id].api })),
      artifacts: { sourceManifest: artifacts.sourceManifest, tree: artifacts.tree, mapping: artifacts.mapping, diagnostics: artifacts.diagnostics },
      assessment: { generation: "complete", applyAction: "create", applyEligible: true, blockerCount: 0, pageCount: source.value.pages.length },
      safety: { requiredPermission: "CREATE", confirmation: "plan-digest", automaticRetry: false, automaticRollback: false }
    };
    const planDigest = sha256(canonicalJson(plan));
    await writer.writePlan({ ...plan, planDigest: { algorithm: "sha256", canonicalization: "RFC8785", value: planDigest } });
    await writer.finalize();
    const result3 = { action: "create", applyEligible: true, outputDirectory: input.outputDirectory, pageCount: source.value.pages.length, planDigest };
    return { schemaVersion: 1, operation: prepareOperationName, kind: "workflow", success: true, result: result3, diagnostics: [] };
  } catch {
    if (writer !== void 0) await writer.abort();
    return snapshotImportFailure(prepareOperationName, [{ severity: "error", code: "FILESYSTEM_ERROR", message: "The snapshot import plan could not be written safely.", operation: prepareOperationName }]);
  }
}
async function readSource(input) {
  const directory = resolve10(input.snapshotDirectory);
  const stat = await safeLstat8(directory);
  if (stat === void 0 || !stat.isDirectory() || stat.isSymbolicLink()) return invalid2("SNAPSHOT_INVALID", "The snapshot directory must be a non-symbolic-link directory.");
  const exportText = await regularText2(directory, "export.json");
  const treeText = await regularText2(directory, "tree.json");
  const manifest = parseJson5(exportText);
  const tree = parseJson5(treeText);
  if (!isRecord18(manifest) || manifest.schemaVersion !== "miku-confluence.export/v1" || manifest.complete !== true || manifest.rootPageId !== input.sourceRootPageId || !isRecord18(manifest.api) || manifest.api.openApiSha256 !== confluenceV2OpenApiSource.sha256) return invalid2("SNAPSHOT_INVALID", "The snapshot must be a complete export rooted at sourceRootPageId from the pinned Confluence v2 API specification.");
  if (!isRecord18(tree) || tree.schemaVersion !== "miku-confluence.tree/v1" || tree.rootPageId !== input.sourceRootPageId || !Array.isArray(tree.nodes)) return invalid2("SNAPSHOT_INVALID", "The snapshot tree is missing or invalid.");
  const pages = [];
  const ids = /* @__PURE__ */ new Set();
  for (const node of tree.nodes) {
    if (!isRecord18(node) || node.artifactStatus !== "written" || !decimal2(node.pageId) || !integer2(node.traversalIndex) || !integer2(node.depth) || !Array.isArray(node.children)) return invalid2("SNAPSHOT_INVALID", "The snapshot tree contains an invalid page node.");
    const id2 = node.pageId;
    if (ids.has(id2)) return invalid2("SNAPSHOT_INVALID", "The snapshot tree contains duplicate page IDs.");
    ids.add(id2);
    const parent = node.traversalParentPageId;
    if (parent !== null && !decimal2(parent)) return invalid2("SNAPSHOT_INVALID", "The snapshot tree contains an invalid parent page ID.");
    pages.push({ id: id2, sequence: node.traversalIndex, ...parent === null ? {} : { parentSourcePageId: parent }, title: "", storage: "", api: "" });
  }
  pages.sort((left, right) => left.sequence - right.sequence || left.id.localeCompare(right.id));
  if (pages.length === 0 || pages[0]?.id !== input.sourceRootPageId || pages.some((page, index) => index > 0 && page.parentSourcePageId === void 0)) return invalid2("SNAPSHOT_INVALID", "The source root must be the only tree node without a parent.");
  for (const page of pages) {
    if (page.parentSourcePageId === void 0) continue;
    const parentIndex = pages.findIndex((candidate) => candidate.id === page.parentSourcePageId);
    if (!ids.has(page.parentSourcePageId) || parentIndex < 0 || parentIndex >= pages.findIndex((candidate) => candidate.id === page.id)) return invalid2("SNAPSHOT_INVALID", "The snapshot tree must create parents before their children.");
  }
  if (await hasAttachments(directory, pages.map((page) => page.id))) return invalid2("ATTACHMENT_IMPORT_UNSUPPORTED", "Snapshots containing attachment artifacts cannot be imported by the create-only profile.");
  const resolved = [];
  for (const page of pages) {
    const apiText = await regularText2(directory, `pages/${page.id}/page.api-v2.json`);
    const storage = await regularText2(directory, `pages/${page.id}/body.storage.xml`);
    const api = parseJson5(apiText);
    if (!isRecord18(api) || api.id !== page.id || api.status !== "current" || typeof api.title !== "string" || api.title.length === 0 || /[\r\n]/u.test(api.title) || !isRecord18(api.body) || !isRecord18(api.body.storage) || api.body.storage.value !== storage) return invalid2("SNAPSHOT_INVALID", `The source page ${page.id} is missing a current API body or matching Storage XML.`);
    if (storage === void 0 || hasUnremappedReference(storage)) return invalid2("SOURCE_REFERENCE_UNSUPPORTED", `The source page ${page.id} contains a page or attachment reference that import v1 cannot remap.`);
    resolved.push({ ...page, api: apiText, storage, title: api.title });
  }
  return { ok: true, value: { exportManifest: exportText, tree: treeText, pages: resolved } };
}
async function writeSourceArtifacts(writer, source) {
  const pages = {};
  for (const page of source.pages) pages[page.id] = { api: await writer.writeArtifact(`pages/${page.id}/source.api-v2.json`, page.api), storage: await writer.writeArtifact(`pages/${page.id}/source.storage.xml`, page.storage) };
  return {
    sourceManifest: await writer.writeArtifact("source-manifest.json", source.exportManifest),
    tree: await writer.writeArtifact("tree.json", source.tree),
    mapping: await writer.writeArtifact("mapping.json", `${stringifyJson({ schemaVersion: "miku-confluence.snapshot-import-mapping/v1", pages: source.pages.map((page) => ({ sourcePageId: page.id, ...page.parentSourcePageId === void 0 ? {} : { parentSourcePageId: page.parentSourcePageId }, sequence: page.sequence, title: page.title, storageSha256: sha256(page.storage) })) })}
`),
    diagnostics: await writer.writeArtifact("diagnostics.json", `${stringifyJson({ schemaVersion: "miku-confluence.snapshot-import-diagnostics/v1", eligible: true, summary: { error: 0, warning: 0 }, items: [] })}
`),
    pages
  };
}
async function hasAttachments(directory, pageIds) {
  for (const id2 of pageIds) {
    const attachment = await lstatWithin(directory, `pages/${id2}/attachments`);
    if (attachment?.isDirectory()) {
      const entries = await readdir2(resolve10(directory, "pages", id2, "attachments"));
      if (entries.length > 0) return true;
    }
  }
  return false;
}
async function safeLstat8(path2) {
  try {
    return await lstat10(path2);
  } catch {
    return void 0;
  }
}
async function lstatWithin(directory, relativePath) {
  if (!/^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[A-Za-z0-9._/-]+$/u.test(relativePath)) return void 0;
  let current = directory;
  for (const part of relativePath.split("/")) {
    const parent = await safeLstat8(current);
    if (parent === void 0 || !parent.isDirectory() || parent.isSymbolicLink()) return void 0;
    current = resolve10(current, part);
    const stat = await safeLstat8(current);
    if (stat === void 0 || stat.isSymbolicLink()) return void 0;
  }
  return safeLstat8(current);
}
async function regularText2(directory, relativePath) {
  const stat = await lstatWithin(directory, relativePath);
  if (stat === void 0 || !stat.isFile()) return void 0;
  try {
    return await readFile9(resolve10(directory, relativePath), "utf8");
  } catch {
    return void 0;
  }
}
function parseJson5(text) {
  try {
    return text === void 0 ? void 0 : JSON.parse(text);
  } catch {
    return void 0;
  }
}
function invalid2(code, message) {
  return { ok: false, diagnostic: { severity: "error", code, message, operation: prepareOperationName } };
}
function decimal2(value) {
  return typeof value === "string" && /^[0-9]+$/u.test(value);
}
function integer2(value) {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}
function isRecord18(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function hasUnremappedReference(storage) {
  return /<(?:ri:page|ri:attachment)\b|\bri:content-id\s*=/u.test(storage);
}
var ImportPlanWriter;
var init_snapshot_import_prepare = __esm({
  "src/adapters/filesystem/snapshot-import-prepare.ts"() {
    "use strict";
    init_snapshot_writer();
    init_json();
    init_markdown_storage_profile();
    init_confluence_v2_operations();
    init_snapshot_import();
    ImportPlanWriter = class _ImportPlanWriter {
      constructor(plan, stagingDirectory) {
        this.plan = plan;
        this.stagingDirectory = stagingDirectory;
      }
      plan;
      stagingDirectory;
      static async create(plan) {
        return new _ImportPlanWriter(plan, await mkdtemp10(resolve10(dirname10(plan.finalDirectory), `.${basename10(plan.finalDirectory)}.miku-confluence-staging-`)));
      }
      async writeArtifact(path2, value) {
        const target = resolve10(this.stagingDirectory, "artifacts", path2);
        await mkdir10(dirname10(target), { recursive: true });
        await writeFile11(target, value, "utf8");
        return { path: `artifacts/${path2}`, sha256: sha256(value) };
      }
      async writePlan(value) {
        await writeFile11(resolve10(this.stagingDirectory, "snapshot-import-plan.json"), `${stringifyJson(value)}
`, "utf8");
      }
      async finalize() {
        if (await safeLstat8(this.plan.finalDirectory) !== void 0) throw new Error("final output exists");
        await rename10(this.stagingDirectory, this.plan.finalDirectory);
      }
      async abort() {
        await rm10(this.stagingDirectory, { recursive: true, force: true });
      }
    };
  }
});

// src/core/diagnostics.ts
function operationNotImplementedDiagnostic(operation) {
  return {
    severity: "error",
    code: "OPERATION_NOT_IMPLEMENTED",
    message: "The operation is not implemented in this release.",
    operation
  };
}
var init_diagnostics = __esm({
  "src/core/diagnostics.ts"() {
    "use strict";
  }
});

// src/core/operation-policy.ts
var operationPolicies;
var init_operation_policy = __esm({
  "src/core/operation-policy.ts"() {
    "use strict";
    operationPolicies = {
      "api.v2.createPage": {
        coverage: "implemented",
        mutationClass: "create",
        requiredPermission: "CREATE",
        requiresConfirmation: true,
        safeResponseHeaders: ["retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getAttachmentById": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getAttachmentLabels": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getBlogPostById": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getBlogPostLabels": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getBlogPosts": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getChildPages": {
        coverage: "excluded",
        exclusionReason: "The Confluence OpenAPI marks GET /pages/{id}/children as deprecated; use getPageDirectChildren.",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: false
      },
      "api.v2.getCustomContentById": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getCustomContentByType": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getPageAttachments": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getPageById": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getPageDirectChildren": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getPageLabels": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getLabelPages": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getLabelAttachments": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getLabelBlogPosts": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getLabels": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getPages": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getPagesInSpace": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getSpaceById": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getSpaceLabels": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.updatePage": {
        coverage: "implemented",
        mutationClass: "update",
        requiredPermission: "UPDATE",
        requiresConfirmation: true,
        safeResponseHeaders: ["retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "api.v2.getSpaces": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: ["link", "retry-after", "x-request-id", "atl-traceid"],
        supportsDryRun: true
      },
      "page.export-subtree": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "page.prepare-markdown-update": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "page.inspect-markdown-preservation": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "page.apply-markdown-update": {
        coverage: "implemented",
        mutationClass: "update",
        requiredPermission: "UPDATE",
        requiresConfirmation: true,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "page.apply-markdown-create": {
        coverage: "implemented",
        mutationClass: "create",
        requiredPermission: "CREATE",
        requiresConfirmation: true,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "page.prepare-markdown-create": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "snapshot.export-markdown": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "snapshot.prepare-import": {
        coverage: "implemented",
        mutationClass: "read",
        requiredPermission: "READ",
        requiresConfirmation: false,
        safeResponseHeaders: [],
        supportsDryRun: true
      },
      "snapshot.apply-import": {
        coverage: "implemented",
        mutationClass: "create",
        requiredPermission: "CREATE",
        requiresConfirmation: true,
        safeResponseHeaders: [],
        supportsDryRun: true
      }
    };
  }
});

// src/core/workflows.ts
var limitsSchema, workflowDefinitions;
var init_workflows = __esm({
  "src/core/workflows.ts"() {
    "use strict";
    limitsSchema = {
      type: "object",
      additionalProperties: false,
      properties: {
        maxPages: { type: "integer", minimum: 1, maximum: 1e4, default: 1e3 },
        maxAttachments: { type: "integer", minimum: 1, maximum: 5e4, default: 5e3 },
        maxAttachmentBytes: { type: "integer", minimum: 1, maximum: 1073741824, default: 104857600 },
        maxTotalAttachmentBytes: { type: "integer", minimum: 1, maximum: 10737418240, default: 1073741824 },
        maxApiRequests: { type: "integer", minimum: 1, maximum: 1e5, default: 1e4 },
        maxCollectionPages: { type: "integer", minimum: 1, maximum: 1e4, default: 1e3 },
        requestTimeoutMs: { type: "integer", minimum: 1, maximum: 3e5, default: 3e4 },
        downloadTimeoutMs: { type: "integer", minimum: 1, maximum: 18e5, default: 12e4 }
      }
    };
    workflowDefinitions = [
      {
        name: "snapshot.apply-import",
        description: "Create a reviewed complete Storage snapshot subtree after digest confirmation and per-page postcondition re-reads.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["planDirectory", "expectedPlanDigest", "attemptDirectory"],
          properties: {
            planDirectory: { type: "string", minLength: 1 },
            expectedPlanDigest: { type: "string", pattern: "^[a-f0-9]{64}$" },
            attemptDirectory: { type: "string", minLength: 1 }
          }
        }
      },
      {
        name: "snapshot.prepare-import",
        description: "Prepare an offline immutable create-only import plan from one complete Confluence Storage snapshot.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["snapshotDirectory", "sourceRootPageId", "targetSpaceId", "targetParentPageId", "outputDirectory"],
          properties: {
            snapshotDirectory: { type: "string", minLength: 1 },
            sourceRootPageId: { type: "string", pattern: "^[0-9]+$" },
            targetSpaceId: { type: "string", pattern: "^[0-9]+$" },
            targetParentPageId: { type: "string", pattern: "^[0-9]+$" },
            outputDirectory: { type: "string", minLength: 1 }
          }
        }
      },
      {
        name: "page.export-subtree",
        description: "Export one root page and its page descendants as a Confluence REST API v2 filesystem snapshot.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["rootPageId", "outputDirectory"],
          properties: {
            rootPageId: { type: "string", pattern: "^[0-9]+$" },
            outputDirectory: { type: "string", minLength: 1 },
            maxDepth: { type: "integer", minimum: 0, maximum: 1e3, default: 100 },
            includeAttachments: { type: "boolean", default: false },
            limits: limitsSchema
          }
        }
      },
      {
        name: "page.apply-markdown-create",
        description: "Create one page from a reviewed immutable Markdown plan after digest confirmation and postcondition re-read verification.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["planDirectory", "expectedPlanDigest", "attemptDirectory"],
          properties: {
            planDirectory: { type: "string", minLength: 1 },
            expectedPlanDigest: { type: "string", pattern: "^[a-f0-9]{64}$" },
            attemptDirectory: { type: "string", minLength: 1 }
          }
        }
      },
      {
        name: "page.apply-markdown-update",
        description: "Apply one reviewed immutable Markdown update plan after digest confirmation, remote precondition checks, and postcondition re-read verification.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["planDirectory", "expectedPlanDigest", "attemptDirectory"],
          properties: {
            planDirectory: { type: "string", minLength: 1 },
            expectedPlanDigest: { type: "string", pattern: "^[a-f0-9]{64}$" },
            attemptDirectory: { type: "string", minLength: 1 }
          }
        }
      },
      {
        name: "page.prepare-markdown-create",
        description: "Prepare an offline immutable Markdown-to-Storage XML page create plan without contacting Confluence.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["spaceId", "parentPageId", "title", "workingMarkdownPath", "outputDirectory"],
          properties: {
            spaceId: { type: "string", pattern: "^[0-9]+$" },
            parentPageId: { type: "string", pattern: "^[0-9]+$" },
            title: { type: "string", minLength: 1, pattern: "^[^\\r\\n]+$" },
            workingMarkdownPath: { type: "string", minLength: 1 },
            outputDirectory: { type: "string", minLength: 1 },
            expectedWorkingMarkdownSha256: { type: "string", pattern: "^[a-f0-9]{64}$" }
          }
        }
      },
      {
        name: "page.prepare-markdown-update",
        description: "Prepare an offline, immutable Markdown-to-Storage XML update plan from one complete snapshot page without contacting Confluence. An explicit preservation profile produces local-only review artifacts and is not applyable yet.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["snapshotDirectory", "pageId", "workingMarkdownPath", "outputDirectory"],
          properties: {
            snapshotDirectory: { type: "string", minLength: 1 },
            pageId: { type: "string", pattern: "^[0-9]+$" },
            workingMarkdownPath: { type: "string", minLength: 1 },
            outputDirectory: { type: "string", minLength: 1 },
            expectedBaseStorageSha256: { type: "string", pattern: "^[a-f0-9]{64}$" },
            expectedWorkingMarkdownSha256: { type: "string", pattern: "^[a-f0-9]{64}$" },
            preservationProfile: { const: "miku-confluence.markdown-preservation/v1" }
          }
        }
      },
      {
        name: "page.inspect-markdown-preservation",
        description: "Inspect a digest-bound Markdown preservation sidecar and deterministic block mapping locally without generating candidate Storage XML.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["snapshotDirectory", "pageId", "workingMarkdownPath", "preservationProfile", "outputDirectory"],
          properties: {
            snapshotDirectory: { type: "string", minLength: 1 },
            pageId: { type: "string", pattern: "^[0-9]+$" },
            workingMarkdownPath: { type: "string", minLength: 1 },
            preservationProfile: { const: "miku-confluence.markdown-preservation/v1" },
            outputDirectory: { type: "string", minLength: 1 }
          }
        }
      },
      {
        name: "snapshot.export-markdown",
        description: "Convert one finalized Confluence API v2 snapshot into an offline, page-ID-based Markdown view.",
        inputSchema: {
          type: "object",
          additionalProperties: false,
          required: ["inputDirectory", "outputDirectory"],
          properties: {
            inputDirectory: { type: "string", minLength: 1 },
            outputDirectory: { type: "string", minLength: 1 }
          }
        }
      }
    ];
  }
});

// src/core/operation-catalog.ts
function compareCodePoint2(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
function objectFromEntries(entries) {
  return Object.fromEntries(entries);
}
function apiInputSchema(operation) {
  const locations = ["path", "query"];
  const properties = [];
  for (const location of locations) {
    const parameters = operation.parameters.filter((parameter) => parameter.location === location);
    if (parameters.length === 0) continue;
    const parameterProperties = parameters.map((parameter) => [parameter.name, parameter.effectiveSchema]);
    const required = parameters.filter((parameter) => parameter.required).map((parameter) => parameter.name);
    const locationSchema = {
      type: "object",
      additionalProperties: false,
      properties: objectFromEntries(parameterProperties)
    };
    if (required.length > 0) locationSchema.required = required;
    properties.push([location, locationSchema]);
  }
  if (operation.requestBody !== void 0) properties.push(["body", operation.requestBody.effectiveSchema]);
  const requiredLocations = [
    ...operation.parameters.some((parameter) => parameter.location === "path" && parameter.required) ? ["path"] : [],
    ...operation.requestBody?.required === true ? ["body"] : []
  ];
  const schema = {
    type: "object",
    additionalProperties: false,
    properties: objectFromEntries(properties)
  };
  if (requiredLocations.length > 0) schema.required = requiredLocations;
  return schema;
}
function apiCatalogEntry(operation, policy) {
  const base = {
    name: operation.operationName,
    kind: "api",
    description: policy.description ?? operation.summary,
    coverage: policy.coverage,
    executable: policy.coverage === "implemented",
    mutationClass: policy.mutationClass,
    requiredPermission: policy.requiredPermission,
    supportsDryRun: policy.supportsDryRun,
    requiresConfirmation: policy.requiresConfirmation,
    safeResponseHeaders: policy.safeResponseHeaders,
    inputSchema: apiInputSchema(operation),
    sourceParameters: operation.parameters,
    api: {
      operationId: operation.operationId,
      method: operation.method,
      pathTemplate: operation.pathTemplate,
      scopes: operation.scopes,
      deprecated: operation.deprecated,
      experimental: operation.experimental
    }
  };
  return policy.exclusionReason === void 0 ? base : { ...base, exclusionReason: policy.exclusionReason };
}
function workflowCatalogEntry(definition, policy) {
  return {
    name: definition.name,
    kind: "workflow",
    description: definition.description,
    coverage: policy.coverage,
    executable: policy.coverage === "implemented",
    mutationClass: policy.mutationClass,
    requiredPermission: policy.requiredPermission,
    supportsDryRun: policy.supportsDryRun,
    requiresConfirmation: policy.requiresConfirmation,
    safeResponseHeaders: policy.safeResponseHeaders,
    inputSchema: definition.inputSchema
  };
}
function createCatalog() {
  const entries = [];
  for (const operation of confluenceV2Operations) {
    const policy = operationPolicies[operation.operationName];
    if (policy !== void 0) entries.push(apiCatalogEntry(operation, policy));
  }
  for (const workflow of workflowDefinitions) {
    const policy = operationPolicies[workflow.name];
    if (policy !== void 0) entries.push(workflowCatalogEntry(workflow, policy));
  }
  return entries.sort((left, right) => compareCodePoint2(left.name, right.name));
}
function listCatalogEntries() {
  return catalog;
}
function describeCatalogEntry(name) {
  return catalog.find((entry) => entry.name === name);
}
function findApiOperationDefinition(name) {
  const metadata = confluenceV2Operations.find((operation) => operation.operationName === name);
  if (metadata === void 0) return void 0;
  const policy = operationPolicies[name];
  if (policy === void 0) return void 0;
  return { metadata, policy };
}
var catalog;
var init_operation_catalog = __esm({
  "src/core/operation-catalog.ts"() {
    "use strict";
    init_confluence_v2_operations();
    init_operation_policy();
    init_workflows();
    catalog = createCatalog();
  }
});

// src/core/workflows/export-subtree.ts
function parseExportSubtreeInput(value) {
  if (!isRecord19(value)) return invalidInput9("$", "must be a JSON object");
  const allowed = /* @__PURE__ */ new Set(["rootPageId", "outputDirectory", "maxDepth", "includeAttachments", "limits"]);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) return invalidInput9(`$.${key}`, "is not allowed for this operation");
  }
  const rootPageId = value.rootPageId;
  if (typeof rootPageId !== "string" || !/^[0-9]+$/u.test(rootPageId)) return invalidInput9("$.rootPageId", "must be a decimal page ID string");
  const outputDirectory = value.outputDirectory;
  if (typeof outputDirectory !== "string" || outputDirectory.length === 0 || outputDirectory.includes("\0")) {
    return invalidInput9("$.outputDirectory", "must be a non-empty path without NUL");
  }
  const maxDepth = value.maxDepth === void 0 ? 100 : value.maxDepth;
  if (!integerInRange(maxDepth, 0, 1e3)) return invalidInput9("$.maxDepth", "must be an integer between 0 and 1000");
  const includeAttachments = value.includeAttachments === void 0 ? false : value.includeAttachments;
  if (typeof includeAttachments !== "boolean") return invalidInput9("$.includeAttachments", "must be a boolean");
  const limits = parseLimits(value.limits);
  if (limits.ok === false) return limits;
  return { ok: true, value: { rootPageId, outputDirectory, maxDepth, includeAttachments, limits: limits.value } };
}
async function runExportSubtree(inputValue, dependencies, dryRun) {
  const parsed = parseExportSubtreeInput(inputValue);
  if (parsed.ok === false) return failure6([parsed.diagnostic]);
  const input = parsed.value;
  if (dryRun) {
    return {
      schemaVersion: 1,
      operation: operationName8,
      kind: "workflow",
      success: true,
      dryRun: true,
      plan: {
        outputDirectory: input.outputDirectory,
        rootPageId: input.rootPageId,
        maxDepth: input.maxDepth,
        includeAttachments: input.includeAttachments,
        artifacts: input.includeAttachments ? ["export.json", "tree.json", "pages/<pageId>/page.api-v2.json", "pages/<pageId>/body.storage.xml", "pages/<pageId>/diagnostics.json", "pages/<pageId>/attachments/<attachmentId>/attachment.api-v2.json", "pages/<pageId>/attachments/<attachmentId>/content.json", "pages/<pageId>/attachments/<attachmentId>/content.<ext>"] : ["export.json", "tree.json", "pages/<pageId>/page.api-v2.json", "pages/<pageId>/body.storage.xml", "pages/<pageId>/diagnostics.json"]
      },
      diagnostics: []
    };
  }
  if (dependencies.apiCaller === void 0 || dependencies.nextPageUrl === void 0 || dependencies.snapshotStorage === void 0 || input.includeAttachments && dependencies.attachmentDownloader === void 0) {
    return failure6([{ severity: "error", code: "UNEXPECTED_ERROR", message: "The workflow execution ports are unavailable.", operation: operationName8 }]);
  }
  const outputPlan = await dependencies.snapshotStorage.planOutput(input.outputDirectory);
  if (outputPlan.ok === false) return failure6([outputPlan.diagnostic]);
  let writer;
  try {
    writer = await dependencies.snapshotStorage.create(outputPlan.value);
    return await exportIntoStaging(input, dependencies, writer);
  } catch {
    if (writer !== void 0) await writer.abort();
    return failure6([{ severity: "error", code: "FILESYSTEM_ERROR", message: "The snapshot could not be written safely.", operation: operationName8 }]);
  }
}
async function exportIntoStaging(input, dependencies, writer) {
  const diagnostics = [];
  const counts = {
    pagesDiscovered: 1,
    pagesWritten: 0,
    pagesFailed: 0,
    nonPageChildrenObserved: 0,
    attachmentsDiscovered: 0,
    attachmentsWritten: 0,
    attachmentsFailed: 0,
    attachmentBytesWritten: 0,
    apiRequests: 0
  };
  const nodes = [{
    pageId: input.rootPageId,
    sourceParentPageId: null,
    traversalParentPageId: null,
    depth: 0,
    childPosition: null,
    traversalIndex: 0,
    artifactStatus: "failed",
    children: [],
    diagnostics: []
  }];
  const callApi = async (operation, apiInput) => {
    if (counts.apiRequests >= input.limits.maxApiRequests) {
      addDiagnostic(diagnostics, void 0, {
        severity: "error",
        code: "LIMIT_EXCEEDED",
        message: "The API request limit was reached before export completed.",
        operation: operationName8
      });
      return void 0;
    }
    counts.apiRequests += 1;
    return dependencies.apiCaller.call(operation, apiInput, input.limits.requestTimeoutMs);
  };
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (node === void 0) continue;
    const page = await callApi("api.v2.getPageById", { path: { id: node.pageId }, query: { "body-format": "storage" } });
    if (page === void 0) break;
    const pageBody = successfulBody(page.envelope);
    if (pageBody === void 0) {
      addEnvelopeDiagnostics(diagnostics, node, page.envelope);
      continue;
    }
    const normalizedPage = normalizePageBody(pageBody, node.pageId);
    if (normalizedPage.ok === false) {
      addDiagnostic(diagnostics, node, normalizedPage.diagnostic);
      continue;
    }
    node.sourceParentPageId = normalizedPage.value.parentPageId;
    node.artifactStatus = "written";
    counts.pagesWritten += 1;
    await writer.writePage(node.pageId, pageBody, normalizedPage.value.storageValue, node.diagnostics);
    if (node.depth >= input.maxDepth) continue;
    const discovered = await discoverChildren(node, input, dependencies.apiBaseUrl, dependencies.nextPageUrl, callApi, diagnostics);
    counts.nonPageChildrenObserved += discovered.nonPageChildrenObserved;
    for (const candidate of discovered.children) {
      if (nodes.length >= input.limits.maxPages) {
        addDiagnostic(diagnostics, node, {
          severity: "error",
          code: "LIMIT_EXCEEDED",
          message: "The page limit was reached before traversal completed.",
          operation: operationName8,
          pageId: node.pageId
        });
        break;
      }
      if (nodes.some((existing) => existing.pageId === candidate.pageId)) {
        addDiagnostic(diagnostics, node, {
          severity: "error",
          code: isAncestor(nodes, node.pageId, candidate.pageId) ? "PAGE_CYCLE" : "DUPLICATE_PAGE_ID",
          message: isAncestor(nodes, node.pageId, candidate.pageId) ? "A page child would create a cycle in the exported subtree." : "A page child was discovered more than once in the exported subtree.",
          operation: operationName8,
          pageId: node.pageId
        });
        continue;
      }
      node.children.push(candidate.pageId);
      nodes.push({
        pageId: candidate.pageId,
        sourceParentPageId: null,
        traversalParentPageId: node.pageId,
        depth: node.depth + 1,
        childPosition: candidate.childPosition,
        traversalIndex: nodes.length,
        artifactStatus: "failed",
        children: [],
        diagnostics: []
      });
      counts.pagesDiscovered += 1;
    }
    if (discovered.stopTraversal) break;
  }
  if (input.includeAttachments) {
    const seenAttachmentIds = /* @__PURE__ */ new Set();
    for (const node of nodes) {
      if (node.artifactStatus !== "written") continue;
      const attachments = await exportPageAttachments(node, input, dependencies, callApi, diagnostics, counts, seenAttachmentIds, writer);
      if (attachments.stopExport) break;
    }
  }
  for (const node of nodes) {
    if (node.artifactStatus === "failed") counts.pagesFailed += 1;
    await writer.writePageDiagnostics(node.pageId, node.diagnostics);
  }
  if (diagnostics.some((diagnostic4) => diagnostic4.severity === "error")) {
    diagnostics.push({ severity: "error", code: "PARTIAL_SNAPSHOT", message: "The snapshot is incomplete.", operation: operationName8 });
  }
  const complete = !diagnostics.some((diagnostic4) => diagnostic4.severity === "error");
  const result3 = {
    outputDirectory: input.outputDirectory,
    rootPageId: input.rootPageId,
    complete,
    counts
  };
  await writer.writeTree({
    schemaVersion: "miku-confluence.tree/v1",
    rootPageId: input.rootPageId,
    traversal: "breadth-first",
    ordering: "childPosition-null-last-then-pageId",
    nodes: nodes.map((node) => ({
      pageId: node.pageId,
      sourceParentPageId: node.sourceParentPageId,
      traversalParentPageId: node.traversalParentPageId,
      depth: node.depth,
      childPosition: node.childPosition,
      traversalIndex: node.traversalIndex,
      artifactStatus: node.artifactStatus,
      ...node.artifactStatus === "written" ? { artifactPath: `pages/${node.pageId}` } : {},
      children: node.children
    }))
  });
  await writer.writeExportManifest({
    schemaVersion: "miku-confluence.export/v1",
    createdAt: (dependencies.now ?? (() => /* @__PURE__ */ new Date()))().toISOString(),
    complete,
    api: {
      product: "Confluence Cloud",
      version: "v2",
      openApiVersion: dependencies.openApiSource.infoVersion,
      openApiSha256: dependencies.openApiSource.sha256
    },
    rootPageId: input.rootPageId,
    scope: { rootIncluded: true, edgeType: "page-to-page", maxDepth: input.maxDepth, includeAttachments: input.includeAttachments },
    limits: input.limits,
    paths: { tree: "tree.json", pages: "pages" },
    counts,
    diagnostics: { summary: summarizeDiagnostics(diagnostics), items: diagnostics }
  });
  await writer.finalize();
  return { schemaVersion: 1, operation: operationName8, kind: "workflow", success: complete, result: result3, diagnostics };
}
async function exportPageAttachments(node, input, dependencies, callApi, diagnostics, counts, seenAttachmentIds, writer) {
  const discovered = await discoverAttachments(node, input, dependencies.apiBaseUrl, dependencies.nextPageUrl, callApi, diagnostics);
  for (const candidate of discovered.attachments) {
    if (seenAttachmentIds.has(candidate.attachmentId)) {
      addDiagnostic(diagnostics, node, {
        severity: "error",
        code: "DUPLICATE_ATTACHMENT_ID",
        message: "An attachment ID was discovered more than once in the requested export.",
        operation: operationName8,
        pageId: node.pageId,
        attachmentId: candidate.attachmentId
      });
      continue;
    }
    seenAttachmentIds.add(candidate.attachmentId);
    if (counts.attachmentsDiscovered >= input.limits.maxAttachments) {
      addDiagnostic(diagnostics, node, {
        severity: "error",
        code: "LIMIT_EXCEEDED",
        message: "The attachment limit was reached before export completed.",
        operation: operationName8,
        pageId: node.pageId,
        attachmentId: candidate.attachmentId
      });
      return { stopExport: true };
    }
    counts.attachmentsDiscovered += 1;
    const metadata = await callApi("api.v2.getAttachmentById", { path: { id: candidate.attachmentId } });
    if (metadata === void 0) {
      counts.attachmentsFailed += 1;
      return { stopExport: true };
    }
    const metadataBody = successfulBody(metadata.envelope);
    if (metadataBody === void 0) {
      counts.attachmentsFailed += 1;
      addAttachmentEnvelopeDiagnostics(diagnostics, node, candidate.attachmentId, metadata.envelope);
      continue;
    }
    const normalized = normalizeAttachmentBody(metadataBody, candidate.attachmentId);
    if (normalized.ok === false) {
      counts.attachmentsFailed += 1;
      addDiagnostic(diagnostics, node, normalized.diagnostic);
      continue;
    }
    await writer.writeAttachmentMetadata(node.pageId, candidate.attachmentId, redactAttachmentDownloadLinks(metadataBody));
    const downloaded = await dependencies.attachmentDownloader.download(normalized.value.downloadLink, input.limits.downloadTimeoutMs);
    if (downloaded.ok === false) {
      counts.attachmentsFailed += 1;
      addDiagnostic(diagnostics, node, withAttachmentContext(downloaded.diagnostic, node.pageId, candidate.attachmentId));
      continue;
    }
    const remainingTotalBytes = input.limits.maxTotalAttachmentBytes - counts.attachmentBytesWritten;
    if (remainingTotalBytes < 1) {
      counts.attachmentsFailed += 1;
      addDiagnostic(diagnostics, node, attachmentLimitDiagnostic(node.pageId, candidate.attachmentId));
      continue;
    }
    const content = await writer.writeAttachmentContent(node.pageId, candidate.attachmentId, downloaded.body, {
      originalFileName: normalized.value.originalFileName,
      mediaType: normalized.value.mediaType,
      maxBytes: Math.min(input.limits.maxAttachmentBytes, remainingTotalBytes)
    });
    if (content.ok === false) {
      counts.attachmentsFailed += 1;
      addDiagnostic(diagnostics, node, attachmentContentFailure(content.code, node.pageId, candidate.attachmentId));
      continue;
    }
    counts.attachmentsWritten += 1;
    counts.attachmentBytesWritten += content.value.bytes;
  }
  return { stopExport: discovered.stopTraversal };
}
async function discoverAttachments(node, input, apiBaseUrl, getNextPageUrl, callApi, diagnostics) {
  const candidates = [];
  let cursor;
  let collectionPages = 0;
  const seenUrls = /* @__PURE__ */ new Set();
  const seenCursors = /* @__PURE__ */ new Set();
  while (true) {
    const current = await callApi("api.v2.getPageAttachments", {
      path: { id: node.pageId },
      query: { status: ["current"], sort: "created-date", limit: 250, ...cursor === void 0 ? {} : { cursor } }
    });
    if (current === void 0) return finishedAttachments(candidates, true);
    const body = successfulBody(current.envelope);
    if (body === void 0) {
      addEnvelopeDiagnostics(diagnostics, node, current.envelope);
      return finishedAttachments(candidates, false);
    }
    const items = collectionItems(body);
    if (items === void 0) {
      addDiagnostic(diagnostics, node, invalidApiResponse("The attachment response must contain a results array.", node.pageId));
      return finishedAttachments(candidates, false);
    }
    collectionPages += 1;
    for (const item of items) {
      const attachment = normalizeAttachmentListItem(item);
      if (attachment === void 0) {
        addDiagnostic(diagnostics, node, invalidApiResponse("An attachment list entry did not contain a valid attachment ID.", node.pageId));
        continue;
      }
      candidates.push(attachment);
    }
    const next = getNextPageUrl({ currentUrl: current.requestUrl, response: current.envelope.response }, {
      apiBaseUrl,
      collectionPath: current.requestUrl.pathname
    });
    if (next.ok === false) {
      addDiagnostic(diagnostics, node, withPageId(next.diagnostic, node.pageId));
      return finishedAttachments(candidates, false);
    }
    if (next.value === void 0) break;
    if (collectionPages >= input.limits.maxCollectionPages) {
      addDiagnostic(diagnostics, node, {
        severity: "error",
        code: "LIMIT_EXCEEDED",
        message: "The collection page limit was reached before pagination completed.",
        operation: operationName8,
        pageId: node.pageId
      });
      return finishedAttachments(candidates, false);
    }
    const nextCursor = next.value.searchParams.get("cursor");
    if (nextCursor === null || nextCursor.length === 0 || seenUrls.has(next.value.toString()) || seenCursors.has(nextCursor)) {
      addDiagnostic(diagnostics, node, {
        severity: "error",
        code: nextCursor === null || nextCursor.length === 0 ? "INVALID_PAGINATION_LINK" : "PAGINATION_CYCLE",
        message: nextCursor === null || nextCursor.length === 0 ? "Confluence returned a pagination next link without a cursor." : "Confluence pagination repeated a previously seen next link or cursor.",
        operation: operationName8,
        pageId: node.pageId
      });
      return finishedAttachments(candidates, false);
    }
    seenUrls.add(next.value.toString());
    seenCursors.add(nextCursor);
    cursor = nextCursor;
  }
  return finishedAttachments(candidates, false);
}
function finishedAttachments(candidates, stopTraversal) {
  return {
    attachments: candidates.sort((left, right) => {
      if (left.createdAt !== null && right.createdAt !== null && left.createdAt !== right.createdAt) return left.createdAt < right.createdAt ? -1 : 1;
      if (left.createdAt !== null && right.createdAt === null) return -1;
      if (left.createdAt === null && right.createdAt !== null) return 1;
      return compareAttachmentIds(left.attachmentId, right.attachmentId);
    }),
    stopTraversal
  };
}
async function discoverChildren(node, input, apiBaseUrl, getNextPageUrl, callApi, diagnostics) {
  const candidates = [];
  let nonPageChildrenObserved = 0;
  let cursor;
  let collectionPages = 0;
  const seenUrls = /* @__PURE__ */ new Set();
  const seenCursors = /* @__PURE__ */ new Set();
  let current;
  while (true) {
    current = await callApi("api.v2.getPageDirectChildren", {
      path: { id: node.pageId },
      query: { limit: 250, sort: "child-position", ...cursor === void 0 ? {} : { cursor } }
    });
    if (current === void 0) return finishedChildren(candidates, nonPageChildrenObserved, true);
    const body = successfulBody(current.envelope);
    if (body === void 0) {
      addEnvelopeDiagnostics(diagnostics, node, current.envelope);
      return finishedChildren(candidates, nonPageChildrenObserved, false);
    }
    const items = collectionItems(body);
    if (items === void 0) {
      addDiagnostic(diagnostics, node, invalidApiResponse("The direct-children response must contain a results array.", node.pageId));
      return finishedChildren(candidates, nonPageChildrenObserved, false);
    }
    collectionPages += 1;
    for (const item of items) {
      const child = normalizeChild(item);
      if (child === void 0) {
        addDiagnostic(diagnostics, node, invalidApiResponse("A direct child did not contain a valid type and decimal ID.", node.pageId));
        continue;
      }
      if (child.type !== "page") {
        nonPageChildrenObserved += 1;
        addDiagnostic(diagnostics, node, {
          severity: "warning",
          code: "UNSUPPORTED_CHILD_CONTENT_TYPE",
          message: "A non-page child was excluded from the page-only subtree.",
          operation: operationName8,
          pageId: node.pageId
        });
        continue;
      }
      candidates.push({ pageId: child.pageId, childPosition: child.childPosition });
    }
    const next = getNextPageUrl({ currentUrl: current.requestUrl, response: current.envelope.response }, {
      apiBaseUrl,
      collectionPath: current.requestUrl.pathname
    });
    if (next.ok === false) {
      addDiagnostic(diagnostics, node, withPageId(next.diagnostic, node.pageId));
      return finishedChildren(candidates, nonPageChildrenObserved, false);
    }
    if (next.value === void 0) break;
    if (collectionPages >= input.limits.maxCollectionPages) {
      addDiagnostic(diagnostics, node, {
        severity: "error",
        code: "LIMIT_EXCEEDED",
        message: "The collection page limit was reached before pagination completed.",
        operation: operationName8,
        pageId: node.pageId
      });
      return finishedChildren(candidates, nonPageChildrenObserved, false);
    }
    const nextCursor = next.value.searchParams.get("cursor");
    if (nextCursor === null || nextCursor.length === 0 || seenUrls.has(next.value.toString()) || seenCursors.has(nextCursor)) {
      addDiagnostic(diagnostics, node, {
        severity: "error",
        code: nextCursor === null || nextCursor.length === 0 ? "INVALID_PAGINATION_LINK" : "PAGINATION_CYCLE",
        message: nextCursor === null || nextCursor.length === 0 ? "Confluence returned a pagination next link without a cursor." : "Confluence pagination repeated a previously seen next link or cursor.",
        operation: operationName8,
        pageId: node.pageId
      });
      return finishedChildren(candidates, nonPageChildrenObserved, false);
    }
    seenUrls.add(next.value.toString());
    seenCursors.add(nextCursor);
    cursor = nextCursor;
  }
  return finishedChildren(candidates, nonPageChildrenObserved, false);
}
function finishedChildren(candidates, nonPageChildrenObserved, stopTraversal) {
  return { children: candidates.sort((left, right) => compareChildren(left, right)), nonPageChildrenObserved, stopTraversal };
}
function successfulBody(envelope) {
  return envelope.success && envelope.response !== void 0 ? envelope.response.body : void 0;
}
function normalizePageBody(body, expectedId) {
  if (!isRecord19(body) || decimalId3(body.id) !== expectedId || !isRecord19(body.body) || !isRecord19(body.body.storage) || typeof body.body.storage.value !== "string") {
    return { ok: false, diagnostic: invalidApiResponse("The page response did not contain the requested ID and storage body.", expectedId) };
  }
  const parentId = body.parentId;
  const normalizedParent = parentId === null || parentId === void 0 ? null : decimalId3(parentId);
  if (parentId !== null && parentId !== void 0 && normalizedParent === void 0) {
    return { ok: false, diagnostic: invalidApiResponse("The page response contained an invalid parent ID.", expectedId) };
  }
  return { ok: true, value: { storageValue: body.body.storage.value, parentPageId: normalizedParent ?? null } };
}
function collectionItems(body) {
  return isRecord19(body) && Array.isArray(body.results) ? body.results : void 0;
}
function normalizeChild(value) {
  if (!isRecord19(value) || typeof value.type !== "string") return void 0;
  const pageId = decimalId3(value.id);
  if (pageId === void 0) return void 0;
  const position = value.childPosition ?? value.position;
  const childPosition = position === void 0 || position === null ? null : safeInteger(position);
  if (childPosition === void 0) return void 0;
  return { type: value.type, pageId, childPosition };
}
function normalizeAttachmentListItem(value) {
  if (!isRecord19(value)) return void 0;
  const attachmentId = attachmentIdValue(value.id);
  if (attachmentId === void 0) return void 0;
  return { attachmentId, createdAt: typeof value.createdAt === "string" ? value.createdAt : null };
}
function normalizeAttachmentBody(value, expectedAttachmentId) {
  if (!isRecord19(value) || attachmentIdValue(value.id) !== expectedAttachmentId) {
    return { ok: false, diagnostic: attachmentInvalidResponse("The attachment response did not contain the requested attachment ID.", expectedAttachmentId) };
  }
  const originalFileName = typeof value.title === "string" ? value.title : typeof value.fileName === "string" ? value.fileName : void 0;
  if (originalFileName === void 0) {
    return { ok: false, diagnostic: attachmentInvalidResponse("The attachment response did not contain an original file name.", expectedAttachmentId) };
  }
  const mediaType = typeof value.mediaType === "string" && value.mediaType.length > 0 ? value.mediaType : void 0;
  if (mediaType === void 0) {
    return { ok: false, diagnostic: attachmentInvalidResponse("The attachment response did not contain a media type.", expectedAttachmentId) };
  }
  const links = isRecord19(value._links) ? value._links : void 0;
  const downloadLink = typeof value.downloadLink === "string" ? value.downloadLink : typeof links?.download === "string" ? links.download : void 0;
  if (downloadLink === void 0 || downloadLink.length === 0) {
    return { ok: false, diagnostic: attachmentInvalidResponse("The attachment response did not contain a download link.", expectedAttachmentId) };
  }
  return { ok: true, value: { originalFileName, mediaType, downloadLink } };
}
function redactAttachmentDownloadLinks(value) {
  if (Array.isArray(value)) return value.map((item) => redactAttachmentDownloadLinks(item));
  if (!isPlainRecord(value)) return value;
  const result3 = {};
  for (const [key, child] of Object.entries(value)) {
    result3[key] = ["download", "downloadlink", "downloadurl"].includes(key.toLowerCase()) ? "[redacted download link]" : redactAttachmentDownloadLinks(child);
  }
  return result3;
}
function addEnvelopeDiagnostics(all, node, envelope) {
  const items = envelope.diagnostics.length === 0 ? [invalidApiResponse("The API call did not return a usable response.", node.pageId)] : envelope.diagnostics.map((diagnostic4) => withPageId(diagnostic4, node.pageId));
  for (const item of items) addDiagnostic(all, node, item);
}
function addAttachmentEnvelopeDiagnostics(all, node, attachmentId, envelope) {
  const items = envelope.diagnostics.length === 0 ? [attachmentInvalidResponse("The attachment API call did not return a usable response.", attachmentId)] : envelope.diagnostics.map((diagnostic4) => withAttachmentContext(diagnostic4, node.pageId, attachmentId));
  for (const item of items) addDiagnostic(all, node, item);
}
function addDiagnostic(all, node, diagnostic4) {
  all.push(diagnostic4);
  if (node !== void 0) node.diagnostics.push(diagnostic4);
}
function invalidApiResponse(message, pageId) {
  return { severity: "error", code: "INVALID_API_RESPONSE", message, operation: operationName8, pageId };
}
function attachmentInvalidResponse(message, attachmentId) {
  return { severity: "error", code: "INVALID_API_RESPONSE", message, operation: operationName8, attachmentId };
}
function withPageId(diagnostic4, pageId) {
  return diagnostic4.pageId === void 0 ? { ...diagnostic4, pageId } : diagnostic4;
}
function withAttachmentContext(diagnostic4, pageId, attachmentId) {
  return {
    ...diagnostic4,
    ...diagnostic4.pageId === void 0 ? { pageId } : {},
    ...diagnostic4.attachmentId === void 0 ? { attachmentId } : {}
  };
}
function attachmentLimitDiagnostic(pageId, attachmentId) {
  return {
    severity: "error",
    code: "LIMIT_EXCEEDED",
    message: "The total attachment byte limit was reached before download completed.",
    operation: operationName8,
    pageId,
    attachmentId
  };
}
function attachmentContentFailure(code, pageId, attachmentId) {
  const message = code === "LIMIT_EXCEEDED" ? "The attachment content exceeded a configured byte limit." : code === "TIMEOUT" ? "The attachment download timed out." : code === "NETWORK_ERROR" ? "The attachment download could not be completed." : "The attachment content could not be saved safely.";
  return { severity: "error", code, message, operation: operationName8, pageId, attachmentId, retryable: code === "NETWORK_ERROR" || code === "TIMEOUT" };
}
function isAncestor(nodes, parentId, candidateId) {
  let current = parentId;
  while (current !== null) {
    if (current === candidateId) return true;
    current = nodes.find((node) => node.pageId === current)?.traversalParentPageId ?? null;
  }
  return false;
}
function compareChildren(left, right) {
  if (left.childPosition !== null && right.childPosition !== null && left.childPosition !== right.childPosition) return left.childPosition - right.childPosition;
  if (left.childPosition !== null && right.childPosition === null) return -1;
  if (left.childPosition === null && right.childPosition !== null) return 1;
  return compareDecimalIds(left.pageId, right.pageId);
}
function compareDecimalIds(left, right) {
  const normalizedLeft = left.replace(/^0+(?=\d)/u, "");
  const normalizedRight = right.replace(/^0+(?=\d)/u, "");
  if (normalizedLeft.length !== normalizedRight.length) return normalizedLeft.length - normalizedRight.length;
  return normalizedLeft < normalizedRight ? -1 : normalizedLeft > normalizedRight ? 1 : 0;
}
function compareAttachmentIds(left, right) {
  const numericLeft = left.startsWith("att") ? left.slice(3) : left;
  const numericRight = right.startsWith("att") ? right.slice(3) : right;
  return compareDecimalIds(numericLeft, numericRight) || (left < right ? -1 : left > right ? 1 : 0);
}
function decimalId3(value) {
  if (typeof value === "string" && /^[0-9]+$/u.test(value)) return value;
  if (typeof value === "number" && Number.isSafeInteger(value) && value >= 0) return String(value);
  if (value !== null && typeof value === "object") {
    const text = String(value);
    if (/^[0-9]+$/u.test(text)) return text;
  }
  return void 0;
}
function attachmentIdValue(value) {
  if (typeof value === "string" && /^(att)?[0-9]+$/u.test(value)) return value;
  return void 0;
}
function safeInteger(value) {
  if (typeof value === "number" && Number.isSafeInteger(value) && Number.isInteger(value)) return value;
  if (value !== null && typeof value === "object") {
    const text = String(value);
    if (/^-?\d+$/u.test(text)) {
      const parsed = Number(text);
      if (Number.isSafeInteger(parsed)) return parsed;
    }
  }
  return void 0;
}
function parseLimits(value) {
  const defaults = {
    maxPages: 1e3,
    maxAttachments: 5e3,
    maxAttachmentBytes: 104857600,
    maxTotalAttachmentBytes: 1073741824,
    maxApiRequests: 1e4,
    maxCollectionPages: 1e3,
    requestTimeoutMs: 3e4,
    downloadTimeoutMs: 12e4
  };
  if (value === void 0) return { ok: true, value: defaults };
  if (!isRecord19(value)) return invalidInput9("$.limits", "must be an object");
  const ranges = {
    maxPages: [1, 1e4],
    maxAttachments: [1, 5e4],
    maxAttachmentBytes: [1, 1073741824],
    maxTotalAttachmentBytes: [1, 10737418240],
    maxApiRequests: [1, 1e5],
    maxCollectionPages: [1, 1e4],
    requestTimeoutMs: [1, 3e5],
    downloadTimeoutMs: [1, 18e5]
  };
  const result3 = { ...defaults };
  for (const key of Object.keys(value)) {
    if (!(key in ranges)) return invalidInput9(`$.limits.${key}`, "is not a supported limit");
  }
  for (const key of Object.keys(ranges)) {
    const candidate = value[key];
    if (candidate === void 0) continue;
    const [minimum, maximum] = ranges[key];
    if (!integerInRange(candidate, minimum, maximum)) return invalidInput9(`$.limits.${key}`, `must be an integer between ${minimum} and ${maximum}`);
    result3[key] = candidate;
  }
  return { ok: true, value: result3 };
}
function summarizeDiagnostics(diagnostics) {
  let error = 0;
  let info4 = 0;
  let warning = 0;
  for (const diagnostic4 of diagnostics) {
    if (diagnostic4.severity === "error") error += 1;
    if (diagnostic4.severity === "info") info4 += 1;
    if (diagnostic4.severity === "warning") warning += 1;
  }
  return { info: info4, warning, error };
}
function integerInRange(value, minimum, maximum) {
  return typeof value === "number" && Number.isInteger(value) && value >= minimum && value <= maximum;
}
function invalidInput9(path2, reason) {
  return { ok: false, diagnostic: { severity: "error", code: "INVALID_INPUT", message: `Operation input ${reason}.`, path: path2, operation: operationName8 } };
}
function failure6(diagnostics) {
  return { schemaVersion: 1, operation: operationName8, kind: "workflow", success: false, diagnostics };
}
function isRecord19(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isPlainRecord(value) {
  return isRecord19(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
var operationName8;
var init_export_subtree = __esm({
  "src/core/workflows/export-subtree.ts"() {
    "use strict";
    operationName8 = "page.export-subtree";
  }
});

// src/product.ts
function listOperations() {
  return { schemaVersion: 1, operations: listCatalogEntries() };
}
function describeOperation(name) {
  return describeCatalogEntry(name);
}
function operationNotImplemented(name, entry) {
  return {
    schemaVersion: 1,
    operation: name,
    kind: entry.kind,
    success: false,
    diagnostics: [operationNotImplementedDiagnostic(name)]
  };
}
async function runApiOperation(options) {
  const definition = findApiOperationDefinition(options.operationName);
  if (definition === void 0) {
    throw new Error(`Unknown API operation: ${options.operationName}`);
  }
  const { metadata, policy } = definition;
  if (policy.coverage !== "implemented") {
    return apiFailure3(metadata, [operationNotImplementedDiagnostic(metadata.operationName)]);
  }
  if (!options.callPermissions.has(policy.requiredPermission)) {
    return apiFailure3(metadata, [{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The call-level permission set does not allow this operation.",
      operation: metadata.operationName
    }]);
  }
  if (policy.requiresConfirmation && !options.dryRun && options.confirmDestructive !== true) {
    return apiFailure3(metadata, [{
      severity: "error",
      code: "CONFIRMATION_REQUIRED",
      message: "This mutation operation requires --confirm-destructive before configuration is read.",
      operation: metadata.operationName
    }]);
  }
  if (options.dryRun) {
    const prepared = prepareRelativeApiRequest(metadata, options.input);
    if (prepared.ok === false) return apiFailure3(metadata, prepared.diagnostics);
    return {
      schemaVersion: 1,
      operation: metadata.operationName,
      kind: "api",
      success: true,
      api: apiMetadata2(metadata),
      dryRun: true,
      request: {
        method: prepared.value.method,
        ...prepared.value.contentType === void 0 ? {} : { requestBody: { contentType: prepared.value.contentType, schemaValidated: true } },
        pathTemplate: metadata.pathTemplate,
        relativePath: prepared.value.relativePath,
        queryParameterNames: prepared.value.queryParameterNames
      },
      diagnostics: []
    };
  }
  const configuredPermissions = parseConfiguredPermissions(options.environment);
  if (configuredPermissions.ok === false) return apiFailure3(metadata, [configuredPermissions.diagnostic]);
  if (!allowsPermission(configuredPermissions.value, options.callPermissions, policy.requiredPermission)) {
    return apiFailure3(metadata, [{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The configured local permission set does not allow this operation.",
      operation: metadata.operationName
    }]);
  }
  const context = createConfluenceAccessContext(options.environment);
  if (context.ok === false) return apiFailure3(metadata, [context.diagnostic]);
  return executeApiOperation(
    context.value,
    metadata,
    policy,
    options.input,
    options.requestTimeoutMs === void 0 ? { fetch: options.fetch } : { fetch: options.fetch, requestTimeoutMs: options.requestTimeoutMs }
  );
}
async function runExportSubtreeWorkflow(options) {
  const parsed = parseExportSubtreeInput(options.input);
  if (parsed.ok === false) return workflowFailure([parsed.diagnostic]);
  if (options.dryRun) {
    return runExportSubtree(options.input, { apiBaseUrl: new URL("https://miku-confluence.invalid/wiki/api/v2"), openApiSource: confluenceV2OpenApiSource }, true);
  }
  const context = createConfluenceAccessContext(options.environment);
  if (context.ok === false) return workflowFailure([context.diagnostic]);
  if (!allowsPermission(context.value.allowedPermissions, options.callPermissions, "READ")) {
    return workflowFailure([{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The configured local permission set does not allow this operation.",
      operation: "page.export-subtree"
    }]);
  }
  return runExportSubtree(options.input, {
    apiBaseUrl: context.value.apiBaseUrl,
    attachmentDownloader: createAttachmentDownloader(context.value, { fetch: options.fetch }),
    nextPageUrl,
    openApiSource: confluenceV2OpenApiSource,
    snapshotStorage: filesystemSnapshotStorage,
    apiCaller: {
      async call(operationName9, input, requestTimeoutMs) {
        const definition = findApiOperationDefinition(operationName9);
        if (definition === void 0) throw new Error(`Unknown API operation: ${operationName9}`);
        const prepared = prepareRelativeApiRequest(definition.metadata, input);
        if (prepared.ok === false) throw new Error(`Invalid internal API operation input: ${operationName9}`);
        return {
          requestUrl: new URL(prepared.value.relativePath, context.value.apiBaseUrl.origin),
          envelope: await runApiOperation({
            operationName: operationName9,
            input,
            dryRun: false,
            callPermissions: options.callPermissions,
            environment: options.environment,
            fetch: options.fetch,
            requestTimeoutMs
          })
        };
      }
    }
  }, false);
}
async function runExportMarkdownWorkflow(options) {
  const parsed = parseExportMarkdownInput(options.input);
  if (parsed.ok === false) return exportMarkdownFailure([parsed.diagnostic]);
  if (!options.callPermissions.has("READ")) {
    return exportMarkdownFailure([{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The call-level permission set does not allow this operation.",
      operation: "snapshot.export-markdown"
    }]);
  }
  if (options.dryRun) return exportMarkdownDryRun(parsed.value);
  return exportSnapshotAsMarkdown(parsed.value);
}
async function runPrepareMarkdownUpdateWorkflow(options) {
  const parsed = parsePrepareMarkdownUpdateInput(options.input);
  if (parsed.ok === false) return prepareMarkdownUpdateFailure([parsed.diagnostic]);
  if (!options.callPermissions.has("READ")) {
    return prepareMarkdownUpdateFailure([{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The call-level permission set does not allow this operation.",
      operation: "page.prepare-markdown-update"
    }]);
  }
  if (options.dryRun) return prepareMarkdownUpdateDryRun(parsed.value);
  return prepareMarkdownUpdateFromSnapshot(parsed.value);
}
async function runInspectMarkdownPreservationWorkflow(options) {
  const parsed = parseInspectMarkdownPreservationInput(options.input);
  if (parsed.ok === false) return inspectMarkdownPreservationFailure([parsed.diagnostic]);
  if (!options.callPermissions.has("READ")) {
    return inspectMarkdownPreservationFailure([{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The call-level permission set does not allow this operation.",
      operation: "page.inspect-markdown-preservation"
    }]);
  }
  if (options.dryRun) return inspectMarkdownPreservationDryRun(parsed.value);
  return inspectMarkdownPreservation(parsed.value);
}
async function runPrepareMarkdownCreateWorkflow(options) {
  const parsed = parsePrepareMarkdownCreateInput(options.input);
  if (parsed.ok === false) return prepareMarkdownCreateFailure([parsed.diagnostic]);
  if (!options.callPermissions.has("READ")) {
    return prepareMarkdownCreateFailure([{ severity: "error", code: "PERMISSION_REQUIRED", message: "The call-level permission set does not allow this operation.", operation: "page.prepare-markdown-create" }]);
  }
  if (options.dryRun) return prepareMarkdownCreateDryRun(parsed.value);
  return prepareMarkdownCreate(parsed.value);
}
async function runPrepareSnapshotImportWorkflow(options) {
  const parsed = parsePrepareSnapshotImportInput(options.input);
  if (parsed.ok === false) return snapshotImportFailure("snapshot.prepare-import", [parsed.diagnostic]);
  if (!options.callPermissions.has("READ")) {
    return snapshotImportFailure("snapshot.prepare-import", [{ severity: "error", code: "PERMISSION_REQUIRED", message: "The call-level permission set does not allow this operation.", operation: "snapshot.prepare-import" }]);
  }
  if (options.dryRun) return prepareSnapshotImportDryRun(parsed.value);
  return prepareSnapshotImport(parsed.value);
}
async function runApplySnapshotImportWorkflow(options) {
  const parsed = parseApplySnapshotImportInput(options.input);
  if (parsed.ok === false) return snapshotImportFailure("snapshot.apply-import", [parsed.diagnostic]);
  if (!options.callPermissions.has("CREATE")) {
    return snapshotImportFailure("snapshot.apply-import", [{ severity: "error", code: "PERMISSION_REQUIRED", message: "The call-level permission set does not allow this operation.", operation: "snapshot.apply-import" }]);
  }
  if (options.dryRun) return applySnapshotImportDryRun(parsed.value);
  if (options.confirmDestructive !== true) {
    return snapshotImportFailure("snapshot.apply-import", [{ severity: "error", code: "CONFIRMATION_REQUIRED", message: "This reviewed import requires --confirm-destructive before the plan or configuration is read.", operation: "snapshot.apply-import" }]);
  }
  const inspection = await inspectSnapshotImportApply(parsed.value);
  if (inspection.ok === false) return snapshotImportFailure("snapshot.apply-import", [inspection.diagnostic]);
  const configuredPermissions = parseConfiguredPermissions(options.environment);
  if (configuredPermissions.ok === false) return snapshotImportFailure("snapshot.apply-import", [configuredPermissions.diagnostic]);
  if (!allowsPermission(configuredPermissions.value, options.callPermissions, "CREATE")) {
    return snapshotImportFailure("snapshot.apply-import", [{ severity: "error", code: "PERMISSION_REQUIRED", message: "The configured local permission set does not allow this operation.", operation: "snapshot.apply-import" }]);
  }
  const context = createConfluenceAccessContext(options.environment);
  if (context.ok === false) return snapshotImportFailure("snapshot.apply-import", [context.diagnostic]);
  return applyInspectedSnapshotImport(inspection.value, snapshotImportApiPort(context.value, options));
}
async function runApplyMarkdownCreateWorkflow(options) {
  const parsed = parseApplyMarkdownCreateInput(options.input);
  if (parsed.ok === false) return applyMarkdownCreateFailure([parsed.diagnostic]);
  if (!options.callPermissions.has("CREATE")) {
    return applyMarkdownCreateFailure([{ severity: "error", code: "PERMISSION_REQUIRED", message: "The call-level permission set does not allow this operation.", operation: "page.apply-markdown-create" }]);
  }
  if (options.dryRun) return applyMarkdownCreateDryRun(parsed.value);
  if (options.confirmDestructive !== true) {
    return applyMarkdownCreateFailure([{ severity: "error", code: "CONFIRMATION_REQUIRED", message: "This reviewed create requires --confirm-destructive before configuration is read.", operation: "page.apply-markdown-create" }]);
  }
  const inspection = await inspectMarkdownCreateApply(parsed.value);
  if (inspection.ok === false) return applyMarkdownCreateFailure([inspection.diagnostic]);
  if (inspection.value.plan.action !== "create") return applyInspectedMarkdownCreate(inspection.value);
  const configuredPermissions = parseConfiguredPermissions(options.environment);
  if (configuredPermissions.ok === false) return applyMarkdownCreateFailure([configuredPermissions.diagnostic]);
  if (!allowsPermission(configuredPermissions.value, options.callPermissions, "CREATE")) {
    return applyMarkdownCreateFailure([{ severity: "error", code: "PERMISSION_REQUIRED", message: "The configured local permission set does not allow this operation.", operation: "page.apply-markdown-create" }]);
  }
  const context = createConfluenceAccessContext(options.environment);
  if (context.ok === false) return applyMarkdownCreateFailure([context.diagnostic]);
  return applyInspectedMarkdownCreate(inspection.value, markdownCreateApiPort(context.value, options));
}
function markdownCreateApiPort(context, options) {
  const execute = async (operationName9, input) => {
    const definition = findApiOperationDefinition(operationName9);
    if (definition === void 0) throw new Error(`Unknown API operation: ${operationName9}`);
    const effectiveContext = definition.policy.requiredPermission === "READ" ? { ...context, allowedPermissions: /* @__PURE__ */ new Set([...context.allowedPermissions, "READ"]) } : context;
    return executeApiOperation(
      effectiveContext,
      definition.metadata,
      definition.policy,
      input,
      options.requestTimeoutMs === void 0 ? { fetch: options.fetch } : { fetch: options.fetch, requestTimeoutMs: options.requestTimeoutMs }
    );
  };
  return {
    createPage: (input) => execute("api.v2.createPage", input),
    getPageById: (pageId) => execute("api.v2.getPageById", { path: { id: pageId }, query: { "body-format": "storage" } })
  };
}
function snapshotImportApiPort(context, options) {
  const execute = async (operationName9, input) => {
    const definition = findApiOperationDefinition(operationName9);
    if (definition === void 0) throw new Error(`Unknown API operation: ${operationName9}`);
    const effectiveContext = definition.policy.requiredPermission === "READ" ? { ...context, allowedPermissions: /* @__PURE__ */ new Set([...context.allowedPermissions, "READ"]) } : context;
    return executeApiOperation(
      effectiveContext,
      definition.metadata,
      definition.policy,
      input,
      options.requestTimeoutMs === void 0 ? { fetch: options.fetch } : { fetch: options.fetch, requestTimeoutMs: options.requestTimeoutMs }
    );
  };
  return {
    createPage: (input) => execute("api.v2.createPage", input),
    getPageById: (pageId) => execute("api.v2.getPageById", { path: { id: pageId }, query: { "body-format": "storage" } })
  };
}
async function runApplyMarkdownUpdateWorkflow(options) {
  const parsed = parseApplyMarkdownUpdateInput(options.input);
  if (parsed.ok === false) return applyMarkdownUpdateFailure([parsed.diagnostic]);
  if (!options.callPermissions.has("UPDATE")) {
    return applyMarkdownUpdateFailure([{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The call-level permission set does not allow this operation.",
      operation: "page.apply-markdown-update"
    }]);
  }
  if (options.dryRun) return applyMarkdownUpdateDryRun(parsed.value);
  if (options.confirmDestructive !== true) {
    return applyMarkdownUpdateFailure([{
      severity: "error",
      code: "CONFIRMATION_REQUIRED",
      message: "This reviewed update requires --confirm-destructive before configuration is read.",
      operation: "page.apply-markdown-update"
    }]);
  }
  const inspection = await inspectMarkdownUpdateApply(parsed.value);
  if (inspection.ok === false) return applyMarkdownUpdateFailure([inspection.diagnostic]);
  if (inspection.value.plan.action !== "update") return applyInspectedMarkdownUpdate(inspection.value);
  const configuredPermissions = parseConfiguredPermissions(options.environment);
  if (configuredPermissions.ok === false) return applyMarkdownUpdateFailure([configuredPermissions.diagnostic]);
  if (!allowsPermission(configuredPermissions.value, options.callPermissions, "UPDATE")) {
    return applyMarkdownUpdateFailure([{
      severity: "error",
      code: "PERMISSION_REQUIRED",
      message: "The configured local permission set does not allow this operation.",
      operation: "page.apply-markdown-update"
    }]);
  }
  const context = createConfluenceAccessContext(options.environment);
  if (context.ok === false) return applyMarkdownUpdateFailure([context.diagnostic]);
  return applyInspectedMarkdownUpdate(inspection.value, markdownUpdateApiPort(context.value, options));
}
function markdownUpdateApiPort(context, options) {
  const execute = async (operationName9, input) => {
    const definition = findApiOperationDefinition(operationName9);
    if (definition === void 0) throw new Error(`Unknown API operation: ${operationName9}`);
    const effectiveContext = definition.policy.requiredPermission === "READ" ? { ...context, allowedPermissions: /* @__PURE__ */ new Set([...context.allowedPermissions, "READ"]) } : context;
    return executeApiOperation(
      effectiveContext,
      definition.metadata,
      definition.policy,
      input,
      options.requestTimeoutMs === void 0 ? { fetch: options.fetch } : { fetch: options.fetch, requestTimeoutMs: options.requestTimeoutMs }
    );
  };
  return {
    getPageById: (pageId) => execute("api.v2.getPageById", { path: { id: pageId }, query: { "body-format": "storage" } }),
    updatePage: (input) => execute("api.v2.updatePage", input)
  };
}
function apiFailure3(metadata, diagnostics) {
  return {
    schemaVersion: 1,
    operation: metadata.operationName,
    kind: "api",
    success: false,
    api: apiMetadata2(metadata),
    diagnostics
  };
}
function apiMetadata2(metadata) {
  return {
    version: "v2",
    operationId: metadata.operationId,
    method: metadata.method,
    pathTemplate: metadata.pathTemplate
  };
}
function workflowFailure(diagnostics) {
  return {
    schemaVersion: 1,
    operation: "page.export-subtree",
    kind: "workflow",
    success: false,
    diagnostics
  };
}
var init_product = __esm({
  "src/product.ts"() {
    "use strict";
    init_access_context();
    init_attachment_download();
    init_execute_operation();
    init_pagination();
    init_request_builder();
    init_snapshot_writer();
    init_markdown_export();
    init_markdown_update_prepare();
    init_markdown_preservation_inspect();
    init_markdown_update_apply();
    init_markdown_create_apply();
    init_markdown_create_prepare();
    init_snapshot_import_apply();
    init_snapshot_import_prepare();
    init_confluence_v2_operations();
    init_diagnostics();
    init_permissions();
    init_operation_catalog();
    init_export_subtree();
    init_export_markdown();
    init_prepare_markdown_update();
    init_inspect_markdown_preservation();
    init_apply_markdown_update();
    init_apply_markdown_create();
    init_prepare_markdown_create();
    init_snapshot_import();
  }
});

// src/cli.ts
var cli_exports = {};
__export(cli_exports, {
  main: () => main
});
import { readFile as readFile10 } from "node:fs/promises";
import { pathToFileURL } from "node:url";
function writeJson(stdout, value) {
  stdout.write(`${stringifyJson(value)}
`);
}
function usageError(stderr, message) {
  stderr.write(`${message}
`);
  stderr.write("usage: miku-confluence [--version|--help|-h|config init|operations list|operations describe <operation>|call <operation>]\n");
  return 2;
}
async function main(argv = process.argv, stdin = process.stdin, stdout = process.stdout, stderr = process.stderr, dependencies = {}) {
  const args = argv.slice(2);
  if (args.length === 1 && args[0] === "--version") {
    stdout.write(`miku-confluence ${packageVersion}
`);
    return 0;
  }
  if (args.length === 1 && (args[0] === "--help" || args[0] === "-h")) {
    stdout.write(helpText());
    return 0;
  }
  if (args.length === 2 && args[0] === "config" && args[1] === "init") {
    const result3 = await initializeEnvTemplate(dependencies.workingDirectory ?? process.cwd());
    writeJson(stdout, result3);
    return result3.success ? 0 : 1;
  }
  if (args.length === 2 && args[0] === "operations" && args[1] === "list") {
    writeJson(stdout, listOperations());
    return 0;
  }
  if (args.length === 3 && args[0] === "operations" && args[1] === "describe") {
    const operation = describeOperation(args[2] ?? "");
    if (operation === void 0) return usageError(stderr, `unknown operation: ${args[2] ?? ""}`);
    writeJson(stdout, operation);
    return 0;
  }
  if (args.length >= 2 && args[0] === "call") {
    return runCall(args.slice(1), stdin, stdout, stderr, dependencies);
  }
  return usageError(stderr, "invalid command");
}
async function runCall(args, stdin, stdout, stderr, dependencies) {
  const name = args[0] ?? "";
  if (name.length === 0) return usageError(stderr, "missing operation");
  const entry = describeOperation(name);
  if (entry === void 0) return usageError(stderr, `unknown operation: ${name}`);
  const options = parseCallOptions(args.slice(1));
  if (options.ok === false) {
    writeJson(stdout, resolvedOperationFailure(entry, "INVALID_INPUT", options.message));
    return 2;
  }
  if (!entry.executable) {
    writeJson(stdout, operationNotImplemented(name, entry));
    return 2;
  }
  const callPermissions = parsePermissionSet(options.value.allow, "--allow");
  if (callPermissions.ok === false) {
    writeJson(stdout, resolvedOperationFailure(entry, callPermissions.diagnostic.code, callPermissions.diagnostic.message));
    return 2;
  }
  const input = await readOperationInput(options.value.inputSource, stdin);
  if (input.ok === false) {
    writeJson(stdout, resolvedOperationFailure(entry, input.diagnostic.code, input.diagnostic.message));
    return 2;
  }
  const result3 = entry.kind === "api" && entry.api !== void 0 ? await runApiOperation({
    operationName: name,
    input: input.value,
    dryRun: options.value.dryRun,
    confirmDestructive: options.value.confirmDestructive,
    callPermissions: callPermissions.value,
    environment: dependencies.environment ?? process.env,
    fetch: dependencies.fetch ?? globalThis.fetch
  }) : await runWorkflow(name, input.value, options.value, callPermissions.value, dependencies);
  writeJson(stdout, result3);
  if (options.value.verbose) writeVerbose(stderr, entry, result3.kind === "api" ? result3.response?.status : void 0, options.value.dryRun, result3.success);
  if (result3.success) return 0;
  return result3.diagnostics.some((diagnostic4) => diagnostic4.code === "INVALID_INPUT") ? 2 : 1;
}
async function runWorkflow(name, input, options, callPermissions, dependencies) {
  if (name !== "page.export-subtree") {
    if (name === "snapshot.export-markdown") {
      return runExportMarkdownWorkflow({ input, dryRun: options.dryRun, callPermissions });
    }
    if (name === "page.prepare-markdown-update") {
      return runPrepareMarkdownUpdateWorkflow({ input, dryRun: options.dryRun, callPermissions });
    }
    if (name === "page.inspect-markdown-preservation") {
      return runInspectMarkdownPreservationWorkflow({ input, dryRun: options.dryRun, callPermissions });
    }
    if (name === "page.prepare-markdown-create") {
      return runPrepareMarkdownCreateWorkflow({ input, dryRun: options.dryRun, callPermissions });
    }
    if (name === "page.apply-markdown-update") {
      return runApplyMarkdownUpdateWorkflow({
        input,
        dryRun: options.dryRun,
        confirmDestructive: options.confirmDestructive,
        callPermissions,
        environment: dependencies.environment ?? process.env,
        fetch: dependencies.fetch ?? globalThis.fetch
      });
    }
    if (name === "page.apply-markdown-create") {
      return runApplyMarkdownCreateWorkflow({
        input,
        dryRun: options.dryRun,
        confirmDestructive: options.confirmDestructive,
        callPermissions,
        environment: dependencies.environment ?? process.env,
        fetch: dependencies.fetch ?? globalThis.fetch
      });
    }
    if (name === "snapshot.prepare-import") {
      return runPrepareSnapshotImportWorkflow({ input, dryRun: options.dryRun, callPermissions });
    }
    if (name === "snapshot.apply-import") {
      return runApplySnapshotImportWorkflow({
        input,
        dryRun: options.dryRun,
        confirmDestructive: options.confirmDestructive,
        callPermissions,
        environment: dependencies.environment ?? process.env,
        fetch: dependencies.fetch ?? globalThis.fetch
      });
    }
    return { schemaVersion: 1, operation: name, kind: "workflow", success: false, diagnostics: [{ severity: "error", code: "OPERATION_NOT_IMPLEMENTED", message: "The operation is not implemented in this release.", operation: name }] };
  }
  return runExportSubtreeWorkflow({
    input,
    dryRun: options.dryRun,
    callPermissions,
    environment: dependencies.environment ?? process.env,
    fetch: dependencies.fetch ?? globalThis.fetch
  });
}
function parseCallOptions(args) {
  let allow;
  let confirmDestructive = false;
  let dryRun = false;
  let inputSource = "-";
  let verbose = false;
  const seen = /* @__PURE__ */ new Set();
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === "--input" || argument === "--allow") {
      if (seen.has(argument)) return { ok: false, message: `Duplicate option: ${argument}.` };
      const value = args[index + 1];
      if (value === void 0 || value.startsWith("--")) return { ok: false, message: `Missing value for ${argument}.` };
      seen.add(argument);
      if (argument === "--input") inputSource = value;
      if (argument === "--allow") allow = value;
      index += 1;
      continue;
    }
    if (argument === "--dry-run" || argument === "--confirm-destructive" || argument === "--verbose") {
      if (seen.has(argument)) return { ok: false, message: `Duplicate option: ${argument}.` };
      seen.add(argument);
      if (argument === "--dry-run") dryRun = true;
      if (argument === "--confirm-destructive") confirmDestructive = true;
      if (argument === "--verbose") verbose = true;
      continue;
    }
    return { ok: false, message: `Unknown option: ${argument}.` };
  }
  return { ok: true, value: { allow, confirmDestructive, dryRun, inputSource, verbose } };
}
async function readOperationInput(source, stdin) {
  let text;
  try {
    text = source === "-" ? await readStdin(stdin) : await readFile10(source, "utf8");
  } catch {
    return invalidInput10("Operation input could not be read.");
  }
  if (text.trim().length === 0) return invalidInput10("Operation input must contain one JSON object.");
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return invalidInput10("Operation input must contain one valid JSON value.");
  }
}
async function readStdin(stdin) {
  const chunks = [];
  for await (const chunk of stdin) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
  return Buffer.concat(chunks).toString("utf8");
}
function invalidInput10(message) {
  return {
    ok: false,
    diagnostic: { severity: "error", code: "INVALID_INPUT", message }
  };
}
function resolvedOperationFailure(entry, code, message) {
  const result3 = {
    schemaVersion: 1,
    operation: entry.name,
    kind: entry.kind,
    success: false,
    diagnostics: [{ severity: "error", code, message, operation: entry.name }]
  };
  if (entry.api !== void 0) {
    result3.api = {
      version: "v2",
      operationId: entry.api.operationId,
      method: entry.api.method,
      pathTemplate: entry.api.pathTemplate
    };
  }
  return result3;
}
function writeVerbose(stderr, entry, httpStatus, dryRun, success5) {
  const event = {
    event: dryRun ? "dry-run" : "api-call",
    operation: entry.name,
    kind: entry.kind,
    success: success5
  };
  if (entry.api !== void 0) {
    event.operationId = entry.api.operationId;
    event.method = entry.api.method;
    event.pathTemplate = entry.api.pathTemplate;
  }
  if (httpStatus !== void 0) event.httpStatus = httpStatus;
  stderr.write(`verbose: ${stringifyJson(event)}
`);
}
var packageVersion, isBundleEntry;
var init_cli = __esm({
  async "src/cli.ts"() {
    "use strict";
    init_env_template();
    init_json();
    init_permissions();
    init_help();
    init_product();
    packageVersion = "0.3.2";
    isBundleEntry = globalThis.__MIKU_CONFLUENCE_BUNDLE_ENTRY__ === true;
    if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href && !isBundleEntry) {
      process.exitCode = await main();
    }
  }
});

// src/bundle-entry.ts
globalThis.__MIKU_CONFLUENCE_BUNDLE_ENTRY__ = true;
var { main: main2 } = await init_cli().then(() => cli_exports);
process.exitCode = await main2();
//# sourceMappingURL=miku-confluence.mjs.map
