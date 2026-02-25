import ls from "localstorage-slim";
import { isEmpty, isUndefined } from "lodash";

export interface ISavecache {
  product: unknown;
  key: string;
  needExpired?: boolean;
  timeExpired?: number;
}

export interface IProductDataCache {
  getCache(key: string): void;
  saveCache(props: ISavecache): void;
  resetCache(key: string): void;
}

export class ProductDataCache implements IProductDataCache {
  getCache(key: string) {
    ls.config.encrypt = true;
    return !isUndefined(JSON.parse(ls.get(key) as string))
      ? JSON.parse(ls.get(key) as string)
      : "";
  }
  saveCache(props: ISavecache) {
    let { key, needExpired = true, product, timeExpired = 7200 } = props;
    ls.config.encrypt = true;
    if (!isEmpty(key)) {
      ls.set(
        key,
        JSON.stringify(product),
        needExpired === true ? { ttl: timeExpired } : undefined,
      );
    }
  }
  resetCache(key: string | Array<string>) {
    ls.config.encrypt = true;
    if (!Array.isArray(key)) {
      let localCache = JSON.parse(ls.get(key) as string) ?? "";
      if (!isEmpty(key)) {
        if (!isEmpty(localCache)) {
          ls.remove(key);
        }
      } else {
        ls.clear();
      }
    } else {
      !isEmpty(key) &&
        Object.entries(localStorage).forEach(([localKeys, _]) => {
          if (
            key?.find((child) =>
              localKeys?.toLowerCase()?.includes(child?.toLowerCase()),
            )
          ) {
            ls.remove(localKeys);
          } else {
            return;
          }
        });
    }
  }
}

export const productCache = new ProductDataCache();
