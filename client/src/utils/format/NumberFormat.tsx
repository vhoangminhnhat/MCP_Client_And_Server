export class NumberFormat {
  static generateCaptcha = (length: number): string =>
    Array.from({ length }, () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return characters.charAt(Math.floor(Math.random() * characters.length));
    }).join("");

  static toRawNumber(value: number | string) {
    return new Intl.NumberFormat("de-DE", {
      style: "decimal",
    }).format(
      (value as number) || parseFloat((value as string).replace(/[^\d]/g, "")),
    );
  }

  static formatChangeRate = (rate?: number) => {
    if (rate === undefined || rate === null) return "";
    const sign = rate >= 0 ? "+" : "";
    return `${sign}${rate.toFixed(1)}%`;
  };

  static handleKeyDown = (event: {
    key: string;
    preventDefault: () => void;
  }) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
      "Enter",
    ];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      // Prevent the default action for non-numeric and non-utility keys
      event.preventDefault();
    }
  };

  static CurrentCurrency = "VND";
}
