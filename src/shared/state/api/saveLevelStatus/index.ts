import { watchedState } from "@shared/state";
import { storageKeys } from "../../lib/config";

export const saveLevelStatus = (): void => {
    localStorage.setItem(storageKeys.savedLevels, JSON.stringify(watchedState.levelStat));
}