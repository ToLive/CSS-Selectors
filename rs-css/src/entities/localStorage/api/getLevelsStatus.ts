import { storageKeys } from "../lib/config";
import { SavedLevel } from "../types";

const parseLevels = (levels: string | null): SavedLevel[] | null => levels ? JSON.parse(levels) as SavedLevel[] : null;

const getSavedLevels = (): SavedLevel[] | null => parseLevels(localStorage.getItem(storageKeys.savedLevels));

export { getSavedLevels };