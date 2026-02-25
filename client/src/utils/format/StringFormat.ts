import { isEmpty } from "lodash";

export class StringFormat {
  static parseNoteString = (
    note: string,
  ): Record<string, string | string[]> => {
    if (!note) return {};
    const parts = note.split("|");
    const result: Record<string, string | string[]> = {};
    const products: string[] = [];

    for (const part of parts) {
      if (part.includes("=")) {
        const [key, value] = part.split("=");
        result[key] = value;
      } else if (part.trim() !== "") {
        products.push(part);
      }
    }

    if (products.length > 0) {
      result["product"] = products.length === 1 ? products[0] : products;
    }

    return result;
  };

  static dataFormater = (number: number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toString() + "B";
    } else if (number >= 1000000) {
      return (number / 1000000).toString() + "M";
    } else if (number >= 1000) {
      return (number / 1000).toString() + "K";
    } else {
      return number.toString();
    }
  };

  static checkLowerCase = (val: string) => {
    if (!isEmpty(val) && val === val?.toLowerCase()) {
      return val.charAt(0).toUpperCase() + val.slice(1);
    } else {
      return val;
    }
  };

  static isHTML(str: string): boolean {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  }

  static isFloatInString = (value: string) => {
    const num = parseFloat(value);
    if (!isNaN(num) && !Number.isInteger(num)) {
      return num;
    } else {
      return parseInt(value) || 0;
    }
  };
}
