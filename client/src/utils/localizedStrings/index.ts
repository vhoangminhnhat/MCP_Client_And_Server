import LocalizedStrings from "react-localization";
import { ENLocalizedStrings } from "./english";
import { VNLocalizedStrings } from "./vietnamese";

export const strings = new LocalizedStrings({
  vn: VNLocalizedStrings,
  en: ENLocalizedStrings,
});
